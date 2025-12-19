// Router Module
// Manages view states and navigation

export const Router = {
    routes: {
        'home': 'dashboard',
        'dashboard': 'dashboard',
        'learn': 'course-catalog',
        'courseCatalog': 'course-catalog',
        'courseDetail': 'course-detail',
        'course': 'lesson-view',
        'lessonView': 'lesson-view',
        'onboarding1': 'onboarding-1',
        'onboarding2': 'onboarding-2',
        'onboarding3': 'onboarding-3',
        'onboarding4': 'onboarding-4'
    },

    // List of all major Top-Level Views to toggle
    views: [
        'dashboard',
        'course-catalog',
        'course-detail',
        'lesson-view',
        'intro-overlay',
        'onboarding-1',
        'onboarding-2',
        'onboarding-3',
        'onboarding-4'
    ],

    init: function () {
        window.onpopstate = (event) => {
            if (event.state) {
                this.navigate(event.state.page, event.state.params, false);
            }
        };
        // Note: Global event delegation in main.js handles clicks now.
    },

    // Show a specific section interactively
    show: function (routeId, projectId = null) {
        console.log(`[ROUTER] Navigating to: ${routeId} (Project: ${projectId})`);

        const targetId = this.routes[routeId];
        if (!targetId) {
            console.warn(`[ROUTER] Route not found: ${routeId}, defaulting to dashboard`);
            this.show('dashboard');
            return;
        }

        // 1. Hide ALL known views
        this.views.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });

        // 2. Show Target
        const targetEl = document.getElementById(targetId);
        console.log(`[ROUTER] Target ID: ${targetId}, Element found: ${!!targetEl}`);

        if (targetEl) {
            targetEl.classList.remove('hidden');
            targetEl.classList.add('active'); // Add active just in case CSS depends on it

            // Special handling for Course View (Lessons)
            if ((routeId === 'course' || routeId === 'lessonView') && projectId) {
                console.log(`[ROUTER] triggering loadProject for ${projectId}`);
                if (window.App.Editor) {
                    window.App.Editor.loadProject(projectId);
                }
            }

            // Special handling for Course Detail (Track View)
            if (routeId === 'courseDetail' && projectId) {
                console.log(`[ROUTER] triggering showCourseDetail for ${projectId}`);
                if (window.App.Catalog) {
                    window.App.Catalog.showCourseDetail(projectId);
                }
            }
        }
    },

    // Browser History Navigation
    navigate: function (pageId, params = null, addToHistory = true) {
        if (addToHistory) {
            history.pushState({ page: pageId, params: params }, "", `#${pageId}`);
        }
        this.show(pageId, params);
    },

    togglePersistentItems: function (show) {
        // Helper to toggle nav bars if needed (logic can be expanded)
    },

    startOnboarding: function () {
        this.show('onboarding1');
    }
};
