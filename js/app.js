const analyticsState = {
    groupId: null,
    categoryId: null,
    itemId: null,
    filter: '',
};

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
    resetAnalyticsState();

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
    const searchInput = document.getElementById('analyticsSearch');

    if (searchInput) {
        searchInput.value = '';
        searchInput.oninput = () => {
            analyticsState.filter = normalizeText(searchInput.value);
            renderAnalyticsItemList();
        };
    }

    const [firstGroup] = getPermittedAnalyticsGroups();

    if (!firstGroup || !hasPermission('modules', 'datos')) {
        renderAnalyticsNoAccess();
        return;
    }

    selectAnalyticsGroup(firstGroup.id);
}

function selectAnalyticsGroup(groupId) {
    const group = getPermittedAnalyticsGroups().find((currentGroup) => currentGroup.id === groupId);

    if (!group) {
        return;
    }

    analyticsState.groupId = group.id;
    analyticsState.categoryId = getFirstPermittedCategoryId(group);
    analyticsState.itemId = null;
    analyticsState.filter = '';

    const searchInput = document.getElementById('analyticsSearch');

    if (searchInput) {
        searchInput.value = '';
    }

    renderAnalyticsShell();
}

function selectAnalyticsCategory(categoryId) {
    const group = getCurrentAnalyticsGroup();

    if (!group?.categories || !isPermittedCategory(categoryId)) {
        return;
    }

    analyticsState.categoryId = categoryId;
    analyticsState.itemId = null;
    analyticsState.filter = '';

    const searchInput = document.getElementById('analyticsSearch');

    if (searchInput) {
        searchInput.value = '';
    }

    renderAnalyticsShell();
}

function selectAnalyticsItem(itemId) {
    const item = getPermittedAnalyticsItems().find((currentItem) => currentItem.id === itemId);

    if (!item) {
        return;
    }

    analyticsState.itemId = item.id;
    renderAnalyticsItemList();
    renderAnalyticsViewer(item);
}

function renderAnalyticsShell() {
    renderAnalyticsTabs();
    renderAnalyticsCategoryTabs();
    renderAnalyticsHeader();
    renderAnalyticsItemList();

    const [firstItem] = getPermittedAnalyticsItems();

    if (firstItem) {
        selectAnalyticsItem(firstItem.id);
    } else {
        renderAnalyticsEmpty('Sin accesos asignados para esta sección.');
    }
}

function renderAnalyticsTabs() {
    const tabs = document.getElementById('analyticsTabs');
    const groups = getPermittedAnalyticsGroups();

    if (!tabs) {
        return;
    }

    tabs.innerHTML = '';

    groups.forEach((group) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'analytics-tab';
        button.textContent = group.label;
        button.classList.toggle('active', group.id === analyticsState.groupId);
        button.addEventListener('click', () => selectAnalyticsGroup(group.id));
        tabs.appendChild(button);
    });
}

function renderAnalyticsCategoryTabs() {
    const tabs = document.getElementById('analyticsCategoryTabs');
    const group = getCurrentAnalyticsGroup();

    if (!tabs) {
        return;
    }

    tabs.innerHTML = '';
    tabs.classList.toggle('is-hidden', !group?.categories);

    if (!group?.categories) {
        return;
    }

    getPermittedCategories(group).forEach((category) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'analytics-tab';
        button.textContent = category.label;
        button.classList.toggle('active', category.id === analyticsState.categoryId);
        button.addEventListener('click', () => selectAnalyticsCategory(category.id));
        tabs.appendChild(button);
    });
}

function renderAnalyticsHeader() {
    const title = document.getElementById('analyticsTitle');
    const description = document.getElementById('analyticsDescription');
    const searchLabel = document.getElementById('analyticsSearchLabel');
    const group = getCurrentAnalyticsGroup();
    const category = getCurrentAnalyticsCategory();

    if (title) {
        title.textContent = category ? `${group.label}: ${category.label}` : group.label;
    }

    if (description) {
        description.textContent = group.description;
    }

    if (searchLabel) {
        searchLabel.textContent = category?.selectorLabel || group.selectorLabel || 'Buscar';
    }
}

function renderAnalyticsItemList() {
    const list = document.getElementById('analyticsItemList');
    const items = getPermittedAnalyticsItems().filter((item) => {
        return normalizeText(item.label).includes(analyticsState.filter);
    });

    if (!list) {
        return;
    }

    list.innerHTML = '';

    if (items.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'dashboard-list-empty';
        empty.textContent = 'Sin resultados';
        list.appendChild(empty);
        return;
    }

    items.forEach((item) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'dashboard-list-item';
        button.textContent = item.label;
        button.classList.toggle('active', item.id === analyticsState.itemId);
        button.setAttribute('aria-pressed', item.id === analyticsState.itemId ? 'true' : 'false');
        button.addEventListener('click', () => selectAnalyticsItem(item.id));
        list.appendChild(button);
    });
}

async function renderAnalyticsViewer(item) {
    const selectedTitle = document.getElementById('analyticsSelectedTitle');
    const viewer = document.getElementById('analyticsViewer');

    if (selectedTitle) {
        selectedTitle.textContent = item.label;
    }

    if (!viewer) {
        return;
    }

    viewer.innerHTML = '';

    const frameBlock = document.createElement('article');
    frameBlock.className = 'dashboard-frame';

    const title = document.createElement('h4');
    title.textContent = item.dashboard.title;
    frameBlock.appendChild(title);

    const url = await getDashboardUrl(item.dashboard);

    if (url) {
        const frame = document.createElement('iframe');
        frame.title = item.dashboard.title;
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

    viewer.appendChild(frameBlock);
}

function renderAnalyticsNoAccess() {
    renderAnalyticsEmpty('Este usuario no tiene acceso a Análisis de Datos.');
}

function renderAnalyticsEmpty(message) {
    const title = document.getElementById('analyticsTitle');
    const description = document.getElementById('analyticsDescription');
    const tabs = document.getElementById('analyticsTabs');
    const categoryTabs = document.getElementById('analyticsCategoryTabs');
    const list = document.getElementById('analyticsItemList');
    const selectedTitle = document.getElementById('analyticsSelectedTitle');
    const viewer = document.getElementById('analyticsViewer');

    if (title) {
        title.textContent = 'Análisis de Datos';
    }

    if (description) {
        description.textContent = message;
    }

    if (tabs) {
        tabs.innerHTML = '';
    }

    if (categoryTabs) {
        categoryTabs.innerHTML = '';
        categoryTabs.classList.add('is-hidden');
    }

    if (list) {
        list.innerHTML = '';
    }

    if (selectedTitle) {
        selectedTitle.textContent = 'Sin selección';
    }

    if (viewer) {
        viewer.innerHTML = '';
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-dashboard';
        emptyMessage.textContent = message;
        viewer.appendChild(emptyMessage);
    }
}

function resetAnalyticsState() {
    analyticsState.groupId = null;
    analyticsState.categoryId = null;
    analyticsState.itemId = null;
    analyticsState.filter = '';
    renderAnalyticsEmpty('Ingresa para visualizar tus dashboards.');
}

function getPermittedAnalyticsGroups() {
    const allowedGroups = currentUser?.permissions?.analyticsGroups || [];
    const groups = Object.entries(window.analyticsDashboards || {}).map(([id, group]) => ({ id, ...group }));

    if (allowedGroups.includes('*')) {
        return groups;
    }

    return groups.filter((group) => allowedGroups.includes(group.id));
}

function getCurrentAnalyticsGroup() {
    return getPermittedAnalyticsGroups().find((group) => group.id === analyticsState.groupId);
}

function getCurrentAnalyticsCategory() {
    const group = getCurrentAnalyticsGroup();

    if (!group?.categories || !analyticsState.categoryId) {
        return null;
    }

    const category = group.categories[analyticsState.categoryId];

    return category ? { id: analyticsState.categoryId, ...category } : null;
}

function getPermittedCategories(group) {
    if (!group?.categories) {
        return [];
    }

    const allowedCategories = currentUser?.permissions?.encuestaJuvenilCategories || [];
    const categories = Object.entries(group.categories).map(([id, category]) => ({ id, ...category }));

    if (allowedCategories.includes('*')) {
        return categories;
    }

    return categories.filter((category) => allowedCategories.includes(category.id));
}

function getFirstPermittedCategoryId(group) {
    const [firstCategory] = getPermittedCategories(group);

    return firstCategory?.id || null;
}

function isPermittedCategory(categoryId) {
    return getPermittedCategories(getCurrentAnalyticsGroup()).some((category) => category.id === categoryId);
}

function getPermittedAnalyticsItems() {
    const group = getCurrentAnalyticsGroup();
    const category = getCurrentAnalyticsCategory();
    const permissionKey = category?.id || group?.id;
    const sourceItems = category?.items || group?.items || [];
    const allowedItems = currentUser?.permissions?.[permissionKey] || [];

    if (!permissionKey || allowedItems.length === 0) {
        return [];
    }

    if (allowedItems.includes('*')) {
        return sourceItems;
    }

    return sourceItems.filter((item) => allowedItems.includes(item.id));
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
