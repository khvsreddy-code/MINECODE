
/**
 * AUTHENTICATION MODULE
 * Handles Sign Up, Login, and Sign Out
 */

const Auth = {
    user: null,
    profile: null,

    /**
     * Initialize Auth Listener
     */
    async init() {
        if (!window.supabaseClient) return;

        // Check active session
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        this.updateUserState(session?.user ?? null);

        // Listen for auth changes
        window.supabaseClient.auth.onAuthStateChange((_event, session) => {
            console.log('🔐 Auth State Changed:', _event);
            this.updateUserState(session?.user ?? null);
        });
    },

    /**
     * Sign Up with Email/Password
     */
    async signUp(email, password, username) {
        // 1. Sign Up Auth User
        const { data, error } = await window.supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: { username } // Store metadata
            }
        });

        if (error) throw error;

        // 2. Create Profile Entry (if trigger doesn't exist)
        if (data.user) {
            await this.createProfile(data.user, username);
        }

        return data;
    },

    /**
     * Sign In with Email/Password
     */
    async signIn(email, password) {
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        return data;
    },

    /**
     * Sign Out
     */
    async signOut() {
        const { error } = await window.supabaseClient.auth.signOut();
        if (error) throw error;
        UIUtils.toast('Logged out successfully', 'info');
    },

    /**
     * Create Profile Record in Public Table
     */
    async createProfile(user, username) {
        const { error } = await window.supabaseClient
            .from('profiles')
            .insert({
                id: user.id,
                username: username,
                avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
                level: 1,
                total_xp: 0
            });

        if (error) {
            console.error('Profile creation failed:', error);
            // Don't throw, auth succeeded
        }
    },

    /**
     * Fetch Full Profile Data
     */
    async fetchProfile(userId) {
        const { data, error } = await window.supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) console.error('Error fetching profile:', error);
        return data;
    },

    /**
     * Internal: Update UI State
     */
    async updateUserState(user) {
        this.user = user;
        const body = document.body;
        const navAvatar = document.getElementById('nav-avatar');
        const welcomeMsg = document.querySelector('.welcome-bubble .typing-effect');
        const loginBtn = document.getElementById('join-club-btn'); // Reuse this btn for login for now

        if (user) {
            body.classList.add('logged-in');
            body.classList.remove('logged-out');

            // Fetch extra profile data
            this.profile = await this.fetchProfile(user.id);
            const username = this.profile?.username || user.user_metadata.username || 'User';

            // Update UI
            if (navAvatar) navAvatar.innerHTML = `<img src="${this.profile?.avatar_url || 'assets/default-avatar.png'}" class="avatar-img">`;
            if (welcomeMsg) welcomeMsg.textContent = `Welcome back, ${username}! System Online.`;
            if (loginBtn) {
                loginBtn.textContent = 'Log Out';
                loginBtn.onclick = () => this.signOut();
            }

            UIUtils.toast(`Welcome back, ${username}`, 'success');

        } else {
            body.classList.remove('logged-in');
            body.classList.add('logged-out');

            if (navAvatar) navAvatar.innerHTML = '<i data-lucide="user" style="width:20px;height:20px;color:#22d3ee;"></i>';
            if (window.lucide) window.lucide.createIcons();

            if (welcomeMsg) welcomeMsg.textContent = 'System Standby. Please initialize link to proceed.';
            if (loginBtn) {
                loginBtn.textContent = 'Login / Sign Up';
                loginBtn.onclick = () => {
                    if (window.navigateTo) window.navigateTo('login');
                    else window.location.hash = '#auth';
                };
            }
        }
    }
};

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});

window.Auth = Auth;
