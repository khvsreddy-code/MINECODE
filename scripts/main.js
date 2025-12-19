/**
 * MineCode Main Bootstrapper
 * Orchestrates the application modules and handles global events.
 */

// Global Namespace Check
window.App = window.App || {};

const initApp = () => {
    console.log("🚀 System Booting...");

    try {
        // 1. Verify Core Systems
        if (!window.App.Router) { throw new Error("Router Module Missing"); }
        if (!window.App.Config) { console.warn("Config Module Missing"); }

        // 2. Initialize Core
        window.App.Router.init();

        // 3. Initialize Features (if loaded)
        if (window.App.Lattice) {
            window.App.Lattice.init();
            window.App.Gamification = window.App.Lattice; // Alias
        }

        if (window.App.Visuals) {
            window.App.Visuals = new window.App.Visuals();
            // Note: If Visuals was a class, we instantiate. If object, access directly. 
            // Assuming class from visual.js check later. Safe for now.
        }

        if (window.App.Editor) window.App.Editor.init();

        if (window.App.Catalog) {
            window.App.Catalog.init();
            // window.App.Catalog.renderCatalogGrid(); // specific view will trigger this
        }

        if (window.App.Terminal) window.App.Terminal.init();

        // 4. Audio Engine (Safe Init)
        if (window.AudioEngine) {
            try { window.App.Audio = new window.AudioEngine(); }
            catch (e) { console.warn("Audio Init Failed", e); }
        }

        console.log("✅ Core Systems Active.");

        // 5. UNIVERSAL ROUTER (Event Delegation)
        document.body.addEventListener('click', (e) => {
            const target = e.target.closest('[data-route]');
            const action = e.target.closest('[data-action]');
            const interactive = e.target.closest('button, a, .course-card, .selection-card');

            // 1. Global Audio Feedback
            if (interactive && window.App.Audio) {
                window.App.Audio.playClick();
            }

            // 2. Special Action Handling (e.g. Onboarding Cards)
            if (action) {
                const actionType = action.dataset.action;
                if (actionType === 'select-card') {
                    const container = action.closest('.card-grid');
                    if (container) {
                        container.querySelectorAll('.selection-card').forEach(c => c.classList.remove('selected'));
                        action.classList.add('selected');
                        // Enable associated button if exists
                        const btnId = container.dataset.btn;
                        if (btnId) {
                            const btn = document.getElementById(btnId);
                            if (btn) {
                                btn.classList.remove('disabled');
                                btn.style.pointerEvents = 'auto';
                            }
                        }
                    }
                }
            }

            // 3. Routing Handling
            if (target) {
                e.preventDefault();
                const route = target.dataset.route;
                const project = target.dataset.project;
                const param = target.dataset.param; // Generic param

                console.log(`[UNIVERSAL ROUTER] Route: ${route}, Project: ${project}`);

                // 2. Ignore Onboarding/Internal Routes (handled by Bootloader)
                if (route.startsWith('onboarding')) return;

                // 3. App Router Navigation
                if (window.App.Router) {
                    // Special Case: Toggle Persistent Items (Nav)
                    if (route === 'dashboard' || route === 'courseCatalog') {
                        if (window.App.Router.togglePersistentItems) window.App.Router.togglePersistentItems(true);
                    } else if (route === 'courseDetail' || route === 'lessonView') {
                        if (window.App.Router.togglePersistentItems) window.App.Router.togglePersistentItems(false);
                    }

                    // Execute Route
                    console.log(`[ROUTER] Navigating to: ${route}`);
                    window.App.Router.show(route, project || param);

                    // Update Nav Active State
                    const navLinks = document.querySelectorAll('.top-nav a, .nav-item');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.dataset.route === route) link.classList.add('active');
                    });
                }
            }
        });

        // SAFETY NET: Explicitly bind key buttons if delegation fails
        const keyButtons = ['get-started-btn', 'start-btn', 'onboarding-continue-btn', 'onboarding-3-continue', 'onboarding-4-continue'];
        keyButtons.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent double-fire
                    const route = btn.dataset.route;
                    if (route && window.App.Router) {
                        console.log(`[SAFETY CLICK] ${id} -> ${route}`);
                        window.App.Router.show(route);
                    }
                });
            }
        });

        // Initialize Typewriter Global
        window.typeWriter = function (element, text, speed = 20) {
            if (!element) return;
            element.innerHTML = "";
            let i = 0;
            function type() {
                if (i < text.length) {
                    if (text.substring(i).startsWith('<')) {
                        const tagEnd = text.indexOf('>', i);
                        if (tagEnd !== -1) {
                            element.innerHTML += text.substring(i, tagEnd + 1);
                            i = tagEnd + 1;
                            setTimeout(type, speed);
                            return;
                        }
                    }
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        };

    } catch (e) {
        console.error("Critical: Bootstrap failed", e);
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
