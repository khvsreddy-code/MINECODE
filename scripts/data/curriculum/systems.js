
window.CURRICULUM_SYSTEMS = {
    // === C++ ===
    'cpp': {
        id: 'cpp', title: 'C++', description: 'Machine Performance.', icon: '⚙️', difficulty: 'HARD',
        chapters: [
            { id: 1, title: 'Hello World', icon: '👋', lessons: [{ id: 'cpp-1-1', title: 'std::cout', xp: 50, starterCode: "#include <iostream>\nint main() { std::cout << \"Hi\"; }", expectedOutput: "Hi" }] },
            { id: 2, title: 'Variables', icon: '📦', lessons: [{ id: 'cpp-2-1', title: 'int & double', xp: 50 }] },
            { id: 3, title: 'Pointers', icon: 'point', lessons: [{ id: 'cpp-3-1', title: 'Memory Addr', xp: 100 }] },
            { id: 4, title: 'OOP', icon: '🏗️', lessons: [{ id: 'cpp-4-1', title: 'Classes', xp: 100 }] }
        ]
    },
    // === JAVA ===
    'java': {
        id: 'java', title: 'Java', description: 'Enterprise Standard.', icon: '☕', difficulty: 'HARD',
        chapters: [
            { id: 1, title: 'Intro', icon: '👋', lessons: [{ id: 'java-1-1', title: 'Main Method', xp: 50, starterCode: "System.out.println(\"Hi\");", expectedOutput: "Hi" }] },
            { id: 2, title: 'OOP Core', icon: '📦', lessons: [{ id: 'java-2-1', title: 'Classes', xp: 50 }] },
            { id: 3, title: 'Inheritance', icon: '👨‍👦', lessons: [{ id: 'java-3-1', title: 'Extends', xp: 50 }] }
        ]
    },
    // === RUST ===
    'rust': {
        id: 'rust', title: 'Rust', description: 'Safe Systems.', icon: '🦀', difficulty: 'HARD',
        chapters: [
            { id: 1, title: 'Cargo', icon: '📦', lessons: [{ id: 'rust-1-1', title: 'Hello Cargo', xp: 50, starterCode: "println!(\"Hi\");", expectedOutput: "Hi" }] },
            { id: 2, title: 'Ownership', icon: '🔒', lessons: [{ id: 'rust-2-1', title: 'Borrowing', xp: 50 }] },
            { id: 3, title: 'Structs', icon: '🏗️', lessons: [{ id: 'rust-3-1', title: 'Defining', xp: 50 }] }
        ]
    },
    // === GO ===
    'go': {
        id: 'go', title: 'Go', description: 'Cloud Native.', icon: '🐹', difficulty: 'Intermediate',
        chapters: [
            { id: 1, title: 'Packages', icon: '📦', lessons: [{ id: 'go-1-1', title: 'Hello Go', xp: 50, starterCode: "fmt.Println(\"Hi\")", expectedOutput: "Hi" }] },
            { id: 2, title: 'Goroutines', icon: '🏃', lessons: [{ id: 'go-2-1', title: 'Concurrency', xp: 50 }] }
        ]
    },
    // === C# ===
    'csharp': {
        id: 'csharp', title: 'C#', description: 'Microsoft Power.', icon: '#️⃣', difficulty: 'Intermediate',
        chapters: [
            { id: 1, title: 'Basics', icon: '📝', lessons: [{ id: 'cs-1-1', title: 'Console', xp: 50, starterCode: "Console.WriteLine(\"Hi\");", expectedOutput: "Hi" }] },
            { id: 2, title: 'Unity Prep', icon: '🎮', lessons: [{ id: 'cs-2-1', title: 'Scripts', xp: 50 }] }
        ]
    },
    // === LUA ===
    'lua': {
        id: 'lua', title: 'Lua', description: 'Game Scripting.', icon: '🌙', difficulty: 'Beginner',
        chapters: [
            { id: 1, title: 'Basics', icon: '📝', lessons: [{ id: 'lua-1-1', title: 'Print', xp: 50, starterCode: "print(\"Hi\")", expectedOutput: "Hi" }] },
            { id: 2, title: 'Tables', icon: '📊', lessons: [{ id: 'lua-2-1', title: 'Arrays', xp: 50 }] }
        ]
    }
};
