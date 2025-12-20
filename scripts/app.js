// MineCode App Controller
// Handles navigation, course rendering, and app state

window.App = window.App || {};

const AppController = {
    // Course data (like Codedex)
    courses: [
        {
            id: 'python',
            title: 'Python',
            icon: '🐍',
            desc: 'Learn the basics of programming',
            lessons: 30,
            color: '#306998',
            gradient: 'linear-gradient(135deg, #306998 0%, #1a3d5c 100%)',
            difficulty: 'Beginner'
        },
        {
            id: 'html',
            title: 'HTML',
            icon: '🌐',
            desc: 'Build the web',
            lessons: 15,
            color: '#e44d26',
            gradient: 'linear-gradient(135deg, #e44d26 0%, #a62f13 100%)',
            difficulty: 'Beginner'
        },
        {
            id: 'css',
            title: 'CSS',
            icon: '🎨',
            desc: 'Style the web',
            lessons: 20,
            color: '#2965f1',
            gradient: 'linear-gradient(135deg, #2965f1 0%, #163d8a 100%)',
            difficulty: 'Beginner'
        },
        {
            id: 'javascript',
            title: 'JavaScript',
            icon: '⚡',
            desc: 'Make it interactive',
            lessons: 35,
            color: '#f7df1e',
            gradient: 'linear-gradient(135deg, #f7df1e 0%, #9e8d0a 100%)',
            difficulty: 'Intermediate'
        },
        {
            id: 'react',
            title: 'React',
            icon: '⚛️',
            desc: 'Build modern UIs',
            lessons: 25,
            color: '#61dafb',
            gradient: 'linear-gradient(135deg, #61dafb 0%, #2a6073 100%)',
            difficulty: 'Intermediate'
        },
        {
            id: 'git',
            title: 'Git & GitHub',
            icon: '🐙',
            desc: 'Version control',
            lessons: 12,
            color: '#24292e',
            gradient: 'linear-gradient(135deg, #24292e 0%, #0d0d0d 100%)',
            difficulty: 'Beginner'
        }
    ],

    init: function () {
        console.log('[App] Initializing MineCode...');

        // Initialize modules
        if (window.App.Auth) window.App.Auth.init();

        // Bind navigation events
        this.bindNavigation();

        // Check auth state
        this.checkAuth();

        console.log('[App] ✅ Ready');
    },

    bindNavigation: function () {
        // Listen for clicks on data-route elements
        document.addEventListener('click', (e) => {
            const routeEl = e.target.closest('[data-route]');
            if (routeEl) {
                e.preventDefault();
                const route = routeEl.dataset.route;
                const param = routeEl.dataset.param;
                this.navigate(route, param);
            }
        });

        // Update active nav state
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
                item.classList.add('active');
            });
        });
    },

    checkAuth: async function () {
        // Check if user is logged in via Supabase
        if (window.App.Auth && window.App.Auth.client) {
            const { data: { session } } = await window.App.Auth.client.auth.getSession();
            if (session) {
                this.showApp();
                return;
            }
        }

        // Show intro if not logged in
        this.showIntro();
    },

    showIntro: function () {
        document.getElementById('intro-overlay').classList.remove('hidden');
        document.getElementById('app-layout').classList.add('hidden');
    },

    showApp: function () {
        document.getElementById('intro-overlay').classList.add('hidden');
        document.getElementById('auth-view').classList.add('hidden');
        document.getElementById('app-layout').classList.remove('hidden');

        // Render courses
        this.renderCourses();
        this.updateStats();
    },

    navigate: function (route, param) {
        console.log('[App] Navigate:', route, param);

        // Handle special routes
        if (route === 'auth') {
            document.getElementById('intro-overlay').classList.add('hidden');
            document.getElementById('auth-view').classList.remove('hidden');
            if (window.App.Auth) window.App.Auth.renderAuthPage();
            return;
        }

        // Show app layout
        if (route === 'home' || route === 'catalog' || route === 'challenges' ||
            route === 'community' || route === 'leaderboard') {
            document.getElementById('intro-overlay').classList.add('hidden');
            document.getElementById('auth-view').classList.add('hidden');
            document.getElementById('app-layout').classList.remove('hidden');
        }

        // Hide all views
        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));

        // Show target view
        const viewMap = {
            'home': 'home-view',
            'catalog': 'catalog-view',
            'challenges': 'challenges-view',
            'community': 'community-view',
            'leaderboard': 'leaderboard-view',
            'lesson': 'lesson-view',
            'course': 'course-detail-view'
        };

        const viewId = viewMap[route];
        if (viewId) {
            const view = document.getElementById(viewId);
            if (view) view.classList.remove('hidden');
        }

        // Special handlers
        if (route === 'course' && param) {
            this.showCourseDetail(param);
        }
        if (route === 'lesson' && param) {
            this.showLesson(param);
        }

        // Render content
        if (route === 'catalog') this.renderCatalog();
        if (route === 'leaderboard' && window.App.Leaderboard) window.App.Leaderboard.render();
    },

    renderCourses: function () {
        // Render recommended courses on home
        const recommended = document.getElementById('recommended-courses');
        const allCourses = document.getElementById('all-courses');

        if (recommended) {
            recommended.innerHTML = this.courses.slice(0, 3).map(c => this.createCourseCard(c)).join('');
        }

        if (allCourses) {
            allCourses.innerHTML = this.courses.map(c => this.createCourseCard(c)).join('');
        }
    },

    renderCatalog: function () {
        const grid = document.getElementById('catalog-grid');
        if (grid) {
            grid.innerHTML = this.courses.map(c => this.createCourseCard(c)).join('');
        }
    },

    createCourseCard: function (course) {
        const progress = this.getProgress(course.id);
        const progressPercent = progress.completed / course.lessons * 100;

        return `
            <div class="course-card" data-route="course" data-param="${course.id}">
                <div class="course-card-banner" style="background: ${course.gradient}">
                    <span class="course-card-icon">${course.icon}</span>
                    <span class="course-card-badge">${course.lessons} lessons</span>
                </div>
                <div class="course-card-content">
                    <h3 class="course-card-title">${course.title}</h3>
                    <p class="course-card-desc">${course.desc}</p>
                    <div class="course-card-meta">
                        <span>${course.difficulty}</span>
                    </div>
                    ${progressPercent > 0 ? `
                        <div class="course-card-progress">
                            <div class="progress-text">
                                <span>${progress.completed}/${course.lessons}</span>
                                <span>${Math.round(progressPercent)}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progressPercent}%"></div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    },

    showCourseDetail: function (courseId) {
        const course = this.courses.find(c => c.id === courseId);
        if (!course) return;

        const container = document.getElementById('course-detail-view');
        container.innerHTML = `
            <div class="course-hero" style="background: ${course.gradient}">
                <span class="course-hero-icon">${course.icon}</span>
                <h1 class="course-hero-title">${course.title}</h1>
                <p class="course-hero-desc">${course.desc}</p>
            </div>
            <div class="course-chapters">
                <h2>Chapters</h2>
                <div class="chapters-list">
                    ${this.generateChapters(course)}
                </div>
            </div>
        `;

        // Add course detail styles if not exists
        if (!document.getElementById('course-detail-styles')) {
            const style = document.createElement('style');
            style.id = 'course-detail-styles';
            style.textContent = `
                .course-hero {
                    text-align: center;
                    padding: 60px 40px;
                    border-radius: var(--radius-xl);
                    margin-bottom: 32px;
                }
                .course-hero-icon { font-size: 5rem; display: block; margin-bottom: 16px; }
                .course-hero-title { 
                    font-size: 2.5rem; font-weight: 800; color: white; margin: 0 0 8px; 
                }
                .course-hero-desc { color: rgba(255,255,255,0.8); margin: 0; }
                .course-chapters h2 { margin-bottom: 20px; color: var(--text-bright); }
                .chapters-list { display: flex; flex-direction: column; gap: 12px; }
                .chapter-item {
                    display: flex; align-items: center; gap: 16px;
                    padding: 16px 20px;
                    background: var(--bg-panel);
                    border: 1px solid var(--border-subtle);
                    border-radius: var(--radius-lg);
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .chapter-item:hover {
                    border-color: var(--primary);
                    background: var(--bg-elevated);
                }
                .chapter-num {
                    width: 36px; height: 36px;
                    display: flex; align-items: center; justify-content: center;
                    background: var(--primary-subtle);
                    color: var(--primary);
                    border-radius: var(--radius-md);
                    font-weight: 700;
                }
                .chapter-title { flex: 1; font-weight: 500; color: var(--text-bright); }
                .chapter-status { color: var(--text-muted); font-size: 0.85rem; }
            `;
            document.head.appendChild(style);
        }
    },

    generateChapters: function (course) {
        const lessons = course.lessons;
        let html = '';
        for (let i = 1; i <= Math.min(lessons, 10); i++) {
            html += `
                <div class="chapter-item" data-route="lesson" data-param="${course.id}-${i}">
                    <span class="chapter-num">${i}</span>
                    <span class="chapter-title">Lesson ${i}</span>
                    <span class="chapter-status">Start →</span>
                </div>
            `;
        }
        return html;
    },

    showLesson: function (lessonId) {
        if (window.App.LearningEngine) {
            window.App.LearningEngine.load(lessonId);
        }
    },

    getProgress: function (courseId) {
        // Get from localStorage or return defaults
        const saved = localStorage.getItem(`progress_${courseId}`);
        if (saved) return JSON.parse(saved);
        return { completed: 0 };
    },

    updateStats: function () {
        // Get user stats from localStorage
        const xp = localStorage.getItem('minecode_xp') || 0;
        const streak = localStorage.getItem('minecode_streak') || 0;
        const lessons = localStorage.getItem('minecode_lessons') || 0;

        document.getElementById('stat-xp').textContent = xp;
        document.getElementById('stat-streak').textContent = streak;
        document.getElementById('stat-lessons').textContent = lessons;
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    AppController.init();
});

window.App.Controller = AppController;
