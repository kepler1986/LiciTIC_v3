<?php

namespace App\Services;

use App\Models\Setting;
use App\Support\DemoData;

class SettingsReader
{
    /** Settings efectivos: defaults sobrescritos por lo guardado en BD. */
    public function settings(): array
    {
        $row = Setting::find('settings');
        $stored = $row ? (json_decode($row->value, true) ?? []) : [];

        return array_replace_recursive(DemoData::settings(), $stored);
    }

    public function stats(): array
    {
        $row = Setting::find('stats');
        $stored = $row ? (json_decode($row->value, true) ?? []) : [];

        return array_replace(DemoData::stats(), $stored);
    }
}
