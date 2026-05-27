const sections = [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'licitaciones', label: 'Licitaciones', icon: 'file' },
    { id: 'calendario', label: 'Calendario', icon: 'calendar' },
    { id: 'estadisticas', label: 'Estadisticas', icon: 'chart' },
    { id: 'gantt', label: 'Gantt', icon: 'chart' },
    { id: 'informe', label: 'Informe', icon: 'file' },
    { id: 'importar', label: 'Importar', icon: 'file' },
    { id: 'equipo', label: 'Equipo', icon: 'team' },
    { id: 'admin', label: 'Admin', icon: 'team' },
];

const defaults = {
    tenders: [
        { id: 'lic-1', title: 'Servicios Cloud Hibrida', client: 'BBVA', code: 'BBVA-2025-18', lot: '1', deadline: '2025-06-06T14:00', status: 'En preparacion', budget: '850000.00', economicOffer: '', owner: 'Laura Gomez', description: 'Migracion y servicios gestionados de cloud hibrida.' },
        { id: 'lic-2', title: 'Infraestructura CPD', client: 'Orange', code: 'Orange-2025-27', lot: 'Unico', deadline: '2025-05-16T12:00', status: 'En evaluacion', budget: '620000.00', economicOffer: '', owner: 'Javier Ruiz', description: 'Diseno de arquitectura y renovacion de CPD.' },
        { id: 'lic-3', title: 'Puesto de Trabajo Seguro', client: 'ADIF', code: 'ADIF-2025-09', lot: '2', deadline: '2025-05-28T13:30', status: 'En analisis', budget: '410000.00', economicOffer: '', owner: 'Marta Sanchez', description: 'Modernizacion de endpoint, identidad y soporte.' },
        { id: 'lic-4', title: 'Plataforma de Datos', client: 'Ayuntamiento de Madrid', code: 'MAD-2025-33', lot: 'Unico', deadline: '2025-06-12T15:00', status: 'En analisis', budget: '720000.00', economicOffer: '', owner: 'Carlos Martin', description: 'Gobierno del dato, ingesta y cuadros de mando.' },
        { id: 'lic-5', title: 'Servicios de Ciberseguridad', client: 'DGT', code: 'DGT-2025-21', lot: '3', deadline: '2025-06-20T14:00', status: 'En preparacion', budget: '980000.00', economicOffer: '', owner: 'Elena Torres', description: 'SOC, respuesta a incidentes y hardening.' },
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
        statusColors: {
            'En analisis': '#f59e0b',
            'En preparacion': '#2563eb',
            'En evaluacion': '#7c3aed',
            Descartada: '#e11d48',
            Desistida: '#64748b',
            Perdida: '#991b1b',
            Ganada: '#16a34a',
        },
    },
};

const schemas = {
    tenders: [
        ['code', 'Expediente'], ['title', 'Objeto'], ['lot', 'Lote'], ['client', 'Organismo'], ['deadline', 'Fecha y hora fin aceptacion ofertas', 'datetime-local'],
        ['status', 'Estado', 'select', ['En analisis', 'En preparacion', 'En evaluacion', 'Descartada', 'Desistida', 'Perdida', 'Ganada']],
        ['budget', 'PBL', 'currency'], ['economicOffer', 'Oferta economica', 'currency'], ['owner', 'Responsable'], ['adjudicationDate', 'Fecha adjudicacion recibida', 'optionalDate'], ['description', 'Descripcion', 'textarea'],
    ],
    events: [
        ['title', 'Titulo'], ['tender', 'Licitacion', 'tenderSelect'], ['type', 'Tipo'], ['preparationOther', 'Preparacion-Otros', 'checkbox'],
        ['receptionDate', 'Fecha de recepcion', 'conditionalDate'], ['date', 'Fecha fin', 'date'], ['status', 'Estado', 'select', ['Pendiente', 'Confirmado', 'Critico', 'Completado']],
    ],
    team: [
        ['name', 'Nombre'], ['username', 'Usuario'], ['role', 'Rol', 'select', ['admin', 'user']], ['email', 'Email', 'email'],
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
let state = loadState();
let auth = loadAuth();
let importPreview = [];
let importRaw = '';
let importWarnings = [];
let calendarCursor = startOfMonth(today());
let tenderSort = { column: 'deadline', direction: 'asc' };
let tenderColumnFilters = {};
let pendingTenderFilterFocus = null;

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

function loadState() {
    const stored = storageGet('bidsuite-state');

    if (!stored) {
        return normalizeState(structuredClone(defaults));
    }

    const parsed = JSON.parse(stored);

    return normalizeState({
        ...structuredClone(defaults),
        ...parsed,
        settings: {
            ...defaults.settings,
            ...(parsed.settings ?? {}),
            statusColors: {
                ...defaults.settings.statusColors,
                ...(parsed.settings?.statusColors ?? {}),
            },
        },
        stats: { ...defaults.stats, ...(parsed.stats ?? {}) },
    });
}

function normalizeState(nextState) {
    const defaultUsersById = Object.fromEntries(defaults.team.map((member) => [member.id, member]));
    const statusMap = {
        'En curso': 'En preparacion',
        Entrega: 'En evaluacion',
        'En revision': 'En evaluacion',
        Pendiente: 'En analisis',
        Perdida: 'Perdida',
    };

    nextState.team = nextState.team.map((member, index) => {
        const fallback = defaultUsersById[member.id] ?? {};
        const normalizedRole = ['admin', 'user'].includes(member.role) ? member.role : (index === 0 ? 'admin' : 'user');

        return {
            ...fallback,
            ...member,
            username: member.username || fallback.username || member.email?.split('@')[0] || `user${index + 1}`,
            role: normalizedRole,
            password: member.password || fallback.password || '1234',
        };
    });
    nextState.tenders = nextState.tenders.map((tender) => ({
        ...tender,
        lot: tender.lot ?? '',
        deadline: tender.deadline?.includes('T') ? tender.deadline : `${tender.deadline}T14:00`,
        status: statusMap[tender.status] ?? tender.status,
        economicOffer: tender.economicOffer ?? '',
        presentedAt: tender.presentedAt || ((statusMap[tender.status] ?? tender.status) === 'En evaluacion' ? (tender.deadline || '') : ''),
    }));

    return nextState;
}

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

function saveState() {
    storageSet('bidsuite-state', JSON.stringify(state));
}

function currentUser() {
    return state.team.find((member) => member.id === auth?.userId) ?? null;
}

function isAdmin() {
    return currentUser()?.role === 'admin';
}

function userNames() {
    if (!isAdmin()) {
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

    if (!deadline || ['Ganada', 'Descartada', 'Desistida', 'Perdida'].includes(tender.status)) {
        return false;
    }

    const start = today();
    const end = new Date(start);
    end.setDate(start.getDate() + 7);

    return deadline >= start && deadline <= end;
}

function tenderCountForUser(user) {
    return ganttLoadForUserOn(user, today());
}

function workloadForUser(user) {
    return tenderCountForUser(user) * 33;
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
    return (Number(tender.economicOffer) || 0) > 0;
}

function evaluatedTendersWithEconomicOffer(tenders) {
    return tenders.filter((tender) => tender.status === 'En evaluacion' && hasEconomicOffer(tender));
}

function economicOfferTotal(tenders) {
    return tenders.reduce((total, tender) => total + (Number(tender.economicOffer) || 0), 0);
}

function averageEconomicOffer(tenders) {
    const withOffer = evaluatedTendersWithEconomicOffer(tenders);

    return withOffer.length ? Math.round(economicOfferTotal(withOffer) / withOffer.length) : 0;
}

function missingEconomicOfferTenders() {
    return visibleItems('tenders')
        .filter((tender) => tender.status === 'En evaluacion' && !hasEconomicOffer(tender))
        .sort((first, second) => first.deadline.localeCompare(second.deadline));
}

function overloadedUsers() {
    return state.team.filter((member) => workloadForUser(member) > 100);
}

function visibleItems(entity) {
    if (isAdmin()) {
        return entity === 'events' ? visibleEvents() : state[entity];
    }

    const user = currentUser();

    if (!user) {
        return [];
    }

    if (entity === 'tenders') {
        return state.tenders.filter((item) => item.owner === user.name);
    }

    if (entity === 'events') {
        return visibleEvents().filter((item) => item.owner === user.name);
    }

    if (entity === 'team') {
        return [user];
    }

    return state[entity];
}

function visibleEvents() {
    return state.events.filter((event) => {
        if (!event.autoGenerated) {
            return true;
        }

        return tenderByTitle(event.tender)?.status === 'En preparacion';
    });
}

function canCreate(entity) {
    return isAdmin() || ['tenders', 'events'].includes(entity);
}

function canEdit(entity, item = null) {
    if (isAdmin()) {
        return true;
    }

    const user = currentUser();

    if (!user || ['team', 'settings', 'stats'].includes(entity)) {
        return false;
    }

    if (!item) {
        return canCreate(entity);
    }

    return item.owner === user.name || item.person === user.name;
}

function canDelete() {
    return isAdmin();
}

function renderLogin() {
    app.innerHTML = `
        <main class="grid min-h-screen place-items-center bg-[#f6f8fc] px-4">
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
    if (['Critico', 'Descartada', 'Perdida'].includes(status)) {
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

    return items.filter((item) => Object.values(item).join(' ').toLowerCase().includes(query));
}

function setSection(section) {
    currentSection = sections.some((item) => item.id === section) ? section : 'inicio';
    window.location.hash = currentSection;
    render();
}

function renderChrome() {
    const availableSections = sections.filter((item) => isAdmin() || !['admin', 'equipo', 'importar'].includes(item.id));
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
    document.querySelector('[data-profile-avatar]').textContent = initials(user?.name ?? '');
    document.querySelector('[data-notification-count]').textContent = notificationCount();
}

function render() {
    if (!auth || !currentUser()) {
        renderLogin();
        return;
    }

    applySettings();
    renderChrome();
    if (!isAdmin() && ['admin', 'equipo', 'importar'].includes(currentSection)) {
        currentSection = 'inicio';
    }

    const title = sections.find((item) => item.id === currentSection)?.label ?? 'Inicio';
    const renderers = {
        inicio: renderDashboard,
        licitaciones: () => renderCollection('tenders'),
        calendario: renderCalendar,
        estadisticas: renderStats,
        gantt: renderGantt,
        informe: renderExecutiveReport,
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

    if (!canCreate(entity)) {
        return '';
    }

    return `<button class="btn-primary" type="button" data-action="new" data-entity="${entity}">${label}</button>`;
}

function renderDashboard() {
    const tenders = visibleItems('tenders');
    const active = tenders.filter((item) => !['Ganada', 'Descartada', 'Desistida', 'Perdida'].includes(item.status)).length;
    const due = tenders.filter(isUpcomingTenderDue).length;
    const successRate = successRateFor(tenders);
    const workload = averageWorkloadFor(workloadAverageUsers());
    const missingOffers = missingEconomicOfferTenders();

    return `
        <section class="dashboard-metrics-frame">
            <div class="dashboard-metrics-row">
                ${metricCard('Licitaciones activas', active, '+ 12% vs. mes anterior', 'folder', 'blue')}
                ${metricCard('Entregas proximas', due, '+ 3 esta semana', 'calendar', 'teal')}
                ${metricCard('Tasa de exito', `${successRate}%`, '20% referencia', 'chart', 'green')}
                ${metricCard('Carga del equipo', `${workload}%`, 'Media del equipo', 'team', 'violet')}
            </div>
        </section>
        ${renderEconomicOfferAlert(missingOffers)}
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

function successRateFor(tenders) {
    const won = tenders.filter((item) => item.status === 'Ganada').length;
    const lost = tenders.filter((item) => item.status === 'Perdida').length;
    const closed = won + lost;

    return closed ? Math.round((won / closed) * 100) : 0;
}

function renderEconomicOfferAlert(tenders) {
    if (!tenders.length) {
        return '';
    }

    return `
        <section class="panel mt-6 border-amber-200 bg-amber-50">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h2 class="text-lg font-bold text-amber-900">Ofertas economicas pendientes</h2>
                    <p class="mt-1 text-sm font-semibold text-amber-800">${tenders.length} licitaciones en evaluacion sin oferta economica.</p>
                </div>
                <span class="status-pill status-amber">${isAdmin() ? 'Equipo completo' : 'Mis licitaciones'}</span>
            </div>
            <div class="mt-4 grid gap-3">
                ${tenders.map((tender) => `
                    <div class="rounded-lg border border-amber-200 bg-white p-3">
                        <div class="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p class="font-bold text-[#21345d]">${escapeHtml(tender.title)}</p>
                                <p class="mt-1 text-sm font-semibold text-[#7082a4]">${escapeHtml(tender.owner)} · ${escapeHtml(tender.code)} · ${formatCurrency(tender.budget)}</p>
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
    const users = isAdmin() ? state.team : [currentUser()];

    return `
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-lg font-bold">Carga actual</h2>
            <p class="text-sm font-bold text-[#53658b]">4 dias laborales previos a presentacion</p>
        </div>
        <div class="mt-5 space-y-4">
            ${users.map((user) => {
                const workload = workloadForUser(user);
                const count = tenderCountForUser(user);

                return `
                    <div>
                        <div class="flex items-center justify-between gap-3 text-sm font-semibold">
                            <span>${escapeHtml(user.name)}</span>
                            <span class="${workload > 100 ? 'text-rose-700' : 'text-[#53658b]'}">${workload}% · ${count} licitaciones</span>
                        </div>
                        <div class="mt-2 h-2 rounded-full bg-[#eceff7]">
                            <div class="h-full rounded-full ${workloadTone(user)}" style="width:${Math.min(workload, 100)}%"></div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function metricCard(label, value, trend, icon, tone) {
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
            <p class="mt-4 text-sm font-semibold text-emerald-600">${trend}</p>
        </article>
    `;
}

function renderCollection(entity) {
    const items = entity === 'tenders' ? tenderTableItems(filtered(visibleItems(entity))) : filtered(visibleItems(entity));

    return `<section class="panel">${tableFor(entity, items)}</section>`;
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
    if (['budget', 'economicOffer'].includes(column)) {
        return formatCurrency(item[column]).toLowerCase();
    }

    if (column === 'deadline') {
        return formatDate(item[column]).toLowerCase();
    }

    return String(item[column] ?? '').toLowerCase();
}

function tenderSortValue(item, column) {
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
        tenders: ['code', 'title', 'lot', 'client', 'deadline', 'budget', 'economicOffer', 'status', 'owner'],
        team: ['name', 'username', 'role', 'email', 'workload', 'status', 'passwordResetAt'],
    }[entity];

    const labels = {
        title: 'Objeto', client: 'Organismo', code: 'Expediente', lot: 'Lote', deadline: 'Fin aceptacion ofertas', budget: 'PBL', economicOffer: 'Oferta economica', status: 'Estado', owner: 'Responsable',
        name: 'Nombre', type: 'Tipo', updated: 'Actualizado',
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
        return `<td>${formatCurrency(value)}</td>`;
    }

    if (column === 'workload') {
        const workload = workloadForUser(item);

        return `<td><div class="flex items-center gap-3"><div class="h-2 w-24 rounded-full bg-[#eceff7]"><div class="h-full rounded-full ${workloadTone(item)}" style="width:${Math.min(workload, 100)}%"></div></div><span class="${workload > 100 ? 'text-rose-700' : ''}">${workload}%</span></div></td>`;
    }

    if (column === 'passwordResetAt') {
        return `<td>${value ? `<span class="status-pill status-amber">Reset ${formatDate(value.slice(0, 10))}</span>` : '<span class="status-pill status-slate">Sin cambios</span>'}</td>`;
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
                    return '<div class="min-h-20 border-b border-r border-[#e7edf6] bg-[#f8fafd]"></div>';
                }

                const date = dateKey(day);
                const dayEvents = events.filter((item) => {
                    const eventDate = parseDate(item.date);

                    return eventDate && dateKey(eventDate) === date;
                });
                const mainEvent = dayEvents[0];

                return `
                    <button class="relative min-h-20 border-b border-r border-[#e7edf6] p-2 text-left hover:bg-blue-50" type="button" data-action="${mainEvent ? 'view' : 'new-date'}" data-entity="events" data-id="${mainEvent?.id ?? ''}" data-date="${date}">
                        <span class="font-semibold">${day.getDate()}</span>
                        <span class="mt-2 grid gap-1">
                            ${dayEvents.slice(0, 2).map((event) => `<span class="event-pill event-blue">${escapeHtml(event.title)}</span>`).join('')}
                            ${dayEvents.length > 2 ? `<span class="text-[11px] font-bold text-[#53658b]">+${dayEvents.length - 2} mas</span>` : ''}
                        </span>
                    </button>
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
        .sort((a, b) => a.date.localeCompare(b.date));
}

function notificationCount() {
    return upcomingPresentations().length + missingEconomicOfferTenders().length;
}

function renderNotifications() {
    const presentations = upcomingPresentations();
    const missingOffers = missingEconomicOfferTenders();

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
                                    <p class="mt-1 text-sm text-amber-700">${escapeHtml(tender.owner)} · ${escapeHtml(tender.code)} · ${formatCurrency(tender.budget)}</p>
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
    return `
        <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold">Hitos</h2>
            ${canCreate('events') ? '<button class="btn-secondary" type="button" data-action="new" data-entity="events">Nuevo hito</button>' : ''}
        </div>
        <div class="mt-5 space-y-3">
            ${filtered(visibleItems('events')).map((event) => `
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

function renderStats() {
    return `<section class="panel">${renderStatsBody()}</section>`;
}

function renderGantt() {
    const start = today();
    const days = Array.from({ length: 28 }, (_, index) => addDays(start, index));
    const users = state.team.filter((member) => member.role === 'user' && member.status === 'Activo');
    const userNamesSet = new Set(users.map((user) => user.name));
    const tenders = visibleItems('tenders')
        .filter((tender) => userNamesSet.has(tender.owner))
        .filter((tender) => tender.status === 'En preparacion')
        .filter((tender) => parseDate(tender.deadline) >= start)
        .sort((first, second) => first.deadline.localeCompare(second.deadline));

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
                <div class="gantt-summary-title">Carga diaria por persona - h/tarea concurrentes</div>
                ${users.map((user) => ganttUserLoadRow(user, days)).join('')}
            </div>
        </section>
    `;
}

function ganttTenderRow(tender, days) {
    const deadline = parseDate(tender.deadline);
    const workStart = ganttTenderWorkStart(tender);
    const loadColor = workloadForUser(state.team.find((user) => user.name === tender.owner)) > 100 ? 'gantt-bar-danger' : 'gantt-bar';

    return `
        <div class="gantt-grid">
            <div class="gantt-sticky gantt-cell font-bold">${escapeHtml(tender.code)} ${escapeHtml(tender.title)}</div>
            <div class="gantt-sticky-2 gantt-cell">${escapeHtml(tender.owner)}</div>
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

                return `<div class="gantt-load-cell ${tone}">${count || ''}</div>`;
            }).join('')}
        </div>
    `;
}

function ganttLoadForUserOn(user, day) {
    return visibleItems('tenders').filter((tender) => tender.owner === user.name && ganttTenderActiveOn(tender, day)).length;
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
                            ${report.presentations.map((tender) => reportItem(`${tender.title}`, `${tender.owner} · ${tender.code} · ${formatDate(tenderPresentationDate(tender))} · Oferta ${formatCurrency(tender.economicOffer)}`)).join('') || emptyReportItem('Sin presentaciones registradas hoy.')}
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
    const currentDate = todayIso();
    const month = currentMonthKey();

    return {
        date: currentDate,
        presentations: visibleItems('tenders')
            .filter((tender) => tender.status === 'En evaluacion' && tenderPresentationDate(tender)?.startsWith(currentDate))
            .sort((a, b) => a.title.localeCompare(b.title)),
        awards: visibleItems('tenders')
            .filter((tender) => ['Ganada', 'Perdida'].includes(tender.status) && tender.adjudicationDate === currentDate)
            .sort((a, b) => a.title.localeCompare(b.title)),
        completedPreparationOthers: visibleItems('events')
            .filter((event) => event.preparationOther && event.status === 'Completado' && event.completedAt?.startsWith(currentDate))
            .sort((a, b) => a.tender.localeCompare(b.tender)),
        month: executiveReportMonthData(month),
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
        ? report.presentations.map((tender) => `- ${tender.title}: presentada por ${tender.owner}. Fecha registrada: ${formatDate(tenderPresentationDate(tender))}. Oferta economica: ${formatCurrency(tender.economicOffer)}.`).join('\n')
        : '- No se han registrado presentaciones hoy.';
    const awardLines = report.awards.length
        ? report.awards.map((tender) => `- ${tender.title} (${tender.client}): ${tender.status}. Importe: ${formatCurrency(tender.budget)}. Responsable: ${tender.owner}.`).join('\n')
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

function renderImportTenders() {
    if (!isAdmin()) {
        return '<section class="panel"><p class="text-sm font-semibold text-[#7082a4]">No tienes permisos para importar licitaciones.</p></section>';
    }

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
                        <p class="mt-1 text-sm font-semibold text-[#7082a4]">${importPreview.length} licitaciones preparadas${importWarnings.length ? ` · ${importWarnings.length} avisos` : ''}</p>
                    </div>
                    ${importPreview.length ? '<button class="btn-primary" type="button" data-action="import-commit">Importar / actualizar licitaciones</button>' : ''}
                </div>
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
    return `
        <table class="data-table">
            <thead><tr>
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
                ${importPreview.map((item) => `
                    <tr>
                        <td>${escapeHtml(item.code)}</td>
                        <td>${escapeHtml(item.title)}</td>
                        <td>${escapeHtml(item.lot)}</td>
                        <td>${escapeHtml(item.client)}</td>
                        <td>${formatDate(item.deadline)}</td>
                        <td>${formatCurrency(item.budget)}</td>
                        <td>${formatCurrency(item.economicOffer)}</td>
                        <td>${escapeHtml(item.owner)}${item.newUser ? '<p class="text-xs font-bold text-amber-600">Se creara usuario</p>' : ''}</td>
                        <td>${statusPill(item.status)}${item.importAction === 'updateEconomicOffer' ? '<p class="text-xs font-bold text-blue-600">Actualiza oferta</p>' : ''}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function previewImportTenders() {
    const input = document.querySelector('[data-import-input]');

    importRaw = input?.value ?? '';

    if (!importRaw.trim()) {
        importPreview = [];
        importWarnings = [];
        render();
        return;
    }

    try {
        importPreview = parseImportedTenders(importRaw);
        render();
    } catch (error) {
        alert(error.message);
    }
}

function commitImportTenders() {
    if (!importPreview.length) {
        return;
    }

    const importedAt = Date.now();
    importPreview.forEach((tender, index) => {
        const { importAction, importUpdateId, newUser, ...tenderData } = tender;

        if (importAction === 'updateEconomicOffer' && importUpdateId) {
            state.tenders = state.tenders.map((item) => item.id === importUpdateId ? { ...item, economicOffer: tender.economicOffer } : item);
            return;
        }

        ensureImportedUser(tender.owner);
        const id = `lic-import-${importedAt}-${index}`;
        const record = { id, ...tenderData };
        state.tenders.unshift(record);
        syncTenderPresentationEvent(record);
    });

    importPreview = [];
    importRaw = '';
    importWarnings = [];
    saveState();
    setSection('licitaciones');
}

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

    const parsedRows = rows.slice(1).map((row) => tenderFromImportRow(headers, row)).filter(Boolean);

    return filterImportedTenders(parsedRows);
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
        const matchesWithDifferentStatus = (statuslessMatches.get(statuslessKey) ?? [])
            .filter((match) => match.status !== tender.status);

        const existingTender = existingByExactKey.get(exactKey);

        if (existingTender) {
            if (canImportedEconomicOfferUpdate(existingTender, tender)) {
                accepted.push({
                    ...tender,
                    importAction: 'updateEconomicOffer',
                    importUpdateId: existingTender.id,
                    newUser: false,
                });
                importWarnings.push(`Actualizacion: ${tender.code || tender.title} mantiene los datos en evaluacion y actualiza la oferta economica.`);
            }

            return;
        }

        if (matchesWithDifferentStatus.length) {
            const previousStatuses = [...new Set(matchesWithDifferentStatus.map((match) => match.status))].join(', ');
            importWarnings.push(`Aviso: ${tender.code || tender.title} coincide con una fila existente salvo el estado (${previousStatuses} -> ${tender.status}).`);
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

function canImportedEconomicOfferUpdate(existingTender, importedTender) {
    return existingTender.status === 'En evaluacion'
        && importedTender.status === 'En evaluacion'
        && normalizeImportValue(existingTender.economicOffer) !== normalizeImportValue(importedTender.economicOffer)
        && importedTender.economicOffer !== '';
}

function addStatuslessMatch(matches, tender) {
    const key = importStatuslessKey(tender);
    const current = matches.get(key) ?? [];

    current.push({ status: tender.status });
    matches.set(key, current);
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
        tender.owner,
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
    const missingOffers = missingEconomicOfferTenders();

    return `
        ${renderEconomicOfferAlert(missingOffers)}
        ${alerts.length ? `
            <section class="panel mb-6 border-rose-200 bg-rose-50">
                <h2 class="text-lg font-bold text-rose-800">Alertas de carga</h2>
                <div class="mt-3 grid gap-2 text-sm font-semibold text-rose-700">
                    ${alerts.map((member) => `<p>${escapeHtml(member.name)} esta al ${workloadForUser(member)}% con ${tenderCountForUser(member)} licitaciones activas en la ventana Gantt de hoy.</p>`).join('')}
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
                                <p class="text-sm text-[#7082a4]">${escapeHtml(member.username)} · ${escapeHtml(member.email)} · ${escapeHtml(member.role)} · carga ${workloadForUser(member)}%</p>
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
    `;
}

function renderStatsBody() {
    const tenders = visibleItems('tenders');
    const total = tenders.length;
    const active = tenders.filter((item) => item.status === 'En preparacion').length;
    const review = tenders.filter((item) => item.status === 'En evaluacion').length;
    const pending = tenders.filter((item) => item.status === 'En analisis').length;
    const lost = tenders.filter((item) => item.status === 'Perdida').length;

    return `
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-lg font-bold">Estadisticas generales</h2>
            ${isAdmin() ? '<button class="btn-secondary" type="button" data-action="edit-stats">Editar objetivos</button>' : ''}
        </div>
        <div class="mt-6 grid gap-5 lg:grid-cols-3">
            <div>
                <h3 class="text-sm font-bold">Volumen de licitaciones</h3>
                <div class="mt-8 flex h-36 items-end gap-5">${[45, 42, 62, 70, 95].map((height) => `<span class="w-6 rounded-t-md bg-blue-600" style="height:${height}%"></span>`).join('')}</div>
            </div>
            <div>
                <h3 class="text-sm font-bold">Ganadas vs. perdidas</h3>
                <div class="mt-8 grid size-32 place-items-center rounded-full bg-[conic-gradient(#25b46b_0_${state.stats.targetWinRate}%,#f25468_${state.stats.targetWinRate}%_100%)] p-4">
                    <div class="grid size-full place-items-center rounded-full bg-white text-xl font-bold">${state.stats.targetWinRate}%</div>
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

function statRow(label, value, total, color, customColor = '') {
    const width = total ? Math.min(100, Math.round((Number(value) / Number(total)) * 100)) : 0;
    const style = customColor ? `background:${escapeHtml(customColor)};width:${width}%` : `width:${width}%`;

    return `<div><div class="flex justify-between"><span>${label}</span><span>${value}</span></div><div class="mt-1 h-2 rounded-full bg-[#eceff7]"><div class="h-full rounded-full ${color}" style="${style}"></div></div></div>`;
}

function renderUserStatsBody() {
    const users = workloadAverageUsers();

    return `
        <div class="mt-8 border-t border-[#e7edf6] pt-6">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <h3 class="text-lg font-bold">Estadisticas por usuario</h3>
                <p class="text-sm font-bold text-[#53658b]">Solo usuarios con rol user</p>
            </div>
            <div class="mt-5 grid gap-4 xl:grid-cols-2">
                ${users.map((user) => userStatsCard(user)).join('') || '<p class="rounded-lg bg-slate-50 p-4 text-sm font-semibold text-[#53658b]">No hay usuarios con rol user para mostrar.</p>'}
            </div>
        </div>
    `;
}

function userStatsCard(user) {
    const tenders = visibleItems('tenders').filter((tender) => tender.owner === user.name);
    const countedTenders = tenders.filter((tender) => !['Descartada', 'Desistida'].includes(tender.status));
    const analysis = tenders.filter((tender) => tender.status === 'En analisis');
    const prepared = tenders.filter((tender) => tender.status === 'En preparacion');
    const evaluated = tenders.filter((tender) => tender.status === 'En evaluacion');
    const won = tenders.filter((tender) => tender.status === 'Ganada').length;
    const lost = tenders.filter((tender) => tender.status === 'Perdida').length;
    const discarded = tenders.filter((tender) => ['Descartada', 'Desistida'].includes(tender.status)).length;
    const totalBudget = evaluated.reduce((total, tender) => total + (Number(tender.budget) || 0), 0);
    const preparedBudget = prepared.reduce((total, tender) => total + (Number(tender.budget) || 0), 0);
    const offerTotal = economicOfferTotal(evaluatedTendersWithEconomicOffer(tenders));
    const missingOfferCount = evaluated.filter((tender) => !hasEconomicOffer(tender)).length;
    const workload = workloadForUser(user);
    const closed = won + lost;
    const successRate = closed ? Math.round((won / closed) * 100) : 0;

    return `
        <article class="rounded-lg border border-[#dfe6f2] bg-white p-5">
            <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p class="text-base font-bold">${escapeHtml(user.name)}</p>
                    <p class="mt-1 text-sm font-semibold text-[#7082a4]">${escapeHtml(user.username)} · carga ${workload}%</p>
                </div>
                <span class="status-pill ${workload > 100 ? 'status-rose' : 'status-blue'}">${workload}%</span>
            </div>
            <div class="mt-4 h-2 rounded-full bg-[#eceff7]">
                <div class="h-full rounded-full ${workloadTone(user)}" style="width:${Math.min(workload, 100)}%"></div>
            </div>
            <div class="mt-5 grid gap-3 sm:grid-cols-5">
                ${miniStat('Licitaciones', countedTenders.length)}
                ${miniStat('En analisis', analysis.length)}
                ${miniStat('En preparacion', prepared.length)}
                ${miniStat('En evaluacion', evaluated.length)}
                ${miniStat('Exito', `${successRate}%`)}
            </div>
            <div class="mt-5 grid gap-3 sm:grid-cols-2">
                ${miniStat('PBL acumulado', formatCurrency(totalBudget))}
                ${miniStat('PBL preparacion', formatCurrency(preparedBudget))}
                ${miniStat('Oferta economica', formatCurrency(offerTotal))}
                ${miniStat('Ofertas pendientes', missingOfferCount)}
            </div>
            <div class="mt-5 space-y-2 text-sm font-semibold text-[#53658b]">
                ${statRow('Ganadas', won, Math.max(won + lost, 1), 'bg-emerald-500')}
                ${statRow('Perdidas', lost, Math.max(won + lost, 1), 'bg-rose-500')}
                ${statRow('Descartadas / desistidas (no computan)', discarded, Math.max(tenders.length, 1), 'bg-slate-400')}
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
        .sort((a, b) => a.date.localeCompare(b.date))
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

function openView(entity, id) {
    const item = state[entity].find((record) => record.id === id);

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
    `;
    showModal();
}

function viewEntriesFor(entity, item) {
    if (entity === 'team') {
        const tenders = visibleItems('tenders').filter((tender) => tender.owner === item.name);
        const evaluated = tenders.filter((tender) => tender.status === 'En evaluacion');
        const entries = [
            ['name', item.name],
            ['username', item.username],
            ['role', item.role],
            ['email', item.email],
            ['workload', `${workloadForUser(item)}%`],
            ['activeTenders', tenderCountForUser(item)],
            ['economicOfferTotal', economicOfferTotal(evaluatedTendersWithEconomicOffer(tenders))],
            ['missingEconomicOffers', evaluated.filter((tender) => !hasEconomicOffer(tender)).length],
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
            ['owner', item.owner],
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
        economicOfferTotal: 'Oferta economica acumulada',
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
    const item = id ? state[entity].find((record) => record.id === id) : { ...preset };
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
    showModal();
}

function schemaFor(entity) {
    return schemas[entity].map((field) => {
        const [name, label, type = 'text', options = []] = field;

        if (type === 'tenderSelect') {
            return [name, label, 'select', activeTenderOptions()];
        }

        if (['owner', 'person'].includes(name)) {
            return [name, label, 'select', userNames()];
        }

        return [name, label, type, options];
    });
}

function isFieldRequired(entity, name, isNew = true) {
    if (entity === 'tenders' && !isNew) {
        return false;
    }

    return !['adjudicationDate', 'description', 'economicOffer'].includes(name);
}

function requiredAttribute(isRequired) {
    return isRequired ? ' required' : '';
}

function fieldMarkup(name, label, type, options, value, isRequired = true) {
    if (type === 'select') {
        const fieldOptions = [
            ...(!isRequired && !value ? [''] : []),
            ...(value && !options.includes(value) ? [value] : []),
            ...options,
        ];

        return `<label class="field-label">${label}<select class="field-control" name="${name}"${requiredAttribute(isRequired)}>${fieldOptions.map((option) => `<option value="${escapeHtml(option)}" ${option === value ? 'selected' : ''}>${escapeHtml(option)}</option>`).join('')}</select></label>`;
    }

    if (type === 'checkbox') {
        return `<label class="flex items-center gap-3 rounded-lg border border-[#dfe6f2] p-4 text-sm font-bold text-[#21345d]"><input type="checkbox" name="${name}" data-preparation-other ${value ? 'checked' : ''}> ${label}</label>`;
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
        return `<label class="field-label">${label}<input class="field-control" type="number" name="${name}" value="${escapeHtml(value)}" min="0" step="0.01" inputmode="decimal"${requiredAttribute(isRequired)}></label>`;
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

function saveForm(form) {
    const entity = form.dataset.entity;
    const id = form.dataset.id;
    const data = Object.fromEntries(new FormData(form).entries());
    const existingItem = id ? state[entity].find((item) => item.id === id) : null;
    const recordId = id || `${entity}-${Date.now()}`;

    if ((id && !canEdit(entity, existingItem)) || (!id && !canCreate(entity))) {
        alert('No tienes permisos para guardar este registro.');
        return;
    }

    prepareFormData(entity, data, existingItem);

    if (!validateFormData(entity, data, id)) {
        return;
    }

    if (entity === 'stats') {
        state.stats = data;
    } else if (entity === 'settings') {
        state.settings = { ...state.settings, ...data };
    } else if (id) {
        state[entity] = state[entity].map((item) => item.id === id ? { ...item, ...data } : item);
    } else {
        state[entity].unshift({ id: recordId, ...data });
    }

    if (entity === 'tenders') {
        syncTenderPresentationEvent({ id: recordId, ...data }, existingItem);
    }

    saveState();
    closeModal();
    render();
}

function prepareFormData(entity, data, existingItem = null) {
    if (entity === 'tenders') {
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

    if (entity === 'events' && !tenderByTitle(data.tender)) {
        alert('Selecciona una licitacion existente para asociar el hito.');
        return false;
    }

    if (entity === 'tenders' && data.owner && !allUserNames.includes(data.owner)) {
        alert('Selecciona un responsable que exista en usuarios.');
        return false;
    }

    if (entity === 'events' && !allUserNames.includes(data.owner)) {
        alert('Selecciona un responsable que exista en usuarios.');
        return false;
    }

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

    return true;
}

function savePasswordForm(form) {
    const data = Object.fromEntries(new FormData(form).entries());

    if (data.password !== data.password_confirmation) {
        alert('Las contrasenas no coinciden.');
        return;
    }

    if (data.password.length < 4) {
        alert('La password debe tener al menos 4 caracteres.');
        return;
    }

    state.team = state.team.map((member) => member.id === form.dataset.id ? {
        ...member,
        password: data.password,
        passwordResetAt: new Date().toISOString(),
        mustChangePassword: Boolean(data.forceChange),
        passwordPreview: `Actualizada (${data.password.length} caracteres)`,
    } : member);

    saveState();
    closeModal();
    render();
}

function resetSettings() {
    state.settings = structuredClone(defaults.settings);
    saveState();
    render();
}

function resetStatusColors() {
    state.settings.statusColors = structuredClone(defaults.settings.statusColors);
    saveState();
    render();
}

function saveStatusColorsForm(form) {
    const colors = Object.fromEntries(new FormData(form).entries());

    state.settings.statusColors = {
        ...state.settings.statusColors,
        ...Object.fromEntries(Object.entries(colors).filter(([, color]) => /^#[0-9a-f]{6}$/i.test(color))),
    };

    saveState();
    render();
}

function handleFaviconUpload(input) {
    const file = input.files?.[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
        state.settings.favicon = reader.result;
        saveState();
        render();
    });
    reader.readAsDataURL(file);
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

function deleteItem(entity, id) {
    if (!canDelete()) {
        alert('No tienes permisos para borrar registros.');
        return;
    }

    if (!confirm('Seguro que quieres borrar este registro?')) {
        return;
    }

    state[entity] = state[entity].filter((item) => item.id !== id);
    saveState();
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
        if (currentSection === 'admin') {
            setSection('admin');
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
        openView('team', currentUser()?.id);
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
        render();
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
    } else if (action === 'import-clear') {
        importPreview = [];
        importRaw = '';
        importWarnings = [];
        render();
    }
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

    if (event.target.matches('[data-preparation-other]')) {
        toggleReceptionDate(event.target);
    }

    if (event.target.matches('[data-mobile-nav]')) {
        setSection(event.target.value);
    }
});

document.addEventListener('input', (event) => {
    if (event.target.matches('[data-column-filter]')) {
        const column = event.target.dataset.columnFilter;
        const value = event.target.value.trim().toLowerCase();

        if (value) {
            tenderColumnFilters[column] = value;
        } else {
            delete tenderColumnFilters[column];
        }

        pendingTenderFilterFocus = { column, position: event.target.selectionStart ?? value.length };
        render();
        return;
    }

    if (event.target.matches('[data-search]')) {
        query = event.target.value.trim().toLowerCase();
        render();
    }
});

window.addEventListener('hashchange', () => setSection(window.location.hash.slice(1) || 'inicio'));
document.addEventListener('click', (event) => {
    if (event.target.matches('[data-modal]')) {
        closeModal();
    }
});

setSection(window.location.hash.slice(1) || 'inicio');
