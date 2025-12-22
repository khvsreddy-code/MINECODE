const COURSES = [
    // === THE LEGEND OF PYTHON ===
    {
        id: 'python',
        title: 'PYTHON',
        icon: 'pixel-icon-script',
        desc: 'Learn programming fundamentals: syntax, variables, control flow, and loops.',
        lessons: 30,
        completed: 13,
        image: '/assets/pixel_art/card_python2.png',
        gradient: 'linear-gradient(135deg, #306998, #ffe873)',
        difficulty: 'BEGINNER',
        category: 'python-legend'
    },
    {
        id: 'intermediate-python',
        title: 'INTERMEDIATE PYTHON',
        icon: 'pixel-icon-script',
        desc: 'Begin learning interwoven Python with data structures.',
        lessons: 25,
        completed: 0,
        image: '/assets/pixel_art/card_intermediate_python.png',
        gradient: 'linear-gradient(135deg, #4B8BBE, #FFD43B)',
        difficulty: 'INTERMEDIATE',
        category: 'python-legend'
    },
    {
        id: 'numpy',
        title: 'NUMPY',
        icon: 'pixel-icon-chart-bar',
        desc: 'Learn the fundamentals of data manipulation using NumPy.',
        lessons: 15,
        completed: 0,
        image: '/assets/pixel_art/card_numpy.png',
        gradient: 'linear-gradient(135deg, #013243, #4d05e8)',
        difficulty: 'INTERMEDIATE',
        category: 'python-legend'
    },

    // === THE ORIGINS TRILOGY ===
    {
        id: 'html',
        title: 'HTML',
        icon: 'pixel-icon-code',
        desc: 'Create your first website with HTML, the building blocks of the web.',
        lessons: 15,
        completed: 0,
        image: '/assets/pixel_art/card_html.png',
        gradient: 'linear-gradient(135deg, #e34c26, #f06529)',
        difficulty: 'BEGINNER',
        category: 'origins'
    },
    {
        id: 'css',
        title: 'CSS',
        icon: 'pixel-icon-paint-bucket',
        desc: 'Learn to use CSS selectors and properties to style your HTML pages.',
        lessons: 20,
        completed: 0,
        image: '/assets/pixel_art/card_css.png',
        gradient: 'linear-gradient(135deg, #264de4, #2965f1)',
        difficulty: 'BEGINNER',
        category: 'origins'
    },
    {
        id: 'js',
        title: 'JAVASCRIPT',
        icon: 'pixel-icon-zap',
        desc: 'Learn variables, loops, functions, and events to start building interactive apps.',
        lessons: 35,
        completed: 0,
        image: '/assets/pixel_art/card_javascript.png',
        gradient: 'linear-gradient(135deg, #f0db4f, #d4bf28)',
        difficulty: 'BEGINNER',
        category: 'origins'
    },

    // === ALL COURSES ===
    {
        id: 'react',
        title: 'REACT',
        icon: 'pixel-icon-grid',
        desc: 'Build powerful user interfaces',
        lessons: 40,
        completed: 0,
        image: '/assets/pixel_art/card_react.png',
        gradient: 'linear-gradient(135deg, #61dbfb, #38a5c4)',
        difficulty: 'ADVANCED'
    },
    {
        id: 'sql',
        title: 'SQL',
        icon: 'pixel-icon-database',
        desc: 'Manage and query databases',
        lessons: 25,
        completed: 0,
        image: '/assets/pixel_art/card_sql.png',
        gradient: 'linear-gradient(135deg, #00758f, #005c70)',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 'lua',
        title: 'LUA',
        icon: '🌙',
        desc: 'Learn programming fundamentals with Lua in Roblox.',
        lessons: 20,
        completed: 0,
        image: '/assets/pixel_art/card_lua.png',
        gradient: 'linear-gradient(135deg, #000080, #0000cd)',
        difficulty: 'BEGINNER',
        category: 'game-dev'
    },
    {
        id: 'cpp',
        title: 'C++',
        icon: 'pixel-icon-settings',
        desc: 'High-performance system programming',
        lessons: 50,
        completed: 0,
        image: '/assets/pixel_art/card_cpp.png',
        gradient: 'linear-gradient(135deg, #00599c, #004482)',
        difficulty: 'HARD',
        category: 'game-dev'
    },
    {
        id: 'java',
        title: 'JAVA',
        icon: 'pixel-icon-coffee',
        desc: 'Object-oriented programming mastery',
        lessons: 45,
        completed: 0,
        image: '/assets/pixel_art/card_java.png',
        gradient: 'linear-gradient(135deg, #5382a1, #f89820)',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 'git',
        title: 'GIT',
        icon: 'pixel-icon-git-merge',
        desc: 'Version control for everyone',
        lessons: 10,
        completed: 0,
        image: '/assets/pixel_art/card_git.png',
        gradient: 'linear-gradient(135deg, #f1502f, #3e2c00)',
        difficulty: 'BEGINNER'
    },
    {
        id: 'csharp',
        title: 'C#',
        icon: 'pixel-icon-grid',
        desc: 'Build Windows apps and games',
        lessons: 40,
        completed: 0,
        image: '/assets/pixel_art/card_csharp.png',
        gradient: 'linear-gradient(135deg, #6a1577, #9e58aa)',
        difficulty: 'INTERMEDIATE',
        category: 'game-dev'
    },
    {
        id: 'go',
        title: 'GO',
        icon: 'pixel-icon-zap',
        desc: 'Scalable cloud software',
        lessons: 30,
        completed: 0,
        image: '/assets/pixel_art/card_go.png',
        gradient: 'linear-gradient(135deg, #00add8, #007d9c)',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 'rust',
        title: 'RUST',
        icon: 'pixel-icon-shield',
        desc: 'Safety and performance',
        lessons: 55,
        completed: 0,
        image: '/assets/pixel_art/card_rust.png',
        gradient: 'linear-gradient(135deg, #dea584, #b7410e)',
        difficulty: 'HARD'
    },
    {
        id: 'ml',
        title: 'MACHINE LEARNING',
        icon: 'pixel-icon-human',
        desc: 'Learn the foundations of ML.',
        lessons: 45,
        completed: 0,
        image: '/assets/pixel_art/card_ml.png',
        gradient: 'linear-gradient(135deg, #111111, #333333)',
        difficulty: 'ADVANCED'
    },
    {
        id: 'copilot',
        title: 'GITHUB COPILOT',
        icon: 'pixel-icon-android',
        desc: 'Learn to code with AI assistance.',
        lessons: 10,
        completed: 0,
        image: '/assets/pixel_art/card_copilot.png',
        gradient: 'linear-gradient(135deg, #000000, #4078c0)',
    },
    {
        id: 'ts',
        title: 'TYPESCRIPT',
        icon: 'pixel-icon-code',
        desc: 'JavaScript with superpowers.',
        lessons: 35,
        completed: 0,
        image: '/assets/pixel_art/card_ts.png',
        gradient: 'linear-gradient(135deg, #3178c6, #235a97)',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 'swift',
        title: 'SWIFT',
        icon: 'pixel-icon-device-mobile',
        desc: 'Build apps for iOS and Mac.',
        lessons: 40,
        completed: 0,
        image: '/assets/pixel_art/card_swift.png',
        gradient: 'linear-gradient(135deg, #f05138, #c13019)',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 'kotlin',
        title: 'KOTLIN',
        icon: 'pixel-icon-android',
        desc: 'Modern Android development.',
        lessons: 30,
        completed: 0,
        image: '/assets/pixel_art/card_kotlin (2).png',
        gradient: 'linear-gradient(135deg, #7f52ff, #c711e1)',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 'php',
        title: 'PHP',
        icon: 'pixel-icon-server',
        desc: 'Server-side web scripting.',
        lessons: 25,
        completed: 0,
        image: '/assets/pixel_art/card_php (2).png',
        gradient: 'linear-gradient(135deg, #777bb4, #4f5b93)',
        difficulty: 'BEGINNER'
    },
    {
        id: 'ruby',
        title: 'RUBY',
        icon: 'pixel-icon-gem',
        desc: 'A programmer\'s best friend.',
        lessons: 20,
        completed: 0,
        image: '/assets/pixel_art/ChatGPT Image Dec 20, 2025, 09_32_11 AM.png',
        gradient: 'linear-gradient(135deg, #cc342d, #8f231e)',
        difficulty: 'BEGINNER'
    },
    {
        id: 'bash',
        title: 'BASH',
        icon: 'pixel-icon-terminal',
        desc: 'Master the command line.',
        lessons: 15,
        completed: 0,
        image: '/assets/pixel_art/card_bash2.png',
        gradient: 'linear-gradient(135deg, #4e4e4e, #292929)',
        difficulty: 'BEGINNER'
    },
    {
        id: 'godot',
        title: 'GODOT',
        icon: 'pixel-icon-device-gamepad',
        desc: 'Create 2D and 3D games with this open source engine.',
        lessons: 35,
        completed: 0,
        image: '/assets/pixel_art/ChatGPT Image Dec 20, 2025, 09_33_16 AM.png',
        gradient: 'linear-gradient(135deg, #478cbf, #355570)',
        difficulty: 'BEGINNER',
        category: 'game-dev'
    }
];

// === DETAILED CURRICULUM DATA ===
window.CURRICULUM = {
    // PYTHON LEGEND
    'python': {
        chapters: [
            {
                id: 'ch1', title: 'The Awakening', icon: '🥚', description: 'Your journey begins. Learn the syntax of the Ancients.',
                lessons: [
                    { id: 'python-0-0', title: 'Hello, World!', type: 'lesson', xp: 50, content: 'Welcome to Python. Your first task is to speak to the console.', code: 'print("Hello, World!")' },
                    { id: 'python-0-1', title: 'Variables', type: 'lesson', xp: 50, content: 'Store data in memory fragments called variables.', code: 'name = "CyberUser"\nprint(name)' },
                    { id: 'python-0-2', title: 'Data Types', type: 'lesson', xp: 50, content: 'Strings, integers, and booleans. Know your data.', code: 'level = 1\nis_active = True' },
                    { id: 'python-0-3', title: 'The Print Function', type: 'lesson', xp: 50, content: 'Master the art of output.', code: 'print("System Online")' },
                    { id: 'python-0-4', title: 'Comments', type: 'lesson', xp: 50, content: 'Leave notes for your future self.', code: '# This is a comment' }
                ]
            },
            {
                id: 'ch2', title: 'Control Flow', icon: '⚡', description: 'Master logic and decision making.',
                lessons: [
                    { id: 'python-1-0', title: 'If Statements', type: 'lesson', xp: 100 },
                    { id: 'python-1-1', title: 'Else & Elif', type: 'lesson', xp: 100 },
                    { id: 'python-1-2', title: 'Booleans Logic', type: 'lesson', xp: 100 },
                    { id: 'python-1-3', title: 'Nested Conditionals', type: 'lesson', xp: 100 },
                    { id: 'python-1-4', title: 'Mission: Security Gate', type: 'project', xp: 200 }
                ]
            },
            {
                id: 'ch3', title: 'Loops', icon: '🔄', description: 'Automate repetitive tasks.',
                lessons: [
                    { id: 'python-2-0', title: 'For Loops', type: 'lesson', xp: 100 },
                    { id: 'python-2-1', title: 'While Loops', type: 'lesson', xp: 100 },
                    { id: 'python-2-2', title: 'Range()', type: 'lesson', xp: 100 },
                    { id: 'python-2-3', title: 'Break & Continue', type: 'lesson', xp: 100 },
                    { id: 'python-2-4', title: 'Mission: Data Sifter', type: 'project', xp: 250 }
                ]
            },
            {
                id: 'ch4', title: 'Functions', icon: '📦', description: 'Create reusable blocks of power.',
                lessons: [
                    { id: 'python-3-0', title: 'Defining Functions', type: 'lesson', xp: 150 },
                    { id: 'python-3-1', title: 'Parameters', type: 'lesson', xp: 150 },
                    { id: 'python-3-2', title: 'Return Values', type: 'lesson', xp: 150 },
                    { id: 'python-3-3', title: 'Scope', type: 'lesson', xp: 150 },
                    { id: 'python-3-4', title: 'Mission: Utility Bot', type: 'project', xp: 300 }
                ]
            }
        ]
    }
};

// ... Helper to generate generic curriculum for others ...
const generateGenericCurriculum = (id, title, chaptersCount = 4) => {
    return {
        chapters: Array.from({ length: chaptersCount }, (_, i) => ({
            id: `ch${i + 1}`,
            title: `Chapter ${i + 1}: Foundations`,
            icon: '📂',
            description: `Master the core concepts of ${title}.`,
            lessons: Array.from({ length: 5 }, (_, j) => ({
                id: `${id}-${i}-${j}`,
                title: `${title} Lesson ${i + 1}.${j + 1}`,
                type: j === 4 ? 'project' : 'lesson',
                xp: j === 4 ? 200 : 100,
                content: `Welcome to ${title} Lesson ${j + 1}.`,
                code: `// Write your ${title} code here`
            }))
        }))
    };
};

// Apply to ALL courses
COURSES.forEach(course => {
    if (!window.CURRICULUM[course.id]) {
        window.CURRICULUM[course.id] = generateGenericCurriculum(course.id, course.title);
    }
});
