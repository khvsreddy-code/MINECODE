/**
 * Vanilla Tilt Effect
 * Adds a 3D parallax tilt effect to elements on hover.
 * Lightweight implementation for MineCode.
 */

const TiltEffect = {
    init(selector = '.cyber-card', options = {}) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => this.addTilt(el, options));
        console.log(`🌀 Tilt Effect initialized on ${elements.length} elements`);
    },

    addTilt(element, options) {
        const settings = {
            max: 15,          // max tilt rotation (degrees)
            perspective: 1000, // transform perspective (lower is more extreme)
            scale: 1.05,      // 2D scale on hover
            speed: 400,       // transition speed
            glare: true,      // add light glare effect
            ...options
        };

        // State
        let width, height, left, top;

        // Mouse Enter
        element.addEventListener('mouseenter', () => {
            const rect = element.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            left = rect.left;
            top = rect.top;

            element.style.transition = `transform ${settings.speed}ms cubic-bezier(.03,.98,.52,.99)`;
            if (settings.glare) addGlare(element);
        });

        // Mouse Move
        element.addEventListener('mousemove', (e) => {
            const x = Math.min(Math.max((e.clientX - left) / width, 0), 1);
            const y = Math.min(Math.max((e.clientY - top) / height, 0), 1);

            const tiltX = (settings.max / 2 - x * settings.max).toFixed(2);
            const tiltY = (y * settings.max - settings.max / 2).toFixed(2);

            element.style.transform = `perspective(${settings.perspective}px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(${settings.scale}, ${settings.scale}, ${settings.scale})`;

            if (settings.glare) {
                const glare = element.querySelector('.tilt-glare');
                if (glare) {
                    glare.style.transform = `rotate(${e.clientX}deg) translate(-50%, -50%)`;
                    glare.style.opacity = '0.3'; // Visible on hover
                }
            }
        });

        // Mouse Leave
        element.addEventListener('mouseleave', () => {
            element.style.transform = `perspective(${settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

            const glare = element.querySelector('.tilt-glare');
            if (glare) glare.style.opacity = '0';
        });

        // Helper: Glare
        function addGlare(el) {
            if (el.querySelector('.tilt-glare')) return;

            const glare = document.createElement('div');
            glare.classList.add('tilt-glare');
            Object.assign(glare.style, {
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)',
                opacity: '0',
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
                zIndex: '10'
            });
            el.appendChild(glare);
        }
    }
};

window.TiltEffect = TiltEffect;
