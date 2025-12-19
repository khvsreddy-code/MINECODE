export class Terminal {
    constructor() {
        this.isOpen = false;
        this.history = [];
        this.historyIndex = -1;
        this.commands = {
            'help': this.cmdHelp.bind(this),
            'clear': this.cmdClear.bind(this),
            'status': this.cmdStatus.bind(this),
            'dashboard': () => this.navigate('dashboard'),
            'python': () => this.navigate('course-catalog'),
            'whoami': this.cmdWhoAmI.bind(this),
            'hack': this.cmdHack.bind(this)
        };

        this.init();
    }

    init() {
        // Inject Terminal HTML if not present
        if (!document.getElementById('global-terminal')) {
            const termHTML = `
                <div id="global-terminal" class="terminal-overlay hidden">
                    <div class="terminal-header">
                        <span class="terminal-title">MINECODE_OS [v1.0.4]</span>
                        <span class="terminal-status">ONLINE</span>
                    </div>
                    <div class="terminal-output" id="term-output">
                        <div class="line">Type 'help' for available commands.</div>
                    </div>
                    <div class="terminal-input-line">
                        <span class="prompt">root@minecode:~$</span>
                        <input type="text" id="term-input" autocomplete="off" spellcheck="false">
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', termHTML);
        }

        this.el = document.getElementById('global-terminal');
        this.output = document.getElementById('term-output');
        this.input = document.getElementById('term-input');

        // Event Listeners
        document.addEventListener('keydown', (e) => {
            if (e.key === '`' || e.key === '~') {
                e.preventDefault();
                this.toggle();
            }
        });

        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.execute(this.input.value);
                this.input.value = '';
            }
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.el.classList.toggle('open');
        this.el.classList.toggle('hidden'); // Remove hidden class for display
        if (this.isOpen) {
            setTimeout(() => this.input.focus(), 100);
        }
    }

    print(text, type = 'normal') {
        const line = document.createElement('div');
        line.className = `line ${type}`;
        line.innerHTML = text; // Allow HTML for colors
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }

    execute(cmdRaw) {
        const cmd = cmdRaw.trim().toLowerCase();
        if (!cmd) return;

        this.print(`<span class="prompt">root@minecode:~$</span> ${cmdRaw}`);

        const parts = cmd.split(' ');
        const trigger = parts[0];

        if (this.commands[trigger]) {
            this.commands[trigger](parts.slice(1));
        } else {
            this.print(`Command not found: ${trigger}. Type 'help'.`, 'error');
        }
    }

    // --- Commands ---

    cmdHelp() {
        this.print('AVAILABLE COMMANDS:', 'header');
        this.print('  help      - Show this message');
        this.print('  status    - Show system integrity and XP');
        this.print('  dashboard - Navigate to Command Center');
        this.print('  python    - Initialize Python Sequence');
        this.print('  hack      - [REDACTED]');
        this.print('  clear     - Clear terminal');
    }

    cmdClear() {
        this.output.innerHTML = '';
    }

    cmdStatus() {
        this.print('SYSTEM INTEGRITY: 98%');
        this.print('USER RANK: SCRIPT_KIDDIE');
        this.print('XP: 0/1000');
        this.print('FACTION: NONE');
    }

    cmdWhoAmI() {
        this.print('USER_ID: 0x9482_INITIATE');
        this.print('ACCESS_LEVEL: 1');
    }

    cmdHack() {
        this.print('INITIATING HACK SEQUENCE...', 'warning');
        setTimeout(() => this.print('ACCESSING MAINFRAME...', 'warning'), 500);
        setTimeout(() => this.print('ERROR: FIREWALL DETECTED.', 'error'), 1200);
    }

    navigate(routeId) {
        this.print(`NAVIGATING TO: ${routeId.toUpperCase()}...`, 'success');
        if (window.App && window.App.Router) {
            window.App.Router.show(routeId);
            this.toggle(); // Close terminal on nav
        } else {
            this.print('ERROR: ROUTER OFFLINE', 'error');
        }
    }
}
