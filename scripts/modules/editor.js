// Editor & Console Module
// Removed global window.App assignment for module purity

const Editor = {
    init: function () {
        // UI Elements
        this.consoleOutput = document.querySelector('.console-output');
        this.runBtns = document.querySelectorAll('.run-btn'); // Support multiple buttons
        this.codeContent = document.querySelector('.code-content');

        // Lesson UI Elements
        this.ui = {
            title: document.getElementById('lesson-title'),
            id: document.getElementById('lesson-id'),
            theory: document.getElementById('lesson-theory'),
            task: document.getElementById('lesson-task'),
            hintBox: document.getElementById('lesson-hint-box'),
            hint: document.getElementById('lesson-hint'),
            nextBtn: document.getElementById('lesson-next-btn'),
            breadcrumbLesson: document.getElementById('breadcrumb-lesson')
        };

        // Bind Run Buttons
        this.runBtns.forEach(btn => {
            btn.addEventListener('click', () => this.runCode());
        });

        // Bind Next Button
        if (this.ui.nextBtn) {
            this.ui.nextBtn.addEventListener('click', () => this.loadNextLesson());
        }

        // Load First Project on Init (for testing, usually Router handles this)
        // In a real app, Router would call App.Editor.loadProject(id)
        // Initial load handled by Router using URL params or default
        // this.currentProject = App.Curriculum.getProject("p0_1");
        // if (this.currentProject) this.renderLesson(this.currentProject);
        // BETTER THAN CODEDEX: Real-time "Live Link" Analysis
        if (this.ui.code) {
            this.ui.code.addEventListener('input', () => {
                const raw = this.ui.code.innerText;
                const statusEl = this.container.querySelector('.file-name');
                if (statusEl) {
                    if (raw.includes('print') || raw.includes('console.log')) {
                        statusEl.innerText = "gate_control.py • OUTPUT DETECTED";
                        statusEl.style.color = "var(--accent-primary)";
                    } else if (raw.includes('def ') || raw.includes('function ')) {
                        statusEl.innerText = "gate_control.py • DECLARING FUNCTION...";
                        statusEl.style.color = "var(--accent-secondary)";
                    } else {
                        statusEl.innerText = "gate_control.py";
                        statusEl.style.color = "rgba(255,255,255,0.5)";
                    }
                }
            });
        }
    },

    renderLesson: function (project) {
        this.currentProject = project;

        // Update Editor
        if (this.codeContent) this.codeContent.innerText = project.initialCode;

        // Update DOM
        if (this.ui.title) this.ui.title.innerText = project.title;
        // if (this.ui.id) this.ui.id.innerText = `Mission ID: ${project.id}`; // Optional
        if (this.ui.breadcrumbLesson) this.ui.breadcrumbLesson.innerText = project.title;

        // Update Theory (Narrative Content)
        // Direct innerHTML to support the new "Mission Brief" structure
        if (this.ui.theory) {
            this.ui.theory.innerHTML = project.theory;
        }

        // Render Tasks (Mission Objectives)
        if (this.ui.task) {
            const taskHtml = project.tasks.map(t =>
                `<div class="task-item">
                    <span class="task-checkbox">☐</span> 
                    <span class="task-desc">${t.description}</span>
                </div>`
            ).join('');
            this.ui.task.innerHTML = taskHtml;
        }

        // Hint (Quantum Hint)
        if (this.ui.hintBox) {
            if (project.hint) {
                this.ui.hintBox.classList.remove('hidden');
                if (this.ui.hint) this.ui.hint.innerText = project.hint;
            } else {
                this.ui.hintBox.classList.add('hidden');
            }
        }

        // Reset UI State
        if (this.ui.nextBtn) this.ui.nextBtn.classList.add('disabled');
        this.clearLog();
        this.log(`> MISSION START: ${project.title}`, 'system');
    },

    loadNextLesson: function () {
        if (!this.currentProject) return;
        const nextProj = App.Curriculum.getNextProject(this.currentProject.id);
        if (nextProj) {
            this.renderLesson(nextProj);
            window.scrollTo(0, 0);
        } else {
            this.log("All stratums cleared. Awaiting update.", "success");
        }
    },

    clearLog: function () {
        if (this.consoleOutput) this.consoleOutput.innerHTML = '';
    },

    log: function (text, type = 'info') {
        if (!this.consoleOutput) return;
        const line = document.createElement('div');
        line.textContent = `> ${text} `;

        const colors = {
            error: 'var(--accent-alert)',
            success: 'var(--accent-primary)',
            warning: '#ffcc00',
            info: 'var(--text-muted)'
        };

        if (colors[type]) line.style.color = colors[type];

        this.consoleOutput.appendChild(line);
        this.consoleOutput.scrollTop = this.consoleOutput.scrollHeight;
    },

    runCode: function () {
        if (!this.codeContent) return;
        const code = this.codeContent.innerText;
        this.log("Compiling...", "info");

        setTimeout(() => {
            // 1. Execute Code via Runtime
            let runtimeState = { output: [], variables: {}, error: null };
            if (App.Runtime) {
                runtimeState = App.Runtime.execute(code);

                // Display Runtime Output
                if (runtimeState.error) {
                    this.log(runtimeState.error, "error");
                } else {
                    runtimeState.output.forEach(line => {
                        this.log(line, "info"); // Print standard output
                    });
                }
            } else {
                console.warn("Runtime module missing. Skipping execution simulation.");
            }

            // 2. Validate Results (Pass Runtime State + Code)
            // Validator now checks if your OUTPUT matches expected, or if VARIABLES exist
            const validation = App.Validator.run(code, this.currentProject, runtimeState);

            // Update Console with Validation Results
            validation.results.forEach(res => {
                const icon = res.passed ? "✅" : "❌";
                this.log(`${icon} ${res.description}`, res.passed ? "success" : "error");

                // Show Smart Hint (Better than CodeDex)
                if (!res.passed && res.feedback) {
                    this.log(`   > ${res.feedback}`, "system");
                }
            });

            // Update Task List UI
            if (this.ui.task) {
                const taskHtml = validation.results.map(r =>
                    `<div class="task-item" style="color:${r.passed ? 'var(--accent-primary)' : 'inherit'}">
                        <span class="task-checkbox">${r.passed ? '☑' : '☐'}</span> 
                        <span class="task-desc">${r.description}</span>
                    </div>`
                ).join('');
                this.ui.task.innerHTML = taskHtml;
            }

            if (validation.success) {
                this.log("MODULE COMPLETE. ACCESS GRANTED.", "success");

                // GAMIFICATION: Audio & XP
                if (window.App.Audio) window.App.Audio.playSuccess();

                // Trigger Lattice Reward
                if (window.App.Lattice) {
                    window.App.Lattice.completeProject(this.currentProject.id);
                } else if (window.App.Gamification) {
                    window.App.Gamification.completeProject(this.currentProject.id);
                }

                // Quick XP Mock Update (Dashboard Feedback)
                const xpEl = document.querySelector('.terminal-text');
                if (xpEl) {
                    // Mock increment logic
                    const currentText = xpEl.innerText;
                    if (currentText.includes('0 XP')) {
                        xpEl.innerText = "Level 1 • 100 XP • Streak: 1 Day";
                        if (window.App.Audio) setTimeout(() => window.App.Audio.playLevelUp(), 1000);
                    }
                }

                // Trigger Visual Sequence
                if (window.App.Visuals && this.currentProject.visualAction) {
                    window.App.Visuals.trigger(this.currentProject.visualAction);
                }

                if (this.ui.nextBtn) this.ui.nextBtn.classList.remove('disabled');
            } else {
                this.log("Validation failed. logic_check_required.", "warning");
            }

        }, 500); // Simulate processing time
    },

    loadProject: function (projectId) {
        // Find project in Strata
        const found = App.Curriculum.getProject(projectId);

        if (found) {
            this.renderLesson(found);

            // Setup Visuals [NEW]
            if (window.App.Visuals) {
                window.App.Visuals.setupMission(found.id);
            }
        } else {
            console.error(`[EDITOR] Project ID ${projectId} not found.`);
        }
    }
}
