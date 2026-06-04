<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tender extends Model
{
    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];

    protected $casts = [
        'economic_offer_waived' => 'boolean',
        'co_authored' => 'boolean',
    ];

    /** Estados que cuentan como "cerrados" (no activos). */
    public const CLOSED_STATUSES = ['Ganada', 'Descartada', 'Desistida', 'Perdida'];

    public function milestones(): HasMany
    {
        return $this->hasMany(Milestone::class, 'tender_id');
    }

    public function scopeActive($query)
    {
        return $query->whereNotIn('status', self::CLOSED_STATUSES);
    }
}
