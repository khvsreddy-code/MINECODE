// The Lattice System (Advanced Gamification)
// Removed global App assignment

const Lattice = {
    RANKS: {
        1: { title: "SCRIPT_KIDDIE", perk: "None" },
        5: { title: "OPERATOR", perk: "Theme Customizer" },
        10: { title: "ARCHITECT", perk: "Global Chat" },
        20: { title: "GRANDMASTER", perk: "Developer Mode" }
    },

    state: {
        xp: 0,
        level: 1,
        streak: 0,
        unlockedStratums: [0],
        completedProjects: [],
        features: [] // ['theme_customizer', 'global_chat']
    },

    init: function () {
        this.loadState();
        this.renderHUD();
    },

    loadState: function () {
        const saved = localStorage.getItem('minecode_lattice');
        if (saved) {
            this.state = JSON.parse(saved);
        }
    },

    saveState: function () {
        localStorage.setItem('minecode_lattice', JSON.stringify(this.state));
        this.renderHUD();
        // Notify Terminal if active
        if (window.App.Terminal) window.App.Terminal.cmdStatus();
    },

    awardXP: function (amount) {
        this.state.xp += amount;
        this.checkLevelUp();
        this.saveState();
        this.notify(`+${amount} XP UPLOADED`);
    },

    checkLevelUp: function () {
        // Curve: Level * 1000 XP
        const nextLevelThreshold = this.state.level * 1000;

        if (this.state.xp >= nextLevelThreshold) {
            this.levelUp();
        }
    },

    levelUp: function () {
        this.state.level++;
        const rank = this.RANKS[this.state.level];

        let msg = `SYSTEM UPGRADE: LEVEL ${this.state.level}`;
        if (rank) {
            msg += ` | NEW RANK: ${rank.title}`;
            if (rank.perk) msg += ` | UNLOCKED: ${rank.perk}`;
        }

        this.notify(msg, 'success');
        this.checkUnlocks();
    },

    checkUnlocks: function () {
        // Feature Unlocks
        if (this.state.level >= 5 && !this.state.features.includes('theme_customizer')) {
            this.state.features.push('theme_customizer');
            this.notify("FEATURE UNLOCKED: Visual Customization Module", 'warning');
        }
        if (this.state.level >= 10 && !this.state.features.includes('global_chat')) {
            this.state.features.push('global_chat');
            this.notify("FEATURE UNLOCKED: Syndicate Link (Global Chat)", 'warning');
        }

        // Stratum Unlocks (Legacy Support)
        if (this.state.level >= 2 && !this.state.unlockedStratums.includes(1)) {
            this.state.unlockedStratums.push(1);
        }
    },

    completeProject: function (projectId) {
        if (!this.state.completedProjects.includes(projectId)) {
            this.state.completedProjects.push(projectId);
            this.awardXP(500); // Massive XP for missions
            this.notify(`MISSION ${projectId} COMPLETE`, 'success');
        }
        this.saveState();
    },

    notify: function (msg, type = 'info') {
        if (window.App.Terminal) {
            window.App.Terminal.print(`[LATTICE] ${msg}`, type);
            // If terminal is closed, we might want a toast too, but terminal log is persistent
            if (!window.App.Terminal.isOpen) {
                // Flash terminal button or something (future)
            }
        }
        // Fallback to Editor console
        if (window.App.Editor) window.App.Editor.log(`[LATTICE] ${msg}`, type);
    },

    renderHUD: function () {
        const xpDisplay = document.getElementById('hud-xp');
        if (xpDisplay) xpDisplay.textContent = `Lvl ${this.state.level} | ${this.state.xp} XP`;
    },

    // API for other modules
    hasFeature: function (featureId) {
        return this.state.features.includes(featureId);
    }
};

window.App.Gamification = Lattice;
window.App.Lattice = Lattice;

