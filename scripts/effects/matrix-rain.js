/**
 * Matrix Rain Effect
 * Renders falling code characters with a "Cyber Cozy" aesthetic.
 * Optimized for performance using HTML5 Canvas.
 */

class MatrixRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resize();

        // Configuration
        this.fontSize = 14;
        this.columns = Math.floor(this.width / this.fontSize);
        this.drops = [];

        // Initialize drops
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100; // Start at random heights above screen
        }

        // Characters (Katakana + Latin + Numbers)
        this.chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンabcdefghijklmnopqrstuvwxyz0123456789';

        // Colors from our palette
        this.colors = [
            '#00f5ff', // Neon Cyan
            '#00ff88', // Green
            '#a855f7', // Purple (rare)
            '#ffffff'  // White (head)
        ];

        this.fps = 30; // Throttle to 30 FPS for performance
        this.interval = 1000 / this.fps;
        this.lastTime = 0;

        window.addEventListener('resize', () => this.resize());
        this.animate(0);
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.columns = Math.floor(this.width / this.fontSize);
        // Re-init drops that are new (if window grew)
        for (let i = this.drops.length; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }

    animate(timeStamp) {
        requestAnimationFrame((t) => this.animate(t));

        const deltaTime = timeStamp - this.lastTime;
        if (deltaTime < this.interval) return;

        this.lastTime = timeStamp - (deltaTime % this.interval);

        // Semi-transparent black to create trail effect
        this.ctx.fillStyle = 'rgba(1, 4, 9, 0.05)'; // --bg-void with low opacity
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.font = `${this.fontSize}px 'VT323', monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            // Random character
            const text = this.chars.charAt(Math.floor(Math.random() * this.chars.length));

            // Random color logic
            if (Math.random() > 0.98) {
                this.ctx.fillStyle = '#ffffff'; // White head
            } else if (Math.random() > 0.9) {
                this.ctx.fillStyle = '#a855f7'; // Occasional purple
            } else {
                this.ctx.fillStyle = '#00f5ff'; // Mostly cyan
            }

            // Draw
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            // Reset drop or move down
            if (this.drops[i] * this.fontSize > this.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only init if canvas exists
    if (document.getElementById('matrix-canvas')) {
        new MatrixRain('matrix-canvas');
    }
});
