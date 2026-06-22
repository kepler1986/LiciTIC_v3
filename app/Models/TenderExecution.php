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
        'visible' => 'boolean',
        'hidden' => 'boolean',
        'milestone_payments' => 'array',
        'installments' => 'array',
        'installment_plans' => 'array',
        'collected_months' => 'array',
    ];
}
