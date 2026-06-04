<?php

namespace App\Http\Controllers;

use App\Services\MetricsService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class MetricsController extends Controller
{
    public function __construct(private MetricsService $metrics)
    {
    }

    public function dashboard(Request $request)
    {
        [$scope, $isAdmin, $viewer] = $this->context($request);

        return response()->json($this->metrics->dashboard($scope, $isAdmin, $viewer));
    }

    public function overview(Request $request)
    {
        [$scope, $isAdmin, $viewer] = $this->context($request);

        return response()->json($this->metrics->overview($scope, $isAdmin, $viewer));
    }

    public function report(Request $request)
    {
        [$scope, $isAdmin, $viewer] = $this->context($request);
        $month = $request->input('month', Carbon::now()->format('Y-m'));

        return response()->json($this->metrics->report($month, $scope, $isAdmin, $viewer));
    }

    public function notifications(Request $request)
    {
        [$scope] = $this->context($request);

        return response()->json($this->metrics->notifications($scope));
    }

    public function gantt(Request $request)
    {
        [$scope] = $this->context($request);
        $from = $request->input('from', Carbon::now()->format('Y-m-d'));
        $to = $request->input('to', Carbon::now()->addDays(28)->format('Y-m-d'));

        return response()->json($this->metrics->gantt($from, $to, $scope));
    }

    /** Deriva el scoping a partir del usuario que envia el cliente (auth fuera de alcance). */
    private function context(Request $request): array
    {
        $isAdmin = $request->boolean('isAdmin');
        $viewer = $request->input('viewer');
        $scope = $isAdmin ? null : $viewer;

        return [$scope, $isAdmin, $viewer];
    }
}
