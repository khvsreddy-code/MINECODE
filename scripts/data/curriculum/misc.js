
window.CURRICULUM_MISC = {
    // === SWIFT ===
    'swift': {
        id: 'swift', title: 'Swift', difficulty: 'Intermediate',
        chapters: [{ id: 1, title: 'Intro', icon: '🐦', lessons: [{ id: 'swift-1-1', title: 'Hello', xp: 50, starterCode: "print(\"Hi\")", expectedOutput: "Hi" }] }]
    },
    // === KOTLIN ===
    'kotlin': {
        id: 'kotlin', title: 'Kotlin', difficulty: 'Intermediate',
        chapters: [{ id: 1, title: 'Intro', icon: '🤖', lessons: [{ id: 'kotlin-1-1', title: 'Hello', xp: 50, starterCode: "println(\"Hi\")", expectedOutput: "Hi" }] }]
    },
    // === PHP ===
    'php': {
        id: 'php', title: 'PHP', difficulty: 'Beginner',
        chapters: [{ id: 1, title: 'Intro', icon: '🐘', lessons: [{ id: 'php-1-1', title: 'Echo', xp: 50, starterCode: "echo \"Hi\";", expectedOutput: "Hi" }] }]
    },
    // === RUBY ===
    'ruby': {
        id: 'ruby', title: 'Ruby', difficulty: 'Beginner',
        chapters: [{ id: 1, title: 'Intro', icon: '💎', lessons: [{ id: 'ruby-1-1', title: 'Puts', xp: 50, starterCode: "puts \"Hi\"", expectedOutput: "Hi" }] }]
    },
    // === BASH ===
    'bash': {
        id: 'bash', title: 'Bash', difficulty: 'Beginner',
        chapters: [
            { id: 1, title: 'File System', icon: '📁', lessons: [{ id: 'bash-1-1', title: 'LS', xp: 50, starterCode: "ls -la", expectedOutput: "total 0" }] },
            { id: 2, title: 'Permissions', icon: '🔒', lessons: [{ id: 'bash-2-1', title: 'Chmod', xp: 50 }] }
        ]
    },
    // === GIT ===
    'git': {
        id: 'git', title: 'Git', difficulty: 'Beginner',
        chapters: [
            { id: 1, title: 'Setup', icon: '⚙️', lessons: [{ id: 'git-1-1', title: 'Init', xp: 50 }] },
            { id: 2, title: 'Workflow', icon: 'flow', lessons: [{ id: 'git-2-1', title: 'Commit', xp: 50 }] }
        ]
    },
    // === ML ===
    'ml': {
        id: 'ml', title: 'Machine Learning', difficulty: 'Advanced',
        chapters: [
            { id: 1, title: 'Theory', icon: '🧠', lessons: [{ id: 'ml-1-1', title: 'Neural Nets', xp: 50 }] },
            { id: 2, title: 'Models', icon: '🤖', lessons: [{ id: 'ml-2-1', title: 'Training', xp: 50 }] }
        ]
    },
    // === COPILOT ===
    'copilot': {
        id: 'copilot', title: 'Copilot', difficulty: 'Beginner',
        chapters: [
            { id: 1, title: 'Prompting', icon: '💬', lessons: [{ id: 'ai-1-1', title: 'Slash Commands', xp: 50 }] }
        ]
    }
};
