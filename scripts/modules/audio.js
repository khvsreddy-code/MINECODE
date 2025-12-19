// Audio Synthesis Module (No External Assets Needed)
window.App = window.App || {};

const AudioSystem = {
    ctx: null,
    muted: false,

    init: function () {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            console.log("Audio System Initialized");
        } catch (e) {
            console.warn("Audio Context not supported");
        }
    },

    // Standard Sci-Fi Blip (Navigation)
    playBlip: function () {
        if (!this.ctx || this.muted) return;
        this.resume();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    },

    // Success Chime (Task Complete)
    playSuccess: function () {
        if (!this.ctx || this.muted) return;
        this.resume();

        const t = this.ctx.currentTime;

        // Chord: C Major (C5, E5, G5)
        [523.25, 659.25, 783.99].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = "triangle";
            osc.frequency.setValueAtTime(freq, t + (i * 0.05)); // Staggered arpeggio

            gain.gain.setValueAtTime(0.0, t + (i * 0.05));
            gain.gain.linearRampToValueAtTime(0.15, t + (i * 0.05) + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(t + (i * 0.05));
            osc.stop(t + 0.6);
        });
    },

    // Level Up / Mission Complete (Epic Swell)
    playLevelUp: function () {
        if (!this.ctx || this.muted) return;
        this.resume();
        const t = this.ctx.currentTime;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sawtooth";
        // Slide up
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.linearRampToValueAtTime(880, t + 0.5);

        gain.gain.setValueAtTime(0.05, t);
        gain.gain.linearRampToValueAtTime(0.2, t + 0.4);
        gain.gain.linearRampToValueAtTime(0.0, t + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.8);
    },

    resume: function () {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }
};

window.App.Audio = AudioSystem;
