<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>BidSuite</title>
        <link rel="icon" href="/favicon.ico" data-favicon>
        @fonts
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="min-h-screen bg-[#f6f8fc] font-sans text-[#07183f] antialiased">
        <svg class="hidden">
            <symbol id="icon-home" viewBox="0 0 24 24"><path d="M3 10.8 12 3l9 7.8v9.7a1 1 0 0 1-1 1h-5.2v-6.2H9.2v6.2H4a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>
            <symbol id="icon-file" viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3v5h5M8.8 12h6.4M8.8 16h6.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
            <symbol id="icon-calendar" viewBox="0 0 24 24"><path d="M5 5h14a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 19 21H5a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 5 5Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
            <symbol id="icon-users" viewBox="0 0 24 24"><path d="M8.5 11.5a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm7.7-.4a2.7 2.7 0 1 0 0-5.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M2.8 20a5.8 5.8 0 0 1 11.4 0M14.8 15.1a5.4 5.4 0 0 1 6.4 4.9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
            <symbol id="icon-chart" viewBox="0 0 24 24"><path d="M5 20V9M12 20V4M19 20v-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M3 20h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
            <symbol id="icon-folder" viewBox="0 0 24 24"><path d="M3.5 7.5h7l2 2h8v9.8a1.2 1.2 0 0 1-1.2 1.2H4.7a1.2 1.2 0 0 1-1.2-1.2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M3.5 7.5V5.8h6.2l1.6 1.7" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></symbol>
            <symbol id="icon-team" viewBox="0 0 24 24"><path d="M12 12.2a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5.2 20.4a6.8 6.8 0 0 1 13.6 0M4.5 11.8a2.6 2.6 0 0 0 1.8-4.5M19.5 11.8a2.6 2.6 0 0 1-1.8-4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
            <symbol id="icon-search" viewBox="0 0 24 24"><path d="m20 20-4.4-4.4M10.7 18a7.3 7.3 0 1 1 0-14.6 7.3 7.3 0 0 1 0 14.6Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
            <symbol id="icon-bell" viewBox="0 0 24 24"><path d="M18 9.6a6 6 0 0 0-12 0c0 7-2.2 7.3-2.2 7.3h16.4S18 16.6 18 9.6Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9.8 20a2.5 2.5 0 0 0 4.4 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></symbol>
            <symbol id="icon-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></symbol>
            <symbol id="icon-rocket" viewBox="0 0 24 24"><path d="M13.6 4.2c2.2-.8 4.4-.8 6.2 0 .8 1.8.8 4 0 6.2-1.2 3.4-4.6 6.5-8.5 8l-5.7-5.7c1.5-3.9 4.6-7.3 8-8.5Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8 18.2 4.6 21l1.1-4.5M5.8 12.9 3 11.4l4.2-2M11.1 18.2l1.5 2.8 2-4.2M15.5 9.2h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></symbol>
        </svg>

        <div class="flex min-h-screen" data-app>
            <aside class="hidden w-[300px] shrink-0 bg-[#061b49] text-white shadow-[8px_0_30px_rgba(7,24,63,0.12)] lg:flex lg:flex-col">
                <div class="flex items-center justify-between px-8 py-7">
                    <a href="#inicio" class="flex items-center gap-3" aria-label="Ir a inicio">
                        <span class="grid size-10 place-items-center rounded-lg bg-cyan-400 text-[#052052] shadow-lg shadow-cyan-500/30" data-logo-box>
                            <span class="text-2xl font-bold leading-none" data-logo-letter>B</span>
                        </span>
                        <span class="text-2xl font-semibold" data-app-name>BidSuite</span>
                    </a>
                </div>

                <nav class="mt-5 space-y-2 px-4" aria-label="Principal" data-nav></nav>

                <div class="mx-5 mb-7 mt-auto rounded-lg bg-blue-600/45 p-7 text-center shadow-2xl shadow-blue-950/20">
                    <svg class="mx-auto size-15 text-white"><use href="#icon-rocket"/></svg>
                    <h2 class="mt-5 text-xl font-semibold leading-snug">Informe ejecutivo diario</h2>
                    <p class="mt-4 text-sm leading-6 text-blue-50">Genera el documento con presentaciones del dia y adjudicaciones recibidas.</p>
                    <a href="#informe" class="mt-7 inline-flex h-12 items-center gap-3 rounded-lg border border-white/35 px-5 text-sm font-semibold">Generar informe</a>
                </div>
            </aside>

            <main class="min-w-0 flex-1">
                <header class="sticky top-0 z-10 border-b border-[#dfe6f2] bg-white/92 px-4 py-4 backdrop-blur md:px-8">
                    <div class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                        <div class="flex flex-1 flex-col gap-3 md:flex-row">
                            <select class="h-12 rounded-lg border border-[#d7e0ee] bg-white px-4 text-sm font-bold text-[#21345d] lg:hidden" data-mobile-nav aria-label="Cambiar seccion"></select>
                            <label class="flex h-12 max-w-3xl flex-1 items-center rounded-lg border border-[#d7e0ee] bg-white px-5 shadow-sm">
                                <svg class="size-5 text-[#7082a4]"><use href="#icon-search"/></svg>
                                <input class="ml-4 min-w-0 flex-1 text-sm font-medium text-[#07183f] outline-none placeholder:text-[#7082a4]" data-search placeholder="Buscar licitaciones, hitos, personas..." />
                            </label>
                        </div>

                        <div class="flex items-center justify-between gap-5">
                            <button class="relative grid size-11 place-items-center rounded-lg text-[#455d87] hover:bg-[#f2f5fb]" type="button" data-open-notifications title="Notificaciones">
                                <svg class="size-6"><use href="#icon-bell"/></svg>
                                <span class="absolute right-2 top-1 grid size-5 place-items-center rounded-full bg-rose-500 text-[11px] font-bold text-white" data-notification-count>0</span>
                            </button>
                            <div class="hidden h-8 w-px bg-[#dfe6f2] sm:block"></div>
                            <button class="flex items-center gap-3 rounded-lg p-1 text-left hover:bg-[#f2f5fb]" type="button" data-profile>
                                <span class="grid size-12 place-items-center rounded-full bg-[#f1d3c4] text-sm font-bold text-[#3e251d] ring-4 ring-white" data-profile-avatar>CM</span>
                                <span class="hidden sm:block">
                                    <span class="block text-sm font-bold" data-current-user-name>Carlos Martin</span>
                                    <span class="block text-xs font-medium text-[#7082a4]" data-current-user-role>Director de Licitaciones</span>
                                </span>
                            </button>
                            <button class="btn-secondary hidden sm:inline-flex" type="button" data-logout>Salir</button>
                            <button class="inline-flex h-12 items-center gap-3 rounded-lg bg-blue-700 px-5 text-sm font-bold text-white shadow-lg shadow-blue-700/20" type="button" data-primary-action>
                                <svg class="size-5"><use href="#icon-plus"/></svg>
                                <span class="hidden sm:inline">Anadir</span>
                            </button>
                        </div>
                    </div>
                </header>

                <div class="px-4 py-6 md:px-8" data-content></div>
            </main>
        </div>

        <div class="fixed inset-0 z-50 hidden items-center justify-center bg-[#07183f]/45 p-4" data-modal aria-hidden="true">
            <div class="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <div class="flex items-center justify-between border-b border-[#e7edf6] px-6 py-4">
                    <h2 class="text-lg font-bold" id="modal-title" data-modal-title></h2>
                    <button class="grid size-9 place-items-center rounded-lg hover:bg-[#f2f5fb]" type="button" data-close-modal aria-label="Cerrar">x</button>
                </div>
                <div class="p-6" data-modal-body></div>
            </div>
        </div>
    </body>
</html>
