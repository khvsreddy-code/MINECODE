/**
 * MINECODE BOOTLOADER (v1.1 - Emergency Repair)
 * 
 * Purpose: 
 * 1. Independent Controller for Navigation.
 * 2. Visual Debugging (Ripples).
 * 3. Z-Index Nuke (Force Clickability).
 * 4. Fallback Rendering.
 */

(function () {
    console.log("🚀 BOOTLOADER: System Initializing...");

    // === 1. VISUAL DEBUG CONSOLE ===
    const debugConsole = document.createElement('div');
    debugConsole.style.cssText = 'position:fixed; bottom:0; right:0; width:300px; height:100px; background:rgba(0,0,0,0.8); color:#0f0; font-family:monospace; font-size:10px; overflow-y:scroll; z-index:999999999; pointer-events:none; padding:5px; border-top:1px solid #0f0; display:none;'; // hidden by default to keep clean
    document.body.appendChild(debugConsole);

    function log(msg) {
        // debugConsole.style.display = 'block'; 
        const line = document.createElement('div');
        line.textContent = `> ${msg}`;
        debugConsole.appendChild(line);
        debugConsole.scrollTop = debugConsole.scrollHeight;
        console.log(`[BOOTLOADER] ${msg}`);
    }

    // === 2. Z-INDEX NUKE (God Mode for Buttons) ===
    const nukeStyle = document.createElement('style');
    nukeStyle.innerHTML = `
        /* FORCE INTERACTIVITY */
        a, button, .btn-primary, .course-card, .selection-card, input, [data-route] {
            pointer-events: auto !important;
            cursor: pointer !important;
            position: relative; 
            z-index: 100000 !important; 
        }
        
        /* DISABLE BLOCKING OVERLAYS */
        .scanlines, .particles, .overlay-container, .crt-overlay, .grid-overlay {
            pointer-events: none !important;
            z-index: 0 !important;
        }

        /* EXCEPTIONS */
        .hidden { display: none !important; }
    `;
    document.head.appendChild(nukeStyle);
    log("☢️ Z-INDEX NUKE DEPLOYED");

    // === 3. FALLBACK DATA ===
    const FALLBACK_CURRICULUM = [
        { id: 'python', title: 'The Legend of Python', description: 'Master the ancient language of the backend servers.', icon: '🐍', usage: 'AI, Data Science & Backend', level: 'Beginner' },
        { id: 'web', title: 'The Web Weavers', description: 'Construct the visual cortex using HTML & CSS.', icon: '🌐', usage: 'Frontend Web Development', level: 'Beginner' },
        { id: 'js', title: 'JavaScript Spark', description: 'Ignite interactivity in the browser.', icon: '⚡', usage: 'Interactive Web & Logic', level: 'Intermediate' },
        { id: 'java', title: 'The Fortress of Java', description: 'Object-Oriented Architecture for enterprise systems.', icon: '☕', usage: 'Enterprise & Android Apps', level: 'Intermediate' },
        { id: 'cpp', title: 'C++ Systems Core', description: 'Low-level memory management and high performance.', icon: '⚙️', usage: 'Game Engines & Systems', level: 'Advanced' },
        { id: 'sql', title: 'The SQL Vaults', description: 'Query the infinite databases of the old world.', icon: '🗄️', usage: 'Database Management', level: 'Beginner' },
        { id: 'react', title: 'React Reactor', description: 'Component-based UI construction.', icon: '⚛️', usage: 'Modern Web UI', level: 'Intermediate' },
        { id: 'rust', title: 'Rust Iron', description: 'Memory safety without garbage collection.', icon: '🦀', usage: 'Systems Programming', level: 'Advanced' },
        { id: 'go', title: 'Go Cloud', description: 'Concurrent systems for the modern age.', icon: '🐹', usage: 'Cloud & Microservices', level: 'Intermediate' },
        { id: 'git', title: 'Git Chronos', description: 'Version control and timeline manipulation.', icon: '📚', usage: 'Collaboration Tools', level: 'Essential' },
        { id: 'c', title: 'C Foundation', description: 'The bedrock of all modern systems.', icon: '🏗️', usage: 'Operating Systems', level: 'Hardcore' },
        { id: 'csharp', title: 'C# Architect', description: 'Build the metaverse with .NET.', icon: '#️⃣', usage: 'Game Dev (Unity) & Windows', level: 'Intermediate' },
        { id: 'godot', title: 'Godot Engine', description: 'Forge interactive worlds and simulations.', icon: '🤖', usage: 'Game Development', level: 'Beginner' }
    ];

    function renderFallbackGrid() {
        // Target the Catalog View specifically
        const catalogContainer = document.getElementById('catalog-view');
        if (!catalogContainer) return;

        const grid = catalogContainer.querySelector('.active-courses-grid');
        if (!grid || grid.children.length > 0) return;

        console.log("⚠️ BOOTLOADER: Rendering Fallback Grid...");
        let html = '';
        FALLBACK_CURRICULUM.forEach(track => {
            html += `
            <div class="course-card cyber-card cozy-card" data-route="courseDetail" data-param="${track.id}">
                <div class="video-container" style="background:#000; display:flex; align-items:center; justify-content:center; height:140px; position:relative; overflow:hidden;">
                    <div style="font-size:5rem; z-index:2; text-shadow:0 0 20px rgba(255,255,255,0.5);">${track.icon}</div>
                    <div style="position:absolute; width:100%; height:100%; top:0; left:0; background:linear-gradient(45deg, transparent, rgba(255,255,255,0.05));"></div>
                </div>
                <div class="card-content">
                    <div class="course-info">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                            <span class="course-label cyber-mono" style="color:#00ff00; font-size:0.8rem;">${track.id.toUpperCase()}</span>
                            <span class="cyber-mono" style="font-size:0.7rem; background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:4px;">${track.level}</span>
                        </div>
                        <h2 class="cyber-text-glow" style="margin: 0.2rem 0; font-size: 1.4rem;">${track.title}</h2>
                        <div style="margin: 0.5rem 0; font-size: 0.8rem; color: #aaa;">
                            <span style="display:inline-block; border:1px solid #333; padding:2px 8px; border-radius:10px; background:rgba(0,0,0,0.3);">
                                🔧 ${track.usage}
                            </span>
                        </div>
                        <p class="cyber-dim" style="font-size: 0.9rem; line-height: 1.4; margin-bottom: 1rem;">${track.description}</p>
                    </div>
                    <button class="btn-primary cyber-btn-small full-width" style="margin-top:auto; pointer-events:auto; cursor:pointer;">
                        START PROTOCOL
                    </button>
                </div>
            </div>`;
        });
        grid.innerHTML = html;
    }

    // === 4. VISUAL RIPPLE (Proof of Life) ===
    function createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(0, 255, 157, 0.8)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '99999999';
        ripple.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
        document.body.appendChild(ripple);
        requestAnimationFrame(() => {
            ripple.style.transform = 'translate(-50%, -50%) scale(3)';
            ripple.style.opacity = '0';
        });
        setTimeout(() => ripple.remove(), 500);
    }

    // === 5. GLOBAL CLICK INTERCEPTOR ===
    document.addEventListener('click', function (e) {
        // Visual Feedback
        createRipple(e.clientX, e.clientY);

        const target = e.target.closest('a, button, .course-card, .selection-card, [data-route], .overlay[data-route]');

        // Log for debug
        // log(`Click: ${target ? target.tagName : 'VOID'}`);

        if (!target) {
            // Fallback: If clicking anywhere on an active onboarding overlay
            const activeOverlay = document.querySelector('.overlay:not(.hidden)');
            if (activeOverlay && activeOverlay.dataset.route && activeOverlay.id.startsWith('onboarding')) {
                console.log("[BOOTLOADER] Global Overlay Click Detected");
                // Manually trigger navigation
                activeOverlay.click();
                return;
            }
            return;
        }

        // A. NAVIGATION
        if (target.dataset.route || target.classList.contains('course-card')) {
            e.preventDefault();
            e.stopImmediatePropagation();

            let route = target.dataset.route || 'courseDetail';
            let param = target.dataset.param;

            // Handle Buttons inside Cards
            if (target.tagName === 'BUTTON' && target.closest('.course-card')) {
                const card = target.closest('.course-card');
                route = 'courseDetail';
                param = card.dataset.param;
            }

            console.log(`🧭 Bootloader Nav: ${route} [${param}]`);

            // 1. Hide All Views
            document.querySelectorAll('main, .overlay').forEach(el => el.classList.add('hidden'));

            // 2. Resolve Target ID
            let targetId = route;
            if (route === 'courseCatalog') targetId = 'dashboard';
            if (route === 'courseDetail') targetId = 'course-detail';
            // Simple Onboarding Mapper
            if (route.startsWith('onboarding')) {
                if (route === 'onboarding1') targetId = 'onboarding-1';
                else if (route === 'onboarding2') targetId = 'onboarding-2';
                else if (route === 'onboarding3') targetId = 'onboarding-3';
                else if (route === 'onboarding4') targetId = 'onboarding-4';
            }
            // New mapping for courses-view
            if (route === 'courses-view') targetId = 'catalog-view';

            // Console Debug
            console.log(`🧭 Resolved Target ID: ${targetId}`);

            const section = document.getElementById(targetId);
            if (section) {
                console.log(`[BOOTLOADER] Showing section: ${targetId}`);
                section.classList.remove('hidden');

                // Force visibility style to override any css conflicts
                section.style.visibility = 'visible';
                section.style.opacity = '1';

                if (section.classList.contains('overlay')) {
                    section.style.display = 'flex';
                } else {
                    section.style.display = 'block';
                }

                // Dashboard (Home)
                if (targetId === 'dashboard') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    // No grid render needed here anymore, it's personal stats
                }

                // Courses Catalog View
                if (targetId === 'catalog-view') {
                    // 1. Show Catalog
                    const catalog = document.getElementById('catalog-view');
                    if (catalog) catalog.classList.remove('hidden');

                    // 2. TARGET GRID SPECIFICALLY
                    const grid = catalog.querySelector('.active-courses-grid');

                    // 3. Attempt Render Strategy
                    let rendered = false;
                    if (window.App && window.App.Catalog) {
                        try {
                            window.App.Catalog.renderCatalogGrid();
                            // Check if it actually did anything
                            if (grid && grid.children.length > 0) rendered = true;
                        } catch (e) {
                            console.warn("App Render Failed", e);
                        }
                    }

                    // 4. Force Fallback if empty
                    if (!rendered) {
                        log("⚠️ Main Render Failed/Empty. Forcing Fallback.");
                        renderFallbackGrid();
                    }
                }

                // Course Detail Refresh
                if (targetId === 'course-detail') {
                    window.scrollTo(0, 0);
                    if (window.App && window.App.Catalog && param) {
                        window.App.Catalog.renderCourseDetail(param);
                    } else if (param) {
                        document.querySelector('#course-detail h1').textContent = param.toUpperCase();
                        document.querySelector('#course-detail .course-desc').textContent = "Module Loaded via Fallback Protocol.";
                    }
                }

            } else {
                console.error("Target not found:", targetId);
                document.getElementById('dashboard').classList.remove('hidden');
            }

            // Update Nav State
            document.querySelectorAll('.top-nav a').forEach(a => {
                a.classList.remove('active');
                if (a.dataset.route === route) a.classList.add('active');
            });
        }

        // B. ONBOARDING SELECTION CARDS
        if (target.classList.contains('selection-card')) {
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log("Selection Card Clicked");

            const grid = target.closest('.card-grid');
            if (grid) {
                grid.querySelectorAll('.selection-card').forEach(c => c.classList.remove('selected'));
                target.classList.add('selected');

                const btn = document.getElementById(grid.dataset.btn);
                if (btn) {
                    btn.classList.remove('disabled');
                    btn.disabled = false;
                    btn.style.pointerEvents = 'auto';
                    btn.style.borderColor = '#00ff00';
                }
            }
        }

    }, true); // Capture Phase

    // === 6. AUTO STARTUP ===
    setTimeout(() => {
        const grid = document.querySelector('.active-courses-grid');
        if (grid && grid.children.length === 0) {
            console.log("🚑 Auto-healing empty grid...");
            renderFallbackGrid();
        }
    }, 800);

    console.log("✅ BOOTLOADER: Ready.");

})();
