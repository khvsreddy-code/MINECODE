// Profile Module: The Identity Disc
window.App = window.App || {};

const Profile = {
    init: function () {
        this.container = document.getElementById('profile-view');
        // Render if currently active
        if (this.container && !this.container.classList.contains('hidden')) {
            this.render();
        }
    },

    render: function () {
        if (!this.container) return;

        // Mock Data (Connect to Lattice State later)
        const userData = {
            username: "Traveler",
            rank: "Scout",
            xp: 1250,
            streak: 5,
            level: 3,
            joinDate: "2025-11-15",
            badges: [
                { id: 'b1', icon: '🐍', name: 'Python Initiate', desc: 'Completed the first stratum.' },
                { id: 'b2', icon: '🔥', name: 'Streak Igniter', desc: 'Code for 3 days in a row.' },
                { id: 'b3', icon: '🐛', name: 'Bug Hunter', desc: 'Solved 10 syntax errors.' }
            ],
            activity: this.generateMockActivity()
        };

        this.container.innerHTML = `
            <header class="dashboard-header">
                <div class="logo">MINECODE</div>
                <nav class="top-nav">
                    <a href="#" data-route="dashboard">Dashboard</a>
                    <a href="#" data-route="courses-view">Courses</a>
                    <a href="#" class="active" data-route="profile">Identity</a>
                    <a href="#" data-route="community">Lattice</a>
                </nav>
            </header>

            <div class="identity-disc-container">
                <!-- LEFT: Holo Card -->
                <div class="holo-card profile-card">
                    <div class="avatar-large glitch-effect">
                        <div class="avatar-img"></div>
                        <div class="scanline"></div>
                    </div>
                    <h1 class="cyber-glitch" data-text="${userData.username}">${userData.username}</h1>
                    <div class="rank-badge">${userData.rank} // LVL ${userData.level}</div>
                    
                    <div class="stats-grid">
                        <div class="stat-box">
                            <span class="label">XP</span>
                            <span class="val green-glow">${userData.xp}</span>
                        </div>
                        <div class="stat-box">
                            <span class="label">STREAK</span>
                            <span class="val fire-glow">${userData.streak}</span>
                        </div>
                    </div>

                    <div class="bio-section">
                        <p class="cyber-dim">"Searching for logic in the void."</p>
                        <p class="join-date">Uplink Established: ${userData.joinDate}</p>
                    </div>
                </div>

                <!-- RIGHT: Activity & Badges -->
                <div class="profile-content">
                    
                    <!-- 1. Contribution Heatmap -->
                    <section class="activity-section">
                        <h3 class="section-title">> NEURAL_ACTIVITY_LOG</h3>
                        <div class="heatmap-container">
                            <div class="heatmap-grid">
                                ${this.renderHeatmap(userData.activity)}
                            </div>
                            <div class="heatmap-legend">
                                <span>Dormant</span>
                                <div class="spectrum"></div>
                                <span>Active</span>
                            </div>
                        </div>
                    </section>

                    <!-- 2. Badge Showcase -->
                    <section class="badges-section">
                        <h3 class="section-title">> HONOR_PROTOCOLS</h3>
                        <div class="badges-grid">
                            ${userData.badges.map(b => `
                                <div class="holo-badge">
                                    <div class="badge-icon">${b.icon}</div>
                                    <div class="badge-info">
                                        <h4>${b.name}</h4>
                                        <p>${b.desc}</p>
                                    </div>
                                    <div class="sheen"></div>
                                </div>
                            `).join('')}
                            
                            <!-- Locked Slots -->
                            ${Array(3).fill(0).map(() => `
                                <div class="holo-badge locked">
                                    <div class="badge-icon">🔒</div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                </div>
            </div>
        `;
    },

    renderHeatmap: function (data) {
        // Generate grid of 365 squares
        // Data is array of intensities (0-4)
        return data.map(level =>
            `<div class="day-cell level-${level}"></div>`
        ).join('');
    },

    generateMockActivity: function () {
        // 52 weeks * 7 days = ~364
        const days = [];
        for (let i = 0; i < 160; i++) { // Just show last ~5 months for fit
            // Random intensity 0-4, weighted towards 0
            const rand = Math.random();
            let level = 0;
            if (rand > 0.9) level = 4;
            else if (rand > 0.8) level = 3;
            else if (rand > 0.6) level = 2;
            else if (rand > 0.4) level = 1;
            days.push(level);
        }
        return days;
    }
};

window.App.Profile = Profile;
