<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TenderComment extends Model
{
    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];

    public function tender(): BelongsTo
    {
        return $this->belongsTo(Tender::class, 'tender_id');
    }
}
