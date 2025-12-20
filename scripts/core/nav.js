// Global Navigation Module
window.App = window.App || {};

const Nav = {
    routes: [
        { id: 'dashboard', label: 'Home', icon: 'home' },
        { id: 'courses-view', label: 'Learn', icon: 'book-open' },
        { id: 'challenges', label: 'Practice', icon: 'swords' },
        { id: 'community', label: 'Community', icon: 'globe' },
        { id: 'leaderboard', label: 'Rankings', icon: 'trophy' },
        { id: 'shop', label: 'Shop', icon: 'wrench' }
    ],

    render: function (activeRoute = '') {
        return `
            <header class="nav-global">
                <a href="#" class="nav-brand" data-route="dashboard">
                    <i data-lucide="zap" style="width:24px;height:24px;color:#ffc800;"></i>
                    <span class="text-gradient">MINECODE</span>
                </a>
                <nav class="nav-links">
                    ${this.routes.map(r => `
                        <a href="#" class="nav-link ${activeRoute === r.id ? 'active' : ''}" data-route="${r.id}">
                            <i data-lucide="${r.icon}" style="width:18px;height:18px;"></i>
                            <span>${r.label}</span>
                        </a>
                    `).join('')}
                </nav>
                <div class="nav-actions">
                    <div class="streak-display">
                        <i data-lucide="flame" style="width:18px;height:18px;color:#f97316;"></i>
                        <span>0</span>
                    </div>
                    <div class="xp-display">
                        <i data-lucide="hexagon" style="width:18px;height:18px;color:#22d3ee;"></i>
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
