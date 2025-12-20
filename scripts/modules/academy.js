// Lesson Module: The Academy
// A beginner-first learning experience with storytelling and step-by-step guidance
window.App = window.App || {};

const Academy = {
    state: {
        currentLesson: null,
        currentStep: 0,
        totalSteps: 0,
        codeAttempt: ''
    },

    // Sample Lesson Data (would come from curriculum.js in production)
    lessons: {
        'python-hello': {
            id: 'python-hello',
            track: 'Python',
            stratum: 'Beginner',
            title: 'Your First Words',
            icon: '🐍',
            narrative: {
                intro: "Welcome, Traveler. You stand at the threshold of a new world—the world of code. Before you can command machines, you must learn their language. Today, we speak Python.",
                context: "Every journey starts with a single word. In programming, we begin by saying 'Hello' to the world. It's tradition. It's how we know the machine is listening.",
                goal: "Your mission: Make the terminal speak. Use the `print()` function to display a message."
            },
            steps: [
                {
                    instruction: "First, let's understand. The `print()` function tells Python to display text on the screen. Whatever you put inside the parentheses, Python will show.",
                    hint: "Think of `print()` as a command. You're commanding the computer to 'print' something.",
                    example: "print('Hello')",
                    checkpoint: false
                },
                {
                    instruction: "Text in Python must be wrapped in quotes. Single ('...') or double (\"...\") quotes tell Python: 'This is text, not a command.'",
                    hint: "Without quotes, Python thinks your text is a variable name—and panics because it doesn't exist!",
                    example: "print('MineCode Academy')",
                    checkpoint: false
                },
                {
                    instruction: "Now it's your turn. Write a `print()` statement that displays: 'Hello, World!'",
                    hint: "Type: print('Hello, World!')",
                    expected: "print('Hello, World!')",
                    checkpoint: true
                }
            ],
            xpReward: 50
        }
    },

    init: function () {
        // The lesson view is triggered by router when navigating to a lesson
    },

    load: function (lessonId) {
        const lesson = this.lessons[lessonId];
        if (!lesson) {
            console.error(`Lesson not found: ${lessonId}`);
            return;
        }

        this.state.currentLesson = lesson;
        this.state.currentStep = 0;
        this.state.totalSteps = lesson.steps.length;
        this.render();
    },

    render: function () {
        const container = document.getElementById('lesson-view');
        if (!container || !this.state.currentLesson) return;

        const lesson = this.state.currentLesson;
        const step = lesson.steps[this.state.currentStep];

        container.innerHTML = `
            <div class="academy-layout">
                <!-- LEFT: Narrative Scroll -->
                <aside class="narrative-panel">
                    <div class="lesson-meta">
                        <span class="track-badge">${lesson.icon} ${lesson.track}</span>
                        <span class="stratum-badge">${lesson.stratum}</span>
                    </div>
                    <h1 class="lesson-title">${lesson.title}</h1>
                    
                    <div class="narrative-scroll">
                        <div class="story-block">
                            <h3>// INTRO</h3>
                            <p>${lesson.narrative.intro}</p>
                        </div>
                        <div class="story-block">
                            <h3>// CONTEXT</h3>
                            <p>${lesson.narrative.context}</p>
                        </div>
                        <div class="story-block highlight">
                            <h3>// YOUR MISSION</h3>
                            <p>${lesson.narrative.goal}</p>
                        </div>
                    </div>

                    <div class="step-tracker">
                        <span>Step ${this.state.currentStep + 1} of ${this.state.totalSteps}</span>
                        <div class="step-dots">
                            ${lesson.steps.map((s, i) => `<span class="dot ${i <= this.state.currentStep ? 'active' : ''}"></span>`).join('')}
                        </div>
                    </div>
                </aside>

                <!-- RIGHT: Learning Terminal -->
                <section class="learning-terminal">
                    <!-- Instruction Bar -->
                    <div class="instruction-bar">
                        <div class="instruction-text">
                            <span class="step-label">STEP ${this.state.currentStep + 1}:</span>
                            <p>${step.instruction}</p>
                        </div>
                        ${step.example ? `<div class="example-box"><span class="label">EXAMPLE:</span><code>${step.example}</code></div>` : ''}
                    </div>

                    <!-- Code Editor (Simplified) -->
                    <div class="holo-editor">
                        <div class="editor-header">
                            <span class="file-tab">main.py</span>
                            <div class="editor-actions">
                                <button class="btn-hint" id="hint-btn">💡 Hint</button>
                            </div>
                        </div>
                        <textarea id="code-input" class="code-area" placeholder="# Write your code here...">${this.state.codeAttempt}</textarea>
                    </div>

                    <!-- Output Terminal -->
                    <div class="output-terminal">
                        <div class="terminal-header">
                            <span>OUTPUT</span>
                        </div>
                        <pre id="terminal-output" class="terminal-body">>> Waiting for code...</pre>
                    </div>

                    <!-- Action Bar -->
                    <div class="action-bar">
                        <button class="btn-secondary" id="run-btn">▶ RUN CODE</button>
                        ${step.checkpoint ? `<button class="btn-primary" id="submit-btn">✓ SUBMIT</button>` : `<button class="btn-primary" id="next-btn">NEXT →</button>`}
                    </div>
                </section>
            </div>
        `;

        this.bindEvents();
    },

    bindEvents: function () {
        const container = document.getElementById('lesson-view');

        const hintBtn = container.querySelector('#hint-btn');
        const runBtn = container.querySelector('#run-btn');
        const submitBtn = container.querySelector('#submit-btn');
        const nextBtn = container.querySelector('#next-btn');
        const codeInput = container.querySelector('#code-input');

        if (hintBtn) hintBtn.addEventListener('click', () => this.showHint());
        if (runBtn) runBtn.addEventListener('click', () => this.runCode());
        if (submitBtn) submitBtn.addEventListener('click', () => this.submitCode());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextStep());
        if (codeInput) codeInput.addEventListener('input', (e) => { this.state.codeAttempt = e.target.value; });
    },

    showHint: function () {
        const step = this.state.currentLesson.steps[this.state.currentStep];
        alert(`💡 HINT:\n\n${step.hint}`);
    },

    runCode: function () {
        const output = document.getElementById('terminal-output');
        const code = this.state.codeAttempt;

        // Simulate running Python print
        const printMatch = code.match(/print\s*\(\s*['"](.*)['"]\s*\)/);
        if (printMatch) {
            output.textContent = `>> ${printMatch[1]}`;
            output.style.color = 'var(--primary-green)';
        } else {
            output.textContent = '>> SyntaxError: Invalid command.';
            output.style.color = '#f7768e';
        }
    },

    submitCode: function () {
        const step = this.state.currentLesson.steps[this.state.currentStep];
        const code = this.state.codeAttempt.trim();

        if (code === step.expected) {
            alert(`✅ MISSION COMPLETE!\n\n+${this.state.currentLesson.xpReward} XP`);
            // In production: Update Lattice state, grant XP, unlock next lesson
        } else {
            alert(`❌ Not quite right. Try again!\n\nExpected something like: ${step.expected}`);
        }
    },

    nextStep: function () {
        if (this.state.currentStep < this.state.totalSteps - 1) {
            this.state.currentStep++;
            this.state.codeAttempt = ''; // Clear for next step
            this.render();
        }
    }
};

window.App.Academy = Academy;
