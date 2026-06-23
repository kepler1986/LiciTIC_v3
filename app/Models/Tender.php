<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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
    public const CLOSED_STATUSES = ['Ganada', 'Descartada', 'Desistida', 'Perdida', 'Resuelta por cliente'];

    public function milestones(): HasMany
    {
        return $this->hasMany(Milestone::class, 'tender_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(TenderComment::class, 'tender_id');
    }

    public function execution(): HasOne
    {
        return $this->hasOne(TenderExecution::class, 'tender_id');
    }

    public function scopeActive($query)
    {
        return $query->whereNotIn('status', self::CLOSED_STATUSES);
    }
}
