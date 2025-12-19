// Practice Arena Module
// Allows free-form coding without lesson constraints

window.App = window.App || {};

const Practice = {
    init: function () {
        this.container = document.getElementById('practice-view');
        this.renderInterface();
    },

    renderInterface: function () {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="practice-container" style="width:100%; height:100%; display:flex; flex-direction:column; background:var(--bg-dark);">
                <div class="practice-header" style="padding:1rem; border-bottom:1px solid var(--glass-border); display:flex; justify-content:space-between; align-items:center;">
                    <h2 class="cyber-glitch" style="margin:0;">SANDBOX PROTOCOL</h2>
                    <button class="btn-secondary" id="exit-practice">EXIT REALITY</button>
                </div>
                <div class="practice-body" style="flex:1; display:flex;">
                    <div class="practice-editor" contenteditable="true" style="flex:1; background:rgba(0,0,0,0.5); color:var(--text-main); font-family:'JetBrains Mono'; padding:1rem; border:none; outline:none; white-space:pre;">
# Welcome to the Build Forge.
# Experiment freely. No constraints.
# SYSTEM: ONLINE

print("Hello, Void.")
                    </div>
                    <div class="practice-output" style="width:300px; border-left:1px solid var(--glass-border); padding:1rem; background:#000;">
                        <h4 style="color:var(--accent-secondary); margin-top:0;">TERMINAL</h4>
                        <div id="practice-console" style="color:#0f0; font-family:'JetBrains Mono'; font-size:0.9rem;"></div>
                        <button class="btn-primary" id="run-practice" style="margin-top:20px; width:100%;">RUN SEQUENCE</button>
                    </div>
                </div>
            </div>
        `;

        // Bind Events
        document.getElementById('exit-practice').onclick = () => {
            this.container.classList.add('hidden');
            if (window.App.Router) window.App.Router.show('dashboard');
        };

        document.getElementById('run-practice').onclick = () => this.runCode();
    },

    runCode: function () {
        const code = this.container.querySelector('.practice-editor').innerText;
        const consoleOut = document.getElementById('practice-console');

        consoleOut.innerHTML = "> Executing...<br>";

        // Simulate Execution (In real app, simpler Runtime)
        setTimeout(() => {
            // Mock output capture
            let output = [];

            // Very basic mock interpreter
            const lines = code.split('\n');
            lines.forEach(line => {
                if (line.includes('print(')) {
                    const content = line.match(/print\((.*)\)/);
                    if (content && content[1]) {
                        output.push(content[1].replace(/["']/g, ''));
                    }
                }
            });

            if (output.length === 0) output.push("No output detected.");

            consoleOut.innerHTML += output.join('<br>') + "<br>> Process Finished.";
        }, 500);
    }
};

window.App.Practice = Practice;
