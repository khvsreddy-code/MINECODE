// Community Module: The Lattice
window.App = window.App || {};

const Community = {
    simulationInterval: null,

    // Fake Data Generators
    users: ['Neo_77', 'Cyber_Kate', 'Glitch_Wizard', 'Data_Druid', 'Pixel_Ronin', 'Byte_Slayer', 'Void_Walker'],
    actions: ['completed', 'earned', 'joined', 'posted', 'forked'],
    targets: ['Python: Snake Pit', 'JS: Reactor Core', 'Bug Hunter Badge', 'Neural Net v1', 'The Lattice'],
    icons: ['🐍', '⚛️', '🐛', '🚀', '👋', '🏆'],

    init: function () {
        this.container = document.getElementById('community-view');
        // Render if active
        if (this.container && !this.container.classList.contains('hidden')) {
            this.render();
            this.startSimulation();
        } else {
            this.stopSimulation();
        }
    },

    stopSimulation: function () {
        if (this.simulationInterval) clearInterval(this.simulationInterval);
    },

    startSimulation: function () {
        // Prevent multiple intervals
        this.stopSimulation();

        // Add a new random event every 3-7 seconds
        this.simulationInterval = setInterval(() => {
            if (document.hidden) return; // Pause if tab hidden
            this.addRandomEvent();
        }, 4000);
    },

    addRandomEvent: function () {
        const user = this.users[Math.floor(Math.random() * this.users.length)];
        const action = this.actions[Math.floor(Math.random() * this.actions.length)];
        const target = this.targets[Math.floor(Math.random() * this.targets.length)];
        const icon = this.icons[Math.floor(Math.random() * this.icons.length)];

        const newItem = {
            user: user,
            action: action,
            target: target,
            time: 'Just now',
            icon: icon
        };

        this.injectItem(newItem);
    },

    injectItem: function (item) {
        const stream = document.querySelector('.feed-stream');
        if (!stream) return;

        // Skip input wrapper (first child)
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="feed-item fade-in" style="border-left: 3px solid var(--neon-green)">
                <div class="feed-avatar">${item.user[0]}</div>
                <div class="feed-content">
                    <div class="feed-meta">
                        <span class="username">${item.user}</span>
                        <span class="action">${item.action}</span>
                        <span class="time">${item.time}</span>
                    </div>
                    <div class="feed-target">
                        <span class="feed-icon">${item.icon}</span> ${item.target}
                    </div>
                </div>
            </div>
        `;

        // Insert after the input box (index 1)
        const inputBox = stream.querySelector('.feed-input');
        if (inputBox && inputBox.nextSibling) {
            stream.insertBefore(wrapper.firstElementChild, inputBox.nextSibling);
        } else {
            stream.appendChild(wrapper.firstElementChild);
        }

        // Limit stream size to 50 items
        if (stream.children.length > 50) {
            stream.lastElementChild.remove();
        }
    },

    handlePost: function () {
        const input = document.querySelector('.feed-input input');
        if (!input || !input.value.trim()) return;

        const myPost = {
            user: 'You',
            action: 'broadcasted',
            target: input.value,
            time: 'Just now',
            icon: '📡'
        };

        this.injectItem(myPost);
        input.value = ''; // Clear
    },

    render: function () {
        if (!this.container) return;

        // Initial Seed Data
        const feedItems = [
            { user: 'Neo_77', action: 'completed', target: 'Python: The Snake Pit', time: '2m ago', icon: '🐍' },
            { user: 'Cyber_Kate', action: 'earned', target: 'Bug Hunter Badge', time: '5m ago', icon: '🐛' },
            { user: 'System', action: 'alert', target: 'Global Challenge: Void Breach', time: '1h ago', icon: '⚠️' }
        ];

        this.container.innerHTML = `
            <header class="dashboard-header">
                <div class="logo-area">
                    <span class="brand-text">MINECODE</span><span class="brand-patch">v2.0</span>
                </div>
                <nav class="top-nav">
                    <a href="#" onclick="window.App.router.navigate('dashboard')">Dashboard</a>
                    <a href="#" onclick="window.App.router.navigate('courses')">Courses</a>
                    <a href="#" onclick="window.App.router.navigate('profile')">Identity</a>
                    <a href="#" class="active">Lattice</a>
                </nav>
            </header>

            <div class="lattice-container">
                <!-- LEFT: Daily Sidebar -->
                <aside class="cafe-sidebar">
                    <div class="cafe-card">
                        <div class="cafe-header">
                            <h3>☕ DAILY UPLINK</h3>
                            <span class="live-badge">LIVE</span>
                        </div>
                        <div class="challenge-box">
                            <h4>Mission: Syntax Repair</h4>
                            <p>Fix 5 conditionals in Python.</p>
                            <div class="progress-bar-sm">
                                <div class="fill" style="width: 60%; background: var(--neon-orange)"></div>
                            </div>
                            <span class="progress-text" style="font-size: 12px; color: var(--text-muted)">3/5 Completed</span>
                            <button class="btn-cyber-primary small" style="width:100%; margin-top:12px">RESUME</button>
                        </div>
                    </div>

                    <div class="cafe-card">
                        <div class="cafe-header">
                            <h3>🏆 LEADERBOARD</h3>
                        </div>
                        <ul class="leaderboard-list">
                            <li><span class="rank">#1</span> <span class="u">Null_Pointer</span> <span class="s glow-cyan">9950 XP</span></li>
                            <li><span class="rank">#2</span> <span class="u">Binary_Bard</span> <span class="s">8200 XP</span></li>
                            <li><span class="rank">#3</span> <span class="u">You</span> <span class="s">1250 XP</span></li>
                        </ul>
                    </div>
                </aside>

                <!-- RIGHT: The Feed -->
                <section class="feed-section">
                    <div class="feed-header">
                        <h2>GLOBAL_ACTIVITY_STREAM</h2>
                        <div class="filter-tabs">
                            <span class="active">ALL SIGNALS</span>
                            <span>SHOWCASE</span>
                            <span>ALERTS</span>
                        </div>
                    </div>

                    <div class="feed-stream">
                        <div class="feed-input">
                            <div class="feed-avatar" style="background:var(--bg-elevated); border:1px solid var(--neon-cyan)">You</div>
                            <input type="text" placeholder="Broadcast to the Lattice..." onkeypress="if(event.key === 'Enter') window.App.Community.handlePost()" />
                            <button class="btn-icon" onclick="window.App.Community.handlePost()">📡</button>
                        </div>

                        <!-- Stream Items -->
                        ${feedItems.map(item => `
                            <div class="feed-item">
                                <div class="feed-avatar">${item.user[0]}</div>
                                <div class="feed-content">
                                    <div class="feed-meta">
                                        <span class="username">${item.user}</span>
                                        <span class="action">${item.action}</span>
                                        <span class="time">${item.time}</span>
                                    </div>
                                    <div class="feed-target">
                                        <span class="feed-icon">${item.icon}</span> ${item.target}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            </div>
        `;
    }
};

window.App.Community = Community;
