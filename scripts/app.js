// Non-module version for file:// compatibility
const DRINEE_CONFIG = {
    name: "DRINEE",
    version: "v1.0.0 (Puppy Build)",
    status: "EXCITED",

    directives: {
        SOCRATIC_DEBUGGER: true,
        DIEGETIC_IMMERSION: true,
        METACOGNITIVE_CHECK: false
    },

    responses: {
        intro: "Woof! Welcome to the Crust, Friend! The logic gates are rusted shut. We need to fetch the key (write a loop) to open them! 🦴",
        success_generic: "Woof! Tail wagging! The gate is moving! Good job!",
        success_loop: "Bark! You made a loop! The door is opening! Who's a good coder? You are!",
        error_syntax: "Grr... static interference! I don't understand that command. Check your syntax! 🐾",
        error_logic_infinite: "Whimper... I'm getting dizzy! You're running in circles (infinite loop)! 🌀",
        error_pass: "Yawn... I'm bored. 'pass' does nothing! Let's play fetch (write active logic)!",
        idle: "I wonder where I buried my bone... 🦴"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const continueBtn = document.getElementById('continue-btn');
    const onboardingContinueBtn = document.getElementById('onboarding-continue-btn');
    const onboarding3ContinueBtn = document.getElementById('onboarding-3-continue');
    const onboarding4ContinueBtn = document.getElementById('onboarding-4-continue');
    const getStartedBtn = document.getElementById('get-started-btn');

    const introOverlay = document.getElementById('intro-overlay');
    const onboarding1 = document.getElementById('onboarding-1');
    const onboarding2 = document.getElementById('onboarding-2');
    const onboarding3 = document.getElementById('onboarding-3');
    const onboarding4 = document.getElementById('onboarding-4');
    const dashboard = document.getElementById('dashboard');
    const courseCatalog = document.getElementById('course-catalog');
    const courseDetail = document.getElementById('course-detail');
    const lessonView = document.getElementById('lesson-view');
    const gameInterface = document.getElementById('game-interface');

    const runBtn = document.querySelector('.run-btn');
    const consoleOutput = document.querySelector('.console-output');
    const drineeMessage = document.querySelector('.dialogue-text .message');
    const persistentDrinee = document.getElementById('persistent-drinee');

    function togglePersistentDrinee(show) {
        if (!persistentDrinee) return;
        if (show) {
            persistentDrinee.classList.remove('hidden');
        } else {
            persistentDrinee.classList.add('hidden');
        }
    }

    if (drineeMessage) {
        drineeMessage.textContent = DRINEE_CONFIG.responses.intro;
    }

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            console.log('Start button clicked');
            introOverlay.style.opacity = '0';
            setTimeout(() => {
                introOverlay.classList.add('hidden');
                onboarding1.classList.remove('hidden');

                setTimeout(() => {
                    if (!onboarding1.classList.contains('hidden')) {
                        advanceToOnboarding2();
                    }
                }, 5000);
            }, 800);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 's' && !onboarding1.classList.contains('hidden')) {
            advanceToOnboarding2();
        }
    });

    function advanceToOnboarding2() {
        onboarding1.classList.add('hidden');
        onboarding2.classList.remove('hidden');
    }

    if (onboardingContinueBtn) {
        onboardingContinueBtn.addEventListener('click', () => {
            onboarding2.classList.add('hidden');
            onboarding3.classList.remove('hidden');
        });
    }

    if (onboarding3) {
        const cards = onboarding3.querySelectorAll('.selection-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                onboarding3ContinueBtn.classList.remove('disabled');
            });
        });

        if (onboarding3ContinueBtn) {
            onboarding3ContinueBtn.addEventListener('click', () => {
                onboarding3.classList.add('hidden');
                onboarding4.classList.remove('hidden');
            });
        }
    }

    if (onboarding4) {
        const cards = onboarding4.querySelectorAll('.selection-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                onboarding4ContinueBtn.classList.remove('disabled');
            });
        });

        if (onboarding4ContinueBtn) {
            onboarding4ContinueBtn.addEventListener('click', () => {
                onboarding4.classList.add('hidden');
                dashboard.classList.remove('hidden');
                togglePersistentDrinee(true);
            });
        }
    }

    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            dashboard.classList.add('hidden');
            courseCatalog.classList.remove('hidden');
            togglePersistentDrinee(true);
        });
    }

    const catalogCards = document.querySelectorAll('#course-catalog .course-card');
    catalogCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.tag')) return;
            if (e.target.closest('.filter-row')) return;
            courseCatalog.classList.add('hidden');
            courseDetail.classList.remove('hidden');
            togglePersistentDrinee(false);
        });
    });

    const startLearningBtn = document.getElementById('start-learning-btn');
    const startExerciseBtns = document.querySelectorAll('.btn-start-exercise');

    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', () => {
            courseDetail.classList.add('hidden');
            lessonView.classList.remove('hidden');
            togglePersistentDrinee(false);
        });
    }

    startExerciseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            courseDetail.classList.add('hidden');
            lessonView.classList.remove('hidden');
            togglePersistentDrinee(false);
        });
    });

    const detailBackBtn = document.getElementById('detail-back-btn');
    const lessonBackBtn = document.getElementById('lesson-back-btn');

    if (detailBackBtn) {
        detailBackBtn.addEventListener('click', () => {
            courseDetail.classList.add('hidden');
            courseCatalog.classList.remove('hidden');
            togglePersistentDrinee(true);
        });
    }

    if (lessonBackBtn) {
        lessonBackBtn.addEventListener('click', () => {
            lessonView.classList.add('hidden');
            courseDetail.classList.remove('hidden');
            togglePersistentDrinee(false);
        });
    }

    const markCompleteBtn = document.getElementById('mark-complete-btn');
    const lessonNextBtn = document.getElementById('lesson-next-btn');

    if (markCompleteBtn) {
        markCompleteBtn.addEventListener('click', () => {
            markCompleteBtn.textContent = '✓ Completed';
            markCompleteBtn.classList.add('disabled');
            lessonNextBtn.classList.remove('disabled');
            console.log('Lesson Completed!');
        });
    }

    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            console.log('Continue button clicked');
            dashboard.classList.add('hidden');
            gameInterface.classList.remove('hidden');
            console.log('Continue button clicked');
            dashboard.classList.add('hidden');
            gameInterface.classList.remove('hidden');
            togglePersistentDrinee(false);
            initializeDrineeAnimation();
        });
    }

    // Continuous animation loop for onboarding
    function startGlobalIdleLoop() {
        const drineeImages = document.querySelectorAll('.drinee-full-body, .persistent-drinee');

        const animations = {
            static: 'assets/drinee_fixed.png',
            cuteIdle1: 'assets/drinee_fixed.png',
            cuteIdle2: 'assets/drinee_fixed.png',
            talking: 'assets/drinee_fixed.png',
            talking2: 'assets/drinee_fixed.png',
            checkingPhone: 'assets/drinee_fixed.png',
            cat: 'assets/drinee_fixed.png',
            idle1: 'assets/drinee_fixed.png',
            idle2: 'assets/drinee_fixed.png',
            idle3: 'assets/drinee_fixed.png'
        };

        let animationIndex = 0;
        let isAnimationPlaying = false;

        const animationSequence = [
            { name: 'cuteIdle1', duration: 2700, chain: { name: 'cuteIdle2', duration: 1500 } },
            { name: 'talking', duration: 2700 },
            { name: 'talking2', duration: 2000 },
            { name: 'checkingPhone', duration: 3000 },
            { name: 'cat', duration: 4000 },
            { name: 'idle1', duration: 2700 },
            { name: 'idle2', duration: 1500 },
            { name: 'idle3', duration: 2700 }
        ];

        const playAnimation = (name, duration, nextAnimation = null) => {
            drineeImages.forEach(img => {
                // Skip if currently being interacted with
                if (img.dataset.interacting === 'true') {
                    console.log('⏸️ Skipping idle - user interacting');
                    return;
                }

                if (img.offsetParent !== null && !img.classList.contains('hidden')) {
                    console.log(`🎭 Idle Animation: ${name}`);
                    // Remove glass border for transparent background animations
                    img.classList.remove('glass-border');
                    img.src = animations[name];

                    setTimeout(() => {
                        // Check again before changing src
                        if (img.dataset.interacting === 'true') return;

                        if (nextAnimation) {
                            console.log(`🔗 Chain: ${nextAnimation.name}`);
                            img.src = animations[nextAnimation.name];
                            setTimeout(() => {
                                if (img.dataset.interacting !== 'true') {
                                    img.src = animations.static;
                                    // Add glass border for static white background image
                                    img.classList.add('glass-border');
                                    isAnimationPlaying = false;
                                }
                            }, nextAnimation.duration);
                        } else {
                            img.src = animations.static;
                            // Add glass border for static white background image
                            img.classList.add('glass-border');
                            isAnimationPlaying = false;
                        }
                    }, duration);
                }
            });

            // Calculate total duration (base + chain if exists)
            const totalDuration = duration + (nextAnimation ? nextAnimation.duration : 0);
            return totalDuration;
        };

        const playNextAnimation = () => {
            // Don't start new animation if one is already playing
            if (isAnimationPlaying) {
                console.log('⏸️ Animation still playing, waiting...');
                setTimeout(playNextAnimation, 1000);
                return;
            }

            isAnimationPlaying = true;
            const anim = animationSequence[animationIndex];
            const totalDuration = playAnimation(anim.name, anim.duration, anim.chain);
            animationIndex = (animationIndex + 1) % animationSequence.length;

            // Wait for total animation duration + 2 second pause before next
            setTimeout(playNextAnimation, totalDuration + 2000);
        };

        setTimeout(playNextAnimation, 2000);
    }

    startGlobalIdleLoop();

    // Interactive Drinee - EXACT durations based on 24fps WebP animations
    function setupDrineeInteractions() {
        const drineeElements = document.querySelectorAll('.drinee-full-body, .persistent-drinee');

        const animations = {
            static: 'assets/drinee_fixed.png',
            hit: 'assets/drinee_fixed.png',
            patBegin: 'assets/drinee_fixed.png',
            patLoop: 'assets/drinee_fixed.png',
            patEnd: 'assets/drinee_fixed.png',
            talking2: 'assets/drinee_fixed.png',
            checkingPhone: 'assets/drinee_fixed.png'
        };

        // Based on typical 24fps animations - ADJUST these to match your actual WebP frame counts
        const durations = {
            patBegin: 500,  // ~64 frames @ 24fps
            patLoop: 500,   // ~36 frames @ 24fps  
            patEnd: 500,    // ~64 frames @ 24fps
            hit: 500        // ~48 frames @ 24fps
        };

        drineeElements.forEach(drinee => {
            let holdTimeout;
            let isPatting = false;
            let isHitting = false;
            let patPhase = 'none';
            let loopInterval;
            let clickStartTime = 0;

            drinee.addEventListener('mousedown', function (e) {
                if (e.button !== 0) return;
                if (isPatting || isHitting) return;

                clickStartTime = Date.now();
                drinee.dataset.interacting = 'true';

                holdTimeout = setTimeout(function () {
                    isPatting = true;
                    patPhase = 'begin';
                    console.log('🤗 BEGIN');
                    drinee.src = animations.patBegin;

                    setTimeout(() => {
                        if (isPatting) {
                            patPhase = 'loop';
                            drinee.src = animations.patLoop;
                            console.log('🤗 LOOP');

                            loopInterval = setInterval(() => {
                                if (patPhase === 'loop') {
                                    drinee.src = animations.patLoop;
                                    console.log('🔄 LOOP');
                                }
                            }, durations.patLoop);
                        }
                    }, durations.patBegin);

                }, 500);
            });

            drinee.addEventListener('mouseup', function () {
                const holdDuration = Date.now() - clickStartTime;
                clearTimeout(holdTimeout);

                if (isPatting) {
                    clearInterval(loopInterval);
                    patPhase = 'end';
                    drinee.src = animations.patEnd;
                    console.log('🤗 END');

                    setTimeout(() => {
                        drinee.src = animations.static;
                        isPatting = false;
                        patPhase = 'none';
                        drinee.dataset.interacting = 'false';
                        console.log('✅ Done');
                    }, durations.patEnd);

                } else if (holdDuration < 500) {
                    isHitting = true;
                    drinee.src = animations.hit;
                    console.log('👊 HIT');

                    setTimeout(() => {
                        if (!isPatting) {
                            drinee.src = animations.static;
                            isHitting = false;
                            drinee.dataset.interacting = 'false';
                            console.log('✅ Done');
                        }
                    }, durations.hit);
                } else {
                    drinee.dataset.interacting = 'false';
                }
            });

            drinee.addEventListener('mouseleave', function () {
                clearTimeout(holdTimeout);

                if (isPatting) {
                    clearInterval(loopInterval);
                    patPhase = 'end';
                    drinee.src = animations.patEnd;
                    console.log('🤗 END (leave)');

                    setTimeout(() => {
                        drinee.src = animations.static;
                        isPatting = false;
                        patPhase = 'none';
                        drinee.dataset.interacting = 'false';
                    }, durations.patEnd);
                } else if (!isHitting) {
                    drinee.dataset.interacting = 'false';
                }
            });
        });
    }

    setupDrineeInteractions();

    // Game interface - NO "hi" animation on interactions
    function initializeDrineeAnimation() {
        const drineePortrait = document.getElementById('drinee-portrait');
        const animations = {
            static: 'assets/drinee_fixed.png',
            cuteIdle1: 'assets/drinee_fixed.png',
            cuteIdle2: 'assets/drinee_fixed.png',
            talking: 'assets/drinee_fixed.png',
            cat: 'assets/drinee_fixed.png',
            idle1: 'assets/drinee_fixed.png',
            idle2: 'assets/drinee_fixed.png',
            idle3: 'assets/drinee_fixed.png'
        };

        const playAnimation = (name, duration) => {
            if (!drineePortrait) return;
            console.log(`Playing: ${name}`);
            drineePortrait.src = '';
            drineePortrait.src = animations[name];
            setTimeout(() => {
                drineePortrait.src = animations.static;
            }, duration);
        };

        if (drineePortrait) {
            // REMOVED "hi" animation - start with static
            drineePortrait.src = animations.static;

            const scheduleNextIdle = () => {
                const minTime = 2 * 60 * 1000;
                const maxTime = 5 * 60 * 1000;
                const delay = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;

                setTimeout(() => {
                    const options = [
                        { name: 'cuteIdle1', duration: 2700 },
                        { name: 'cuteIdle2', duration: 1500 },
                        { name: 'talking', duration: 2700 },
                        { name: 'cat', duration: 4000 },
                        { name: 'idle1', duration: 2700 },
                        { name: 'idle2', duration: 1500 },
                        { name: 'idle3', duration: 2700 }
                    ];
                    const choice = options[Math.floor(Math.random() * options.length)];
                    playAnimation(choice.name, choice.duration);
                    scheduleNextIdle();
                }, delay);
            };

            scheduleNextIdle();
        }
    }

    if (runBtn) {
        runBtn.addEventListener('click', () => {
            const code = document.querySelector('.code-content').innerText;
            logToConsole("Compiling gate_control.py...");
            setTimeout(() => {
                analyzeCode(code);
            }, 600);
        });
    }

    function analyzeCode(code) {
        if (code.includes("pass")) {
            logToConsole("Error: No Operation detected.", "error");
            updateDrinee(DRINEE_CONFIG.responses.error_pass, "concerned");
        } else if (code.includes("while True") && !code.includes("break")) {
            logToConsole("Critical: Infinite Loop.", "error");
            updateDrinee(DRINEE_CONFIG.responses.error_logic_infinite, "alert");
        } else if (code.includes("for") || code.includes("while")) {
            logToConsole("Success: Logic Gate Actuated.", "success");
            updateDrinee(DRINEE_CONFIG.responses.success_loop, "happy");
        } else {
            logToConsole("Warning: Insufficient logic energy.", "warning");
            updateDrinee("I don't see a loop, friend! We need repeated force to move this gear. (Try a loop!)", "neutral");
        }
    }

    function updateDrinee(text, mood) {
        if (!drineeMessage) return;
        drineeMessage.style.opacity = 0;
        setTimeout(() => {
            drineeMessage.textContent = text;
            drineeMessage.style.opacity = 1;
        }, 200);
    }

    function logToConsole(text, type = 'info') {
        if (!consoleOutput) return;
        const line = document.createElement('div');
        line.textContent = `> ${text}`;
        if (type === 'error') line.style.color = 'var(--accent-alert)';
        if (type === 'success') line.style.color = 'var(--accent-primary)';
        if (type === 'warning') line.style.color = '#ffcc00';
        consoleOutput.insertBefore(line, consoleOutput.lastElementChild);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
});
