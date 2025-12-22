const COURSES = [
    // === THE LEGEND OF PYTHON ===
    {
        id: 'python',
        title: 'PYTHON',
        icon: 'pixel-icon-script',
        desc: 'Learn programming fundamentals: syntax, variables, control flow, and loops.',
        lessons: 30,
        completed: 13,
        image: './assets/pixel_art/card_python.png',
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
        image: './assets/pixel_art/Gemini_Generated_Image_1asl9e1asl9e1asl.png',
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
        image: './assets/pixel_art/Gemini_Generated_Image_4zyazg4zyazg4zya.png',
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
        image: './assets/pixel_art/card_html.png',
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
        image: './assets/pixel_art/card_css.png',
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
        image: './assets/pixel_art/card_js.png',
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
        image: './assets/pixel_art/card_react.png',
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
        image: './assets/pixel_art/Gemini_Generated_Image_5tod8v5tod8v5tod.png',
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
        image: './assets/pixel_art/Gemini_Generated_Image_6agx9a6agx9a6agx.png',
        gradient: 'linear-gradient(135deg, #000080, #0000cd)',
        difficulty: 'BEGINNER'
    },
    {
        id: 'cpp',
        title: 'C++',
        icon: 'pixel-icon-settings',
        desc: 'High-performance system programming',
        lessons: 50,
        completed: 0,
        image: './assets/pixel_art/Gemini_Generated_Image_7qeubv7qeubv7qeu.png',
        gradient: 'linear-gradient(135deg, #00599c, #004482)',
        difficulty: 'HARD'
    },
    {
        id: 'java',
        title: 'JAVA',
        icon: 'pixel-icon-coffee',
        desc: 'Object-oriented programming mastery',
        lessons: 45,
        completed: 0,
        image: './assets/pixel_art/Gemini_Generated_Image_9ummxh9ummxh9umm.png',
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
        image: './assets/pixel_art/Gemini_Generated_Image_alpvvjalpvvjalpv.png',
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
        image: './assets/pixel_art/Gemini_Generated_Image_blum4yblum4yblum.png',
        gradient: 'linear-gradient(135deg, #6a1577, #9e58aa)',
        difficulty: 'INTERMEDIATE'
    },
    {
        id: 'go',
        title: 'GO',
        icon: 'pixel-icon-zap',
        desc: 'Scalable cloud software',
        lessons: 30,
        completed: 0,
        image: './assets/pixel_art/Gemini_Generated_Image_btw05ibtw05ibtw0.png',
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
        image: './assets/pixel_art/Gemini_Generated_Image_difn2ydifn2ydifn.png',
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
        image: './assets/pixel_art/Gemini_Generated_Image_f80w1f80w1f80w1f.png',
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
        image: './assets/pixel_art/Gemini_Generated_Image_imgei3imgei3imge.png',
        gradient: 'linear-gradient(135deg, #000000, #4078c0)',
    },
    {
        id: 'ts',
        title: 'TYPESCRIPT',
        icon: 'pixel-icon-code',
        desc: 'JavaScript with superpowers.',
        lessons: 35,
        completed: 0,
        image: './assets/pixel_art/card_ts.png',
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
        image: './assets/pixel_art/card_swift.png',
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
        image: './assets/pixel_art/card_kotlin.png',
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
        image: './assets/pixel_art/card_php.png',
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
        image: './assets/pixel_art/card_ruby.png',
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
        image: './assets/pixel_art/card_bash.png',
        gradient: 'linear-gradient(135deg, #4e4e4e, #292929)',
        difficulty: 'BEGINNER'
    }
];
