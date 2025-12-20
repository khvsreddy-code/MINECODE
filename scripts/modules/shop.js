// Shop Module: The Fabricator
window.App = window.App || {};

const Shop = {
    state: {
        credits: 1250, // Mock Credits (XP)
        inventory: ['theme_default', 'cursor_default'],
        items: [
            // Themes
            { id: 'theme_matrix', type: 'theme', name: 'Matrix Green', price: 500, icon: '📟', desc: 'Classic raining code.' },
            { id: 'theme_sunset', type: 'theme', name: 'Cozy Sunset', price: 800, icon: '🌅', desc: 'Warm gradients for cold nights.' },
            { id: 'theme_void', type: 'theme', name: 'Deep Void', price: 1000, icon: '🌑', desc: 'True black for OLED screens.' },

            // Cursors
            { id: 'cursor_ghost', type: 'cursor', name: 'Ghost Trail', price: 300, icon: '👻', desc: 'Leave a spooky trail.' },
            { id: 'cursor_block', type: 'cursor', name: 'Block Cursor', price: 150, icon: '█', desc: 'Retro terminal style.' },
            { id: 'cursor_glitch', type: 'cursor', name: 'Glitch Effect', price: 450, icon: '⚡', desc: 'Randomly offsets position.' }
        ]
    },

    init: function () {
        this.container = document.getElementById('shop-view');
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
                    <a href="#" data-route="profile">Identity</a>
                    <a href="#" data-route="community">Lattice</a>
                    <a href="#" class="active" data-route="shop">Fabricator</a>
                </nav>
                <div class="user-menu">
                    <div class="xp-display">💠 ${this.state.credits} XP</div>
                </div>
            </header>

            <div class="shop-container">
                <div class="shop-hero">
                    <h1 class="cyber-glitch" data-text="THE FABRICATOR">THE FABRICATOR</h1>
                    <p>Exchange logic fragments (XP) for neural augmentations.</p>
                </div>

                <div class="shop-grid">
                    ${this.state.items.map(item => this.renderItem(item)).join('')}
                </div>
            </div>
        `;

        // Bind Events
        this.container.querySelectorAll('.btn-buy').forEach(btn => {
            btn.addEventListener('click', (e) => this.buyItem(e.target.dataset.id));
        });
    },

    renderItem: function (item) {
        const owned = this.state.inventory.includes(item.id);
        const canAfford = this.state.credits >= item.price;

        return `
            <div class="shop-card ${owned ? 'owned' : ''}">
                <div class="item-icon">${item.icon}</div>
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                    <div class="price-tag">
                        ${owned ? 'ACQUIRED' : `💠 ${item.price}`}
                    </div>
                </div>
                <button class="btn-buy ${!canAfford && !owned ? 'disabled' : ''}" 
                        data-id="${item.id}"
                        ${owned || !canAfford ? 'disabled' : ''}>
                    ${owned ? 'EQUIP' : 'CONSTRUCT'}
                </button>
            </div>
        `;
    },

    buyItem: function (itemId) {
        const item = this.state.items.find(i => i.id === itemId);
        if (!item) return;

        if (this.state.inventory.includes(itemId)) {
            alert("Protocol already installed.");
            return;
        }

        if (this.state.credits >= item.price) {
            this.state.credits -= item.price;
            this.state.inventory.push(itemId);
            this.render(); // Re-render to show update
            // Play sound sound effect here if AudioEngine exists
            if (window.App.Audio) window.App.Audio.playSuccess();
        }
    }
};

window.App.Shop = Shop;
