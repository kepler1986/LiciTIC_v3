<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\Milestone;
use App\Models\Setting;
use App\Models\Tender;
use App\Services\TenderPresentationSync;
use App\Support\DemoData;
use App\Support\EntityFields;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        foreach (DemoData::team() as $member) {
            Member::updateOrCreate(
                ['id' => $member['id']],
                EntityFields::toAttributes($member, EntityFields::MEMBER)
            );
        }

        foreach (DemoData::tenders() as $tender) {
            Tender::updateOrCreate(
                ['id' => $tender['id']],
                EntityFields::toAttributes($tender, EntityFields::TENDER)
            );
        }

        foreach (DemoData::events() as $event) {
            Milestone::updateOrCreate(
                ['id' => $event['id']],
                EntityFields::toAttributes($event, EntityFields::MILESTONE)
            );
        }

        Setting::updateOrCreate(['key' => 'settings'], ['value' => json_encode(DemoData::settings())]);
        Setting::updateOrCreate(['key' => 'stats'], ['value' => json_encode(DemoData::stats())]);

        // Genera los eventos de presentacion auto-generados de las licitaciones demo.
        $sync = app(TenderPresentationSync::class);
        Tender::all()->each(fn ($tender) => $sync->sync($tender));
    }
}
