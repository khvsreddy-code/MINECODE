// Learning Engine - Codedex-Style Workspace
window.App = window.App || {};

const LearningEngine = {
    container: null,
    currentLesson: null,

    // Sample lesson data
    lessons: {
        'python-hello': {
            id: 'python-hello',
            title: 'Hello, World!',
            language: 'python',
            chapter: 1,
            xp: 50,
            content: {
                story: `# Welcome to Python! 🐍

Every programmer's journey begins with a simple greeting to the world. Today, you'll write your first line of code.

In Python, we use the \`print()\` function to display text on the screen. It's like teaching your computer to speak!

## Your Mission
Write a program that displays "Hello, World!" to the console.`,

                instructions: [
                    { step: 1, text: 'Type `print("Hello, World!")` in the editor' },
                    { step: 2, text: 'Click the **Run** button to execute your code' },
                    { step: 3, text: 'See your message appear in the terminal below!' }
                ],

                hints: [
                    'Make sure to use quotation marks around your text',
                    'Python is case-sensitive - use lowercase `print`',
                    'Don\'t forget the parentheses!'
                ],

                starterCode: '# Write your first Python program below\n\n',
                solution: 'print("Hello, World!")',
                expectedOutput: 'Hello, World!'
            }
        },
        'python-variables': {
            id: 'python-variables',
            title: 'Variables & Data',
            language: 'python',
            chapter: 2,
            xp: 75,
            content: {
                story: `# Storing Information 📦

Variables are like labeled boxes where you can store data. Give your box a name, put something inside, and Python will remember it for you!

\`\`\`python
name = "Alex"
age = 16
\`\`\`

## Your Mission
Create variables to store your name and age, then print them out.`,

                instructions: [
                    { step: 1, text: 'Create a variable called `name` and set it to your name' },
                    { step: 2, text: 'Create a variable called `age` and set it to your age' },
                    { step: 3, text: 'Use `print()` to display both variables' }
                ],

                hints: [
                    'Strings need quotation marks, numbers don\'t',
                    'You can print multiple items: print(name, age)'
                ],

                starterCode: '# Create your variables below\n\nname = \nage = \n\n# Print them out\n',
                solution: 'name = "Alex"\nage = 16\nprint(name, age)',
                expectedOutput: 'Alex 16'
            }
        }
    },

    init: function () {
        this.container = document.getElementById('lesson-view');
    },

    load: function (lessonId) {
        const lesson = this.lessons[lessonId];
        if (!lesson) {
            console.error(`[LearningEngine] Lesson not found: ${lessonId}`);
            return;
        }

        this.currentLesson = lesson;
        this.render();
    },

    render: function () {
        if (!this.container || !this.currentLesson) return;

        const lesson = this.currentLesson;
        const { story, instructions, hints, starterCode } = lesson.content;

        this.container.innerHTML = `
            <div class="workspace">
                <!-- Instructions Panel -->
                <div class="workspace-instructions">
                    <div class="lesson-header">
                        <button class="btn btn-ghost" data-route="courseDetail" data-param="${lesson.language}">
                            ← Back
                        </button>
                        <div class="lesson-meta">
                            <span class="badge badge-primary">Chapter ${lesson.chapter}</span>
                            <span class="xp-badge">💠 +${lesson.xp} XP</span>
                        </div>
                    </div>
                    
                    <h1 class="lesson-title text-gradient">${lesson.title}</h1>
                    
                    <div class="lesson-story markdown-content">
                        ${this.parseMarkdown(story)}
                    </div>
                    
                    <div class="lesson-instructions">
                        <h3 class="section-label">📋 Instructions</h3>
                        <ol class="instruction-list">
                            ${instructions.map(i => `
                                <li class="instruction-item" data-step="${i.step}">
                                    <span class="step-check">○</span>
                                    <span class="step-text">${this.parseMarkdown(i.text)}</span>
                                </li>
                            `).join('')}
                        </ol>
                    </div>
                    
                    <details class="hints-panel">
                        <summary class="hints-toggle">
                            <span>💡 Need a hint?</span>
                        </summary>
                        <ul class="hints-list">
                            ${hints.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                    </details>
                </div>
                
                <!-- Editor Panel -->
                <div class="workspace-editor">
                    <div class="editor-header">
                        <div class="editor-tabs">
                            <button class="editor-tab active">main.py</button>
                        </div>
                        <div class="editor-actions">
                            <button class="btn btn-primary" id="run-code-btn">
                                <span>▶</span> Run
                            </button>
                        </div>
                    </div>
                    
                    <div class="editor-area">
                        <div class="line-numbers" id="line-numbers"></div>
                        <textarea 
                            class="code-editor" 
                            id="code-input" 
                            spellcheck="false"
                            placeholder="Write your code here..."
                        >${starterCode}</textarea>
                    </div>
                    
                    <div class="terminal-panel">
                        <div class="terminal-header">
                            <span class="terminal-title">📺 Output</span>
                            <button class="btn btn-ghost btn-sm" id="clear-terminal">Clear</button>
                        </div>
                        <div class="terminal-output" id="terminal-output">
                            <div class="terminal-prompt">Ready to run your code...</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Success Modal -->
            <div class="success-modal hidden" id="success-modal">
                <div class="success-content">
                    <div class="success-icon">🎉</div>
                    <h2 class="text-gradient">Great Job!</h2>
                    <p>You completed the exercise!</p>
                    <div class="success-xp">+${lesson.xp} XP</div>
                    <button class="btn btn-primary" id="next-lesson-btn">Continue</button>
                </div>
            </div>
        `;

        this.bindEvents();
        this.updateLineNumbers();
    },

    bindEvents: function () {
        const runBtn = document.getElementById('run-code-btn');
        const codeInput = document.getElementById('code-input');
        const clearBtn = document.getElementById('clear-terminal');
        const nextBtn = document.getElementById('next-lesson-btn');

        if (runBtn) runBtn.addEventListener('click', () => this.runCode());
        if (clearBtn) clearBtn.addEventListener('click', () => this.clearTerminal());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextLesson());

        if (codeInput) {
            codeInput.addEventListener('input', () => this.updateLineNumbers());
            codeInput.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = codeInput.selectionStart;
                    codeInput.value = codeInput.value.substring(0, start) + '    ' + codeInput.value.substring(codeInput.selectionEnd);
                    codeInput.selectionStart = codeInput.selectionEnd = start + 4;
                }
            });
        }
    },

    runCode: function () {
        const codeInput = document.getElementById('code-input');
        const terminal = document.getElementById('terminal-output');
        const code = codeInput.value;

        // Clear terminal
        terminal.innerHTML = '';

        // Add execution message
        terminal.innerHTML += `<div class="terminal-line dim">▶ Running code...</div>`;

        // Simulate Python execution
        setTimeout(() => {
            try {
                const output = this.simulatePython(code);
                terminal.innerHTML += `<div class="terminal-line success">${output}</div>`;

                // Check if correct
                if (this.checkSolution(output)) {
                    this.showSuccess();
                }
            } catch (err) {
                terminal.innerHTML += `<div class="terminal-line error">Error: ${err.message}</div>`;
            }
        }, 500);
    },

    simulatePython: function (code) {
        // Very basic Python simulation
        const lines = code.split('\n');
        let output = [];

        for (const line of lines) {
            const trimmed = line.trim();

            // Skip comments and empty lines
            if (trimmed.startsWith('#') || trimmed === '') continue;

            // Match print statements
            const printMatch = trimmed.match(/^print\s*\(\s*(.+)\s*\)$/);
            if (printMatch) {
                let content = printMatch[1];

                // Handle string literals
                if (content.match(/^["'](.*)["']$/)) {
                    output.push(content.slice(1, -1));
                } else if (content.match(/^f["'](.*)["']$/)) {
                    // f-string - just return the content for now
                    output.push(content.slice(2, -1));
                } else {
                    // Assume it's a variable or expression
                    output.push(content);
                }
            }
        }

        return output.join('\n') || 'No output';
    },

    checkSolution: function (output) {
        if (!this.currentLesson) return false;
        const expected = this.currentLesson.content.expectedOutput;
        return output.trim() === expected.trim();
    },

    showSuccess: function () {
        const modal = document.getElementById('success-modal');
        if (modal) modal.classList.remove('hidden');

        // Mark instructions as complete
        document.querySelectorAll('.instruction-item').forEach(item => {
            item.classList.add('completed');
            item.querySelector('.step-check').textContent = '✓';
        });
    },

    nextLesson: function () {
        // Navigate to next lesson or back to course detail
        const modal = document.getElementById('success-modal');
        if (modal) modal.classList.add('hidden');

        if (window.App.Router) {
            window.App.Router.show('courseDetail', this.currentLesson.language);
        }
    },

    clearTerminal: function () {
        const terminal = document.getElementById('terminal-output');
        if (terminal) {
            terminal.innerHTML = '<div class="terminal-prompt">Ready to run your code...</div>';
        }
    },

    updateLineNumbers: function () {
        const codeInput = document.getElementById('code-input');
        const lineNumbers = document.getElementById('line-numbers');
        if (!codeInput || !lineNumbers) return;

        const lines = codeInput.value.split('\n').length;
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) =>
            `<div class="line-num">${i + 1}</div>`
        ).join('');
    },

    parseMarkdown: function (text) {
        return text
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^### (.+)$/gm, '<h3>$1</h3>');
    }
};

// Set as Academy alias for compatibility
window.App.LearningEngine = LearningEngine;
window.App.Academy = LearningEngine;
