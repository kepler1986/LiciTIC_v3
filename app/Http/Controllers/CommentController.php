<?php

namespace App\Http\Controllers;

use App\Models\TenderComment;
use App\Support\EntityFields;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CommentController extends Controller
{
    /** Comentarios de una licitacion, mas recientes primero. */
    public function index(Request $request)
    {
        $query = TenderComment::query();

        if ($tenderId = $request->input('tender_id')) {
            $query->where('tender_id', $tenderId);
        }

        $query->orderBy('created_at', 'desc')->orderBy('id', 'desc');

        return response()->json([
            'data' => EntityFields::collectionToCamel($query->get(), EntityFields::COMMENT),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenderId' => ['required', 'string'],
            'author' => ['nullable', 'string'],
            'body' => ['required', 'string'],
        ]);

        $attributes = EntityFields::toAttributes($validated, EntityFields::COMMENT);
        $attributes['id'] = 'cmt-'.strtolower((string) Str::ulid());

        $comment = TenderComment::create($attributes);

        return response()->json(EntityFields::toCamel($comment, EntityFields::COMMENT), 201);
    }

    public function destroy(TenderComment $comment)
    {
        $comment->delete();

        return response()->noContent();
    }
}
