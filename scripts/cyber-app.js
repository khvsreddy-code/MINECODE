/**
 * MineCode Cyber App Controller v1.2
 * Assets: Custom Pixel Art Cards
 */

// DATA
const COURSES = [
    // === THE LEGEND OF PYTHON ===
    {
        id: 'python',
        title: 'PYTHON',
        icon: 'pixel-icon-script',
        desc: 'Learn programming fundamentals: syntax, variables, control flow, and loops.',
        lessons: 30,
        completed: 13,
        image: './assets/pixel_art/python.png',
        gradient: 'linear-gradient(135deg, #306998, #ffe873)',
        difficulty: 'BEGINNER',
        category: 'python-legend'
    },
    {
        id: 'intermediate-python',
        title: 'INTERMEDIATE PYTHON',
        icon: 'pixel-icon-script',
        desc: 'Begin learning interwoven Python with data structures.',
        lessons: 25,
        completed: 0,
        image: './assets/pixel_art/python.png', // Reusing Python asset
        gradient: 'linear-gradient(135deg, #4B8BBE, #FFD43B)',
        difficulty: 'INTERMEDIATE',
        category: 'python-legend'
    },
    {
        id: 'numpy',
        title: 'NUMPY',
        icon: 'pixel-icon-chart-bar',
        desc: 'Learn the fundamentals of data manipulation using NumPy.',
        lessons: 15,
        completed: 0,
        image: null,
        gradient: 'linear-gradient(135deg, #013243, #4d05e8)',
        difficulty: 'INTERMEDIATE',
        category: 'python-legend'
    },

    // === THE ORIGINS TRILOGY ===
    {
        id: 'html',
        title: 'HTML',
        icon: 'pixel-icon-code',
        desc: 'Create your first website with HTML, the building blocks of the web.',
        lessons: 15,
        completed: 0,
        image: './assets/pixel_art/web.png',
        gradient: 'linear-gradient(135deg, #e34c26, #f06529)',
        difficulty: 'BEGINNER',
        category: 'origins'
    },
    {
        id: 'css',
        title: 'CSS',
        icon: 'pixel-icon-paint-bucket',
        desc: 'Learn to use CSS selectors and properties to style your HTML pages.',
        lessons: 20,
        completed: 0,
        image: null,
        gradient: 'linear-gradient(135deg, #264de4, #2965f1)',
        difficulty: 'BEGINNER',
        category: 'origins'
    },
    {
        id: 'js',
        title: 'JAVASCRIPT',
        icon: 'pixel-icon-zap',
        desc: 'Learn variables, loops, functions, and events to start building interactive apps.',
        lessons: 35,
        completed: 0,
        image: './assets/pixel_art/js.png',
        gradient: 'linear-gradient(135deg, #f0db4f, #d4bf28)',
        difficulty: 'BEGINNER',
        category: 'origins'
    },

    // === ALL COURSES ===
    {
        id: 'react',
        title: 'REACT',
        icon: 'pixel-icon-grid',
        desc: 'Build powerful user interfaces',
        lessons: 40,
        completed: 0,
        image: null,
        gradient: 'linear-gradient(135deg, #61dbfb, #38a5c4)',
        difficulty: 'ADVANCED'
    },
    {
        id: 'sql',
        title: 'SQL',
        icon: 'pixel-icon-database',
        desc: 'Manage and query databases',
        lessons: 25,
        completed: 0,
        image: 'C:/Users/harin/.gemini/antigravity/brain/848c9a17-8c76-4202-b319-cfbcb0039c4b/cyber_cozy_sql_1766205759320.png',
        gradient: 'linear-gradient(135deg, #00758f, #005c70)',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 'lua',
        title: 'LUA',
        icon: '🌙',
        desc: 'Learn programming fundamentals with Lua in Roblox.',
        lessons: 20,
        completed: 0,
        image: null,
        gradient: 'linear-gradient(135deg, #000080, #0000cd)',
        difficulty: 'BEGINNER'
    },
    {
        id: 'cpp',
        title: 'C++',
        icon: 'pixel-icon-settings',
        desc: 'High-performance system programming',
        lessons: 50,
        completed: 0,
        image: './assets/pixel_art/cpp.png',
        gradient: 'linear-gradient(135deg, #00599c, #004482)',
        difficulty: 'HARD'
    },
    {
        id: 'java',
        title: 'JAVA',
        icon: 'pixel-icon-coffee',
        desc: 'Object-oriented programming mastery',
        lessons: 45,
        completed: 0,
        image: './assets/pixel_art/java.png',
        gradient: 'linear-gradient(135deg, #5382a1, #f89820)',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 'git',
        title: 'GIT',
        icon: 'pixel-icon-git-merge',
        desc: 'Version control for everyone',
        lessons: 10,
        completed: 0,
        image: null,
        gradient: 'linear-gradient(135deg, #f1502f, #3e2c00)',
        difficulty: 'BEGINNER'
    },
    {
        id: 'csharp',
        title: 'C#',
        icon: 'pixel-icon-grid',
        desc: 'Build Windows apps and games',
        lessons: 40,
        completed: 0,
        image: null,
        gradient: 'linear-gradient(135deg, #6a1577, #9e58aa)',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 'go',
        title: 'GO',
        icon: 'pixel-icon-zap',
        desc: 'Scalable cloud software',
        lessons: 30,
        completed: 0,
        image: null,
        gradient: 'linear-gradient(135deg, #00add8, #007d9c)',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 'rust',
        title: 'RUST',
        icon: 'pixel-icon-shield',
        desc: 'Safety and performance',
        lessons: 55,
        completed: 0,
        image: null,
        gradient: 'linear-gradient(135deg, #dea584, #b7410e)',
        difficulty: 'HARD'
    },
    {
        id: 'ml',
        title: 'MACHINE LEARNING',
        icon: 'pixel-icon-human',
        desc: 'Learn the foundations of ML.',
        lessons: 45,
        completed: 0,
        image: null,
        gradient: 'linear-gradient(135deg, #111111, #333333)',
        difficulty: 'ADVANCED'
    },
    {
        id: 'copilot',
        title: 'GITHUB COPILOT',
        icon: 'pixel-icon-android',
        desc: 'Learn to code with AI assistance.',
        lessons: 10,
        completed: 0,
        image: null,
        gradient: 'linear-gradient(135deg, #000000, #4078c0)',
        difficulty: 'BEGINNER'
    }
];

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

// STATE MANAGEMENT (The "Brain")
const GameState = {
    data: {
        user: {
            name: 'Guest',
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
        this.checkLevelUp();
        this.save();
        this.showXPPopup(amount);
        this.showToast(`+${amount} XP Gained!`, 'success');
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
    }
};

// INIT
document.addEventListener('DOMContentLoaded', () => {
    GameState.init(); // Load save data
    initNavigation();
    if (window.UIComponents && window.UIComponents.initTooltips) {
        window.UIComponents.initTooltips();
    }

    const path = window.location.pathname;

    // Multi-page Routing Logic
    if (path.includes('dashboard.html')) {
        // App / Dashboard Logic
        console.log(" [SYSTEM] Initializing Dashboard...");
        renderHomeDashboard();

        // Default to 'courses' or 'home' view if not specified
        const urlParams = new URLSearchParams(window.location.search);
        const view = urlParams.get('view');
        if (view) {
            navigateTo(view);
        } else {
            // Init defaults 
            if (window.UIComponents) UIComponents.renderBreadcrumbs([{ label: 'Home', route: 'home' }]);
        }
    } else {
        // Landing / Index Logic
        console.log(" [SYSTEM] Initializing Landing Sequence...");
        renderLandingPage();
    }
});

// GLOBAL: Guest Login
window.loginAsGuest = function () {
    console.log(" [AUTH] Logging in as Guest...");
    // Ensure default data is saved
    if (!localStorage.getItem('minecode_save_v1')) {
        GameState.save();
    }
    window.location.href = 'dashboard.html';
};

// GLOBAL: Navigation Handler
window.navigateTo = function (route) {
    console.log(` [NAV] Extracting to sector: ${route}`);

    // Handle Page Redirection
    if (route === 'landing' || route === 'logout') {
        localStorage.removeItem('minecode_save_v1'); // Clear session on logout
        window.location.href = 'index.html';
        return;
    }
    if (route === 'signup') {
        renderSignupPage(); // Render locally on index.html
        return;
    }
    if (route === 'home' && !window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Handle Internal Dashboard Routing (SPA-like)
    // Hide all views
    document.querySelectorAll('.view').forEach(el => el.classList.add('hidden'));
    document.getElementById('main-content').innerHTML = ''; // Clear main content if needed

    // Update URL without reload (for bookmarking)
    const url = new URL(window.location);
    url.searchParams.set('view', route);
    window.history.pushState({}, '', url);

    // Route Dispatch & Breadcrumbs
    let breadcrumbs = [{ label: 'Home', route: 'home' }];

    if (route.startsWith('course-')) {
        // Course Detail
        const courseId = route.replace('course-', '');
        renderCourseView(courseId);
        breadcrumbs.push({ label: 'Courses', route: 'courses' });
        breadcrumbs.push({ label: courseId.toUpperCase(), route: route });
    } else if (route === 'courses') {
        renderCoursesCatalog();
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
        // Profile View
        if (sidebar) sidebar.style.display = 'block';
        if (mainLayout) mainLayout.style.display = 'grid'; // Enable sidebar
        renderProfilePage();
        breadcrumbs.push({ label: 'Profile', route: 'profile' });
    } else {
        // Default: Home Dashboard
        renderHomeDashboard();
    }

    // Render Breadcrumbs
    if (window.UIComponents && window.UIComponents.renderBreadcrumbs) {
        UIComponents.renderBreadcrumbs(breadcrumbs);
    }

    // Update Active Nav State
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-route="${route}"]`);
    if (activeBtn) activeBtn.classList.add('active');
};

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

    document.addEventListener('click', (e) => {
        const routeEl = e.target.closest('[data-route]');
        if (routeEl) {
            e.preventDefault();
            navigateTo(routeEl.dataset.route);
            // Close mobile menu on navigation
            document.querySelector('.nav-menu').classList.remove('active');
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

    // Helper to split text into animated spans
    const animateText = (text, baseDelay = 0) => {
        return text.split('').map((char, i) => {
            if (char === ' ') return '&nbsp;';
            const delay = (baseDelay + i * 0.08).toFixed(2);
            return `<span style="animation-delay: ${delay}s">${char}</span>`;
        }).join('');
    };

    mainContent.innerHTML = `
        <div class="hero-pixel-scene">
            <!-- Background Video -->
            <video id="landing-video-bg" class="video-bg" autoplay muted loop playsinline>
                <source src="./assets/_looped_video_1080p_202512201349.mp4" type="video/mp4">
            </video>
            
            <!-- Dark gradient overlay for readability -->
            <div class="overlay-gradient"></div>
            
            <!-- Floating Pixel Stars -->
            <div class="pixel-stars">
                <div class="star" style="top: 15%; left: 10%; animation-delay: 0s;"></div>
                <div class="star" style="top: 25%; left: 85%; animation-delay: 0.5s;"></div>
                <div class="star" style="top: 60%; left: 5%; animation-delay: 1s;"></div>
                <div class="star" style="top: 70%; left: 90%; animation-delay: 1.5s;"></div>
                <div class="star" style="top: 40%; left: 95%; animation-delay: 2s;"></div>
            </div>
            
            <!-- Floating Course Icons (Codedex Style) -->
            <div class="floating-icons">
                <div class="floating-icon" style="top: 20%; left: 8%;">🐍</div>
                <div class="floating-icon" style="top: 30%; right: 10%;">⚡</div>
                <div class="floating-icon" style="top: 65%; left: 12%;">🌐</div>
                <div class="floating-icon" style="top: 55%; right: 8%;">🎮</div>
                <div class="floating-icon" style="top: 80%; left: 20%;">📊</div>
                <div class="floating-icon" style="top: 75%; right: 15%;">🔧</div>
            </div>
            
            <!-- Hero Content -->
            <div class="hero-content-wrapper">
                <!-- Pixel Art Badge -->
                <div class="hero-badge">
                    <span class="badge-text">🎮 GAMIFIED LEARNING</span>
                </div>
                
                <!-- Small White Text on Top -->
                <div class="hero-start-text">START YOUR</div>
                
                <!-- Main Animated Title -->
                <div class="hero-adventure-container">
                    <div class="hero-adventure-line">
                        ${animateText('Coding', 0)}
                    </div>
                    <div class="hero-adventure-line">
                        ${animateText('Adventure', 0.8)}
                    </div>
                </div>
                
                <p class="hero-subtitle">
                    Journey through the world of programming with interactive<br>
                    courses, challenges, and a supportive community.
                </p>
                
                <div class="hero-buttons">
                    <button class="btn-nes-primary btn-glow" onclick="navigateTo('signup')">
                        <span class="btn-icon">▶</span>
                        START FOR FREE
                    </button>
                    <button class="btn-nes-secondary" onclick="navigateTo('courses')">
                        EXPLORE COURSES
                    </button>
                </div>
                
                <!-- Stats Row -->
                <div class="hero-stats">
                    <div class="stat-item">
                        <span class="stat-number">15+</span>
                        <span class="stat-label">Courses</span>
                    </div>
                    <div class="stat-divider"></div>
                    <div class="stat-item">
                        <span class="stat-number">100+</span>
                        <span class="stat-label">Lessons</span>
                    </div>
                    <div class="stat-divider"></div>
                    <div class="stat-item">
                        <span class="stat-number">∞</span>
                        <span class="stat-label">Fun</span>
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
    document.querySelector('.right-sidebar').style.display = 'none';
    const mainLayout = document.getElementById('main-layout');
    if (mainLayout) {
        mainLayout.style.gridTemplateColumns = '1fr'; // Fix empty right space
    }

    // ASSETS
    const bannerArt = "./assets/pixel_art/cyber_cozy_lofi_lounge_panoramic.png";
    const pythonArt = "./assets/pixel_art/python.png";
    const jsArt = "./assets/pixel_art/js.png";

    const dashboardHTML = `
        <div class="cyber-dashboard">
            <!-- MAIN CONTENT AREA -->
            <div class="dash-main">
                <!-- BREADCRUMBS -->
                <div id="dashboard-breadcrumbs" class="breadcrumbs" style="margin-bottom: 20px;"></div>

                <!-- MASCOT TIP BAR -->
                <div class="cyber-tip-bar">
                    <div class="tip-mascot"><i data-lucide="bot" style="width:28px;height:28px;color:#22d3ee;"></i></div>
                    <div class="tip-content">
                        <span class="tip-badge">NEW</span>
                        <span>Intermediate Python is out now! Start your journey deeper into the code.</span>
                    </div>
                    <button class="tip-dismiss" data-tooltip="Dismiss Tip">✕</button>
                </div>

                <!-- HERO WELCOME BANNER -->
                <div class="cyber-hero-banner">
                    <!-- ANIMATED BACKGROUND LOOP -->
                    <video class="cyber-video-bg" autoplay muted loop playsinline>
                        <source src="./assets/_looped_video_1080p_202512201349.mp4" type="video/mp4">
                    </video>
                    <!-- RAIN OVERLAY -->
                    <div class="rain-overlay"></div>
                    
                    <div class="hero-overlay"></div>
                    <div class="hero-content">
                        <!-- CHANGED: Use hero-title and removed glitch effect for clarity -->
                        <h1 class="hero-title">Start Your Coding Adventure</h1>
                        <p class="cyber-subtitle" style="font-size: 18px; max-width: 600px; margin: 0 auto 32px auto; color: var(--text-secondary);">Your coding journey awaits. Choose your path and start building.</p>
                        <div class="hero-actions">
                            <button class="btn-cyber-primary" onclick="navigateTo('courses')">
                                <i data-lucide="rocket" style="width:18px;height:18px;"></i> Start Learning
                            </button>
                            <button class="btn-cyber-outline" onclick="navigateTo('practice')">
                                <i data-lucide="swords" style="width:18px;height:18px;"></i> Practice Now
                            </button>
                        </div>
                    </div>
                </div>

                <!-- EXPLORE SECTION -->
                <div class="section-header">
                    <h2 class="section-title"><span class="title-accent">//</span> EXPLORE</h2>
                </div>
                <!-- CHANGED: Use section-grid-4 for responsive full-width layout -->
                <div class="section-grid-4">
                    <div class="cyber-cozy-card" onclick="navigateTo('practice')" style="--card-accent: #00f5ff; width: 100%;">
                        <div class="card-icon"><i data-lucide="zap" style="width:32px;height:32px;"></i></div>
                        <div class="card-label">PRACTICE</div>
                        <h3>Challenge Packs</h3>
                        <p>Sharpen your skills with coding challenges</p>
                    </div>
                    <div class="cyber-cozy-card" onclick="navigateTo('builds')" style="--card-accent: #a855f7; width: 100%;">
                        <div class="card-icon"><i data-lucide="wrench" style="width:32px;height:32px;"></i></div>
                        <div class="card-label">BUILD</div>
                        <h3>Project Tutorials</h3>
                        <p>Create real-world applications step by step</p>
                    </div>
                    <div class="cyber-cozy-card" onclick="navigateTo('community')" style="--card-accent: #4ade80; width: 100%;">
                        <div class="card-icon"><i data-lucide="moon" style="width:32px;height:32px;"></i></div>
                        <div class="card-label">COMMIT</div>
                        <h3>#30NitesOfCode</h3>
                        <p>Join the coding streak challenge</p>
                    </div>
                    <div class="cyber-cozy-card" onclick="navigateTo('community')" style="--card-accent: #ffc800; width: 100%;">
                        <div class="card-icon"><i data-lucide="globe" style="width:32px;height:32px;"></i></div>
                        <div class="card-label">COMMUNITY</div>
                        <h3>Builds Gallery</h3>
                        <p>Share your creations with others</p>
                    </div>
                </div>

                <!-- CONTINUE LEARNING -->
                <div class="section-header">
                    <h2 class="section-title"><span class="title-accent">//</span> CONTINUE LEARNING</h2>
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

                <div class="cyber-widget cyber-club">
                    <div class="club-glow"></div>
                    <h3><i data-lucide="crown" style="width:20px;height:20px;color:#ffc800;"></i> JOIN THE CLUB</h3>
                    <p>Get unlimited access to all courses, projects, and exclusive content.</p>
                    <button class="cyber-btn cyber-btn-gold full-width">Learn More</button>
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
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));

    // Handle Routes
    if (route === 'landing') {
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
        renderHomeDashboard();
    } else if (route === 'courses') {
        if (mainLayout) mainLayout.style.display = 'none';
        document.getElementById('courses-view').classList.remove('hidden');
        renderCoursesCatalog();
    } else if (route === 'lesson') {
        if (mainLayout) mainLayout.style.display = 'none';
        document.getElementById('lesson-view').classList.remove('hidden');
        renderLessonWorkspace();
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
        <div class="profile-container">
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
            <!-- Left Sidebar: Channels -->
            <div class="community-channels" style="background: var(--bg-card); border-radius: 16px; padding: 20px; border: 1px solid var(--border-subtle);">
                <h4 style="font-family: 'Press Start 2P'; font-size: 10px; color: var(--text-muted); margin-bottom: 16px;">CHANNELS</h4>
                <div id="channel-list" style="display: flex; flex-direction: column; gap: 8px;">
                    <!-- Channels injected here -->
                    <div class="skeleton-text short"></div>
                    <div class="skeleton-text short"></div>
                    <div class="skeleton-text short"></div>
                </div>
            </div>

            <!-- Center: Feed -->
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

            <!-- Right Sidebar: News & Events -->
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
        <div class="community-header" style="text-align: center; margin-bottom: 48px;">
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
                background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${c.image}');
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

function renderCoursesCatalog() {
    const grid = document.getElementById('all-courses-grid');
    if (!grid) return;

    // Clear existing grid and set up for sections
    grid.innerHTML = '';
    grid.style.display = 'block';

    // 1. HEADER BANNER (Codedex Style)
    const headerHTML = `
        <div class="catalog-header" style="text-align: center; margin-bottom: 60px; padding-top: 20px;">
            <h1 style="font-family: 'Press Start 2P'; font-size: 28px; margin-bottom: 16px; color: white;">Course Catalog</h1>
            <p style="font-family: 'Outfit'; color: var(--text-secondary); font-size: 16px; max-width: 600px; margin: 0 auto;">
                Browse our full curriculum of interactive coding courses. From Python to Web Development, start your journey today.
            </p>
            
            <div class="catalog-filters" style="display: flex; justify-content: center; gap: 12px; margin-top: 32px;">
                <button class="filter-btn active">All</button>
                <button class="filter-btn">Python</button>
                <button class="filter-btn">Web Dev</button>
                <button class="filter-btn">CS</button>
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
            // Fallback gradient/icon
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

    // 3. Render Sections
    let html = headerHTML;

    // Helper for grid wrapper
    const wrapGrid = (cards) => `<div class="codedex-grid">${cards}</div>`;

    // The Legend of Python
    html += `
        <div class="course-section">
            <h2 class="section-heading"><span class="icon">🐍</span> The Legend of Python</h2>
            ${wrapGrid(COURSES.filter(c => c.category === 'python-legend').map(createCodedexCard).join(''))}
        </div>
    `;

    // The Origins Trilogy
    html += `
        <div class="course-section">
            <h2 class="section-heading"><span class="icon">🌐</span> The Origins Trilogy</h2>
            ${wrapGrid(COURSES.filter(c => c.category === 'origins').map(createCodedexCard).join(''))}
        </div>
    `;

    // All Courses (Others)
    const others = COURSES.filter(c => !c.category);
    html += `
        <div class="course-section">
            <h2 class="section-heading"><span class="icon">📚</span> Electives & More</h2>
            ${wrapGrid(others.map(createCodedexCard).join(''))}
        </div>
    `;

    grid.innerHTML = html;
}

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
        <div class="practice-header" style="text-align: center; margin-bottom: 48px;">
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
        <div class="builds-header" style="text-align: center; margin-bottom: 48px;">
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
    const course = COURSES.find(c => c.id === id) || COURSES[0];
    const content = document.getElementById('course-content');
    const sidebar = document.getElementById('course-sidebar');

    // --- CODEDEX-STYLE CHAPTER DATA ---
    // This would ideally come from a database, but we'll define it inline for now
    const COURSE_CHAPTERS = {
        'python': [
            {
                id: 1, title: 'Setting Up', icon: '⚙️', lessons: [
                    { id: 1, title: 'Hello World', type: 'exercise' },
                    { id: 2, title: 'Comments', type: 'exercise' },
                    { id: 3, title: 'Block Letters', type: 'project' }
                ]
            },
            {
                id: 2, title: 'Variables', icon: '📦', lessons: [
                    { id: 4, title: 'Creating Variables', type: 'exercise' },
                    { id: 5, title: 'Data Types', type: 'exercise' },
                    { id: 6, title: 'Type Conversion', type: 'exercise' },
                    { id: 7, title: 'Mad Libs', type: 'project' }
                ]
            },
            {
                id: 3, title: 'Control Flow', icon: '🔀', lessons: [
                    { id: 8, title: 'If Statements', type: 'exercise' },
                    { id: 9, title: 'Else / Elif', type: 'exercise' },
                    { id: 10, title: 'Logical Operators', type: 'exercise' },
                    { id: 11, title: 'Magic 8 Ball', type: 'project' }
                ]
            },
            {
                id: 4, title: 'Loops', icon: '🔄', lessons: [
                    { id: 12, title: 'While Loops', type: 'exercise' },
                    { id: 13, title: 'For Loops', type: 'exercise' },
                    { id: 14, title: 'Range', type: 'exercise' },
                    { id: 15, title: 'FizzBuzz', type: 'project' }
                ]
            },
            {
                id: 5, title: 'Functions', icon: '🧩', lessons: [
                    { id: 16, title: 'Defining Functions', type: 'exercise' },
                    { id: 17, title: 'Parameters', type: 'exercise' },
                    { id: 18, title: 'Return Values', type: 'exercise' },
                    { id: 19, title: 'Currency Converter', type: 'project' }
                ]
            }
        ]
    };

    // Get chapters for this course (fallback to python)
    const chapters = COURSE_CHAPTERS[course.id] || COURSE_CHAPTERS['python'];

    // Get user progress
    const state = GameState.data.progress[course.id] || { completedLessons: [] };
    const completedIds = state.completedLessons;
    const totalLessons = chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
    const progressPercent = Math.floor((completedIds.length / totalLessons) * 100);

    // --- SIDEBAR HTML ---
    sidebar.innerHTML = `
        <div class="roadmap-sidebar">
            <!-- User Progress Card -->
            <div class="cyber-card" style="padding: 20px;">
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                    <div class="avatar-circle" style="width: 48px; height: 48px;">
                        <i data-lucide="user" style="width: 24px; height: 24px;"></i>
                    </div>
                    <div>
                        <h4 style="color: var(--text-bright); margin: 0;">${GameState.data.user.name}</h4>
                        <span class="level-badge">LVL ${GameState.data.user.level}</span>
                    </div>
                </div>
                
                <div style="margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">
                        <span>Course Progress</span>
                        <span>${progressPercent}%</span>
                    </div>
                    <div class="progress-bar-thin" style="height: 8px;">
                        <div class="fill" style="width: ${progressPercent}%; background: var(--neon-cyan);"></div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; text-align: center;">
                    <div style="background: var(--bg-deep); padding: 12px; border-radius: 8px;">
                        <div style="font-size: 20px; font-weight: 700; color: var(--text-bright);">${completedIds.length}</div>
                        <div style="font-size: 10px; color: var(--text-muted);">COMPLETED</div>
                    </div>
                    <div style="background: var(--bg-deep); padding: 12px; border-radius: 8px;">
                        <div style="font-size: 20px; font-weight: 700; color: var(--text-bright);">${totalLessons - completedIds.length}</div>
                        <div style="font-size: 10px; color: var(--text-muted);">REMAINING</div>
                    </div>
                </div>
            </div>

            <!-- Badges Card -->
            <div class="cyber-card" style="padding: 20px;">
                <h4 style="margin: 0 0 12px 0; font-size: 12px; color: var(--text-muted);">EARNED BADGES</h4>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <div class="badge-mini" title="First Code">🎯</div>
                    <div class="badge-mini locked" title="Loop Master">🔄</div>
                    <div class="badge-mini locked" title="Function Pro">🧩</div>
                </div>
            </div>
        </div>
    `;

    // --- MAIN CONTENT (Chapter Roadmap) ---
    const chaptersHtml = chapters.map((chapter, chapterIndex) => {
        // Check chapter completion
        const chapterLessonIds = chapter.lessons.map(l => l.id);
        const chapterCompleted = chapterLessonIds.every(id => completedIds.includes(id));
        const chapterInProgress = chapterLessonIds.some(id => completedIds.includes(id)) && !chapterCompleted;

        // First unlocked lesson in chapter
        const firstIncomplete = chapter.lessons.find(l => !completedIds.includes(l.id));
        const isChapterUnlocked = chapterIndex === 0 || chapters[chapterIndex - 1].lessons.every(l => completedIds.includes(l.id));

        const lessonsHtml = chapter.lessons.map(lesson => {
            const isCompleted = completedIds.includes(lesson.id);
            const isNext = lesson.id === (completedIds.length > 0 ? Math.max(...completedIds) + 1 : 1);
            const isLocked = !isCompleted && !isNext && !isChapterUnlocked;

            let statusClass = isCompleted ? 'completed' : (isNext ? 'current' : (isLocked ? 'locked' : ''));
            let icon = isCompleted ? '✓' : (lesson.type === 'project' ? '🛠️' : '📄');

            return `
                <div class="roadmap-lesson ${statusClass}" onclick="${!isLocked ? "navigateTo('lesson')" : ''}">
                    <span class="lesson-icon">${icon}</span>
                    <span class="lesson-title">${lesson.title}</span>
                    ${lesson.type === 'project' ? '<span class="project-tag">PROJECT</span>' : ''}
                </div>
            `;
        }).join('');

        return `
            <div class="roadmap-chapter ${chapterCompleted ? 'completed' : ''} ${chapterInProgress ? 'in-progress' : ''}">
                <div class="chapter-header">
                    <div class="chapter-icon">${chapter.icon}</div>
                    <div class="chapter-info">
                        <span class="chapter-number">CHAPTER ${chapter.id}</span>
                        <h3 class="chapter-title">${chapter.title}</h3>
                    </div>
                    <div class="chapter-status">
                        ${chapterCompleted ? '<span class="status-complete">✓</span>' : `<span class="status-count">${chapterLessonIds.filter(id => completedIds.includes(id)).length}/${chapter.lessons.length}</span>`}
                    </div>
                </div>
                <div class="chapter-lessons">
                    ${lessonsHtml}
                </div>
            </div>
        `;
    }).join('');

    content.innerHTML = `
        <div class="roadmap-header">
            <button class="btn-back" onclick="navigateTo('courses')">
                <i data-lucide="arrow-left" style="width: 16px; height: 16px;"></i> Back
            </button>
            <div class="course-badge" style="background: ${course.gradient};">
                ${course.image ? `<img src="${course.image}" alt="${course.title}">` : `<span style="font-size: 32px;">${course.icon}</span>`}
            </div>
            <div class="course-meta">
                <h1 class="course-title">${course.title}</h1>
                <p class="course-desc">${course.desc}</p>
                <div class="course-tags">
                    <span class="tag">${course.difficulty}</span>
                    <span class="tag">${totalLessons} lessons</span>
                </div>
            </div>
        </div>
        
        <div class="roadmap-chapters">
            ${chaptersHtml}
        </div>
    `;

    // Re-init Lucide icons
    if (window.lucide) window.lucide.createIcons();
}

// FEATURE: FUNCTIONAL LESSON EDITOR
// FEATURE: FUNCTIONAL LESSON EDITOR
function renderLessonWorkspace() {
    const instructions = document.getElementById('lesson-instructions');
    const editor = document.getElementById('code-editor');
    const terminal = document.getElementById('terminal');
    const nav = document.getElementById('lesson-nav');

    // Current Lesson State (Mocking Lesson 2)
    const currentLessonId = 2;
    const isCompleted = GameState.data.progress.python.completedLessons.includes(currentLessonId);

    instructions.innerHTML = `
        <div class="fade-in-up">
            <span style="background: var(--bg-elevated); color: var(--neon-cyan); padding: 4px 8px; border-radius: 4px; font-size: 10px; font-family: 'Press Start 2P';">LESSON ${currentLessonId}</span>
            <h1 style="font-family: 'Press Start 2P'; font-size: 18px; margin: 16px 0; line-height: 1.5; color: var(--text-bright);">HELLO WORLD</h1>
            <p style="font-family: 'VT323'; font-size: 20px; color: var(--text-secondary);">Your first standardized output.</p>
        </div>
        <div class="fade-in-up" style="animation-delay: 0.1s; font-family: 'VT323'; font-size: 18px; color: var(--text-primary);">
            <p>Every cyber-agent starts here. Initializing the output stream.</p>
            <br>
            <p>TASK: Print the greeting signal.</p>
            <div style="background: var(--bg-deep); padding: 12px; border-left: 2px solid var(--neon-green); margin: 16px 0; font-family: 'VT323';">
                print("Hello, World!")
            </div>
            ${isCompleted ? '<div style="color: var(--neon-green);">✅ LESSON COMPLETE</div>' : ''}
            
            <!-- Hints System -->
            <div class="hints-container" style="margin-top: 24px;">
                <button class="hint-toggle" onclick="this.nextElementSibling.classList.toggle('hidden'); this.textContent = this.nextElementSibling.classList.contains('hidden') ? '💡 Show Hint' : '💡 Hide Hint';" style="
                    background: transparent;
                    border: 1px dashed var(--border-subtle);
                    color: var(--text-muted);
                    padding: 8px 16px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 13px;
                    transition: all 0.2s;
                ">💡 Show Hint</button>
                <div class="hint-content hidden" style="
                    margin-top: 12px;
                    padding: 16px;
                    background: rgba(251, 191, 36, 0.1);
                    border-left: 3px solid var(--codedex-gold);
                    border-radius: 0 8px 8px 0;
                    font-size: 14px;
                    color: var(--text-secondary);
                ">
                    <strong style="color: var(--codedex-gold);">Hint:</strong> Remember to use quotation marks around your text in the print function!
                </div>
            </div>
        </div>
    `;

    editor.innerHTML = `
        <div style="background: var(--bg-panel); padding: 8px 16px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
            <span style="font-family: 'VT323'; color: var(--text-secondary);">main.py</span>
            <button id="run-btn" class="btn-cyber-primary" style="padding: 6px 16px; font-size: 12px;">▶ RUN PROTOCOL</button>
        </div>
        <div class="code-editor-container" style="display: flex; height: 300px; background: rgba(13, 17, 23, 0.6); font-family: 'VT323'; font-size: 18px;">
            <div class="line-numbers" style="padding: 16px 8px; color: var(--text-muted); text-align: right; border-right: 1px solid var(--border-subtle); user-select: none; background: rgba(0,0,0,0.2);">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10</div>
            <textarea id="code-input" spellcheck="false" style="flex: 1; background: transparent; color: var(--text-bright); border: none; padding: 16px; outline: none; resize: none; line-height: 1.5;">print("Hello, World!")</textarea>
        </div>
    `;

    terminal.innerHTML = `
        <div style="background: var(--bg-panel); padding: 8px 16px; border-bottom: 1px solid var(--border-subtle); font-family: 'VT323'; color: var(--text-muted); font-size: 14px;">TERMINAL OUTPUT</div>
        <div id="terminal-out" style="padding: 16px; font-family: 'VT323'; font-size: 16px; color: var(--neon-green); height: 140px; overflow-y: auto; background: rgba(0,0,0,0.3);">
            > System Ready...<br>
            > Type 'help' for commands.<br>
        </div>
        <div style="display: flex; border-top: 1px solid var(--border-subtle); background: rgba(0,0,0,0.2);">
            <span style="padding: 8px 0 8px 16px; color: var(--neon-cyan); font-family: 'VT323'; display: flex; align-items: center;">></span>
            <input id="term-input" type="text" autocomplete="off" spellcheck="false" style="flex: 1; background: transparent; border: none; color: white; font-family: 'VT323'; font-size: 16px; padding: 8px; outline: none;" placeholder="_">
        </div>
    `;

    nav.innerHTML = `
        <button class="btn-cyber-outline" style="width: auto;" onclick="navigateTo('course-python')">EXIT</button>
        <button id="next-lesson-btn" class="btn-cyber-primary" style="display: ${isCompleted ? 'flex' : 'none'}; opacity: ${isCompleted ? 1 : 0}; transition: all 0.3s;" onclick="GameState.showToast('Next lesson locked in demo.', 'accent')">NEXT LESSON →</button>
    `;

    // RUN FUNCTIONALITY
    document.getElementById('run-btn').addEventListener('click', () => {
        const code = document.getElementById('code-input').value;
        const term = document.getElementById('terminal-out');
        const nextBtn = document.getElementById('next-lesson-btn');

        term.innerHTML += `<div>> Running main.py...</div>`;
        term.scrollTop = term.scrollHeight;

        // Simulate Network Latency for realism
        setTimeout(() => {
            if (code.includes('print("') || code.includes("print('")) {
                const text = code.match(/print\(["'](.+)["']\)/)[1];
                term.innerHTML += `<div>${text}</div>`;

                // Success Logic
                term.innerHTML += `<div style="color: var(--neon-cyan); margin-top: 8px; text-shadow: 0 0 5px var(--neon-cyan);">[SUCCESS] PROTOCOL VERIFIED.</div>`;

                // Update GameState
                const firstTime = GameState.completeLesson('python', 2);

                if (firstTime) {
                    setTimeout(() => {
                        GameState.showToast('LESSON COMPLETE! +100 XP', 'success');
                        // Show Next Button
                        if (nextBtn) {
                            nextBtn.style.display = 'flex';
                            setTimeout(() => nextBtn.style.opacity = '1', 10);
                        }
                    }, 500);
                } else {
                    GameState.showToast('Code Valid. (Already Completed)', 'info');
                }

            } else {
                term.innerHTML += `<div style="color: var(--neon-orange);">[ERROR] SYNTAX INVALID. MISSING PRINT STATEMENT.</div>`;
                GameState.showToast('Syntax Error: Check your code.', 'error');
            }
            term.scrollTop = term.scrollHeight;
        }, 600);
    });

    // FAKE TERMINAL INPUT
    const termInput = document.getElementById('term-input');
    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = e.target.value.trim();
                const termOut = document.getElementById('terminal-out');

                if (val) {
                    termOut.innerHTML += `<div style="color: var(--text-secondary);">> ${val}</div>`;

                    if (val === 'help') {
                        termOut.innerHTML += `<div style="color: white;">COMMANDS: help, clear, run, ls, print</div>`;
                    } else if (val === 'clear') {
                        termOut.innerHTML = '';
                    } else if (val === 'run') {
                        document.getElementById('run-btn').click();
                    } else if (val === 'ls') {
                        termOut.innerHTML += `<div>main.py  assets/  config.json</div>`;
                    } else if (val.startsWith('print ')) {
                        termOut.innerHTML += `<div>${val.substring(6)}</div>`;
                    } else {
                        termOut.innerHTML += `<div style="color: var(--neon-orange);">Command not found: ${val}</div>`;
                    }
                }

                e.target.value = '';
                termOut.scrollTop = termOut.scrollHeight;
            }
        });
    }
}


