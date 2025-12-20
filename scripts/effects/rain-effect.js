/**
 * RAIN EFFECT
 * Canvas-based rain + firefly particles
 * Midjourney-inspired atmospheric overlay
 */

const RainEffect = {
    canvas: null,
    ctx: null,
    raindrops: [],
    fireflies: [],
    animationId: null,
    running: false,

    init(containerId = 'rain-canvas') {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = containerId;
        this.canvas.style.cssText = `
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 3;
        `;

        const container = document.querySelector('.hero-pixel-scene') || document.querySelector('.landing-hero');
        if (container) {
            container.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            window.addEventListener('resize', () => this.resize());
            this.createParticles();
            this.start();
        }
    },

    resize() {
        this.canvas.width = this.canvas.parentElement?.offsetWidth || window.innerWidth;
        this.canvas.height = this.canvas.parentElement?.offsetHeight || window.innerHeight;
    },

    createParticles() {
        // Rain drops
        const rainCount = Math.floor(this.canvas.width / 8);
        this.raindrops = [];
        for (let i = 0; i < rainCount; i++) {
            this.raindrops.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - this.canvas.height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 4 + 8,
                opacity: Math.random() * 0.3 + 0.2
            });
        }

        // Fireflies
        const fireflyCount = 15;
        this.fireflies = [];
        for (let i = 0; i < fireflyCount; i++) {
            this.fireflies.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.05 + 0.02
            });
        }
    },

    update() {
        // Update rain
        this.raindrops.forEach(drop => {
            drop.y += drop.speed;
            if (drop.y > this.canvas.height) {
                drop.y = -drop.length;
                drop.x = Math.random() * this.canvas.width;
            }
        });

        // Update fireflies
        this.fireflies.forEach(ff => {
            ff.x += ff.dx;
            ff.y += ff.dy;
            ff.pulse += ff.pulseSpeed;

            // Bounce off edges
            if (ff.x < 0 || ff.x > this.canvas.width) ff.dx *= -1;
            if (ff.y < 0 || ff.y > this.canvas.height) ff.dy *= -1;

            // Random direction change
            if (Math.random() < 0.01) {
                ff.dx = (Math.random() - 0.5) * 0.5;
                ff.dy = (Math.random() - 0.5) * 0.5;
            }
        });
    },

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw rain
        this.ctx.strokeStyle = 'rgba(150, 200, 255, 0.4)';
        this.ctx.lineWidth = 1;
        this.raindrops.forEach(drop => {
            this.ctx.globalAlpha = drop.opacity;
            this.ctx.beginPath();
            this.ctx.moveTo(drop.x, drop.y);
            this.ctx.lineTo(drop.x, drop.y + drop.length);
            this.ctx.stroke();
        });
        this.ctx.globalAlpha = 1;

        // Draw fireflies
        this.fireflies.forEach(ff => {
            const glowIntensity = Math.sin(ff.pulse) * 0.5 + 0.5;
            const glowRadius = ff.radius + glowIntensity * 4;

            // Outer glow
            const gradient = this.ctx.createRadialGradient(
                ff.x, ff.y, 0,
                ff.x, ff.y, glowRadius * 3
            );
            gradient.addColorStop(0, `rgba(255, 215, 0, ${0.8 * glowIntensity})`);
            gradient.addColorStop(0.5, `rgba(255, 180, 0, ${0.3 * glowIntensity})`);
            gradient.addColorStop(1, 'rgba(255, 150, 0, 0)');

            this.ctx.beginPath();
            this.ctx.arc(ff.x, ff.y, glowRadius * 3, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Core
            this.ctx.beginPath();
            this.ctx.arc(ff.x, ff.y, ff.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#FFD700';
            this.ctx.fill();
        });
    },

    animate() {
        if (!this.running) return;
        this.update();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    },

    start() {
        if (this.running) return;
        this.running = true;
        this.animate();
    },

    stop() {
        this.running = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    },

    destroy() {
        this.stop();
        if (this.canvas && this.canvas.parentElement) {
            this.canvas.parentElement.removeChild(this.canvas);
        }
    }
};

// Export for use
window.RainEffect = RainEffect;
