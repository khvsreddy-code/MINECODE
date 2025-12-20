/**
 * Reveal Text Effect
 * Decodes text with random characters before showing the final string.
 * Usage: RevealText.init('.reveal-text');
 */
const RevealText = {
    init(selector = '.reveal-text') {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => this.animate(el));
    },

    animate(element) {
        const originalText = element.dataset.text || element.textContent;
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        const duration = 2000;
        const interval = 50;
        const steps = duration / interval;
        let step = 0;

        element.style.fontFamily = 'Monocraft, monospace';

        const timer = setInterval(() => {
            step++;
            const progress = step / steps;

            let revealedText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (i < originalText.length * progress) {
                    revealedText += originalText[i];
                } else {
                    revealedText += chars[Math.floor(Math.random() * chars.length)];
                }
            }

            element.textContent = revealedText;

            if (step >= steps) {
                clearInterval(timer);
                element.textContent = originalText; // Ensure final text is correct
            }
        }, interval);
    }
};

window.RevealText = RevealText;

// Auto-init if desired
document.addEventListener('DOMContentLoaded', () => {
    RevealText.init();
});
