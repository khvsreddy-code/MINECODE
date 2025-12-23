/**
 * MineCode Cyber App Controller v1.2
 * Assets: Custom Pixel Art Cards
 */

// DATA
// COURSES data moved to scripts/data/courses-data.js

const TUTORIALS = [
    {
        id: 'calc',
        title: 'BUILD A CALCULATOR',
        // Reusing JS Asset for now as it fits 'Calculator' logic
        img: 'url("C:/Users/harin/.gemini/antigravity/brain/848c9a17-8c76-4202-b319-cfbcb0039c4b/cyber_js_card_1766153042285.png")',
        tags: ['JS', 'BEGINNER']
    },
    {
        id: 'game',
        title: 'PYTHON GAME DEV',
        img: 'url("C:/Users/harin/.gemini/antigravity/brain/848c9a17-8c76-4202-b319-cfbcb0039c4b/cyber_game_dev_card_1766153114465.png")',
        tags: ['PY', 'INTERMEDIATE']
    }
];

// UTILITIES
/**
 * Splits text into animated spans with staggered delays.
 */
const animateText = (text, baseDelay = 0) => {
    return text.split('').map((char, i) => {
        if (char === ' ') return '&nbsp;';
        const delay = (baseDelay + i * 0.08).toFixed(2);
        return `<span style="animation-delay: ${delay}s">${char}</span>`;
    }).join('');
};

// STATE MANAGEMENT (The "Brain")
const GameState = {
    data: {
        user: {
            name: 'Agent',
            xp: 0,
            streak: 0,
            level: 1,
            title: 'Novice Scripter'
        },
        progress: {
            // CourseID: { completedLessons: [], unlocked: true }
            'python': { completedLessons: [1, 2, 3], unlocked: true },
            'html': { completedLessons: [], unlocked: true },
            'js': { completedLessons: [], unlocked: true }
        },
        unlockedBadges: [],
        inventory: []
    },

    init() {
        const saved = localStorage.getItem('minecode_save_v1');
        if (saved) {
            this.data = { ...this.data, ...JSON.parse(saved) };
            console.log(' [SYSTEM] Save loaded. Welcome back, agent.');
        } else {
            console.log(' [SYSTEM] New profile initialized.');
            this.save();
        }
        this.updateUI();
    },

    save() {
        localStorage.setItem('minecode_save_v1', JSON.stringify(this.data));
        this.updateUI();
    },

    addXP(amount) {
        this.data.user.xp += amount;

        // Simple linear leveling: 100 * level
        const nextLevelXp = this.data.user.level * 100;
        let leveledUp = false;

        if (this.data.user.xp >= nextLevelXp) {
            this.data.user.level++;
            this.data.user.xp -= nextLevelXp;
            leveledUp = true;
        }

        this.save();

        if (leveledUp) {
            this.triggerLevelUpModal(this.data.user.level);
        } else {
            this.showXPPopup(amount);
        }
    },

    completeLesson(courseId, lessonId, xpReward = 50) {
        if (!this.data.progress[courseId]) {
            this.data.progress[courseId] = { completedLessons: [] };
        }

        const courseProgress = this.data.progress[courseId];

        if (!courseProgress.completedLessons.includes(lessonId)) {
            courseProgress.completedLessons.push(lessonId);
            this.addXP(xpReward);
            this.updateUI();

            // Check if we need to unlock next chapter/lesson
            // (Simplified: Logic handled in renderCourseRoadmap mostly)
        }
    },

    triggerLevelUpModal(newLevel) {
        const modal = document.createElement('div');
        modal.className = 'levelup-modal-overlay';
        modal.innerHTML = `
            <div class="levelup-card">
                <div class="confetti-burst">🎉</div>
                <h2 class="levelup-title">LEVEL UP!</h2>
                <div class="levelup-badge">${newLevel}</div>
                <p>You are now Level ${newLevel}</p>
                <button onclick="this.closest('.levelup-modal-overlay').remove()">CONTINUE</button>
            </div>
            <style>
                .levelup-modal-overlay {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0,0,0,0.8);
                    display: flex; align-items: center; justify-content: center;
                    z-index: 9999;
                    animation: fadeIn 0.3s forwards;
                }
                .levelup-card {
                    background: var(--bg-panel);
                    border: 2px solid var(--neon-cyan);
                    padding: 40px;
                    text-align: center;
                    border-radius: 20px;
                    box-shadow: 0 0 50px var(--neon-cyan);
                    animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .levelup-title {
                    font-family: 'Press Start 2P';
                    color: var(--neon-cyan);
                    font-size: 24px;
                    margin: 20px 0;
                }
                .levelup-badge {
                    font-size: 60px;
                    font-weight: 900;
                    color: white;
                    text-shadow: 4px 4px 0 var(--codedex-purple);
                    margin-bottom: 20px;
                }
                button {
                    background: var(--codedex-cyan);
                    color: black;
                    border: none;
                    padding: 12px 32px;
                    font-family: 'Press Start 2P';
                    font-size: 12px;
                    cursor: pointer;
                    margin-top: 20px;
                }
                @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            </style>
        `;
        document.body.appendChild(modal);
    },

    showXPPopup(amount) {
        const popup = document.createElement('div');
        popup.className = 'xp-popup';
        popup.textContent = `+${amount} XP`;
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 1500);
    },

    showBadgeUnlock(badgeName, badgeIcon) {
        const overlay = document.createElement('div');
        overlay.className = 'badge-unlock';
        overlay.innerHTML = `
            <div style="font-size: 64px; margin-bottom: 16px;">${badgeIcon}</div>
            <div style="font-family: 'Press Start 2P'; font-size: 12px; color: var(--codedex-gold); margin-bottom: 8px;">BADGE UNLOCKED!</div>
            <div style="font-size: 18px; color: white;">${badgeName}</div>
        `;
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 3000);
    },

    checkLevelUp() {
        const xp = this.data.user.xp;
        const newLevel = Math.floor(xp / 1000) + 1;
        if (newLevel > this.data.user.level) {
            this.data.user.level = newLevel;

            // Visual Level Up
            const overlay = document.createElement('div');
            overlay.className = 'level-up-overlay active';
            overlay.innerHTML = `
                <div class="level-up-box">
                    <div class="level-title">LEVEL UP!</div>
                    <div class="xp-gain">You reached Level ${newLevel}</div>
                    <button class="level-btn" onclick="this.parentElement.parentElement.remove()">CONTINUE</button>
                </div>
            `;
            document.body.appendChild(overlay);

            // Play sound/animation here in future
        }
    },

    completeLesson(courseId, lessonId) {
        if (!this.data.progress[courseId]) {
            this.data.progress[courseId] = { completedLessons: [], unlocked: true };
        }

        const prog = this.data.progress[courseId];
        if (!prog.completedLessons.includes(lessonId)) {
            prog.completedLessons.push(lessonId);
            this.addXP(100); // Standard lesson reward
            this.save();
            return true; // First time completion
        }
        return false; // Replay
    },

    updateUI() {
        // Update Sidebars/Navs if they exist
        const xpEls = document.querySelectorAll('[id="stat-xp"]');
        xpEls.forEach(el => el.textContent = this.data.user.xp);

        const levelEls = document.querySelectorAll('.level-badge, .profile-level span');
        levelEls.forEach(el => el.textContent = `LVL ${this.data.user.level}`);

        const streakEls = document.querySelectorAll('[id="stat-streak"]');
        streakEls.forEach(el => el.textContent = this.data.user.streak);

        // Update Progress Bars
        Object.keys(this.data.progress).forEach(courseId => {
            const course = COURSES.find(c => c.id === courseId);
            if (course) {
                // Approximate progress for demo
                const completed = this.data.progress[courseId].completedLessons.length;
                course.completed = completed; // Sync with static data for renderers
            }
        });
    },

    showToast(msg, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `cyber-toast toast-${type} slide-in-right`;
        toast.innerHTML = `
            <span class="toast-icon">${type === 'success' ? '✅' : '⚡'}</span>
            <span class="toast-msg">${msg}</span>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },

    showMissionBriefing(lessonId, title) {
        // Find metadata (simplified for now)
        const xpReward = 100; // Dynamic later

        const modal = document.createElement('div');
        modal.className = 'mission-modal-overlay';
        modal.innerHTML = `
            <div class="mission-card cyber-card">
                <div class="mission-header">
                    <div class="mission-badge">M</div>
                    <div class="mission-info">
                        <h3>MISSION BRIEFING</h3>
                        <h1>${title || 'Unknown Mission'}</h1>
                    </div>
                </div>
                
                <div class="mission-body">
                    <div class="mission-visual">
                        <div class="pixel-grid-anim"></div>
                    </div>
                    <div class="mission-details">
                        <div class="detail-row">
                            <span class="label">OBJECTIVE</span>
                            <span class="value">Master the concepts of this sector.</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">REWARD</span>
                            <span class="value highlight-gold">${xpReward} XP</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">DIFFICULTY</span>
                            <span class="value">Novice</span>
                        </div>
                    </div>
                </div>

                <div class="mission-actions">
                    <button class="btn-nes-secondary" onclick="this.closest('.mission-modal-overlay').remove()">ABORT</button>
                    <button class="btn-nes-primary blink-anim" id="start-mission-btn">🚀 START MISSION</button>
                </div>
            </div>
            
            <style>
                .mission-modal-overlay {
                    position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
                    display: flex; align-items: center; justify-content: center; z-index: 2000;
                    animation: fadeIn 0.2s ease-out;
                }
                .mission-card {
                    width: 90%; max-width: 600px;
                    border: 2px solid var(--neon-cyan);
                    box-shadow: 0 0 50px rgba(0, 245, 255, 0.2);
                    background: #0d1117;
                    padding: 0;
                    overflow: visible;
                    animation: slideUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .mission-header {
                    background: rgba(34, 211, 238, 0.1);
                    padding: 24px;
                    display: flex; gap: 20px; align-items: center;
                    border-bottom: 1px solid var(--border-subtle);
                }
                .mission-badge {
                    width: 48px; height: 48px; background: var(--neon-cyan); color: black;
                    font-family: 'Press Start 2P'; font-size: 24px;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 4px 4px 0 white;
                }
                .mission-info h3 { color: var(--neon-cyan); font-family: 'Press Start 2P'; font-size: 10px; margin-bottom: 8px; letter-spacing: 2px; }
                .mission-info h1 { color: white; font-family: var(--font-display); font-size: 24px; margin: 0; }
                
                .mission-body { padding: 32px; display: grid; grid-template-columns: 1fr 1.5fr; gap: 32px; }
                .mission-visual { 
                    background: #000; border: 1px solid var(--border-subtle); 
                    border-radius: 8px; min-height: 150px; position: relative; overflow: hidden;
                }
                .pixel-grid-anim {
                    position: absolute; inset: 0;
                    background-image: linear-gradient(var(--neon-cyan) 1px, transparent 1px),
                                    linear-gradient(90deg, var(--neon-cyan) 1px, transparent 1px);
                    background-size: 20px 20px;
                    opacity: 0.2;
                    animation: scrollGrid 20s linear infinite;
                }
                @keyframes scrollGrid { to { transform: translate(20px, 20px); } }
                
                .detail-row { display: flex; justify-content: space-between; margin-bottom: 16px; border-bottom: 1px dashed var(--border-subtle); padding-bottom: 8px; }
                .detail-row .label { color: var(--text-muted); font-size: 12px; font-family: var(--font-code); }
                .detail-row .value { color: white; font-family: var(--font-display); font-size: 14px; }
                .highlight-gold { color: var(--neon-orange) !important; text-shadow: 0 0 10px rgba(255, 165, 0, 0.5); }
                
                .mission-actions { padding: 24px; display: flex; justify-content: flex-end; gap: 16px; border-top: 1px solid var(--border-subtle); }
                .blink-anim { animation: pulse 1.5s infinite; }
            </style>
        `;

        document.body.appendChild(modal);

        // Handle Start
        document.getElementById('start-mission-btn').onclick = () => {
            modal.remove();

            // Transition Effect
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;inset:0;background:black;z-index:9999;transition:opacity 0.5s;opacity:0;pointer-events:none;';
            document.body.appendChild(overlay);

            // Flash black then go
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
                setTimeout(() => {
                    navigateTo('lesson-' + lessonId);
                    setTimeout(() => {
                        overlay.style.opacity = '0';
                        setTimeout(() => overlay.remove(), 500);
                    }, 500);
                }, 500);
            });
        };
    }
};

// Global helper for the HTML onclick
window.showMissionBriefing = (id, title) => GameState.showMissionBriefing(id, title);

// INIT
document.addEventListener('DOMContentLoaded', () => {
    GameState.init(); // Load save data
    initNavigation();
    if (window.UIComponents && window.UIComponents.initTooltips) {
        window.UIComponents.initTooltips();
    }

    const path = window.location.pathname;

    // Multi-page Routing Logic
    if (path.includes('dashboard.html') || !path.includes('.html')) {
        // App / Dashboard Logic
        console.log(" [SYSTEM] Initializing Dashboard...");

        // Use new URL handler instead of manual query parsing
        handleUrlRouting();
    } else {
        // Landing / Index Logic
        console.log(" [SYSTEM] Initializing Landing Sequence...");
        renderLandingPage();
    }
});


// GLOBAL: Navigation Handler
window.navigateTo = function (route, replaceState = false) {
    console.log(` [NAV] Moving to: ${route}`);

    // External/Auth Routes
    if (route === 'landing' || route === 'logout') {
        localStorage.removeItem('minecode_save_v1');
        window.location.href = '/index.html';
        return;
    }
    if (route === 'signup') {
        renderSignupPage();
        return;
    }

    // Determine target URL path based on route ID
    let path = '/dashboard';
    if (route === 'home') path = '/dashboard';
    else if (route === 'courses') path = '/dashboard/courses';
    else if (route.startsWith('course-')) path = `/dashboard/courses/${route.replace('course-', '')}`;
    else if (route.startsWith('lesson-')) {
        const lessonId = route.replace('lesson-', '');
        const courseId = lessonId.split('-')[0];
        path = `/dashboard/courses/${courseId}/lesson/${lessonId}`;
    }
    else if (route === 'practice') path = '/dashboard/practice';
    else if (route === 'builds') path = '/dashboard/builds';
    else if (route === 'community') path = '/dashboard/community';
    else if (route === 'profile') path = '/dashboard/profile';

    // Update History
    if (window.location.protocol.includes('file')) {
        // FILE PROTOCOL MODE: Use Query Params (Browser Security Restriction for paths)
        const url = new URL(window.location);
        url.searchParams.set('view', route);
        if (replaceState) {
            window.history.replaceState({ route }, '', url);
        } else {
            window.history.pushState({ route }, '', url);
        }
    } else {
        // SERVER MODE: Use Clean URLs
        if (!window.location.protocol.includes('file')) {
            if (replaceState) {
                window.history.replaceState({ route }, '', path);
            } else {
                window.history.pushState({ route }, '', path);
            }
        }
    }

    // INTERNAL DASHBOARD ROUTING
    document.querySelectorAll('.view, #courses-view').forEach(el => el.classList.add('hidden'));

    // Handle Layout Visibility
    const mainLayoutEl = document.getElementById('main-layout');
    // If we are in "courses" catalog view, hide main layout
    if (route === 'courses') {
        if (mainLayoutEl) mainLayoutEl.style.display = 'none';
        const coursesView = document.getElementById('courses-view');
        if (coursesView) coursesView.classList.remove('hidden');
        window.scrollTo(0, 0);
        renderCoursesCatalog();
    } else {
        if (mainLayoutEl) mainLayoutEl.style.display = 'block';
    }

    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.innerHTML = '';
        mainContent.classList.remove('view-fade-in');
    }

    // --- RENDER LOGIC ---
    let breadcrumbs = [{ label: 'Home', route: 'home' }];

    if (route === 'home') {
        renderHomeDashboard();
    } else if (route.startsWith('course-')) {
        const courseId = route.replace('course-', '');
        renderCourseRoadmap(courseId);
        breadcrumbs.push({ label: 'Courses', route: 'courses' });
        breadcrumbs.push({ label: courseId.toUpperCase(), route: route });
    } else if (route.startsWith('lesson-')) {
        const lessonId = route.replace('lesson-', '');
        renderLessonView(lessonId);
        const courseId = lessonId.split('-')[0];
        breadcrumbs.push({ label: 'Courses', route: 'courses' });
        breadcrumbs.push({ label: courseId.toUpperCase(), route: `course-${courseId}` });
        breadcrumbs.push({ label: 'Lesson', route: route });
    } else if (route === 'courses') {
        breadcrumbs.push({ label: 'Catalog', route: 'courses' });
    } else if (route === 'practice') {
        renderPracticeSection();
        breadcrumbs.push({ label: 'Practice', route: 'practice' });
    } else if (route === 'builds') {
        renderBuildGallery();
        breadcrumbs.push({ label: 'Builds', route: 'builds' });
    } else if (route === 'community') {
        renderCommunityHub();
        breadcrumbs.push({ label: 'Community', route: 'community' });
    } else if (route === 'profile') {
        const sidebar = document.querySelector('.right-sidebar');
        if (sidebar) sidebar.style.display = 'block';
        if (mainLayoutEl) mainLayoutEl.style.display = 'grid';
        renderProfilePage();
        breadcrumbs.push({ label: 'Profile', route: 'profile' });
    }

    // Trigger Fade-In
    if (mainContent) {
        void mainContent.offsetWidth; // Force Reflow
        requestAnimationFrame(() => mainContent.classList.add('view-fade-in'));
    }

    // Navigation Active States
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    // Map complicated routes back to nav buttons
    let activeNav = 'home';
    if (route.includes('course') || route.includes('lesson')) activeNav = 'courses';
    else if (route === 'practice') activeNav = 'practice';
    else if (route === 'community') activeNav = 'community';
    else if (route === 'profile') activeNav = 'profile';

    const activeBtn = document.querySelector(`[onclick="navigateTo('${activeNav}')"]`);
    if (activeBtn) activeBtn.classList.add('active');
};

// GLOBAL: Handle URL Routing (Popstate + Initial Load)
window.handleUrlRouting = function () {
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);

    // Parse Path to Route
    let route = 'home';

    // Check Query Params first (Priority for File Protocol)
    if (urlParams.has('view')) {
        route = urlParams.get('view');
    }
    // Fallback to Path Parsing (Server Mode)
    else if (path.includes('/dashboard/courses')) {
        const segments = path.split('/');
        // ex: /dashboard/courses/python -> python
        const courseIndex = segments.indexOf('courses');
        if (segments[courseIndex + 1]) {
            route = `course-${segments[courseIndex + 1]}`;
            // check for lesson
            if (segments[courseIndex + 2] === 'lesson' && segments[courseIndex + 3]) {
                route = `lesson-${segments[courseIndex + 3]}`;
            }
        } else {
            route = 'courses';
        }
    } else if (path.includes('/dashboard/practice')) route = 'practice';
    else if (path.includes('/dashboard/builds')) route = 'builds';
    else if (path.includes('/dashboard/community')) route = 'community';
    else if (path.includes('/dashboard/profile')) route = 'profile';

    navigateTo(route, true); // replaceState on initial alignment
};

// Listen for Back/Forward
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.route) {
        navigateTo(e.state.route, true);
    } else {
        handleUrlRouting();
    }
});

function initNavigation() {
    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelector('.nav-menu').classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-menu') && !e.target.closest('#mobile-menu-btn')) {
                document.querySelector('.nav-menu').classList.remove('active');
            }
        });
    }

    // LEARN BUTTON TOGGLE (Fix for Hover Glitch)
    const learnBtn = document.getElementById('learn-btn');
    if (learnBtn) {
        learnBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = learnBtn.closest('.nav-item');
            parent.classList.toggle('active');

            // Close other dropdowns if any (future proofing)
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-item.has-dropdown')) {
                const activeNav = document.querySelector('.nav-item.has-dropdown.active');
                if (activeNav) activeNav.classList.remove('active');
            }
        });
    }

    document.addEventListener('click', (e) => {
        const routeEl = e.target.closest('[data-route]');
        if (routeEl) {
            e.preventDefault();
            navigateTo(routeEl.dataset.route);
            // Close mobile menu on navigation
            document.querySelector('.nav-menu').classList.remove('active');
            // Close dropdowns
            document.querySelectorAll('.nav-item.has-dropdown.active').forEach(el => el.classList.remove('active'));
        }
    });
}

// MINECODE LANDING PAGE (Logged Out View) - CODEDEX-INSPIRED ANIMATION
function renderLandingPage() {
    const mainContent = document.getElementById('main-content');
    const sidebar = document.querySelector('.sidebar');
    const rightSidebar = document.querySelector('.right-sidebar');

    // Hide sidebars for full-screen landing
    if (sidebar) sidebar.style.display = 'none';
    if (rightSidebar) rightSidebar.style.display = 'none';

    mainContent.innerHTML = `
        <div class="hero-pixel-scene">
            <!-- Background Video -->
            <video id="landing-video-bg" class="video-bg" autoplay muted loop playsinline>
                <source src="./assets/_looped_video_1080p_202512201349.mp4" type="video/mp4">
            </video>
            
            <!-- Radial overlay for better center focus -->
            <div class="overlay-gradient"></div>
            
            <!-- Hero Content - Full Screen Centered Area -->
            <div class="hero-content-wrapper">
                <div class="hero-text-box">
                    <div class="hero-start-text">START YOUR</div>
                    
                    <!-- Main Animated Title - MASSIVE -->
                    <div class="hero-adventure-container">
                        <div class="hero-adventure-line">
                            ${animateText('Coding', 0)}
                        </div>
                        <div class="hero-adventure-line">
                            ${animateText('Adventure', 0.8)}
                        </div>
                    </div>
                    
                    <p class="hero-subtitle">
                        Learn to code the fun way with interactive lessons,<br>
                        real projects, and a supportive community.
                    </p>
                    
                    <div class="hero-buttons">
                        <button class="btn-nes-primary" onclick="navigateTo('signup')">
                            START FOR FREE
                        </button>
                        <button class="btn-nes-secondary" onclick="navigateTo('courses')">
                            EXPLORE COURSES
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Features Section -->
        <div class="features-section" style="background: var(--bg-deep); padding: 80px 24px;">
            <div style="max-width: 1100px; margin: 0 auto;">
                <div style="text-align: center; margin-bottom: 60px;">
                    <h2 style="font-family: 'Press Start 2P'; font-size: 18px; color: var(--text-bright); margin-bottom: 16px;">Why MineCode?</h2>
                    <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto;">A gamified learning experience that makes coding fun and addictive.</p>
                </div>
                
                <div class="features-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px;">
                    <div class="feature-card cyber-card" style="padding: 32px; text-align: center;">
                        <div style="font-size: 48px; margin-bottom: 16px;">🎮</div>
                        <h3 style="font-family: 'Press Start 2P'; font-size: 12px; color: var(--text-bright); margin-bottom: 12px;">Gamified Learning</h3>
                        <p style="color: var(--text-secondary); font-size: 14px;">Earn XP, unlock badges, and level up as you complete lessons.</p>
                    </div>
                    <div class="feature-card cyber-card" style="padding: 32px; text-align: center;">
                        <div style="font-size: 48px; margin-bottom: 16px;">💻</div>
                        <h3 style="font-family: 'Press Start 2P'; font-size: 12px; color: var(--text-bright); margin-bottom: 12px;">Code in Browser</h3>
                        <p style="color: var(--text-secondary); font-size: 14px;">No setup required. Write and run code directly in your browser.</p>
                    </div>
                    <div class="feature-card cyber-card" style="padding: 32px; text-align: center;">
                        <div style="font-size: 48px; margin-bottom: 16px;">🏆</div>
                        <h3 style="font-family: 'Press Start 2P'; font-size: 12px; color: var(--text-bright); margin-bottom: 12px;">Real Projects</h3>
                        <p style="color: var(--text-secondary); font-size: 14px;">Build portfolio-worthy projects like games, apps, and websites.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Courses Preview Section -->
        <div class="landing-courses-preview" style="background: var(--bg-panel); padding: 80px 24px;">
            <div class="landing-section-header" style="text-align: center; margin-bottom: 48px;">
                <h2 style="font-family: 'Press Start 2P', monospace; font-size: 18px; color: var(--text-bright); margin-bottom: 16px;">
                    Journey through the world of programming
                </h2>
                <p style="font-family: var(--font-body); color: var(--text-secondary); max-width: 500px; margin: 0 auto;">
                    Learn to code with fun, interactive courses handcrafted by industry experts.
                </p>
            </div>
            
            <div id="landing-grid" class="section-grid-3" style="max-width: 1100px; margin: 0 auto;">
                <!-- Courses injected here -->
            </div>
            
            <div style="text-align: center; margin-top: 48px;">
                <button class="btn-nes-primary btn-nes-cyan" onclick="navigateTo('signup')">
                    Explore All Courses
                </button>
            </div>
        </div>

        <!-- CTA Section -->
        <div class="cta-section" style="background: linear-gradient(135deg, #0a0e17 0%, #1a1a2e 100%); padding: 100px 24px; text-align: center;">
            <h2 style="font-family: 'Press Start 2P'; font-size: 22px; color: var(--text-bright); margin-bottom: 16px;">Ready to Start?</h2>
            <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 32px auto; font-size: 16px;">
                Join thousands of learners and begin your coding journey today. It's free!
            </p>
            <button class="btn-nes-primary" onclick="navigateTo('signup')" style="font-size: 14px; padding: 16px 32px;">
                🚀 START LEARNING NOW
            </button>
        </div>

        <!-- Footer -->
        <footer class="landing-footer" style="background: #0a0b10; padding: 60px 24px 30px; border-top: 1px solid var(--border-subtle);">
            <div style="max-width: 1100px; margin: 0 auto;">
                <div class="footer-grid" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px;">
                    <!-- Brand -->
                    <div>
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                            <span style="font-size: 28px;">⛏️</span>
                            <span style="font-family: 'Press Start 2P'; font-size: 14px; color: var(--text-bright);">MINECODE</span>
                        </div>
                        <p style="color: var(--text-muted); font-size: 13px; line-height: 1.6; max-width: 280px;">
                            The gamified way to learn coding. Earn XP, collect badges, and build real projects.
                        </p>
                    </div>
                    
                    <!-- Learn -->
                    <div>
                        <h4 style="color: var(--text-bright); font-size: 12px; margin-bottom: 16px;">LEARN</h4>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="margin-bottom: 8px;"><a href="#" onclick="navigateTo('courses')" style="color: var(--text-muted); font-size: 13px; text-decoration: none;">All Courses</a></li>
                            <li style="margin-bottom: 8px;"><a href="#" onclick="navigateTo('practice')" style="color: var(--text-muted); font-size: 13px; text-decoration: none;">Practice</a></li>
                            <li style="margin-bottom: 8px;"><a href="#" onclick="navigateTo('builds')" style="color: var(--text-muted); font-size: 13px; text-decoration: none;">Projects</a></li>
                        </ul>
                    </div>
                    
                    <!-- Community -->
                    <div>
                        <h4 style="color: var(--text-bright); font-size: 12px; margin-bottom: 16px;">COMMUNITY</h4>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="margin-bottom: 8px;"><a href="#" onclick="navigateTo('community')" style="color: var(--text-muted); font-size: 13px; text-decoration: none;">Forum</a></li>
                            <li style="margin-bottom: 8px;"><a href="#" style="color: var(--text-muted); font-size: 13px; text-decoration: none;">Discord</a></li>
                            <li style="margin-bottom: 8px;"><a href="#" style="color: var(--text-muted); font-size: 13px; text-decoration: none;">Twitter/X</a></li>
                        </ul>
                    </div>
                    
                    <!-- Company -->
                    <div>
                        <h4 style="color: var(--text-bright); font-size: 12px; margin-bottom: 16px;">COMPANY</h4>
                        <ul style="list-style: none; padding: 0; margin: 0;">
                            <li style="margin-bottom: 8px;"><a href="#" style="color: var(--text-muted); font-size: 13px; text-decoration: none;">About</a></li>
                            <li style="margin-bottom: 8px;"><a href="#" style="color: var(--text-muted); font-size: 13px; text-decoration: none;">Blog</a></li>
                            <li style="margin-bottom: 8px;"><a href="#" style="color: var(--text-muted); font-size: 13px; text-decoration: none;">Contact</a></li>
                        </ul>
                    </div>
                </div>
                
                <!-- Bottom Bar -->
                <div style="border-top: 1px solid var(--border-subtle); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                    <p style="color: var(--text-muted); font-size: 12px; margin: 0;">© 2025 MineCode. Made with ❤️ for coders.</p>
                    <div style="display: flex; gap: 24px;">
                        <a href="#" style="color: var(--text-muted); font-size: 12px; text-decoration: none;">Privacy</a>
                        <a href="#" style="color: var(--text-muted); font-size: 12px; text-decoration: none;">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    `;

    // Play video
    const v = document.getElementById('landing-video-bg');
    if (v) v.play().catch(e => console.log('Autoplay blocked:', e));

    // Initialize Rain Effect
    if (window.RainEffect) {
        setTimeout(() => window.RainEffect.init(), 200);
    }

    // Inject courses
    const featuredCourses = COURSES.filter(c => ['python', 'html', 'javascript'].includes(c.id));
    const grid = document.getElementById('landing-grid');

    if (grid) {
        grid.innerHTML = featuredCourses.map((c, i) => {
            const bgStyle = c.image
                ? `background-image: url('${c.image}'); background-size: cover; background-position: center;`
                : `background: ${c.gradient};`;

            return `
            <div class="course-card cyber-card" onclick="navigateTo('course-${c.id}')" style="cursor: pointer; animation: fadeInUp 0.6s ease-out ${0.1 * i}s both;">
                <div class="course-card-image" style="${bgStyle}; height: 180px; border-radius: 8px 8px 0 0;"></div>
                <div class="course-card-content" style="padding: 16px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <h3 style="font-family: 'Press Start 2P', monospace; font-size: 11px; color: var(--text-bright); margin: 0;">${c.title}</h3>
                        <span class="course-pill" style="font-family: 'Press Start 2P'; font-size: 8px;">${c.difficulty}</span>
                    </div>
                    <p style="font-family: var(--font-body); font-size: 13px; color: var(--text-secondary); margin-top: 8px; line-height: 1.5;">${c.desc}</p>
                </div>
            </div>
            `;
        }).join('');

        if (window.TiltEffect) setTimeout(() => window.TiltEffect.init('.course-card', { max: 8, speed: 400 }), 100);
    }

    // Show toast demo
    if (window.showToast) {
        setTimeout(() => showToast('Welcome to MineCode! 🎮', 'info'), 1500);
    }
}


// SIGN UP PAGE - CODEDEX INSPIRED
function renderSignupPage() {
    const contentHTML = `
        <div style="
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            background: linear-gradient(180deg, #0a0e17 0%, #0d1117 50%, #161b22 100%);
            position: relative;
            overflow: hidden;
        ">
            <!-- Pixel Stars Background -->
            <div style="position: absolute; inset: 0; background-image: 
                radial-gradient(2px 2px at 10% 20%, rgba(255,255,255,0.3), transparent),
                radial-gradient(2px 2px at 30% 15%, rgba(255,255,255,0.2), transparent),
                radial-gradient(2px 2px at 50% 25%, rgba(255,255,255,0.4), transparent),
                radial-gradient(2px 2px at 70% 10%, rgba(255,255,255,0.2), transparent),
                radial-gradient(2px 2px at 90% 30%, rgba(255,255,255,0.3), transparent),
                radial-gradient(1px 1px at 20% 80%, rgba(255,255,255,0.2), transparent),
                radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,0.3), transparent);
                pointer-events: none;
            "></div>

            <!-- Mascot with Speech Bubble (Clean Icons) -->
            <div style="display: flex; align-items: flex-end; gap: 16px; margin-bottom: -20px; z-index: 10;">
                <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #22d3ee, #06b6d4); border-radius: 16px; display: flex; align-items: center; justify-content: center; box-shadow: 4px 4px 0 rgba(0,0,0,0.3); animation: bounce 2s ease-in-out infinite;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" x2="8" y1="16" y2="16"/><line x1="16" x2="16" y1="16" y2="16"/></svg>
                </div>
                <div style="
                    background: white;
                    color: #1a1a2e;
                    padding: 12px 20px;
                    border-radius: 16px;
                    font-size: 14px;
                    font-weight: 600;
                    position: relative;
                    box-shadow: 4px 4px 0 rgba(0,0,0,0.3);
                    max-width: 260px;
                ">
                    Create an account to save your progress!
                    <div style="position: absolute; left: -8px; bottom: 12px; width: 0; height: 0; border: 8px solid transparent; border-right-color: white;"></div>
                </div>
            </div>
            
            <!-- Auth Card (NES Style with Cyber Glow) -->
            <div style="
                background: #0d1117;
                border: 4px solid #30363d;
                border-radius: 16px;
                padding: 40px;
                max-width: 420px;
                width: 100%;
                position: relative;
                box-shadow: 
                    8px 8px 0 rgba(0,0,0,0.4),
                    0 0 40px rgba(34, 211, 238, 0.1);
            ">
                <!-- Inner Glow Border -->
                <div style="position: absolute; inset: 4px; border: 1px solid rgba(34, 211, 238, 0.15); border-radius: 12px; pointer-events: none;"></div>
                
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 28px;">
                    <h1 style="font-family: var(--font-display); font-size: 24px; color: white; margin-bottom: 8px;">Join MineCode</h1>
                    <p style="color: #8b949e; font-size: 15px;">Start your coding adventure today</p>
                </div>

                <!-- GitHub Button (Primary) -->
                <button onclick="alert('GitHub OAuth coming soon!')" style="
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    padding: 14px 24px;
                    background: #238636;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    box-shadow: 0 4px 0 #1a7f37;
                    transition: all 0.15s;
                    margin-bottom: 20px;
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 0 #1a7f37'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 0 #1a7f37'" onmousedown="this.style.transform='translateY(2px)'; this.style.boxShadow='0 2px 0 #1a7f37'">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    Continue with GitHub
                </button>

                <!-- Divider -->
                <div style="display: flex; align-items: center; gap: 16px; margin: 20px 0; color: #6e7681; font-size: 13px;">
                    <div style="flex: 1; height: 1px; background: #30363d;"></div>
                    <span>or</span>
                    <div style="flex: 1; height: 1px; background: #30363d;"></div>
                </div>

                <!-- Email Input -->
                <div style="margin-bottom: 16px;">
                    <label style="display: block; font-size: 14px; color: #8b949e; margin-bottom: 8px; font-weight: 500;">Email</label>
                    <input type="email" placeholder="you@example.com" style="
                        width: 100%;
                        padding: 12px 14px;
                        background: #010409;
                        border: 1px solid #30363d;
                        border-radius: 6px;
                        color: white;
                        font-size: 15px;
                        outline: none;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='#58a6ff'; this.style.boxShadow='0 0 0 3px rgba(88,166,255,0.15)'" onblur="this.style.borderColor='#30363d'; this.style.boxShadow='none'">
                </div>

                <!-- Password Input -->
                <div style="margin-bottom: 24px;">
                    <label style="display: block; font-size: 14px; color: #8b949e; margin-bottom: 8px; font-weight: 500;">Password</label>
                    <input type="password" placeholder="At least 8 characters" style="
                        width: 100%;
                        padding: 12px 14px;
                        background: #010409;
                        border: 1px solid #30363d;
                        border-radius: 6px;
                        color: white;
                        font-size: 15px;
                        outline: none;
                        box-sizing: border-box;
                    " onfocus="this.style.borderColor='#58a6ff'; this.style.boxShadow='0 0 0 3px rgba(88,166,255,0.15)'" onblur="this.style.borderColor='#30363d'; this.style.boxShadow='none'">
                </div>

                <!-- Submit Button -->
                <button onclick="navigateTo('home')" style="
                    width: 100%;
                    padding: 14px;
                    background: linear-gradient(180deg, #22d3ee 0%, #06b6d4 100%);
                    color: #000;
                    border: none;
                    border-radius: 8px;
                    font-family: var(--font-display);
                    font-size: 13px;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 4px 0 #0891b2;
                    transition: all 0.15s;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 0 #0891b2'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 0 #0891b2'" onmousedown="this.style.transform='translateY(2px)'; this.style.boxShadow='0 2px 0 #0891b2'">
                    Sign Up Free
                </button>

                <!-- Guest Access -->
                <button onclick="loginAsGuest()" style="
                    width: 100%;
                    padding: 12px;
                    margin-top: 12px;
                    background: transparent;
                    color: #8b949e;
                    border: 2px dashed #30363d;
                    border-radius: 8px;
                    font-family: var(--font-body);
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s;
                " onmouseover="this.style.borderColor='#8b949e'; this.style.color='white'" onmouseout="this.style.borderColor='#30363d'; this.style.color='#8b949e'">
                    <i data-lucide="ghost" style="width: 14px; height: 14px; vertical-align: middle; margin-right: 6px; display: inline-block;"></i>
                    Continue as Guest
                </button>

                <!-- Footer -->
                <div style="text-align: center; margin-top: 20px; font-size: 14px; color: #6e7681;">
                    Already have an account? <a href="#" onclick="navigateTo('home')" style="color: #58a6ff; text-decoration: none; font-weight: 500;">Log in</a>
                </div>
            </div>
        </div>
        
        <style>
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
            }
        </style>
    `;

    document.getElementById('main-content').innerHTML = contentHTML;
}

// HOME DASHBOARD (Logged In) - CYBER FUTURISTIC CODEDEX STYLE
// HOME DASHBOARD (Logged In) - CYBER FUTURISTIC CODEDEX STYLE
function renderHomeDashboard() {
    console.log(" [SYSTEM] renderHomeDashboard called");
    try {
        // Force 1-column layout for dashboard to allow breakout hero
        const mainLayout = document.getElementById('main-layout');
        if (mainLayout) {
            mainLayout.style.display = 'block';
            mainLayout.style.maxWidth = 'none';
            mainLayout.style.margin = '0';
            mainLayout.style.padding = '72px 0 0 0';
            // We removed the 100vw hack - the container will handle alignment now
        }

        const rightSidebar = document.querySelector('.right-sidebar');
        if (rightSidebar) rightSidebar.style.display = 'none';

        // ASSETS
        const bannerArt = "./assets/pixel_art/cyber_cozy_lofi_lounge_panoramic.png";
        const pythonArt = "./assets/pixel_art/python.png";
        const jsArt = "./assets/pixel_art/js.png";

        const dashboardHTML = `
        <!-- TOP ZONE: FULL WIDTH -->
        <div class="dashboard-top-zone fade-in-up" style="width: 100%; overflow: hidden;">
            <!-- BREADCRUMBS -->
            <div id="dashboard-breadcrumbs" class="breadcrumbs" style="margin-bottom: 20px; padding: 0 32px;"></div>

            <!-- MASCOT TIP BAR -->
            <div class="cyber-tip-bar" style="margin: 0 32px 24px 32px;">
                <div class="tip-mascot"><i data-lucide="bot" style="width:28px;height:28px;color:#22d3ee;"></i></div>
                <div class="tip-content">
                    <span class="tip-badge">NEW</span>
                    <span>Intermediate Python is out now! Start your journey deeper into the code.</span>
                </div>
                <button class="tip-dismiss" data-tooltip="Dismiss Tip" style="padding: 8px; margin-right: -8px;">✕</button>
            </div>

            <!-- FULL SCREEN HERO SUCCESSOR -->
            <div class="hero-pixel-scene" style="height: 80vh; min-height: 600px; margin-bottom: 40px; width: 100%;">
                    <!-- Background Video -->
                    <video id="dashboard-video-bg" class="video-bg" autoplay muted loop playsinline>
                        <source src="./assets/_looped_video_1080p_202512201349.mp4" type="video/mp4">
                    </video>
                    
                    <div class="overlay-gradient"></div>
                    
                    <div class="hero-content-wrapper">
                        <div class="hero-text-box" style="padding: 20px;">
                            <div class="hero-start-text">START YOUR</div>
                            
                            <div class="hero-adventure-container">
                                <div class="hero-adventure-line">
                                    ${animateText('Coding', 0)}
                                </div>
                                <div class="hero-adventure-line">
                                    ${animateText('Adventure', 0.8)}
                                </div>
                            </div>
                            
                            <p class="hero-subtitle" style="margin-top: 24px; font-size: 16px;">
                                Your coding journey awaits. Choose your path and start building.
                            </p>
                            
                            <div class="hero-buttons" style="margin-top: 32px;">
                                <button class="btn-nes-primary" onclick="navigateTo('courses')">
                                    ACCESS PROTOCOLS
                                </button>
                                <button class="btn-nes-secondary" onclick="navigateTo('practice')">
                                    ENTER FORGE
                                </button>
                            </div>
                        </div>
                </div> <!-- Close hero-content-wrapper -->
            </div> <!-- Close hero-pixel-scene -->
        </div> <!-- Close dashboard-top-zone -->

        <!-- BOTTOM ZONE: GRID WITH SIDEBAR -->
        <div class="cyber-dashboard fade-in-up" style="max-width: 1400px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 32px); animation-delay: 0.1s;">
            <div class="dash-main">
                <div class="dash-content-container" style="padding: 40px 0;">
                    <!-- SECTORS SECTION -->
                    <div class="section-header">
                        <h2 class="section-title"><span class="title-accent">//</span> SECTORS</h2>
                    </div>
                    <!-- CHANGED: Use section-grid-4 for responsive full-width layout -->
                    <div class="section-grid-4">
                        <div class="cyber-cozy-card" onclick="navigateTo('practice')" style="--card-accent: #00f5ff; width: 100%;">
                            <div class="card-icon"><i data-lucide="hammer" style="width:32px;height:32px;"></i></div>
                            <div class="card-label">FORGE</div>
                            <h3>Logic Shards</h3>
                            <p>Refine your core skills with algorithmic challenges</p>
                        </div>
                        <div class="cyber-cozy-card" onclick="navigateTo('builds')" style="--card-accent: #a855f7; width: 100%;">
                            <div class="card-icon"><i data-lucide="layers" style="width:32px;height:32px;"></i></div>
                            <div class="card-label">FABRICATE</div>
                            <h3>System Blueprints</h3>
                            <p>Construct complex architectures step by step</p>
                        </div>
                        <div class="cyber-cozy-card" onclick="navigateTo('community')" style="--card-accent: #4ade80; width: 100%;">
                            <div class="card-icon"><i data-lucide="activity" style="width:32px;height:32px;"></i></div>
                            <div class="card-label">PULSE</div>
                            <h3>#MinePulse30</h3>
                            <p>Maintain your operational coding streak</p>
                        </div>
                        <div class="cyber-cozy-card" onclick="navigateTo('community')" style="--card-accent: #ffc800; width: 100%;">
                            <div class="card-icon"><i data-lucide="archive" style="width:32px;height:32px;"></i></div>
                            <div class="card-label">NEXUS</div>
                            <h3>The Armory</h3>
                            <p>Inspect community-built components and tools</p>
                        </div>
                    </div>

                    <!-- ACTIVE PROTOCOLS -->
                    <div class="section-header">
                        <h2 class="section-title"><span class="title-accent">//</span> ACTIVE PROTOCOLS</h2>
                        <a href="#" class="section-link" onclick="navigateTo('courses')">View All →</a>
                    </div>
                    <div class="cyber-course-row">
                        <div class="cyber-course-card" onclick="navigateTo('course-python')">
                            <div class="course-image" style="background-image: url('${pythonArt}');"></div>
                            <div class="course-info">
                                <span class="course-language">PYTHON</span>
                                <h4>The Legend of Python</h4>
                                <div class="course-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 44%;"></div>
                                    </div>
                                    <span class="progress-text">44% Complete</span>
                                </div>
                            </div>
                        </div>
                        <div class="cyber-course-card" onclick="navigateTo('course-js')">
                            <div class="course-image" style="background-image: url('${jsArt}');"></div>
                            <div class="course-info">
                                <span class="course-language">JAVASCRIPT</span>
                                <h4>JavaScript Origins</h4>
                                <div class="course-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 12%;"></div>
                                    </div>
                                    <span class="progress-text">12% Complete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SIDEBAR -->
            <div class="dash-sidebar">
                <!-- USER PROFILE WIDGET -->
                <div class="cyber-widget cyber-profile">
                    <div class="profile-header">
                        <div class="profile-avatar">
                            <i data-lucide="user" style="width:24px;height:24px;color:#22d3ee;"></i>
                            <div class="avatar-ring"></div>
                        </div>
                        <div class="profile-info">
                            <h4>${GameState.data.user.name}</h4>
                            <div class="profile-level">
                                <span class="level-badge">LVL ${GameState.data.user.level}</span>
                                <span class="xp-text" id="stat-xp">${GameState.data.user.xp} XP</span>
                            </div>
                        </div>
                    </div>
                    <div class="profile-xp-bar">
                        <div class="xp-fill" style="width: ${(GameState.data.user.xp % 1000) / 10}%;"></div>
                    </div>
                    <div class="profile-stats">
                        <div class="stat-item">
                            <span class="stat-value" id="stat-streak">${GameState.data.user.streak}</span>
                            <span class="stat-label">Streak <i data-lucide="flame" style="width:14px;height:14px;color:#f97316;"></i></span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">0</span>
                            <span class="stat-label">Badges</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">0</span>
                            <span class="stat-label">Projects</span>
                        </div>
                    </div>
                    <button class="cyber-btn cyber-btn-secondary full-width" onclick="navigateTo('courses')">
                        View Profile
                    </button>
                </div>

                <!-- EVENTS WIDGET -->
                <div class="cyber-widget">
                    <h4 class="widget-title">
                        <i data-lucide="calendar" style="width:18px;height:18px;color:#a855f7;"></i> Upcoming Events
                    </h4>
                    <div class="cyber-event">
                        <div class="event-date-box">
                            <span class="event-month">DEC</span>
                            <span class="event-day">22</span>
                        </div>
                        <div class="event-details">
                            <h5>Game Jam 2025</h5>
                            <p>10:00 AM EST</p>
                        </div>
                    </div>
                    <div class="cyber-event">
                        <div class="event-date-box">
                            <span class="event-month">JAN</span>
                            <span class="event-day">05</span>
                        </div>
                        <div class="event-details">
                            <h5>Python Workshop</h5>
                            <p>2:00 PM EST</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    `;

        document.getElementById('main-content').innerHTML = dashboardHTML;

        // Initialize 3D Tilt on Home Cards
        if (window.TiltEffect) {
            window.TiltEffect.init('.cyber-cozy-card', { max: 10, speed: 400 });
            window.TiltEffect.init('.cyber-course-card', { max: 5, speed: 400 });
            window.TiltEffect.init('.cyber-widget', { max: 2, scale: 1.01 });
        }

        // Initialize Breadcrumbs
        if (window.UIComponents) {
            window.UIComponents.renderBreadcrumbs(
                [{ label: 'Home', route: 'landing' }, { label: 'Dashboard', route: 'home' }],
                'dashboard-breadcrumbs'
            );
        }

        // Initialize Lucide Icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    } catch (e) {
        console.error(" [FATAL] renderHomeDashboard CRASHED:", e);
    }
}


function navigateTo(route) {
    const sidebar = document.querySelector('.right-sidebar');
    const mainLayout = document.getElementById('main-layout');

    // Default Layout State (Authenticated)
    if (sidebar) sidebar.style.display = 'flex';
    if (mainLayout) {
        mainLayout.style.display = 'grid';
        mainLayout.style.gridTemplateColumns = '1fr 320px'; // Restore original grid
    }

    // Stop specific module loops if leaving their page
    if (window.App && window.App.Community && route !== 'community') {
        window.App.Community.stopSimulation();
    }

    // Hide all views first
    document.querySelectorAll('.view, #courses-view, #course-view, #profile-view').forEach(v => v.classList.add('hidden'));

    // Handle Routes
    if (route === 'profile') {
        const profileView = document.getElementById('profile-view');
        if (profileView) {
            profileView.classList.remove('hidden');
            renderProfile();
        }
    } else if (route === 'landing') {
        if (sidebar) sidebar.style.display = 'none';
        if (mainLayout) mainLayout.style.display = 'block';
        renderLandingPage();
        // Initialize rain effect after DOM update
        requestAnimationFrame(() => {
            if (document.getElementById('rain-canvas')) {
                new RainEffect();
            }
        });
    } else if (route === 'signup') {
        if (sidebar) sidebar.style.display = 'none';
        if (mainLayout) mainLayout.style.display = 'block';
        renderSignupPage();
    } else if (route === 'home') {
        // HOME DASHBOARD LAYOUT
        if (sidebar) sidebar.style.display = 'none'; // Custom sidebar in dashboard
        if (mainLayout) mainLayout.style.display = 'block'; // Full width container
        window.scrollTo(0, 0);
        renderHomeDashboard();
    } else if (route === 'courses') {
        if (mainLayout) mainLayout.style.display = 'none';
        document.getElementById('courses-view').classList.remove('hidden');
        window.scrollTo(0, 0); // Scroll to top
        renderCoursesCatalog();
    } else if (route === 'practice') {
        // PRACTICE PAGE (Challenge Packs)
        if (sidebar) sidebar.style.display = 'none';
        if (mainLayout) mainLayout.style.display = 'block';
        renderPracticePage();
    } else if (route === 'builds') {
        // BUILDS PAGE (User Projects)
        if (sidebar) sidebar.style.display = 'none';
        if (mainLayout) mainLayout.style.display = 'block';
        renderBuildsPage();
    } else if (route === 'community') {
        // COMMUNITY PAGE (Updated 3-column layout)
        if (sidebar) sidebar.style.display = 'none';
        if (mainLayout) mainLayout.style.display = 'block';
        renderCommunityPage();
    } else if (route.startsWith('course-')) {
        if (mainLayout) mainLayout.style.display = 'none';
        document.getElementById('course-view').classList.remove('hidden');
        renderCourseRoadmap(route.replace('course-', ''));
    } else if (route.startsWith('lesson-')) {
        if (sidebar) sidebar.style.display = 'none';
        if (mainLayout) mainLayout.style.display = 'block';
        renderLessonView(route.replace('lesson-', ''));
    }
}

// ============== NEW PAGE RENDERERS ==============

// CHALLENGE PACKS DATA
const CHALLENGE_PACKS = [
    { id: 'py-basics', title: 'Python Basics', icon: 'pixel-icon-script', color: '#3572A5', concepts: ['Variables', 'Print', 'Input'], difficulty: 'BEGINNER' },
    { id: 'py-control', title: 'Control Flow', icon: 'pixel-icon-sliders', color: '#3572A5', concepts: ['If/Else', 'Loops', 'Break'], difficulty: 'BEGINNER' },
    { id: 'py-functions', title: 'Functions', icon: 'pixel-icon-zap', color: '#3572A5', concepts: ['Def', 'Return', 'Parameters'], difficulty: 'INTERMEDIATE' },
    { id: 'js-basics', title: 'JavaScript Basics', icon: 'pixel-icon-coffee', color: '#f7df1e', concepts: ['Variables', 'Console', 'Types'], difficulty: 'BEGINNER' },
    { id: 'js-dom', title: 'DOM Manipulation', icon: 'pixel-icon-globe', color: '#f7df1e', concepts: ['Select', 'Events', 'Modify'], difficulty: 'INTERMEDIATE' },
    { id: 'html-struct', title: 'HTML Structure', icon: 'pixel-icon-layout', color: '#e34c26', concepts: ['Tags', 'Attributes', 'Semantic'], difficulty: 'BEGINNER' },
];

// PRACTICE PAGE
function renderPracticePage() {
    const bannerArt = "./assets/pixel_art/ChatGPT Image Dec 20, 2025, 09_33_16 AM.png";

    const html = `
        <div class="page-container" style="max-width: 1200px; margin: 0 auto; padding: 24px;">
            <div class="page-banner" style="background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${bannerArt}'); background-size: cover; background-position: center; border-radius: 24px; padding: 60px 40px; margin-bottom: 32px;">
                <h1 style="font-family: 'Press Start 2P'; font-size: 28px; margin-bottom: 16px;">Challenge Packs</h1>
                <p style="color: var(--text-secondary); max-width: 500px;">Practice with bite-sized challenges to sharpen your skills.</p>
            </div>

            <div class="filter-tabs" style="display: flex; gap: 12px; margin-bottom: 24px;">
                <button class="filter-tab active" style="background: var(--neon-cyan); color: #000; padding: 10px 20px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer;">All</button>
                <button class="filter-tab" style="background: var(--bg-card); color: var(--text-secondary); padding: 10px 20px; border-radius: 8px; border: 1px solid var(--border-subtle); cursor: pointer;">Python</button>
                <button class="filter-tab" style="background: var(--bg-card); color: var(--text-secondary); padding: 10px 20px; border-radius: 8px; border: 1px solid var(--border-subtle); cursor: pointer;">JavaScript</button>
                <button class="filter-tab" style="background: var(--bg-card); color: var(--text-secondary); padding: 10px 20px; border-radius: 8px; border: 1px solid var(--border-subtle); cursor: pointer;">HTML/CSS</button>
            </div>

            <div class="challenge-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
                ${CHALLENGE_PACKS.map(pack => {
        const iconHtml = pack.icon.startsWith('pixel-icon-')
            ? `<img src="https://unpkg.com/pixelarticons@1.8.1/svg/${pack.icon.replace('pixel-icon-', '')}.svg" style="width: 40px; height: 40px; filter: brightness(0) invert(1);" alt="${pack.title}">`
            : pack.icon;
        return `
                    <div class="challenge-card" style="background: linear-gradient(135deg, ${pack.color}22, ${pack.color}11); border: 1px solid ${pack.color}44; border-radius: 16px; padding: 24px; cursor: pointer; transition: transform 0.2s, border-color 0.2s;">
                        <div style="font-size: 40px; margin-bottom: 16px;">${iconHtml}</div>
                        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">${pack.title}</h3>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
                            ${pack.concepts.map(c => `<span style="background: ${pack.color}33; color: ${pack.color}; padding: 4px 10px; border-radius: 20px; font-size: 11px;">${c}</span>`).join('')}
                        </div>
                        <span class="course-pill" style="background: var(--bg-deep);">${pack.difficulty}</span>
                    </div>
                `}).join('')}
            </div>
        </div>
        `;

    document.getElementById('main-content').innerHTML = html;
}

// PROFILE PAGE
function renderProfilePage() {
    const user = GameState.data.user;
    const nextLevelXP = user.level * 1000;
    const progressPercent = Math.min(100, Math.floor((user.xp / nextLevelXP) * 100));

    // Mock Badges Data
    const badges = [
        { id: 'b1', icon: 'pixel-icon-zap', title: 'First Code', unlocked: true },
        { id: 'b2', icon: 'pixel-icon-fire', title: 'On Fire', unlocked: user.streak > 2 },
        { id: 'b3', icon: 'pixel-icon-trophy', title: 'Champion', unlocked: user.level >= 5 },
        { id: 'b4', icon: 'pixel-icon-heart', title: 'Community', unlocked: false },
        { id: 'b5', icon: 'pixel-icon-script', title: 'Pythonista', unlocked: true },
        { id: 'b6', icon: 'pixel-icon-device-laptop', title: 'Builder', unlocked: false }
    ];

    const html = `
        <div class="profile-container" style="position: relative;">
            <button class="neon-back-btn" onclick="navigateTo('home')" style="top: -60px; left: 0;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Home
            </button>
            <div class="profile-header-large cyber-card">
                <div class="profile-avatar-large">
                    <img src="./assets/avatars/avatar-1.png" style="width: 80%; opacity: 0.8;" onerror="this.src=''; this.style.display='none'">
                    <i data-lucide="user" style="width: 48px; height: 48px; color: var(--neon-cyan); display: ${user.avatar ? 'none' : 'block'};"></i>
                </div>
                <div class="profile-info-large">
                    <h1>${user.name}</h1>
                    <span class="profile-role">${user.title}</span>
                    <div class="level-progress-large">
                        <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px; color: var(--text-secondary);">
                            <span>LVL ${user.level}</span>
                            <span>${user.xp} / ${nextLevelXP} XP</span>
                        </div>
                        <div class="progress-bar-bg">
                            <div class="progress-fill" style="width: ${progressPercent}%"></div>
                        </div>
                    </div>
                </div>
            </div>

            <h2 class="section-title">BADGES</h2>
            <div class="badge-grid">
                ${badges.map(b => {
        const iconHtml = b.icon.startsWith('pixel-icon-')
            ? `<img src="https://unpkg.com/pixelarticons@1.8.1/svg/${b.icon.replace('pixel-icon-', '')}.svg" style="width: 32px; height: 32px; filter: brightness(0) invert(1);" alt="${b.title}">`
            : `<i data-lucide="${b.icon}" style="width: 32px; height: 32px;"></i>`;

        return `
                    <div class="badge-item ${b.unlocked ? '' : 'locked'}">
                        <div class="badge-icon" style="color: ${b.unlocked ? 'var(--neon-gold)' : 'var(--text-muted)'}">
                           ${iconHtml}
                        </div>
                        <span style="font-size: 12px; font-weight: 600; color: ${b.unlocked ? 'white' : 'var(--text-muted)'}">${b.title}</span>
                    </div>
                `}).join('')}
            </div>

            <div style="margin-top: 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                 <div class="cyber-card" style="padding: 24px;">
                    <h3>STATS</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px;">
                        <div>
                            <div style="color: var(--text-secondary); font-size: 12px;">LESSONS</div>
                            <div style="font-size: 24px; color: var(--text-bright);">13</div>
                        </div>
                        <div>
                            <div style="color: var(--text-secondary); font-size: 12px;">STREAK</div>
                            <div style="font-size: 24px; color: var(--neon-orange);">${user.streak} 🔥</div>
                        </div>
                    </div>
                 </div>
                 <div class="cyber-card" style="padding: 24px;">
                    <h3>ACTIVITY</h3>
                    <ul style="list-style: none; padding: 0; margin-top: 16px; font-size: 13px; color: var(--text-secondary);">
                        <li style="margin-bottom: 8px;">Completed <strong>Python Basics</strong> lesson.</li>
                        <li style="margin-bottom: 8px;">Earned <strong>First Code</strong> badge.</li>
                        <li>Joined <strong>MineCode</strong>.</li>
                    </ul>
                 </div>
            </div>
        </div>
        `;

    document.getElementById('main-content').innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
}

// BUILDS PAGE
function renderBuildsPage() {
    const mascotArt = "./assets/pixel_art/ChatGPT Image Dec 20, 2025, 09_42_03 AM.png";

    const html = `
        <div class="page-container" style="max-width: 1000px; margin: 0 auto; padding: 24px; text-align: center;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
                <h1 style="font-family: 'Press Start 2P'; font-size: 24px;">Builds</h1>
                <button class="btn-home-cta" style="font-size: 12px; padding: 12px 24px;">+ New Build</button>
            </div>

            <div class="empty-state" style="padding: 80px 40px; background: var(--bg-card); border-radius: 24px; border: 1px dashed var(--border-subtle);">
                <img src="${mascotArt}" alt="Build character" style="width: 150px; height: 150px; object-fit: contain; margin-bottom: 24px; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3));">
                <h2 style="margin-bottom: 12px;">Build right here on MineCode</h2>
                <p style="color: var(--text-muted); max-width: 400px; margin: 0 auto 24px;">Share your code snippets, projects, and ideas with the community.</p>
                <button class="btn-cyber-primary" style="padding: 14px 32px;">Create Your First Build</button>
            </div>
        </div>
        `;

    document.getElementById('main-content').innerHTML = html;
}



// COMMUNITY PAGE (3-Column Layout)
async function renderCommunityPage() {
    // 1. Setup Skeleton Layout
    const html = `
        <div class="community-layout" style="display: grid; grid-template-columns: 250px 1fr 300px; gap: 24px; padding: 24px; max-width: 1400px; margin: 0 auto;">
            <!--Left Sidebar: Channels-->
            <div class="community-channels" style="background: var(--bg-card); border-radius: 16px; padding: 20px; border: 1px solid var(--border-subtle);">
                <h4 style="font-family: 'Press Start 2P'; font-size: 10px; color: var(--text-muted); margin-bottom: 16px;">CHANNELS</h4>
                <div id="channel-list" style="display: flex; flex-direction: column; gap: 8px;">
                    <!-- Channels injected here -->
                    <div class="skeleton-text short"></div>
                    <div class="skeleton-text short"></div>
                    <div class="skeleton-text short"></div>
                </div>
            </div>

            <!--Center: Feed-->
            <div class="community-feed">
                <!-- Post Creator -->
                <div class="cyber-card" style="padding: 16px; margin-bottom: 24px; border: 1px solid var(--border-subtle);">
                    <textarea id="post-input" placeholder="Share your code or thoughts..." style="width: 100%; background: var(--bg-deep); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 12px; color: white; font-family: 'Outfit'; font-size: 16px; margin-bottom: 12px; resize: none; min-height: 80px;"></textarea>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 12px; color: var(--text-muted);">Markdown supported</span>
                        <button id="post-btn" class="btn-cyber-primary" style="padding: 8px 24px;">POST</button>
                    </div>
                </div>

                <!-- Feed Filter -->
                <div style="display: flex; gap: 12px; margin-bottom: 24px;">
                    <button class="filter-tab active" style="background: var(--neon-cyan); color: #000; padding: 8px 16px; border-radius: 8px; border: none; font-weight: 600;">Latest</button>
                    <button class="filter-tab" style="background: var(--bg-card); color: var(--text-secondary); padding: 8px 16px; border-radius: 8px; border: 1px solid var(--border-subtle);">Top</button>
                </div>

                <!-- Post Stream -->
                <div id="post-feed" class="post-list" style="display: flex; flex-direction: column; gap: 16px;">
                    <!-- Posts injected here -->
                    <div class="text-center" style="padding: 40px; color: var(--text-muted);">Loading feed...</div>
                </div>
            </div>

            <!--Right Sidebar: News & Events-->
        <div class="community-sidebar">
            <div class="sidebar-widget" style="background: var(--bg-card); border-radius: 16px; padding: 20px; margin-bottom: 16px; border: 1px solid var(--border-subtle);">
                <h4 style="font-family: 'Press Start 2P'; font-size: 10px; color: var(--text-muted); margin-bottom: 16px;">MINECODE NEWS</h4>
                <div style="color: var(--text-secondary); font-size: 14px;">
                    <p style="margin-bottom: 12px;">🎉 Intermediate Python course is now live!</p>
                    <p>🚀 New Challenge Packs coming next week.</p>
                </div>
            </div>

            <div class="sidebar-widget" style="background: var(--bg-card); border-radius: 16px; padding: 20px; border: 1px solid var(--border-subtle);">
                <h4 style="font-family: 'Press Start 2P'; font-size: 10px; color: var(--text-muted); margin-bottom: 16px;">UPCOMING EVENTS</h4>
                <div class="event-item" style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                    <div style="background: var(--bg-deep); padding: 8px 12px; border-radius: 8px; text-align: center;">
                        <span style="display: block; font-size: 10px; color: var(--text-muted);">DEC</span>
                        <span style="font-size: 18px; font-weight: 700;">30</span>
                    </div>
                    <div>
                        <div style="font-weight: 600;">End of Year Jam</div>
                        <div style="font-size: 12px; color: var(--text-muted);">All Day Event</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `;

    document.getElementById('main-content').innerHTML = html;

    // 2. Fetch Data
    if (window.DB) {
        // Channels
        const channels = await window.DB.getChannels();
        renderChannels(channels);

        // Default to General (id 1 usually) or first fetch
        if (channels.length > 0) {
            loadChannelFeed(channels[0].id);
        } else {
            // Fallback if no channels exist yet
            document.getElementById('post-feed').innerHTML = '<div style="padding:20px;">No channels found. Please run seed script.</div>';
        }

        // Post Button Listener
        document.getElementById('post-btn').addEventListener('click', async () => {
            const content = document.getElementById('post-input').value;
            if (!content.trim()) return;

            // Assume active channel ID is stored or we default to the first one for now
            // For MVP, lets just grab the ID from the active DOM element or variable
            const activeChannelId = document.querySelector('.channel-item.active')?.dataset.id || 1;

            // Optimistic UI update could go here
            await window.DB.createPost(content, activeChannelId);
            document.getElementById('post-input').value = '';
        });
    }
}

function renderChannels(channels) {
    const container = document.getElementById('channel-list');
    if (!channels.length) return;

    container.innerHTML = channels.map(c => `
        <a href="#" class="channel-item ${c.slug === 'general' ? 'active' : ''}" data-id="${c.id}"
    onclick="loadChannelFeed(${c.id}); selectChannel(this);"
    style="display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 8px; text-decoration: none; transition: background 0.2s;">
            <span>${c.icon || '#'}</span> 
            <span style="text-transform: capitalize;">${c.name}</span>
        </a>
        `).join('');

    // Simple inline style strategy for active/inactive
    updateChannelStyles();
}

function selectChannel(el) {
    document.querySelectorAll('.channel-item').forEach(e => e.classList.remove('active'));
    el.classList.add('active');
    updateChannelStyles();
}

function updateChannelStyles() {
    document.querySelectorAll('.channel-item').forEach(el => {
        if (el.classList.contains('active')) {
            el.style.background = 'var(--neon-cyan)';
            el.style.color = '#000';
            el.style.fontWeight = '600';
        } else {
            el.style.background = 'transparent';
            el.style.color = 'var(--text-secondary)';
            el.style.fontWeight = '400';
        }
    });
}

async function loadChannelFeed(channelId) {
    const feed = document.getElementById('post-feed');
    feed.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-muted);">Loading posts...</div>';

    const posts = await window.DB.getChannelPosts(channelId);

    if (posts.length === 0) {
        feed.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--text-muted);">No posts yet. Be the first!</div>';
    } else {
        feed.innerHTML = ''; // Clear loading
        posts.forEach(post => renderPost(post));
    }

    // Subscribe to realtime
    window.DB.subscribeToChannel(channelId, (newPost) => {
        renderPost(newPost, true); // Prepend
    });
}

function renderPost(post, prepend = false) {
    const feed = document.getElementById('post-feed');
    const date = new Date(post.created_at).toLocaleDateString();

    const html = `
        <div class="post-card cyber-card" style="background: var(--bg-card); border-radius: 16px; padding: 20px; border: 1px solid var(--border-subtle); animation: fadeIn 0.5s;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div style="width: 40px; height: 40px; background: var(--bg-deep); border-radius: 50%; overflow: hidden;">
                     <img src="${post.author?.avatar_url || 'assets/default.png'}" style="width:100%; height:100%;">
                </div>
                <div>
                    <span style="font-weight: 600; color: var(--text-bright); display: block;">${post.author?.username || 'Unknown'}</span>
                    <span style="font-size: 11px; color: var(--text-muted);">${date}</span>
                </div>
                ${post.author?.level ? `<span class="badge badge-primary" style="margin-left:auto;">LVL ${post.author.level}</span>` : ''}
            </div>
            <div style="margin-bottom: 16px; font-family: 'Outfit'; font-size: 15px; line-height: 1.5; color: var(--text-secondary);">
                ${post.content}
            </div>
            <div style="display: flex; gap: 24px; color: var(--text-muted); font-size: 14px; border-top: 1px solid var(--border-subtle); padding-top: 12px;">
                <button class="btn-icon" style="background:none; border:none; color:inherit; cursor:pointer;">❤️ ${post.likes_count || 0}</button>
                <button class="btn-icon" style="background:none; border:none; color:inherit; cursor:pointer;">💬 Reply</button>
            </div>
        </div>
        `;

    const div = document.createElement('div');
    div.innerHTML = html;

    if (prepend) {
        feed.prepend(div.firstElementChild);
    } else {
        feed.appendChild(div.firstElementChild);
    }
}

// RENDER: Course Roadmap (Gamified with Clouds)
function renderCourseRoadmap(id) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    mainContent.innerHTML = '';

    // Find course data
    const course = COURSES.find(c => c.id === id);
    if (!course) {
        mainContent.innerHTML = `<div class="container text-center" style="padding:40px;">Course not found.</div>`;
        return;
    }

    // Get Progress
    const progress = GameState.data.progress[id] || { completedLessons: [] };
    const completedCount = progress.completedLessons.length;

    // Determine Current Level (Next Lesson Index)
    // If 0 completed, current is 0. If 1 completed, current is 1.
    const currentLevelIdx = completedCount;

    // GENERATE NODES (Mocking a path of 20 lessons for now)
    // In real app, this matches Curriculm length
    const totalNodes = 20;

    // Create Map Container
    const mapContainer = document.createElement('div');
    mapContainer.className = 'rpg-map-viewport';
    mapContainer.innerHTML = `
        <div class="rpg-map-overlay">
            <!-- Connection Lines (SVG) -->
            <svg class="map-connections" width="100%" height="100%" style="position:absolute; top:0; left:0; pointer-events:none; overflow:visible;">
                <!-- Lines generated by JS -->
            </svg>
        </div>
    `;

    // Generate Nodes Logic
    const nodes = [];
    const positions = generateSnakePath(totalNodes); // Helper to generate X,Y

    positions.forEach((pos, i) => {
        const node = document.createElement('div');
        node.className = 'map-node';
        node.style.left = `${pos.x}px`;
        node.style.top = `${pos.y}px`;

        // --- GAME STATES ---
        // 1. COMPLETED: Index < Current
        // 2. ACTIVE: Index == Current
        // 3. LOCKED: Index == Current + 1
        // 4. CLOUDED: Index > Current + 1

        let stateClass = '';
        let icon = i + 1;
        let label = `Level ${i + 1}`;
        let onclick = '';

        if (i < currentLevelIdx) {
            stateClass = 'completed';
            icon = '✓';
            onclick = `showMissionBriefing('${id}-${Math.floor(i / 5) + 1}-${i % 5}', '${course.title} ${i + 1}')`;
        } else if (i === currentLevelIdx) {
            stateClass = 'active-current';
            label = 'NEXT MISSION';
            onclick = `showMissionBriefing('${id}-${Math.floor(i / 5) + 1}-${i % 5}', '${course.title} ${i + 1}')`;
        } else if (i === currentLevelIdx + 1) {
            stateClass = 'locked';
            label = 'LOCKED';
            icon = '🔒';
        } else {
            stateClass = 'clouded';
            // Cloud Overlay
            const cloud = document.createElement('div');
            cloud.className = 'pixel-cloud-layer';
            // Randomize cloud position slightly
            cloud.style.left = `${pos.x - 100}px`;
            cloud.style.top = `${pos.y - 60}px`;
            cloud.style.animationDelay = `${Math.random() * 2}s`;
            mapContainer.appendChild(cloud);
        }

        node.classList.add(stateClass);
        node.innerHTML = `
            <div class="node-icon">${icon}</div>
            <div class="node-label">${label}</div>
        `;

        if (onclick) {
            node.onclick = () => eval(onclick); // Using eval for string simplicity in this specific mock context, normally use function ref
        }

        mapContainer.appendChild(node);
        nodes.push({ x: pos.x, y: pos.y, el: node });
    });

    // Draw Lines
    const svg = mapContainer.querySelector('svg');
    let pathD = '';
    nodes.forEach((node, i) => {
        if (i === 0) {
            pathD += `M ${node.x} ${node.y}`;
        } else {
            // Cubic bezier for smooth curves
            pathD += ` L ${node.x} ${node.y}`;
        }
    });

    const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathEl.setAttribute("d", pathD);
    pathEl.setAttribute("stroke", "var(--border-subtle)");
    pathEl.setAttribute("stroke-width", "4");
    pathEl.setAttribute("fill", "none");
    pathEl.setAttribute("stroke-dasharray", "8 4");
    svg.appendChild(pathEl);

    // Header
    mainContent.innerHTML = `
        <div class="course-hero-small" style="background:${course.gradient}; padding: 30px; border-radius: 12px; margin-bottom: 20px; text-align:center;">
             <h1 style="font-family:'Press Start 2P'; color:white; margin-bottom:10px;">${course.title} ROADMAP</h1>
             <div style="font-family:'VT323'; color:rgba(255,255,255,0.8); font-size: 20px;">
                PROGRESS: ${Math.floor((completedCount / totalNodes) * 100)}%
             </div>
        </div>
    `;
    mainContent.appendChild(mapContainer);

    // Scroll to current
    setTimeout(() => {
        if (nodes[currentLevelIdx]) {
            nodes[currentLevelIdx].el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
}

// Helper for Snake Path
function generateSnakePath(count) {
    const points = [];
    let x = 100;
    let y = 100;
    let direction = 1; // 1 = right, -1 = left
    const stepX = 120;
    const stepY = 100;
    const maxWidth = 800; // Constrain width

    for (let i = 0; i < count; i++) {
        points.push({ x, y });
        x += stepX * direction;

        // Turn around
        if (x > maxWidth || x < 100) {
            x -= stepX * direction; // Backtrack
            y += stepY; // Move down
            direction *= -1; // Flip
        }
    }
    return points;
}

// === COMMUNITY HUB ===
function renderCommunityHub() {
    const mainContent = document.getElementById('main-content');

    // Forum Channels Data
    const CHANNELS = [
        { id: 'python', name: '🐍 Python', members: 1240, posts: 342 },
        { id: 'javascript', name: '⚡ JavaScript', members: 980, posts: 278 },
        { id: 'html-css', name: '🌐 HTML/CSS', members: 750, posts: 195 },
        { id: 'general', name: '💬 General', members: 2100, posts: 523 },
        { id: 'show-your-work', name: '🎨 Show Your Work', members: 890, posts: 167 }
    ];

    // Mock Posts
    const RECENT_POSTS = [
        { author: 'CodeNinja42', avatar: '🧑‍💻', content: 'Just finished the Python loops chapter! The FizzBuzz project was challenging but fun.', time: '2 hours ago', likes: 12, channel: 'python' },
        { author: 'PixelQueen', avatar: '👩‍🎨', content: 'Check out my new portfolio site! Built with HTML, CSS, and a touch of magic ✨', time: '4 hours ago', likes: 28, channel: 'show-your-work' },
        { author: 'ByteMaster', avatar: '🤖', content: 'Anyone else struggling with async/await? Would love some tips!', time: '6 hours ago', likes: 8, channel: 'javascript' }
    ];

    const channelsHtml = CHANNELS.map(ch => `
        <div class="channel-item" onclick="GameState.showToast('${ch.name} channel coming soon!', 'info')">
            <span class="channel-name">${ch.name}</span>
            <span class="channel-meta">${ch.members} members</span>
        </div>
        `).join('');

    const postsHtml = RECENT_POSTS.map(post => `
        <div class="community-post cyber-card">
            <div class="post-header">
                <div class="post-avatar">${post.avatar}</div>
                <div class="post-author">
                    <span class="author-name">${post.author}</span>
                    <span class="post-time">${post.time}</span>
                </div>
                <span class="post-channel">#${post.channel}</span>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-actions">
                <button class="post-btn">❤️ ${post.likes}</button>
                <button class="post-btn">💬 Reply</button>
                <button class="post-btn">🔗 Share</button>
            </div>
        </div>
        `).join('');

    mainContent.innerHTML = `
        <div class="community-header" style="text-align: center; margin-bottom: 48px; position: relative;">
            <button class="neon-back-btn" onclick="navigateTo('home')" style="top: 0;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Home
            </button>
            <h1 style="font-family: 'Press Start 2P'; font-size: 24px; color: white; margin-bottom: 16px;">Community Hub</h1>
            <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto;">
                Connect with fellow coders, share your projects, and get help from the community.
            </p>
        </div>

        <div class="community-layout" style="display: grid; grid-template-columns: 280px 1fr; gap: 32px;">
            <!-- Channels Sidebar -->
            <div class="channels-sidebar">
                <div class="cyber-card" style="padding: 20px;">
                    <h3 style="font-size: 12px; color: var(--text-muted); margin: 0 0 16px 0;">CHANNELS</h3>
                    <div class="channels-list">
                        ${channelsHtml}
                    </div>
                </div>

                <div class="cyber-card" style="padding: 20px; margin-top: 20px;">
                    <h3 style="font-size: 12px; color: var(--text-muted); margin: 0 0 16px 0;">TOP CONTRIBUTORS</h3>
                    <div class="leaderboard-mini">
                        <div class="leader-item">
                            <span class="leader-rank">🥇</span>
                            <span class="leader-name">CodeMaster99</span>
                            <span class="leader-xp">12,450 XP</span>
                        </div>
                        <div class="leader-item">
                            <span class="leader-rank">🥈</span>
                            <span class="leader-name">PixelNinja</span>
                            <span class="leader-xp">11,200 XP</span>
                        </div>
                        <div class="leader-item">
                            <span class="leader-rank">🥉</span>
                            <span class="leader-name">ByteRunner</span>
                            <span class="leader-xp">9,875 XP</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Feed -->
            <div class="community-feed">
                <div class="post-composer cyber-card" style="padding: 20px; margin-bottom: 24px;">
                    <textarea placeholder="Share something with the community..." style="
                        width: 100%;
                        min-height: 80px;
                        background: var(--bg-deep);
                        border: 1px solid var(--border-subtle);
                        border-radius: 8px;
                        padding: 12px;
                        color: var(--text-primary);
                        font-family: 'Outfit', sans-serif;
                        resize: none;
                    "></textarea>
                    <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
                        <button class="btn-cyber-primary">Post</button>
                    </div>
                </div>

                <div class="posts-list">
                    ${postsHtml}
                </div>
            </div>
        </div>
    `;
}

// RENDERERS
function renderDashboard() {
    renderCoursesCatalog(); // Ensure catalog is ready

    // HERO CARD - Use Python Image
    const heroVisual = document.querySelector('.hero-card-visual');
    if (heroVisual) {
        heroVisual.style.background = `url("${COURSES[0].image}")`;
        heroVisual.style.backgroundSize = 'cover';
        heroVisual.style.backgroundPosition = 'center';
        // Remove old CSS art elements if any
        heroVisual.innerHTML = `
        <div class="hero-progress-bar">
                <div class="progress-track">
                    <div class="progress-fill" id="hero-progress" style="width: 44%"></div>
                </div>
                <span class="progress-text">44%</span>
            </div>
        `;
    }

    const progressContainer = document.getElementById('progress-cards');
    if (progressContainer) {
        progressContainer.innerHTML = COURSES.slice(0, 2).map(c => `
        <div class="small-course-card cyber-card stagger-item" style="
    background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${c.image}');
    background-size: cover;
    background-position: center;
    min-width: 220px;
    padding: 16px;
    border-radius: 12px;
    cursor: pointer;
    border: 1px solid var(--border-subtle);
    animation-delay: ${0.1 + (i * 0.1)}s;
    " data-route="course-${c.id}">
        <span style="font-size: 10px; background: rgba(0,0,0,0.6); padding: 2px 6px; border-radius: 4px; backdrop-filter:blur(4px);">COURSE</span>
                <h4 style="font-family: 'Press Start 2P'; font-size: 12px; margin: 8px 0; color: white;">${c.title}</h4>
                <div style="font-size: 12px; font-family: 'VT323'; color: rgba(255,255,255,0.9);">
                    ${c.completed}/${c.lessons} COMPLETED
                </div>
            </div>
        `).join('');
    }

    const tutorialsGrid = document.getElementById('tutorials-grid');
    if (tutorialsGrid) {
        tutorialsGrid.innerHTML = TUTORIALS.map(t => `
        <div class="tutorial-card" style="background: var(--bg-card); border-radius: 12px; overflow: hidden; border: 1px solid var(--border-subtle);">
                <div style="height: 100px; background: ${t.img}; background-size: cover; background-position: center;"></div>
                <div style="padding: 12px;">
                    <h4 style="font-size: 12px; font-family: 'Press Start 2P'; margin-bottom: 8px;">${t.title}</h4>
                    <div style="display: flex; gap: 4px;">
                        ${t.tags.map(tag => `<span style="font-size: 10px; background: rgba(0,245,255,0.1); color: var(--neon-cyan); padding: 2px 6px; border-radius: 4px;">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

window.renderCoursesCatalog = function (filter = 'all') {
    const grid = document.getElementById('all-courses-grid');
    if (!grid) return;

    // Clear existing grid and set up for sections
    grid.innerHTML = '';
    grid.style.display = 'block';

    // 1. HEADER BANNER with Back Button
    const headerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
            <button class="filter-btn" onclick="navigateTo('home')" style="display: flex; align-items: center; gap: 8px;">
                ← BACK
            </button>
        </div>
        <div class="catalog-header" style="text-align: center; margin-bottom: 24px; padding-top: 0;">
            <h1 style="font-family: 'Press Start 2P'; font-size: 28px; margin-top: 0; margin-bottom: 12px; color: white; text-shadow: 0 0 30px rgba(34, 211, 238, 0.4);">Course Catalog</h1>
            <p style="font-family: 'Outfit'; color: var(--text-secondary); font-size: 16px; max-width: 600px; margin: 0 auto; line-height: 1.6;">
                Browse our full curriculum of interactive coding courses. From Python to Web Development, start your journey today.
            </p>
            
            <div class="catalog-filters" style="display: flex; justify-content: center; gap: 12px; margin-top: 24px;">
                <button class="filter-btn ${filter === 'all' ? 'active' : ''}" onclick="renderCoursesCatalog('all')">All</button>
                <button class="filter-btn ${filter === 'python' ? 'active' : ''}" onclick="renderCoursesCatalog('python')">Python</button>
                <button class="filter-btn ${filter === 'web' ? 'active' : ''}" onclick="renderCoursesCatalog('web')">Web Dev</button>
                <button class="filter-btn ${filter === 'game-dev' ? 'active' : ''}" onclick="renderCoursesCatalog('game-dev')">Game Dev</button>
                <button class="filter-btn ${filter === 'misc' ? 'active' : ''}" onclick="renderCoursesCatalog('misc')">Electives</button>
            </div>
        </div>
    `;

    // 2. Card Creator Helper
    const createCodedexCard = (c) => {
        const state = GameState.data.progress[c.id];
        const progressPercent = state ? Math.floor((state.completedLessons.length / c.lessons) * 100) : 0;

        // Icon/Image Logic
        let visualContent = '';
        if (c.image) {
            visualContent = `<div class="card-visual" style="background-image: url('${c.image}');"></div>`;
        } else {
            const iconHtml = c.icon.startsWith('pixel-icon-')
                ? `<img src="https://unpkg.com/pixelarticons@1.8.1/svg/${c.icon.replace('pixel-icon-', '')}.svg" style="filter: brightness(0) invert(1); width: 40px;">`
                : `<span style="font-size: 40px;">${c.icon}</span>`;
            visualContent = `<div class="card-visual" style="background: ${c.gradient}; display: flex; align-items: center; justify-content: center;">${iconHtml}</div>`;
        }

        return `
        <div class="codedex-card" onclick="navigateTo('course-${c.id}')">
            ${visualContent}
            <div class="card-body">
                <div class="card-top">
                    <span class="lang-badge">${c.id.toUpperCase()}</span>
                    <span class="level-badge-simple">${c.difficulty}</span>
                </div>
                <h3>${c.title}</h3>
                <p>${c.desc}</p>
                <div class="card-footer">
                    <div class="progress-wrap">
                        <div class="progress-bar-thin"><div class="fill" style="width: ${progressPercent}%"></div></div>
                        <span>${progressPercent}%</span>
                    </div>
                </div>
            </div>
        </div>
        `;
    };

    // 3. Render Sections based on Filter
    let html = headerHTML;
    const wrapGrid = (cards) => `<div class="codedex-grid">${cards}</div>`;

    if (filter === 'all') {
        // Render Sections
        const pythonCourses = COURSES.filter(c => c.category === 'python-legend');
        if (pythonCourses.length) {
            html += `
            <div class="course-section">
                <h2 class="section-heading"><span class="icon">🐍</span> The Legend of Python</h2>
                ${wrapGrid(pythonCourses.map(createCodedexCard).join(''))}
            </div>`;
        }

        const originCourses = COURSES.filter(c => c.category === 'origins');
        if (originCourses.length) {
            html += `
            <div class="course-section">
                <h2 class="section-heading"><span class="icon">🌐</span> The Origins Trilogy</h2>
                ${wrapGrid(originCourses.map(createCodedexCard).join(''))}
            </div>`;
        }

        const gameDevCourses = COURSES.filter(c => c.category === 'game-dev');
        if (gameDevCourses.length) {
            html += `
            <div class="course-section">
                <h2 class="section-heading"><span class="icon">🎮</span> Game Development</h2>
                ${wrapGrid(gameDevCourses.map(createCodedexCard).join(''))}
            </div>`;
        }

        const otherCourses = COURSES.filter(c => !c.category);
        if (otherCourses.length) {
            html += `
            <div class="course-section">
                <h2 class="section-heading"><span class="icon">📚</span> Electives & More</h2>
                ${wrapGrid(otherCourses.map(createCodedexCard).join(''))}
            </div>`;
        }
    } else {
        // Flat filtered list
        let filtered = [];
        if (filter === 'python') filtered = COURSES.filter(c => c.category === 'python-legend' || c.id.includes('python'));
        else if (filter === 'web') filtered = COURSES.filter(c => c.category === 'origins' || c.id === 'react' || c.id === 'html' || c.id === 'css');
        else if (filter === 'game-dev') filtered = COURSES.filter(c => c.category === 'game-dev');
        else if (filter === 'misc') filtered = COURSES.filter(c => !c.category && c.id !== 'react');

        if (filtered.length > 0) {
            html += `<div class="course-section" style="margin-top: 40px;">${wrapGrid(filtered.map(createCodedexCard).join(''))}</div>`;
        } else {
            html += `<div style="text-align:center; padding: 40px; color: var(--text-muted);">No courses found for this category.</div>`;
        }
    }

    grid.innerHTML = html;
};

// === PRACTICE SECTION ===
function renderPracticeSection() {
    const mainContent = document.getElementById('main-content');

    // Challenge Packs Data
    const CHALLENGE_PACKS = [
        { id: 'python-basics', title: '30 Days of Python', icon: '🐍', difficulty: 'Beginner', challenges: 30, color: '#306998' },
        { id: 'js-fundamentals', title: 'JavaScript Fundamentals', icon: '⚡', difficulty: 'Beginner', challenges: 25, color: '#f0db4f' },
        { id: 'web-daily', title: 'Daily Web Challenges', icon: '🌐', difficulty: 'Intermediate', challenges: 15, color: '#e34c26' },
        { id: 'algo-arena', title: 'Algorithm Arena', icon: '🧠', difficulty: 'Advanced', challenges: 20, color: '#a855f7' }
    ];

    const challengeCardsHtml = CHALLENGE_PACKS.map(pack => `
        <div class="practice-card" onclick="GameState.showToast('${pack.title} coming soon!', 'info')" style="border-left: 4px solid ${pack.color};">
            <div class="practice-icon">${pack.icon}</div>
            <div class="practice-info">
                <h3>${pack.title}</h3>
                <p>${pack.challenges} Challenges • ${pack.difficulty}</p>
            </div>
            <div class="practice-progress">
                <span>0/${pack.challenges}</span>
            </div>
        </div>
        `).join('');

    mainContent.innerHTML = `
        <div class="practice-header" style="text-align: center; margin-bottom: 48px; position: relative;">
            <button class="neon-back-btn" onclick="navigateTo('home')" style="top: 0;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Home
            </button>
            <h1 style="font-family: 'Press Start 2P'; font-size: 24px; color: white; margin-bottom: 16px;">Practice Arena</h1>
            <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto;">
                Sharpen your skills with daily challenges, coding exercises, and timed competitions.
            </p>
        </div>

        <div class="practice-section">
            <h2 class="section-heading"><span class="icon">🔥</span> Challenge Packs</h2>
            <div class="practice-grid">
                ${challengeCardsHtml}
            </div>
        </div>

        <div class="practice-section" style="margin-top: 48px;">
            <h2 class="section-heading"><span class="icon">📅</span> 30 Days of Code</h2>
            <div class="streak-banner cyber-card" style="padding: 24px; display: flex; align-items: center; gap: 24px;">
                <div style="font-size: 48px;">🔥</div>
                <div>
                    <h3 style="color: var(--text-bright); margin: 0 0 8px 0;">Current Streak: ${GameState.data.user.streak} Days</h3>
                    <p style="color: var(--text-secondary); margin: 0;">Code every day for 30 days and earn exclusive badges!</p>
                </div>
                <button class="btn-cyber-primary" style="margin-left: auto;">Start Today's Challenge</button>
            </div>
        </div>

        <div class="practice-section" style="margin-top: 48px;">
            <h2 class="section-heading"><span class="icon">🏆</span> Leaderboard</h2>
            <div class="cyber-card" style="overflow: hidden;">
                <table class="leaderboard-table" style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: var(--bg-deep);">
                            <th style="padding: 12px; text-align: left; color: var(--text-muted);">Rank</th>
                            <th style="padding: 12px; text-align: left; color: var(--text-muted);">User</th>
                            <th style="padding: 12px; text-align: right; color: var(--text-muted);">XP</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border-subtle);">
                            <td style="padding: 12px; color: var(--codedex-gold);">🥇 1</td>
                            <td style="padding: 12px; color: var(--text-bright);">CodeMaster99</td>
                            <td style="padding: 12px; text-align: right; color: var(--neon-cyan);">12,450 XP</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border-subtle);">
                            <td style="padding: 12px; color: #c0c0c0;">🥈 2</td>
                            <td style="padding: 12px; color: var(--text-bright);">PixelNinja</td>
                            <td style="padding: 12px; text-align: right; color: var(--neon-cyan);">11,200 XP</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; color: #cd7f32;">🥉 3</td>
                            <td style="padding: 12px; color: var(--text-bright);">ByteRunner</td>
                            <td style="padding: 12px; text-align: right; color: var(--neon-cyan);">9,875 XP</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// === BUILD GALLERY ===
function renderBuildGallery() {
    const mainContent = document.getElementById('main-content');

    const BUILDS = [
        { id: 'calc', title: 'Calculator App', author: 'PixelDev', likes: 42, tags: ['JavaScript', 'CSS'] },
        { id: 'weather', title: 'Weather Dashboard', author: 'CloudCoder', likes: 38, tags: ['API', 'Python'] },
        { id: 'snake', title: 'Snake Game', author: 'RetroGamer', likes: 55, tags: ['Python', 'Pygame'] },
        { id: 'portfolio', title: 'Portfolio Site', author: 'WebWizard', likes: 29, tags: ['HTML', 'CSS', 'JS'] }
    ];

    const buildCardsHtml = BUILDS.map(build => `
        <div class="build-card cyber-card" onclick="GameState.showToast('View ${build.title}', 'info')">
            <div class="build-preview" style="height: 140px; background: var(--bg-deep); display: flex; align-items: center; justify-content: center; font-size: 32px;">📦</div>
            <div class="build-info" style="padding: 16px;">
                <h3 style="color: var(--text-bright); margin: 0 0 8px 0; font-size: 14px;">${build.title}</h3>
                <p style="color: var(--text-muted); font-size: 12px; margin: 0 0 12px 0;">by ${build.author}</p>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                    ${build.tags.map(t => `<span class="build-tag">${t}</span>`).join('')}
                </div>
                <div style="margin-top: 12px; display: flex; align-items: center; gap: 6px; color: var(--text-muted); font-size: 12px;">
                    <span>❤️ ${build.likes}</span>
                </div>
            </div>
        </div>
        `).join('');

    mainContent.innerHTML = `
        <div class="builds-header" style="text-align: center; margin-bottom: 48px; position: relative;">
            <button class="neon-back-btn" onclick="navigateTo('home')" style="top: 0;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Home
            </button>
            <h1 style="font-family: 'Press Start 2P'; font-size: 24px; color: white; margin-bottom: 16px;">Build Gallery</h1>
            <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 24px auto;">
                Explore projects built by the MineCode community. Get inspired and share your own!
            </p>
            <button class="btn-cyber-primary">+ Submit Your Build</button>
        </div>

        <div class="codedex-grid">
            ${buildCardsHtml}
        </div>
    `;
}

function renderCourseRoadmap(id) {
    const course = COURSES.find(c => c.id === id);
    if (!course) return;

    const content = document.getElementById('main-content');
    if (!content) return;

    // Get Data
    const courseData = window.CURRICULUM && window.CURRICULUM[id];
    // Fallback if no detailed curriculum
    const chapters = courseData ? courseData.chapters : Array.from({ length: 4 }, (_, i) => ({
        id: i + 1, title: `Chapter ${i + 1}`, icon: '📂',
        lessons: Array.from({ length: 5 }, (_, j) => ({ id: `${id}-${i}-${j}`, title: `Lesson ${j + 1}`, xp: 50 }))
    }));

    // Get Progress
    const state = GameState.data.progress[id] || { completedLessons: [] };
    const completedIds = state.completedLessons;

    // Calculate Stats
    const totalLessons = chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
    const completedCount = completedIds.length;
    const progressPercent = Math.floor((completedCount / totalLessons) * 100) || 0;

    // Count Projects
    let totalProjects = 0;
    let completedProjects = 0;
    chapters.forEach(ch => {
        ch.lessons.forEach(l => {
            if (l.type === 'project') {
                totalProjects++;
                if (completedIds.includes(l.id)) completedProjects++;
            }
        });
    });

    // --- BUILD CODEDEX-STYLE CHAPTERS ---
    const chaptersHtml = chapters.map((chapter, index) => {
        // Chapter Locked Logic
        const prevChapter = chapters[index - 1];
        const isChapterLocked = index > 0 && prevChapter && !prevChapter.lessons.every(l => completedIds.includes(l.id));

        // Check if any lesson in chapter is completed to show progress
        const chapterLessonsCompleted = chapter.lessons.filter(l => completedIds.includes(l.id)).length;
        const isChapterComplete = chapterLessonsCompleted === chapter.lessons.length;

        // First chapter is expanded by default
        const isExpanded = index === 0 || chapterLessonsCompleted > 0;

        // Build exercise rows (Codedex style)
        const lessonsHtml = chapter.lessons.map((lesson, lessonIdx) => {
            const isCompleted = completedIds.includes(lesson.id);
            const isNext = !isCompleted && !isChapterLocked && (lessonIdx === 0 || completedIds.includes(chapter.lessons[lessonIdx - 1]?.id));
            const isLessonLocked = isChapterLocked || (!isCompleted && !isNext);

            const statusIcon = isCompleted ? '✓' : (isNext ? '►' : '🔒');
            const buttonClass = isCompleted ? 'btn-completed' : (isNext ? 'btn-start' : 'btn-locked');
            const buttonText = isCompleted ? 'Review' : (isNext ? 'Start' : '???');

            return `
            <div class="exercise-row ${isCompleted ? 'completed' : ''} ${isNext ? 'current' : ''} ${isLessonLocked ? 'locked' : ''}" 
                 onclick="${!isLessonLocked ? `showMissionBriefing('${lesson.id}', '${lesson.title}')` : ''}">
                <div class="exercise-number">
                    <span class="ex-label">Exercise ${lessonIdx + 1}</span>
                </div>
                <div class="exercise-title">${lesson.title}</div>
                <div class="exercise-action">
                    <button class="ex-btn ${buttonClass}" ${isLessonLocked ? 'disabled' : ''}>
                        ${buttonText}
                    </button>
                </div>
            </div>`;
        }).join('');

        // Chapter description (if available)
        const chapterDesc = chapter.description || `Master the fundamentals of ${chapter.title.toLowerCase()}.`;

        return `
        <div class="cdx-chapter ${isChapterLocked ? 'locked' : ''} ${isChapterComplete ? 'complete' : ''}" data-chapter="${index}">
            <!-- Chapter Header -->
            <div class="cdx-chapter-header" onclick="toggleChapter(${index})">
                <div class="chapter-number-badge">${index + 1}</div>
                <div class="chapter-info">
                    <h3 class="chapter-title">${chapter.icon} ${chapter.title}</h3>
                    <p class="chapter-desc">${chapterDesc}</p>
                    <div class="chapter-meta">
                        <span class="meta-item">${chapter.lessons.length} exercises</span>
                        <span class="meta-dot">•</span>
                        <span class="meta-item">${chapterLessonsCompleted}/${chapter.lessons.length} completed</span>
                    </div>
                </div>
                <div class="chapter-toggle">
                    <span class="toggle-icon">${isExpanded ? '▼' : '▶'}</span>
                </div>
            </div>
            
            <!-- Chapter Content (Exercises) -->
            <div class="cdx-chapter-content ${isExpanded ? 'expanded' : 'collapsed'}">
                <div class="exercises-list">
                    ${lessonsHtml}
                </div>
            </div>
        </div>
        
        ${index < chapters.length - 1 ? '<div class="chapter-connector"><div class="connector-line"></div></div>' : ''}
        `;
    }).join('');

    // --- RENDER 2-COLUMN LAYOUT ---
    // Determine banner image (use pixel art or fallback to panoramic)
    const bannerImage = course.image || './assets/pixel_art/cyber_cozy_lofi_lounge_panoramic.png';

    content.innerHTML = `
        <!-- Fixed Background Layer (Hidden initially) -->
        <div id="hero-scroll-bg" class="hero-scroll-bg" style="background-image: url('${bannerImage}');"></div>

        <!-- Fixed Back Button (Always Top Left) -->
        <button id="fixed-back-btn" class="fixed-back-btn" onclick="navigateTo('courses')">
            ← BACK TO CATALOG
        </button>

        <div class="course-layout-grid">
            <!-- LEFT COLUMN: Main Content -->
            <div class="course-main-col">
                <!-- Hero Section with Pixel Art Banner -->
                <div id="course-hero-box" class="course-hero-full" style="background-image: url('${bannerImage}');">
                    <div class="hero-overlay-cinematic"></div>
                    
                    <div class="hero-content">
                        <div class="hero-badge-row">
                            <span class="hero-badge-capsule" style="background: ${course.gradient};">${course.difficulty}</span>
                            <span class="hero-badge-capsule">LESSONS: ${course.lessons}</span>
                        </div>
                        <div class="hero-text">
                            <h1>${course.title}</h1>
                            <p>${course.desc}</p>
                            <button class="btn-cyber-start" onclick="navigateTo('lesson-${chapters[0].lessons[0].id}')">
                                <span class="btn-icon">▶</span> START LEARNING
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Back Button (Legacy placeholder to maintain spacing, hidden visually if needed) -->
                <div style="height: 48px;"></div> 

                <!-- RPG Map -->
                <div class="rpg-map-container">
                    ${chaptersHtml}
                </div>
            </div> <!-- End Left Column -->

            <!-- RIGHT COLUMN: Sidebar Stats -->
            <aside class="course-sidebar-col">
                
                <!-- Profile Mini -->
                <div class="sidebar-card profile-card">
                    <div class="avatar-circle-sm"><i data-lucide="user"></i></div>
                    <div class="user-meta">
                        <h4>${GameState.data.user.name}</h4>
                        <span>Level ${GameState.data.user.level}</span>
                    </div>
                    <button class="btn-outline-xs" onclick="navigateTo('profile')">View Profile</button>
                </div>

                <!-- Course Progress -->
                <div class="sidebar-card">
                    <h3>Course Progress</h3>
                    
                    <div class="progress-row">
                        <div class="prog-label"><i data-lucide="book-open"></i> Exercises</div>
                        <div class="prog-val">${completedCount} / ${totalLessons}</div>
                        <div class="prog-bar"><div class="fill" style="width: ${progressPercent}%;"></div></div>
                    </div>

                    <div class="progress-row">
                        <div class="prog-label"><i data-lucide="folder"></i> Projects</div>
                        <div class="prog-val">${completedProjects} / ${totalProjects || 2}</div>
                        <div class="prog-bar"><div class="fill" style="width: ${(completedProjects / (totalProjects || 2)) * 100}%;"></div></div>
                    </div>

                    <div class="progress-row">
                        <div class="prog-label"><i data-lucide="zap"></i> XP Earned</div>
                        <div class="prog-val">0 / 1000</div>
                        <div class="prog-bar"><div class="fill" style="width: 10%;"></div></div>
                    </div>
                </div>

                <!-- Badges -->
                <div class="sidebar-card">
                    <h3>Course Badges</h3>
                    <div class="badge-grid-sm">
                         <div class="badge-slot unlocked" title="First Steps">🏁</div>
                         <div class="badge-slot" title="Master">🏆</div>
                         <div class="badge-slot" title="Speed">⚡</div>
                         <div class="badge-slot" title="Helper">🤝</div>
                    </div>
                </div>

                <!-- Cheat Sheets -->
                <div class="sidebar-card">
                    <h3>Cheat Sheets</h3>
                    <div class="cheat-sheet-item"><i data-lucide="file-text"></i> Syntax Guide</div>
                    <div class="cheat-sheet-item"><i data-lucide="file-text"></i> Methods List</div>
                </div>

            </aside>
        </div>

        <style>
            /* LAYOUT */
            .course-layout-grid {
                display: grid;
                grid-template-columns: 1fr 320px;
                gap: 32px;
                padding: 24px;
                padding-bottom: 80px;
                animation: fadeIn 0.5s ease;
            }
            @media (max-width: 900px) {
                .course-layout-grid { grid-template-columns: 1fr; }
            }

            /* HERO BANNER - 16:9 with Pixel Art Background */
            .course-hero-banner {
                position: relative;
                aspect-ratio: 16 / 9;
                border-radius: 20px;
                overflow: hidden;
                margin-bottom: 24px;
                box-shadow: 
                    0 20px 50px rgba(0,0,0,0.5),
                    0 0 40px rgba(34, 211, 238, 0.15);
            }
            
            .hero-banner-bg {
                position: absolute;
                inset: 0;
                background-size: cover;
                background-position: center;
                image-rendering: pixelated;
                filter: brightness(0.7);
            }
            
            .hero-overlay {
                position: absolute;
                inset: 0;
                background: linear-gradient(
                    135deg, 
                    rgba(0, 0, 0, 0.7) 0%, 
                    rgba(0, 0, 0, 0.4) 50%,
                    rgba(0, 0, 0, 0.6) 100%
                );
            }
            
            .hero-content { 
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                padding: 48px;
                z-index: 2;
            }
            
            .hero-text {
                max-width: 500px;
            }
            
            .hero-text h1 { 
                font-family: 'Press Start 2P'; 
                font-size: 36px; 
                color: white; 
                margin: 16px 0; 
                text-shadow: 
                    0 0 20px rgba(34, 211, 238, 0.5),
                    3px 3px 0px rgba(0,0,0,0.8);
                line-height: 1.3;
            }
            
            .hero-text p { 
                color: rgba(255,255,255,0.9); 
                font-size: 16px;
                line-height: 1.6; 
                margin-bottom: 24px; 
                font-weight: 500;
                text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
            }
            
            .difficulty-badge { 
                background: rgba(34, 211, 238, 0.2); 
                backdrop-filter: blur(10px);
                padding: 8px 16px; 
                border-radius: 100px; 
                font-size: 10px; 
                font-weight: 700; 
                color: var(--neon-cyan); 
                border: 1px solid rgba(34, 211, 238, 0.4);
                font-family: 'Press Start 2P';
                letter-spacing: 1px;
            }
            
            .btn-cyber-start { 
                background: linear-gradient(135deg, #22d3ee, #06b6d4);
                color: #000; 
                border: none;
                padding: 16px 32px; 
                font-family: 'Press Start 2P'; 
                font-size: 12px; 
                cursor: pointer; 
                border-radius: 8px;
                box-shadow: 
                    0 4px 0 #0891b2,
                    0 0 30px rgba(34, 211, 238, 0.4);
                transition: all 0.15s;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .btn-cyber-start:hover {
                transform: translateY(-3px);
                box-shadow: 
                    0 7px 0 #0891b2,
                    0 0 50px rgba(34, 211, 238, 0.6);
            }
            
            .btn-cyber-start:active { 
                transform: translateY(2px); 
                box-shadow: 0 2px 0 #0891b2; 
            }
            
            .btn-cyber-start .btn-icon {
                font-size: 14px;
            }

            /* SIDEBAR */
            .course-sidebar-col { 
                display: flex; 
                flex-direction: column; 
                gap: 20px; 
                position: sticky; 
                top: 100px; 
                height: fit-content; 
            }
            
            /* Sidebar - Cyber Cozy */
            .sidebar-widget {
                background: linear-gradient(135deg, rgba(16, 18, 27, 0.95), rgba(25, 20, 30, 0.95));
                border: 1px solid rgba(255, 200, 150, 0.1);
                border-radius: 16px;
                padding: 24px;
                margin-bottom: 24px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            }
            
            .sidebar-title {
                font-family: 'Press Start 2P';
                font-size: 13px;
                color: #ffb366;
                margin-bottom: 16px;
                display: flex;
                align-items: center;
                gap: 10px;
                text-shadow: 0 0 10px rgba(255, 150, 80, 0.3);
            }
            
            .sidebar-card { 
                background: rgba(16, 18, 27, 0.95); 
                border: 1px solid rgba(255,255,255,0.1); 
                border-radius: 16px; 
                padding: 20px;
                backdrop-filter: blur(10px);
            }
            
            .sidebar-card h3 { 
                font-size: 12px; 
                margin-bottom: 16px; 
                color: var(--text-bright); 
                font-weight: 700;
                font-family: 'Press Start 2P';
                letter-spacing: 0.5px;
            }
            
            .profile-card { display: flex; align-items: center; gap: 12px; }
            .avatar-circle-sm { width: 40px; height: 40px; background: var(--bg-elevated); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid var(--neon-cyan); }
            .user-meta h4 { font-size: 14px; margin: 0; color: white; }
            .user-meta span { font-size: 10px; color: var(--neon-cyan); }
            .btn-outline-xs { margin-left: auto; background: transparent; border: 1px solid var(--border-subtle); color: var(--text-muted); padding: 6px 12px; font-size: 10px; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
            .btn-outline-xs:hover { border-color: var(--neon-cyan); color: white; }

            .progress-row { margin-bottom: 16px; }
            .prog-label { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-secondary); margin-bottom: 6px; }
            .prog-val { font-size: 12px; font-weight: 700; color: white; float: right; }
            .prog-bar { height: 6px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; margin-top: 4px; }
            .prog-bar .fill { height: 100%; background: linear-gradient(90deg, #ffb366, #ff8533); border-radius: 10px; box-shadow: 0 0 10px rgba(255, 150, 80, 0.4); }

            .badge-grid-sm { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
            .badge-slot { aspect-ratio: 1; background: rgba(255,255,255,0.03); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; filter: grayscale(1); opacity: 0.4; transition: all 0.3s; border: 1px solid transparent; }
            .badge-slot.unlocked { filter: none; opacity: 1; border: 1px solid rgba(255, 180, 100, 0.4); background: rgba(255, 180, 100, 0.1); box-shadow: 0 0 15px rgba(255, 150, 80, 0.2); }
            
            .cheat-sheet-item { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--text-secondary); padding: 10px 12px; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
            .cheat-sheet-item:hover { background: rgba(34,211,238,0.1); color: white; }

            /* CODEDEX-STYLE CHAPTERS */
            .rpg-map-container { 
                display: flex; 
                flex-direction: column; 
                gap: 0; 
                padding: 20px 0; 
                position: relative; 
                width: 100%; 
            }
            
            /* Chapter Cards - Cyber Cozy */
            .cdx-chapter {
                background: linear-gradient(135deg, rgba(16, 18, 27, 0.95), rgba(25, 20, 30, 0.95));
                border: 1px solid rgba(255, 200, 150, 0.1);
                border-radius: 20px;
                overflow: hidden;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 
                    0 8px 32px rgba(0, 0, 0, 0.3),
                    inset 0 1px 0 rgba(255, 255, 255, 0.05);
            }
            
            .cdx-chapter:hover {
                border-color: rgba(255, 180, 100, 0.3);
                box-shadow: 
                    0 12px 40px rgba(0, 0, 0, 0.4),
                    0 0 30px rgba(255, 180, 100, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.08);
                transform: translateY(-2px);
            }
            
            .cdx-chapter.locked {
                opacity: 0.6;
            }
            
            .cdx-chapter.complete {
                border-color: rgba(34, 197, 94, 0.4);
            }
            
            /* Chapter Header */
            .cdx-chapter-header {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 20px 24px;
                cursor: pointer;
                transition: background 0.2s;
            }
            
            .cdx-chapter-header:hover {
                background: rgba(255,255,255,0.03);
            }
            
            .chapter-number-badge {
                width: 52px;
                height: 52px;
                background: linear-gradient(135deg, #ffb366, #ff8533);
                border-radius: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Press Start 2P';
                font-size: 16px;
                color: #000;
                font-weight: bold;
                flex-shrink: 0;
                box-shadow: 
                    0 4px 12px rgba(255, 150, 80, 0.3),
                    inset 0 2px 0 rgba(255, 255, 255, 0.3);
            }
            
            .cdx-chapter.locked .chapter-number-badge {
                background: rgba(255,255,255,0.2);
                color: rgba(255,255,255,0.5);
            }
            
            .cdx-chapter.complete .chapter-number-badge {
                background: linear-gradient(135deg, #22c55e, #16a34a);
            }
            
            .chapter-info {
                flex: 1;
            }
            
            .chapter-title {
                font-family: 'Press Start 2P';
                font-size: 14px;
                color: white;
                margin: 0 0 8px 0;
                line-height: 1.4;
            }
            
            .chapter-desc {
                font-size: 13px;
                color: var(--text-secondary);
                margin: 0 0 8px 0;
                line-height: 1.5;
            }
            
            .chapter-meta {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 11px;
                color: var(--text-muted);
            }
            
            .meta-dot {
                opacity: 0.5;
            }
            
            .chapter-toggle {
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-muted);
                flex-shrink: 0;
            }
            
            .toggle-icon {
                transition: transform 0.3s;
            }
            
            /* Chapter Content (Collapsible) */
            .cdx-chapter-content {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.4s ease;
            }
            
            .cdx-chapter-content.expanded {
                max-height: 2000px;
            }
            
            .cdx-chapter-content.collapsed {
                max-height: 0;
            }
            
            .exercises-list {
                padding: 0 24px 20px 24px;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            
            /* Exercise Rows - Cyber Cozy */
            .exercise-row {
                display: grid;
                grid-template-columns: 100px 1fr 90px;
                align-items: center;
                gap: 16px;
                padding: 16px 18px;
                background: rgba(255, 245, 230, 0.02);
                border-radius: 12px;
                border: 1px solid rgba(255, 200, 150, 0.08);
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .exercise-row:hover:not(.locked) {
                background: rgba(255, 200, 150, 0.08);
                border-color: rgba(255, 180, 100, 0.25);
                transform: translateX(4px);
            }
            
            .exercise-row.current {
                border-color: rgba(255, 180, 100, 0.5);
                background: rgba(255, 180, 100, 0.1);
                box-shadow: 0 0 20px rgba(255, 150, 80, 0.15);
            }
            
            .exercise-row.completed {
                border-color: rgba(34,197,94,0.3);
                background: rgba(34,197,94,0.05);
            }
            
            .exercise-row.locked {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .exercise-number {
                display: flex;
                align-items: center;
            }
            
            .ex-label {
                font-size: 11px;
                font-weight: 600;
                color: #ffb366;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .exercise-row.completed .ex-label {
                color: #22c55e;
            }
            
            .exercise-row.locked .ex-label {
                color: var(--text-muted);
            }
            
            .exercise-title {
                font-size: 14px;
                font-weight: 500;
                color: rgba(255,255,255,0.9);
            }
            
            .exercise-action {
                display: flex;
                justify-content: flex-end;
            }
            
            .ex-btn {
                padding: 8px 16px;
                border-radius: 6px;
                font-size: 11px;
                font-weight: 700;
                cursor: pointer;
                border: none;
                transition: all 0.2s;
                text-transform: uppercase;
            }
            
            .ex-btn.btn-start {
                background: linear-gradient(135deg, #ffb366, #ff9933);
                color: #000;
                box-shadow: 0 3px 0 #cc7a29;
            }
            
            .ex-btn.btn-start:hover {
                box-shadow: 
                    0 3px 0 #cc7a29,
                    0 0 20px rgba(255, 150, 80, 0.4);
                transform: translateY(-2px);
            }
            
            .ex-btn.btn-completed {
                background: rgba(34,197,94,0.2);
                color: #22c55e;
                border: 1px solid rgba(34,197,94,0.3);
            }
            
            .ex-btn.btn-locked {
                background: rgba(255,255,255,0.1);
                color: var(--text-muted);
                cursor: not-allowed;
            }
            
            /* Chapter Connector */
            .chapter-connector {
                display: flex;
                justify-content: center;
                padding: 8px 0;
            }
            
            .connector-line {
                width: 3px;
                height: 28px;
                background: linear-gradient(to bottom, rgba(255, 180, 100, 0.3), rgba(255, 180, 100, 0.08));
                border-radius: 2px;
            }

            @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        </style>
    `;

    // Re-init Lucide icons
    if (window.lucide) window.lucide.createIcons();
}

// Toggle Chapter Collapse
function toggleChapter(index) {
    const chapter = document.querySelector(`[data-chapter="${index}"]`);
    if (!chapter) return;

    const content = chapter.querySelector('.cdx-chapter-content');
    const toggle = chapter.querySelector('.toggle-icon');

    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        content.classList.add('collapsed');
        toggle.textContent = '▶';
    } else {
        content.classList.remove('collapsed');
        content.classList.add('expanded');
        toggle.textContent = '▼';
    }
}

// Helper (Quick fix, ideal solution in GameState)
function getNextLessonId(completed) {
    // Logic to find next ID. For now return hardcoded if empty
    return 'python-1-1';
}

// ============================================
// PROFILE VIEW - Netrunner ID Style
// ============================================
function renderProfile() {
    const content = document.getElementById('profile-content');
    if (!content) return;

    const user = GameState.data.user;

    // Calculate Rank based on level
    const rank = user.level < 5 ? 'Novice' : (user.level < 10 ? 'Apprentice' : (user.level < 20 ? 'Cyber Knight' : 'Legend'));

    // Simulate activity data
    const activityData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 5));

    content.innerHTML = `
        <div class="cyber-profile-grid" style="display: grid; grid-template-columns: 350px 1fr; gap: 32px; align-items: start;">
            
            <!-- LEFT: Netrunner ID Card -->
            <div class="netrunner-id" style="
                background: rgba(16, 18, 27, 0.6);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 24px;
                padding: 32px;
                position: relative;
                overflow: hidden;
                box-shadow: 0 0 40px rgba(0,0,0,0.5);
            ">
                <!-- Holo overlay effect -->
                <div style="position: absolute; top:0; left:0; right:0; height: 200px; background: linear-gradient(180deg, rgba(0,255,255,0.05) 0%, transparent 100%); pointer-events: none;"></div>
                
                <div style="text-align: center; position: relative;">
                    <div class="avatar-large" style="
                        width: 120px; height: 120px; 
                        margin: 0 auto 24px;
                        background: var(--bg-elevated);
                        border-radius: 50%;
                        display: flex; align-items: center; justify-content: center;
                        border: 3px solid var(--neon-cyan);
                        box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
                    ">
                        <i data-lucide="user" style="width: 60px; height: 60px; color: var(--text-bright);"></i>
                    </div>
                    <h1 style="font-size: 24px; margin-bottom: 8px; color: white; text-shadow: 0 0 10px rgba(0,255,255,0.5);">${user.name}</h1>
                    <div class="badge-pill" style="
                        display: inline-block;
                        padding: 6px 16px;
                        background: rgba(0, 255, 255, 0.1);
                        border: 1px solid var(--neon-cyan);
                        border-radius: 100px;
                        color: var(--neon-cyan);
                        font-family: var(--font-code);
                        font-size: 12px;
                        letter-spacing: 1px;
                    ">${rank} // LEVEL ${user.level}</div>
                </div>

                <div class="stats-grid" style="
                    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
                    margin-top: 40px;
                    padding-top: 32px;
                    border-top: 1px solid rgba(255,255,255,0.1);
                ">
                    <div class="stat-box" style="text-align: center;">
                        <div style="font-size: 24px; color: var(--neon-orange); font-weight: 700;">${user.streak}</div>
                        <div style="font-size: 11px; color: var(--text-muted); letter-spacing: 1px;">DAY STREAK</div>
                    </div>
                    <div class="stat-box" style="text-align: center;">
                        <div style="font-size: 24px; color: var(--neon-purple); font-weight: 700;">${user.xp}</div>
                        <div style="font-size: 11px; color: var(--text-muted); letter-spacing: 1px;">TOTAL XP</div>
                    </div>
                </div>
            </div>

            <!-- RIGHT: Badges & Activity -->
            <div class="profile-details" style="display: flex; flex-direction: column; gap: 32px;">
                
                <!-- Badge Hex-Grid -->
                <div class="section-card" style="background: var(--bg-panel); border-radius: 20px; padding: 32px;">
                    <h3 style="margin-bottom: 24px; font-family: 'Press Start 2P'; font-size: 14px; color: var(--text-secondary);">ACQUIRED BADGES</h3>
                    <div class="hex-grid" style="display: flex; gap: 16px; flex-wrap: wrap;">
                        ${[1, 2, 3, 4, 5].map(i => `
                            <div class="hex-badge" style="
                                width: 80px; height: 90px;
                                background: ${i <= 2 ? 'var(--bg-elevated)' : 'rgba(255,255,255,0.05)'};
                                clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
                                display: flex; align-items: center; justify-content: center;
                                font-size: 24px;
                                filter: ${i <= 2 ? 'none' : 'grayscale(1) opacity(0.3)'};
                                border: 1px solid ${i <= 2 ? 'var(--neon-cyan)' : 'transparent'};
                            ">
                                ${['🚀', '🐍', '⭐', '🏆', '⚔️'][i - 1]}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Activity Graph (Decor) -->
                <div class="section-card" style="background: var(--bg-panel); border-radius: 20px; padding: 32px;">
                    <h3 style="margin-bottom: 24px; font-family: 'Press Start 2P'; font-size: 14px; color: var(--text-secondary);">NEURAL ACTIVITY</h3>
                    <div style="display: flex; align-items: flex-end; gap: 8px; height: 100px;">
                        ${activityData.map(h => `
                            <div style="
                                flex: 1;
                                background: var(--codedex-green);
                                opacity: ${0.2 + (h * 0.15)};
                                height: ${h * 20}%;
                                border-radius: 4px;
                            "></div>
                        `).join('')}
                    </div>
                </div>

            </div>
        </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    // --- ROBUST SCROLL HANDLER (Global) ---
    // We attach this once to the window to handle ANY scroll on the page
    // and check if we are in the course view.

    if (!window.courseScrollInitialized) {
        window.addEventListener('scroll', () => {
            const scrollBg = document.getElementById('hero-scroll-bg');
            const heroBox = document.getElementById('course-hero-box');

            if (scrollBg && heroBox) {
                const scrollY = window.scrollY;
                const triggerPoint = 50; // Trigger earlier for smoother effect

                if (scrollY > triggerPoint) {
                    if (!scrollBg.classList.contains('visible')) {
                        scrollBg.classList.add('visible');
                        heroBox.style.opacity = '0';
                        heroBox.style.pointerEvents = 'none'; // Disable clicks when hidden
                    }
                } else {
                    if (scrollBg.classList.contains('visible')) {
                        scrollBg.classList.remove('visible');
                        heroBox.style.opacity = '1';
                        heroBox.style.pointerEvents = 'auto';
                    }
                }
            }
        });
        window.courseScrollInitialized = true;
        console.log("Course scroll listener initialized (Global)");
    }
}

function renderLessonView(lessonId) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // FIND LESSON DATA
    let lesson = null;
    let courseId = null;
    let nextLessonId = null;

    // Helper: Flatten all lessons to find current and next
    let allLessons = [];
    if (window.CURRICULUM) {
        Object.entries(window.CURRICULUM).forEach(([cId, cData]) => {
            cData.chapters.forEach(chap => {
                chap.lessons.forEach(l => {
                    allLessons.push({ ...l, courseId: cId, chapterId: chap.id });
                });
            });
        });
    }

    const currentIndex = allLessons.findIndex(l => l.id === lessonId);
    if (currentIndex !== -1) {
        lesson = allLessons[currentIndex];
        courseId = lesson.courseId;
        if (currentIndex < allLessons.length - 1) {
            // Only suggest next lesson if it's in the same course
            if (allLessons[currentIndex + 1].courseId === courseId) {
                nextLessonId = allLessons[currentIndex + 1].id;
            }
        }
    }

    // ERROR STATE
    if (!lesson) {
        mainContent.innerHTML = `
            <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">👾</div>
                <h2 style="font-family: 'Press Start 2P'; color: var(--text-bright); margin-bottom: 16px;">Lesson Not Found</h2>
                <p style="color: var(--text-secondary); margin-bottom: 32px;">The requested data fragment "${lessonId}" is corrupted or missing.</p>
                <button class="btn-cyber-primary" onclick="navigateTo('courses')">RETURN TO HUB</button>
            </div>
        `;
        return;
    }

    // PREPARE CONTENT
    // Handle both string content (simple) and object content (complex)
    const isComplex = typeof lesson.content === 'object';
    const instructionsText = isComplex ? (lesson.content.story || lesson.content.instructions) : lesson.content;
    const starterCode = lesson.code || (isComplex ? lesson.content.starterCode : '# Write your code here\n');

    // Check progress
    const state = GameState.data.progress[courseId] || { completedLessons: [] };
    const isCompleted = state.completedLessons.includes(lessonId);

    // RENDER: CYBER COZY LESSON UI
    mainContent.innerHTML = `
        <div class="lesson-layout" style="display: grid; grid-template-columns: 40% 60%; height: calc(100vh - 72px); overflow: hidden;">
            
            <!-- LEFT PANEL: INSTRUCTIONS -->
            <div class="lesson-left" style="
                background: var(--bg-panel); 
                border-right: 1px solid var(--border-subtle); 
                display: flex; 
                flex-direction: column;
                position: relative;
                z-index: 10;
                box-shadow: 20px 0 50px rgba(0,0,0,0.5);
            ">
                <!-- Header -->
                <div class="lesson-header" style="padding: 24px; border-bottom: 1px solid var(--border-subtle); position: relative;">
                     <button class="neon-back-btn" onclick="navigateTo('course-${courseId}')" style="position: relative; top: 0; left: 0; margin-bottom: 16px;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Back to Course
                    </button>

                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <span class="course-tag" style="font-family: 'Press Start 2P'; font-size: 10px; color: var(--text-muted); text-transform: uppercase;">
                            ${courseId} MODULE
                        </span>
                    </div>
                    <h1 style="font-family: 'Press Start 2P'; font-size: 16px; line-height: 1.5; color: white;">${lesson.title}</h1>
                </div>

                <!-- Content Scroll -->
                <div class="lesson-content-scroll" style="flex: 1; overflow-y: auto; padding: 32px;">
                    <div class="prose cyber-prose" style="font-size: 15px; line-height: 1.7; color: var(--text-secondary);">
                        ${marked.parse(instructionsText || 'No instructions provided.')}
                    </div>

                    ${isCompleted ? `
                        <div class="completion-banner" style="
                            margin-top: 32px; background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3);
                            padding: 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px;
                        ">
                            <div style="background: #22c55e; color: black; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">✓</div>
                            <div style="color: #22c55e; font-weight: 600; font-size: 13px;">LESSON COMPLETED</div>
                        </div>
                    ` : ''}
                </div>

                <!-- Footer / Nav -->
                <div class="lesson-footer" style="padding: 20px 24px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2);">
                    <div class="xp-pill" style="
                        background: rgba(255, 179, 102, 0.1); border: 1px solid rgba(255, 179, 102, 0.3);
                        color: #ffb366; font-family: 'Press Start 2P'; font-size: 10px; padding: 6px 12px; border-radius: 100px;
                    ">
                        +${lesson.xp} XP
                    </div>
                    
                    ${nextLessonId && isCompleted ? `
                        <button onclick="navigateTo('lesson-${nextLessonId}')" class="btn-cyber-primary" style="padding: 10px 20px; font-size: 11px;">
                            NEXT LESSON →
                        </button>
                    ` : ''}
                </div>
            </div>

            <!-- RIGHT PANEL: CODE EDITOR -->
            <div class="lesson-right" style="display: flex; flex-direction: column; background: #0d0f15; position: relative;">
                
                <!-- Editor Toolbar -->
                <div class="editor-toolbar" style="
                    height: 48px; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; padding: 0 16px;
                    background: #111;
                ">
                    <div class="file-tab" style="
                        background: #1e1e1e; padding: 6px 16px; border-radius: 6px 6px 0 0; color: #ccc; font-size: 12px; font-family: var(--font-code); border-top: 2px solid #ffb366;
                    ">main.py</div>
                    
                    <button id="run-code-btn" class="btn-cyber-primary" style="padding: 6px 16px; font-size: 10px; min-width: auto;">
                        ▶ RUN CODE
                    </button>
                </div>

                <!-- Ace Editor Container (or TextArea fallback) -->
                <div style="flex: 1; position: relative; display: flex;">
                    <div id="line-numbers" class="line-numbers" style="
                        width: 48px; background: #111; border-right: 1px solid #333; color: #555; font-family: var(--font-code); font-size: 14px; line-height: 1.5; padding: 16px 0; text-align: center;
                    ">
                        ${Array.from({ length: 20 }, (_, i) => i + 1).join('<br>')}
                    </div>
                    <textarea id="code-input" spellcheck="false" style="
                        flex: 1; background: #0d0f15; color: #e0e0e0; border: none; padding: 16px;
                        font-family: 'Fira Code', 'Consolas', monospace; font-size: 14px; line-height: 1.5; resize: none; outline: none;
                    ">${starterCode}</textarea>
                </div>

                <!-- Terminal Output -->
                <div class="terminal-panel" style="height: 200px; background: #0a0c10; border-top: 1px solid var(--border-subtle); padding: 16px; overflow-y: auto; font-family: var(--font-code); font-size: 13px;">
                    <div style="color: #666; font-size: 11px; margin-bottom: 8px;">▶ CONSOLE OUTPUT</div>
                    <div id="terminal-output" style="color: #ccc;">Ready to execute...</div>
                    
                    <!-- Next Lesson Button (Hidden by default) -->
                    <button id="next-lesson-btn" style="
                        display: none;
                        margin-top: 16px;
                        background: linear-gradient(135deg, #22c55e, #16a34a);
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-family: 'Press Start 2P';
                        font-size: 11px;
                        cursor: pointer;
                        box-shadow: 0 4px 0 #15803d;
                        transition: transform 0.1s, box-shadow 0.1s;
                    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 0 #15803d';"
                       onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 0 #15803d';">
                        NEXT LESSON →
                    </button>
                </div>
                </div>

    `;

    // Initialize line numbers
    const codeInput = document.getElementById('code-input');
    const lineNumbers = document.getElementById('line-numbers');
    const updateLineNumbers = () => {
        const lines = codeInput.value.split('\n').length;
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
    };
    if (codeInput) {
        codeInput.addEventListener('input', updateLineNumbers);
        updateLineNumbers();
    }

    // Run Code Handler - Using Real Piston Compiler
    const runBtn = document.getElementById('run-code-btn');
    const terminalOutput = document.getElementById('terminal-output');

    if (runBtn && codeInput && terminalOutput) {
        runBtn.addEventListener('click', async () => {
            const code = codeInput.value;
            terminalOutput.innerHTML = '<div style="color: #888;">▶ Compiling...</div>';

            try {
                // Use the real Piston Compiler API
                if (window.App && window.App.Compiler) {
                    const result = await window.App.Compiler.execute(courseId, code);

                    if (result.error) {
                        terminalOutput.innerHTML += `<div style="color: #ff5555;">❌ ${result.error}</div>`;
                    } else {
                        // Show output
                        const lines = result.output.split('\n');
                        lines.forEach(line => {
                            terminalOutput.innerHTML += `<div style="color: #55ff55;">${line}</div>`;
                        });

                        // Mark as complete
                        terminalOutput.innerHTML += '<div style="color: #55ff55; margin-top: 8px;">✓ PROTOCOL VERIFIED</div>';

                        // Show Next Lesson button if there is a next lesson
                        const nextBtn = document.getElementById('next-lesson-btn');
                        if (nextBtn && nextLessonId) {
                            nextBtn.style.display = 'inline-block';
                            nextBtn.onclick = () => navigateTo('lesson-' + nextLessonId);
                        }

                        // Update progress
                        if (GameState && !isCompleted) {
                            GameState.completeLesson(courseId, lessonId);
                            showGamifiedSuccessModal(lesson, courseId, nextLessonId);
                        }
                    }
                } else {
                    terminalOutput.innerHTML += '<div style="color: #ff5555;">❌ Compiler module not loaded</div>';
                }
            } catch (err) {
                terminalOutput.innerHTML += `<div style="color: #ff5555;">ERROR: ${err.message}</div>`;
            }
        });
    }
}

// ============================================
// GAMIFICATION OVERLAY
// ============================================
function showGamifiedSuccessModal(lesson, courseId, nextLessonId = null) {
    // Play Sound (Optional - simulating visual "noise")

    // Create Modal
    const modal = document.createElement('div');
    modal.className = 'gamification-modal';
    modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
            z-index: 9999; display: flex; align-items: center; justify-content: center;
            animation: fadeIn 0.3s forwards;
        `;

    // Determine button text based on whether there's a next lesson
    const buttonText = nextLessonId ? 'NEXT LESSON →' : 'CONTINUE →';

    modal.innerHTML = `
            <div class="levelup-card" style="
                background: linear-gradient(135deg, rgba(30, 41, 59, 1), rgba(15, 23, 42, 1));
                border: 2px solid var(--neon-cyan);
                border-radius: 24px;
                padding: 40px;
                text-align: center;
                max-width: 400px;
                width: 90%;
                position: relative;
                transform: scale(0.8);
                animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                box-shadow: 0 0 50px rgba(34, 211, 238, 0.3);
            ">
                <div style="font-family: 'Press Start 2P'; font-size: 24px; color: var(--neon-cyan); margin-bottom: 24px; text-shadow: 0 0 10px var(--neon-cyan);">
                    QUEST COMPLETE!
                </div>
                
                <div class="xp-circle" style="
                    width: 100px; height: 100px; border-radius: 50%;
                    background: var(--bg-deep);
                    border: 4px solid var(--neon-purple);
                    margin: 0 auto 24px;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
                ">
                    <span style="font-family: 'Press Start 2P'; font-size: 10px; color: var(--text-muted); margin-bottom: 4px;">EARNED</span>
                    <span style="font-family: var(--font-heading); font-size: 28px; font-weight: 800; color: white;">+${lesson.xp}</span>
                    <span style="font-size: 10px; color: var(--text-muted);">XP</span>
                </div>

                <div style="margin-bottom: 32px; color: var(--text-secondary); font-size: 14px;">
                    Great job completing the lesson!
                    <div style="margin-top: 8px; font-family: var(--font-code); color: var(--text-bright);"> Streak: ${GameState.data.user.streak} Days 🔥</div>
                </div>

                <button id="modal-continue-btn" style="
                    background: var(--codedex-green);
                    color: black;
                    border: none;
                    padding: 16px 32px;
                    border-radius: 12px;
                    font-family: 'Press Start 2P';
                    font-size: 14px;
                    cursor: pointer;
                    width: 100%;
                    box-shadow: 0 4px 0 #15803d;
                    transition: transform 0.1s;
                ">${buttonText}</button>
            </div>
        `;

    document.body.appendChild(modal);

    // Confetti Burst
    if (window.confetti) {
        const count = 200;
        const defaults = { origin: { y: 0.7 } };
        function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }
        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    }

    // Handle Continue - Navigate to next lesson if available
    document.getElementById('modal-continue-btn').onclick = () => {
        modal.remove();
        if (nextLessonId) {
            navigateTo('lesson-' + nextLessonId);
        } else {
            navigateTo('course-' + courseId);
        }
    };
}

// ============================================
// POLYGLOT SIMULATOR (Heuristic Runner)
// ============================================
function simulateCodeExecution(code, language = 'python') {
    const lines = code.split('\n');
    let output = [];
    const lang = language.toLowerCase();

    // --- HEURISTICS PER LANGUAGE ---

    // JAVASCRIPT / TYPESCRIPT / REACT
    if (lang === 'js' || lang === 'javascript' || lang === 'ts' || lang === 'typescript' || lang === 'react') {
        // Very basic eval-like mock
        try {
            // Check for console.log
            const logs = code.match(/console\.log\((.*?)\)/g);
            if (logs) {
                logs.forEach(log => {
                    const content = log.match(/console\.log\((.*?)\)/)[1];
                    // Strip quotes
                    output.push(content.replace(/^["']|["']$/g, ''));
                });
            }
            // Check for variables
            if (code.includes('const') || code.includes('let') || code.includes('var')) {
                // Just a mock success
            }
        } catch (e) { output.push('Error: ' + e.message); }
    }

    // HTML (Render Preview Mock)
    else if (lang === 'html') {
        if (code.includes('<h1>') || code.includes('<div>') || code.includes('<p>')) {
            output.push('Rendering HTML Preview...');
            output.push('[Preview Updated]');
        }
    }

    // CSS
    else if (lang === 'css') {
        if (code.includes('{') && code.includes('}')) {
            output.push('Styles applied.');
        }
    }

    // SQL
    else if (lang === 'sql') {
        if (code.toUpperCase().includes('SELECT') && code.toUpperCase().includes('FROM')) {
            output.push('Query executed successfully.');
            output.push('+----+----------+');
            output.push('| ID | NAME     |');
            output.push('+----+----------+');
            output.push('| 1  | MineCode |');
            output.push('+----+----------+');
            output.push('1 row in set (0.00 sec)');
        }
    }

    // JAVA
    else if (lang === 'java') {
        if (code.includes('System.out.println')) {
            const match = code.match(/System\.out\.println\((.*?)\)/);
            if (match) output.push(match[1].replace(/^["']|["']$/g, ''));
        } else if (code.includes('class ')) {
            output.push('Compilation successful.');
        }
    }

    // C++
    else if (lang === 'cpp' || lang === 'c++') {
        if (code.includes('cout') && code.includes('<<')) {
            const parts = code.split('<<');
            if (parts.length > 1) {
                let msg = parts[1].trim().replace(';', '');
                msg = msg.replace(/^["']|["']$/g, '');
                output.push(msg);
            }
        }
    }

    // PYTHON (Original Logic Refined)
    else if (lang === 'python' || lang === 'py' || lang.includes('python')) {
        // Simple parsing
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith('print')) {
                const match = trimmed.match(/print\s*\((.+)\)/);
                if (match) {
                    output.push(match[1].replace(/^["']|["']$/g, ''));
                }
            }
        }
    }

    // RUBY
    else if (lang === 'ruby') {
        if (code.includes('puts ') || code.includes('print ')) {
            const match = code.match(/(puts|print)\s+(.*)/);
            if (match) output.push(match[2].replace(/^["']|["']$/g, ''));
        }
    }

    // PHP
    else if (lang === 'php') {
        if (code.includes('echo ')) {
            const match = code.match(/echo\s+(.*);/);
            if (match) output.push(match[1].replace(/^["']|["']$/g, ''));
        }
    }

    // GO
    else if (lang === 'go') {
        if (code.includes('fmt.Println')) {
            const match = code.match(/fmt\.Println\((.*?)\)/);
            if (match) output.push(match[1].replace(/^["']|["']$/g, ''));
        }
    }

    // RUST
    else if (lang === 'rust') {
        if (code.includes('println!')) {
            const match = code.match(/println!\((.*?)\)/);
            if (match) output.push(match[1].replace(/^["']|["']$/g, ''));
        }
    }

    // BASH
    else if (lang === 'bash' || lang === 'git') {
        if (code.startsWith('echo ')) {
            output.push(code.substring(5).replace(/^["']|["']$/g, ''));
        } else if (code === 'ls -la') {
            output.push('total 0');
            output.push('drwxr-xr-x  1 user  group  0 Dec 21 12:00 .');
            output.push('drwxr-xr-x  1 user  group  0 Dec 21 12:00 ..');
        } else if (code.startsWith('git ')) {
            output.push('Initialized empty Git repository in /home/minecode/project/.git/');
        }
    }

    // LUA
    else if (lang === 'lua') {
        if (code.includes('print(')) {
            const match = code.match(/print\((.*?)\)/);
            if (match) output.push(match[1].replace(/^["']|["']$/g, ''));
        }
    }

    // Default Fallback
    if (output.length === 0 && code.trim() !== '') {
        output.push('Code executed successfully. (No output captured)');
    }

    return output.join('\n');
}





