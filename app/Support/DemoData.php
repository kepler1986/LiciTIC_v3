<?php

namespace App\Support;

/**
 * Datos demo canonicos (espejo de `defaults` en resources/js/app.js).
 * Fuente unica usada por el DatabaseSeeder y como fallback de settings/stats.
 * Claves en camelCase (igual que el frontend); el seeder las mapea a snake_case.
 */
class DemoData
{
    public static function tenders(): array
    {
        return [
            ['id' => 'lic-1', 'title' => 'Servicios Cloud Hibrida', 'client' => 'BBVA', 'code' => 'BBVA-2025-18', 'lot' => '1', 'deadline' => '2025-06-06T14:00', 'status' => 'En preparacion', 'budget' => '850000.00', 'economicOffer' => '', 'economicOfferWaived' => false, 'owner' => 'Laura Gomez', 'description' => 'Migracion y servicios gestionados de cloud hibrida.'],
            ['id' => 'lic-2', 'title' => 'Infraestructura CPD', 'client' => 'Orange', 'code' => 'Orange-2025-27', 'lot' => 'Unico', 'deadline' => '2025-05-16T12:00', 'status' => 'En evaluacion', 'budget' => '620000.00', 'economicOffer' => '', 'economicOfferWaived' => false, 'owner' => 'Javier Ruiz', 'description' => 'Diseno de arquitectura y renovacion de CPD.'],
            ['id' => 'lic-3', 'title' => 'Puesto de Trabajo Seguro', 'client' => 'ADIF', 'code' => 'ADIF-2025-09', 'lot' => '2', 'deadline' => '2025-05-28T13:30', 'status' => 'En analisis', 'budget' => '410000.00', 'economicOffer' => '', 'economicOfferWaived' => false, 'owner' => 'Marta Sanchez', 'description' => 'Modernizacion de endpoint, identidad y soporte.'],
            ['id' => 'lic-4', 'title' => 'Plataforma de Datos', 'client' => 'Ayuntamiento de Madrid', 'code' => 'MAD-2025-33', 'lot' => 'Unico', 'deadline' => '2025-06-12T15:00', 'status' => 'En analisis', 'budget' => '720000.00', 'economicOffer' => '', 'economicOfferWaived' => false, 'owner' => 'Carlos Martin', 'description' => 'Gobierno del dato, ingesta y cuadros de mando.'],
            ['id' => 'lic-5', 'title' => 'Servicios de Ciberseguridad', 'client' => 'DGT', 'code' => 'DGT-2025-21', 'lot' => '3', 'deadline' => '2025-06-20T14:00', 'status' => 'En preparacion', 'budget' => '980000.00', 'economicOffer' => '', 'economicOfferWaived' => false, 'owner' => 'Elena Torres', 'description' => 'SOC, respuesta a incidentes y hardening.'],
        ];
    }

    public static function events(): array
    {
        return [
            ['id' => 'evt-1', 'title' => 'RFP BBVA', 'tender' => 'Servicios Cloud Hibrida', 'date' => '2025-05-06', 'type' => 'RFP', 'owner' => 'Laura Gomez', 'status' => 'Pendiente'],
            ['id' => 'evt-2', 'title' => 'Presentacion INE', 'tender' => 'Plataforma de Datos', 'date' => '2025-05-08', 'type' => 'Presentacion', 'owner' => 'Carlos Martin', 'status' => 'Confirmado'],
            ['id' => 'evt-3', 'title' => 'Entrega Orange', 'tender' => 'Infraestructura CPD', 'date' => '2025-05-16', 'type' => 'Entrega', 'owner' => 'Javier Ruiz', 'status' => 'Critico'],
            ['id' => 'evt-4', 'title' => 'Revision Tecnica', 'tender' => 'Puesto de Trabajo Seguro', 'date' => '2025-05-20', 'type' => 'Revision', 'owner' => 'Marta Sanchez', 'status' => 'Pendiente'],
        ];
    }

    public static function team(): array
    {
        return [
            ['id' => 'usr-1', 'name' => 'Carlos Martin', 'username' => 'carlos', 'role' => 'admin', 'email' => 'carlos@bidsuite.local', 'status' => 'Activo', 'password' => '1234', 'passwordResetAt' => ''],
            ['id' => 'usr-2', 'name' => 'Laura Gomez', 'username' => 'laura', 'role' => 'user', 'email' => 'laura@bidsuite.local', 'status' => 'Activo', 'password' => '1234', 'passwordResetAt' => ''],
            ['id' => 'usr-3', 'name' => 'Javier Ruiz', 'username' => 'javier', 'role' => 'user', 'email' => 'javier@bidsuite.local', 'status' => 'Activo', 'password' => '1234', 'passwordResetAt' => ''],
            ['id' => 'usr-4', 'name' => 'Marta Sanchez', 'username' => 'marta', 'role' => 'user', 'email' => 'marta@bidsuite.local', 'status' => 'Activo', 'password' => '1234', 'passwordResetAt' => ''],
            ['id' => 'usr-5', 'name' => 'Elena Torres', 'username' => 'elena', 'role' => 'user', 'email' => 'elena@bidsuite.local', 'status' => 'Activo', 'password' => '1234', 'passwordResetAt' => ''],
        ];
    }

    public static function stats(): array
    {
        return ['targetWinRate' => '58', 'monthlyGoal' => '50'];
    }

    public static function settings(): array
    {
        return [
            'appName' => 'BidSuite',
            'pageTitle' => 'BidSuite',
            'tagline' => 'Optimiza tu estrategia con datos',
            'logoLetter' => 'B',
            'primaryColor' => '#1d4ed8',
            'favicon' => '',
            'passwordPolicy' => 'Minimo 4 caracteres; se aceptan 4 digitos.',
            'coAuthorOwnerLoadPercent' => '75',
            'coAuthorLoadPercent' => '50',
            'statusColors' => [
                'En analisis' => '#f59e0b',
                'En preparacion' => '#2563eb',
                'En evaluacion' => '#7c3aed',
                'Descartada' => '#e11d48',
                'Desistida' => '#64748b',
                'Perdida' => '#991b1b',
                'Ganada' => '#16a34a',
            ],
        ];
    }
}
