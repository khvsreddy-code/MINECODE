// Challenges Module: The Arena
window.App = window.App || {};

const Challenges = {
    state: {
        packs: [
            { id: 'data-breach', name: 'Data Breach', difficulty: 'Beginner', icon: '🔓', desc: 'Fix broken loops.', challenges: 5, completed: 3, xp: 150 },
            { id: 'syntax-storm', name: 'Syntax Storm', difficulty: 'Intermediate', icon: '⚡', desc: 'Survive 10 rapid-fire syntax errors.', challenges: 10, completed: 0, xp: 300 },
            { id: 'void-walker', name: 'Void Walker', difficulty: 'Advanced', icon: '🌑', desc: 'Navigate recursive functions.', challenges: 8, completed: 0, xp: 500 },
            { id: 'api-hunter', name: 'API Hunter', difficulty: 'Expert', icon: '🌐', desc: 'Consume and process live APIs.', challenges: 6, completed: 0, xp: 750 },
            { id: 'logic-gates', name: 'Logic Gates', difficulty: 'Beginner', icon: '🚪', desc: 'Master conditionals.', challenges: 7, completed: 7, xp: 200 },
            { id: 'memory-leak', name: 'Memory Leak', difficulty: 'Advanced', icon: '🧠', desc: 'Optimize for performance.', challenges: 5, completed: 0, xp: 400 }
        ],
        activeChallenge: null
    },

    init: function () {
        this.container = document.getElementById('challenges-view');
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
                    <a href="#" class="active" data-route="challenges">Arena</a>
                    <a href="#" data-route="community">Lattice</a>
                    <a href="#" data-route="shop">Fabricator</a>
                </nav>
            </header>

            <div class="arena-container">
                <div class="arena-hero">
                    <h1 class="cyber-glitch" data-text="THE ARENA">THE ARENA</h1>
                    <p class="subtitle">Prove your logic. Breach the data. Ascend the ranks.</p>
                    <div class="arena-stats">
                        <div class="stat"><span class="val">${this.getTotalCompleted()}</span><span class="label">BREACHED</span></div>
                        <div class="stat"><span class="val">${this.getTotalXP()}</span><span class="label">XP EARNED</span></div>
                    </div>
                </div>

                <div class="hex-grid">
                    ${this.state.packs.map((pack, i) => this.renderHexNode(pack, i)).join('')}
                </div>

                <!-- Lofi Radio Widget -->
                <div class="lofi-widget">
                    <span class="icon">🎵</span>
                    <span class="label">Focus Beats</span>
                    <button class="btn-icon" id="lofi-toggle">▶</button>
                </div>
            </div>
        `;

        // Bind events
        this.container.querySelectorAll('.hex-node').forEach(node => {
            node.addEventListener('click', (e) => this.openPack(e.target.closest('.hex-node').dataset.id));
        });
    },

    renderHexNode: function (pack, index) {
        const isComplete = pack.completed === pack.challenges;
        const progress = (pack.completed / pack.challenges) * 100;

        return `
            <div class="hex-node ${isComplete ? 'complete' : ''} ${pack.completed > 0 ? 'active' : 'locked'}" data-id="${pack.id}" style="animation-delay: ${index * 0.1}s">
                <div class="hex-inner">
                    <div class="hex-icon">${pack.icon}</div>
                    <div class="hex-title">${pack.name}</div>
                    <div class="hex-meta">
                        <span class="diff ${pack.difficulty.toLowerCase()}">${pack.difficulty}</span>
                        <span class="xp">+${pack.xp} XP</span>
                    </div>
                    <div class="hex-progress">
                        <div class="bar" style="width: ${progress}%"></div>
                    </div>
                    <div class="hex-count">${pack.completed}/${pack.challenges}</div>
                </div>
                <div class="hex-glow"></div>
            </div>
        `;
    },

    openPack: function (packId) {
        const pack = this.state.packs.find(p => p.id === packId);
        if (!pack) return;

        // For now, just alert. Later, this would open a Challenge Detail View.
        alert(`Opening Challenge Pack: ${pack.name}\n\n${pack.desc}\n\nProgress: ${pack.completed}/${pack.challenges}`);
    },

    getTotalCompleted: function () {
        return this.state.packs.reduce((sum, p) => sum + p.completed, 0);
    },

    getTotalXP: function () {
        return this.state.packs.reduce((sum, p) => sum + (p.completed > 0 ? Math.floor((p.completed / p.challenges) * p.xp) : 0), 0);
    }
};

window.App.Challenges = Challenges;
