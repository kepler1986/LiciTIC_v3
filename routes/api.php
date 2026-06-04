<?php

use App\Http\Controllers\BackupController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\MetricsController;
use App\Http\Controllers\MilestoneController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TenderController;
use Illuminate\Support\Facades\Route;

// Importacion (antes del resource para evitar colisiones de ruta).
Route::post('tenders/import/preview', [ImportController::class, 'preview']);
Route::post('tenders/import/commit', [ImportController::class, 'commit']);

Route::apiResource('tenders', TenderController::class);
Route::apiResource('milestones', MilestoneController::class)->except(['show']);

Route::apiResource('members', MemberController::class)->except(['show']);
Route::put('members/{member}/password', [MemberController::class, 'resetPassword']);

Route::get('settings', [SettingsController::class, 'show']);
Route::put('settings', [SettingsController::class, 'update']);

Route::get('metrics/dashboard', [MetricsController::class, 'dashboard']);
Route::get('metrics/overview', [MetricsController::class, 'overview']);
Route::get('metrics/report', [MetricsController::class, 'report']);
Route::get('metrics/gantt', [MetricsController::class, 'gantt']);

Route::get('search', [SearchController::class, 'index']);

Route::get('admin/export', [BackupController::class, 'export']);
Route::post('admin/import', [BackupController::class, 'import']);
