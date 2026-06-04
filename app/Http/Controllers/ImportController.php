<?php

namespace App\Http\Controllers;

use App\Services\TenderImport;
use Illuminate\Http\Request;

class ImportController extends Controller
{
    public function __construct(private TenderImport $import)
    {
    }

    /** POST /api/tenders/import/preview — clasifica filas parseadas como create/update. */
    public function preview(Request $request)
    {
        $rows = $request->input('rows', []);

        return response()->json($this->import->preview(is_array($rows) ? $rows : []));
    }

    /** POST /api/tenders/import/commit — aplica las filas seleccionadas en transaccion. */
    public function commit(Request $request)
    {
        $rows = $request->input('rows', []);

        return response()->json($this->import->commit(is_array($rows) ? $rows : []));
    }
}
