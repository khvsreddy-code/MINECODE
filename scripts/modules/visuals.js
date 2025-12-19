export class Visuals {
    constructor() {
        this.container = document.getElementById('lesson-theory'); // Target area for visuals
    }

    trigger(actionId) {
        console.log(`[VISUALS] Triggering: ${actionId}`);
        if (this[actionId]) {
            this[actionId]();
        } else {
            console.warn(`[VISUALS] Action ${actionId} not found.`);
        }
    }

    // --- Sequence 1 Actions ---

    // P1_1: System Boot -> Remove static overlay
    sequenceBoot() {
        const overlay = document.querySelector('.glitch-overlay-fullscreen');
        if (overlay) {
            overlay.style.transition = 'opacity 2s ease';
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 2000);

            // Show Success Message in Terminal style
            this.showToast("SYSTEM_ONLINE", "success");
        }
    }

    // P1_2: Power Calibration -> Fill power bar
    sequencePower() {
        const powerBar = document.querySelector('.mission-power-bar .fill');
        if (powerBar) {
            powerBar.style.width = '100%';
            powerBar.style.backgroundColor = '#00ff88';
            powerBar.style.boxShadow = '0 0 20px #00ff88';
        }
        this.showToast("GRID_RESTORED: 100%", "success");
    }

    // P1_3: Hull Calc -> Stop countdown red light
    sequenceHull() {
        document.body.classList.remove('alarm-state');
        this.showToast("DECOMPRESSION HALTED", "success");
    }

    // P1_3_Bonus: Signal Beacon -> Radar Sweep
    sequenceSignal() {
        const radar = document.createElement('div');
        radar.className = 'radar-sweep mission-unique';
        document.body.appendChild(radar);
        this.showToast("SIGNAL BROADCASTING...", "success");
    }

    // P4_1: Power Cycle -> Pulse Effect
    sequenceLoop() {
        document.body.classList.add('pulse-mode');
        setTimeout(() => document.body.classList.remove('pulse-mode'), 3000);
        this.showToast("GENERATOR SYNCED", "success");
    }

    // P2_1: Inventory -> Cargo Animation
    sequenceCargo() {
        const float = document.createElement('div');
        float.className = 'cargo-update';
        float.innerText = '+50 GOLD';
        document.body.appendChild(float);
        setTimeout(() => float.remove(), 2000);
        this.showToast("INVENTORY SYNCED", "success");
    }

    // P2_3: ID Check -> Access Granted
    sequenceAccess() {
        const flash = document.createElement('div');
        flash.className = 'access-granted-overlay';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 1000);
        this.showToast("IDENTITY VERIFIED. WELCOME ADMIN.", "success");
    }

    // P3_1: Magical If -> Gate Open
    sequenceGate() {
        const gate = document.createElement('div');
        gate.className = 'logic-gate-anim';
        gate.innerText = '🔓';
        document.body.appendChild(gate);
        setTimeout(() => gate.remove(), 2000);
        this.showToast("GATE LOGIC VALIDATED", "success");
    }

    // P4_2: Reactor Spin -> Data Stream
    sequenceStream() {
        const stream = document.createElement('div');
        stream.className = 'matrix-rain';
        document.body.appendChild(stream);
        setTimeout(() => stream.remove(), 3000);
        this.showToast("DATA STREAM STABILIZED", "success");
    }

    // --- Helpers ---

    showToast(msg, type) {
        if (window.App.Terminal) {
            window.App.Terminal.print(`[VISUAL]: ${msg}`, type);
        }

        // Play appropriate sound
        if (window.App.Audio) {
            if (type === 'success') window.App.Audio.playSuccess();
            else if (type === 'error') window.App.Audio.playError();
            else window.App.Audio.playType();
        }
    }

    // Setup initial state for a mission
    setupMission(missionId) {
        // Clear previous unique elements
        document.querySelectorAll('.mission-unique').forEach(el => el.remove());

        if (missionId === 'p1_1') {
            // Add Glitch Overlay
            if (!document.querySelector('.glitch-overlay-fullscreen')) {
                const glitch = document.createElement('div');
                glitch.className = 'glitch-overlay-fullscreen mission-unique';
                document.body.appendChild(glitch);
            }
        }

        if (missionId === 'p1_2') {
            // Add Power Bar to Theory Header
            const header = document.querySelector('.lesson-theory-header');
            if (header) {
                const bar = document.createElement('div');
                bar.className = 'mission-power-bar mission-unique';
                bar.innerHTML = '<div class="fill" style="width: 5%"></div>';
                header.appendChild(bar);
            }
        }
    }
}
