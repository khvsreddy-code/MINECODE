// MineCode Core App
// Single clean controller

const SUPABASE_URL = 'https://eskyhqcbbjsvobsdqkgh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVza3locWNiYmpzdm9ic2Rxa2doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNDExMzMsImV4cCI6MjA4MTcxNzEzM30.0nAqMaPMyVHzTtJwjJXubXdMfbjyUlfc0batLn-hr3o';

// Course data (Codedex style)
const COURSES = [
    {
        id: 'python',
        title: 'Python',
        icon: '🐍',
        desc: 'Learn the basics of programming',
        lessons: 30,
        gradient: 'linear-gradient(135deg, #306998 0%, #1a3d5c 100%)',
        difficulty: 'Beginner'
    },
    {
        id: 'html',
        title: 'HTML',
        icon: '🌐',
        desc: 'Build the structure of the web',
        lessons: 15,
        gradient: 'linear-gradient(135deg, #e44d26 0%, #a62f13 100%)',
        difficulty: 'Beginner'
    },
    {
        id: 'css',
        title: 'CSS',
        icon: '🎨',
        desc: 'Style and design websites',
        lessons: 20,
        gradient: 'linear-gradient(135deg, #2965f1 0%, #163d8a 100%)',
        difficulty: 'Beginner'
    },
    {
        id: 'javascript',
        title: 'JavaScript',
        icon: '⚡',
        desc: 'Add interactivity to websites',
        lessons: 35,
        gradient: 'linear-gradient(135deg, #f7df1e 0%, #9e8d0a 100%)',
        difficulty: 'Intermediate'
    },
    {
        id: 'react',
        title: 'React',
        icon: '⚛️',
        desc: 'Build modern user interfaces',
        lessons: 25,
        gradient: 'linear-gradient(135deg, #61dafb 0%, #2a6073 100%)',
        difficulty: 'Intermediate'
    },
    {
        id: 'git',
        title: 'Git & GitHub',
        icon: '🐙',
        desc: 'Version control for developers',
        lessons: 12,
        gradient: 'linear-gradient(135deg, #f05032 0%, #6e5494 100%)',
        difficulty: 'Beginner'
    }
];

let supabase = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('[MineCode] DOM loaded, initializing...');
    bindEvents();
    initSupabase();
    console.log('[MineCode] ✅ App initialized');
});

async function initSupabase() {
    // Load Supabase SDK
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = () => {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        checkAuth();
    };
    document.head.appendChild(script);
}

async function checkAuth() {
    if (!supabase) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        showMainApp(session.user);
    }
}

function bindEvents() {
    console.log('[MineCode] Binding events...');

    // Get Started button
    const getStartedBtn = document.getElementById('get-started-btn');
    console.log('[MineCode] Get Started button:', getStartedBtn);

    getStartedBtn?.addEventListener('click', () => {
        console.log('[MineCode] Get Started clicked!');
        // Skip login - go directly to main app
        showMainApp(null);
    });

    // Login link
    document.getElementById('login-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        showScreen('auth-screen');
    });

    // Google login
    document.getElementById('google-btn')?.addEventListener('click', async () => {
        if (!supabase) return;
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.origin + window.location.pathname }
        });
    });

    // GitHub login
    document.getElementById('github-btn')?.addEventListener('click', async () => {
        if (!supabase) return;
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: { redirectTo: window.location.origin + window.location.pathname }
        });
    });

    // Guest login
    document.getElementById('guest-btn')?.addEventListener('click', () => {
        showMainApp(null);
    });

    // Menu navigation
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.dataset.view;
            if (view) switchView(view);

            // Update active state
            document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Section links
    document.querySelectorAll('.section-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = link.dataset.view;
            if (view) {
                switchView(view);
                document.querySelectorAll('.menu-item').forEach(m => {
                    m.classList.toggle('active', m.dataset.view === view);
                });
            }
        });
    });
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId)?.classList.add('active');
}

function showMainApp(user) {
    showScreen('main-app');

    // Update user info
    if (user) {
        document.getElementById('user-name').textContent = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
        if (user.user_metadata?.avatar_url) {
            document.getElementById('user-avatar').innerHTML = `<img src="${user.user_metadata.avatar_url}" style="width:100%;height:100%;border-radius:12px;">`;
        }
    }

    // Render courses
    renderCourses();
}

function switchView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId + '-view')?.classList.add('active');

    // Render content
    if (viewId === 'courses') {
        renderAllCourses();
    }
}

function renderCourses() {
    const grid = document.getElementById('courses-grid');
    if (!grid) return;

    grid.innerHTML = COURSES.map(course => createCourseCard(course)).join('');
    bindCourseClicks();
}

function renderAllCourses() {
    const grid = document.getElementById('all-courses-grid');
    if (!grid) return;

    grid.innerHTML = COURSES.map(course => createCourseCard(course)).join('');
    bindCourseClicks();
}

function createCourseCard(course) {
    return `
        <div class="course-card" data-course="${course.id}">
            <div class="course-banner" style="background: ${course.gradient}">
                <span class="course-icon">${course.icon}</span>
                <span class="course-badge">${course.lessons} lessons</span>
            </div>
            <div class="course-info">
                <div class="course-title">${course.title}</div>
                <div class="course-desc">${course.desc}</div>
                <div class="course-meta">
                    <span>${course.difficulty}</span>
                </div>
            </div>
        </div>
    `;
}

function bindCourseClicks() {
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', () => {
            const courseId = card.dataset.course;
            showCourseDetail(courseId);
        });
    });
}

function showCourseDetail(courseId) {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return;

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    const view = document.getElementById('course-detail-view');
    view.classList.add('active');

    view.innerHTML = `
        <div class="course-hero" style="background: ${course.gradient}; padding: 60px 40px; border-radius: 16px; text-align: center; margin-bottom: 32px;">
            <span style="font-size: 72px; display: block; margin-bottom: 16px;">${course.icon}</span>
            <h1 style="font-size: 36px; font-weight: 800; color: white; margin-bottom: 8px;">${course.title}</h1>
            <p style="color: rgba(255,255,255,0.8);">${course.desc}</p>
        </div>
        
        <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 20px;">Lessons</h2>
        <div class="lessons-list" style="display: flex; flex-direction: column; gap: 12px;">
            ${generateLessons(course)}
        </div>
    `;
}

function generateLessons(course) {
    let html = '';
    for (let i = 1; i <= Math.min(course.lessons, 10); i++) {
        html += `
            <div class="lesson-item" style="display: flex; align-items: center; gap: 16px; padding: 16px 20px; background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.borderColor='var(--accent-cyan)'" onmouseout="this.style.borderColor='var(--border)'">
                <span style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: rgba(0,212,255,0.1); color: var(--accent-cyan); border-radius: 8px; font-weight: 700;">${i}</span>
                <span style="flex: 1; font-weight: 500; color: var(--text-white);">Lesson ${i}</span>
                <span style="color: var(--text-muted); font-size: 14px;">Start →</span>
            </div>
        `;
    }
    return html;
}
