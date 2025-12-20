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
        // This method is now largely handled by the resize listener in init
        // but kept for consistency if other parts still call it.
        this.width = this.canvas.parentElement?.offsetWidth || window.innerWidth;
        this.height = this.canvas.parentElement?.offsetHeight || window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    },

    createParticles() {
        this.raindrops = [];
        this.fireflies = [];
        this.splashes = []; // NEW: Splashes array

        this.particleCount = Math.floor(this.width / 10); // Balanced rain count
        this.fireflyCount = 20;

        // Rain drops
        for (let i = 0; i < this.particleCount; i++) {
            this.raindrops.push(this.createRaindrop());
        }

        // Fireflies
        for (let i = 0; i < this.fireflyCount; i++) {
            this.fireflies.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.05 + 0.02
            });
        }
    },

    createRaindrop() {
        return {
            x: Math.random() * this.width,
            y: Math.random() * this.height - this.height,
            length: Math.random() * 20 + 10,
            speed: Math.random() * 10 + 15, // Fast speed
            opacity: Math.random() * 0.3 + 0.1,
            color: 'rgba(100, 240, 255, 0.3)' // Cyan tint
        };
    },

    createSplash(x, y) {
        const splashCount = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < splashCount; i++) {
            this.splashes.push({
                x: x,
                y: y,
                dx: (Math.random() - 0.5) * 4,
                dy: (Math.random() * -3) - 1, // Upwards
                life: 1.0,
                decay: Math.random() * 0.05 + 0.05
            });
        }
    },

    update() {
        // Update Rain
        this.raindrops.forEach(drop => {
            drop.y += drop.speed;

            // Check collision with bottom or random splash chance
            if (drop.y > this.canvas.height) {
                // Splash at bottom
                this.createSplash(drop.x, this.canvas.height);

                // Reset drop
                drop.y = -drop.length;
                drop.x = Math.random() * this.canvas.width;
            }
        });

        // Update Splashes
        for (let i = this.splashes.length - 1; i >= 0; i--) {
            let s = this.splashes[i];
            s.x += s.dx;
            s.y += s.dy;
            s.dy += 0.2; // Gravity
            s.life -= s.decay;

            if (s.life <= 0) {
                this.splashes.splice(i, 1);
            }
        }

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

        // Draw Rain
        this.ctx.strokeStyle = 'rgba(164, 235, 255, 0.4)';
        this.ctx.lineWidth = 1.5;
        this.ctx.beginPath();
        this.raindrops.forEach(drop => {
            this.ctx.moveTo(drop.x, drop.y);
            this.ctx.lineTo(drop.x, drop.y + drop.length);
        });
        this.ctx.stroke();

        // Draw Splashes
        this.ctx.fillStyle = 'rgba(200, 250, 255, 0.6)';
        this.splashes.forEach(s => {
            if (s.life > 0) {
                this.ctx.globalAlpha = s.life;
                this.ctx.beginPath();
                this.ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
                this.ctx.fill();
            }
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
