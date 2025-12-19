// View Router Module
window.App = window.App || {};

const Router = {
    routes: {},
    init: function () {
        window.addEventListener('hashchange', this.handleRoute.bind(this));
        // this.handleRoute(); // Defer to main init
        this.cacheDOM();
    },

    cacheDOM: function () {
        this.views = {
            introOverlay: document.getElementById('intro-overlay'),
            onboarding1: document.getElementById('onboarding-1'),
            onboarding2: document.getElementById('onboarding-2'),
            onboarding3: document.getElementById('onboarding-3'),
            onboarding4: document.getElementById('onboarding-4'),
            dashboard: document.getElementById('dashboard'),
            courseCatalog: document.getElementById('catalog-view'), // Updated ID
            courseDetail: document.getElementById('course-detail'),
            lessonView: document.getElementById('lesson-view')
        };
    },

    show: function (viewId, param) {
        console.log(`[Router] Showing: ${viewId}`);

        // Safety: Ensure views are cached
        if (!this.views) this.cacheDOM();

        // 1. Hide all views
        document.querySelectorAll('main, .overlay').forEach(el => {
            el.classList.add('hidden');
        });

        // 2. Map viewId to DOM Element
        // Simple mapping based on viewId matching keys in this.views or IDs
        let target = this.views[viewId];

        // Manual Map for specifics
        if (viewId === 'dashboard') target = this.views.dashboard;
        if (viewId === 'courseCatalog') target = this.views.courseCatalog;
        if (viewId === 'catalog-view') target = this.views.courseCatalog;
        if (viewId === 'catalog-view') target = this.views.courseCatalog;
        if (viewId === 'courses-view') target = this.views.courseCatalog; // Fix for Explore Catalog button
        if (viewId === 'support') target = document.getElementById('support-view');
        if (viewId === 'practice') {
            target = document.getElementById('practice-view');
            if (window.App.Practice) window.App.Practice.init();
        }
        if (viewId === 'build') target = document.getElementById('build-view');

        if (target) {
            target.classList.remove('hidden');
            // Force flex/block based on type
            if (target.classList.contains('overlay')) target.style.display = 'flex';
            else target.style.display = 'block';
        } else {
            console.warn(`[Router] View ID '${viewId}' not found in cache.`);
            // Try formatting ID
            const byId = document.getElementById(viewId);
            if (byId) {
                byId.classList.remove('hidden');
            }
        }
    },

    handleRoute: function () {
        const hash = window.location.hash.slice(1) || 'dashboard';
        const [route, param] = hash.split('/');
        this.show(route, param);
    },

    togglePersistentItems: function (show) {
        // Placeholder
    }
};

window.App.Router = Router;
