const dashboardState = {};
let currentUser = null;
let currentPassword = '';

document.addEventListener('DOMContentLoaded', () => {
    setupGlobalAccess();
});

function setupGlobalAccess() {
    const loginForm = document.getElementById('globalLoginForm');
    const logoutButton = document.getElementById('globalLogout');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            await handleLogin(loginForm);
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', lockApp);
    }
}

async function handleLogin(loginForm) {
    const formData = new FormData(loginForm);
    const username = String(formData.get('user') || '').trim();
    const password = String(formData.get('password') || '');
    const validUser = window.analyticsUsers.find((user) => {
        return normalizeText(user.user) === normalizeText(username);
    });

    if (!validUser || !(await verifyPassword(password, validUser.passwordVerifier))) {
        showLoginMessage('Usuario o contraseña incorrectos.');
        return;
    }

    loginForm.reset();
    showLoginMessage('');
    unlockApp(validUser, password);
}

function unlockApp(user, password) {
    const login = document.getElementById('globalLogin');
    const shell = document.getElementById('appShell');
    const sessionLabel = document.getElementById('globalSessionLabel');

    currentUser = user;
    currentPassword = password;

    if (login) {
        login.classList.add('is-hidden');
    }

    if (shell) {
        shell.classList.remove('is-locked');
    }

    if (sessionLabel) {
        sessionLabel.textContent = `Sesión activa: ${user.name}`;
    }

    renderMainNavigation();
    applyHomePermissions();
    renderHomeLinks();
    setupAnalyticsArea();
    openFirstPermittedModule();
}

function lockApp() {
    const login = document.getElementById('globalLogin');
    const shell = document.getElementById('appShell');

    currentUser = null;
    currentPassword = '';

    clearDashboardPanel('informeColegios');
    clearDashboardPanel('encuestaJuvenil');

    if (login) {
        login.classList.remove('is-hidden');
    }

    if (shell) {
        shell.classList.add('is-locked');
    }
}

function renderMainNavigation() {
    const nav = document.getElementById('mainNav');
    const allowedModules = getPermittedModules();

    if (!nav) {
        return;
    }

    nav.innerHTML = '';

    allowedModules.forEach((module) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.page = module.id;
        button.textContent = module.label;
        button.addEventListener('click', () => {
            showPage(module.id);
        });

        nav.appendChild(button);
    });
}

function showPage(pageId) {
    const allowedModules = getPermittedModules();
    const isAllowed = allowedModules.some((module) => module.id === pageId);
    const pages = document.querySelectorAll('.page');
    const targetPage = document.getElementById(pageId);
    const navButtons = document.querySelectorAll('#mainNav [data-page]');

    if (!isAllowed || !targetPage) {
        return;
    }

    pages.forEach((page) => {
        page.classList.remove('active');
    });

    navButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.page === pageId);
    });

    targetPage.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openFirstPermittedModule() {
    const [firstModule] = getPermittedModules();

    if (firstModule) {
        showPage(firstModule.id);
    }
}

function getPermittedModules() {
    const allowedIds = currentUser?.permissions?.modules || [];

    if (allowedIds.includes('*')) {
        return window.siteModules;
    }

    return window.siteModules.filter((module) => allowedIds.includes(module.id));
}

function applyHomePermissions() {
    const homeItems = document.querySelectorAll('[data-home-section]');

    homeItems.forEach((item) => {
        item.classList.toggle('is-hidden', !hasPermission('homeSections', item.dataset.homeSection));
    });
}

function renderHomeLinks() {
    const containers = document.querySelectorAll('[data-home-links]');

    containers.forEach((container) => {
        const sectionId = container.dataset.homeLinks;
        const links = window.homeLinks?.[sectionId] || [];

        container.innerHTML = '';

        if (links.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.className = 'link-list-empty';
            emptyMessage.textContent = 'Sin enlaces configurados';
            container.appendChild(emptyMessage);
            return;
        }

        links.forEach((link) => {
            const anchor = document.createElement('a');
            anchor.className = 'resource-link';
            anchor.href = link.url || '#';
            anchor.textContent = link.label;

            if (link.url && link.url !== '#') {
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
            }

            container.appendChild(anchor);
        });
    });
}

function setupAnalyticsArea() {
    if (!hasPermission('modules', 'datos')) {
        setupAnalyticsSection('informeColegios', 'analyticsInformeSection', false);
        setupAnalyticsSection('encuestaJuvenil', 'analyticsEncuestaSection', false);
        return;
    }

    setupAnalyticsSection('informeColegios', 'analyticsInformeSection');
    setupAnalyticsSection('encuestaJuvenil', 'analyticsEncuestaSection');
}

function setupAnalyticsSection(sectionKey, containerId, forceAllowed = null) {
    const container = document.getElementById(containerId);
    const isAllowed = forceAllowed ?? hasPermission('dashboardSections', sectionKey);

    if (!container) {
        return;
    }

    container.classList.toggle('is-hidden', !isAllowed);

    if (isAllowed) {
        setupDashboardPanel(sectionKey);
    } else {
        clearDashboardPanel(sectionKey);
    }
}

function hasPermission(permissionKey, value) {
    const allowedValues = currentUser?.permissions?.[permissionKey] || [];

    return allowedValues.includes('*') || allowedValues.includes(value);
}

function showLoginMessage(message) {
    const messageElement = document.getElementById('globalLoginMessage');

    if (messageElement) {
        messageElement.textContent = message;
    }
}

function setupDashboardPanel(sectionKey) {
    const section = window.dashboardData?.[sectionKey];
    const permittedItems = getPermittedItems(sectionKey);
    const firstItem = permittedItems[0];

    if (!section) {
        return;
    }

    dashboardState[sectionKey] = {
        selectedId: firstItem?.id || null,
        filter: '',
    };

    const searchInput = document.querySelector(`[data-dashboard-search="${sectionKey}"]`);

    if (searchInput) {
        searchInput.value = '';
        searchInput.replaceWith(searchInput.cloneNode(true));
    }

    const freshSearchInput = document.querySelector(`[data-dashboard-search="${sectionKey}"]`);

    if (freshSearchInput) {
        freshSearchInput.addEventListener('input', () => {
            dashboardState[sectionKey].filter = normalizeText(freshSearchInput.value);
            renderDashboardList(sectionKey);
        });
    }

    renderDashboardList(sectionKey);

    if (firstItem) {
        selectDashboardItem(sectionKey, firstItem.id);
    } else {
        renderNoPermissionState(sectionKey);
    }
}

function clearDashboardPanel(sectionKey) {
    const list = document.getElementById(`${sectionKey}List`);
    const viewer = document.getElementById(`${sectionKey}Viewer`);
    const searchInput = document.querySelector(`[data-dashboard-search="${sectionKey}"]`);

    delete dashboardState[sectionKey];

    if (list) {
        list.innerHTML = '';
    }

    if (viewer) {
        viewer.innerHTML = '';
    }

    if (searchInput) {
        searchInput.value = '';
    }
}

function renderDashboardList(sectionKey) {
    const list = document.getElementById(`${sectionKey}List`);
    const state = dashboardState[sectionKey];
    const permittedItems = getPermittedItems(sectionKey);

    if (!list || !state) {
        return;
    }

    const filteredItems = permittedItems.filter((item) => {
        return normalizeText(item.label).includes(state.filter);
    });

    list.innerHTML = '';

    if (filteredItems.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'dashboard-list-empty';
        empty.textContent = 'Sin resultados';
        list.appendChild(empty);
        return;
    }

    filteredItems.forEach((item) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'dashboard-list-item';
        button.textContent = item.label;
        button.dataset.itemId = item.id;
        button.setAttribute('aria-pressed', item.id === state.selectedId ? 'true' : 'false');

        if (item.id === state.selectedId) {
            button.classList.add('active');
        }

        button.addEventListener('click', () => {
            selectDashboardItem(sectionKey, item.id);
        });

        list.appendChild(button);
    });
}

function selectDashboardItem(sectionKey, itemId) {
    const item = getPermittedItems(sectionKey).find((currentItem) => currentItem.id === itemId);

    if (!item) {
        return;
    }

    dashboardState[sectionKey].selectedId = item.id;

    const title = document.getElementById(`${sectionKey}Title`);

    if (title) {
        title.textContent = item.label;
    }

    renderDashboardFrames(sectionKey, item.dashboards);
    renderDashboardList(sectionKey);
}

function getPermittedItems(sectionKey) {
    const section = window.dashboardData?.[sectionKey];
    const allowedIds = currentUser?.permissions?.[sectionKey] || [];

    if (!section || allowedIds.length === 0) {
        return [];
    }

    if (allowedIds.includes('*')) {
        return section.items;
    }

    return section.items.filter((item) => allowedIds.includes(item.id));
}

function renderNoPermissionState(sectionKey) {
    const title = document.getElementById(`${sectionKey}Title`);
    const viewerContent = document.getElementById(`${sectionKey}Viewer`);

    if (title) {
        title.textContent = 'Sin accesos asignados';
    }

    if (!viewerContent) {
        return;
    }

    viewerContent.innerHTML = '';

    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'empty-dashboard';
    emptyMessage.textContent = 'Este usuario no tiene permisos para esta sección.';
    viewerContent.appendChild(emptyMessage);
}

async function renderDashboardFrames(sectionKey, dashboards) {
    const viewerContent = document.getElementById(`${sectionKey}Viewer`);

    if (!viewerContent) {
        return;
    }

    viewerContent.innerHTML = '';

    for (const dashboard of dashboards) {
        const frameBlock = document.createElement('article');
        frameBlock.className = 'dashboard-frame';

        const title = document.createElement('h4');
        title.textContent = dashboard.title;
        frameBlock.appendChild(title);

        const url = await getDashboardUrl(dashboard);

        if (url) {
            const frame = document.createElement('iframe');
            frame.title = dashboard.title;
            frame.src = url;
            frame.loading = 'lazy';
            frame.allowFullscreen = true;
            frameBlock.appendChild(frame);
        } else {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-dashboard';
            emptyMessage.textContent = 'URL pendiente por configurar';
            frameBlock.appendChild(emptyMessage);
        }

        viewerContent.appendChild(frameBlock);
    }
}

async function getDashboardUrl(dashboard) {
    const encryptedUrl = dashboard.encryptedUrls?.[currentUser?.user];

    if (!encryptedUrl || !currentPassword) {
        return '';
    }

    try {
        return await decryptText(encryptedUrl, currentPassword);
    } catch (error) {
        return '';
    }
}

async function verifyPassword(password, verifier) {
    if (!verifier) {
        return false;
    }

    const expectedHash = base64ToBytes(verifier.hash);
    const actualHash = await derivePasswordBytes(password, verifier.salt);

    return constantTimeEqual(actualHash, expectedHash);
}

async function decryptText(encryptedPayload, password) {
    const key = await deriveAesKey(password, encryptedPayload.salt);
    const decrypted = await crypto.subtle.decrypt(
        {
            name: 'AES-CBC',
            iv: base64ToBytes(encryptedPayload.iv),
        },
        key,
        base64ToBytes(encryptedPayload.data)
    );

    return new TextDecoder().decode(decrypted);
}

async function derivePasswordBytes(password, saltBase64) {
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password),
        'PBKDF2',
        false,
        ['deriveBits']
    );

    const bits = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: base64ToBytes(saltBase64),
            iterations: window.cryptoSettings?.iterations || 150000,
            hash: 'SHA-256',
        },
        keyMaterial,
        256
    );

    return new Uint8Array(bits);
}

async function deriveAesKey(password, saltBase64) {
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password),
        'PBKDF2',
        false,
        ['deriveKey']
    );

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: base64ToBytes(saltBase64),
            iterations: window.cryptoSettings?.iterations || 150000,
            hash: 'SHA-256',
        },
        keyMaterial,
        {
            name: 'AES-CBC',
            length: 256,
        },
        false,
        ['decrypt']
    );
}

function base64ToBytes(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
    }

    return bytes;
}

function constantTimeEqual(left, right) {
    if (left.length !== right.length) {
        return false;
    }

    let difference = 0;

    for (let index = 0; index < left.length; index += 1) {
        difference |= left[index] ^ right[index];
    }

    return difference === 0;
}

function normalizeText(value) {
    return value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}
