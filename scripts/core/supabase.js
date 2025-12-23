// Supabase Authentication Module
window.App = window.App || {};

const SUPABASE_URL = 'https://eskyhqcbbjsvobsdqkgh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVza3locWNiYmpzdm9ic2Rxa2doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNDExMzMsImV4cCI6MjA4MTcxNzEzM30.0nAqMaPMyVHzTtJwjJXubXdMfbjyUlfc0batLn-hr3o';

// Load Supabase client from CDN
const loadSupabase = () => {
    return new Promise((resolve, reject) => {
        if (window.supabase) {
            resolve(window.supabase);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = () => {
            console.log('[Auth] Supabase SDK loaded');
            resolve(window.supabase);
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

const Auth = {
    client: null,
    user: null,

    init: async function () {
        try {
            await loadSupabase();
            this.client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log('[Auth] ✅ Supabase client initialized');

            // Check for existing session
            const { data: { session } } = await this.client.auth.getSession();
            if (session) {
                this.user = session.user;
                console.log('[Auth] Existing session found:', this.user.email);
                return true;
            }

            // Listen for auth changes
            this.client.auth.onAuthStateChange((event, session) => {
                console.log('[Auth] State changed:', event);
                if (session) {
                    this.user = session.user;
                    this.onLogin(session.user);
                } else {
                    this.user = null;
                }
            });

            return false;
        } catch (err) {
            console.error('[Auth] Init failed:', err);
            return false;
        }
    },

    signInWithGoogle: async function () {
        try {
            const { data, error } = await this.client.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin + window.location.pathname
                }
            });

            if (error) throw error;
            return data;
        } catch (err) {
            console.error('[Auth] Google sign-in failed:', err);
            this.showError('Google sign-in failed. Please try again.');
            return null;
        }
    },

    signInWithGitHub: async function () {
        try {
            const { data, error } = await this.client.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: window.location.origin + window.location.pathname
                }
            });

            if (error) throw error;
            return data;
        } catch (err) {
            console.error('[Auth] GitHub sign-in failed:', err);
            this.showError('GitHub sign-in failed. Please try again.');
            return null;
        }
    },

    signOut: async function () {
        try {
            const { error } = await this.client.auth.signOut();
            if (error) throw error;

            this.user = null;
            console.log('[Auth] Signed out');

            // Redirect to login
            if (window.App.Router) {
                window.App.Router.show('auth');
            }
        } catch (err) {
            console.error('[Auth] Sign out failed:', err);
        }
    },

    onLogin: function (user) {
        console.log('[Auth] ✅ Logged in as:', user.email);

        // Update Lattice with user data
        if (window.App.Lattice) {
            window.App.Lattice.state.user = {
                id: user.id,
                email: user.email,
                name: user.user_metadata?.full_name || user.email.split('@')[0],
                avatar: user.user_metadata?.avatar_url || null
            };
            window.App.Lattice.save();
        }

        // Navigate to dashboard
        if (window.App.Router) {
            window.App.Router.show('dashboard');
        }
    },

    getUser: function () {
        return this.user;
    },

    isLoggedIn: function () {
        return !!this.user;
    },

    showError: function (message) {
        const errorEl = document.getElementById('auth-error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.remove('hidden');
            setTimeout(() => errorEl.classList.add('hidden'), 5000);
        }
    },

    // Render the auth page
    renderAuthPage: function () {
        const container = document.getElementById('auth-view');
        if (!container) return;

        container.innerHTML = `
            <div class="auth-container">
                <div class="auth-card animate-fade-in-up">
                    <div class="auth-header">
                        <div class="auth-logo">⚡</div>
                        <h1 class="auth-title text-gradient">Welcome to MineCode</h1>
                        <p class="auth-subtitle">Sign in to track your progress and join the community</p>
                    </div>
                    
                    <div id="auth-error" class="auth-error hidden"></div>
                    
                    <div class="auth-buttons">
                        <button class="auth-btn google-btn" id="google-signin">
                            <svg class="auth-icon" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continue with Google
                        </button>
                        
                        <button class="auth-btn github-btn" id="github-signin">
                            <svg class="auth-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            Continue with GitHub
                        </button>
                    </div>
                    
                    <p class="auth-footer">
                        By signing in, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                    </p>
                </div>
                
                <div class="auth-features">
                    <div class="feature-item animate-fade-in-up" style="animation-delay: 0.1s">
                        <span class="feature-icon">📊</span>
                        <span>Track your progress</span>
                    </div>
                    <div class="feature-item animate-fade-in-up" style="animation-delay: 0.2s">
                        <span class="feature-icon">🏆</span>
                        <span>Earn XP & badges</span>
                    </div>
                    <div class="feature-item animate-fade-in-up" style="animation-delay: 0.3s">
                        <span class="feature-icon">🌐</span>
                        <span>Join the community</span>
                    </div>
                </div>
            </div>
        `;

        // Bind events
        document.getElementById('google-signin')?.addEventListener('click', () => this.signInWithGoogle());
        document.getElementById('github-signin')?.addEventListener('click', () => this.signInWithGitHub());
    }
};

window.App.Auth = Auth;
