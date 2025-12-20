
/**
 * UI UTILITIES MODULE
 * Toast notifications, page transitions, loading states
 */

const UIUtils = {
    /**
     * Show a toast notification
     * @param {string} message - The message to display
     * @param {string} type - 'success' | 'error' | 'warning' | 'info'
     * @param {number} duration - Duration in ms (default 3000)
     */
    toast(message, type = 'info', duration = 3000) {
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${this.getToastIcon(type)}</span>
            <span class="toast-message">${message}</span>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-exit');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    getToastIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    },

    /**
     * Show skeleton loading in a container
     * @param {HTMLElement} container - The container element
     * @param {string} type - 'card' | 'list' | 'grid'
     */
    showSkeleton(container, type = 'card') {
        const skeletons = {
            card: `
                <div class="skeleton skeleton-card mb-md"></div>
                <div class="skeleton skeleton-text medium"></div>
                <div class="skeleton skeleton-text short"></div>
            `,
            list: `
                <div style="display: flex; gap: 16px; margin-bottom: 16px;">
                    <div class="skeleton skeleton-avatar"></div>
                    <div style="flex: 1;">
                        <div class="skeleton skeleton-text medium"></div>
                        <div class="skeleton skeleton-text short"></div>
                    </div>
                </div>
            `.repeat(3),
            grid: `
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
                    ${`<div class="skeleton skeleton-card"></div>`.repeat(6)}
                </div>
            `
        };

        container.innerHTML = skeletons[type] || skeletons.card;
    },

    /**
     * Animate page transition
     * @param {Function} callback - Function to execute after exit animation
     */
    pageTransition(callback) {
        const content = document.getElementById('main-content');
        if (!content) {
            callback();
            return;
        }

        content.classList.add('page-exit');

        setTimeout(() => {
            callback();
            content.classList.remove('page-exit');
            // Trigger re-animation
            content.style.animation = 'none';
            content.offsetHeight; // Force reflow
            content.style.animation = '';
        }, 200);
    },

    /**
     * Apply staggered animation to children
     * @param {string} selector - Parent container selector
     * @param {string} animationClass - Animation class to apply
     */
    staggerChildren(selector, animationClass = 'anime-fade-in') {
        const parent = document.querySelector(selector);
        if (!parent) return;

        const children = parent.children;
        Array.from(children).forEach((child, index) => {
            child.style.animationDelay = `${index * 50}ms`;
            child.classList.add(animationClass);
        });

        // Trigger anime.js if available
        if (typeof anime !== 'undefined') {
            anime({
                targets: children,
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(50),
                duration: 400,
                easing: 'easeOutQuad'
            });
        }
    },

    /**
     * Create a badge element
     * @param {string} text - Badge text
     * @param {string} type - 'primary' | 'success' | 'warning' | 'purple'
     */
    badge(text, type = 'primary') {
        return `<span class="badge badge-${type}">${text}</span>`;
    },

    /**
     * Initialize all interactive elements
     */
    init() {
        // Add hover-lift to all cyber cards
        document.querySelectorAll('button, a').forEach(el => {
            el.classList.add('focus-ring');
        });

        // Initialize Cyber Text if present
        this.initCyberText();

        console.log('🎨 UI Utils Initialized');
    },

    /**
     * Initialize Cyber Text Animation
     * Splits text into letters and animates them with a "digital construct" effect
     */
    initCyberText() {
        const title = document.querySelector('.cyber-glitch-text');
        if (!title || title.hasAttribute('data-animated')) return;

        // Split text into letters
        const text = title.textContent;
        title.innerHTML = text.split('').map(char => {
            return char === ' ' ? '&nbsp;' : `<span class="cyber-char" style="display:inline-block; opacity:0;">${char}</span>`;
        }).join('');

        title.setAttribute('data-animated', 'true');

        // Anime.js Entrance
        if (typeof anime !== 'undefined') {
            anime.timeline({ loop: false })
                .add({
                    targets: '.cyber-char',
                    translateY: [-50, 0],
                    translateX: () => anime.random(-20, 20),
                    opacity: [0, 1],
                    scale: [0.5, 1],
                    color: ['#00f5ff', '#ffffff'], // Cyan flash to white
                    textShadow: [
                        '0 0 10px #00f5ff',
                        '0 0 0 transparent'
                    ],
                    easing: 'easeOutElastic(1, .6)',
                    duration: 1200,
                    delay: anime.stagger(50) // Stagger letter entry
                })
                .add({
                    targets: '.cyber-title',
                    textShadow: [
                        { value: '2px 0 #00f5ff, -2px 0 #ec4899', duration: 100 },
                        { value: '0 0 transparent', duration: 100 },
                        { value: '-2px 0 #00f5ff, 2px 0 #ec4899', duration: 100 },
                        { value: '0 0 transparent', duration: 100 }
                    ],
                    loop: true,
                    easing: 'linear',
                    delay: 2000, // Wait before starting glitch loop
                    duration: 4000 // Occurs every 4s
                });
        }
    }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => UIUtils.init(), 100);
});

// Export for global usage
window.UIUtils = UIUtils;
