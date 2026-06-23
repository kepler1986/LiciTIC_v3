const sections = [
    { id: 'inicio', label: 'Inicio Lici', icon: 'home' },
    { id: 'ejecucion', label: 'Inicio Ejecucion', icon: 'rocket' },
    { id: 'licitaciones', label: 'Licitaciones', icon: 'file' },
    { id: 'calendario', label: 'Calendario', icon: 'calendar' },
    { id: 'estadisticas', label: 'Estadisticas', icon: 'chart' },
    { id: 'gantt', label: 'Gantt', icon: 'chart' },
    { id: 'informe', label: 'Informe', icon: 'file' },
    { id: 'busqueda', label: 'Busqueda', icon: 'search' },
    { id: 'importar', label: 'Importar', icon: 'file' },
    { id: 'equipo', label: 'Equipo', icon: 'team' },
    { id: 'admin', label: 'Admin', icon: 'team' },
];

const defaults = {
    tenders: [
        { id: 'lic-1', title: 'Servicios Cloud Hibrida', client: 'BBVA', code: 'BBVA-2025-18', lot: '1', deadline: '2025-06-06T14:00', status: 'En preparacion', budget: '850000.00', economicOffer: '', economicOfferWaived: false, owner: 'Laura Gomez', description: 'Migracion y servicios gestionados de cloud hibrida.' },
        { id: 'lic-2', title: 'Infraestructura CPD', client: 'Orange', code: 'Orange-2025-27', lot: 'Unico', deadline: '2025-05-16T12:00', status: 'En evaluacion', budget: '620000.00', economicOffer: '', economicOfferWaived: false, owner: 'Javier Ruiz', description: 'Diseno de arquitectura y renovacion de CPD.' },
        { id: 'lic-3', title: 'Puesto de Trabajo Seguro', client: 'ADIF', code: 'ADIF-2025-09', lot: '2', deadline: '2025-05-28T13:30', status: 'En analisis', budget: '410000.00', economicOffer: '', economicOfferWaived: false, owner: 'Marta Sanchez', description: 'Modernizacion de endpoint, identidad y soporte.' },
        { id: 'lic-4', title: 'Plataforma de Datos', client: 'Ayuntamiento de Madrid', code: 'MAD-2025-33', lot: 'Unico', deadline: '2025-06-12T15:00', status: 'En analisis', budget: '720000.00', economicOffer: '', economicOfferWaived: false, owner: 'Carlos Martin', description: 'Gobierno del dato, ingesta y cuadros de mando.' },
        { id: 'lic-5', title: 'Servicios de Ciberseguridad', client: 'DGT', code: 'DGT-2025-21', lot: '3', deadline: '2025-06-20T14:00', status: 'En preparacion', budget: '980000.00', economicOffer: '', economicOfferWaived: false, owner: 'Elena Torres', description: 'SOC, respuesta a incidentes y hardening.' },
    ],
    events: [
        { id: 'evt-1', title: 'RFP BBVA', tender: 'Servicios Cloud Hibrida', date: '2025-05-06', type: 'RFP', owner: 'Laura Gomez', status: 'Pendiente' },
        { id: 'evt-2', title: 'Presentacion INE', tender: 'Plataforma de Datos', date: '2025-05-08', type: 'Presentacion', owner: 'Carlos Martin', status: 'Confirmado' },
        { id: 'evt-3', title: 'Entrega Orange', tender: 'Infraestructura CPD', date: '2025-05-16', type: 'Entrega', owner: 'Javier Ruiz', status: 'Critico' },
        { id: 'evt-4', title: 'Revision Tecnica', tender: 'Puesto de Trabajo Seguro', date: '2025-05-20', type: 'Revision', owner: 'Marta Sanchez', status: 'Pendiente' },
    ],
    team: [
        { id: 'usr-1', name: 'Carlos Martin', username: 'carlos', role: 'admin', email: 'carlos@bidsuite.local', status: 'Activo', password: '1234', passwordResetAt: '' },
        { id: 'usr-2', name: 'Laura Gomez', username: 'laura', role: 'user', email: 'laura@bidsuite.local', status: 'Activo', password: '1234', passwordResetAt: '' },
        { id: 'usr-3', name: 'Javier Ruiz', username: 'javier', role: 'user', email: 'javier@bidsuite.local', status: 'Activo', password: '1234', passwordResetAt: '' },
        { id: 'usr-4', name: 'Marta Sanchez', username: 'marta', role: 'user', email: 'marta@bidsuite.local', status: 'Activo', password: '1234', passwordResetAt: '' },
        { id: 'usr-5', name: 'Elena Torres', username: 'elena', role: 'user', email: 'elena@bidsuite.local', status: 'Activo', password: '1234', passwordResetAt: '' },
    ],
    stats: { targetWinRate: '58', monthlyGoal: '50' },
    settings: {
        appName: 'BidSuite',
        pageTitle: 'BidSuite',
        tagline: 'Optimiza tu estrategia con datos',
        logoLetter: 'B',
        primaryColor: '#1d4ed8',
        favicon: '',
        passwordPolicy: 'Minimo 4 caracteres; se aceptan 4 digitos.',
        coAuthorOwnerLoadPercent: '75',
        coAuthorLoadPercent: '50',
        statusColors: {
            'En analisis': '#f59e0b',
            'En preparacion': '#2563eb',
            'En evaluacion': '#7c3aed',
            Descartada: '#e11d48',
            Desistida: '#64748b',
            Perdida: '#991b1b',
            Ganada: '#16a34a',
            'Resuelta por cliente': '#b91c1c',
        },
    },
};

const schemas = {
    tenders: [
        ['code', 'Expediente'], ['title', 'Objeto'], ['lot', 'Lote'], ['client', 'Organismo'], ['deadline', 'Fecha y hora fin aceptacion ofertas', 'datetime-local'],
        ['status', 'Estado', 'select', ['En analisis', 'En preparacion', 'En evaluacion', 'Descartada', 'Desistida', 'Perdida', 'Ganada', 'Resuelta por cliente']],
        ['budget', 'PBL', 'currency'], ['economicOffer', 'Oferta economica', 'currency'], ['economicOfferWaived', 'Anular oferta economica', 'checkbox'], ['owner', 'Responsable'], ['coAuthored', 'Coautoria', 'checkbox'], ['coAuthor', 'Responsable coautor'], ['adjudicationDate', 'Fecha adjudicacion recibida', 'optionalDate'], ['description', 'Descripcion', 'textarea'],
    ],
    events: [
        ['title', 'Titulo'], ['tender', 'Licitacion', 'tenderSelect'], ['type', 'Tipo'], ['preparationOther', 'Preparacion-Otros', 'checkbox'],
        ['receptionDate', 'Fecha de recepcion', 'conditionalDate'], ['date', 'Fecha fin', 'date'], ['status', 'Estado', 'select', ['Pendiente', 'Confirmado', 'Critico', 'Completado']],
    ],
    team: [
        ['name', 'Nombre'], ['username', 'Usuario'], ['role', 'Rol', 'select', ['admin', 'manager', 'user']], ['email', 'Email', 'email'],
        ['status', 'Estado', 'select', ['Activo', 'Ausente', 'Externo']],
    ],
    stats: [
        ['targetWinRate', 'Objetivo tasa de exito %', 'number'], ['monthlyGoal', 'Objetivo mensual', 'number'],
    ],
    settings: [
        ['appName', 'Nombre visible de la aplicacion'],
        ['pageTitle', 'Titulo de la pagina'],
        ['tagline', 'Texto lateral'],
        ['logoLetter', 'Inicial del logo'],
        ['primaryColor', 'Color principal', 'color'],
        ['passwordPolicy', 'Politica de contrasenas', 'textarea'],
        ['coAuthorOwnerLoadPercent', 'Carga autor en coautoria %', 'percentage'],
        ['coAuthorLoadPercent', 'Carga coautor en coautoria %', 'percentage'],
    ],
};

const entityLabels = {
    tenders: 'licitacion',
    events: 'hito',
    team: 'miembro',
    stats: 'objetivos',
    settings: 'parametros globales',
};

let app = document.querySelector('[data-app]');
let content = document.querySelector('[data-content]');
let nav = document.querySelector('[data-nav]');
let mobileNav = document.querySelector('[data-mobile-nav]');
let searchInput = document.querySelector('[data-search]');
let modal = document.querySelector('[data-modal]');
let modalTitle = document.querySelector('[data-modal-title]');
let modalBody = document.querySelector('[data-modal-body]');
let favicon = document.querySelector('[data-favicon]');
const shellMarkup = app.innerHTML;
const memoryStorage = {};
let currentSection = 'inicio';
let query = '';
let state = { tenders: [], events: [], team: [], settings: {}, stats: {} };
let auth = null;
let importPreview = [];
let importRaw = '';
let importWarnings = [];
let selectedImportIndexes = new Set();
let searchResultsData = { tenders: [], events: [], team: [] };
let searchResultsQuery = '';
let activeSearchTab = 'tenders';
let calendarCursor = startOfMonth(today());
let tenderSort = { column: 'deadline', direction: 'asc' };
let tenderColumnFilters = {};
let pendingTenderFilterFocus = null;
let tenderPage = 1;
const tenderPerPage = 50;
let tenderPageMeta = { total: 0, lastPage: 1, currentPage: 1 };
// Sub-navegacion interna de la seccion Inicio Ejecucion (estado local, no en hash).
let ejecucionView = 'home'; // 'home' | 'list' | 'detail' | 'gantt'
let ejecucionTenderId = null;
let ejecucionDraft = null; // copia de trabajo del detalle en edicion
let ejecucionGanttYear = new Date().getFullYear(); // año visible en el GANTT de pagos
let ejecucionListQuery = ''; // texto del buscador de la lista de licitaciones ganadas
let ejecucionShowHidden = false; // mostrar las licitaciones ocultas en lugar de las activas
let ejecucionCollapsed = { managed: false, pending: false, hidden: false }; // grupos plegados de la lista
let ejecucionPlanMonthsCollapsed = {}; // por indice de plan: listado de meses plegado (por defecto plegado)

let duplicateGroups = []; // grupos de posibles licitaciones duplicadas detectados por el servidor
let mergeDraft = null; // estado de la fusion en curso: { tenders, primaryId, fields, executionSourceId }
let viewComments = []; // comentarios cargados de la licitacion abierta en el detalle

function bindElements() {
    app = document.querySelector('[data-app]');
    content = document.querySelector('[data-content]');
    nav = document.querySelector('[data-nav]');
    mobileNav = document.querySelector('[data-mobile-nav]');
    searchInput = document.querySelector('[data-search]');
    modal = document.querySelector('[data-modal]');
    modalTitle = document.querySelector('[data-modal-title]');
    modalBody = document.querySelector('[data-modal-body]');
    favicon = document.querySelector('[data-favicon]');
}

function storageGet(key) {
    try {
        return window.localStorage?.getItem(key) ?? memoryStorage[key] ?? null;
    } catch {
        return memoryStorage[key] ?? null;
    }
}

function storageSet(key, value) {
    memoryStorage[key] = value;

    try {
        window.localStorage?.setItem(key, value);
    } catch {}
}

function storageRemove(key) {
    delete memoryStorage[key];

    try {
        window.localStorage?.removeItem(key);
    } catch {}
}

// ---------- Capa de datos (API REST) ----------
// La BD MySQL es la fuente de verdad. El cliente pide a cada vista solo lo que
// necesita (pagina, rango, agregados). state.team/settings/stats se cargan una
// vez (son pequenos); state.tenders/events guardan SOLO el subconjunto de la
// vista actual; `view` cachea los payloads de metricas/paginacion.
const api = {
    async request(method, path, { params, body } = {}) {
        const url = new URL(path, window.location.origin);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    url.searchParams.set(key, value);
                }
            });
        }

        const options = { method, headers: { Accept: 'application/json' } };

        if (body !== undefined) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        return fetch(url, options);
    },
    async get(path, params) {
        const response = await this.request('GET', path, { params });

        if (!response.ok) {
            throw new Error(`GET ${path} -> ${response.status}`);
        }

        return response.json();
    },
    async mutate(method, path, body, params) {
        const response = await this.request(method, path, { body, params });

        if (response.status === 409) {
            const data = await response.json().catch(() => ({}));
            const error = new Error('conflict');
            error.conflict = true;
            error.data = data;
            throw error;
        }

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            const error = new Error(data.message || `${method} ${path} -> ${response.status}`);
            error.data = data;
            throw error;
        }

        return response.status === 204 ? null : response.json();
    },
};

// Parametros de scoping: el servidor acota por usuario cuando no es admin.
function scopeParams(extra = {}) {
    const user = currentUser();
    // Admin y manager ven todos los datos (sin filtro de scope); el resto, solo lo suyo.
    const seeAll = canSeeAll();
    const params = { isAdmin: seeAll ? 1 : 0, viewer: user?.name ?? '', ...extra };

    if (!seeAll && user) {
        params.scope = user.name;
    }

    return params;
}

const view = {};

function loadAuth() {
    const stored = storageGet('bidsuite-auth');

    if (!stored) {
        return null;
    }

    try {
        const parsed = JSON.parse(stored);

        return state.team.some((member) => member.id === parsed.userId) ? parsed : null;
    } catch {
        storageRemove('bidsuite-auth');

        return null;
    }
}

// Carga inicial de los datos pequenos y compartidos (equipo + parametros).
async function loadGlobals() {
    const [members, settings] = await Promise.all([
        api.get('/api/members'),
        api.get('/api/settings'),
    ]);

    state.team = members.data ?? [];
    state.settings = settings.settings ?? {};
    state.stats = settings.stats ?? {};
}

// Refresca el equipo/parametros tras una mutacion que los afecte.
async function refreshGlobals() {
    await loadGlobals();
}

// Maneja un conflicto de bloqueo optimista (409): avisa y recarga la vista.
function handleMutationError(error) {
    if (error?.conflict) {
        alert('Otro usuario modifico este registro mientras lo editabas. Se recargaran los datos.');
    } else {
        alert(error?.message || 'No se pudo completar la operacion. Reintenta.');
    }
}

function currentUser() {
    return state.team.find((member) => member.id === auth?.userId) ?? null;
}

function isAdmin() {
    return currentUser()?.role === 'admin';
}

function isManager() {
    return currentUser()?.role === 'manager';
}

// Admin y manager ven todos los datos y operan sobre todo el equipo.
function canSeeAll() {
    return isAdmin() || isManager();
}

// Que secciones puede ver cada rol: 'admin' solo admin; 'equipo'/'importar'
// admin y manager; el resto, todos.
function sectionAllowed(sectionId) {
    if (sectionId === 'admin' || sectionId === 'ejecucion') {
        return isAdmin();
    }

    // Equipo, Importar, Estadisticas e Informe: solo admin y manager (no el rol user).
    if (['equipo', 'importar', 'estadisticas', 'informe'].includes(sectionId)) {
        return canSeeAll();
    }

    return true;
}

function userNames() {
    if (!canSeeAll()) {
        return [currentUser()?.name].filter(Boolean);
    }

    return state.team.filter((member) => member.status === 'Activo').map((member) => member.name);
}

function today() {
    const date = new Date();

    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function todayIso() {
    const date = today();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${date.getFullYear()}-${month}-${day}`;
}

function currentMonthKey() {
    return todayIso().slice(0, 7);
}

function parseDate(value) {
    if (!value) {
        return null;
    }

    const [datePart, timePart = '00:00'] = value.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);

    return new Date(year, month - 1, day, hour || 0, minute || 0);
}

function dateSortValue(value) {
    const timestamp = parseDate(value)?.getTime();

    return Number.isFinite(timestamp) ? timestamp : Number.MAX_SAFE_INTEGER;
}

function compareDateValues(firstValue, secondValue) {
    const firstTimestamp = dateSortValue(firstValue);
    const secondTimestamp = dateSortValue(secondValue);

    if (firstTimestamp !== secondTimestamp) {
        return firstTimestamp - secondTimestamp;
    }

    return String(firstValue ?? '').localeCompare(String(secondValue ?? ''));
}

function addDays(date, days) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);

    return next;
}

function isBusinessDay(date) {
    return date.getDay() >= 1 && date.getDay() <= 5;
}

function subtractBusinessDays(date, days) {
    const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    let remaining = days;

    while (remaining > 0) {
        next.setDate(next.getDate() - 1);

        if (isBusinessDay(next)) {
            remaining -= 1;
        }
    }

    return next;
}

function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date, months) {
    return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function dateKey(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${date.getFullYear()}-${month}-${day}`;
}

function sameDate(firstDate, secondDate) {
    return dateKey(firstDate) === dateKey(secondDate);
}

function shortDateLabel(date) {
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function shortWeekday(date) {
    return ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'][date.getDay()];
}

function monthLabel(date) {
    return new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(date);
}

function isUpcomingTenderDue(tender) {
    const deadline = parseDate(tender.deadline);

    if (!deadline || ['Ganada', 'Descartada', 'Desistida', 'Perdida', 'Resuelta por cliente'].includes(tender.status)) {
        return false;
    }

    const start = today();
    const end = new Date(start);
    end.setDate(start.getDate() + 7);

    return deadline >= start && deadline <= end;
}

function isTenderActive(tender) {
    return !['Ganada', 'Descartada', 'Desistida', 'Perdida', 'Resuelta por cliente'].includes(tender.status);
}

function isTenderDueThisWeek(tender) {
    const deadline = parseDate(tender.deadline);

    if (!deadline || !isUpcomingTenderDue(tender)) {
        return false;
    }

    return deadline >= today() && deadline <= endOfWeek(today());
}

function endOfWeek(date) {
    const end = new Date(date);
    const daysUntilSunday = (7 - end.getDay()) % 7;

    end.setDate(end.getDate() + daysUntilSunday);
    end.setHours(23, 59, 59, 999);

    return end;
}

function previousMonthKey() {
    return dateKey(addMonths(today(), -1)).slice(0, 7);
}

function tenderDeadlineMonth(tender) {
    return tender.deadline?.slice(0, 7) ?? '';
}

function activeTenderTrendLabel(tenders) {
    const activeTenders = tenders.filter(isTenderActive);
    const currentMonthCount = activeTenders.filter((tender) => tenderDeadlineMonth(tender) === currentMonthKey()).length;
    const previousMonthCount = activeTenders.filter((tender) => tenderDeadlineMonth(tender) === previousMonthKey()).length;
    const change = previousMonthCount
        ? Math.round(((currentMonthCount - previousMonthCount) / previousMonthCount) * 100)
        : (currentMonthCount ? 100 : 0);
    const prefix = change > 0 ? '+ ' : change < 0 ? '- ' : '';

    return `${prefix}${Math.abs(change)}% vs. mes anterior`;
}

function trendToneClass(trend) {
    return trend.trim().startsWith('-') ? 'text-rose-600' : 'text-emerald-600';
}

function tenderCountForUser(user) {
    return ganttLoadForUserOn(user, today());
}

function workloadForUser(user) {
    // Carga "actual" del usuario: la calcula el servidor (workloadMap) para
    // dashboard/estadisticas/equipo; en Gantt cae al calculo local sobre el
    // subconjunto ya cargado.
    if (user && Object.prototype.hasOwnProperty.call(workloadMap, user.name)) {
        return workloadMap[user.name];
    }

    return Math.round(tenderCountForUser(user) * 33 * 100) / 100;
}

function formatLoadValue(value) {
    const rounded = Math.round(value * 100) / 100;

    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2).replace(/0$/, '');
}

function coAuthorLoadShare(setting) {
    const percent = Number(state.settings[setting]);

    return Number.isFinite(percent) ? percent / 100 : Number(defaults.settings[setting]) / 100;
}

function tenderLoadForUser(tender, user) {
    if (!user || !tender) {
        return 0;
    }

    const hasCoAuthor = Boolean(tender.coAuthored && tender.coAuthor);

    if (tender.owner === user.name) {
        return hasCoAuthor ? coAuthorLoadShare('coAuthorOwnerLoadPercent') : 1;
    }

    if (hasCoAuthor && tender.coAuthor === user.name) {
        return coAuthorLoadShare('coAuthorLoadPercent');
    }

    return 0;
}

function userParticipatesInTender(tender, user) {
    return tenderLoadForUser(tender, user) > 0;
}

function tenderInvolvesKnownUser(tender, userNamesSet) {
    return userNamesSet.has(tender.owner) || (tender.coAuthored && userNamesSet.has(tender.coAuthor));
}

function tenderAssigneeLabel(tender) {
    return tender.coAuthored && tender.coAuthor
        ? `${tender.owner} + ${tender.coAuthor}`
        : tender.owner;
}

function workloadTone(user) {
    return workloadForUser(user) > 100 ? 'bg-rose-600' : 'bg-violet-600';
}

function workloadAverageUsers() {
    return (isAdmin() ? state.team : [currentUser()]).filter((member) => member?.role === 'user');
}

function averageWorkloadFor(users) {
    return users.length ? Math.round(users.reduce((total, user) => total + workloadForUser(user), 0) / users.length) : 0;
}

function hasEconomicOffer(tender) {
    return !isEconomicOfferWaived(tender) && (Number(tender.economicOffer) || 0) > 0;
}

function isEconomicOfferWaived(tender) {
    return Boolean(tender.economicOfferWaived);
}

function needsEconomicOffer(tender) {
    return tender.status === 'En evaluacion' && !hasEconomicOffer(tender) && !isEconomicOfferWaived(tender);
}

function evaluatedTendersWithEconomicOffer(tenders) {
    return tenders.filter((tender) => tender.status === 'En evaluacion' && hasEconomicOffer(tender));
}

function economicOfferTotal(tenders) {
    return tenders.reduce((total, tender) => total + (hasEconomicOffer(tender) ? Number(tender.economicOffer) : 0), 0);
}

function averageEconomicOffer(tenders) {
    const withOffer = evaluatedTendersWithEconomicOffer(tenders);

    return withOffer.length ? Math.round(economicOfferTotal(withOffer) / withOffer.length) : 0;
}

function missingEconomicOfferTenders() {
    return visibleItems('tenders')
        .filter(needsEconomicOffer)
        .sort((first, second) => compareDateValues(first.deadline, second.deadline));
}

function missingEconomicOfferCount(tenders) {
    return tenders.filter(needsEconomicOffer).length;
}

function overloadedUsers() {
    return state.team.filter((member) => workloadForUser(member) > 100);
}

// El servidor ya devuelve los datos acotados al usuario; aqui solo se exponen
// los subconjuntos ya cargados para la vista actual.
function visibleItems(entity) {
    if (entity === 'team') {
        return canSeeAll() ? state.team : [currentUser()].filter(Boolean);
    }

    return state[entity] ?? [];
}

function visibleEvents() {
    return state.events ?? [];
}

function canCreate(entity) {
    // Manager crea como admin (incluye miembros); usuarios normales, solo licitaciones e hitos.
    return canSeeAll() || ['tenders', 'events'].includes(entity);
}

function canEdit(entity, item = null) {
    if (isAdmin()) {
        return true;
    }

    // Manager puede editar todo salvo los parametros globales (seccion Admin).
    if (isManager()) {
        return !['settings', 'stats'].includes(entity);
    }

    const user = currentUser();

    if (!user || ['team', 'settings', 'stats'].includes(entity)) {
        return false;
    }

    if (!item) {
        return canCreate(entity);
    }

    return item.owner === user.name || item.coAuthor === user.name || item.person === user.name;
}

// Borrar es exclusivo de admin: el manager no puede eliminar nada.
function canDelete() {
    return isAdmin();
}

function renderLogin() {
    const background = state.settings.loginBackground;
    const card = `
        <section class="w-full max-w-md rounded-lg border border-[#dfe6f2] bg-white p-7 shadow-xl">
            <div class="flex items-center gap-3">
                <span class="grid size-11 place-items-center rounded-lg bg-blue-700 text-2xl font-bold text-white">${escapeHtml(state.settings.logoLetter || 'B')}</span>
                <div>
                    <h1 class="text-xl font-bold">${escapeHtml(state.settings.appName)}</h1>
                    <p class="text-sm font-semibold text-[#7082a4]">Acceso de usuarios</p>
                </div>
            </div>
            <form class="mt-7 grid gap-4" data-login-form>
                <label class="field-label">Usuario o email<input class="field-control" name="username" autocomplete="username" required></label>
                <label class="field-label">Password<input class="field-control" type="password" name="password" minlength="4" autocomplete="current-password" required></label>
                <p class="hidden rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-700" data-login-error>Usuario o password incorrectos.</p>
                <button class="btn-primary h-12" type="submit">Entrar</button>
            </form>
        </section>
    `;

    // Sin imagen: login centrado sobre fondo plano (como antes).
    if (!background) {
        app.innerHTML = `<main class="grid min-h-screen w-full place-items-center bg-[#f6f8fc] px-4">${card}</main>`;

        return;
    }

    // Con imagen: tarjeta a la izquierda (fondo plano) e imagen rellenando la derecha.
    app.innerHTML = `
        <main class="flex min-h-screen w-full">
            <div class="flex w-full items-center justify-center bg-[#f6f8fc] px-4 lg:w-[540px] lg:shrink-0">
                ${card}
            </div>
            <div class="hidden flex-1 bg-cover bg-center lg:block" style="background-image:url('${background}')" aria-hidden="true"></div>
        </main>
    `;
}

function applySettings() {
    document.title = state.settings.pageTitle || state.settings.appName;
    document.documentElement.style.setProperty('--brand-color', state.settings.primaryColor || '#1d4ed8');
    document.querySelectorAll('[data-app-name]').forEach((element) => {
        element.textContent = state.settings.appName;
    });
    document.querySelectorAll('[data-logo-letter]').forEach((element) => {
        element.textContent = (state.settings.logoLetter || 'B').slice(0, 2).toUpperCase();
    });
    document.querySelectorAll('[data-sidebar-tagline]').forEach((element) => {
        element.textContent = state.settings.tagline;
    });
    document.querySelectorAll('[data-logo-box]').forEach((element) => {
        element.style.backgroundColor = state.settings.primaryColor || '#22d3ee';
        element.style.color = '#ffffff';
    });

    if (state.settings.favicon) {
        favicon.setAttribute('href', state.settings.favicon);
    }
}

function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, (character) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
    }[character]));
}

function formatDate(value) {
    if (!value) {
        return '';
    }

    const [datePart, timePart] = value.split('T');
    const [year, month, day] = datePart.split('-');

    if (timePart) {
        return `${day}/${month}/${year} ${timePart.slice(0, 5)}`;
    }

    return `${day}/${month}/${year}`;
}

function initials(name = '') {
    return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

function statusClass(status = '') {
    if (['Critico', 'Descartada', 'Perdida', 'Resuelta por cliente'].includes(status)) {
        return 'status-rose';
    }

    if (['En analisis', 'En preparacion'].includes(status)) {
        return 'status-amber';
    }

    if (['Revisado', 'Aprobado', 'Ganada', 'Activo', 'Confirmado', 'Completado'].includes(status)) {
        return 'status-green';
    }

    return 'status-blue';
}

function tenderStatusOptions() {
    return schemas.tenders.find(([name]) => name === 'status')?.[3] ?? [];
}

function activeTenderOptions() {
    return visibleItems('tenders')
        .filter((tender) => !['Descartada', 'Desistida', 'Perdida'].includes(tender.status))
        .map((tender) => tender.title);
}

function tenderByTitle(title) {
    return state.tenders.find((tender) => tender.title === title) ?? null;
}

function statusColor(status = '') {
    const color = state.settings.statusColors?.[status] ?? '';

    return /^#[0-9a-f]{6}$/i.test(color) ? color : '';
}

function statusPill(status = '') {
    const color = statusColor(status);
    const style = color ? ` style="background:${escapeHtml(color)};border-color:${escapeHtml(color)};color:#ffffff"` : '';

    return `<span class="status-pill ${statusClass(status)}"${style}>${escapeHtml(status)}</span>`;
}

function filtered(items) {
    if (!query) {
        return items;
    }

    return items.filter((item) => normalizeSearchText(Object.values(item).join(' ')).includes(searchTerm()));
}

function normalizeSearchText(value) {
    return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function searchTerm() {
    return normalizeSearchText(query).trim();
}

function buildSearchCache() {
    return [
        ...visibleItems('tenders').map((item) => searchRecord('tenders', item, item.title, [
            item.code,
            item.client,
            item.lot,
            item.owner,
            item.coAuthor,
            item.status,
            formatDate(item.deadline),
        ])),
        ...visibleItems('events').map((item) => searchRecord('events', item, item.title, [
            item.tender,
            item.type,
            item.owner,
            item.status,
            formatDate(item.date),
        ])),
        ...visibleItems('team').map((item) => searchRecord('team', item, item.name, [
            item.username,
            item.email,
            item.role,
            item.status,
        ])),
    ];
}

function searchRecord(entity, item, title, parts) {
    const subtitle = parts.filter(Boolean).join(' · ');

    return {
        entity,
        id: item.id,
        item,
        title: title ?? '',
        subtitle,
        text: normalizeSearchText([title, subtitle, ...Object.values(item)].join(' ')),
    };
}

// Los resultados de busqueda los provee el servidor (LIKE/FULLTEXT sobre 30k).
function globalSearchResults() {
    return searchResultsData;
}

// Convierte un registro plano del servidor en el "record" que pintan las tarjetas.
function searchRecordFor(entity, item) {
    let title = '';
    let parts = [];

    if (entity === 'tenders') {
        title = item.title;
        parts = [item.code, item.client, item.owner, item.status];
    } else if (entity === 'events') {
        title = item.title;
        parts = [item.tender, item.type, item.owner, formatDate(item.date)];
    } else {
        title = item.name;
        parts = [item.username, item.email, item.role];
    }

    return { entity, id: item.id, item, title: title ?? '', subtitle: parts.filter(Boolean).join(' · ') };
}

// Sin sugerencias en vivo: con 30k registros la busqueda se resuelve en servidor
// al confirmar (Enter o boton), no en cada pulsacion.
function renderSearchSuggestions() {
    const suggestions = document.querySelector('[data-search-suggestions]');

    if (suggestions) {
        suggestions.classList.add('hidden');
        suggestions.innerHTML = '';
    }
}

function searchEntityLabel(entity) {
    return {
        tenders: 'Licitacion',
        events: 'Hito',
        team: 'Persona',
    }[entity] ?? '';
}

async function submitGlobalSearch(displayQuery = query) {
    searchResultsQuery = (displayQuery ?? '').trim();

    if (!searchResultsQuery) {
        return;
    }

    try {
        const data = await api.get('/api/search', scopeParams({ q: searchResultsQuery }));
        searchResultsData = {
            tenders: (data.tenders ?? []).map((item) => searchRecordFor('tenders', item)),
            events: (data.events ?? []).map((item) => searchRecordFor('events', item)),
            team: (data.team ?? []).map((item) => searchRecordFor('team', item)),
        };
    } catch {
        searchResultsData = { tenders: [], events: [], team: [] };
    }

    activeSearchTab = ['tenders', 'events', 'team'].find((tab) => searchResultsData[tab].length) ?? 'tenders';
    setSection('busqueda');
}

function setSection(section) {
    currentSection = sections.some((item) => item.id === section) ? section : 'inicio';
    window.location.hash = currentSection;
    render();
}

function renderChrome() {
    const availableSections = sections.filter((item) => sectionAllowed(item.id));
    const user = currentUser();

    nav.innerHTML = availableSections.map((item) => `
        <a href="#${item.id}" class="nav-link ${item.id === currentSection ? 'nav-link-active' : ''}" data-section="${item.id}">
            <svg class="size-6"><use href="#icon-${item.icon}"/></svg>
            ${item.label}
        </a>
    `).join('');

    mobileNav.innerHTML = availableSections.map((item) => `<option value="${item.id}" ${item.id === currentSection ? 'selected' : ''}>${item.label}</option>`).join('');
    document.querySelector('[data-current-user-name]').textContent = user?.name ?? '';
    document.querySelector('[data-current-user-role]').textContent = auth?.impersonatorId ? `personificando ${user?.role}` : user?.role ?? '';
    const avatarEl = document.querySelector('[data-profile-avatar]');
    if (user?.avatar) {
        avatarEl.classList.add('overflow-hidden');
        avatarEl.innerHTML = `<img src="${user.avatar}" alt="${escapeHtml(user.name)}" class="size-full object-cover">`;
    } else {
        avatarEl.classList.remove('overflow-hidden');
        avatarEl.textContent = initials(user?.name ?? '');
    }
    document.querySelector('[data-notification-count]').textContent = notificationCount();
}

let renderToken = 0;

async function render() {
    if (!auth || !currentUser()) {
        renderLogin();
        return;
    }

    applySettings();
    if (!sectionAllowed(currentSection)) {
        currentSection = 'inicio';
    }
    renderChrome();

    const token = ++renderToken;
    const sectionAtStart = currentSection;

    try {
        // Las notificaciones se cargan en cada render, independientes de la seccion,
        // para que el badge no dependa de los datos de la vista actual.
        await Promise.all([loadSectionData(currentSection), loadNotifications()]);
    } catch (error) {
        if (token !== renderToken) {
            return;
        }
        content.innerHTML = '<section class="panel"><p class="text-sm font-semibold text-rose-600">No se pudieron cargar los datos del servidor. Comprueba la conexion y reintenta.</p></section>';
        return;
    }

    // Si el usuario cambio de seccion mientras cargaba, descartamos este render.
    if (token !== renderToken || sectionAtStart !== currentSection) {
        return;
    }

    renderChrome();

    const title = sections.find((item) => item.id === currentSection)?.label ?? 'Inicio';
    const renderers = {
        inicio: renderDashboard,
        ejecucion: renderEjecucion,
        licitaciones: () => renderCollection('tenders'),
        calendario: renderCalendar,
        estadisticas: renderStats,
        gantt: renderGantt,
        informe: renderExecutiveReport,
        busqueda: renderSearchResults,
        importar: renderImportTenders,
        equipo: () => renderCollection('team'),
        admin: renderAdmin,
    };

    content.innerHTML = `
        <div class="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
                <p class="text-sm font-bold uppercase text-[#7082a4]">${escapeHtml(state.settings.appName)}</p>
                <h1 class="mt-1 text-2xl font-bold">${title}</h1>
            </div>
            <div class="flex flex-wrap gap-3">${sectionActions()}</div>
        </div>
        ${auth?.impersonatorId ? impersonationBanner() : ''}
        ${renderers[currentSection]()}
    `;
    restoreTenderFilterFocus();
    if (currentSection === 'ejecucion' && ejecucionView === 'list') {
        filterEjecucionList();
    }
}

// Carga del servidor solo lo que la seccion necesita (pagina, rango o agregados).
async function loadSectionData(section) {
    if (section === 'inicio') {
        const [dashboard, overview, monthEvents, deadlineTenders] = await Promise.all([
            api.get('/api/metrics/dashboard', scopeParams()),
            api.get('/api/metrics/overview', scopeParams()),
            api.get('/api/milestones', scopeParams({ month: dateKey(calendarCursor).slice(0, 7) })),
            api.get('/api/tenders', scopeParams({ status: 'En preparacion', per_page: 100, sort: 'deadline', direction: 'asc' })),
        ]);
        view.dashboard = dashboard;
        view.overview = overview;
        state.events = monthEvents.data ?? [];
        state.tenders = deadlineTenders.data ?? [];
        setWorkloadMap(dashboard.workloadPerUser);
        return;
    }

    if (section === 'ejecucion') {
        const result = await api.get('/api/executions', scopeParams());
        view.executions = result.data ?? [];
        return;
    }

    if (section === 'licitaciones') {
        const params = tenderListParams({ page: tenderPage, perPage: tenderPerPage, includeFilters: true });
        const result = await api.get('/api/tenders', params);
        state.tenders = result.data ?? [];
        tenderPageMeta = result.meta ?? { total: 0, lastPage: 1, currentPage: 1 };
        return;
    }

    if (section === 'calendario') {
        const month = dateKey(calendarCursor).slice(0, 7);
        const [events, tenders] = await Promise.all([
            api.get('/api/milestones', scopeParams({ month })),
            // Licitaciones para el selector del formulario de hito (las mas proximas por deadline).
            api.get('/api/tenders', scopeParams({ per_page: 200, sort: 'deadline', direction: 'desc' })),
        ]);
        state.events = events.data ?? [];
        state.tenders = tenders.data ?? [];
        return;
    }

    if (section === 'estadisticas') {
        view.overview = await api.get('/api/metrics/overview', scopeParams());
        setWorkloadMapFromOverview(view.overview);
        return;
    }

    if (section === 'gantt') {
        const from = todayIso();
        const to = dateKey(addDays(today(), 28));
        const result = await api.get('/api/metrics/gantt', scopeParams({ from, to }));
        view.gantt = result;
        state.tenders = result.tenders ?? [];
        return;
    }

    if (section === 'informe') {
        view.report = await api.get('/api/metrics/report', scopeParams({ month: currentMonthKey() }));
        return;
    }

    if (section === 'equipo') {
        const [members, overview] = await Promise.all([
            api.get('/api/members'),
            api.get('/api/metrics/overview', scopeParams()),
        ]);
        state.team = members.data ?? [];
        view.overview = overview;
        setWorkloadMapFromOverview(overview);
        return;
    }

    if (section === 'admin') {
        view.dashboard = await api.get('/api/metrics/dashboard', scopeParams());
        setWorkloadMap(view.dashboard.workloadPerUser);
        return;
    }

    // importar / busqueda no necesitan precarga (usan settings/equipo ya cargados
    // o cargan bajo demanda en sus propias acciones).
}

// Carga las alertas (presentaciones proximas + ofertas pendientes) del servidor.
// Persiste en view.notifications entre secciones, asi el badge nunca cae a 0 por
// estar en una vista que no carga eventos/ofertas. Errores se ignoran (mantiene el valor previo).
async function loadNotifications() {
    try {
        view.notifications = await api.get('/api/metrics/notifications', scopeParams());
    } catch {
        // se conserva el ultimo valor conocido
    }
}

let workloadMap = {};

function setWorkloadMap(workloadPerUser = []) {
    workloadMap = {};
    workloadPerUser.forEach((entry) => {
        workloadMap[entry.name] = entry.load;
    });
}

function setWorkloadMapFromOverview(overview) {
    workloadMap = {};
    (overview?.userStats ?? []).forEach((entry) => {
        workloadMap[entry.name] = entry.load;
    });
}

function impersonationBanner() {
    const admin = state.team.find((member) => member.id === auth.impersonatorId);

    return `
        <div class="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
            <span>Estas operando como ${escapeHtml(currentUser()?.name)}. Admin original: ${escapeHtml(admin?.name ?? 'admin')}.</span>
            <button class="btn-secondary" type="button" data-stop-impersonation>Volver a admin</button>
        </div>
    `;
}

function sectionActions() {
    const actionBySection = {
        inicio: ['tenders', 'Nueva licitacion'],
        licitaciones: ['tenders', 'Nueva licitacion'],
        calendario: ['events', 'Nuevo hito'],
        equipo: ['team', 'Nuevo miembro'],
    };

    if (currentSection === 'ejecucion') {
        return '';
    }

    if (currentSection === 'informe') {
        return '<button class="btn-secondary" type="button" data-action="copy-report">Copiar documento</button>';
    }

    if (currentSection === 'importar') {
        return '<button class="btn-primary" type="button" data-action="import-preview">Previsualizar</button>';
    }

    if (currentSection === 'estadisticas') {
        return isAdmin() ? `<button class="btn-secondary" type="button" data-action="edit-stats">Editar objetivos</button>` : '';
    }

    if (currentSection === 'admin') {
        return `<button class="btn-primary" type="button" data-action="edit-settings">Guardar parametros</button>`;
    }

    const [entity, label] = actionBySection[currentSection] ?? actionBySection.inicio;

    if (currentSection === 'licitaciones') {
        const duplicatesButton = isAdmin()
            ? '<button class="btn-secondary" type="button" data-action="check-duplicates">Verificar duplicados</button>'
            : '';
        const createButton = canCreate(entity)
            ? `<button class="btn-primary" type="button" data-action="new" data-entity="${entity}">${label}</button>`
            : '';

        return `${duplicatesButton}<button class="btn-secondary" type="button" data-action="export-tenders">Exportar Excel</button><button class="btn-secondary" type="button" data-action="export-all-tenders">Exportar todo</button>${createButton}`;
    }

    // En licitaciones, el admin puede verificar y fusionar posibles duplicados.
    const duplicatesButton = currentSection === 'licitaciones' && isAdmin()
        ? '<button class="btn-secondary" type="button" data-action="check-duplicates">Verificar duplicados</button>'
        : '';

    if (!canCreate(entity)) {
        return duplicatesButton;
    }

    return `${duplicatesButton}<button class="btn-primary" type="button" data-action="new" data-entity="${entity}">${label}</button>`;
}

function tenderListParams({ page = null, perPage = null, includeFilters = true, all = false } = {}) {
    const params = scopeParams({
        sort: tenderSort.column,
        direction: tenderSort.direction,
    });

    if (page !== null) {
        params.page = page;
    }

    if (perPage !== null) {
        params.per_page = perPage;
    }

    if (all) {
        params.all = 1;
    }

    if (includeFilters) {
        Object.entries(tenderColumnFilters).forEach(([column, value]) => {
            if (value) {
                params[`filters[${column}]`] = value;
            }
        });
    }

    return params;
}

function renderDashboard() {
    const k = view.dashboard?.kpis ?? {};
    const activeTrend = trendLabel(k.activeTrendPercent ?? 0);

    return `
        <section class="dashboard-metrics-frame">
            <div class="dashboard-metrics-row">
                ${metricCard('Licitaciones activas', k.active ?? 0, activeTrend, 'folder', 'blue', trendToneClass(activeTrend))}
                ${metricCard('Entregas proximas', k.due ?? 0, `${k.dueThisWeek ? `+ ${k.dueThisWeek}` : '0'} esta semana`, 'calendar', 'teal')}
                ${metricCard('Tasa de exito', `${k.successRate ?? 0}%`, k.successRateMeta ?? 'Sin cerradas', 'chart', 'green')}
                ${metricCard('Carga del equipo', `${k.workload ?? 0}%`, 'Media del equipo', 'team', 'violet')}
            </div>
        </section>
        ${renderEconomicOfferAlert(view.dashboard?.missingOffers ?? [], view.dashboard?.missingOffersTotal ?? 0)}
        <section class="mt-6 grid gap-6 xl:grid-cols-[1.05fr_1fr]">
            <article class="panel">${renderCalendarPreview()}</article>
            <article class="panel">${renderWorkloadPanel()}</article>
        </section>
        <section class="mt-6 grid gap-6 xl:grid-cols-[1.05fr_1fr]">
            <article class="panel">${renderStatsBody()}</article>
            <article class="panel">${renderDeadlineList()}</article>
        </section>
    `;
}

// --- Inicio Ejecucion: gestion de licitaciones ganadas (solo admin) ---

function ejecucionNumber(value) {
    const num = Number(String(value ?? '').replace(',', '.').replace(/[^0-9.\-]/g, ''));

    return Number.isFinite(num) ? num : 0;
}

// Suma meses preservando el dia (recortando al ultimo dia del mes si se desborda).
function ejecucionAddMonths(isoDate, months) {
    const [year, month, day] = isoDate.split('-').map(Number);
    const target = new Date(year, (month - 1) + months, 1);
    const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();

    return dateKey(new Date(target.getFullYear(), target.getMonth(), Math.min(day, lastDay)));
}

// Un pago (hito o cuota) queda anulado si la licitacion se resolvio por cliente
// y su fecha cae en el mes de resolucion o posterior.
function isPaymentAnnulled(source, date) {
    if (!source?.resolvedByClient || !source?.resolutionDate) {
        return false;
    }
    const month = String(date ?? '').slice(0, 7);

    return /^\d{4}-\d{2}$/.test(month) && month >= String(source.resolutionDate).slice(0, 7);
}

// Suma de las ampliaciones de oferta economica aportadas por las prorrogas.
function ejecucionExtensionsOffer(draft) {
    return (Array.isArray(draft.extensions) ? draft.extensions : [])
        .reduce((sum, extension) => sum + ejecucionNumber(extension.offerAmount), 0);
}

// Contenedores de pago: la ejecucion base mas cada prorroga (cada una con sus hitos y planes).
function ejecucionAllContainers(draft) {
    return [draft, ...(Array.isArray(draft.extensions) ? draft.extensions : [])];
}

// Resuelve el contenedor de pagos segun el ambito: '' (base) o 'ext:<i>' (prorroga i).
function ejecucionContainer(scope) {
    if (!ejecucionDraft) {
        return null;
    }
    if (scope && scope.startsWith('ext:')) {
        return ejecucionDraft.extensions[Number(scope.slice(4))] ?? null;
    }

    return ejecucionDraft;
}

// Oferta de un ambito: la base para '' o el importe de la prorroga para 'ext:<i>'.
function ejecucionScopeOffer(scope, baseOffer) {
    if (scope && scope.startsWith('ext:')) {
        return ejecucionNumber(ejecucionDraft?.extensions[Number(scope.slice(4))]?.offerAmount);
    }

    return baseOffer;
}

// Fin total de ejecucion: ultima fecha entre el fin de ejecucion y las prorrogas (YYYY-MM-DD).
function totalExecutionEnd(record) {
    const dates = [];
    if (record.endDate) {
        dates.push(record.endDate);
    }
    (record.extensions ?? []).forEach((extension) => {
        if (extension.endDate) {
            dates.push(extension.endDate);
        }
    });

    return dates.reduce((max, date) => (date > max ? date : max), '');
}

// Mes (YYYY-MM) del recordatorio de garantia: un mes despues del fin total de ejecucion.
function guaranteeMonthFor(record) {
    if (!record.hasGuarantee) {
        return '';
    }
    const end = totalExecutionEnd(record);

    return end ? ejecucionAddMonths(end, 1).slice(0, 7) : '';
}

// Suma de las cuotas de todos los planes (base y prorrogas), excluyendo las anuladas.
function ejecucionPlansTotal(draft) {
    return ejecucionAllContainers(draft).reduce((sum, container) =>
        sum + (Array.isArray(container.installmentPlans) ? container.installmentPlans : [])
            .reduce((s, plan) => s + (Array.isArray(plan.cuotas) ? plan.cuotas : [])
                .reduce((t, cuota) => t + (isPaymentAnnulled(draft, cuota.date) ? 0 : ejecucionNumber(cuota.amount)), 0), 0), 0);
}

// Suma de los pagos por hitos (base y prorrogas), excluyendo los anulados.
function ejecucionMilestonesTotal(draft) {
    return ejecucionAllContainers(draft).reduce((sum, container) =>
        sum + (Array.isArray(container.milestonePayments) ? container.milestonePayments : [])
            .reduce((s, payment) => s + (isPaymentAnnulled(draft, payment.date) ? 0 : ejecucionNumber(payment.amount)), 0), 0);
}

// Totales economicos del borrador: hitos + cuotas (base y prorrogas) y restante por asignar.
function computeEjecucionSchedule(draft, baseOffer) {
    const extensionsOffer = ejecucionExtensionsOffer(draft);
    const offer = baseOffer + extensionsOffer;
    const milestoneTotal = ejecucionMilestonesTotal(draft);
    const installmentsTotal = ejecucionPlansTotal(draft);
    const penalty = draft.resolvedByClient ? ejecucionNumber(draft.penaltyAmount) : 0;

    return {
        baseOffer,
        extensionsOffer,
        offer,
        milestoneTotal,
        installmentsTotal,
        penalty,
        remaining: offer - milestoneTotal - installmentsTotal,
    };
}

// Fechas mensuales de un plan segun inicio/fin/periodicidad.
function planMonths(plan) {
    const frequency = Math.round(ejecucionNumber(plan.frequencyMonths));
    const start = plan.startDate || '';
    const end = plan.endDate || '';

    if (!(start && end && frequency > 0 && start <= end)) {
        return [];
    }

    const dates = [];
    let guard = 0;
    let cursor = start;
    while (cursor <= end && guard < 600) {
        dates.push(cursor);
        cursor = ejecucionAddMonths(start, frequency * dates.length);
        guard += 1;
    }

    return dates;
}

// Importe por cuota de un plan segun su modo, repartido entre `count` meses:
//  - perMonth: importe fijo indicado por cuota.
//  - total:    pago total del plan dividido entre los meses.
//  - remainder: (oferta - hitos - cuotas de los OTROS planes) dividido entre los meses.
function planInstallmentAmount(plan, count, draft, offer, planIndex) {
    if (count <= 0) {
        return 0;
    }

    if (plan.mode === 'perMonth') {
        return ejecucionNumber(plan.amount);
    }

    if (plan.mode === 'total') {
        return ejecucionNumber(plan.amount) / count;
    }

    // remainder
    const milestoneTotal = (Array.isArray(draft.milestonePayments) ? draft.milestonePayments : [])
        .reduce((sum, payment) => sum + ejecucionNumber(payment.amount), 0);
    const otherPlansTotal = (Array.isArray(draft.installmentPlans) ? draft.installmentPlans : [])
        .reduce((sum, other, index) => {
            if (index === planIndex) {
                return sum;
            }
            return sum + (Array.isArray(other.cuotas) ? other.cuotas : [])
                .reduce((s, cuota) => s + ejecucionNumber(cuota.amount), 0);
        }, 0);
    const remaining = Math.max(0, offer - milestoneTotal - otherPlansTotal);

    return remaining / count;
}

// Copia editable de los pagos por hitos / planes de un contenedor (base o prorroga).
function draftMilestonePayments(list) {
    return (list ?? []).map((payment) => ({
        concept: payment.concept ?? '',
        amount: payment.amount ?? '',
        date: payment.date ?? '',
    }));
}

function draftInstallmentPlans(list) {
    return (list ?? []).map((plan) => ({
        name: plan.name ?? '',
        mode: plan.mode ?? 'remainder',
        startDate: plan.startDate ?? '',
        endDate: plan.endDate ?? '',
        frequencyMonths: plan.frequencyMonths ?? '',
        amount: plan.amount ?? '',
        cuotas: (plan.cuotas ?? []).map((cuota) => ({
            name: cuota.name ?? '',
            date: cuota.date ?? '',
            amount: cuota.amount ?? '',
        })),
    }));
}

function draftFromRecord(record) {
    return {
        signed: Boolean(record.signed),
        visible: Boolean(record.visible),
        startDate: record.startDate ?? '',
        endDate: record.endDate ?? '',
        milestonePayments: draftMilestonePayments(record.milestonePayments),
        installmentPlans: draftInstallmentPlans(record.installmentPlans),
        extensions: (record.extensions ?? []).map((extension) => ({
            id: extension.id ?? '',
            endDate: extension.endDate ?? '',
            offerAmount: extension.offerAmount ?? '',
            milestonePayments: draftMilestonePayments(extension.milestonePayments),
            installmentPlans: draftInstallmentPlans(extension.installmentPlans),
        })),
        resolvedByClient: Boolean(record.resolvedByClient),
        resolutionDate: record.resolutionDate ?? '',
        penaltyAmount: record.penaltyAmount ?? '',
        hasGuarantee: Boolean(record.hasGuarantee),
        guaranteeAmount: record.guaranteeAmount ?? '',
    };
}

function renderEjecucion() {
    if (!isAdmin()) {
        return '<section class="panel"><p class="text-sm font-semibold text-[#7082a4]">No tienes permisos para esta seccion.</p></section>';
    }

    if (ejecucionView === 'detail') {
        return renderEjecucionDetail();
    }

    if (ejecucionView === 'gantt') {
        return renderEjecucionGantt();
    }

    if (ejecucionView === 'list') {
        return renderEjecucionList();
    }

    return renderEjecucionHome();
}

function renderEjecucionHome() {
    return `
        <section class="panel">
            <div class="flex min-h-40 flex-col items-start justify-end gap-4">
                <button class="btn-primary" type="button" data-action="ejecucion-list">Gestionar ejecucion de licitaciones ganadas</button>
                <button class="btn-secondary" type="button" data-action="ejecucion-gantt">Calendario de pagos (GANTT)</button>
            </div>
        </section>
    `;
}

// Tarjeta de una licitacion ganada. `context` decide las acciones rapidas:
//  'managed'  -> ya esta en el calendario de pagos (boton para quitarla)
//  'pending'  -> aun no esta en el calendario (boton para anadirla)
//  'hidden'   -> esta oculta (boton para mostrarla)
function renderEjecucionCard(item, context) {
    const signedPill = item.signed
        ? '<span class="status-pill status-green">Firmada</span>'
        : '<span class="status-pill status-amber">Sin firmar</span>';
    // Texto indexado para el buscador (objeto, expediente, organismo, responsable).
    const searchText = [item.title, item.code, item.client, item.owner].filter(Boolean).join(' ').toLowerCase();
    const id = escapeHtml(item.tenderId);

    const calendarButton = context === 'pending'
        ? `<button class="btn-secondary" type="button" data-action="ejecucion-toggle-visible" data-id="${id}" data-value="1">+ Anadir al calendario</button>`
        : context === 'managed'
            ? `<button class="link-action" type="button" data-action="ejecucion-toggle-visible" data-id="${id}" data-value="0">Quitar del calendario</button>`
            : '';

    const hiddenButton = context === 'hidden'
        ? `<button class="btn-secondary" type="button" data-action="ejecucion-toggle-hidden" data-id="${id}" data-value="0">Mostrar</button>`
        : `<button class="link-action" type="button" data-action="ejecucion-toggle-hidden" data-id="${id}" data-value="1">Ocultar</button>`;

    return `
        <div class="rounded-lg border border-[#e7edf6] bg-white p-4" data-ejecucion-card data-search="${escapeHtml(searchText)}">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <button type="button" class="flex-1 text-left transition hover:opacity-70" data-action="view" data-entity="tenders" data-id="${escapeHtml(item.id)}" title="Ver y editar la licitacion">
                    <p class="font-bold text-[#21345d]">${escapeHtml(item.title)}</p>
                    <p class="mt-1 text-sm font-semibold text-[#7082a4]">${escapeHtml(item.code ?? '')} · ${escapeHtml(item.client ?? '')} · ${formatEconomicOffer(item)}</p>
                </button>
                <div class="flex flex-wrap items-center justify-end gap-3">
                    ${signedPill}
                    ${calendarButton}
                    <button class="btn-secondary" type="button" data-action="ejecucion-open" data-id="${id}">Gestionar</button>
                    ${hiddenButton}
                </div>
            </div>
        </div>
    `;
}

function ejecucionGroupHtml(key, title, hint, cards, accentClass) {
    const collapsed = ejecucionCollapsed[key];
    const cardContext = key === 'hidden' ? 'hidden' : null;

    return `
        <div data-ejecucion-group data-key="${key}">
            <button type="button" class="mt-6 flex w-full items-center gap-2 border-b border-[#e7edf6] pb-2 text-left transition hover:opacity-70" data-action="ejecucion-toggle-group" data-key="${key}">
                <span class="w-4 text-xs font-bold text-[#7082a4]" data-chevron>${collapsed ? '▸' : '▾'}</span>
                <span class="size-2.5 rounded-full ${accentClass}"></span>
                <h3 class="text-sm font-bold uppercase text-[#21345d]">${title} <span class="text-[#7082a4]">(${cards.length})</span></h3>
                ${hint ? `<span class="text-xs font-semibold text-[#7082a4]">· ${hint}</span>` : ''}
            </button>
            <div class="mt-3 grid gap-3 ${collapsed ? 'hidden' : ''}" data-ejecucion-cards>
                ${cards.length ? cards.map((item) => renderEjecucionCard(item, cardContext ?? (item.visible ? 'managed' : 'pending'))).join('') : '<p class="text-sm font-semibold text-[#7082a4]">Ninguna.</p>'}
            </div>
        </div>
    `;
}

function renderEjecucionList() {
    const items = view.executions ?? [];
    const hiddenItems = items.filter((item) => item.hidden);
    const activeItems = items.filter((item) => !item.hidden);
    const managed = activeItems.filter((item) => item.visible);
    const pending = activeItems.filter((item) => !item.visible);

    const hiddenToggle = `<button class="btn-secondary ${ejecucionShowHidden ? 'ring-2 ring-blue-300' : ''}" type="button" data-action="ejecucion-show-hidden-toggle">${ejecucionShowHidden ? 'Ver activas' : `Ver ocultas (${hiddenItems.length})`}</button>`;

    const body = ejecucionShowHidden
        ? ejecucionGroupHtml('hidden', 'Ocultas', 'no aparecen en la lista activa ni en el calendario', hiddenItems, 'bg-slate-400')
        : `
            ${ejecucionGroupHtml('managed', 'En el calendario de pagos', 'gestionadas', managed, 'bg-emerald-500')}
            ${ejecucionGroupHtml('pending', 'Pendientes de anadir al calendario', 'aun no estan en el calendario', pending, 'bg-amber-500')}
        `;

    return `
        <section class="panel">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <h2 class="text-lg font-bold">Licitaciones ganadas</h2>
                <div class="flex flex-wrap gap-3">
                    ${hiddenToggle}
                    <button class="btn-secondary" type="button" data-action="ejecucion-gantt">Calendario de pagos</button>
                    <button class="btn-secondary" type="button" data-action="ejecucion-back">Volver</button>
                </div>
            </div>
            ${items.length ? `
                <label class="field-label mt-4">Buscar licitacion
                    <input class="field-control" type="search" placeholder="Filtra por objeto, expediente, organismo o responsable..." value="${escapeHtml(ejecucionListQuery)}" data-ejecucion-search autocomplete="off">
                </label>
            ` : ''}
            ${items.length ? body : '<p class="mt-5 text-sm font-semibold text-[#7082a4]">No hay licitaciones en estado Ganada.</p>'}
            <p class="mt-5 hidden text-sm font-semibold text-[#7082a4]" data-ejecucion-empty>Ninguna licitacion coincide con la busqueda.</p>
        </section>
    `;
}

// Filtra (mostrar/ocultar) las tarjetas de la lista de ejecucion segun el buscador, sin
// re-render completo para no perder el foco. Oculta tambien los grupos que queden vacios.
function filterEjecucionList() {
    const groups = document.querySelectorAll('[data-ejecucion-group]');
    if (!groups.length) {
        return;
    }
    const q = ejecucionListQuery.trim().toLowerCase();
    let totalVisible = 0;
    groups.forEach((group) => {
        const key = group.dataset.key;
        let groupVisible = 0;
        group.querySelectorAll('[data-ejecucion-card]').forEach((card) => {
            const match = !q || (card.dataset.search ?? '').includes(q);
            card.classList.toggle('hidden', !match);
            if (match) {
                groupVisible += 1;
            }
        });
        // Mientras se busca expandimos el grupo para ver las coincidencias; sin busqueda, respetamos el plegado.
        group.querySelector('[data-ejecucion-cards]')?.classList.toggle('hidden', q === '' && Boolean(ejecucionCollapsed[key]));
        // Al buscar, esconde por completo los grupos sin coincidencias.
        group.classList.toggle('hidden', q !== '' && groupVisible === 0);
        totalVisible += groupVisible;
    });
    document.querySelector('[data-ejecucion-empty]')?.classList.toggle('hidden', totalVisible > 0);
}

// Aplica un cambio parcial (visible/hidden) a la ejecucion y recarga la seccion.
async function patchExecution(tenderId, patch) {
    try {
        await api.mutate('PUT', `/api/executions/${tenderId}`, patch);
    } catch (error) {
        handleMutationError(error);
        return;
    }
    render();
}

function renderEjecucionDetail() {
    const record = (view.executions ?? []).find((item) => item.tenderId === ejecucionTenderId);

    if (!record) {
        return `
            <section class="panel">
                <button class="btn-secondary" type="button" data-action="ejecucion-back">Volver</button>
                <p class="mt-4 text-sm font-semibold text-[#7082a4]">No se encontro la licitacion seleccionada.</p>
            </section>
        `;
    }

    if (!ejecucionDraft) {
        ejecucionDraft = draftFromRecord(record);
    }

    const offer = ejecucionNumber(record.economicOffer);
    const schedule = computeEjecucionSchedule(ejecucionDraft, offer);

    const extensionsHtml = ejecucionDraft.extensions.map((extension, index) => renderExtensionCard(extension, index)).join('');

    return `
        <section class="panel">
            <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 class="text-lg font-bold">${escapeHtml(record.title)}</h2>
                    <p class="mt-1 text-sm font-semibold text-[#7082a4]">${escapeHtml(record.code ?? '')} · ${escapeHtml(record.client ?? '')} · Oferta economica: ${formatEconomicOffer(record)}</p>
                </div>
                <div class="flex gap-3">
                    <button class="btn-secondary" type="button" data-action="ejecucion-back">Volver</button>
                    <button class="btn-primary" type="button" data-action="ejecucion-save">Guardar</button>
                </div>
            </div>

            <div class="mt-6 grid gap-4 sm:grid-cols-2">
                <label class="flex items-center gap-3 rounded-lg border border-[#dfe6f2] p-4 text-sm font-bold text-[#21345d]"><input type="checkbox" data-ejecucion-field="signed" ${ejecucionDraft.signed ? 'checked' : ''}> Firmada</label>
                <label class="flex items-center gap-3 rounded-lg border border-[#dfe6f2] p-4 text-sm font-bold text-[#21345d]"><input type="checkbox" data-ejecucion-field="visible" ${ejecucionDraft.visible ? 'checked' : ''}> Visible en el calendario de pagos</label>
            </div>
            <div class="mt-4 grid gap-4 sm:grid-cols-2">
                <label class="field-label">Fecha inicio de ejecucion<input class="field-control" type="date" value="${escapeHtml(ejecucionDraft.startDate ?? '')}" data-ejecucion-field="startDate"></label>
                <label class="field-label">Fecha fin de ejecucion<input class="field-control" type="date" value="${escapeHtml(ejecucionDraft.endDate ?? '')}" data-ejecucion-field="endDate"></label>
            </div>
            <div class="mt-4 grid gap-4 sm:grid-cols-2">
                <label class="flex items-center gap-3 rounded-lg border border-[#dfe6f2] p-4 text-sm font-bold text-[#21345d]"><input type="checkbox" data-ejecucion-field="hasGuarantee" ${ejecucionDraft.hasGuarantee ? 'checked' : ''}> ¿Hubo garantia?</label>
                <label class="field-label ${ejecucionDraft.hasGuarantee ? '' : 'hidden'}">Importe de la garantia<input class="field-control" type="number" min="0" step="0.01" inputmode="decimal" value="${escapeHtml(ejecucionDraft.guaranteeAmount ?? '')}" data-ejecucion-field="guaranteeAmount"></label>
            </div>
            ${ejecucionDraft.hasGuarantee ? '<p class="mt-2 text-xs font-semibold text-[#7082a4]">Se creara un recordatorio en el calendario un mes despues del fin total de ejecucion (incluidas prorrogas) para recoger la garantia del banco.</p>' : ''}
        </section>

        <section class="panel mt-6">${renderHitosInner(ejecucionDraft, '')}</section>

        <section class="panel mt-6">${renderPlanesInner(ejecucionDraft, '', offer)}</section>

        <section class="panel mt-6">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h3 class="text-lg font-bold">Prorrogas</h3>
                    <p class="mt-1 text-xs font-semibold text-[#7082a4]">Cada prorroga amplia la fecha fin de ejecucion, suma su oferta economica y gestiona sus propios hitos y planes de pago nuevos.</p>
                </div>
                <button class="btn-secondary" type="button" data-action="ejecucion-add-extension">Añadir prorroga</button>
            </div>
            <div class="mt-4 grid gap-4">
                ${ejecucionDraft.extensions.length ? extensionsHtml : '<p class="text-sm font-semibold text-[#7082a4]">Sin prorrogas. Pulsa «Añadir prorroga» para ampliar el periodo de ejecucion con nuevos hitos y planes.</p>'}
            </div>
        </section>

        <section class="panel mt-6">
            <h3 class="text-lg font-bold">Resolucion por cliente</h3>
            <p class="mt-1 text-xs font-semibold text-[#7082a4]">Al marcarla, la licitacion pasa a estado «Resuelta por cliente», se anulan los pagos del mes de resolucion en adelante y la penalizacion figura como cargo en ese mes.</p>
            <div class="mt-4 grid gap-4 sm:grid-cols-3">
                <label class="flex items-center gap-3 rounded-lg border border-[#dfe6f2] p-4 text-sm font-bold text-[#21345d]"><input type="checkbox" data-ejecucion-field="resolvedByClient" ${ejecucionDraft.resolvedByClient ? 'checked' : ''}> Resuelta por el cliente</label>
                <label class="field-label ${ejecucionDraft.resolvedByClient ? '' : 'hidden'}">Fecha de resolucion<input class="field-control" type="date" value="${escapeHtml(ejecucionDraft.resolutionDate ?? '')}" data-ejecucion-field="resolutionDate"></label>
                <label class="field-label ${ejecucionDraft.resolvedByClient ? '' : 'hidden'}">Penalizacion<input class="field-control" type="number" min="0" step="0.01" inputmode="decimal" value="${escapeHtml(ejecucionDraft.penaltyAmount ?? '')}" data-ejecucion-field="penaltyAmount"></label>
            </div>
        </section>

        <section class="panel mt-6">
            <h3 class="text-lg font-bold">Resumen economico</h3>
            <div id="ejecucion-schedule">${ejecucionScheduleHtml(schedule)}</div>
        </section>
    `;
}

// Tarjeta de un plan de pago: configuracion (modo/fechas/importe), botones de generacion y
// la lista editable de meses. Los inputs viven fuera de #ejecucion-schedule, por lo que el
// refresco de metricas no los reconstruye al teclear.
function renderPlanCard(plan, planIndex, offer, scope = '') {
    const subtotal = (plan.cuotas ?? []).reduce((sum, cuota) => sum + (isPaymentAnnulled(ejecucionDraft, cuota.date) ? 0 : ejecucionNumber(cuota.amount)), 0);
    const monthCount = (plan.cuotas ?? []).length;
    const hasMonths = monthCount > 0;
    const monthsCollapsed = ejecucionPlanMonthsCollapsed[`${scope}:${planIndex}`] !== false; // por defecto plegado

    const amountLabel = plan.mode === 'perMonth' ? 'Importe por cuota'
        : plan.mode === 'total' ? 'Pago total del plan'
        : 'Importe (no aplica)';
    const amountDisabled = plan.mode === 'remainder' ? 'disabled' : '';

    const option = (value, label) => `<option value="${value}" ${plan.mode === value ? 'selected' : ''}>${label}</option>`;

    const monthRows = (plan.cuotas ?? []).map((cuota, cuotaIndex) => {
        const annulled = isPaymentAnnulled(ejecucionDraft, cuota.date);

        return `
        <div class="grid gap-2 rounded-lg border border-[#e7edf6] ${annulled ? 'bg-[#f8fafd] opacity-70' : 'bg-white'} p-3 sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:items-end">
            <label class="field-label">Nombre de la cuota${annulled ? ' <span class="text-[10px] font-bold uppercase text-rose-600">anulada</span>' : ''}<input class="field-control ${annulled ? 'line-through text-[#9fb0cc]' : ''}" type="text" value="${escapeHtml(cuota.name ?? '')}" placeholder="Cuota ${cuotaIndex + 1}" data-ejecucion-plan-cuota="${planIndex}" data-scope="${scope}" data-cuota-index="${cuotaIndex}" data-cuota-key="name"></label>
            <label class="field-label">Mes (fecha)<input class="field-control" type="date" value="${escapeHtml(cuota.date ?? '')}" data-ejecucion-plan-cuota="${planIndex}" data-scope="${scope}" data-cuota-index="${cuotaIndex}" data-cuota-key="date"></label>
            <label class="field-label">Importe<input class="field-control ${annulled ? 'line-through text-[#9fb0cc]' : ''}" type="number" min="0" step="0.01" inputmode="decimal" value="${escapeHtml(cuota.amount ?? '')}" data-ejecucion-plan-cuota="${planIndex}" data-scope="${scope}" data-cuota-index="${cuotaIndex}" data-cuota-key="amount"></label>
            <button class="link-danger" type="button" data-action="ejecucion-plan-remove-month" data-plan="${planIndex}" data-scope="${scope}" data-index="${cuotaIndex}">Quitar mes</button>
        </div>
    `;
    }).join('');

    return `
        <div class="rounded-xl border border-[#dfe6f2] bg-[#f8fafd] p-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <label class="field-label flex-1 min-w-48">Nombre del plan de pago
                    <input class="field-control text-base font-bold text-[#21345d]" type="text" value="${escapeHtml(plan.name ?? '')}" placeholder="Plan de pago ${planIndex + 1}" data-ejecucion-plan="${planIndex}" data-scope="${scope}" data-plan-key="name">
                </label>
                <button class="link-danger" type="button" data-action="ejecucion-remove-plan" data-index="${planIndex}" data-scope="${scope}">Eliminar plan</button>
            </div>

            <div class="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                <label class="field-label">Modo
                    <select class="field-control" data-ejecucion-plan="${planIndex}" data-scope="${scope}" data-plan-key="mode">
                        ${option('remainder', 'Dividir el resto')}
                        ${option('perMonth', 'Importe por cuota')}
                        ${option('total', 'Pago total del plan')}
                    </select>
                </label>
                <label class="field-label">Inicio<input class="field-control" type="date" value="${escapeHtml(plan.startDate ?? '')}" data-ejecucion-plan="${planIndex}" data-scope="${scope}" data-plan-key="startDate"></label>
                <label class="field-label">Fin<input class="field-control" type="date" value="${escapeHtml(plan.endDate ?? '')}" data-ejecucion-plan="${planIndex}" data-scope="${scope}" data-plan-key="endDate"></label>
                <label class="field-label">Cada N meses<input class="field-control" type="number" min="1" step="1" inputmode="numeric" value="${escapeHtml(plan.frequencyMonths ?? '')}" data-ejecucion-plan="${planIndex}" data-scope="${scope}" data-plan-key="frequencyMonths"></label>
                <label class="field-label">${amountLabel}<input class="field-control" type="number" min="0" step="0.01" inputmode="decimal" value="${escapeHtml(plan.amount ?? '')}" data-ejecucion-plan="${planIndex}" data-scope="${scope}" data-plan-key="amount" ${amountDisabled}></label>
            </div>

            <div class="mt-3 flex flex-wrap gap-3">
                <button class="btn-secondary" type="button" data-action="ejecucion-generate-plan" data-index="${planIndex}" data-scope="${scope}">Generar meses</button>
                ${hasMonths ? `<button class="btn-secondary" type="button" data-action="ejecucion-recalc-plan" data-index="${planIndex}" data-scope="${scope}">Recalcular importes</button>` : ''}
                <button class="btn-secondary" type="button" data-action="ejecucion-plan-add-month" data-index="${planIndex}" data-scope="${scope}">Anadir mes</button>
            </div>

            ${hasMonths ? `
                <button type="button" class="mt-3 flex w-full items-center gap-2 border-t border-[#e7edf6] pt-3 text-left transition hover:opacity-70" data-action="ejecucion-plan-toggle-months" data-index="${planIndex}" data-scope="${scope}">
                    <span class="w-4 text-xs font-bold text-[#7082a4]">${monthsCollapsed ? '▸' : '▾'}</span>
                    <span class="text-sm font-bold text-[#21345d]">Meses (${monthCount})</span>
                    <span class="text-xs font-semibold text-[#7082a4]">· subtotal ${formatCurrency(subtotal)}</span>
                </button>
                <div class="mt-3 grid gap-3 ${monthsCollapsed ? 'hidden' : ''}">
                    ${monthRows}
                </div>
            ` : `
                <div class="mt-3 grid gap-3">
                    <p class="text-sm font-semibold text-[#7082a4]">Sin meses. Configura inicio, fin y periodicidad y pulsa «Generar meses».</p>
                </div>
            `}

            <p class="mt-3 text-right text-sm font-bold text-[#21345d]">Subtotal del plan: ${formatCurrency(subtotal)}</p>
        </div>
    `;
}

// Fila de un pago por hito (concepto/importe/fecha) para el ambito dado.
function milestonePaymentRow(payment, index, scope = '') {
    const annulled = isPaymentAnnulled(ejecucionDraft, payment.date);

    return `
        <div class="grid gap-2 rounded-lg border border-[#e7edf6] ${annulled ? 'bg-[#f8fafd] opacity-70' : ''} p-3 sm:grid-cols-[2fr_1fr_1fr_auto] sm:items-end">
            <label class="field-label">Concepto${annulled ? ' <span class="text-[10px] font-bold uppercase text-rose-600">anulado</span>' : ''}<input class="field-control ${annulled ? 'line-through text-[#9fb0cc]' : ''}" type="text" value="${escapeHtml(payment.concept ?? '')}" data-ejecucion-payment="${index}" data-scope="${scope}" data-payment-key="concept"></label>
            <label class="field-label">Importe<input class="field-control ${annulled ? 'line-through text-[#9fb0cc]' : ''}" type="number" min="0" step="0.01" inputmode="decimal" value="${escapeHtml(payment.amount ?? '')}" data-ejecucion-payment="${index}" data-scope="${scope}" data-payment-key="amount"></label>
            <label class="field-label">Fecha<input class="field-control" type="date" value="${escapeHtml(payment.date ?? '')}" data-ejecucion-payment="${index}" data-scope="${scope}" data-payment-key="date"></label>
            <button class="link-danger" type="button" data-action="ejecucion-remove-payment" data-index="${index}" data-scope="${scope}">Quitar</button>
        </div>
    `;
}

// Bloque de "Pagos unicos por hitos" para un ambito (base o prorroga).
function renderHitosInner(container, scope = '') {
    const rows = (container.milestonePayments ?? []).map((payment, index) => milestonePaymentRow(payment, index, scope)).join('');

    return `
        <div class="flex flex-wrap items-center justify-between gap-3">
            <h3 class="text-base font-bold">Pagos unicos por hitos</h3>
            <button class="btn-secondary" type="button" data-action="ejecucion-add-payment" data-scope="${scope}">Anadir pago</button>
        </div>
        <div class="mt-4 grid gap-3">
            ${(container.milestonePayments ?? []).length ? rows : '<p class="text-sm font-semibold text-[#7082a4]">Sin pagos por hitos.</p>'}
        </div>
    `;
}

// Bloque de "Planes de pago por cuotas" para un ambito (base o prorroga).
function renderPlanesInner(container, scope, offer) {
    const plansHtml = (container.installmentPlans ?? []).map((plan, index) => renderPlanCard(plan, index, offer, scope)).join('');

    return `
        <div class="flex flex-wrap items-center justify-between gap-3">
            <h3 class="text-base font-bold">Planes de pago por cuotas</h3>
            <button class="btn-secondary" type="button" data-action="ejecucion-add-plan" data-scope="${scope}">Anadir plan de pago</button>
        </div>
        <p class="mt-2 text-xs font-semibold text-[#7082a4]">Cada plan genera sus meses segun inicio, fin y periodicidad. Modos: «Importe por cuota», «Pago total del plan» (se divide entre los meses) o «Dividir el resto» (oferta - hitos - otros planes). Tras anadir o quitar meses, pulsa «Recalcular importes».</p>
        <div class="mt-4 grid gap-4">
            ${(container.installmentPlans ?? []).length ? plansHtml : '<p class="text-sm font-semibold text-[#7082a4]">Sin planes de pago. Pulsa «Anadir plan de pago» para crear el primero.</p>'}
        </div>
    `;
}

// Tarjeta de una prorroga: nueva fecha fin, su oferta economica y sus propios hitos y planes.
function renderExtensionCard(extension, index) {
    const scope = `ext:${index}`;
    const offer = ejecucionNumber(extension.offerAmount);

    return `
        <div class="rounded-xl border border-[#dfe6f2] bg-[#f8fafd] p-4">
            <div class="flex flex-wrap items-start justify-between gap-3">
                <h4 class="text-base font-bold text-[#21345d]">Prorroga ${index + 1}</h4>
                <button class="link-danger" type="button" data-action="ejecucion-remove-extension" data-index="${index}">Quitar prorroga</button>
            </div>
            <div class="mt-3 grid gap-3 sm:grid-cols-2">
                <label class="field-label">Nueva fecha fin de ejecucion<input class="field-control" type="date" value="${escapeHtml(extension.endDate ?? '')}" data-ejecucion-extension="${index}" data-extension-key="endDate"></label>
                <label class="field-label">Oferta economica de la prorroga<input class="field-control" type="number" min="0" step="0.01" inputmode="decimal" value="${escapeHtml(extension.offerAmount ?? '')}" data-ejecucion-extension="${index}" data-extension-key="offerAmount"></label>
            </div>
            <div class="mt-4 rounded-lg border border-[#e7edf6] bg-white p-4">${renderHitosInner(extension, scope)}</div>
            <div class="mt-4 rounded-lg border border-[#e7edf6] bg-white p-4">${renderPlanesInner(extension, scope, offer)}</div>
        </div>
    `;
}

// HTML del resumen economico (metricas derivadas). Compartido entre el render inicial y el
// refresco quirurgico; NO contiene inputs, para no reconstruirlos al teclear.
function ejecucionScheduleHtml(schedule) {
    const remainingClass = schedule.remaining < 0 ? 'text-rose-600' : 'text-[#21345d]';

    return `
        <div class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            ${ejecucionMetric(schedule.extensionsOffer > 0 ? 'Oferta economica (ampliada)' : 'Oferta economica', `${formatCurrency(schedule.offer)}${schedule.extensionsOffer > 0 ? `<span class="block text-xs font-semibold text-[#7082a4]">${formatCurrency(schedule.baseOffer)} base + ${formatCurrency(schedule.extensionsOffer)} prorrogas</span>` : ''}`)}
            ${ejecucionMetric('Pagos por hitos', formatCurrency(schedule.milestoneTotal))}
            ${ejecucionMetric('Total cuotas', formatCurrency(schedule.installmentsTotal))}
            ${ejecucionMetric('Restante por asignar', `<span class="${remainingClass}">${formatCurrency(schedule.remaining)}</span>`)}
            ${schedule.penalty > 0 ? ejecucionMetric('Penalizacion por resolucion', `<span class="text-rose-600">- ${formatCurrency(schedule.penalty)}</span>`) : ''}
        </div>
        ${schedule.remaining < 0 ? '<p class="mt-3 text-sm font-semibold text-rose-600">El total de hitos y cuotas supera la oferta economica.</p>' : ''}
    `;
}

// Recalcula solo el panel derivado sin reconstruir los inputs del formulario, para no
// perder el foco/valor mientras se teclea (p. ej. el año en un input type=date).
function refreshEjecucionDerived() {
    const container = document.getElementById('ejecucion-schedule');
    if (!container || !ejecucionDraft) {
        return;
    }

    const record = (view.executions ?? []).find((item) => item.tenderId === ejecucionTenderId);
    const offer = ejecucionNumber(record?.economicOffer);
    container.innerHTML = ejecucionScheduleHtml(computeEjecucionSchedule(ejecucionDraft, offer));
}

function ejecucionMetric(label, value) {
    return `
        <div class="rounded-lg border border-[#dfe6f2] bg-white p-4">
            <p class="text-xs font-bold uppercase text-[#7082a4]">${escapeHtml(label)}</p>
            <p class="mt-1 text-lg font-bold text-[#21345d]">${value}</p>
        </div>
    `;
}

// Agrupa los pagos de un proyecto (hitos + cuotas de todos los planes) por mes 'YYYY-MM'.
function paymentsByMonthFor(record) {
    const map = {};

    const add = (date, label, amount, annulled = false) => {
        const month = String(date ?? '').slice(0, 7);
        if (!/^\d{4}-\d{2}$/.test(month)) {
            return;
        }
        if (!map[month]) {
            map[month] = { items: [], total: 0 };
        }
        const value = ejecucionNumber(amount);
        map[month].items.push({ label, amount: value, annulled });
        if (!annulled) {
            map[month].total += value;
        }
    };

    // Pagos de la ejecucion base y de cada prorroga (cada una con sus hitos y planes).
    [record, ...(record.extensions ?? [])].forEach((container) => {
        (container.milestonePayments ?? []).forEach((payment) => {
            add(payment.date, payment.concept || 'Pago por hito', payment.amount, isPaymentAnnulled(record, payment.date));
        });

        (container.installmentPlans ?? []).forEach((plan, planIndex) => {
            (plan.cuotas ?? []).forEach((cuota) => {
                add(cuota.date, cuota.name || plan.name || `Plan ${planIndex + 1}`, cuota.amount, isPaymentAnnulled(record, cuota.date));
            });
        });
    });

    // Penalizacion por resolucion del cliente: cargo negativo en el mes de resolucion.
    if (record.resolvedByClient && record.resolutionDate && ejecucionNumber(record.penaltyAmount) > 0) {
        add(record.resolutionDate, 'Penalizacion', -ejecucionNumber(record.penaltyAmount));
    }

    return map;
}

// Calendario de pagos tipo GANTT: una fila por licitacion ganada, 12 meses del año
// seleccionado. Cada celda colorea su estado (pendiente / vencido / cobrado) y al pasar
// el raton muestra el desglose. Clic en una celda alterna "cobrado".
function renderEjecucionGantt() {
    // Solo aparecen los proyectos marcados como "Visible en el calendario de pagos" y no ocultos.
    const items = (view.executions ?? []).filter((record) => record.visible && !record.hidden);
    const year = ejecucionGanttYear;
    const monthLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const currentMonth = currentMonthKey();

    const headerCells = monthLabels
        .map((label) => `<th class="border border-[#eef2f8] px-2 py-2 text-center text-xs font-bold uppercase text-[#7082a4]">${label}</th>`)
        .join('');

    // Un proyecto solo figura en un año si su periodo de ejecucion solapa ese año
    // o si tiene algun cobro/pago en el. Asi no aparece en años sin actividad.
    const itemsForYear = items.filter((record) => {
        const startMonth = String(record.startDate ?? '').slice(0, 7);
        // El periodo abarca hasta el fin total (incluidas prorrogas).
        const endMonth = String(totalExecutionEnd(record)).slice(0, 7);
        const hasRange = /^\d{4}-\d{2}$/.test(startMonth) && /^\d{4}-\d{2}$/.test(endMonth);
        const rangeOverlapsYear = hasRange && startMonth <= `${year}-12` && endMonth >= `${year}-01`;
        const hasPaymentInYear = Object.keys(paymentsByMonthFor(record)).some((month) => month.startsWith(`${year}-`));
        const hasGuaranteeInYear = guaranteeMonthFor(record).startsWith(`${year}-`);

        return rangeOverlapsYear || hasPaymentInYear || hasGuaranteeInYear;
    });

    const rows = itemsForYear.map((record) => {
        const byMonth = paymentsByMonthFor(record);
        const collected = Array.isArray(record.collectedMonths) ? record.collectedMonths : [];

        // El proyecto aparece entre el inicio y el fin total de ejecucion (incluidas prorrogas).
        const startMonth = String(record.startDate ?? '').slice(0, 7);
        const endMonth = String(totalExecutionEnd(record)).slice(0, 7);
        const hasRange = /^\d{4}-\d{2}$/.test(startMonth) && /^\d{4}-\d{2}$/.test(endMonth);
        const guaranteeMonth = guaranteeMonthFor(record);

        const cells = monthLabels.map((_, index) => {
            const month = `${year}-${String(index + 1).padStart(2, '0')}`;
            const cell = byMonth[month];
            const hasPayment = cell && cell.items.length;
            const inRange = hasRange && month >= startMonth && month <= endMonth;

            // Recordatorio de garantia (un mes tras el fin total): celda dorada informativa.
            if (guaranteeMonth && guaranteeMonth === month) {
                const amount = ejecucionNumber(record.guaranteeAmount);
                const tip = `Garantia a recoger del banco${amount ? ` · ${formatCurrency(amount)}` : ''}`;

                return `<td class="border border-[#eef2f8] p-1 text-center" title="${escapeHtml(tip)}">
                    <div class="rounded-md px-1 py-2 text-xs font-bold" style="background:#d4af37;color:#3a2e00">Garantia${amount ? `<span class="block text-[10px] font-bold">${formatCurrency(amount)}</span>` : ''}</div>
                </td>`;
            }

            // Fuera del periodo de ejecucion: celda vacia (el proyecto no figura ese mes).
            if (hasRange && !inRange) {
                return '<td class="border border-[#eef2f8]"></td>';
            }

            if (!hasPayment) {
                // Dentro del periodo pero sin pago: barra tenue que marca la duracion del proyecto.
                if (hasRange && inRange) {
                    return '<td class="border border-[#eef2f8] p-1" title="Periodo de ejecucion"><div class="rounded-md py-2" style="background:#eef2fb"></div></td>';
                }
                return '<td class="border border-[#eef2f8]"></td>';
            }

            const isCollected = collected.includes(month);
            const isOverdue = !isCollected && month < currentMonth;
            const bg = isCollected ? '#16a34a' : isOverdue ? '#e11d48' : '#dbe5fb';
            const fg = isCollected || isOverdue ? '#ffffff' : '#1d3a8a';
            const stateLabel = isCollected ? 'Cobrado' : isOverdue ? 'Vencido sin cobrar' : 'Pendiente';

            const breakdown = cell.items
                .map((payment) => `
                    <div class="flex justify-between gap-3 ${payment.annulled ? 'text-[#9fb0cc] line-through' : ''}">
                        <span>${escapeHtml(payment.label)}${payment.annulled ? ' (anulado)' : ''}</span>
                        <span class="font-bold">${formatCurrency(payment.amount)}</span>
                    </div>
                `)
                .join('');

            const titleText = `${stateLabel} · ${cell.items.map((payment) => `${payment.label}: ${formatCurrency(payment.amount)}`).join(' · ')} · Total ${formatCurrency(cell.total)}`;

            return `
                <td class="relative cursor-pointer border border-[#eef2f8] p-1 text-center"
                    data-gantt-cell data-action="ejecucion-toggle-collected" data-id="${escapeHtml(record.tenderId)}" data-month="${month}"
                    title="${escapeHtml(titleText)}">
                    <div class="rounded-md px-1 py-2 text-xs font-bold" style="background:${bg};color:${fg}">${formatCurrency(cell.total)}</div>
                    <div data-gantt-tip class="pointer-events-none fixed z-50 hidden w-56 -translate-x-1/2 rounded-lg border border-[#dfe6f2] bg-white p-3 text-left text-xs font-semibold text-[#21345d] shadow-lg">
                        <p class="mb-1 text-[10px] font-bold uppercase text-[#7082a4]">${stateLabel}</p>
                        ${breakdown}
                        <div class="mt-2 flex justify-between gap-3 border-t border-[#eef2f8] pt-2">
                            <span>Total</span><span class="font-bold">${formatCurrency(cell.total)}</span>
                        </div>
                    </div>
                </td>
            `;
        }).join('');

        return `
            <tr>
                <td class="sticky left-0 z-10 min-w-48 border border-[#eef2f8] bg-white px-3 py-2 align-top">
                    <p class="text-sm font-bold text-[#21345d]">${escapeHtml(record.title ?? '')}</p>
                    <p class="text-xs font-semibold text-[#7082a4]">${escapeHtml(record.code ?? '')} · ${escapeHtml(record.client ?? '')}</p>
                </td>
                ${cells}
            </tr>
        `;
    }).join('');

    return `
        <section class="panel">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <h2 class="text-lg font-bold">Calendario de pagos ${year}</h2>
                <div class="flex items-center gap-2">
                    <button class="btn-secondary" type="button" data-action="ejecucion-gantt-year" data-delta="-1">◀ ${year - 1}</button>
                    <button class="btn-secondary" type="button" data-action="ejecucion-gantt-year" data-delta="1">${year + 1} ▶</button>
                    <button class="btn-secondary" type="button" data-action="ejecucion-back">Volver</button>
                </div>
            </div>
            <div class="mt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#53658b]">
                <span class="flex items-center gap-2"><span class="inline-block h-3 w-3 rounded" style="background:#dbe5fb"></span>Pendiente</span>
                <span class="flex items-center gap-2"><span class="inline-block h-3 w-3 rounded" style="background:#e11d48"></span>Vencido sin cobrar</span>
                <span class="flex items-center gap-2"><span class="inline-block h-3 w-3 rounded" style="background:#16a34a"></span>Cobrado</span>
                <span class="flex items-center gap-2"><span class="inline-block h-3 w-3 rounded" style="background:#eef2fb"></span>Periodo de ejecucion</span>
                <span class="flex items-center gap-2"><span class="inline-block h-3 w-3 rounded" style="background:#d4af37"></span>Garantia a recoger</span>
                <span>Haz clic en una celda para marcarla como cobrada.</span>
            </div>
            <div class="mt-4 overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr>
                            <th class="sticky left-0 z-10 border border-[#eef2f8] bg-white px-3 py-2 text-left text-xs font-bold uppercase text-[#7082a4]">Proyecto</th>
                            ${headerCells}
                        </tr>
                    </thead>
                    <tbody>
                        ${!items.length
                            ? '<tr><td colspan="13" class="border border-[#eef2f8] p-6 text-center text-sm font-semibold text-[#7082a4]">No hay proyectos marcados como «Visible en el calendario de pagos». Marca la casilla en el detalle de cada licitacion ganada.</td></tr>'
                            : (itemsForYear.length ? rows : `<tr><td colspan="13" class="border border-[#eef2f8] p-6 text-center text-sm font-semibold text-[#7082a4]">Ningun proyecto tiene ejecucion ni cobros en ${year}.</td></tr>`)}
                    </tbody>
                </table>
            </div>
        </section>
    `;
}

// Vuelca el valor de un input de ejecucion en el borrador. Devuelve true si era uno.
function updateEjecucionDraftField(target, eventType = 'change') {
    if (!ejecucionDraft) {
        return false;
    }

    // Solo re-renderizamos en «change» (confirmacion): en «input» (cada tecla) se perderia
    // el foco de inputs de fecha/numero mientras se escriben.
    const isChange = eventType === 'change';

    if (target.matches('[data-ejecucion-field]')) {
        const key = target.dataset.ejecucionField;
        ejecucionDraft[key] = target.type === 'checkbox' ? target.checked : target.value;
        // Estos campos cambian la UI (visibilidad de inputs y anulacion de cuotas): re-render.
        if (isChange && ['resolvedByClient', 'resolutionDate', 'hasGuarantee'].includes(key)) {
            render();
            return false;
        }
        return true;
    }

    if (target.matches('[data-ejecucion-extension]')) {
        const index = Number(target.dataset.ejecucionExtension);
        const key = target.dataset.extensionKey;
        const extension = ejecucionDraft.extensions[index];
        if (extension) {
            extension[key] = target.value;
        }
        return true;
    }

    if (target.matches('[data-ejecucion-payment]')) {
        const container = ejecucionContainer(target.dataset.scope ?? '');
        const index = Number(target.dataset.ejecucionPayment);
        const key = target.dataset.paymentKey;
        if (container?.milestonePayments[index]) {
            container.milestonePayments[index][key] = target.value;
        }
        return true;
    }

    if (target.matches('[data-ejecucion-plan]')) {
        const container = ejecucionContainer(target.dataset.scope ?? '');
        const planIndex = Number(target.dataset.ejecucionPlan);
        const key = target.dataset.planKey;
        const plan = container?.installmentPlans[planIndex];
        if (plan) {
            plan[key] = target.value;
            // Cambiar el modo altera la UI (label/visibilidad del importe): re-render completo.
            if (key === 'mode') {
                render();
                return false;
            }
        }
        return true;
    }

    if (target.matches('[data-ejecucion-plan-cuota]')) {
        const container = ejecucionContainer(target.dataset.scope ?? '');
        const planIndex = Number(target.dataset.ejecucionPlanCuota);
        const cuotaIndex = Number(target.dataset.cuotaIndex);
        const key = target.dataset.cuotaKey;
        const plan = container?.installmentPlans[planIndex];
        if (plan && plan.cuotas[cuotaIndex]) {
            plan.cuotas[cuotaIndex][key] = target.value;
        }
        return true;
    }

    return false;
}

async function saveEjecucion() {
    if (!ejecucionDraft || !ejecucionTenderId) {
        return;
    }

    const payload = {
        signed: ejecucionDraft.signed,
        visible: ejecucionDraft.visible,
        startDate: ejecucionDraft.startDate || null,
        endDate: ejecucionDraft.endDate || null,
        milestonePayments: payloadMilestonePayments(ejecucionDraft.milestonePayments),
        installmentPlans: payloadInstallmentPlans(ejecucionDraft.installmentPlans),
        extensions: (ejecucionDraft.extensions ?? [])
            .filter((extension) => extension.endDate || extension.offerAmount || (extension.milestonePayments?.length) || (extension.installmentPlans?.length))
            .map((extension) => ({
                id: extension.id ?? '',
                endDate: extension.endDate ?? '',
                offerAmount: extension.offerAmount ?? '',
                milestonePayments: payloadMilestonePayments(extension.milestonePayments),
                installmentPlans: payloadInstallmentPlans(extension.installmentPlans),
            })),
        resolvedByClient: Boolean(ejecucionDraft.resolvedByClient),
        resolutionDate: ejecucionDraft.resolutionDate || null,
        penaltyAmount: ejecucionDraft.penaltyAmount || null,
        hasGuarantee: Boolean(ejecucionDraft.hasGuarantee),
        guaranteeAmount: ejecucionDraft.guaranteeAmount || null,
    };

    try {
        await api.mutate('PUT', `/api/executions/${ejecucionTenderId}`, payload);
    } catch (error) {
        handleMutationError(error);
        return;
    }

    ejecucionView = 'list';
    ejecucionDraft = null;
    render();
}

// Serializa pagos por hitos / planes para el guardado (filtra filas vacias).
function payloadMilestonePayments(list) {
    return (list ?? [])
        .filter((payment) => payment.concept || payment.amount || payment.date)
        .map((payment) => ({ concept: payment.concept ?? '', amount: payment.amount ?? '', date: payment.date ?? '' }));
}

function payloadInstallmentPlans(list) {
    return (list ?? []).map((plan) => ({
        name: plan.name ?? '',
        mode: plan.mode ?? 'remainder',
        startDate: plan.startDate ?? '',
        endDate: plan.endDate ?? '',
        frequencyMonths: plan.frequencyMonths ?? '',
        amount: plan.amount ?? '',
        cuotas: (plan.cuotas ?? [])
            .filter((cuota) => cuota.name || cuota.date || cuota.amount)
            .map((cuota) => ({ name: cuota.name ?? '', date: cuota.date ?? '', amount: cuota.amount ?? '' })),
    }));
}

// Genera (crea los meses desde inicio/fin/periodicidad) o recalcula (conserva los meses
// actuales y reparte los importes) un plan segun su modo, en el ambito dado.
function applyPlanGeneration(scope, planIndex, recalcOnly) {
    if (!ejecucionDraft) {
        return;
    }
    const container = ejecucionContainer(scope);
    const plan = container?.installmentPlans[planIndex];
    if (!plan) {
        return;
    }

    const record = (view.executions ?? []).find((item) => item.tenderId === ejecucionTenderId);
    const offer = ejecucionScopeOffer(scope, ejecucionNumber(record?.economicOffer));

    let dates;
    if (recalcOnly) {
        if (!plan.cuotas.length) {
            return;
        }
        dates = plan.cuotas.map((cuota) => cuota.date);
    } else {
        dates = planMonths(plan);
        if (!dates.length) {
            alert('Configura inicio, fin y periodicidad validos para generar los meses.');
            return;
        }
    }

    if ((plan.mode === 'perMonth' || plan.mode === 'total') && ejecucionNumber(plan.amount) <= 0) {
        alert('Indica el importe del plan (por cuota o total) antes de generar.');
        return;
    }

    const amount = planInstallmentAmount(plan, dates.length, container, offer, planIndex);
    // Conserva los nombres de cuota existentes (por posicion) al (re)generar los importes.
    const previousNames = (plan.cuotas ?? []).map((cuota) => cuota.name ?? '');
    plan.cuotas = dates.map((date, index) => ({ name: previousNames[index] ?? '', date, amount: amount.toFixed(2) }));
    render();
}

// Alterna el estado "cobrado" de un mes (celda del GANTT) y lo persiste. Persistimos
// antes de re-renderizar porque render() recarga /api/executions y pisaria un cambio local.
async function toggleCollectedMonth(tenderId, month) {
    const record = (view.executions ?? []).find((item) => item.tenderId === tenderId);
    if (!record || !month) {
        return;
    }

    const current = Array.isArray(record.collectedMonths) ? record.collectedMonths : [];
    const next = current.includes(month)
        ? current.filter((value) => value !== month)
        : [...current, month];

    try {
        await api.mutate('PUT', `/api/executions/${tenderId}`, { collectedMonths: next });
    } catch (error) {
        handleMutationError(error);
        return;
    }

    render();
}

function trendLabel(percent) {
    const prefix = percent > 0 ? '+ ' : percent < 0 ? '- ' : '';

    return `${prefix}${Math.abs(percent)}% vs. mes anterior`;
}

function successRateFor(tenders) {
    const won = tenders.filter((item) => item.status === 'Ganada').length;
    const lost = tenders.filter((item) => item.status === 'Perdida').length;
    const closed = won + lost;

    return closed ? Math.round((won / closed) * 100) : 0;
}

function successRateMeta(tenders) {
    const won = tenders.filter((item) => item.status === 'Ganada').length;
    const lost = tenders.filter((item) => item.status === 'Perdida').length;
    const closed = won + lost;

    return closed ? `${won} ganadas de ${closed} cerradas` : 'Sin cerradas';
}

function renderEconomicOfferAlert(tenders, total = null) {
    if (!tenders.length) {
        return '';
    }

    const totalCount = total ?? tenders.length;
    const extra = totalCount > tenders.length ? ` (mostrando ${tenders.length})` : '';

    return `
        <section class="panel mt-6 border-amber-200 bg-amber-50">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 class="text-lg font-bold text-amber-900">Ofertas economicas pendientes</h2>
                    <p class="mt-1 text-sm font-semibold text-amber-800">${totalCount} licitaciones en evaluacion sin oferta economica${extra}.</p>
                </div>
                <span class="status-pill status-amber">${isAdmin() ? 'Equipo completo' : 'Mis licitaciones'}</span>
            </div>
            <div class="mt-4 grid gap-3">
                ${tenders.map((tender) => `
                    <div class="rounded-lg border border-amber-200 bg-white p-3">
                        <div class="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p class="font-bold text-[#21345d]">${escapeHtml(tender.title)}</p>
                                <p class="mt-1 text-sm font-semibold text-[#7082a4]">${escapeHtml(tenderAssigneeLabel(tender))} · ${escapeHtml(tender.code)} · ${formatCurrency(tender.budget)}</p>
                            </div>
                            <div class="flex gap-2">
                                <button class="link-action" type="button" data-action="view" data-entity="tenders" data-id="${tender.id}">Ver</button>
                                ${canEdit('tenders', tender) ? `<button class="link-action" type="button" data-action="edit" data-entity="tenders" data-id="${tender.id}">Editar</button>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

function renderWorkloadPanel() {
    const entries = view.dashboard?.workloadPerUser ?? [];

    return `
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-lg font-bold">Carga actual</h2>
            <p class="text-sm font-bold text-[#53658b]">4 dias laborales previos a presentacion</p>
        </div>
        <div class="mt-5 space-y-4">
            ${entries.map((entry) => {
                const workload = entry.load;
                const count = workload / 33;
                const tone = workload > 100 ? 'bg-rose-600' : 'bg-violet-600';

                return `
                    <div>
                        <div class="flex items-center justify-between gap-3 text-sm font-semibold">
                            <span>${escapeHtml(entry.name)}</span>
                            <span class="${workload > 100 ? 'text-rose-700' : 'text-[#53658b]'}">${formatLoadValue(workload)}% · ${formatLoadValue(count)} licitaciones</span>
                        </div>
                        <div class="mt-2 h-2 rounded-full bg-[#eceff7]">
                            <div class="h-full rounded-full ${tone}" style="width:${Math.min(workload, 100)}%"></div>
                        </div>
                    </div>
                `;
            }).join('') || '<p class="text-sm font-semibold text-[#7082a4]">Sin usuarios.</p>'}
        </div>
    `;
}

function metricCard(label, value, trend, icon, tone, trendTone = 'text-emerald-600') {
    return `
        <article class="rounded-lg border border-[#dfe6f2] bg-white p-6 shadow-sm">
            <div class="flex items-start justify-between gap-5">
                <div class="flex items-center gap-5">
                    <div class="grid size-16 place-items-center rounded-lg metric-icon-${tone}">
                        <svg class="size-8"><use href="#icon-${icon}"/></svg>
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-[#21345d]">${label}</p>
                        <p class="mt-3 text-3xl font-bold tracking-normal text-[#081743]">${value}</p>
                    </div>
                </div>
            </div>
            <p class="mt-4 text-sm font-semibold ${trendTone}">${trend}</p>
        </article>
    `;
}

function renderCollection(entity) {
    if (entity === 'tenders') {
        // La pagina ya viene ordenada/filtrada/paginada del servidor.
        return `<section class="panel">${tableFor('tenders', state.tenders)}${renderTenderPagination()}</section>`;
    }

    return `<section class="panel">${tableFor(entity, filtered(visibleItems(entity)))}</section>`;
}

function renderTenderPagination() {
    const meta = tenderPageMeta ?? {};
    const lastPage = meta.lastPage ?? 1;
    const currentPage = meta.currentPage ?? 1;

    if (lastPage <= 1) {
        return `<div class="mt-4 text-sm font-semibold text-[#7082a4]">${meta.total ?? state.tenders.length} licitaciones</div>`;
    }

    return `
        <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span class="text-sm font-semibold text-[#7082a4]">${meta.total} licitaciones · pagina ${currentPage} de ${lastPage}</span>
            <div class="flex gap-2">
                <button class="btn-secondary" type="button" data-action="tender-page" data-page="${currentPage - 1}" ${currentPage <= 1 ? 'disabled' : ''}>Anterior</button>
                <button class="btn-secondary" type="button" data-action="tender-page" data-page="${currentPage + 1}" ${currentPage >= lastPage ? 'disabled' : ''}>Siguiente</button>
            </div>
        </div>
    `;
}

function tenderTableItems(items) {
    const filteredItems = items.filter((item) => Object.entries(tenderColumnFilters).every(([column, value]) => {
        if (!value) {
            return true;
        }

        return tenderColumnValue(item, column).includes(value);
    }));
    const direction = tenderSort.direction === 'desc' ? -1 : 1;

    return filteredItems.sort((first, second) => {
        if (tenderSort.column === 'deadline') {
            const firstMissingDeadline = !parseDate(first.deadline);
            const secondMissingDeadline = !parseDate(second.deadline);

            if (firstMissingDeadline !== secondMissingDeadline) {
                return firstMissingDeadline ? 1 : -1;
            }
        }

        const firstValue = tenderSortValue(first, tenderSort.column);
        const secondValue = tenderSortValue(second, tenderSort.column);

        if (firstValue < secondValue) {
            return -1 * direction;
        }

        if (firstValue > secondValue) {
            return direction;
        }

        return 0;
    });
}

function tenderColumnValue(item, column) {
    if (column === 'economicOffer' && isEconomicOfferWaived(item)) {
        return 'nula';
    }

    if (['budget', 'economicOffer'].includes(column)) {
        return formatCurrency(item[column]).toLowerCase();
    }

    if (column === 'deadline') {
        return formatDate(item[column]).toLowerCase();
    }

    return String(item[column] ?? '').toLowerCase();
}

function tenderSortValue(item, column) {
    if (column === 'economicOffer' && isEconomicOfferWaived(item)) {
        return 0;
    }

    if (['budget', 'economicOffer'].includes(column)) {
        return Number(item[column]) || 0;
    }

    if (column === 'deadline') {
        return parseDate(item[column])?.getTime() ?? 0;
    }

    return String(item[column] ?? '').toLowerCase();
}

function tableFor(entity, items, compact = false) {
    const columns = {
        tenders: ['code', 'title', 'lot', 'client', 'deadline', 'budget', 'economicOffer', 'status', 'owner', 'coAuthor'],
        team: ['name', 'username', 'role', 'email', 'workload', 'status', 'passwordResetAt'],
    }[entity];

    const labels = {
        title: 'Objeto', client: 'Organismo', code: 'Expediente', lot: 'Lote', deadline: 'Fin aceptacion ofertas', budget: 'PBL', economicOffer: 'Oferta economica', status: 'Estado', owner: 'Responsable', coAuthor: 'Coautor',
        name: 'Nombre', type: 'Tipo', updated: 'Actualizado', role: 'Rol',
        email: 'Email', username: 'Usuario', workload: 'Carga', passwordResetAt: 'Password',
    };

    return `
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-lg font-bold">${compact ? 'Carga de usuarios' : sectionTitleFor(entity)}</h2>
            ${compact ? '<a class="btn-secondary" href="#licitaciones">Ver licitaciones</a>' : ''}
        </div>
        <div class="mt-5 overflow-x-auto">
            <table class="data-table">
                <thead>
                    <tr>
                        ${columns.map((column) => tableHeaderCell(entity, column, labels[column])).join('')}
                        <th class="text-right">Acciones</th>
                    </tr>
                    ${entity === 'tenders' ? `
                        <tr>
                            ${columns.map((column) => `
                                <th>
                                    <input class="field-control h-9 min-w-32 px-2 py-1 text-xs" type="search" value="${escapeHtml(tenderColumnFilters[column] ?? '')}" placeholder="Filtrar" data-column-filter="${column}">
                                </th>
                            `).join('')}
                            <th class="text-right">
                                <button class="link-action" type="button" data-action="clear-tender-filters">Limpiar</button>
                            </th>
                        </tr>
                    ` : ''}
                </thead>
                <tbody>
                    ${items.map((item) => `
                        <tr>
                            ${columns.map((column) => cellFor(column, item[column], item)).join('')}
                            <td class="text-right">
                                <button class="link-action" type="button" data-action="view" data-entity="${entity}" data-id="${item.id}">Ver</button>
                                ${canEdit(entity, item) ? `<button class="link-action" type="button" data-action="edit" data-entity="${entity}" data-id="${item.id}">Editar</button>` : ''}
                                ${entity === 'team' && isAdmin() ? `<button class="link-action" type="button" data-action="password" data-id="${item.id}">Password</button>` : ''}
                                ${canDelete() ? `<button class="link-danger" type="button" data-action="delete" data-entity="${entity}" data-id="${item.id}">Borrar</button>` : ''}
                            </td>
                        </tr>
                    `).join('') || `<tr><td colspan="${columns.length + 1}" class="py-8 text-center text-[#7082a4]">No hay registros.</td></tr>`}
                </tbody>
            </table>
        </div>
    `;
}

function tableHeaderCell(entity, column, label) {
    if (entity !== 'tenders') {
        return `<th>${label}</th>`;
    }

    const isSorted = tenderSort.column === column;
    const direction = isSorted ? (tenderSort.direction === 'asc' ? '↑' : '↓') : '↕';

    return `
        <th>
            <button class="flex w-full items-center justify-between gap-2 text-left font-bold" type="button" data-action="sort-tenders" data-column="${column}">
                <span>${label}</span>
                <span class="text-xs text-[#7082a4]">${direction}</span>
            </button>
        </th>
    `;
}

function sectionTitleFor(entity) {
    return {
        tenders: 'Listado de licitaciones',
        team: 'Equipo',
    }[entity];
}

function cellFor(column, value, item = null) {
    if (column === 'status') {
        return `<td>${statusPill(value)}</td>`;
    }

    if (['deadline', 'updated'].includes(column)) {
        return `<td>${formatDate(value)}</td>`;
    }

    if (['budget', 'economicOffer'].includes(column)) {
        if (column === 'economicOffer' && isEconomicOfferWaived(item)) {
            return '<td><span class="status-pill status-slate">Nula</span></td>';
        }

        return `<td>${formatCurrency(value)}</td>`;
    }

    if (column === 'workload') {
        const workload = workloadForUser(item);

        return `<td><div class="flex items-center gap-3"><div class="h-2 w-24 rounded-full bg-[#eceff7]"><div class="h-full rounded-full ${workloadTone(item)}" style="width:${Math.min(workload, 100)}%"></div></div><span class="${workload > 100 ? 'text-rose-700' : ''}">${formatLoadValue(workload)}%</span></div></td>`;
    }

    if (column === 'passwordResetAt') {
        return `<td>${value ? `<span class="status-pill status-amber">Reset ${formatDate(value.slice(0, 10))}</span>` : '<span class="status-pill status-slate">Sin cambios</span>'}</td>`;
    }

    if (['lot', 'coAuthor'].includes(column)) {
        const text = value == null ? '' : String(value).trim();

        return `<td>${text ? escapeHtml(text) : '-'}</td>`;
    }

    return `<td>${escapeHtml(value)}</td>`;
}

function renderCalendar() {
    return `
        <section class="grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
            <article class="panel">${renderCalendarPreview()}</article>
            <article class="panel">${eventList()}</article>
        </section>
    `;
}

// Color del hito en el calendario segun su estado: [clase pildora, clase punto].
function calendarEventStyle(event) {
    const byStatus = {
        Critico: ['bg-rose-100 text-rose-800 hover:bg-rose-200', 'bg-rose-500'],
        Confirmado: ['bg-emerald-100 text-emerald-800 hover:bg-emerald-200', 'bg-emerald-500'],
        Completado: ['bg-slate-100 text-slate-600 hover:bg-slate-200', 'bg-slate-400'],
        Pendiente: ['bg-blue-100 text-blue-800 hover:bg-blue-200', 'bg-blue-500'],
    };

    return byStatus[event.status] ?? ['bg-blue-100 text-blue-800 hover:bg-blue-200', 'bg-blue-500'];
}

function renderCalendarPreview() {
    const monthStart = startOfMonth(calendarCursor);
    const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
    const leadingBlanks = (monthStart.getDay() + 6) % 7;
    const monthDays = Array.from({ length: monthEnd.getDate() }, (_, index) => new Date(monthStart.getFullYear(), monthStart.getMonth(), index + 1));
    const cells = [...Array.from({ length: leadingBlanks }, () => null), ...monthDays];
    const trailingBlanks = (7 - (cells.length % 7)) % 7;
    const calendarCells = [...cells, ...Array.from({ length: trailingBlanks }, () => null)];
    const events = visibleItems('events');

    return `
        <div class="flex flex-wrap items-center justify-between gap-4">
            <h2 class="text-lg font-bold">Calendario de hitos</h2>
            <div class="flex items-center gap-2">
                <button class="btn-secondary px-3" type="button" data-action="calendar-prev" aria-label="Mes anterior">‹</button>
                <p class="min-w-40 text-center text-sm font-bold capitalize text-[#53658b]">${escapeHtml(monthLabel(monthStart))}</p>
                <button class="btn-secondary px-3" type="button" data-action="calendar-next" aria-label="Mes siguiente">›</button>
                <button class="btn-secondary" type="button" data-action="calendar-today">Hoy</button>
            </div>
        </div>
        <div class="mt-6 grid grid-cols-7 border-t border-l border-[#e7edf6] text-center text-xs font-bold text-[#12244f]">
            ${['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'].map((day) => `<div class="border-b border-r border-[#e7edf6] py-3">${day}</div>`).join('')}
            ${calendarCells.map((day) => {
                if (!day) {
                    return '<div class="min-h-24 border-b border-r border-[#e7edf6] bg-[#f8fafd]"></div>';
                }

                const date = dateKey(day);
                const isToday = date === todayIso();
                const dayEvents = events.filter((item) => {
                    const eventDate = parseDate(item.date);

                    return eventDate && dateKey(eventDate) === date;
                });

                return `
                    <div class="group relative flex min-h-24 flex-col border-b border-r border-[#e7edf6] p-1.5 ${isToday ? 'bg-blue-50/40' : ''}">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold ${isToday ? 'grid size-6 place-items-center rounded-full bg-blue-700 text-white' : 'text-[#12244f]'}">${day.getDate()}</span>
                            ${canCreate('events') ? `<button class="rounded px-1 text-sm font-bold leading-none text-[#9fb0cc] hover:bg-blue-100 hover:text-blue-700" type="button" data-action="new-date" data-entity="events" data-date="${date}" title="Nuevo hito en este dia">+</button>` : ''}
                        </div>
                        <div class="mt-1 flex flex-col gap-1">
                            ${dayEvents.map((event) => {
                                const [pill, dot] = calendarEventStyle(event);

                                return `<button class="flex w-full items-center gap-1.5 rounded px-1.5 py-1 text-left text-[11px] font-semibold ${pill}" type="button" data-action="view" data-entity="events" data-id="${event.id}" title="${escapeHtml(event.title)} (${escapeHtml(event.status)})">
                                    <span class="size-1.5 shrink-0 rounded-full ${dot}"></span>
                                    <span class="truncate">${escapeHtml(event.title)}</span>
                                </button>`;
                            }).join('')}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function upcomingPresentations() {
    const start = today();
    const end = new Date(start);
    end.setDate(start.getDate() + 7);

    return visibleItems('events')
        .filter((event) => {
            const eventDate = parseDate(event.date);

            return event.type === 'Presentacion' && eventDate >= start && eventDate <= end;
        })
        .sort((a, b) => compareDateValues(a.date, b.date));
}

function notificationCount() {
    const n = view.notifications;

    return n ? ((n.presentationsTotal ?? 0) + (n.missingOffersTotal ?? 0)) : 0;
}

function renderNotifications() {
    const presentations = view.notifications?.presentations ?? [];
    const missingOffers = view.notifications?.missingOffers ?? [];

    modalTitle.textContent = 'Notificaciones';
    modalBody.innerHTML = `
        <div class="space-y-5">
            <div>
                <h3 class="text-sm font-bold text-[#21345d]">Presentaciones proximos 7 dias</h3>
                <div class="mt-3 space-y-3">
                    ${presentations.map((event) => `
                        <div class="rounded-lg bg-blue-50 p-4 font-semibold text-blue-700">
                            <p>${escapeHtml(event.title)}</p>
                            <p class="mt-1 text-sm text-blue-600">${formatDate(event.date)} · ${escapeHtml(event.tender)}</p>
                        </div>
                    `).join('') || '<p class="rounded-lg bg-slate-50 p-4 font-semibold text-[#53658b]">No hay presentaciones en los proximos 7 dias.</p>'}
                </div>
            </div>
            <div>
                <h3 class="text-sm font-bold text-[#21345d]">Ofertas economicas pendientes</h3>
                <div class="mt-3 space-y-3">
                    ${missingOffers.map((tender) => `
                        <div class="rounded-lg bg-amber-50 p-4 font-semibold text-amber-800">
                            <div class="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p>${escapeHtml(tender.title)}</p>
                                    <p class="mt-1 text-sm text-amber-700">${escapeHtml(tenderAssigneeLabel(tender))} · ${escapeHtml(tender.code)} · ${formatCurrency(tender.budget)}</p>
                                </div>
                                <div class="flex gap-2">
                                    <button class="link-action" type="button" data-action="view" data-entity="tenders" data-id="${tender.id}">Ver</button>
                                    ${canEdit('tenders', tender) ? `<button class="link-action" type="button" data-action="edit" data-entity="tenders" data-id="${tender.id}">Editar</button>` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('') || '<p class="rounded-lg bg-slate-50 p-4 font-semibold text-[#53658b]">No hay ofertas economicas pendientes.</p>'}
                </div>
            </div>
        </div>
    `;
    showModal();
}

function eventList() {
    const events = filtered(visibleItems('events')).sort((first, second) => {
        const firstDate = parseDate(first.date)?.getTime() ?? Number.MAX_SAFE_INTEGER;
        const secondDate = parseDate(second.date)?.getTime() ?? Number.MAX_SAFE_INTEGER;

        if (firstDate !== secondDate) {
            return firstDate - secondDate;
        }

        return String(first.title ?? '').localeCompare(String(second.title ?? ''));
    });

    return `
        <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold">Hitos</h2>
            ${canCreate('events') ? '<button class="btn-secondary" type="button" data-action="new" data-entity="events">Nuevo hito</button>' : ''}
        </div>
        <div class="mt-5 space-y-3">
            ${events.map((event) => `
                <article class="rounded-lg border border-[#e7edf6] p-4">
                    <div class="flex items-start justify-between gap-4">
                        <div>
                            <p class="font-bold">${escapeHtml(event.title)}</p>
                            <p class="mt-1 text-sm text-[#7082a4]">${formatDate(event.date)} · ${escapeHtml(event.tender)}</p>
                        </div>
                        ${statusPill(event.status)}
                    </div>
                    <div class="mt-4 flex gap-3">
                        <button class="link-action" type="button" data-action="view" data-entity="events" data-id="${event.id}">Ver</button>
                        ${canEdit('events', event) ? `<button class="link-action" type="button" data-action="edit" data-entity="events" data-id="${event.id}">Editar</button>` : ''}
                        ${canDelete() ? `<button class="link-danger" type="button" data-action="delete" data-entity="events" data-id="${event.id}">Borrar</button>` : ''}
                    </div>
                </article>
            `).join('') || `<p class="text-sm text-[#7082a4]">No hay hitos.</p>`}
        </div>
    `;
}

function renderSearchResults() {
    const term = normalizeSearchText(searchResultsQuery || query).trim();
    const results = globalSearchResults(term);
    const counts = {
        tenders: results.tenders.length,
        events: results.events.length,
        team: results.team.length,
    };

    if (!['tenders', 'events', 'team'].includes(activeSearchTab)) {
        activeSearchTab = 'tenders';
    }

    return `
        <section class="panel">
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h2 class="text-lg font-bold">Resultados de busqueda</h2>
                    <p class="mt-1 text-sm font-semibold text-[#7082a4]">${searchResultsQuery ? `Coincidencias para "${escapeHtml(searchResultsQuery)}"` : 'Escribe una busqueda en la barra superior.'}</p>
                </div>
                <span class="status-pill status-blue">${counts.tenders + counts.events + counts.team} resultados</span>
            </div>
            <div class="mt-6 flex flex-wrap gap-2 border-b border-[#e7edf6]">
                ${searchTabButton('tenders', 'Licitaciones', counts.tenders)}
                ${searchTabButton('events', 'Hitos', counts.events)}
                ${searchTabButton('team', 'Personas', counts.team)}
            </div>
            <div class="mt-5 grid gap-3">
                ${results[activeSearchTab].map(searchResultCard).join('') || '<p class="rounded-lg bg-slate-50 p-4 text-sm font-semibold text-[#53658b]">No hay coincidencias en esta categoria.</p>'}
            </div>
        </section>
    `;
}

function searchTabButton(tab, label, count) {
    const active = activeSearchTab === tab;

    return `
        <button class="flex items-center gap-2 border-b-2 px-4 pb-3 text-sm font-bold ${active ? 'border-blue-700 text-blue-700' : 'border-transparent text-[#53658b] hover:text-[#21345d]'}" type="button" data-action="search-tab" data-tab="${tab}">
            <span>${label}</span>
            <span class="rounded-full ${active ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-[#53658b]'} px-2 py-0.5 text-xs">${count}</span>
        </button>
    `;
}

function searchResultCard(record) {
    return `
        <article class="rounded-lg border border-[#e7edf6] p-4">
            <div class="flex flex-wrap items-start justify-between gap-4">
                <div class="min-w-0">
                    <div class="flex flex-wrap items-center gap-2">
                        <h3 class="font-bold text-[#21345d]">${escapeHtml(record.title)}</h3>
                        <span class="status-pill status-slate">${searchEntityLabel(record.entity)}</span>
                    </div>
                    <p class="mt-2 text-sm font-semibold text-[#7082a4]">${escapeHtml(record.subtitle)}</p>
                </div>
                <button class="link-action mr-0" type="button" data-action="search-open" data-entity="${record.entity}" data-id="${record.id}">Ver</button>
            </div>
        </article>
    `;
}

function renderStats() {
    return `<section class="panel">${renderStatsBody()}</section>`;
}

function renderGantt() {
    const start = today();
    const days = Array.from({ length: 28 }, (_, index) => addDays(start, index));
    const users = state.team.filter((member) => member.role === 'user' && member.status === 'Activo');
    const userNamesSet = new Set(users.map((user) => user.name));
    const tenders = visibleItems('tenders')
        .filter((tender) => tenderInvolvesKnownUser(tender, userNamesSet))
        .filter((tender) => tender.status === 'En preparacion')
        .filter((tender) => parseDate(tender.deadline) >= start)
        .sort((first, second) => compareDateValues(first.deadline, second.deadline));

    return `
        <section class="panel">
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 class="text-lg font-bold">Planning Gantt - Licitaciones</h2>
                    <p class="mt-1 text-sm font-semibold text-[#7082a4]">Vista desde hoy con scroll lateral. Carga calculada sobre los 4 dias laborales previos a la presentacion.</p>
                </div>
                <span class="status-pill status-blue">${formatDate(dateKey(start))}</span>
            </div>
            <div class="mt-5 overflow-x-auto rounded-lg border border-[#dfe6f2]">
                <div class="gantt-grid gantt-header">
                    <div class="gantt-sticky gantt-head-cell">Licitacion</div>
                    <div class="gantt-sticky-2 gantt-head-cell">Responsable</div>
                    <div class="gantt-sticky-3 gantt-head-cell">Tarea</div>
                    ${days.map((day) => `<div class="gantt-head-cell text-center"><span>${shortDateLabel(day)}</span><small>${shortWeekday(day)}</small></div>`).join('')}
                </div>
                ${tenders.map((tender) => ganttTenderRow(tender, days)).join('') || '<div class="p-5 text-sm font-semibold text-[#7082a4]">No hay licitaciones en preparacion futuras asignadas a usuarios.</div>'}
                ${canSeeAll() ? `
                    <div class="gantt-summary-title">Carga diaria por persona - h/tarea concurrentes</div>
                    ${users.map((user) => ganttUserLoadRow(user, days)).join('')}
                ` : ''}
            </div>
        </section>
    `;
}

function ganttTenderRow(tender, days) {
    const deadline = parseDate(tender.deadline);
    const workStart = ganttTenderWorkStart(tender);
    const assignees = state.team.filter((user) => userParticipatesInTender(tender, user));
    const loadColor = assignees.some((user) => workloadForUser(user) > 100) ? 'gantt-bar-danger' : 'gantt-bar';

    return `
        <div class="gantt-grid">
            <div class="gantt-sticky gantt-cell font-bold">${escapeHtml(tender.code)} ${escapeHtml(tender.title)}</div>
            <div class="gantt-sticky-2 gantt-cell">${escapeHtml(tenderAssigneeLabel(tender))}</div>
            <div class="gantt-sticky-3 gantt-cell">Preparacion / presentacion</div>
            ${days.map((day) => {
                const isDeadline = sameDate(day, deadline);
                const inRange = workStart && tender.status === 'En preparacion' && (
                    isDeadline || (isBusinessDay(day) && day >= workStart && day <= deadline)
                );

                return `<div class="gantt-day ${inRange ? loadColor : ''} ${isDeadline ? 'gantt-deadline' : ''}">${isDeadline ? '<span>★</span><small>Presenta</small>' : ''}</div>`;
            }).join('')}
        </div>
    `;
}

function ganttUserLoadRow(user, days) {
    return `
        <div class="gantt-grid gantt-load-row">
            <div class="gantt-sticky gantt-cell font-bold">${escapeHtml(user.name)}</div>
            <div class="gantt-sticky-2 gantt-cell"></div>
            <div class="gantt-sticky-3 gantt-cell">Licitaciones activas</div>
            ${days.map((day) => {
                const count = ganttLoadForUserOn(user, day);
                const tone = count > 3 ? 'gantt-load-over' : count === 3 ? 'gantt-load-high' : count > 0 ? 'gantt-load-ok' : '';

                return `<div class="gantt-load-cell ${tone}">${count ? formatLoadValue(count) : ''}</div>`;
            }).join('')}
        </div>
    `;
}

function ganttLoadForUserOn(user, day) {
    return visibleItems('tenders').reduce((load, tender) => {
        if (!ganttTenderActiveOn(tender, day)) {
            return load;
        }

        return load + tenderLoadForUser(tender, user);
    }, 0);
}

function ganttTenderActiveOn(tender, day) {
    const deadline = parseDate(tender.deadline);
    const workStart = ganttTenderWorkStart(tender);

    return Boolean(deadline && workStart && tender.status === 'En preparacion' && (
        sameDate(day, deadline) || (isBusinessDay(day) && day >= workStart && day <= deadline)
    ));
}

function ganttTenderWorkStart(tender) {
    const deadline = parseDate(tender.deadline);

    return deadline ? subtractBusinessDays(deadline, 4) : null;
}

function renderExecutiveReport() {
    const report = executiveReportData();
    const documentText = executiveReportText(report);

    return `
        <section class="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
            <article class="panel">
                <h2 class="text-lg font-bold">Resumen del dia</h2>
                <div class="mt-5 grid gap-4 sm:grid-cols-3">
                    ${metricCard('Presentaciones hoy', report.presentations.length, 'Cambio a evaluacion', 'calendar', 'blue')}
                    ${metricCard('Adjudicaciones', report.awards.length, 'Recibidas hoy', 'chart', 'green')}
                    ${metricCard('Preparacion-Otros', report.completedPreparationOthers.length, 'Completados hoy', 'file', 'violet')}
                </div>
                <div class="mt-6 space-y-4">
                    <div>
                        <h3 class="text-sm font-bold text-[#21345d]">Presentaciones realizadas hoy</h3>
                        <div class="mt-3 space-y-2">
                            ${report.presentations.map((tender) => reportItem(`${tender.title}`, `${tenderAssigneeLabel(tender)} · ${tender.code} · ${formatDate(tenderPresentationDate(tender))} · ${formatEconomicOffer(tender)}`)).join('') || emptyReportItem('Sin presentaciones registradas hoy.')}
                        </div>
                    </div>
                    <div>
                        <h3 class="text-sm font-bold text-[#21345d]">Adjudicaciones recibidas</h3>
                        <div class="mt-3 space-y-2">
                            ${report.awards.map((tender) => reportItem(`${tender.title}`, `${tender.client} · ${tender.status} · ${formatCurrency(tender.budget)}`)).join('') || emptyReportItem('Sin adjudicaciones recibidas hoy.')}
                        </div>
                    </div>
                    <div>
                        <h3 class="text-sm font-bold text-[#21345d]">Preparacion-Otros completados</h3>
                        <div class="mt-3 space-y-2">
                            ${report.completedPreparationOthers.map((event) => reportItem(`${event.tender}`, `${event.owner} · ${event.title} · recepcion ${formatDate(event.receptionDate)}`)).join('') || emptyReportItem('Sin hitos Preparacion-Otros completados hoy.')}
                        </div>
                    </div>
                </div>
                <div class="mt-8 border-t border-[#e7edf6] pt-6">
                    <h3 class="text-sm font-bold text-[#21345d]">Resumen del mes actual</h3>
                    <div class="mt-4 grid gap-3 sm:grid-cols-2">
                        ${miniStat('Presentaciones mes', report.month.presentations)}
                        ${miniStat('Adjudicaciones mes', report.month.awards)}
                        ${miniStat('Preparacion-Otros mes', report.month.completedPreparationOthers)}
                        ${miniStat('PBL evaluacion', formatCurrency(report.month.evaluationBudget))}
                        ${miniStat('PBL restante preparacion', formatCurrency(report.month.remainingPreparationBudget))}
                        ${miniStat('Oferta economica equipo', formatCurrency(report.month.economicOfferTotal))}
                        ${miniStat('Ticket medio oferta', formatCurrency(report.month.averageEconomicOffer))}
                        ${miniStat('Carga media users', `${report.month.averageWorkload}%`)}
                    </div>
                </div>
            </article>
            <article class="panel">
                <div class="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 class="text-lg font-bold">Documento ejecutivo diario</h2>
                        <p class="mt-1 text-sm font-semibold text-[#7082a4]">Generado para envio al equipo ejecutivo.</p>
                    </div>
                    <button class="btn-primary" type="button" data-action="copy-report">Copiar</button>
                </div>
                <pre class="mt-5 max-h-[560px] overflow-auto whitespace-pre-wrap rounded-lg border border-[#e7edf6] bg-[#f8fafd] p-5 text-sm font-semibold leading-6 text-[#21345d]" data-report-output>${escapeHtml(documentText)}</pre>
            </article>
        </section>
    `;
}

function executiveReportData() {
    const r = view.report ?? {};
    const month = r.month ?? {};

    return {
        date: r.date ?? todayIso(),
        presentations: r.presentationsToday ?? [],
        awards: r.awardsToday ?? [],
        completedPreparationOthers: [],
        month: {
            label: month.label ?? currentMonthKey(),
            presentations: month.presentations ?? 0,
            awards: month.awards ?? 0,
            completedPreparationOthers: month.completedPreparationOthers ?? 0,
            evaluationBudget: month.evaluationBudget ?? 0,
            remainingPreparationBudget: month.remainingPreparationBudget ?? 0,
            economicOfferTotal: month.economicOfferTotal ?? 0,
            averageEconomicOffer: month.averageEconomicOffer ?? 0,
            economicOfferCount: month.economicOfferCount ?? 0,
            averageWorkload: month.averageWorkload ?? 0,
        },
    };
}

function executiveReportMonthData(month) {
    const tenders = visibleItems('tenders');
    const events = visibleItems('events');
    const averageWorkload = averageWorkloadFor(workloadAverageUsers());
    const evaluatedWithOffer = evaluatedTendersWithEconomicOffer(tenders);
    const remainingPreparationBudget = tenders.filter((tender) => tender.status === 'En preparacion').reduce((total, tender) => total + (Number(tender.budget) || 0), 0);

    return {
        label: month,
        presentations: tenders.filter((tender) => tender.status === 'En evaluacion' && tenderPresentationDate(tender)?.startsWith(month)).length,
        awards: tenders.filter((tender) => ['Ganada', 'Perdida'].includes(tender.status) && tender.adjudicationDate?.startsWith(month)).length,
        completedPreparationOthers: events.filter((event) => event.preparationOther && event.status === 'Completado' && event.completedAt?.startsWith(month)).length,
        evaluationBudget: tenders.filter((tender) => tender.status === 'En evaluacion').reduce((total, tender) => total + (Number(tender.budget) || 0), 0),
        remainingPreparationBudget,
        economicOfferTotal: economicOfferTotal(evaluatedWithOffer),
        averageEconomicOffer: averageEconomicOffer(tenders),
        economicOfferCount: evaluatedWithOffer.length,
        averageWorkload,
    };
}

function tenderPresentationDate(tender) {
    return tender.presentedAt || (tender.status === 'En evaluacion' ? tender.deadline : '');
}

function executiveReportText(report) {
    const presentationLines = report.presentations.length
        ? report.presentations.map((tender) => `- ${tender.title}: presentada por ${tenderAssigneeLabel(tender)}. Fecha registrada: ${formatDate(tenderPresentationDate(tender))}. Oferta economica: ${formatEconomicOffer(tender)}.`).join('\n')
        : '- No se han registrado presentaciones hoy.';
    const awardLines = report.awards.length
        ? report.awards.map((tender) => `- ${tender.title} (${tender.client}): ${tender.status}. Importe: ${formatCurrency(tender.budget)}. Responsable: ${tenderAssigneeLabel(tender)}.`).join('\n')
        : '- No se han recibido adjudicaciones hoy.';
    const preparationOtherLines = report.completedPreparationOthers.length
        ? report.completedPreparationOthers.map((event) => `- ${event.tender}: ${event.title}. Responsable: ${event.owner}. Recepcion: ${formatDate(event.receptionDate)}.`).join('\n')
        : '- No se han completado hitos Preparacion-Otros hoy.';

    return `Informe ejecutivo diario - ${formatDate(report.date)}

Presentaciones realizadas hoy
${presentationLines}

Adjudicaciones recibidas hoy
${awardLines}

Preparacion-Otros completados hoy
${preparationOtherLines}

Resumen
- Presentaciones: ${report.presentations.length}
- Adjudicaciones recibidas: ${report.awards.length}
- Preparacion-Otros completados: ${report.completedPreparationOthers.length}

Resumen mes actual (${report.month.label})
- Presentaciones mes: ${report.month.presentations}
- Adjudicaciones mes: ${report.month.awards}
- Preparacion-Otros completados mes: ${report.month.completedPreparationOthers}
- PBL en evaluacion: ${formatCurrency(report.month.evaluationBudget)}
- PBL restante en preparacion: ${formatCurrency(report.month.remainingPreparationBudget)}
- Oferta economica acumulada equipo: ${formatCurrency(report.month.economicOfferTotal)}
- Ticket medio oferta economica: ${formatCurrency(report.month.averageEconomicOffer)} (${report.month.economicOfferCount} con oferta)
- Carga media users: ${report.month.averageWorkload}%`;
}

function reportItem(title, meta) {
    return `<div class="rounded-lg border border-[#e7edf6] p-3"><p class="font-bold">${escapeHtml(title)}</p><p class="mt-1 text-sm font-semibold text-[#7082a4]">${escapeHtml(meta)}</p></div>`;
}

function emptyReportItem(text) {
    return `<p class="rounded-lg bg-slate-50 p-3 text-sm font-semibold text-[#53658b]">${text}</p>`;
}

function formatCurrency(value) {
    const amount = Number(value);

    if (!amount) {
        return 'Sin importe';
    }

    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
}

function formatEconomicOffer(tender) {
    return isEconomicOfferWaived(tender) ? 'Oferta nula' : formatCurrency(tender.economicOffer);
}

function renderImportTenders() {
    if (!isAdmin()) {
        return '<section class="panel"><p class="text-sm font-semibold text-[#7082a4]">No tienes permisos para importar licitaciones.</p></section>';
    }

    const selectedCount = selectedImportCount();
    const importButtonLabel = selectedCount === importPreview.length
        ? `Importar todo (${selectedCount})`
        : `Importar seleccion (${selectedCount})`;

    return `
        <section class="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
            <article class="panel">
                <h2 class="text-lg font-bold">Pegar datos desde Excel</h2>
                <p class="mt-1 text-sm font-semibold text-[#7082a4]">Copia la tabla con cabeceras y pegala aqui. Se aceptan celdas con saltos de linea y valores en euros.</p>
                <textarea class="field-control mt-5 min-h-[360px] font-mono text-xs" data-import-input placeholder="Estado&#9;Equipo asignado&#9;Expediente&#9;Responsable&#9;Objeto&#9;Lote - Titulo&#9;Organismo&#9;Suborganismo&#9;Deadline&#9;PBL (IVA exc)&#9;Oferta economica">${escapeHtml(importRaw)}</textarea>
                <div class="mt-5 flex flex-wrap gap-3">
                    <button class="btn-primary" type="button" data-action="import-preview">Previsualizar</button>
                    <button class="btn-secondary" type="button" data-action="import-clear">Limpiar</button>
                </div>
            </article>
            <article class="panel">
                <div class="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 class="text-lg font-bold">Preview de importacion</h2>
                        <p class="mt-1 text-sm font-semibold text-[#7082a4]">${importPreview.length} licitaciones preparadas${importPreview.length ? ` · ${selectedCount} seleccionadas` : ''}${importWarnings.length ? ` · ${importWarnings.length} avisos` : ''}</p>
                    </div>
                    ${importPreview.length ? `<button class="btn-primary disabled:cursor-not-allowed disabled:opacity-50" type="button" data-action="import-commit" ${selectedCount ? '' : 'disabled'}>${importButtonLabel}</button>` : ''}
                </div>
                ${importPreview.length ? `
                    <div class="mt-5 flex flex-wrap items-center gap-3">
                        <button class="btn-secondary" type="button" data-action="import-select-all">Seleccionar todos</button>
                        <button class="btn-secondary" type="button" data-action="import-select-none">Quitar seleccion</button>
                    </div>
                ` : ''}
                ${importWarnings.length ? `
                    <div class="mt-5 space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
                        ${importWarnings.map((warning) => `<p>${escapeHtml(warning)}</p>`).join('')}
                    </div>
                ` : ''}
                <div class="mt-5 max-h-[520px] overflow-auto">
                    ${importPreview.length ? importPreviewTable() : `<p class="rounded-lg bg-slate-50 p-4 text-sm font-semibold text-[#53658b]">${importRaw.trim() ? 'No hay licitaciones nuevas para previsualizar.' : 'Pega datos y pulsa Previsualizar.'}</p>`}
                </div>
            </article>
        </section>
    `;
}

function importPreviewTable() {
    const allSelected = importPreview.length > 0 && selectedImportCount() === importPreview.length;

    return `
        <table class="data-table">
            <thead><tr>
                <th class="w-12">
                    <input class="size-4 rounded border-[#b9c6d8]" type="checkbox" data-import-selection-all aria-label="Seleccionar todas las licitaciones" ${allSelected ? 'checked' : ''}>
                </th>
                <th>Expediente</th>
                <th>Objeto</th>
                <th>Lote</th>
                <th>Organismo</th>
                <th>Deadline</th>
                <th>PBL</th>
                <th>Oferta economica</th>
                <th>Responsable</th>
                <th>Estado</th>
            </tr></thead>
            <tbody>
                ${importPreview.map((item, index) => `
                    <tr>
                        <td>
                            <input class="size-4 rounded border-[#b9c6d8]" type="checkbox" data-import-selection="${index}" aria-label="Seleccionar ${escapeHtml(item.code || item.title)}" ${selectedImportIndexes.has(String(index)) ? 'checked' : ''}>
                        </td>
                        <td>${escapeHtml(item.code)}</td>
                        <td>${escapeHtml(item.title)}</td>
                        <td>${escapeHtml(item.lot)}</td>
                        <td>${escapeHtml(item.client)}</td>
                        <td>${formatDate(item.deadline)}</td>
                        <td>${formatCurrency(item.budget)}</td>
                        <td>${formatCurrency(item.economicOffer)}</td>
                        <td>${escapeHtml(item.owner)}${item.newUser ? '<p class="text-xs font-bold text-amber-600">Se creara usuario</p>' : ''}</td>
                        <td>${statusPill(item.status)}${importActionLabel(item)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function selectedImportCount() {
    return importPreview.filter((_, index) => selectedImportIndexes.has(String(index))).length;
}

function selectAllImportPreview() {
    selectedImportIndexes = new Set(importPreview.map((_, index) => String(index)));
}

function clearImportPreview() {
    importPreview = [];
    importRaw = '';
    importWarnings = [];
    selectedImportIndexes = new Set();
}

async function previewImportTenders() {
    const input = document.querySelector('[data-import-input]');

    importRaw = input?.value ?? '';

    if (!importRaw.trim()) {
        importPreview = [];
        importWarnings = [];
        selectedImportIndexes = new Set();
        render();
        return;
    }

    let parsedRows;

    try {
        parsedRows = parseImportedTenders(importRaw);
    } catch (error) {
        alert(error.message);
        return;
    }

    try {
        // El servidor clasifica create/update comparando contra todas las licitaciones.
        const result = await api.mutate('POST', '/api/tenders/import/preview', { rows: parsedRows });
        importPreview = result.rows ?? [];
        importWarnings = result.warnings ?? [];
        selectAllImportPreview();
        render();
    } catch (error) {
        handleMutationError(error);
    }
}

async function commitImportTenders() {
    if (!importPreview.length) {
        return;
    }

    const selectedTenders = importPreview.filter((_, index) => selectedImportIndexes.has(String(index)));

    if (!selectedTenders.length) {
        alert('Selecciona al menos una licitacion para importar.');
        return;
    }

    try {
        // El servidor aplica el lote en una transaccion (alta de usuarios y auto-eventos incluidos).
        await api.mutate('POST', '/api/tenders/import/commit', { rows: selectedTenders });
        await refreshGlobals();
        clearImportPreview();
        setSection('licitaciones');
    } catch (error) {
        handleMutationError(error);
    }
}

// Parsea el TSV pegado a filas estructuradas; la deduplicacion la hace el servidor.
function parseImportedTenders(rawText) {
    const rows = parseTsv(rawText).filter((row) => row.some((cell) => cleanImportCell(cell)));

    if (rows.length < 2) {
        throw new Error('Pega al menos una fila de cabecera y una licitacion.');
    }

    const headers = rows[0].map(normalizeImportHeader);
    const requiredHeaders = ['estado', 'expediente', 'responsable', 'objeto', 'organismo', 'deadline', 'pblivaexc'];
    const missing = requiredHeaders.filter((header) => !headers.includes(header));

    if (missing.length) {
        throw new Error(`Faltan columnas requeridas: ${missing.join(', ')}`);
    }

    return rows.slice(1).map((row) => tenderFromImportRow(headers, row)).filter(Boolean);
}

function parseTsv(text) {
    const rows = [];
    let row = [];
    let cell = '';
    let quoted = false;

    for (let index = 0; index < text.length; index += 1) {
        const character = text[index];
        const next = text[index + 1];

        if (character === '"' && quoted && next === '"') {
            cell += '"';
            index += 1;
        } else if (character === '"') {
            quoted = !quoted;
        } else if (character === '\t' && !quoted) {
            row.push(cell);
            cell = '';
        } else if ((character === '\n' || character === '\r') && !quoted) {
            if (character === '\r' && next === '\n') {
                index += 1;
            }

            row.push(cell);
            rows.push(row);
            row = [];
            cell = '';
        } else {
            cell += character;
        }
    }

    row.push(cell);
    rows.push(row);

    return rows;
}

function tenderFromImportRow(headers, row) {
    const value = (name) => cleanImportCell(row[headers.indexOf(name)] ?? '');
    const owner = value('responsable') || value('equipoasignado') || currentUser().name;

    if (!value('objeto') && !value('expediente')) {
        return null;
    }

    return {
        title: value('objeto'),
        client: [value('organismo'), value('suborganismo')].filter(Boolean).join(' - '),
        code: value('expediente'),
        lot: value('lotetitulo'),
        deadline: parseImportedDate(value('deadline')),
        status: normalizeImportedStatus(value('estado')),
        budget: parseImportedCurrency(value('pblivaexc')),
        economicOffer: parseImportedCurrency(importedEconomicOfferValue(headers, row)),
        economicOfferWaived: false,
        owner,
        importedResponsible: owner,
        newUser: !state.team.some((member) => member.name.toLowerCase() === owner.toLowerCase()),
        description: '',
    };
}

function filterImportedTenders(tenders) {
    const accepted = [];
    const existingByExactKey = new Map(state.tenders.map((tender) => [importExactKey(tender), tender]));
    const exactKeys = new Set(existingByExactKey.keys());
    const statuslessMatches = new Map();

    state.tenders.forEach((tender) => addStatuslessMatch(statuslessMatches, tender));
    importWarnings = [];

    tenders.forEach((tender) => {
        const exactKey = importExactKey(tender);
        const statuslessKey = importStatuslessKey(tender);
        const matchesWithChanges = (statuslessMatches.get(statuslessKey) ?? [])
            .map((match) => ({
                ...match,
                importUpdateFields: changedImportedTenderFields(match, tender, match.status !== tender.status),
            }))
            .filter((match) => match.id && match.importUpdateFields.length);

        const existingTender = existingByExactKey.get(exactKey);

        if (existingTender) {
            const importUpdateFields = changedImportedTenderFields(existingTender, tender, false);

            if (importUpdateFields.length) {
                accepted.push({
                    ...tender,
                    importAction: 'updateTender',
                    importUpdateId: existingTender.id,
                    importUpdateFields,
                    newUser: importsNewOwner(importUpdateFields, tender),
                });
                importWarnings.push(`Actualizacion: ${tender.code || tender.title} actualiza ${importUpdateFieldsLabel(importUpdateFields)}.`);
            }

            return;
        }

        if (matchesWithChanges.length) {
            const previousStatuses = [...new Set(matchesWithChanges.map((match) => match.status))].join(', ');
            const [matchingTender] = matchesWithChanges;

            accepted.push({
                ...tender,
                importAction: 'updateTender',
                importUpdateId: matchingTender.id,
                importUpdateFields: matchingTender.importUpdateFields,
                newUser: importsNewOwner(matchingTender.importUpdateFields, tender),
            });
            importWarnings.push(`Actualizacion: ${tender.code || tender.title} coincide con una fila existente (${previousStatuses} -> ${tender.status}) y actualiza ${importUpdateFieldsLabel(matchingTender.importUpdateFields)}.`);

            return;
        }

        accepted.push(tender);
        exactKeys.add(exactKey);
        addStatuslessMatch(statuslessMatches, tender);
    });

    return accepted;
}

function importedEconomicOfferValue(headers, row) {
    const header = ['ofertaeconomica', 'ofertaeconomic', 'ofertaempresa', 'ofertanuestra', 'nuestraoferta']
        .find((name) => headers.includes(name));

    return header ? cleanImportCell(row[headers.indexOf(header)] ?? '') : '';
}

function canImportedEconomicOfferChange(existingTender, importedTender) {
    return normalizeImportValue(existingTender.economicOffer) !== normalizeImportValue(importedTender.economicOffer)
        && importedTender.economicOffer !== '';
}

function changedImportedTenderFields(existingTender, importedTender, allowStatusChange) {
    return [
        allowStatusChange && existingTender.status !== importedTender.status ? 'status' : '',
        canImportedEconomicOfferChange(existingTender, importedTender)
            && (allowStatusChange || (existingTender.status === 'En evaluacion' && importedTender.status === 'En evaluacion')) ? 'economicOffer' : '',
        normalizeImportValue(existingTender.owner) !== normalizeImportValue(importedTender.owner) ? 'owner' : '',
    ].filter(Boolean);
}

function updateImportedTender(importUpdateId, importedTender, importUpdateFields) {
    const existingTender = state.tenders.find((item) => item.id === importUpdateId);

    if (!existingTender) {
        return;
    }

    if (importUpdateFields.includes('owner')) {
        ensureImportedUser(importedTender.owner);
    }

    const updatedTender = {
        ...existingTender,
        status: importUpdateFields.includes('status') ? importedTender.status : existingTender.status,
        economicOffer: importUpdateFields.includes('economicOffer') ? importedTender.economicOffer : existingTender.economicOffer,
        economicOfferWaived: importUpdateFields.includes('economicOffer') ? false : existingTender.economicOfferWaived,
        owner: importUpdateFields.includes('owner') ? importedTender.owner : existingTender.owner,
        presentedAt: importUpdateFields.includes('status') && importedTender.status === 'En evaluacion' && existingTender.status !== 'En evaluacion'
            ? new Date().toISOString()
            : existingTender.presentedAt || '',
    };

    state.tenders = state.tenders.map((item) => item.id === importUpdateId ? updatedTender : item);
    syncTenderPresentationEvent(updatedTender, existingTender);
}

function addStatuslessMatch(matches, tender) {
    const key = importStatuslessKey(tender);
    const current = matches.get(key) ?? [];

    current.push({ id: tender.id, status: tender.status, economicOffer: tender.economicOffer, owner: tender.owner });
    matches.set(key, current);
}

function importActionLabel(item) {
    if (item.importAction !== 'updateTender') {
        return '';
    }

    return `<p class="text-xs font-bold text-blue-600">Actualiza ${importUpdateFieldsLabel(item.importUpdateFields ?? [])}</p>`;
}

function importUpdateFieldsLabel(importUpdateFields) {
    const labels = {
        status: 'estado',
        economicOffer: 'oferta',
        owner: 'responsable',
    };
    const fieldLabels = importUpdateFields.map((field) => labels[field]).filter(Boolean);

    return fieldLabels.length > 1
        ? `${fieldLabels.slice(0, -1).join(', ')} y ${fieldLabels.at(-1)}`
        : fieldLabels[0] ?? 'datos';
}

function importsNewOwner(importUpdateFields, tender) {
    return importUpdateFields.includes('owner')
        && !state.team.some((member) => member.name.toLowerCase() === tender.owner.toLowerCase());
}

function importExactKey(tender) {
    return [
        importStatuslessKey(tender),
        normalizeImportValue(tender.status),
    ].join('|');
}

function importStatuslessKey(tender) {
    return [
        tender.code,
        tender.title,
        tender.lot,
        tender.client,
        tender.deadline,
        tender.budget,
    ].map(normalizeImportValue).join('|');
}

function normalizeImportValue(value) {
    return String(value ?? '').trim().replace(/\s+/g, ' ').toLowerCase();
}

function normalizeImportHeader(value) {
    return cleanImportCell(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

function cleanImportCell(value) {
    return String(value ?? '').replace(/\r/g, '').trim().replace(/^"|"$/g, '').trim();
}

function parseImportedDate(value) {
    const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/);

    if (!match) {
        return '';
    }

    const [, day, month, year, hour = '14', minute = '00'] = match;

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.padStart(2, '0')}:${minute}`;
}

function parseImportedCurrency(value) {
    const normalized = value.replace(/[€\s"]/g, '').replace(/\./g, '').replace(',', '.');
    const amount = Number(normalized);

    return Number.isFinite(amount) ? amount.toFixed(2) : '';
}

function normalizeImportedStatus(value) {
    const status = cleanImportCell(value).toLowerCase();

    return {
        descartada: 'Descartada',
        desistida: 'Desistida',
        ganada: 'Ganada',
        perdida: 'Perdida',
        'en analisis': 'En analisis',
        'en análisis': 'En analisis',
        'en preparacion': 'En preparacion',
        'en preparación': 'En preparacion',
        'en evaluacion': 'En evaluacion',
        'en evaluación': 'En evaluacion',
    }[status] ?? 'En analisis';
}

function ensureImportedUser(name) {
    if (!name || state.team.some((member) => member.name.toLowerCase() === name.toLowerCase())) {
        return;
    }

    state.team.push({
        id: `usr-import-${Date.now()}-${state.team.length}`,
        name,
        username: name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, ''),
        role: 'user',
        email: '',
        status: 'Activo',
        password: '1234',
        passwordResetAt: '',
    });
}

function renderAdmin() {
    if (!isAdmin()) {
        return '<section class="panel"><p class="text-sm font-semibold text-[#7082a4]">No tienes permisos para modificar parametros globales.</p></section>';
    }

    const alerts = overloadedUsers();
    const missingOffers = view.dashboard?.missingOffers ?? [];

    return `
        ${renderEconomicOfferAlert(missingOffers, view.dashboard?.missingOffersTotal ?? 0)}
        ${alerts.length ? `
            <section class="panel mb-6 border-rose-200 bg-rose-50">
                <h2 class="text-lg font-bold text-rose-800">Alertas de carga</h2>
                <div class="mt-3 grid gap-2 text-sm font-semibold text-rose-700">
                    ${alerts.map((member) => `<p>${escapeHtml(member.name)} esta al ${formatLoadValue(workloadForUser(member))}% con ${formatLoadValue(tenderCountForUser(member))} licitaciones activas en la ventana Gantt de hoy.</p>`).join('')}
                </div>
            </section>
        ` : ''}
        <section class="grid gap-6 xl:grid-cols-[1fr_.95fr]">
            <article class="panel">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <h2 class="text-lg font-bold">Parametros globales</h2>
                        <p class="mt-1 text-sm font-medium text-[#7082a4]">Marca, titulo, favicon y politica de acceso del prototipo.</p>
                    </div>
                    <button class="btn-secondary" type="button" data-action="reset-settings">Restaurar</button>
                </div>
                <form class="mt-6 grid gap-4" data-form data-entity="settings">
                    ${schemas.settings.map(([name, label, type = 'text']) => fieldMarkup(name, label, type, [], state.settings[name] ?? '')).join('')}
                    <label class="field-label">Favicon
                        <input class="field-control" type="file" accept="image/png,image/jpeg,image/svg+xml,image/x-icon" data-favicon-input>
                    </label>
                    ${state.settings.favicon ? '<p class="text-sm font-semibold text-emerald-700">Favicon personalizado activo.</p>' : '<p class="text-sm font-semibold text-[#7082a4]">Usando favicon por defecto.</p>'}
                    <label class="field-label">Imagen de fondo del login
                        <input class="field-control" type="file" accept="image/png,image/jpeg,image/webp" data-login-bg-input>
                    </label>
                    <div class="flex items-center gap-3">
                        ${state.settings.loginBackground
                            ? `<span class="h-16 w-28 shrink-0 overflow-hidden rounded-lg border border-[#dfe6f2]"><img src="${state.settings.loginBackground}" class="size-full object-cover" alt="Fondo de login"></span>
                               <button class="link-danger" type="button" data-action="remove-login-bg">Quitar fondo</button>`
                            : '<p class="text-sm font-semibold text-[#7082a4]">Sin imagen de fondo (login con color plano).</p>'}
                    </div>
                    <div class="flex justify-end">
                        <button class="btn-primary" type="submit">Guardar parametros</button>
                    </div>
                </form>
            </article>

            <article class="panel">
                <h2 class="text-lg font-bold">Seguridad y usuarios</h2>
                <p class="mt-1 text-sm font-medium text-[#7082a4]">Gestiona usuarios y restablece contrasenas sin mostrar las actuales.</p>
                <div class="mt-5 divide-y divide-[#e7edf6]">
                    ${state.team.map((member) => `
                        <div class="flex flex-wrap items-center justify-between gap-3 py-4">
                            <div>
                                <p class="font-bold">${escapeHtml(member.name)}</p>
                                <p class="text-sm text-[#7082a4]">${escapeHtml(member.username)} · ${escapeHtml(member.email)} · ${escapeHtml(member.role)} · carga ${formatLoadValue(workloadForUser(member))}%</p>
                                <p class="mt-1 text-xs font-bold text-[#7082a4]">${member.passwordResetAt ? `Ultimo reset: ${formatDate(member.passwordResetAt.slice(0, 10))}` : 'Sin reset registrado'}</p>
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <button class="btn-secondary" type="button" data-action="impersonate" data-id="${member.id}">Personificar</button>
                                <button class="btn-secondary" type="button" data-action="password" data-id="${member.id}">Cambiar password</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </article>
        </section>
        <section class="panel mt-6">
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 class="text-lg font-bold">Colores de estados</h2>
                    <p class="mt-1 text-sm font-medium text-[#7082a4]">Configura como se ven los estados de analisis en licitaciones.</p>
                </div>
                <button class="btn-secondary" type="button" data-action="reset-status-colors">Restaurar colores</button>
            </div>
            <form class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5" data-status-colors-form>
                ${tenderStatusOptions().map((status) => `
                    <label class="field-label">${escapeHtml(status)}
                        <input class="field-control h-12 p-1" type="color" name="${escapeHtml(status)}" value="${escapeHtml(statusColor(status) || defaults.settings.statusColors[status])}">
                    </label>
                `).join('')}
                <div class="flex items-end sm:col-span-2 xl:col-span-5">
                    <button class="btn-primary" type="submit">Guardar colores</button>
                </div>
            </form>
            <div class="mt-5 flex flex-wrap gap-2">
                ${tenderStatusOptions().map((status) => statusPill(status)).join('')}
            </div>
        </section>
        <section class="panel mt-6">
            <h2 class="text-lg font-bold">Vista previa</h2>
            <div class="mt-5 flex flex-wrap items-center gap-4 rounded-lg border border-[#e7edf6] p-5">
                <span class="grid size-12 place-items-center rounded-lg text-xl font-black text-white" style="background:${escapeHtml(state.settings.primaryColor)}">${escapeHtml(state.settings.logoLetter)}</span>
                <div>
                    <p class="text-xl font-bold">${escapeHtml(state.settings.appName)}</p>
                    <p class="text-sm font-semibold text-[#7082a4]">${escapeHtml(state.settings.tagline)}</p>
                </div>
            </div>
        </section>
        <section class="panel mt-6">
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 class="text-lg font-bold">Copia de seguridad</h2>
                    <p class="mt-1 text-sm font-medium text-[#7082a4]">Exporta o importa toda la base de datos (licitaciones, hitos, equipo) y la configuracion en un archivo JSON.</p>
                </div>
                <button class="btn-secondary" type="button" data-action="export-backup">Exportar copia</button>
            </div>
            <div class="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5">
                <h3 class="text-sm font-bold text-amber-900">Importar copia (reemplaza todos los datos actuales)</h3>
                <p class="mt-1 text-sm font-semibold text-amber-800">Sube un archivo exportado por LiciTIC. Esta accion sustituye por completo las licitaciones, hitos, equipo y configuracion existentes.</p>
                <div class="mt-4 flex flex-wrap items-center gap-3">
                    <input class="field-control max-w-md" type="file" accept="application/json,.json" data-backup-input>
                    <button class="btn-danger" type="button" data-action="import-backup">Importar y reemplazar</button>
                </div>
            </div>
            <div class="mt-6 rounded-lg border border-rose-200 bg-rose-50 p-5">
                <h3 class="text-sm font-bold text-rose-900">Reset de licitaciones</h3>
                <p class="mt-1 text-sm font-semibold text-rose-800">Borra licitaciones, hitos, comentarios y ejecuciones. Conserva equipo y configuracion.</p>
                <div class="mt-4 flex flex-wrap items-center gap-3">
                    <button class="btn-danger" type="button" data-action="reset-tenders" data-mode="empty">Vaciar licitaciones</button>
                    <button class="btn-secondary" type="button" data-action="reset-tenders" data-mode="demo">Restaurar demo</button>
                </div>
            </div>
        </section>
    `;
}

function renderStatsBody() {
    const overview = view.overview ?? {};
    const total = overview.total ?? 0;
    const active = overview.active ?? 0;
    const review = overview.review ?? 0;
    const pending = overview.pending ?? 0;
    const lost = overview.lost ?? 0;
    const successRate = overview.successRate ?? 0;

    return `
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-lg font-bold">Estadisticas generales</h2>
            ${isAdmin() ? '<button class="btn-secondary" type="button" data-action="edit-stats">Editar objetivos</button>' : ''}
        </div>
        <div class="mt-6 grid gap-5 lg:grid-cols-3">
            <div>
                <h3 class="text-sm font-bold">Volumen de licitaciones</h3>
                ${renderVolumeChart(overview.volumeByMonth ?? [])}
            </div>
            <div>
                <h3 class="text-sm font-bold">Ganadas vs. perdidas</h3>
                <div class="mt-8 grid size-32 place-items-center rounded-full bg-[conic-gradient(#25b46b_0_${successRate}%,#f25468_${successRate}%_100%)] p-4">
                    <div class="grid size-full place-items-center rounded-full bg-white text-xl font-bold">${successRate}%</div>
                </div>
            </div>
            <div>
                <h3 class="text-sm font-bold">Licitaciones por estado</h3>
                <div class="mt-5 space-y-3 text-sm font-semibold text-[#53658b]">
                    ${statRow('En preparacion', active, total, 'bg-blue-600', statusColor('En preparacion'))}
                    ${statRow('En evaluacion', review, total, 'bg-amber-400', statusColor('En evaluacion'))}
                    ${statRow('En analisis', pending, total, 'bg-slate-400', statusColor('En analisis'))}
                    ${statRow('Perdida', lost, total, 'bg-rose-600', statusColor('Perdida'))}
                    ${statRow('Objetivo mensual', state.stats.monthlyGoal, state.stats.monthlyGoal, 'bg-emerald-500')}
                </div>
            </div>
        </div>
        ${renderUserStatsBody()}
    `;
}

// Barras de "Volumen de licitaciones": conteo real por mes (deadline) del overview.
function renderVolumeChart(months) {
    if (!months.length) {
        return '<p class="mt-8 text-sm font-semibold text-[#7082a4]">Sin datos de volumen.</p>';
    }

    const max = Math.max(...months.map((month) => month.count), 0);

    const bars = months.map((month) => {
        const height = max ? Math.round((month.count / max) * 100) : 0;

        return `
            <div class="flex flex-1 flex-col items-center gap-1">
                <span class="text-xs font-bold text-[#21345d]">${month.count}</span>
                <span class="flex w-full items-end" style="height:7rem">
                    <span class="w-full rounded-t-md bg-blue-600" style="height:${Math.max(height, month.count ? 6 : 0)}%"></span>
                </span>
                <span class="text-xs font-semibold text-[#7082a4]">${escapeHtml(month.label)}</span>
            </div>`;
    }).join('');

    return `<div class="mt-6 flex items-end gap-3">${bars}</div>`;
}

function statRow(label, value, total, color, customColor = '') {
    const width = total ? Math.min(100, Math.round((Number(value) / Number(total)) * 100)) : 0;
    const style = customColor ? `background:${escapeHtml(customColor)};width:${width}%` : `width:${width}%`;

    return `<div><div class="flex justify-between"><span>${label}</span><span>${value}</span></div><div class="mt-1 h-2 rounded-full bg-[#eceff7]"><div class="h-full rounded-full ${color}" style="${style}"></div></div></div>`;
}

function renderUserStatsBody() {
    const cards = view.overview?.userStats ?? [];

    return `
        <div class="mt-8 border-t border-[#e7edf6] pt-6">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <h3 class="text-lg font-bold">Estadisticas por usuario</h3>
                <p class="text-sm font-bold text-[#53658b]">Solo usuarios con rol user</p>
            </div>
            <div class="mt-5 grid gap-4 xl:grid-cols-2">
                ${cards.map((stat) => userStatsCard(stat)).join('') || '<p class="rounded-lg bg-slate-50 p-4 text-sm font-semibold text-[#53658b]">No hay usuarios con rol user para mostrar.</p>'}
            </div>
        </div>
    `;
}

function userStatsCard(stat) {
    const workload = stat.load ?? 0;
    const won = stat.won ?? 0;
    const lost = stat.lost ?? 0;
    const tone = workload > 100 ? 'bg-rose-600' : 'bg-violet-600';

    return `
        <article class="rounded-lg border border-[#dfe6f2] bg-white p-5">
            <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p class="text-base font-bold">${escapeHtml(stat.name)}</p>
                    <p class="mt-1 text-sm font-semibold text-[#7082a4]">${escapeHtml(stat.username ?? '')} · carga ${formatLoadValue(workload)}%</p>
                </div>
                <span class="status-pill ${workload > 100 ? 'status-rose' : 'status-blue'}">${formatLoadValue(workload)}%</span>
            </div>
            <div class="mt-4 h-2 rounded-full bg-[#eceff7]">
                <div class="h-full rounded-full ${tone}" style="width:${Math.min(workload, 100)}%"></div>
            </div>
            <div class="mt-5 grid gap-3 sm:grid-cols-5">
                ${miniStat('Licitaciones', stat.counted ?? 0)}
                ${miniStat('En analisis', stat.analysis ?? 0)}
                ${miniStat('En preparacion', stat.prepared ?? 0)}
                ${miniStat('En evaluacion', stat.evaluated ?? 0)}
                ${miniStat('Exito', `${stat.successRate ?? 0}%`)}
            </div>
            <div class="mt-5 grid gap-3 sm:grid-cols-2">
                ${miniStat('PBL acumulado', formatCurrency(stat.evalBudget ?? 0))}
                ${miniStat('PBL preparacion', formatCurrency(stat.preparedBudget ?? 0))}
                ${miniStat('Oferta economica', formatCurrency(stat.offerTotal ?? 0))}
                ${miniStat('Ofertas pendientes', stat.missingOffers ?? 0)}
            </div>
            <div class="mt-5 space-y-2 text-sm font-semibold text-[#53658b]">
                ${statRow('Ganadas', won, Math.max(won + lost, 1), 'bg-emerald-500')}
                ${statRow('Perdidas', lost, Math.max(won + lost, 1), 'bg-rose-500')}
                ${statRow('Descartadas / desistidas (no computan)', stat.discarded ?? 0, Math.max(stat.totalTenders ?? 1, 1), 'bg-slate-400')}
            </div>
        </article>
    `;
}

function miniStat(label, value) {
    return `
        <div class="rounded-lg bg-[#f8fafd] p-3">
            <p class="text-xs font-bold uppercase text-[#7082a4]">${label}</p>
            <p class="mt-1 text-lg font-bold text-[#081743]">${value}</p>
        </div>
    `;
}

function renderDeadlineList() {
    const tenderItems = visibleItems('tenders')
        .filter((item) => item.status === 'En preparacion')
        .map((item) => ({
            title: item.title,
            meta: `${item.client} · ${item.code}`,
            date: item.deadline,
            status: item.status,
        }));
    const preparationOtherItems = visibleItems('events')
        .filter((item) => item.preparationOther)
        .map((item) => ({
            title: item.title,
            meta: `${item.tender} · ${item.owner}`,
            date: item.date,
            status: 'Preparacion-Otros',
        }));
    const items = [...tenderItems, ...preparationOtherItems]
        .sort((a, b) => compareDateValues(a.date, b.date))
        .slice(0, 5);

    return `
        <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold">Proximas licitaciones y vencimientos</h2>
            <a class="btn-secondary" href="#licitaciones">Ver todas</a>
        </div>
        <div class="mt-5 divide-y divide-[#e7edf6]">
            ${items.map((item) => `
                <div class="flex flex-wrap items-center justify-between gap-3 py-3">
                    <div>
                        <p class="font-bold">${escapeHtml(item.title)}</p>
                        <p class="text-sm text-[#7082a4]">${escapeHtml(item.meta)} · ${formatDate(item.date)}</p>
                    </div>
                    ${statusPill(item.status)}
                </div>
            `).join('') || '<p class="py-4 text-sm font-semibold text-[#7082a4]">No hay proximas licitaciones en preparacion ni hitos Preparacion-Otros.</p>'}
        </div>
    `;
}

function findEntityItem(entity, id) {
    // Busca el registro en cualquier caché cargada: la vista actual, los
    // resultados de busqueda y los paneles de metricas (que muestran licitaciones
    // que no estan en state.tenders, p.ej. ofertas pendientes, informe o gantt).
    const pools = [
        state[entity] ?? [],
        (searchResultsData[entity] ?? []).map((record) => record.item),
    ];

    if (entity === 'tenders') {
        pools.push(view.dashboard?.missingOffers ?? []);
        pools.push(view.report?.presentationsToday ?? []);
        pools.push(view.report?.awardsToday ?? []);
        pools.push(view.gantt?.tenders ?? []);
        // En Ejecucion, las licitaciones ganadas viven en view.executions (id = id de la licitacion).
        pools.push(view.executions ?? []);
    }

    for (const pool of pools) {
        const found = pool.find((record) => record.id === id);

        if (found) {
            return found;
        }
    }

    return null;
}

function openView(entity, id) {
    const item = findEntityItem(entity, id);

    if (!item) {
        return;
    }

    modalTitle.textContent = `Detalle de ${entityLabels[entity]}`;
    modalBody.innerHTML = `
        <dl class="grid gap-4 sm:grid-cols-2">
            ${viewEntriesFor(entity, item).map(([key, value]) => `
                <div class="rounded-lg border border-[#e7edf6] p-4">
                    <dt class="text-xs font-bold uppercase text-[#7082a4]">${viewLabelFor(key)}</dt>
                    <dd class="mt-1 font-semibold">${escapeHtml(formatViewValue(key, value))}</dd>
                </div>
            `).join('')}
        </dl>
        <div class="mt-6 flex justify-end gap-3">
            ${canEdit(entity, item) ? `<button class="btn-secondary" type="button" data-action="edit" data-entity="${entity}" data-id="${id}">Editar</button>` : ''}
            ${entity === 'events' && canDelete() ? `<button class="link-danger" type="button" data-action="delete" data-entity="${entity}" data-id="${id}">Borrar hito</button>` : ''}
        </div>
        ${entity === 'tenders' ? '<div class="mt-6 border-t border-[#eef2f8] pt-5" data-comments><p class="text-sm font-semibold text-[#9aa7c2]">Cargando comentarios...</p></div>' : ''}
    `;
    showModal();

    if (entity === 'tenders') {
        viewComments = [];
        loadTenderComments(id);
    }
}

function viewEntriesFor(entity, item) {
    if (entity === 'team') {
        const tenders = visibleItems('tenders').filter((tender) => userParticipatesInTender(tender, item));
        const evaluated = tenders.filter((tender) => tender.status === 'En evaluacion');
        const entries = [
            ['name', item.name],
            ['username', item.username],
            ['role', item.role],
            ['email', item.email],
            ['workload', `${formatLoadValue(workloadForUser(item))}%`],
            ['activeTenders', formatLoadValue(tenderCountForUser(item))],
            ['economicOfferTotal', economicOfferTotal(evaluatedTendersWithEconomicOffer(tenders))],
            ['missingEconomicOffers', missingEconomicOfferCount(evaluated)],
            ['status', item.status],
            ['passwordResetAt', item.passwordResetAt],
        ];

        if (isAdmin()) {
            entries.push(['password', item.password]);
        }

        return entries;
    }

    if (entity === 'tenders') {
        return [
            ['code', item.code],
            ['title', item.title],
            ['lot', item.lot],
            ['client', item.client],
            ['deadline', item.deadline],
            ['status', item.status],
            ['budget', item.budget],
            ['economicOffer', item.economicOffer],
            ['economicOfferWaived', item.economicOfferWaived],
            ['owner', item.owner],
            ['coAuthored', item.coAuthored],
            ['coAuthor', item.coAuthor],
            ['presentedAt', item.presentedAt],
            ['adjudicationDate', item.adjudicationDate],
            ['description', item.description],
        ];
    }

    return Object.entries(item).filter(([key]) => !['id', 'password', 'passwordPreview', 'mustChangePassword'].includes(key));
}

function viewLabelFor(key) {
    return {
        activeTenders: 'Licitaciones activas',
        adjudicationDate: 'Fecha adjudicacion recibida',
        budget: 'PBL',
        client: 'Organismo',
        code: 'Expediente',
        completedAt: 'Completado el',
        deadline: 'Fin aceptacion ofertas',
        economicOffer: 'Oferta economica',
        economicOfferWaived: 'Oferta economica nula',
        economicOfferTotal: 'Oferta economica acumulada',
        coAuthored: 'Coautoria',
        coAuthor: 'Responsable coautor',
        lot: 'Lote',
        missingEconomicOffers: 'Ofertas economicas pendientes',
        owner: 'Responsable',
        passwordResetAt: 'Password',
        presentedAt: 'Fecha presentacion',
        preparationOther: 'Preparacion-Otros',
        receptionDate: 'Fecha de recepcion',
        title: 'Objeto',
        workload: 'Carga',
        date: 'Fecha fin',
    }[key] ?? key;
}

function formatViewValue(key, value) {
    if (typeof value === 'boolean') {
        return value ? 'Si' : 'No';
    }

    if (!value) {
        return '';
    }

    if (key === 'deadline') {
        return formatDate(String(value));
    }

    if (key.toLowerCase().includes('date') || key === 'updated' || key === 'passwordResetAt') {
        return formatDate(String(value).slice(0, 10));
    }

    if (['budget', 'economicOffer', 'economicOfferTotal'].includes(key)) {
        return formatCurrency(value);
    }

    return value;
}

function openForm(entity, id = null, preset = {}) {
    const item = id ? findEntityItem(entity, id) : { ...preset };
    const isNew = !id;

    if ((isNew && !canCreate(entity)) || (!isNew && !canEdit(entity, item))) {
        alert('No tienes permisos para realizar esta accion.');
        return;
    }

    modalTitle.textContent = `${isNew ? 'Crear' : 'Editar'} ${entityLabels[entity]}`;
    modalBody.innerHTML = `
        <form class="grid gap-4" data-form data-entity="${entity}" data-id="${id ?? ''}">
            ${schemaFor(entity).map(([name, label, type = 'text', options = []]) => fieldMarkup(name, label, type, options, item?.[name] ?? '', isFieldRequired(entity, name, isNew))).join('')}
            <div class="flex justify-end gap-3 pt-2">
                <button class="btn-secondary" type="button" data-close-modal>Cancelar</button>
                <button class="btn-primary" type="submit">Guardar</button>
            </div>
        </form>
    `;

    if (entity === 'tenders') {
        syncEconomicOfferWaivedControl(modalBody.querySelector('[data-form]'));
        syncCoAuthorControl(modalBody.querySelector('[data-form]'));
    }

    showModal();
}

function schemaFor(entity) {
    return schemas[entity].map((field) => {
        const [name, label, type = 'text', options = []] = field;

        if (type === 'tenderSelect') {
            return [name, label, 'select', activeTenderOptions()];
        }

        if (['owner', 'person', 'coAuthor'].includes(name)) {
            return [name, label, 'select', userNames()];
        }

        return [name, label, type, options];
    });
}

function isFieldRequired(entity, name, isNew = true) {
    if (entity === 'tenders' && !isNew) {
        return false;
    }

    return !['adjudicationDate', 'description', 'economicOffer', 'coAuthor'].includes(name);
}

function requiredAttribute(isRequired) {
    return isRequired ? ' required' : '';
}

function fieldMarkup(name, label, type, options, value, isRequired = true) {
    if (type === 'select') {
        const coAuthorFieldAttribute = name === 'coAuthor' ? ' data-coauthor-field' : '';
        const coAuthorSelectAttribute = name === 'coAuthor' ? ' data-coauthor-select' : '';
        const coAuthorFieldClass = name === 'coAuthor' && !value ? ' hidden' : '';
        const fieldOptions = [
            ...(!isRequired && !value ? [''] : []),
            ...(value && !options.includes(value) ? [value] : []),
            ...options,
        ];

        return `<label class="field-label${coAuthorFieldClass}"${coAuthorFieldAttribute}>${label}<select class="field-control" name="${name}"${coAuthorSelectAttribute}${requiredAttribute(isRequired)}>${fieldOptions.map((option) => `<option value="${escapeHtml(option)}" ${option === value ? 'selected' : ''}>${escapeHtml(option)}</option>`).join('')}</select></label>`;
    }

    if (type === 'checkbox') {
        const dataAttribute = name === 'preparationOther' ? ' data-preparation-other' : name === 'economicOfferWaived' ? ' data-economic-offer-waived' : name === 'coAuthored' ? ' data-coauthored' : '';

        return `<label class="flex items-center gap-3 rounded-lg border border-[#dfe6f2] p-4 text-sm font-bold text-[#21345d]"><input type="checkbox" name="${name}"${dataAttribute} ${value ? 'checked' : ''}> ${label}</label>`;
    }

    if (type === 'conditionalDate') {
        return `<label class="field-label ${value ? '' : 'hidden'}" data-conditional-field="${name}">${label}<input class="field-control" type="date" name="${name}" value="${escapeHtml(value)}"></label>`;
    }

    if (type === 'textarea') {
        return `<label class="field-label">${label}<textarea class="field-control min-h-28" name="${name}">${escapeHtml(value)}</textarea></label>`;
    }

    if (type === 'optionalDate') {
        return `<label class="field-label">${label}<input class="field-control" type="date" name="${name}" value="${escapeHtml(value)}"></label>`;
    }

    if (type === 'currency') {
        const dataAttribute = name === 'economicOffer' ? ' data-economic-offer-input' : '';

        return `<label class="field-label">${label}<input class="field-control" type="number" name="${name}" value="${escapeHtml(value)}" min="0" step="0.01" inputmode="decimal"${dataAttribute}${requiredAttribute(isRequired)}></label>`;
    }

    if (type === 'percentage') {
        return `<label class="field-label">${label}<input class="field-control" type="number" name="${name}" value="${escapeHtml(value)}" min="0" max="100" step="1" inputmode="numeric"${requiredAttribute(isRequired)}></label>`;
    }

    return `<label class="field-label">${label}<input class="field-control" type="${type}" name="${name}" value="${escapeHtml(value)}"${requiredAttribute(isRequired)}></label>`;
}

function openStatsForm() {
    modalTitle.textContent = 'Editar objetivos';
    modalBody.innerHTML = `
        <form class="grid gap-4" data-form data-entity="stats">
            ${schemas.stats.map(([name, label, type]) => fieldMarkup(name, label, type, [], state.stats[name])).join('')}
            <div class="flex justify-end gap-3 pt-2">
                <button class="btn-secondary" type="button" data-close-modal>Cancelar</button>
                <button class="btn-primary" type="submit">Guardar</button>
            </div>
        </form>
    `;
    showModal();
}

function openPasswordForm(userId) {
    const user = state.team.find((member) => member.id === userId);

    if (!user) {
        return;
    }

    modalTitle.textContent = `Cambiar password de ${user.name}`;
    modalBody.innerHTML = `
        <form class="grid gap-4" data-password-form data-id="${user.id}">
            <p class="rounded-lg bg-blue-50 p-4 text-sm font-semibold text-blue-800">No se muestran contrasenas actuales. Este flujo establece una nueva contrasena y marca al usuario para cambiarla en el siguiente acceso cuando exista backend.</p>
            <label class="field-label">Nueva password<input class="field-control" type="password" name="password" minlength="4" required autocomplete="new-password"></label>
            <label class="field-label">Confirmar password<input class="field-control" type="password" name="password_confirmation" minlength="4" required autocomplete="new-password"></label>
            <label class="flex items-center gap-3 text-sm font-bold text-[#21345d]"><input type="checkbox" name="forceChange" checked> Forzar cambio al iniciar sesion</label>
            <div class="flex justify-end gap-3 pt-2">
                <button class="btn-secondary" type="button" data-close-modal>Cancelar</button>
                <button class="btn-primary" type="submit">Actualizar password</button>
            </div>
        </form>
    `;
    showModal();
}

function showModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.setAttribute('aria-hidden', 'true');
}

// ----- Verificador y fusionador de licitaciones duplicadas -----

// Campos de la licitacion comparables y fusionables (en orden de presentacion).
const MERGE_FIELDS = ['code', 'title', 'lot', 'client', 'deadline', 'status', 'budget', 'economicOffer', 'economicOfferWaived', 'owner', 'coAuthored', 'coAuthor', 'presentedAt', 'adjudicationDate', 'description'];

async function openDuplicatesModal() {
    modalTitle.textContent = 'Verificar posibles duplicados';
    modalBody.innerHTML = '<p class="p-4 text-sm font-semibold text-[#7082a4]">Buscando posibles duplicados por expediente...</p>';
    showModal();

    try {
        const result = await api.get('/api/tenders/duplicates');
        duplicateGroups = result.data ?? [];
    } catch (error) {
        modalBody.innerHTML = `<p class="rounded-lg bg-rose-50 p-4 text-sm font-semibold text-rose-700">No se pudieron cargar los duplicados. ${escapeHtml(error.message ?? '')}</p>`;
        return;
    }

    renderDuplicatesModalBody();
}

function renderDuplicatesModalBody() {
    mergeDraft = null;
    modalTitle.textContent = 'Verificar posibles duplicados';

    if (!duplicateGroups.length) {
        modalBody.innerHTML = `
            <p class="rounded-lg bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">No se han detectado licitaciones con el mismo expediente.</p>
            <div class="mt-6 flex justify-end"><button class="btn-secondary" type="button" data-close-modal>Cerrar</button></div>
        `;
        return;
    }

    modalBody.innerHTML = `
        <p class="mb-4 text-sm font-semibold text-[#7082a4]">Se agrupan las licitaciones que comparten el mismo expediente. Revisa cada grupo y decide si son la misma licitacion para fusionarlas.</p>
        <div class="grid gap-4">
            ${duplicateGroups.map((group) => renderDuplicateGroupCard(group)).join('')}
        </div>
        <div class="mt-6 flex justify-end"><button class="btn-secondary" type="button" data-close-modal>Cerrar</button></div>
    `;
}

function renderDuplicateGroupCard(group) {
    return `
        <article class="rounded-lg border border-[#e7edf6] p-4">
            <div class="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p class="text-xs font-bold uppercase text-[#7082a4]">Expediente${group.lot ? ' · Lote' : ''}</p>
                    <p class="text-base font-bold text-[#21345d]">${escapeHtml(group.code ?? '')}${group.lot ? ` · Lote ${escapeHtml(group.lot)}` : ''} <span class="text-sm font-semibold text-[#7082a4]">· ${group.tenders.length} licitaciones</span></p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <button class="link-action" type="button" data-action="dismiss-duplicate-group" data-key="${escapeHtml(group.key)}">No son iguales</button>
                    <button class="btn-primary" type="button" data-action="open-merge" data-key="${escapeHtml(group.key)}">Revisar y fusionar</button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead><tr class="text-xs font-bold uppercase text-[#7082a4]">
                        <th class="py-1 pr-3">Objeto</th><th class="py-1 pr-3">Organismo</th><th class="py-1 pr-3">Estado</th>
                        <th class="py-1 pr-3">Responsable</th><th class="py-1 pr-3">Hitos</th><th class="py-1 pr-3">Coment.</th><th class="py-1 pr-3">Ejec.</th>
                    </tr></thead>
                    <tbody>
                        ${group.tenders.map((tender) => `
                            <tr class="border-t border-[#eef2f8]">
                                <td class="py-1.5 pr-3 font-semibold text-[#21345d]">${escapeHtml(tender.title ?? '')}</td>
                                <td class="py-1.5 pr-3">${escapeHtml(tender.client ?? '')}</td>
                                <td class="py-1.5 pr-3">${escapeHtml(tender.status ?? '')}</td>
                                <td class="py-1.5 pr-3">${escapeHtml(tender.owner ?? '')}</td>
                                <td class="py-1.5 pr-3">${tender.milestoneCount}</td>
                                <td class="py-1.5 pr-3">${tender.commentCount}</td>
                                <td class="py-1.5 pr-3">${tender.hasExecution ? 'Si' : 'No'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </article>
    `;
}

function dismissDuplicateGroup(key) {
    duplicateGroups = duplicateGroups.filter((group) => group.key !== key);
    renderDuplicatesModalBody();
}

function openMergeModal(key) {
    const group = duplicateGroups.find((item) => item.key === key);

    if (!group) {
        return;
    }

    const primaryId = group.tenders[0].id;
    const fields = {};
    MERGE_FIELDS.forEach((field) => { fields[field] = primaryId; });

    mergeDraft = {
        key,
        tenders: group.tenders,
        primaryId,
        fields,
        executionSourceId: defaultExecutionSource(group.tenders, primaryId),
    };

    renderMergeModalBody();
}

// Por defecto conserva la ejecucion de la principal; si no tiene, la primera duplicada que tenga.
function defaultExecutionSource(tenders, primaryId) {
    const primary = tenders.find((tender) => tender.id === primaryId);
    if (primary?.hasExecution) {
        return primaryId;
    }
    return tenders.find((tender) => tender.hasExecution)?.id ?? null;
}

function setMergePrimary(id) {
    if (!mergeDraft) {
        return;
    }
    mergeDraft.primaryId = id;
    // Al cambiar la principal, sus valores pasan a ser los predeterminados de cada campo.
    MERGE_FIELDS.forEach((field) => { mergeDraft.fields[field] = id; });
    mergeDraft.executionSourceId = defaultExecutionSource(mergeDraft.tenders, id);
    renderMergeModalBody();
}

function setMergeField(field, id) {
    if (mergeDraft) {
        mergeDraft.fields[field] = id;
        renderMergeModalBody();
    }
}

function tenderShortLabel(tender) {
    return tender.title || tender.code || tender.id;
}

function renderMergeModalBody() {
    if (!mergeDraft) {
        return;
    }

    const { tenders, primaryId } = mergeDraft;
    const duplicates = tenders.filter((tender) => tender.id !== primaryId);
    const incomingMilestones = duplicates.reduce((sum, tender) => sum + (tender.milestoneCount || 0), 0);
    const incomingComments = duplicates.reduce((sum, tender) => sum + (tender.commentCount || 0), 0);
    const executionsWith = tenders.filter((tender) => tender.hasExecution);

    modalTitle.textContent = 'Fusionar licitaciones';

    const primarySelector = `
        <div class="rounded-lg border border-[#e7edf6] p-4">
            <p class="text-xs font-bold uppercase text-[#7082a4]">1. Elige la licitacion principal (la que se conserva)</p>
            <div class="mt-2 grid gap-2">
                ${tenders.map((tender) => `
                    <label class="flex items-start gap-2 text-sm font-semibold text-[#21345d]">
                        <input type="radio" name="merge-primary" ${tender.id === primaryId ? 'checked' : ''} data-action="merge-set-primary" data-id="${tender.id}">
                        <span>${escapeHtml(tenderShortLabel(tender))} <span class="text-[#7082a4]">· ${escapeHtml(tender.client ?? '')} · ${escapeHtml(tender.status ?? '')}</span></span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;

    const fieldRows = MERGE_FIELDS.map((field) => {
        // Solo pedir decision cuando los valores difieren entre las licitaciones.
        const values = tenders.map((tender) => formatViewValue(field, tender[field]));
        const allEqual = values.every((value) => value === values[0]);
        const selected = mergeDraft.fields[field] ?? primaryId;

        return `
            <div class="rounded-lg border ${allEqual ? 'border-[#eef2f8]' : 'border-amber-200 bg-amber-50/40'} p-3">
                <p class="text-xs font-bold uppercase text-[#7082a4]">${escapeHtml(viewLabelFor(field))}${allEqual ? '' : ' · difiere'}</p>
                <div class="mt-1 grid gap-1.5">
                    ${tenders.map((tender) => {
                        const display = formatViewValue(field, tender[field]);
                        return `
                            <label class="flex items-start gap-2 text-sm">
                                <input type="radio" name="merge-field-${field}" ${tender.id === selected ? 'checked' : ''} data-action="merge-pick-field" data-field="${field}" data-id="${tender.id}">
                                <span class="${tender.id === primaryId ? 'font-bold text-[#21345d]' : 'font-semibold text-[#53658b]'}">${display ? escapeHtml(display) : '<span class="italic text-[#9aa7c2]">(vacio)</span>'}${tender.id === primaryId ? ' <span class="text-[10px] uppercase text-blue-600">principal</span>' : ''}</span>
                            </label>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');

    const executionChooser = executionsWith.length > 1 ? `
        <div class="rounded-lg border border-amber-200 bg-amber-50/40 p-4">
            <p class="text-xs font-bold uppercase text-[#7082a4]">Datos de ejecucion / pagos · varias licitaciones tienen ejecucion</p>
            <p class="mt-1 text-sm font-semibold text-[#53658b]">Solo se conserva una. Elige cual:</p>
            <div class="mt-2 grid gap-2">
                ${executionsWith.map((tender) => `
                    <label class="flex items-center gap-2 text-sm font-semibold text-[#21345d]">
                        <input type="radio" name="merge-execution" ${tender.id === mergeDraft.executionSourceId ? 'checked' : ''} data-action="merge-pick-execution" data-id="${tender.id}">
                        <span>${escapeHtml(tenderShortLabel(tender))}${tender.id === primaryId ? ' (principal)' : ''}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    ` : '';

    modalBody.innerHTML = `
        <div class="grid gap-4">
            ${primarySelector}
            <div class="rounded-lg border border-[#e7edf6] p-4">
                <p class="text-xs font-bold uppercase text-[#7082a4]">2. Elige que valor conservar en cada campo</p>
                <p class="mt-1 mb-3 text-sm font-semibold text-[#7082a4]">Los campos resaltados difieren entre las licitaciones.</p>
                <div class="grid gap-2 sm:grid-cols-2">${fieldRows}</div>
            </div>
            ${executionChooser}
            <div class="rounded-lg bg-blue-50 p-4 text-sm font-semibold text-blue-800">
                La principal recibira <b>${incomingMilestones}</b> hito(s) y <b>${incomingComments}</b> comentario(s) de las duplicadas.
                Se eliminaran <b>${duplicates.length}</b> licitacion(es) tras la fusion. Esta accion no se puede deshacer.
            </div>
            <div class="flex justify-between gap-3 pt-1">
                <button class="btn-secondary" type="button" data-action="merge-back">Atras</button>
                <div class="flex gap-3">
                    <button class="btn-secondary" type="button" data-close-modal>Cancelar</button>
                    <button class="btn-primary" type="button" data-action="merge-confirm">Confirmar fusion</button>
                </div>
            </div>
        </div>
    `;
}

async function confirmMerge() {
    if (!mergeDraft) {
        return;
    }

    const { tenders, primaryId, fields, executionSourceId } = mergeDraft;
    const duplicateIds = tenders.filter((tender) => tender.id !== primaryId).map((tender) => tender.id);

    if (!confirm(`Se fusionaran ${tenders.length} licitaciones en una sola y se eliminaran ${duplicateIds.length}. Esta accion no se puede deshacer. Continuar?`)) {
        return;
    }

    try {
        await api.mutate('POST', '/api/tenders/merge', { primaryId, duplicateIds, fields, executionSourceId });
    } catch (error) {
        handleMutationError(error);
        return;
    }

    // El grupo fusionado desaparece; recargamos los datos reales del servidor.
    duplicateGroups = duplicateGroups.filter((group) => group.key !== mergeDraft.key);
    mergeDraft = null;

    if (duplicateGroups.length) {
        renderDuplicatesModalBody();
    } else {
        closeModal();
    }

    setSection('licitaciones');
}

// ----- Comentarios de la licitacion -----

async function loadTenderComments(tenderId) {
    try {
        const result = await api.get('/api/comments', { tender_id: tenderId });
        viewComments = result.data ?? [];
    } catch {
        viewComments = [];
    }
    renderTenderCommentsInto(tenderId);
}

function renderTenderCommentsInto(tenderId) {
    const container = modalBody.querySelector('[data-comments]');
    if (!container) {
        return;
    }
    container.innerHTML = renderTenderCommentsSection(tenderId);
}

function renderTenderCommentsSection(tenderId) {
    const user = currentUser();
    const list = viewComments.length
        ? viewComments.map((comment) => `
            <div class="rounded-lg border border-[#eef2f8] p-3">
                <div class="flex items-center justify-between gap-2">
                    <p class="text-xs font-bold text-[#21345d]">${escapeHtml(comment.author || 'Anonimo')}</p>
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-semibold text-[#9aa7c2]">${escapeHtml(formatDate(String(comment.updatedAt ?? '').slice(0, 10)))}</span>
                        ${(isAdmin() || comment.author === user?.name) ? `<button class="link-danger text-xs" type="button" data-action="delete-comment" data-id="${comment.id}" data-entity="${tenderId}">Borrar</button>` : ''}
                    </div>
                </div>
                <p class="mt-1 whitespace-pre-wrap text-sm font-semibold text-[#53658b]">${escapeHtml(comment.body ?? '')}</p>
            </div>
        `).join('')
        : '<p class="text-sm font-semibold text-[#9aa7c2]">Sin comentarios todavia.</p>';

    return `
        <h3 class="text-sm font-bold text-[#21345d]">Comentarios</h3>
        <div class="mt-3 grid gap-2">${list}</div>
        <form class="mt-3 grid gap-2" data-comment-form data-id="${tenderId}">
            <textarea class="field-control" name="body" rows="2" placeholder="Anade un comentario..." required></textarea>
            <div class="flex justify-end"><button class="btn-primary" type="button" data-action="add-comment">Comentar</button></div>
        </form>
    `;
}

async function submitComment(form) {
    if (!form) {
        return;
    }
    const tenderId = form.dataset.id;
    const body = form.querySelector('[name="body"]')?.value.trim();

    if (!body) {
        return;
    }

    try {
        await api.mutate('POST', '/api/comments', { tenderId, author: currentUser()?.name ?? '', body });
    } catch (error) {
        handleMutationError(error);
        return;
    }

    await loadTenderComments(tenderId);
}

async function deleteComment(commentId, tenderId) {
    if (!confirm('Borrar este comentario?')) {
        return;
    }
    try {
        await api.mutate('DELETE', `/api/comments/${commentId}`);
    } catch (error) {
        handleMutationError(error);
        return;
    }
    await loadTenderComments(tenderId);
}

async function saveForm(form) {
    const entity = form.dataset.entity;
    const id = form.dataset.id;
    const data = Object.fromEntries(new FormData(form).entries());
    const existingItem = id ? findEntityItem(entity, id) : null;

    if ((id && !canEdit(entity, existingItem)) || (!id && !canCreate(entity))) {
        alert('No tienes permisos para guardar este registro.');
        return;
    }

    prepareFormData(entity, data, existingItem);

    if (!validateFormData(entity, data, id)) {
        return;
    }

    const endpoint = { tenders: 'tenders', events: 'milestones', team: 'members' }[entity];

    try {
        if (entity === 'stats') {
            await api.mutate('PUT', '/api/settings', { stats: data });
            await refreshGlobals();
        } else if (entity === 'settings') {
            await api.mutate('PUT', '/api/settings', { settings: { ...state.settings, ...data } });
            await refreshGlobals();
        } else if (id) {
            await api.mutate('PUT', `/api/${endpoint}/${id}`, { ...data, expectedUpdatedAt: existingItem?.updatedAt });
            if (entity === 'team') {
                await refreshGlobals();
            }
        } else {
            await api.mutate('POST', `/api/${endpoint}`, data);
            if (entity === 'team') {
                await refreshGlobals();
            }
        }
    } catch (error) {
        handleMutationError(error);
        // Tras un conflicto recargamos para mostrar el estado real del servidor.
    }

    closeModal();
    render();
}

function prepareFormData(entity, data, existingItem = null) {
    if (entity === 'tenders') {
        data.economicOfferWaived = data.economicOfferWaived === 'on';
        data.economicOffer = data.economicOfferWaived ? '' : (data.economicOffer ?? existingItem?.economicOffer ?? '');
        data.coAuthored = data.coAuthored === 'on';
        data.coAuthor = data.coAuthored ? (data.coAuthor ?? existingItem?.coAuthor ?? '') : '';
        data.presentedAt = data.status === 'En evaluacion' && existingItem?.status !== 'En evaluacion'
            ? new Date().toISOString()
            : existingItem?.presentedAt || '';

        return;
    }

    if (entity !== 'events') {
        return;
    }

    const tender = tenderByTitle(data.tender);

    data.owner = tender?.owner ?? '';
    data.preparationOther = data.preparationOther === 'on';
    data.receptionDate = data.preparationOther ? (data.receptionDate || todayIso()) : '';

    if (data.status === 'Completado') {
        data.completedAt = existingItem?.status === 'Completado' ? existingItem.completedAt || new Date().toISOString() : new Date().toISOString();
    } else {
        data.completedAt = '';
    }
}

function syncTenderPresentationEvent(tender, previousTender = null) {
    const eventId = `evt-presentation-${tender.id}`;
    const existingEventIndex = state.events.findIndex((item) => item.id === eventId || (item.autoGenerated && item.tenderId === tender.id));

    if (tender.status !== 'En preparacion') {
        if (existingEventIndex >= 0) {
            state.events.splice(existingEventIndex, 1);
        }

        return;
    }

    const title = `Presentacion ${tender.title}`;
    const event = {
        id: eventId,
        title,
        tender: tender.title,
        date: tender.deadline,
        type: 'Presentacion',
        owner: tender.owner,
        status: 'Pendiente',
        preparationOther: false,
        receptionDate: '',
        completedAt: '',
        autoGenerated: true,
        tenderId: tender.id,
    };

    if (existingEventIndex >= 0) {
        state.events[existingEventIndex] = { ...state.events[existingEventIndex], ...event };
        return;
    }

    const migratedEventIndex = previousTender ? state.events.findIndex((item) => (
        item.type === 'Presentacion'
        && item.tender === previousTender.title
        && item.date === previousTender.deadline
    )) : -1;

    if (migratedEventIndex >= 0) {
        state.events[migratedEventIndex] = { ...state.events[migratedEventIndex], ...event };
        return;
    }

    state.events.unshift(event);
}

function validateFormData(entity, data, id = '') {
    const allUserNames = state.team.map((member) => member.name);

    if (entity === 'events' && !data.tender) {
        alert('Indica la licitacion asociada al hito.');
        return false;
    }

    if (entity === 'tenders' && data.owner && !allUserNames.includes(data.owner)) {
        alert('Selecciona un responsable que exista en usuarios.');
        return false;
    }

    if (entity === 'tenders' && data.coAuthored) {
        if (!data.coAuthor || !allUserNames.includes(data.coAuthor)) {
            alert('Selecciona un responsable coautor que exista en usuarios.');
            return false;
        }

        if (data.owner === data.coAuthor) {
            alert('El responsable coautor debe ser distinto del responsable principal.');
            return false;
        }
    }

    // Para hitos, el responsable lo deriva el servidor de la licitacion asociada.

    if (entity === 'team') {
        const username = data.username.trim().toLowerCase();
        const duplicatedUser = state.team.some((member) => member.id !== id && member.username.toLowerCase() === username);

        if (!['admin', 'user'].includes(data.role)) {
            alert('El rol debe ser admin o user.');
            return false;
        }

        if (duplicatedUser) {
            alert('Ese usuario ya existe.');
            return false;
        }

        data.username = username;
    }

    if (entity === 'settings') {
        const coAuthorLoadFields = ['coAuthorOwnerLoadPercent', 'coAuthorLoadPercent'];
        const hasInvalidLoadPercent = coAuthorLoadFields.some((field) => {
            const percent = Number(data[field]);

            return !Number.isInteger(percent) || percent < 0 || percent > 100;
        });

        if (hasInvalidLoadPercent) {
            alert('Los porcentajes de carga de coautoria deben ser numeros enteros entre 0 y 100.');
            return false;
        }
    }

    return true;
}

async function savePasswordForm(form) {
    const data = Object.fromEntries(new FormData(form).entries());

    if (data.password !== data.password_confirmation) {
        alert('Las contrasenas no coinciden.');
        return;
    }

    if (data.password.length < 4) {
        alert('La password debe tener al menos 4 caracteres.');
        return;
    }

    try {
        await api.mutate('PUT', `/api/members/${form.dataset.id}/password`, { password: data.password });
        await refreshGlobals();
    } catch (error) {
        handleMutationError(error);
    }

    closeModal();
    render();
}

async function persistSettings(partialSettings) {
    state.settings = { ...state.settings, ...partialSettings };

    try {
        await api.mutate('PUT', '/api/settings', { settings: state.settings });
    } catch (error) {
        handleMutationError(error);
    }

    render();
}

function resetSettings() {
    persistSettings(structuredClone(defaults.settings));
}

function resetStatusColors() {
    persistSettings({ statusColors: structuredClone(defaults.settings.statusColors) });
}

function saveStatusColorsForm(form) {
    const colors = Object.fromEntries(new FormData(form).entries());
    const statusColors = {
        ...state.settings.statusColors,
        ...Object.fromEntries(Object.entries(colors).filter(([, color]) => /^#[0-9a-f]{6}$/i.test(color))),
    };

    persistSettings({ statusColors });
}

function handleFaviconUpload(input) {
    const file = input.files?.[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
        persistSettings({ favicon: reader.result });
    });
    reader.readAsDataURL(file);
}

// Escala una imagen para que quepa en maxDim (lado mayor) preservando la proporcion.
function scaleImageToDataUrl(file, maxDim = 1920, quality = 0.82) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onerror = reject;
        reader.onload = () => {
            const image = new Image();

            image.onerror = reject;
            image.onload = () => {
                const scale = Math.min(1, maxDim / Math.max(image.width, image.height));
                const width = Math.round(image.width * scale);
                const height = Math.round(image.height * scale);
                const canvas = document.createElement('canvas');

                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            image.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}

async function handleLoginBackgroundUpload(input) {
    const file = input.files?.[0];

    if (!file) {
        return;
    }

    try {
        const dataUrl = await scaleImageToDataUrl(file, 1920, 0.82);
        await persistSettings({ loginBackground: dataUrl });
    } catch (error) {
        alert('No se pudo procesar la imagen de fondo.');
    }
}

function removeLoginBackground() {
    persistSettings({ loginBackground: '' });
}

// Modal "Mi perfil": el usuario sube o quita su imagen de perfil.
function openProfile() {
    const user = currentUser();

    if (!user) {
        return;
    }

    modalTitle.textContent = 'Mi perfil';
    modalBody.innerHTML = `
        <div class="grid gap-5">
            <div class="flex items-center gap-4">
                <span class="grid size-20 shrink-0 place-items-center overflow-hidden rounded-full bg-[#f1d3c4] text-xl font-bold text-[#3e251d]">
                    ${user.avatar ? `<img src="${user.avatar}" alt="" class="size-full object-cover">` : escapeHtml(initials(user.name))}
                </span>
                <div>
                    <p class="text-base font-bold">${escapeHtml(user.name)}</p>
                    <p class="text-sm font-semibold text-[#7082a4]">${escapeHtml(user.username)} · ${escapeHtml(user.role)}</p>
                </div>
            </div>
            <label class="field-label">Imagen de perfil
                <input class="field-control" type="file" accept="image/png,image/jpeg,image/webp" data-avatar-input>
            </label>
            <p class="text-xs font-semibold text-[#7082a4]">La imagen se recorta y redimensiona automaticamente. Formatos: PNG, JPG, WEBP.</p>
            <div class="flex items-center justify-between gap-3 pt-2">
                ${user.avatar ? '<button class="link-danger" type="button" data-action="remove-avatar">Quitar imagen</button>' : '<span></span>'}
                <button class="btn-secondary" type="button" data-close-modal>Cerrar</button>
            </div>
        </div>
    `;
    showModal();
}

// Redimensiona/recorta la imagen a un cuadrado en cliente para no guardar archivos enormes.
function resizeImageToDataUrl(file, size = 256) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onerror = reject;
        reader.onload = () => {
            const image = new Image();

            image.onerror = reject;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                const scale = Math.max(size / image.width, size / image.height);
                const width = image.width * scale;
                const height = image.height * scale;

                ctx.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.85));
            };
            image.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}

async function handleAvatarUpload(input) {
    const file = input.files?.[0];

    if (!file) {
        return;
    }

    try {
        const dataUrl = await resizeImageToDataUrl(file, 256);
        await api.mutate('PUT', `/api/members/${currentUser().id}/avatar`, { avatar: dataUrl });
        await refreshGlobals();
        renderChrome();
        openProfile();
    } catch (error) {
        handleMutationError(error);
    }
}

async function removeAvatar() {
    try {
        await api.mutate('PUT', `/api/members/${currentUser().id}/avatar`, { avatar: null });
        await refreshGlobals();
        renderChrome();
        openProfile();
    } catch (error) {
        handleMutationError(error);
    }
}

// Descarga una copia completa (datos + configuracion) como archivo JSON.
async function exportBackup() {
    try {
        const data = await api.get('/api/admin/export');
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `licitic-backup-${todayIso()}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    } catch (error) {
        alert('No se pudo exportar la copia. Reintenta.');
    }
}

function exportTenders(all = false) {
    const params = tenderListParams({ includeFilters: !all, all });
    const url = new URL('/api/tenders/export', window.location.origin);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            url.searchParams.set(key, value);
        }
    });

    window.location.href = url.toString();
}

// Sube un JSON exportado y reemplaza por completo los datos y la configuracion.
async function importBackup() {
    const input = document.querySelector('[data-backup-input]');
    const file = input?.files?.[0];

    if (!file) {
        alert('Selecciona un archivo de copia (.json).');
        return;
    }

    let data;

    try {
        data = JSON.parse(await file.text());
    } catch {
        alert('El archivo no es un JSON valido.');
        return;
    }

    if (!confirm('Esto REEMPLAZARA por completo los datos actuales (licitaciones, hitos, equipo y configuracion). Esta accion no se puede deshacer. Continuar?')) {
        return;
    }

    try {
        const result = await api.mutate('POST', '/api/admin/import', data);
        await refreshGlobals();
        alert(`Copia importada: ${result.tenders} licitaciones, ${result.events} hitos, ${result.team} usuarios.`);

        // Si el usuario actual ya no existe en la copia, vuelve al login.
        if (!currentUser()) {
            storageRemove('bidsuite-auth');
            auth = null;
        }

        setSection('admin');
    } catch (error) {
        handleMutationError(error);
    }
}

async function resetTendersData(mode) {
    const label = mode === 'demo' ? 'restaurar las licitaciones demo' : 'vaciar las licitaciones';

    if (!confirm(`Vas a ${label}. Se borraran licitaciones, hitos, comentarios y ejecuciones actuales, pero se conservaran equipo y configuracion. Continuar?`)) {
        return;
    }

    try {
        const result = await api.mutate('POST', '/api/admin/reset', { mode });
        await refreshGlobals();
        alert(mode === 'demo'
            ? `Demo restaurada: ${result.tenders} licitaciones, ${result.events} hitos.`
            : 'Licitaciones vaciadas.');
        setSection('admin');
    } catch (error) {
        handleMutationError(error);
    }
}

function toggleReceptionDate(checkbox) {
    const form = checkbox.closest('form');
    const field = form?.querySelector('[data-conditional-field="receptionDate"]');
    const input = field?.querySelector('input');

    if (!field || !input) {
        return;
    }

    field.classList.toggle('hidden', !checkbox.checked);

    if (checkbox.checked && !input.value) {
        input.value = todayIso();
    }

    if (!checkbox.checked) {
        input.value = '';
    }
}

function syncEconomicOfferWaivedControl(form) {
    const checkbox = form?.querySelector('[data-economic-offer-waived]');
    const input = form?.querySelector('[data-economic-offer-input]');

    if (!checkbox || !input) {
        return;
    }

    input.disabled = checkbox.checked;

    if (checkbox.checked) {
        input.value = '';
    }
}

function syncCoAuthorControl(form) {
    const checkbox = form?.querySelector('[data-coauthored]');
    const field = form?.querySelector('[data-coauthor-field]');
    const select = form?.querySelector('[data-coauthor-select]');

    if (!checkbox || !field || !select) {
        return;
    }

    field.classList.toggle('hidden', !checkbox.checked);
    select.disabled = !checkbox.checked;

    if (!checkbox.checked) {
        select.value = '';
    }
}

async function deleteItem(entity, id) {
    if (!canDelete()) {
        alert('No tienes permisos para borrar registros.');
        return;
    }

    if (!confirm('Seguro que quieres borrar este registro?')) {
        return;
    }

    const endpoint = { tenders: 'tenders', events: 'milestones', team: 'members' }[entity];

    try {
        await api.mutate('DELETE', `/api/${endpoint}/${id}`);
        if (entity === 'team') {
            await refreshGlobals();
        }
    } catch (error) {
        handleMutationError(error);
    }

    render();
}

function impersonateUser(userId) {
    if (!isAdmin()) {
        alert('Solo admin puede personificar usuarios.');
        return;
    }

    if (!state.team.some((member) => member.id === userId)) {
        return;
    }

    auth = { userId, impersonatorId: currentUser().id };
    storageSet('bidsuite-auth', JSON.stringify(auth));
    setSection('inicio');
}

function sortTenders(column) {
    if (tenderSort.column === column) {
        tenderSort.direction = tenderSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        tenderSort = { column, direction: 'asc' };
    }

    tenderPage = 1;
    render();
}

function goToTenderPage(page) {
    tenderPage = Math.max(1, Math.min(page, tenderPageMeta.lastPage || 1));
    render();
}

function restoreTenderFilterFocus() {
    if (!pendingTenderFilterFocus) {
        return;
    }

    const { column, position } = pendingTenderFilterFocus;
    const input = document.querySelector(`[data-column-filter="${column}"]`);

    pendingTenderFilterFocus = null;

    if (!input) {
        return;
    }

    input.focus();
    input.setSelectionRange(position, position);
}

async function copyExecutiveReport() {
    const output = document.querySelector('[data-report-output]');

    if (!output) {
        setSection('informe');
        return;
    }

    try {
        await navigator.clipboard.writeText(output.textContent);
        alert('Documento copiado.');
    } catch {
        alert('No se pudo copiar automaticamente. Selecciona el documento y copialo manualmente.');
    }
}

document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-action], [data-close-modal], [data-primary-action], [data-open-notifications], [data-profile], [data-logout], [data-stop-impersonation]');

    if (!trigger) {
        return;
    }

    if (trigger.matches('[data-close-modal]')) {
        closeModal();
        return;
    }

    if (trigger.matches('[data-logout]')) {
        storageRemove('bidsuite-auth');
        auth = null;
        render();
        return;
    }

    if (trigger.matches('[data-stop-impersonation]')) {
        auth = { userId: auth.impersonatorId };
        storageSet('bidsuite-auth', JSON.stringify(auth));
        render();
        return;
    }

    if (trigger.matches('[data-primary-action]')) {
        if (currentSection === 'admin' || currentSection === 'ejecucion') {
            setSection(currentSection);
            return;
        }

        openForm(currentSection === 'equipo' ? 'team' : currentSection === 'calendario' ? 'events' : 'tenders');
        return;
    }

    if (trigger.matches('[data-open-notifications]')) {
        renderNotifications();
        return;
    }

    if (trigger.matches('[data-profile]')) {
        openProfile();
        return;
    }

    const { action, entity, id, date, column } = trigger.dataset;

    if (action === 'view') {
        openView(entity, id);
    } else if (action === 'edit') {
        openForm(entity, id);
    } else if (action === 'new') {
        openForm(entity);
    } else if (action === 'new-date') {
        openForm(entity, null, { date });
    } else if (action === 'ejecucion-list') {
        ejecucionView = 'list';
        ejecucionListQuery = '';
        ejecucionShowHidden = false;
        render();
    } else if (action === 'ejecucion-show-hidden-toggle') {
        ejecucionShowHidden = !ejecucionShowHidden;
        render();
    } else if (action === 'ejecucion-toggle-group') {
        const key = trigger.dataset.key;
        ejecucionCollapsed[key] = !ejecucionCollapsed[key];
        const group = trigger.closest('[data-ejecucion-group]');
        group?.querySelector('[data-ejecucion-cards]')?.classList.toggle('hidden', ejecucionCollapsed[key]);
        const chevron = trigger.querySelector('[data-chevron]');
        if (chevron) {
            chevron.textContent = ejecucionCollapsed[key] ? '▸' : '▾';
        }
    } else if (action === 'ejecucion-toggle-visible') {
        patchExecution(id, { visible: trigger.dataset.value === '1' });
    } else if (action === 'ejecucion-toggle-hidden') {
        patchExecution(id, { hidden: trigger.dataset.value === '1' });
    } else if (action === 'ejecucion-open') {
        const record = (view.executions ?? []).find((item) => item.tenderId === id);
        ejecucionTenderId = id;
        ejecucionDraft = record ? draftFromRecord(record) : null;
        ejecucionView = 'detail';
        render();
    } else if (action === 'ejecucion-back') {
        ejecucionView = ejecucionView === 'detail' ? 'list' : 'home';
        ejecucionDraft = null;
        render();
    } else if (action === 'ejecucion-add-payment') {
        const container = ejecucionContainer(trigger.dataset.scope ?? '');
        if (container) {
            container.milestonePayments.push({ concept: '', amount: '', date: '' });
            render();
        }
    } else if (action === 'ejecucion-remove-payment') {
        const container = ejecucionContainer(trigger.dataset.scope ?? '');
        if (container) {
            container.milestonePayments.splice(Number(trigger.dataset.index), 1);
            render();
        }
    } else if (action === 'ejecucion-add-plan') {
        const container = ejecucionContainer(trigger.dataset.scope ?? '');
        if (container) {
            container.installmentPlans.push({ mode: 'remainder', startDate: '', endDate: '', frequencyMonths: '', amount: '', cuotas: [] });
            render();
        }
    } else if (action === 'ejecucion-remove-plan') {
        const container = ejecucionContainer(trigger.dataset.scope ?? '');
        if (container) {
            container.installmentPlans.splice(Number(trigger.dataset.index), 1);
            render();
        }
    } else if (action === 'ejecucion-generate-plan') {
        applyPlanGeneration(trigger.dataset.scope ?? '', Number(trigger.dataset.index), false);
    } else if (action === 'ejecucion-recalc-plan') {
        applyPlanGeneration(trigger.dataset.scope ?? '', Number(trigger.dataset.index), true);
    } else if (action === 'ejecucion-plan-add-month') {
        const container = ejecucionContainer(trigger.dataset.scope ?? '');
        const plan = container?.installmentPlans[Number(trigger.dataset.index)];
        if (plan) {
            const freq = Math.round(ejecucionNumber(plan.frequencyMonths)) || 1;
            const last = plan.cuotas[plan.cuotas.length - 1];
            const date = last && last.date ? ejecucionAddMonths(last.date, freq) : (plan.startDate || '');
            plan.cuotas.push({ name: '', date, amount: '' });
            render();
        }
    } else if (action === 'ejecucion-plan-remove-month') {
        const container = ejecucionContainer(trigger.dataset.scope ?? '');
        const plan = container?.installmentPlans[Number(trigger.dataset.plan)];
        if (plan) {
            plan.cuotas.splice(Number(trigger.dataset.index), 1);
            render();
        }
    } else if (action === 'ejecucion-plan-toggle-months') {
        const key = `${trigger.dataset.scope ?? ''}:${Number(trigger.dataset.index)}`;
        const collapsed = ejecucionPlanMonthsCollapsed[key] !== false;
        ejecucionPlanMonthsCollapsed[key] = !collapsed;
        render();
    } else if (action === 'ejecucion-add-extension') {
        if (ejecucionDraft) {
            // Por defecto la oferta de la prorroga es la de la licitacion (editable).
            const record = (view.executions ?? []).find((item) => item.tenderId === ejecucionTenderId);
            ejecucionDraft.extensions.push({ id: '', endDate: '', offerAmount: record?.economicOffer ?? '', milestonePayments: [], installmentPlans: [] });
            render();
        }
    } else if (action === 'ejecucion-remove-extension') {
        if (ejecucionDraft) {
            ejecucionDraft.extensions.splice(Number(trigger.dataset.index), 1);
            render();
        }
    } else if (action === 'ejecucion-save') {
        saveEjecucion();
    } else if (action === 'ejecucion-gantt') {
        ejecucionView = 'gantt';
        render();
    } else if (action === 'ejecucion-gantt-year') {
        ejecucionGanttYear += Number(trigger.dataset.delta);
        render();
    } else if (action === 'ejecucion-toggle-collected') {
        toggleCollectedMonth(id, trigger.dataset.month);
    } else if (action === 'calendar-prev') {
        calendarCursor = addMonths(calendarCursor, -1);
        render();
    } else if (action === 'calendar-next') {
        calendarCursor = addMonths(calendarCursor, 1);
        render();
    } else if (action === 'calendar-today') {
        calendarCursor = startOfMonth(today());
        render();
    } else if (action === 'sort-tenders') {
        sortTenders(column);
    } else if (action === 'clear-tender-filters') {
        tenderColumnFilters = {};
        tenderPage = 1;
        render();
    } else if (action === 'tender-page') {
        goToTenderPage(Number(trigger.dataset.page));
    } else if (action === 'delete') {
        deleteItem(entity, id);
    } else if (action === 'edit-stats') {
        openStatsForm();
    } else if (action === 'edit-settings') {
        setSection('admin');
    } else if (action === 'reset-settings') {
        resetSettings();
    } else if (action === 'reset-status-colors') {
        resetStatusColors();
    } else if (action === 'remove-avatar') {
        removeAvatar();
    } else if (action === 'remove-login-bg') {
        removeLoginBackground();
    } else if (action === 'export-backup') {
        exportBackup();
    } else if (action === 'import-backup') {
        importBackup();
    } else if (action === 'reset-tenders') {
        resetTendersData(trigger.dataset.mode);
    } else if (action === 'export-tenders') {
        exportTenders(false);
    } else if (action === 'export-all-tenders') {
        exportTenders(true);
    } else if (action === 'password') {
        openPasswordForm(id);
    } else if (action === 'impersonate') {
        impersonateUser(id);
    } else if (action === 'copy-report') {
        copyExecutiveReport();
    } else if (action === 'import-preview') {
        previewImportTenders();
    } else if (action === 'import-commit') {
        commitImportTenders();
    } else if (action === 'import-select-all') {
        selectAllImportPreview();
        render();
    } else if (action === 'import-select-none') {
        selectedImportIndexes = new Set();
        render();
    } else if (action === 'search-submit') {
        submitGlobalSearch(document.querySelector('[data-search]')?.value ?? query);
    } else if (action === 'search-tab') {
        activeSearchTab = trigger.dataset.tab;
        render();
    } else if (action === 'search-open') {
        document.querySelector('[data-search-suggestions]')?.classList.add('hidden');
        openView(entity, id);
    } else if (action === 'import-clear') {
        clearImportPreview();
        render();
    } else if (action === 'check-duplicates') {
        openDuplicatesModal();
    } else if (action === 'dismiss-duplicate-group') {
        dismissDuplicateGroup(trigger.dataset.key);
    } else if (action === 'open-merge') {
        openMergeModal(trigger.dataset.key);
    } else if (action === 'merge-back') {
        renderDuplicatesModalBody();
    } else if (action === 'merge-set-primary') {
        setMergePrimary(id);
    } else if (action === 'merge-pick-field') {
        setMergeField(trigger.dataset.field, id);
    } else if (action === 'merge-pick-execution') {
        mergeDraft.executionSourceId = id;
        renderMergeModalBody();
    } else if (action === 'merge-confirm') {
        confirmMerge();
    } else if (action === 'add-comment') {
        submitComment(trigger.closest('[data-comment-form]'));
    } else if (action === 'delete-comment') {
        deleteComment(id, entity);
    }
});

// Tooltip del GANTT de pagos: se posiciona con `fixed` (relativo al viewport) para que no lo
// recorte el contenedor con overflow del calendario. Asi el desglose se ve sin scroll.
document.addEventListener('mouseover', (event) => {
    const cell = event.target.closest('[data-gantt-cell]');
    if (!cell) {
        return;
    }
    const tip = cell.querySelector('[data-gantt-tip]');
    if (!tip) {
        return;
    }
    // Mostrar antes de medir para conocer su altura real.
    tip.classList.remove('hidden');
    const rect = cell.getBoundingClientRect();
    const tipHeight = tip.offsetHeight;
    // Centrado bajo la celda; si no cabe debajo, se muestra encima.
    const below = rect.bottom + 8;
    const showAbove = below + tipHeight > window.innerHeight && rect.top - tipHeight - 8 > 0;
    tip.style.left = `${rect.left + rect.width / 2}px`;
    tip.style.top = showAbove ? `${rect.top - tipHeight - 8}px` : `${below}px`;
});

document.addEventListener('mouseout', (event) => {
    const cell = event.target.closest('[data-gantt-cell]');
    if (!cell || cell.contains(event.relatedTarget)) {
        return;
    }
    cell.querySelector('[data-gantt-tip]')?.classList.add('hidden');
});

document.addEventListener('submit', (event) => {
    if (event.target.matches('[data-login-form]')) {
        event.preventDefault();
        login(event.target);
        return;
    }

    if (event.target.matches('[data-password-form]')) {
        event.preventDefault();
        savePasswordForm(event.target);
        return;
    }

    if (event.target.matches('[data-status-colors-form]')) {
        event.preventDefault();
        saveStatusColorsForm(event.target);
        return;
    }

    if (!event.target.matches('[data-form]')) {
        return;
    }

    event.preventDefault();
    saveForm(event.target);
});

function login(form) {
    const data = Object.fromEntries(new FormData(form).entries());
    const username = data.username.trim().toLowerCase();
    const user = state.team.find((member) => (
        member.status === 'Activo'
        && [member.username.toLowerCase(), member.email.toLowerCase()].includes(username)
        && member.password === data.password
    ));

    if (!user) {
        form.querySelector('[data-login-error]').classList.remove('hidden');
        return;
    }

    auth = { userId: user.id };
    storageSet('bidsuite-auth', JSON.stringify(auth));
    app.innerHTML = shellMarkup;
    bindElements();
    render();
}

document.addEventListener('change', (event) => {
    if (event.target.matches('[data-favicon-input]')) {
        handleFaviconUpload(event.target);
    }

    if (event.target.matches('[data-login-bg-input]')) {
        handleLoginBackgroundUpload(event.target);
    }

    if (event.target.matches('[data-avatar-input]')) {
        handleAvatarUpload(event.target);
    }

    if (event.target.matches('[data-preparation-other]')) {
        toggleReceptionDate(event.target);
    }

    if (event.target.matches('[data-economic-offer-waived]')) {
        syncEconomicOfferWaivedControl(event.target.closest('form'));
    }

    if (event.target.matches('[data-coauthored]')) {
        syncCoAuthorControl(event.target.closest('form'));
    }

    if (event.target.matches('[data-mobile-nav]')) {
        setSection(event.target.value);
    }

    if (event.target.matches('[data-import-selection-all]')) {
        selectedImportIndexes = event.target.checked
            ? new Set(importPreview.map((_, index) => String(index)))
            : new Set();
        render();
    }

    if (event.target.matches('[data-import-selection]')) {
        const index = event.target.dataset.importSelection;

        if (event.target.checked) {
            selectedImportIndexes.add(index);
        } else {
            selectedImportIndexes.delete(index);
        }

        render();
    }

    // Al confirmar un campo de ejecucion (blur/checkbox/fecha) recalculamos solo el panel
    // derivado; NO re-renderizamos todo para no destruir el input que se esta editando
    // (si no, al teclear el año en un type=date se pierde el foco antes de completarlo).
    if (updateEjecucionDraftField(event.target)) {
        refreshEjecucionDerived();
    }
});

let tenderFilterTimer = null;

document.addEventListener('input', (event) => {
    if (event.target.matches('[data-column-filter]')) {
        const column = event.target.dataset.columnFilter;
        const value = event.target.value.trim();

        if (value) {
            tenderColumnFilters[column] = value;
        } else {
            delete tenderColumnFilters[column];
        }

        tenderPage = 1;
        pendingTenderFilterFocus = { column, position: event.target.selectionStart ?? value.length };

        // Debounce: una sola peticion al servidor cuando el usuario deja de teclear.
        if (tenderFilterTimer) {
            clearTimeout(tenderFilterTimer);
        }
        tenderFilterTimer = setTimeout(() => {
            tenderFilterTimer = null;
            render();
        }, 300);
        return;
    }

    if (event.target.matches('[data-ejecucion-search]')) {
        ejecucionListQuery = event.target.value;
        filterEjecucionList();
        return;
    }

    if (event.target.matches('[data-search]')) {
        // La busqueda global se ejecuta al confirmar (Enter), no en cada tecla.
        query = event.target.value.trim();
    }

    // Mientras se teclea en ejecucion solo actualizamos el borrador (sin re-render,
    // para no perder el foco); el recalculo del plan se hace en el evento change.
    updateEjecucionDraftField(event.target, 'input');
});

document.addEventListener('keydown', (event) => {
    if (!event.target.matches('[data-search]')) {
        return;
    }

    if (event.key === 'Enter') {
        event.preventDefault();
        query = event.target.value.trim();
        submitGlobalSearch(event.target.value);
    }

    if (event.key === 'Escape') {
        document.querySelector('[data-search-suggestions]')?.classList.add('hidden');
    }
});

document.addEventListener('focusin', (event) => {
    if (event.target.matches('[data-search]')) {
        renderSearchSuggestions();
    }
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-search], [data-search-suggestions]')) {
        document.querySelector('[data-search-suggestions]')?.classList.add('hidden');
    }
});

window.addEventListener('hashchange', () => setSection(window.location.hash.slice(1) || 'inicio'));
document.addEventListener('click', (event) => {
    if (event.target.matches('[data-modal]')) {
        closeModal();
    }
});

// Arranque: carga los datos globales (equipo + parametros) desde MySQL, recupera
// la sesion local y pinta la seccion. La BD es la fuente de verdad.
async function boot() {
    try {
        await loadGlobals();
    } catch (error) {
        if (content) {
            content.innerHTML = '<section class="panel"><p class="text-sm font-semibold text-rose-600">No se pudo conectar con el servidor. Recarga la pagina.</p></section>';
        }
        return;
    }

    auth = loadAuth();
    setSection(window.location.hash.slice(1) || 'inicio');
}

boot();
