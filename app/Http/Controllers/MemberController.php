<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Support\EntityFields;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        // El equipo es pequeno (~20); se devuelve completo.
        $members = Member::query()->orderBy('name')->get();

        return response()->json([
            'data' => EntityFields::collectionToCamel($members, EntityFields::MEMBER),
        ]);
    }

    public function store(Request $request)
    {
        $attributes = EntityFields::toAttributes($request->all(), EntityFields::MEMBER);
        unset($attributes['id']);
        $attributes['id'] = 'usr-'.strtolower((string) Str::ulid());
        $attributes['password'] = $attributes['password'] ?? '1234';

        $member = Member::create($attributes);

        return response()->json(EntityFields::toCamel($member, EntityFields::MEMBER), 201);
    }

    public function update(Request $request, Member $member)
    {
        $attributes = EntityFields::toAttributes($request->all(), EntityFields::MEMBER);
        unset($attributes['id']);
        // El cambio de contrasena va por su propia accion; aqui no se sobreescribe vacio.
        if (array_key_exists('password', $attributes) && $attributes['password'] === '') {
            unset($attributes['password']);
        }
        $member->update($attributes);

        return response()->json(EntityFields::toCamel($member->fresh(), EntityFields::MEMBER));
    }

    public function destroy(Member $member)
    {
        $member->delete();

        return response()->noContent();
    }

    /** Reset de contrasena (replica savePasswordForm del frontend). */
    public function resetPassword(Request $request, Member $member)
    {
        $password = (string) $request->input('password', '');

        if (strlen($password) < 4) {
            return response()->json(['message' => 'La contrasena debe tener al menos 4 caracteres.'], 422);
        }

        $member->update([
            'password' => $password,
            'password_reset_at' => Carbon::now()->toISOString(),
        ]);

        return response()->json(EntityFields::toCamel($member->fresh(), EntityFields::MEMBER));
    }

    /** Imagen de perfil: cada usuario sube/borra la suya (data URL o null para quitarla). */
    public function avatar(Request $request, Member $member)
    {
        $avatar = $request->input('avatar');

        if ($avatar !== null) {
            if (! is_string($avatar) || ! str_starts_with($avatar, 'data:image/')) {
                return response()->json(['message' => 'La imagen no es valida.'], 422);
            }
            // Limite defensivo (~1.5 MB de data URL); el cliente la redimensiona antes.
            if (strlen($avatar) > 1_500_000) {
                return response()->json(['message' => 'La imagen es demasiado grande.'], 422);
            }
        }

        $member->update(['avatar' => $avatar]);

        return response()->json(EntityFields::toCamel($member->fresh(), EntityFields::MEMBER));
    }
}
