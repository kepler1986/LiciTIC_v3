<?php

namespace App\Services;

use App\Models\Member;
use App\Models\Tender;
use App\Support\DemoData;
use App\Support\EntityFields;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\DB;

/**
 * Porta a SQL/PHP las agregaciones que el frontend calculaba sobre todo el
 * dataset (dashboard, estadisticas, informe, gantt). Recibe `scope` = nombre
 * del usuario cuando NO es admin (los no-admin solo ven sus licitaciones).
 */
class MetricsService
{
    private array $settings;

    public function __construct()
    {
        $this->settings = app(SettingsReader::class)->settings();
    }

    private const CLOSED = ['Ganada', 'Descartada', 'Desistida', 'Perdida'];

    /** Query base de tenders, acotada al usuario si hay scope. */
    private function tenders(?string $scope)
    {
        $query = Tender::query();

        if ($scope) {
            $query->where(function ($q) use ($scope) {
                $q->where('owner', $scope)
                    ->orWhere(function ($inner) use ($scope) {
                        $inner->where('co_authored', true)->where('co_author', $scope);
                    });
            });
        }

        return $query;
    }

    // ---------- DASHBOARD ----------

    public function dashboard(?string $scope, bool $isAdmin, ?string $viewerName): array
    {
        $today = CarbonImmutable::now()->startOfDay();
        $todayIso = $today->format('Y-m-d');
        $weekEnd = $this->endOfWeek($today)->format('Y-m-d\TH:i');
        $in7 = $today->addDays(7)->format('Y-m-d\TH:i');
        $currentMonth = $today->format('Y-m');
        $prevMonth = $today->subMonthNoOverflow()->format('Y-m');

        $base = fn () => $this->tenders($scope);

        $active = (clone $base())->whereNotIn('status', self::CLOSED)->count();

        // Entregas proximas (7 dias) y de esta semana.
        $due = (clone $base())->whereNotIn('status', self::CLOSED)
            ->where('deadline', '>=', $todayIso)->where('deadline', '<=', $in7)->count();
        $dueThisWeek = (clone $base())->whereNotIn('status', self::CLOSED)
            ->where('deadline', '>=', $todayIso)->where('deadline', '<=', $weekEnd)->count();

        // Tendencia de activas mes actual vs anterior (por mes del deadline).
        $activeCurrent = (clone $base())->whereNotIn('status', self::CLOSED)->where('deadline', 'like', $currentMonth.'%')->count();
        $activePrev = (clone $base())->whereNotIn('status', self::CLOSED)->where('deadline', 'like', $prevMonth.'%')->count();

        [$won, $lost] = $this->wonLost($base());
        $successRate = ($won + $lost) ? (int) round($won / ($won + $lost) * 100) : 0;

        $missingOffersQuery = (clone $base())
            ->where('status', 'En evaluacion')
            ->where(fn ($q) => $q->whereNull('economic_offer')->orWhere('economic_offer', '')->orWhereRaw('CAST(economic_offer AS DECIMAL(20,2)) <= 0'))
            ->where('economic_offer_waived', false);
        $missingOffersTotal = (clone $missingOffersQuery)->count();
        $missingOffers = $missingOffersQuery->orderBy('deadline')->limit(50)->get();

        $workloadUsers = $this->workloadUsers($isAdmin, $viewerName);
        $workloadPerUser = $this->workloadForUsers($workloadUsers, $today);
        $avgWorkload = count($workloadPerUser)
            ? (int) round(array_sum(array_column($workloadPerUser, 'load')) / count($workloadPerUser))
            : 0;

        return [
            'kpis' => [
                'active' => $active,
                'activeTrendPercent' => $this->trendPercent($activeCurrent, $activePrev),
                'due' => $due,
                'dueThisWeek' => $dueThisWeek,
                'successRate' => $successRate,
                'successRateMeta' => ($won + $lost) ? "$won ganadas de ".($won + $lost)." cerradas" : 'Sin cerradas',
                'workload' => $avgWorkload,
            ],
            'missingOffers' => EntityFields::collectionToCamel($missingOffers, EntityFields::TENDER),
            'missingOffersTotal' => $missingOffersTotal,
            'workloadPerUser' => $workloadPerUser,
        ];
    }

    // ---------- ESTADISTICAS (overview) ----------

    public function overview(?string $scope, bool $isAdmin, ?string $viewerName): array
    {
        $base = fn () => $this->tenders($scope);
        $total = (clone $base())->count();
        $byStatus = (clone $base())->select('status', DB::raw('count(*) as c'))->groupBy('status')->pluck('c', 'status');

        [$won, $lost] = $this->wonLost($base());

        $users = $this->workloadUsers($isAdmin, $viewerName);
        $today = CarbonImmutable::now()->startOfDay();
        $workloads = collect($this->workloadForUsers($users, $today))->keyBy('name');

        $userCards = collect($users)->map(function ($user) use ($workloads) {
            $card = $this->userStats($user->name);
            $card['name'] = $user->name;
            $card['username'] = $user->username;
            $card['load'] = $workloads[$user->name]['load'] ?? 0;

            return $card;
        })->all();

        return [
            'total' => $total,
            'byStatus' => $byStatus,
            'active' => (int) ($byStatus['En preparacion'] ?? 0),
            'review' => (int) ($byStatus['En evaluacion'] ?? 0),
            'pending' => (int) ($byStatus['En analisis'] ?? 0),
            'lost' => $lost,
            'won' => $won,
            'successRate' => ($won + $lost) ? (int) round($won / ($won + $lost) * 100) : 0,
            'userStats' => $userCards,
        ];
    }

    /** Tarjeta de estadisticas por usuario (agregados SQL sobre tenders en que participa). */
    private function userStats(string $name): array
    {
        $row = $this->tenders($name)->selectRaw("
            count(*) as total,
            sum(case when status not in ('Descartada','Desistida') then 1 else 0 end) as counted,
            sum(case when status = 'En analisis' then 1 else 0 end) as analysis,
            sum(case when status = 'En preparacion' then 1 else 0 end) as prepared,
            sum(case when status = 'En evaluacion' then 1 else 0 end) as evaluated,
            sum(case when status = 'Ganada' then 1 else 0 end) as won,
            sum(case when status = 'Perdida' then 1 else 0 end) as lost,
            sum(case when status in ('Descartada','Desistida') then 1 else 0 end) as discarded,
            sum(case when status = 'En evaluacion' then cast(nullif(budget,'') as decimal(20,2)) else 0 end) as eval_budget,
            sum(case when status = 'En preparacion' then cast(nullif(budget,'') as decimal(20,2)) else 0 end) as prepared_budget,
            sum(case when status = 'En evaluacion' and economic_offer_waived = 0 and cast(nullif(economic_offer,'') as decimal(20,2)) > 0 then cast(nullif(economic_offer,'') as decimal(20,2)) else 0 end) as offer_total,
            sum(case when status = 'En evaluacion' and economic_offer_waived = 0 and coalesce(cast(nullif(economic_offer,'') as decimal(20,2)),0) <= 0 then 1 else 0 end) as missing_offers
        ")->first();

        $won = (int) $row->won;
        $lost = (int) $row->lost;

        return [
            'counted' => (int) $row->counted,
            'analysis' => (int) $row->analysis,
            'prepared' => (int) $row->prepared,
            'evaluated' => (int) $row->evaluated,
            'won' => $won,
            'lost' => $lost,
            'discarded' => (int) $row->discarded,
            'totalTenders' => (int) $row->total,
            'evalBudget' => (float) $row->eval_budget,
            'preparedBudget' => (float) $row->prepared_budget,
            'offerTotal' => (float) $row->offer_total,
            'missingOffers' => (int) $row->missing_offers,
            'successRate' => ($won + $lost) ? (int) round($won / ($won + $lost) * 100) : 0,
        ];
    }

    // ---------- INFORME EJECUTIVO ----------

    public function report(string $month, ?string $scope, bool $isAdmin, ?string $viewerName): array
    {
        $today = CarbonImmutable::now()->format('Y-m-d');
        $base = fn () => $this->tenders($scope);

        $presentationDate = "coalesce(nullif(presented_at,''), deadline)";

        $presentationsToday = (clone $base())->where('status', 'En evaluacion')
            ->whereRaw("$presentationDate like ?", [$today.'%'])->orderBy('title')->limit(100)->get();
        $awardsToday = (clone $base())->whereIn('status', ['Ganada', 'Perdida'])
            ->where('adjudication_date', $today)->orderBy('title')->limit(100)->get();

        $evalBudget = (float) (clone $base())->where('status', 'En evaluacion')->sum(DB::raw("cast(nullif(budget,'') as decimal(20,2))"));
        $remainingPrep = (float) (clone $base())->where('status', 'En preparacion')->sum(DB::raw("cast(nullif(budget,'') as decimal(20,2))"));

        $withOffer = (clone $base())->where('status', 'En evaluacion')->where('economic_offer_waived', false)
            ->whereRaw("cast(nullif(economic_offer,'') as decimal(20,2)) > 0");
        $offerTotal = (float) (clone $withOffer)->sum(DB::raw("cast(nullif(economic_offer,'') as decimal(20,2))"));
        $offerCount = (clone $withOffer)->count();

        $presentationsMonth = (clone $base())->where('status', 'En evaluacion')
            ->whereRaw("$presentationDate like ?", [$month.'%'])->count();
        $awardsMonth = (clone $base())->whereIn('status', ['Ganada', 'Perdida'])
            ->where('adjudication_date', 'like', $month.'%')->count();

        $users = $this->workloadUsers($isAdmin, $viewerName);
        $workloads = $this->workloadForUsers($users, CarbonImmutable::now()->startOfDay());
        $avgWorkload = count($workloads) ? (int) round(array_sum(array_column($workloads, 'load')) / count($workloads)) : 0;

        return [
            'date' => $today,
            'presentationsToday' => EntityFields::collectionToCamel($presentationsToday, EntityFields::TENDER),
            'awardsToday' => EntityFields::collectionToCamel($awardsToday, EntityFields::TENDER),
            'month' => [
                'label' => $month,
                'presentations' => $presentationsMonth,
                'awards' => $awardsMonth,
                'evaluationBudget' => $evalBudget,
                'remainingPreparationBudget' => $remainingPrep,
                'economicOfferTotal' => $offerTotal,
                'economicOfferCount' => $offerCount,
                'averageEconomicOffer' => $offerCount ? (int) round($offerTotal / $offerCount) : 0,
                'averageWorkload' => $avgWorkload,
            ],
        ];
    }

    // ---------- GANTT ----------

    /** Devuelve solo el subconjunto activo de la ventana; el grid lo pinta el cliente. */
    public function gantt(string $from, string $to, ?string $scope): array
    {
        $query = $this->tenders($scope)
            ->where('status', 'En preparacion')
            ->where('deadline', '>=', $from)
            ->where('deadline', '<=', $to.'T23:59');

        $total = (clone $query)->count();
        $tenders = $query->orderBy('deadline')->limit(300)->get();

        return [
            'tenders' => EntityFields::collectionToCamel($tenders, EntityFields::TENDER),
            'total' => $total,
            'truncated' => $total > 300,
        ];
    }

    // ---------- helpers de carga (dias habiles) ----------

    private function workloadUsers(bool $isAdmin, ?string $viewerName)
    {
        $query = Member::query()->where('role', 'user');

        if (! $isAdmin && $viewerName) {
            $query->where('name', $viewerName);
        }

        return $query->get();
    }

    /** Carga "hoy" por usuario: suma de aportes de tenders activos hoy en la ventana gantt. */
    private function workloadForUsers($users, CarbonImmutable $today): array
    {
        // Conjunto pequeno: tenders 'En preparacion' cuyo deadline cae cerca de hoy.
        $window = Tender::query()
            ->where('status', 'En preparacion')
            ->where('deadline', '>=', $today->subDays(1)->format('Y-m-d'))
            ->where('deadline', '<=', $today->addDays(10)->format('Y-m-d\TH:i'))
            ->get();

        $ownerShare = $this->loadShare('coAuthorOwnerLoadPercent');
        $coShare = $this->loadShare('coAuthorLoadPercent');

        $result = [];
        foreach ($users as $user) {
            $load = 0.0;
            foreach ($window as $tender) {
                if (! $this->ganttActiveToday($tender, $today)) {
                    continue;
                }
                $load += $this->tenderLoadForUser($tender, $user->name, $ownerShare, $coShare);
            }
            // workloadForUser = round(load * 33 * 100) / 100
            $result[] = ['name' => $user->name, 'load' => round($load * 33, 2)];
        }

        return $result;
    }

    private function tenderLoadForUser($tender, string $name, float $ownerShare, float $coShare): float
    {
        $hasCo = $tender->co_authored && $tender->co_author;

        if ($tender->owner === $name) {
            return $hasCo ? $ownerShare : 1.0;
        }
        if ($hasCo && $tender->co_author === $name) {
            return $coShare;
        }

        return 0.0;
    }

    private function ganttActiveToday($tender, CarbonImmutable $today): bool
    {
        $deadline = $this->parseDate($tender->deadline);
        if (! $deadline || $tender->status !== 'En preparacion') {
            return false;
        }
        $workStart = $this->subtractBusinessDays($deadline, 4);
        $deadlineDay = $deadline->startOfDay();

        if ($today->isSameDay($deadline)) {
            return true;
        }

        return $this->isBusinessDay($today) && $today >= $workStart && $today <= $deadlineDay;
    }

    private function loadShare(string $key): float
    {
        $percent = $this->settings[$key] ?? null;

        return is_numeric($percent) ? ((float) $percent) / 100 : ((float) DemoData::settings()[$key]) / 100;
    }

    // ---------- utilidades ----------

    private function wonLost($query): array
    {
        $row = (clone $query)->selectRaw("
            sum(case when status = 'Ganada' then 1 else 0 end) as won,
            sum(case when status = 'Perdida' then 1 else 0 end) as lost
        ")->first();

        return [(int) $row->won, (int) $row->lost];
    }

    private function trendPercent(int $current, int $previous): int
    {
        if ($previous) {
            return (int) round(($current - $previous) / $previous * 100);
        }

        return $current ? 100 : 0;
    }

    private function parseDate(?string $value): ?CarbonImmutable
    {
        if (! $value) {
            return null;
        }

        try {
            return CarbonImmutable::parse($value);
        } catch (\Throwable) {
            return null;
        }
    }

    private function isBusinessDay(CarbonImmutable $date): bool
    {
        $dow = (int) $date->dayOfWeekIso; // 1..7 (Lun..Dom)

        return $dow >= 1 && $dow <= 5;
    }

    private function subtractBusinessDays(CarbonImmutable $date, int $days): CarbonImmutable
    {
        $next = $date->startOfDay();
        $remaining = $days;
        while ($remaining > 0) {
            $next = $next->subDay();
            if ($this->isBusinessDay($next)) {
                $remaining--;
            }
        }

        return $next;
    }

    private function endOfWeek(CarbonImmutable $date): CarbonImmutable
    {
        // Replica endOfWeek del frontend (domingo como fin de semana).
        $daysUntilSunday = (7 - ($date->dayOfWeek)) % 7; // dayOfWeek: 0=Dom..6=Sab

        return $date->addDays($daysUntilSunday)->setTime(23, 59, 59);
    }
}
