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

    // 1. Render the Main Card Grid (Dashboard/Learn)
    renderCatalogGrid: function () {
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
            card.className = `course-card cyber-card cozy-card ${isLocked ? 'locked' : ''}`;

            // Data Attributes
            card.dataset.route = 'courseDetail';
            card.dataset.param = track.id;

            // DETERMINE SCENE TYPE
            let sceneClass = 'scene-python'; // Default
            let animHtml = '';

            // === BLUEPRINT: VERTICAL VIDEO CARD ===
            // 16:9 Video Header + Content Body

            // Video Source Map (User to provide these)
            const videoMap = {
                'python': 'assets/pixel_art/python_loop.mp4',
                'web': 'assets/pixel_art/web_loop.mp4',
                'js': 'assets/pixel_art/js_loop.mp4',
                'cpp': 'assets/pixel_art/cpp_loop.mp4'
            };

            // Poster Map (Fallback Pixel Art)
            const posterMap = {
                'python': 'assets/pixel_art/python.png',
                'web': 'assets/pixel_art/web.png',
                'js': 'assets/pixel_art/js.png',
                'cpp': 'assets/pixel_art/cpp_loop.png' // User hasn't gen'd this yet, generic fallback
            };

            const videoSrc = videoMap[track.id] || '';
            const posterSrc = posterMap[track.id] || 'assets/logo.png';

            // HTML Structure: Video Header -> Content Body
            animHtml = `
                <div class="card-media">
                    <video 
                        src="${videoSrc}" 
                        poster="${posterSrc}" 
                        class="card-video" 
                        autoplay loop muted playsinline 
                        onmouseover="this.play()" 
                        onmouseout="this.pause()"
                    ></video>
                    <!-- "Live" Badge for immersion -->
                    <div class="live-badge">LIVE</div>
                </div>
            `;

            // [CODEDEX STYLE] Video on Top, Content Below
            card.innerHTML = `
                <div class="video-container ${sceneClass}">
                    ${animHtml}
                    <!-- Icon Overlay -->
                    <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); font-size:4rem; text-shadow:0 0 20px rgba(255,255,255,0.5);">
                        ${track.icon}
                    </div>
                </div>
                
                <div class="card-content">
                    <div class="course-info">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                            <span class="course-label cyber-mono" style="color:#00ff00; font-size:0.8rem;">${track.id.toUpperCase()}</span>
                            <span class="cyber-mono" style="font-size:0.7rem; background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:4px;">${track.level || 'Beginner'}</span>
                        </div>
                        
                        <h2 class="cyber-text-glow" style="margin: 0.2rem 0; font-size: 1.4rem;">${track.title}</h2>
                        
                        <!-- USAGE TAGS -->
                        <div style="margin: 0.5rem 0; font-size: 0.8rem; color: #aaa;">
                            <span style="display:inline-block; border:1px solid #333; padding:2px 8px; border-radius:10px; background:rgba(0,0,0,0.3);">
                                🔧 ${track.usage || 'General Programming'}
                            </span>
                        </div>

                        <p class="cyber-dim" style="font-size: 0.9rem; line-height: 1.4; margin-bottom: 1rem;">${track.description}</p>
                    </div>
                    
                    <button class="btn-primary cyber-btn-small full-width" data-route="courseDetail" data-param="${track.id}" style="margin-top:auto; pointer-events:auto; cursor:pointer;">
                        ${isLocked ? 'LOCKED' : (track.progress > 0 ? 'RESUME PROTOCOL' : 'START PROTOCOL')}
                    </button>
                    
                    ${track.progress > 0 ? `
                    <div class="progress-label cyber-progress" style="margin-top:0.8rem;">
                        <div class="progress-bar" style="height:4px; background:rgba(255,255,255,0.1);">
                            <div class="fill" style="width: ${track.progress}%; background:var(--accent-primary); box-shadow:0 0 10px var(--accent-primary);"></div>
                        </div>
                        <span class="cyber-mono" style="font-size:0.7rem; margin-top:3px; display:block; text-align:right;">${track.progress}%</span>
                    </div>` : ''}
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
