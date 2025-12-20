// Catalog & Course Detail Renderer
window.App = window.App || {};

const Catalog = {
    init: function () {
        // Find containers
        this.catalogGrid = document.querySelector('.active-courses-grid'); // Main Catalog
        this.detailContainer = document.querySelector('.curriculum-section'); // Detail View

        // Render Catalog if we are on that page
        if (this.catalogGrid) this.renderCatalogGrid();
    },

    // 1. Render Enhanced Language Cards (Codedex-Inspired)
    renderCatalogGrid: function () {
        if (!this.catalogGrid) this.catalogGrid = document.querySelector('.active-courses-grid');
        if (!window.App.Curriculum || !window.App.Curriculum.tracks || !this.catalogGrid) return;

        // Sync Progress
        if (window.App.Lattice && window.App.Lattice.state && window.App.Lattice.state.completedProjects) {
            try {
                window.App.Curriculum.calculateProgress(window.App.Lattice.state.completedProjects);
            } catch (e) {
                console.error("Progress Sync Warning:", e);
            }
        }

        this.catalogGrid.innerHTML = '';
        this.catalogGrid.className = 'language-grid';

        // Mock learner counts for engagement
        const learnerCounts = {
            python: 12847, web: 8234, js: 9521, java: 5123, cpp: 3892,
            sql: 4521, react: 6789, rust: 2341, go: 3456, git: 7890,
            c: 2987, csharp: 4123, godot: 1876
        };

        window.App.Curriculum.tracks.forEach((track, index) => {
            const card = document.createElement('div');
            card.className = 'language-card';
            card.dataset.lang = track.id;
            card.dataset.route = 'courseDetail';
            card.dataset.param = track.id;
            card.style.animationDelay = `${index * 0.1}s`;

            const learners = learnerCounts[track.id] || Math.floor(Math.random() * 5000) + 1000;
            const progress = track.progress || 0;
            const chapters = track.chapters || 12;
            const completedChapters = Math.floor((progress / 100) * chapters);
            const xpReward = track.xpReward || 500;
            const difficulty = track.level || 'Beginner';

            card.innerHTML = `
                <div class="pixel-corner tl"></div>
                <div class="pixel-corner tr"></div>
                <div class="pixel-corner bl"></div>
                <div class="pixel-corner br"></div>
                
                <div class="learners-badge">
                    <span class="dot"></span>
                    <span>${learners.toLocaleString()} learning</span>
                </div>
                
                <div class="language-card-banner">
                    <div class="language-mascot">${track.icon}</div>
                </div>
                
                <div class="language-card-content">
                    <div class="language-card-header">
                        <div>
                            <h3 class="language-card-title">${track.title}</h3>
                            <p class="language-card-subtitle">${track.description || 'Master the fundamentals'}</p>
                        </div>
                    </div>
                    
                    <div class="language-card-meta">
                        <span class="difficulty-badge ${difficulty.toLowerCase()}">${difficulty}</span>
                        <span class="xp-badge">💠 +${xpReward} XP</span>
                    </div>
                    
                    ${progress > 0 ? `
                        <div class="language-card-progress">
                            <div class="progress-label">
                                <span>Progress</span>
                                <span>${progress}%</span>
                            </div>
                            <div class="progress-track">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                            </div>
                        </div>
                        <div class="chapter-pills">
                            ${Array(chapters).fill(0).map((_, i) =>
                `<div class="chapter-pill ${i < completedChapters ? 'completed' : ''} ${i === completedChapters ? 'current' : ''}"></div>`
            ).join('')}
                        </div>
                    ` : ''}
                    
                    <button class="language-card-cta ${progress > 0 ? 'resume' : ''}" data-route="courseDetail" data-param="${track.id}">
                        ${progress > 0 ? '▶ RESUME LEARNING' : '🚀 START JOURNEY'}
                    </button>
                </div>
            `;

            this.catalogGrid.appendChild(card);
        });
    },

    renderGridMode: function () {
        if (!this.catalogGrid) this.catalogGrid = document.querySelector('.active-courses-grid');
        if (!window.App.Curriculum || !window.App.Curriculum.tracks || !this.catalogGrid) return;

        // Sync Progress from Lattice
        if (window.App.Lattice && window.App.Lattice.state && window.App.Lattice.state.completedProjects) {
            try {
                window.App.Curriculum.calculateProgress(window.App.Lattice.state.completedProjects);
            } catch (e) {
                console.error("Progress Sync Warning:", e);
            }
        }

        this.catalogGrid.innerHTML = ''; // Clear static HTML

        window.App.Curriculum.tracks.forEach(track => {
            // UNLOCKED FOR DEMO
            const isLocked = false;

            // Dynamic Card HTML
            const card = document.createElement('div');
            card.className = `course-card ${isLocked ? 'locked' : ''}`;

            // Data Attributes
            card.dataset.route = 'courseDetail';
            card.dataset.param = track.id;

            // Cover Art Gradient Class
            const coverClass = `${track.id}-cover`;

            card.innerHTML = `
                <div class="card-media ${coverClass}">
                    <div class="track-icon">${track.icon}</div>
                </div>
                
                <div class="card-content">
                    <div class="course-tags">
                        <span class="tag">${track.id.toUpperCase()}</span>
                        <span class="tag">${track.level || 'Beginner'}</span>
                    </div>
                    
                    <h2>${track.title}</h2>
                    <p>${track.description}</p>
                    
                    <button class="btn-primary full-width" style="margin-top:auto;">
                        ${isLocked ? 'LOCKED' : (track.progress > 0 ? 'RESUME PROTOCOL' : 'INITIALIZE')}
                    </button>
                    
                    ${track.progress > 0 ? `
                    <div class="progress-bar" style="margin-top: 1rem; height: 4px; background: rgba(255,255,255,0.1);">
                        <div class="fill" style="width: ${track.progress}%; background: var(--primary-green); box-shadow: 0 0 10px var(--primary-green);"></div>
                    </div>
                    ` : ''}
                </div>
            `;
            this.catalogGrid.appendChild(card);
        });
    },

    // 2. Render Specific Course Details (Lessons)
    renderCourseDetail: function (trackId) {
        // Defaults to Python if no trackId provided
        const activeTrackId = trackId || 'python';
        const activeCourses = window.App.Curriculum.courses[activeTrackId];

        // Ensure container exists
        // If undefined, try re-querying (in case view switched)
        if (!this.detailContainer) this.detailContainer = document.querySelector('.curriculum-section');
        if (!this.detailContainer) return;

        this.detailContainer.innerHTML = '';

        // Title Header (Optional: Could inject into a hero banner)
        // For now, just render the list

        if (!activeCourses) {
            this.detailContainer.innerHTML = '<h3 class="cyber-mono">NO_DATA_FOUND_FOR_TRACK</h3>';
            return;
        }

        activeCourses.forEach(chapter => {
            const unlockedStratums = (window.App.Lattice && window.App.Lattice.state) ? window.App.Lattice.state.unlockedStratums : [0];
            const isStratumLocked = !unlockedStratums.includes(chapter.id) && chapter.id !== 0; // Always unlock 0
            const lockClass = isStratumLocked ? 'locked' : '';

            const chapterHtml = `
                <div class="chapter-marker ${lockClass}">
                    <div class="chapter-num">${chapter.id + 1}</div>
                    <h3>${chapter.title} ${isStratumLocked ? '🔒' : ''}</h3>
                </div>
            `;
            this.detailContainer.innerHTML += chapterHtml;

            const listDiv = document.createElement('div');
            listDiv.className = 'curriculum-list';

            chapter.projects.forEach(project => {
                const item = document.createElement('div');
                item.className = `curriculum-item ${lockClass}`;

                // Construct Item
                item.dataset.route = 'lessonView';
                item.dataset.project = project.id;
                if (isStratumLocked) {
                    item.removeAttribute('data-route'); // Disable routing
                    item.classList.add('locked');
                }

                item.innerHTML = `
                    <span class="item-title">${project.title}</span>
                    <button class="btn-start-exercise" ${isStratumLocked ? 'disabled' : ''} data-route="lessonView" data-project="${project.id}">
                        ${isStratumLocked ? 'Locked' : 'Start'}
                    </button>
                `;
                listDiv.appendChild(item);
            });
            this.detailContainer.appendChild(listDiv);
        });
    },

    // Called by Router when showing 'courseDetail'
    showCourseDetail: function (trackId) {
        console.log("Showing Details for Track:", trackId);
        this.renderCourseDetail(trackId);
    }
};

// Global Assign for fallback
window.App.Catalog = Catalog;
