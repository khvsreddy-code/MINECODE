// Global Navigation Module
window.App = window.App || {};

const Nav = {
    routes: [
        { id: 'dashboard', label: 'Home', icon: '🏠' },
        { id: 'courses-view', label: 'Learn', icon: '📚' },
        { id: 'challenges', label: 'Practice', icon: '⚔️' },
        { id: 'community', label: 'Community', icon: '🌐' },
        { id: 'leaderboard', label: 'Rankings', icon: '🏆' },
        { id: 'shop', label: 'Shop', icon: '🔧' }
    ],

    render: function (activeRoute = '') {
        return `
            <header class="nav-global">
                <a href="#" class="nav-brand" data-route="dashboard">
                    <span style="font-size: 1.5rem;">⚡</span>
                    <span class="text-gradient">MINECODE</span>
                </a>
                <nav class="nav-links">
                    ${this.routes.map(r => `
                        <a href="#" class="nav-link ${activeRoute === r.id ? 'active' : ''}" data-route="${r.id}">
                            <span>${r.icon}</span>
                            <span>${r.label}</span>
                        </a>
                    `).join('')}
                </nav>
                <div class="nav-actions">
                    <div class="streak-display">
                        <span class="streak-fire">🔥</span>
                        <span>0</span>
                    </div>
                    <div class="xp-display">
                        <span class="xp-icon">💠</span>
                        <span>${this.getXP()} XP</span>
                    </div>
                    <div class="level-badge">1</div>
                </div>
            </header>
        `;
    },

    getXP: function () {
        if (window.App.Lattice && window.App.Lattice.state) {
            return window.App.Lattice.state.xp || 0;
        }
        return 0;
    },

    injectGlobalNav: function () {
        if (document.querySelector('.nav-global')) return;

        const navHtml = this.render();
        document.body.insertAdjacentHTML('afterbegin', navHtml);
    }
};

window.App.Nav = Nav;
