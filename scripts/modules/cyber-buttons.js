/**
 * CYBER COZY BUTTON ANIMATIONS
 * Powered by Anime.js
 * Creative variety of button interactions
 */

const CyberButtons = {
    // Initialize all button animations
    init() {
        this.initRippleEffect();
        this.initButtonEntrances();
        this.initHoverAnimations();
        this.initClickAnimations();
        this.initSpecialEffects();
        console.log('⚡ Cyber Cozy Buttons Initialized');
    },

    // Ripple effect on click
    initRippleEffect() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-ripple, .btn-cyber, .btn-neon-cyan, .btn-neon-purple, .btn-neon-gold');
            if (!btn) return;

            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';

            btn.appendChild(ripple);

            anime({
                targets: ripple,
                scale: [0, 4],
                opacity: [0.6, 0],
                duration: 600,
                easing: 'easeOutQuad',
                complete: () => ripple.remove()
            });
        });
    },

    // Staggered button entrance animations
    initButtonEntrances() {
        // Bounce in for anime-bounce-in class
        const bounceButtons = document.querySelectorAll('.anime-bounce-in');
        if (bounceButtons.length) {
            anime({
                targets: bounceButtons,
                scale: [0.3, 1],
                opacity: [0, 1],
                duration: 800,
                delay: anime.stagger(100),
                easing: 'easeOutElastic(1, 0.5)'
            });
        }

        // Slide up for anime-slide-up class
        const slideButtons = document.querySelectorAll('.anime-slide-up');
        if (slideButtons.length) {
            anime({
                targets: slideButtons,
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 600,
                delay: anime.stagger(80),
                easing: 'easeOutQuart'
            });
        }

        // Fade in for anime-fade-in class
        const fadeButtons = document.querySelectorAll('.anime-fade-in');
        if (fadeButtons.length) {
            anime({
                targets: fadeButtons,
                opacity: [0, 1],
                duration: 800,
                delay: anime.stagger(50),
                easing: 'easeOutQuad'
            });
        }
    },

    // Advanced hover animations
    initHoverAnimations() {
        // Magnetic hover effect for special buttons
        document.querySelectorAll('.btn-magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                anime({
                    targets: btn,
                    translateX: x * 0.2,
                    translateY: y * 0.2,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });

            btn.addEventListener('mouseleave', () => {
                anime({
                    targets: btn,
                    translateX: 0,
                    translateY: 0,
                    duration: 400,
                    easing: 'easeOutElastic(1, 0.5)'
                });
            });
        });

        // Glow pulse on hover
        document.querySelectorAll('.btn-neon-cyan, .btn-neon-purple, .btn-neon-gold').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                anime({
                    targets: btn,
                    boxShadow: [
                        '0 0 20px rgba(0, 245, 255, 0.4)',
                        '0 0 50px rgba(0, 245, 255, 0.8)',
                        '0 0 30px rgba(0, 245, 255, 0.5)'
                    ],
                    duration: 600,
                    easing: 'easeInOutQuad'
                });
            });
        });
    },

    // Click animations
    initClickAnimations() {
        document.querySelectorAll('.btn-cyber, .btn-pixel, .btn-cozy').forEach(btn => {
            btn.addEventListener('mousedown', () => {
                anime({
                    targets: btn,
                    scale: 0.95,
                    duration: 100,
                    easing: 'easeInQuad'
                });
            });

            btn.addEventListener('mouseup', () => {
                anime({
                    targets: btn,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutElastic(1, 0.4)'
                });
            });

            btn.addEventListener('mouseleave', () => {
                anime({
                    targets: btn,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
        });
    },

    // Special effect animations
    initSpecialEffects() {
        // Shimmer text effect for btn-shimmer
        document.querySelectorAll('.btn-shimmer').forEach(btn => {
            // Add shimmer overlay
            const shimmer = document.createElement('div');
            shimmer.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                pointer-events: none;
            `;
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(shimmer);

            btn.addEventListener('mouseenter', () => {
                anime({
                    targets: shimmer,
                    left: ['−100%', '100%'],
                    duration: 600,
                    easing: 'easeInOutQuad'
                });
            });
        });

        // Floating animation for hero CTAs
        anime({
            targets: '.btn-float',
            translateY: [-5, 5],
            duration: 2000,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });

        // Heartbeat effect for important buttons
        anime({
            targets: '.btn-heartbeat',
            scale: [1, 1.05, 1],
            duration: 1500,
            loop: true,
            easing: 'easeInOutQuad'
        });
    },

    // Utility: Animate a specific button
    animateButton(selector, animation = 'bounce') {
        const btn = document.querySelector(selector);
        if (!btn) return;

        switch (animation) {
            case 'bounce':
                anime({
                    targets: btn,
                    scale: [1, 1.2, 1],
                    duration: 600,
                    easing: 'easeOutElastic(1, 0.5)'
                });
                break;
            case 'shake':
                anime({
                    targets: btn,
                    translateX: [-10, 10, -10, 10, 0],
                    duration: 400,
                    easing: 'easeInOutQuad'
                });
                break;
            case 'pulse':
                anime({
                    targets: btn,
                    scale: [1, 1.1],
                    boxShadow: ['0 0 0 0 rgba(0, 245, 255, 0.5)', '0 0 0 20px rgba(0, 245, 255, 0)'],
                    duration: 800,
                    direction: 'alternate',
                    easing: 'easeOutQuad'
                });
                break;
            case 'success':
                anime({
                    targets: btn,
                    backgroundColor: ['#4ade80', '#22c55e'],
                    scale: [1, 1.05, 1],
                    duration: 500,
                    easing: 'easeOutQuad'
                });
                break;
            case 'error':
                anime({
                    targets: btn,
                    backgroundColor: ['#ef4444', '#dc2626'],
                    translateX: [-5, 5, -5, 5, 0],
                    duration: 400,
                    easing: 'easeInOutQuad'
                });
                break;
        }
    },

    // Create confetti explosion from button
    confetti(btn) {
        const rect = btn.getBoundingClientRect();
        const colors = ['#00f5ff', '#a855f7', '#ffc800', '#4ade80', '#ff6b6b'];

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[i % colors.length]};
                border-radius: 50%;
                pointer-events: none;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                z-index: 9999;
            `;
            document.body.appendChild(particle);

            anime({
                targets: particle,
                translateX: anime.random(-150, 150),
                translateY: anime.random(-150, 150),
                scale: [1, 0],
                opacity: [1, 0],
                duration: 1000,
                easing: 'easeOutQuad',
                complete: () => particle.remove()
            });
        }
    }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a tick for anime.js to be available
    setTimeout(() => {
        if (typeof anime !== 'undefined') {
            CyberButtons.init();
        } else {
            console.warn('Anime.js not loaded, button animations disabled');
        }
    }, 100);
});

// Export for manual usage
window.CyberButtons = CyberButtons;
