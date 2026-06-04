<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Milestone;
use App\Models\Tender;
use App\Support\EntityFields;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    private const LIMIT = 50;

    public function index(Request $request)
    {
        $term = trim((string) $request->input('q', ''));
        $isAdmin = $request->boolean('isAdmin');
        $viewer = $request->input('viewer');

        if ($term === '') {
            return response()->json(['tenders' => [], 'events' => [], 'team' => []]);
        }

        $like = '%'.$term.'%';

        $tenders = Tender::query()
            ->when(! $isAdmin && $viewer, fn ($q) => $q->where(function ($inner) use ($viewer) {
                $inner->where('owner', $viewer)
                    ->orWhere(fn ($c) => $c->where('co_authored', true)->where('co_author', $viewer));
            }))
            ->where(fn ($q) => $q->where('title', 'like', $like)->orWhere('code', 'like', $like)
                ->orWhere('client', 'like', $like)->orWhere('lot', 'like', $like)
                ->orWhere('owner', 'like', $like)->orWhere('co_author', 'like', $like)
                ->orWhere('status', 'like', $like))
            ->limit(self::LIMIT)->get();

        $events = Milestone::query()
            ->when(! $isAdmin && $viewer, fn ($q) => $q->where('owner', $viewer))
            ->where(fn ($q) => $q->where('title', 'like', $like)->orWhere('tender', 'like', $like)
                ->orWhere('type', 'like', $like)->orWhere('owner', 'like', $like)
                ->orWhere('status', 'like', $like))
            ->limit(self::LIMIT)->get();

        $team = collect();
        if ($isAdmin) {
            $team = Member::query()
                ->where(fn ($q) => $q->where('name', 'like', $like)->orWhere('username', 'like', $like)
                    ->orWhere('email', 'like', $like)->orWhere('role', 'like', $like)
                    ->orWhere('status', 'like', $like))
                ->limit(self::LIMIT)->get();
        }

        return response()->json([
            'tenders' => EntityFields::collectionToCamel($tenders, EntityFields::TENDER),
            'events' => EntityFields::collectionToCamel($events, EntityFields::MILESTONE),
            'team' => EntityFields::collectionToCamel($team, EntityFields::MEMBER),
        ]);
    }
}
