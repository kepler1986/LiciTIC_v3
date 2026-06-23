<?php

use App\Http\Controllers\BackupController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ExecutionController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\MergeController;
use App\Http\Controllers\MetricsController;
use App\Http\Controllers\MilestoneController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TenderController;
use Illuminate\Support\Facades\Route;

// Importacion (antes del resource para evitar colisiones de ruta).
Route::post('tenders/import/preview', [ImportController::class, 'preview']);
Route::post('tenders/import/commit', [ImportController::class, 'commit']);
Route::get('tenders/export', [TenderController::class, 'export']);

// Verificador y fusionador de duplicados (antes del resource para evitar colisiones).
Route::get('tenders/duplicates', [MergeController::class, 'duplicates']);
Route::post('tenders/merge', [MergeController::class, 'merge']);

Route::apiResource('tenders', TenderController::class);
Route::apiResource('milestones', MilestoneController::class)->except(['show']);

Route::get('comments', [CommentController::class, 'index']);
Route::post('comments', [CommentController::class, 'store']);
Route::delete('comments/{comment}', [CommentController::class, 'destroy']);

Route::apiResource('members', MemberController::class)->except(['show']);
Route::put('members/{member}/password', [MemberController::class, 'resetPassword']);
Route::put('members/{member}/avatar', [MemberController::class, 'avatar']);

Route::get('settings', [SettingsController::class, 'show']);
Route::put('settings', [SettingsController::class, 'update']);

Route::get('metrics/dashboard', [MetricsController::class, 'dashboard']);
Route::get('metrics/overview', [MetricsController::class, 'overview']);
Route::get('metrics/report', [MetricsController::class, 'report']);
Route::get('metrics/gantt', [MetricsController::class, 'gantt']);
Route::get('metrics/notifications', [MetricsController::class, 'notifications']);

Route::get('executions', [ExecutionController::class, 'index']);
Route::put('executions/{tender}', [ExecutionController::class, 'update']);

Route::get('search', [SearchController::class, 'index']);

Route::get('admin/export', [BackupController::class, 'export']);
Route::post('admin/import', [BackupController::class, 'import']);
Route::post('admin/reset', [BackupController::class, 'reset']);
