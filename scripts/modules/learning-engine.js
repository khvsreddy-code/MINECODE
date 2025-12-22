// Learning Engine 3.0 - Deep Teaching & Active Recall
window.App = window.App || {};

const LearningEngine = {
    container: null,
    currentLesson: null,

    init: function () {
        this.container = document.getElementById('lesson-view');
    },

    load: function (lessonId, language) {
        // Generate Deep Universal Lesson
        const lesson = this.generateDeepLesson(lessonId, language);

        if (!lesson) {
            console.error(`[LearningEngine] Protocol Failure: ${lessonId}`);
            return;
        }

        this.currentLesson = lesson;
        this.render();
    },

    generateDeepLesson: function (lessonId, langKey) {
        const lang = langKey.toLowerCase();
        const syntax = window.SYNTAX_DB[lang] || window.SYNTAX_DB['python'];

        // Use Smart Data Module
        let CURRICULUM = [];
        if (window.CurriculumData) {
            CURRICULUM = window.CurriculumData.generateCurriculum(lang, syntax);
        } else {
            console.error("Critical: CurriculumData not loaded. Learning Engine aborted.");
            return null;
        }

        // Parse ID (format: course-chX-Y)
        let chapterIdx = 0;
        let lessonIdx = 0;

        if (lessonId.includes('-ch')) {
            const parts = lessonId.split('-');
            chapterIdx = parseInt(parts[1].replace('ch', '')) - 1;
            lessonIdx = parseInt(parts[2]);
        }
        if (chapterIdx >= CURRICULUM.length) return null;

        const chapter = CURRICULUM[chapterIdx];

        // Validate Lesson End in Chapter
        if (lessonIdx >= chapter.lessons.length) {
            return this.generateDeepLesson(`${langKey}-ch${chapterIdx + 2}-0`, langKey);
        }

        const data = chapter.lessons[lessonIdx];

        // Next Lesson Pointer
        let nextId = `${langKey}-ch${chapterIdx + 1}-${lessonIdx + 1}`;
        if (lessonIdx + 1 >= chapter.lessons.length) {
            nextId = `${langKey}-ch${chapterIdx + 2}-0`;
        }

        return {
            id: lessonId,
            language: lang,
            title: data.title,
            chapterTitle: chapter.title,
            chapterDesc: chapter.desc,
            chapter: chapterIdx + 1,
            xp: (chapterIdx + 1) * 200, // High Rewards
            nextId: nextId,
            content: {
                story: `# ${data.title}\n${data.story || data.desc}`,
                instructions: [
                    { step: 1, text: data.task },
                    { step: 2, text: "Execute to verify." }
                ],
                hints: [data.hint || "Check syntax database."],
                starterCode: data.template,
                visualValidator: data.validator
            }
        };
    },

    render: function () {
        if (!this.container || !this.currentLesson) return;
        const lesson = this.currentLesson;
        const syntax = window.SYNTAX_DB[lesson.language] || {};

        // Render
        this.container.innerHTML = `
            <div class="workspace">
                <div class="workspace-instructions">
                     <div class="lesson-header">
                        <button class="btn btn-ghost" onclick="navigateTo('courseDetail', '${lesson.language}')">← BACK</button>
                        <div class="lesson-meta">
                            <span class="badge badge-neon">SECTION ${lesson.chapter}</span>
                            <span class="xp-badge">💠 +${lesson.xp} XP</span>
                        </div>
                    </div>
                    
                    <div class="chapter-banner">
                        <div class="chapter-sub">${lesson.chapterDesc}</div>
                        <h1 class="lesson-title animate-reveal">${lesson.title}</h1>
                    </div>

                    <div class="lesson-story markdown-content">${this.parseMarkdown(lesson.content.story)}</div>
                    
                    <div class="mission-box">
                        <h3 class="section-label">⚡ PROTOCOL OBJECTIVE</h3>
                        <ol class="instruction-list">
                            ${lesson.content.instructions.map(i => `
                                <li class="instruction-item">
                                    <span class="step-check">○</span>
                                    <span class="step-text">${this.parseMarkdown(i.text)}</span>
                                </li>
                            `).join('')}
                        </ol>
                    </div>
                    
                     <details class="hints-panel">
                        <summary class="hints-toggle">💡 HINT DATABASE</summary>
                        <ul class="hints-list">
                            ${lesson.content.hints.map(h => `<li>${this.parseMarkdown(h)}</li>`).join('')}
                        </ul>
                    </details>
                </div>
                
                <div class="workspace-editor">
                    <div class="editor-header">
                        <div class="editor-tabs"><button class="editor-tab active">main.${syntax.extension || 'txt'}</button></div>
                        <div class="editor-actions"><button class="btn btn-primary" id="run-code-btn"><span>▶</span> EXECUTE</button></div>
                    </div>
                    <div class="editor-area">
                        <div class="line-numbers" id="line-numbers"></div>
                        <textarea class="code-editor" id="code-input" spellcheck="false" placeholder="// System Ready...">${lesson.content.starterCode}</textarea>
                    </div>
                    <div class="terminal-panel">
                        <div class="terminal-header"><span class="terminal-title">📺 ${['html', 'css'].includes(lesson.language) ? 'WEB PREVIEW' : 'CONSOLE'}</span><button class="btn-clear" id="clear-terminal">CLEAR</button></div>
                        ${['html', 'css'].includes(lesson.language)
                ? `<iframe id="web-preview" class="web-preview-frame"></iframe><div id="terminal-output" class="hidden"></div>`
                : `<div class="terminal-output" id="terminal-output"><div class="terminal-line dim">> Ready.</div></div>`
            }
                    </div>
                </div>
            </div>
            
             <!-- Success Modal -->
            <div class="success-modal hidden" id="success-modal">
                <div class="success-content glass-panel">
                    <div class="success-icon-anim">🎉</div>
                    <h2 class="text-neon">PROTOCOL VERIFIED</h2>
                    <p>Sector Secure. Proceeding to next objective.</p>
                    <div class="success-xp">+${lesson.xp} XP</div>
                    <button class="btn btn-primary" id="next-lesson-btn">NEXT LEVEL</button>
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
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextLesson()); // Completes Lesson

        if (codeInput) {
            codeInput.addEventListener('input', () => this.updateLineNumbers());
            codeInput.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    document.execCommand('insertText', false, '    ');
                }
            });
        }
    },

    runCode: async function () {
        const codeInput = document.getElementById('code-input');
        const terminal = document.getElementById('terminal-output');
        const code = codeInput.value;

        terminal.innerHTML = '';
        terminal.innerHTML += `<div class="terminal-line dim">▶ COMPILING...</div>`;

        // === WEB PREVIEW MODE ===
        if (['html', 'css'].includes(this.currentLesson.language)) {
            const iframe = document.getElementById('web-preview');
            const code = codeInput.value;
            if (iframe) {
                const doc = iframe.contentDocument || iframe.contentWindow.document;
                doc.open();
                if (this.currentLesson.language === 'html') {
                    doc.write(code);
                } else {
                    // CSS Mode: Inject a standard box to style
                    doc.write(`
                        <style>
                            body { background: #1a1a1a; color: #fff; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: sans-serif; }
                            .preview-box { width: 100px; height: 100px; background: #333; display: flex; justify-content: center; align-items: center; border: 1px solid #444; }
                            ${code}
                        </style>
                        <div class="preview-box">BOX</div>
                    `);
                }
                doc.close();

                // Fake success for Web (Visual Check mostly, but we can validate string inclusion)
                const validator = this.currentLesson.content.visualValidator;
                if (validator && validator("Preview Active", code)) {
                    // passing 'Preview Active' as mock output, but validator should mainly check 'code'
                    terminal.innerHTML += `<div class="terminal-line success">✅ VISUALS RENDERED.</div>`;
                    this.showSuccess();
                }
            }
            return;
        }

        // === PISTON ARTIFACT MODE ===
        try {
            let result;
            if (window.App.Compiler) {
                result = await window.App.Compiler.execute(this.currentLesson.language, code);
            } else {
                result = { output: "Compiler Offline." };
            }

            if (result.error) {
                terminal.innerHTML += `<div class="terminal-line error">❌ ${result.error}</div>`;
            } else {
                const lines = result.output.split('\n');
                lines.forEach(line => {
                    terminal.innerHTML += `<div class="terminal-line success">${line}</div>`;
                });

                // Logic Check
                const validator = this.currentLesson.content.visualValidator;
                if (validator && validator(result.output, code)) {
                    terminal.innerHTML += `<div class="terminal-line success">✅ LOGIC VERIFIED.</div>`;

                    // Mark Completed in GameState
                    if (window.GameState) {
                        const courseId = this.currentLesson.language;
                        window.GameState.completeLesson(courseId, 'lesson'); // Increment count
                    }

                    setTimeout(() => this.showSuccess(), 800);
                } else {
                    terminal.innerHTML += `<div class="terminal-line warning">⚠️ OUTPUT MISMATCH.</div>`;
                }
            }
        } catch (err) {
            terminal.innerHTML += `<div class="terminal-line error">ERROR: ${err.message}</div>`;
        }
    },

    showSuccess: function () {
        const modal = document.getElementById('success-modal');
        if (modal) modal.classList.remove('hidden');
        if (window.App.Audio) window.App.Audio.playSuccess();
        if (window.confetti) window.confetti({ particleCount: 150, spread: 80 });
    },

    nextLesson: function () {
        const modal = document.getElementById('success-modal');
        if (modal) modal.classList.add('hidden');

        if (this.currentLesson && this.currentLesson.nextId) {
            this.load(this.currentLesson.nextId, this.currentLesson.language);
        } else {
            if (window.App.Router) {
                window.App.Router.show('courseDetail', this.currentLesson.language);
            }
        }
    },

    clearTerminal: function () {
        const terminal = document.getElementById('terminal-output');
        if (terminal) terminal.innerHTML = '<div class="terminal-line dim">> Cleared.</div>';
    },

    updateLineNumbers: function () {
        const codeInput = document.getElementById('code-input');
        const lineNumbers = document.getElementById('line-numbers');
        if (!codeInput || !lineNumbers) return;
        const lines = codeInput.value.split('\n').length;
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => `<div class="line-num">${i + 1}</div>`).join('');
    },

    parseMarkdown: function (text) {
        if (!text) return '';
        return text.replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>').replace(/^# (.+)$/gm, '<h1>$1</h1>');
    }
};

window.App.LearningEngine = LearningEngine;
window.App.Academy = LearningEngine;
