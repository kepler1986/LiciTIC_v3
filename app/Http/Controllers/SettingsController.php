<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Support\DemoData;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    /** GET /api/settings — singleton settings + stats (con fallback a los defaults). */
    public function show()
    {
        return response()->json([
            'settings' => array_replace_recursive(DemoData::settings(), $this->read('settings', [])),
            'stats' => array_replace(DemoData::stats(), $this->read('stats', [])),
        ]);
    }

    /** PUT /api/settings — guarda settings y/o stats. */
    public function update(Request $request)
    {
        if ($request->has('settings')) {
            $this->write('settings', $request->input('settings'));
        }

        if ($request->has('stats')) {
            $this->write('stats', $request->input('stats'));
        }

        return $this->show();
    }

    private function read(string $key, $default)
    {
        $row = Setting::find($key);

        return $row ? (json_decode($row->value, true) ?? $default) : $default;
    }

    private function write(string $key, $value): void
    {
        Setting::updateOrCreate(['key' => $key], ['value' => json_encode($value)]);
    }
}
