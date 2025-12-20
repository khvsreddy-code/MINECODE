/**
 * Gamification Engine Module
 * Overrides default rendering functions with Gamified versions.
 */

// Override the Lesson Workspace with Cyber-IDE 2.0
window.renderLessonWorkspace = function () {
    const lessonView = document.getElementById('lesson-view');

    // Cyber-IDE 2.0 Layout (3-Pane)
    lessonView.innerHTML = `
        <div class="ide-container">
            <!-- Left: Instructions -->
            <div class="ide-panel instructions-panel">
                <div class="ide-header">
                    <span><span style="color:var(--neon-gold)">★</span> QUEST LOG</span>
                    <span style="font-size: 10px; color: var(--neon-cyan);">LVL 1</span>
                </div>
                <div style="padding: 20px; overflow-y: auto; color: var(--text-primary); font-family: var(--font-body); line-height: 1.6;">
                    <h2 style="font-family: var(--font-display); color: var(--text-bright); margin-bottom: 16px;">The Awakening</h2>
                    <p>System initialization required. The mainframe is offline and needs a jagged signal to wake up.</p>
                    <br>
                    <div style="background: rgba(0,0,0,0.3); padding: 12px; border-left: 3px solid var(--neon-gold); font-family: var(--font-mono); font-size: 14px; margin-bottom: 16px;">
                        <strong>OBJECTIVE:</strong><br>
                        Print the phrase "Hello World" to the console.
                    </div>
                </div>
                <div style="padding: 12px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between;">
                    <button class="btn-cyber-outline" onclick="navigateTo('course-python')">ABORT</button>
                    <button class="btn-cyber-primary" id="run-btn">RUN PROTOCOL</button>
                </div>
            </div>

            <!-- Center: Editor -->
            <div class="ide-panel editor-panel" style="position: relative;">
                <div class="ide-header">
                    <span><i class="fas fa-code"></i> main.py</span>
                    <span style="opacity: 0.5;">Python 3.10</span>
                </div>
                <div style="display: flex; height: 100%;">
                    <div style="width: 30px; background: rgba(0,0,0,0.2); border-right: 1px solid var(--border-subtle); color: #444; font-family: var(--font-mono); font-size: 14px; padding-top: 16px; text-align: center; user-select: none;">
                        1<br>2<br>3<br>4
                    </div>
                    <textarea id="code-input" spellcheck="false" style="
                        flex: 1; 
                        background: transparent; 
                        color: var(--text-bright); 
                        border: none; 
                        padding: 16px; 
                        font-family: var(--font-mono); 
                        font-size: 15px; 
                        outline: none; 
                        resize: none; 
                        line-height: 1.5;
                    ">print("Hello, World!")</textarea>
                </div>
            </div>

            <!-- Right: Output Terminal -->
            <div class="ide-panel output-panel">
                <div class="ide-header">
                    <span>>_ TERMINAL</span>
                    <span class="status-indicator online" style="width: 8px; height: 8px; background: var(--neon-green); border-radius: 50%; box-shadow: 0 0 5px var(--neon-green);"></span>
                </div>
                <div id="terminal-out" style="
                    padding: 16px; 
                    font-family: var(--font-mono); 
                    font-size: 14px; 
                    color: var(--text-muted); 
                    height: 100%; 
                    overflow-y: auto;
                    background: #000;
                ">
                    <div style="color: #444;">Microsoft Windows [Version 10.0.19045.4291]</div>
                    <div style="color: #444;">(c) Microsoft Corporation. All rights reserved.</div>
                    <br>
                    <div style="color: var(--neon-cyan);">root@minecode:~/environment $ python main.py</div>
                </div>
            </div>
            
            <!-- Level Up Overlay -->
            <div id="level-overlay" class="level-up-overlay">
                <div class="level-up-box">
                    <div class="level-title">LEVEL COMPLETE</div>
                    <div class="xp-gain">+50 XP</div>
                    <button class="level-btn" onclick="navigateTo('course-python')">CONTINUE</button>
                </div>
            </div>
        </div>
    `;

    // Run Logic
    document.getElementById('run-btn').addEventListener('click', () => {
        const code = document.getElementById('code-input').value;
        const term = document.getElementById('terminal-out');
        const overlay = document.getElementById('level-overlay');

        term.innerHTML += `<div style="margin-top: 8px;">> Running...</div>`;

        setTimeout(() => {
            if (code.includes('print("') || code.includes("print('")) {
                const text = code.match(/print\(["'](.+)["']\)/)[1];
                term.innerHTML += `<div style="color: var(--text-bright);">${text}</div>`;
                term.innerHTML += `<div style="color: var(--neon-green); margin-top: 8px; text-shadow: 0 0 5px var(--neon-green);">[SUCCESS] LEVEL COMPLETE (+50 XP)</div>`;

                // Add XP if not already
                if (window.GameState) {
                    GameState.addXP(50);
                    // Show Overlay
                    setTimeout(() => {
                        overlay.classList.add('active');
                        // Trigger confetti if available, else just overlay
                    }, 500);
                }
            } else {
                term.innerHTML += `<div style="color: var(--neon-pink);">Syntax Error: expected print statement.</div>`;
            }
            term.scrollTop = term.scrollHeight;
        }, 500);
    });
};

// Override the Course Roadmap with RPG Map
window.renderCourseRoadmap = function (id) {
    const course = COURSES.find(c => c.id === id) || COURSES[0];
    const content = document.getElementById('course-content');

    // RPG Map Coordinates (Percent X, Percent Y) - Winding Path to Castle
    const mapNodes = [
        { id: 1, x: 15, y: 80, label: "The Awakening" },
        { id: 2, x: 30, y: 65, label: "Data Stranding" },
        { id: 3, x: 50, y: 55, label: "The Loop" },
        { id: 4, x: 70, y: 40, label: "Function Peaks" },
        { id: 5, x: 85, y: 20, label: "Object Castle" }
    ];

    // Get Progress
    const state = GameState.data.progress[course.id] || { completedLessons: [] };
    const completedIds = state.completedLessons;
    const nextLevel = completedIds.length + 1; // Simplistic progress

    // Generate Map HTML
    const nodesHtml = mapNodes.map(node => {
        const isCompleted = completedIds.includes(node.id);
        const isUnlocked = node.id === 1 || completedIds.includes(node.id - 1);
        const isCurrent = node.id === nextLevel;

        let statusClass = 'locked';
        if (isCompleted) statusClass = 'completed';
        else if (isCurrent) statusClass = 'active-current unlocked';
        else if (isUnlocked) statusClass = 'unlocked';

        return `
            <div class="map-node ${statusClass}" 
                 style="left: ${node.x}%; top: ${node.y}%;"
                 onclick="${isUnlocked ? `navigateTo('lesson')` : ''}"
                 data-tilt data-tilt-scale="1.2">
                
                <div class="node-icon">
                    ${isCompleted ? '✓' : node.id}
                </div>
                <div class="node-label">${node.label}</div>
            </div>
        `;
    }).join('');

    // Player Token Position (at current level)
    const activeNode = mapNodes.find(n => n.id === nextLevel) || mapNodes[mapNodes.length - 1];
    const tokenHtml = `
        <div class="player-token" style="left: ${activeNode.x}%; top: ${activeNode.y}%;"></div>
    `;

    // SVG Path Connecting Nodes
    const pathPoints = mapNodes.map(n => `${n.x},${n.y}`).join(' ');
    const pathHtml = `
        <svg class="map-connections" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style="position: absolute; top: 0; left: 0; z-index: 0; pointer-events: none;">
            <polyline points="${pathPoints}" fill="none" stroke="var(--neon-cyan)" stroke-width="0.5" stroke-dasharray="2" style="opacity: 0.6; filter: drop-shadow(0 0 4px var(--neon-cyan));" />
        </svg>
    `;

    content.innerHTML = `
        <div class="cyber-header" style="margin-bottom: 24px; text-align: center;">
            <h1 style="font-family: var(--font-display); font-size: 32px; text-shadow: 0 4px 0 black; margin-bottom: 8px;">${course.title} World</h1>
            <p style="font-family: var(--font-mono); color: var(--neon-cyan);">Make your way to the Object Castle.</p>
        </div>

        <div class="rpg-map-viewport">
            <div class="rpg-map-overlay">
                <!-- Map Image Layer -->
                <img src="assets/gamification/map-forest.png" class="rpg-map-image" alt="RPG World Map">
                
                <!-- Path Connections -->
                ${pathHtml}

                <!-- Interactive Nodes -->
                ${nodesHtml}

                <!-- Player Avatar -->
                ${tokenHtml}
            </div>
        </div>
        
        <div style="margin-top: 24px; text-align: center;">
             <button class="btn-cyber-outline" onclick="navigateTo('courses')">← BACK TO ORBIT</button>
        </div>
    `;

    // Initialize Tilt on new nodes
    if (window.TiltEffect && window.TiltEffect.init) {
        window.TiltEffect.init('.map-node', { max: 15, speed: 400, scale: 1.2 });
    }
};

console.log("[Gamification] Module loaded. IDE and Map renderers upgraded.");
