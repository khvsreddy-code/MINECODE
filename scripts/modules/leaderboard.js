// Leaderboard Module: Neural Rankings
window.App = window.App || {};

const Leaderboard = {
    state: {
        view: 'weekly', // 'weekly' | 'alltime' | 'faction'
        players: [
            { rank: 1, name: 'Null_Pointer', xp: 12500, level: 15, faction: 'Void Walkers', avatar: '🧙' },
            { rank: 2, name: 'Binary_Bard', xp: 11200, level: 14, faction: 'Syntax Guild', avatar: '🎸' },
            { rank: 3, name: 'Cyber_Kate', xp: 9800, level: 12, faction: 'Void Walkers', avatar: '🤖' },
            { rank: 4, name: 'Glitch_Wizard', xp: 8500, level: 11, faction: 'Bug Hunters', avatar: '🧪' },
            { rank: 5, name: 'Neo_77', xp: 7200, level: 10, faction: 'Syntax Guild', avatar: '😎' },
            { rank: 6, name: 'Dev_X', xp: 6000, level: 9, faction: 'Bug Hunters', avatar: '💻' },
            { rank: 7, name: 'Lambda_Lord', xp: 5500, level: 8, faction: 'Void Walkers', avatar: '🐍' },
            { rank: 8, name: 'Script_Kid', xp: 4200, level: 7, faction: 'Newbie Nest', avatar: '🐣' },
            { rank: 9, name: 'You', xp: 1250, level: 3, faction: 'Newbie Nest', avatar: '🚀', isUser: true },
            { rank: 10, name: 'Code_Cadet', xp: 800, level: 2, faction: 'Newbie Nest', avatar: '🌱' }
        ]
    },

    init: function () {
        this.container = document.getElementById('leaderboard-view');
        if (this.container && !this.container.classList.contains('hidden')) {
            this.render();
        }
    },

    render: function () {
        if (!this.container) return;

        this.container.innerHTML = `
            <header class="dashboard-header">
                <div class="logo">MINECODE</div>
                <nav class="top-nav">
                    <a href="#" data-route="dashboard">Dashboard</a>
                    <a href="#" data-route="courses-view">Courses</a>
                    <a href="#" data-route="challenges">Arena</a>
                    <a href="#" data-route="community">Lattice</a>
                    <a href="#" class="active" data-route="leaderboard">Rankings</a>
                </nav>
            </header>

            <div class="leaderboard-container">
                <div class="leaderboard-hero">
                    <h1 class="cyber-glitch" data-text="NEURAL RANKINGS">NEURAL RANKINGS</h1>
                    <p class="subtitle">The brightest minds in the MineCode network.</p>
                    
                    <div class="view-tabs">
                        <button class="${this.state.view === 'weekly' ? 'active' : ''}" data-view="weekly">This Week</button>
                        <button class="${this.state.view === 'alltime' ? 'active' : ''}" data-view="alltime">All Time</button>
                        <button class="${this.state.view === 'faction' ? 'active' : ''}" data-view="faction">Factions</button>
                    </div>
                </div>

                <!-- Top 3 Podium -->
                <div class="podium">
                    ${this.renderPodium()}
                </div>

                <!-- Full Rankings List -->
                <div class="rankings-list">
                    ${this.state.players.map((p, i) => this.renderRow(p, i)).join('')}
                </div>
            </div>
        `;

        this.bindEvents();
    },

    renderPodium: function () {
        const top3 = this.state.players.slice(0, 3);
        // Order: 2nd, 1st, 3rd for visual layout
        const ordered = [top3[1], top3[0], top3[2]];
        const heights = ['140px', '180px', '100px'];
        const medals = ['🥈', '🥇', '🥉'];

        return ordered.map((p, i) => `
            <div class="podium-spot" style="--height: ${heights[i]}">
                <div class="podium-avatar">${p.avatar}</div>
                <div class="podium-medal">${medals[i]}</div>
                <div class="podium-name">${p.name}</div>
                <div class="podium-xp">${p.xp.toLocaleString()} XP</div>
                <div class="podium-bar"></div>
            </div>
        `).join('');
    },

    renderRow: function (player, index) {
        const isTop3 = player.rank <= 3;
        const isUser = player.isUser;

        return `
            <div class="rank-row ${isTop3 ? 'top-3' : ''} ${isUser ? 'highlight-user' : ''}" style="animation-delay: ${index * 0.05}s">
                <div class="rank-pos">#${player.rank}</div>
                <div class="rank-avatar">${player.avatar}</div>
                <div class="rank-info">
                    <span class="rank-name">${player.name} ${isUser ? '(You)' : ''}</span>
                    <span class="rank-faction">${player.faction}</span>
                </div>
                <div class="rank-stats">
                    <span class="rank-level">LVL ${player.level}</span>
                    <span class="rank-xp">${player.xp.toLocaleString()} XP</span>
                </div>
            </div>
        `;
    },

    bindEvents: function () {
        this.container.querySelectorAll('.view-tabs button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.state.view = e.target.dataset.view;
                this.render();
            });
        });
    }
};

window.App.Leaderboard = Leaderboard;
