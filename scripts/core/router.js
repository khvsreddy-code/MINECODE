// View Router Module - Fixed ID Handling
window.App = window.App || {};

const Router = {
    routes: {},

    init: function () {
        window.addEventListener('hashchange', this.handleRoute.bind(this));
        this.cacheDOM();
    },

    cacheDOM: function () {
        this.views = {
            // Onboarding
            introOverlay: document.getElementById('intro-overlay'),
            onboarding1: document.getElementById('onboarding-1'),
            onboarding2: document.getElementById('onboarding-2'),
            onboarding3: document.getElementById('onboarding-3'),
            onboarding4: document.getElementById('onboarding-4'),

            // Main Views
            dashboard: document.getElementById('dashboard'),
            catalog: document.getElementById('catalog-view'),
            courseDetail: document.getElementById('course-detail'),
            lessonView: document.getElementById('lesson-view'),

            // Feature Views
            profile: document.getElementById('profile-view'),
            community: document.getElementById('community-view'),
            shop: document.getElementById('shop-view'),
            challenges: document.getElementById('challenges-view'),
            leaderboard: document.getElementById('leaderboard-view'),
            auth: document.getElementById('auth-view')
        };
    },

    show: function (viewId, param) {
        console.log(`[Router] Showing: ${viewId}, Param: ${param}`);

        if (!this.views) this.cacheDOM();

        // Hide all views
        document.querySelectorAll('main, .overlay').forEach(el => {
            el.classList.add('hidden');
            el.style.display = 'none';
        });

        // Route Resolution Map (handles all ID variations)
        const routeMap = {
            // Dashboard
            'dashboard': 'dashboard',
            'home': 'dashboard',

            // Auth
            'auth': 'auth',
            'login': 'auth',
            'signup': 'auth',

            // Catalog
            'catalog': 'catalog',
            'catalog-view': 'catalog',
            'courseCatalog': 'catalog',
            'courses-view': 'catalog',
            'courses': 'catalog',
            'learn': 'catalog',

            // Course Detail
            'courseDetail': 'courseDetail',
            'course-detail': 'courseDetail',

            // Lesson View
            'lessonView': 'lessonView',
            'lesson-view': 'lessonView',
            'lesson': 'lessonView',

            // Profile
            'profile': 'profile',
            'profile-view': 'profile',

            // Community
            'community': 'community',
            'community-view': 'community',
            'lattice': 'community',

            // Shop
            'shop': 'shop',
            'shop-view': 'shop',
            'fabricator': 'shop',

            // Challenges
            'challenges': 'challenges',
            'challenges-view': 'challenges',
            'practice': 'challenges',
            'arena': 'challenges',

            // Leaderboard
            'leaderboard': 'leaderboard',
            'leaderboard-view': 'leaderboard',
            'rankings': 'leaderboard',

            // Onboarding
            'onboarding1': 'onboarding1',
            'onboarding2': 'onboarding2',
            'onboarding3': 'onboarding3',
            'onboarding4': 'onboarding4'
        };

        // Resolve the route
        const resolvedKey = routeMap[viewId] || viewId;
        let target = this.views[resolvedKey];

        // Trigger module renders
        if (resolvedKey === 'lessonView' && window.App.Academy) {
            window.App.Academy.load(param || 'python-hello');
        }
        if (resolvedKey === 'profile' && window.App.Profile) {
            window.App.Profile.render();
        }
        if (resolvedKey === 'community' && window.App.Community) {
            window.App.Community.render();
        }
        if (resolvedKey === 'shop' && window.App.Shop) {
            window.App.Shop.render();
        }
        if (resolvedKey === 'challenges' && window.App.Challenges) {
            window.App.Challenges.render();
        }
        if (resolvedKey === 'leaderboard' && window.App.Leaderboard) {
            window.App.Leaderboard.render();
        }
        if (resolvedKey === 'auth' && window.App.Auth) {
            window.App.Auth.renderAuthPage();
        }
        if (resolvedKey === 'catalog' && window.App.Catalog) {
            window.App.Catalog.renderCatalogGrid();
        }

        // Show the target view
        if (target) {
            target.classList.remove('hidden');
            target.style.display = target.classList.contains('overlay') ? 'flex' : 'block';
            console.log(`[Router] ✅ Displayed: ${resolvedKey}`);
        } else {
            console.warn(`[Router] ❌ View not found: ${viewId} -> ${resolvedKey}`);
            // Fallback: try by ID directly
            const fallback = document.getElementById(viewId) || document.getElementById(viewId + '-view');
            if (fallback) {
                fallback.classList.remove('hidden');
                fallback.style.display = 'block';
            }
        }
    },

    handleRoute: function () {
        const hash = window.location.hash.slice(1) || 'dashboard';
        const [route, param] = hash.split('/');
        this.show(route, param);
    }
};

window.App.Router = Router;
