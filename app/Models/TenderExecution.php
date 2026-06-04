<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TenderExecution extends Model
{
    protected $keyType = 'string';

    public $incrementing = false;

    protected $guarded = [];

    protected $casts = [
        'signed' => 'boolean',
        'milestone_payments' => 'array',
    ];
}
