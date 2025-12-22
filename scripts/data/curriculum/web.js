
window.CURRICULUM_WEB = {
    // === HTML ===
    'html': {
        id: 'html', title: 'HTML', description: 'The Skeleton of the Web.', icon: '💀', difficulty: 'BEGINNER',
        chapters: [
            { id: 1, title: 'Elements', icon: '🧱', lessons: [{ id: 'html-1-1', title: 'Tags', xp: 50, starterCode: "<h1>Hello</h1>", expectedOutput: "Hello" }, { id: 'html-1-2', title: 'Attributes', xp: 50, starterCode: "<img src='x'>", expectedOutput: "[Image]" }] },
            { id: 2, title: 'Structure', icon: '🏗️', lessons: [{ id: 'html-2-1', title: 'Head & Body', xp: 50 }, { id: 'html-2-2', title: 'Divs & Spans', xp: 50 }] },
            { id: 3, title: 'Text', icon: '📝', lessons: [{ id: 'html-3-1', title: 'Headings', xp: 50 }, { id: 'html-3-2', title: 'Paragraphs', xp: 50 }] },
            { id: 4, title: 'Media', icon: '🖼️', lessons: [{ id: 'html-4-1', title: 'Images', xp: 50 }, { id: 'html-4-2', title: 'Videos', xp: 50 }] },
            { id: 5, title: 'Forms', icon: '📝', lessons: [{ id: 'html-5-1', title: 'Input', xp: 50 }, { id: 'html-5-2', title: 'Buttons', xp: 50 }] }
        ]
    },
    // === CSS ===
    'css': {
        id: 'css', title: 'CSS', description: 'The Skin of the Web.', icon: '🎨', difficulty: 'BEGINNER',
        chapters: [
            { id: 1, title: 'Selectors', icon: '🎯', lessons: [{ id: 'css-1-1', title: 'Class', xp: 50, starterCode: ".box {}", expectedOutput: "Styles applied." }, { id: 'css-1-2', title: 'ID', xp: 50 }] },
            { id: 2, title: 'Box Model', icon: '📦', lessons: [{ id: 'css-2-1', title: 'Margin/Padding', xp: 50 }] },
            { id: 3, title: 'Flexbox', icon: '💪', lessons: [{ id: 'css-3-1', title: 'Flex Row', xp: 50 }] },
            { id: 4, title: 'Grid', icon: 'grid', lessons: [{ id: 'css-4-1', title: 'Grid Template', xp: 50 }] },
            { id: 5, title: 'Animations', icon: '✨', lessons: [{ id: 'css-5-1', title: 'Keyframes', xp: 50 }] }
        ]
    },
    // === JAVASCRIPT ===
    'js': {
        id: 'js', title: 'JavaScript', description: 'The Brain of the Web.', icon: '🧠', difficulty: 'BEGINNER',
        chapters: [
            { id: 1, title: 'The Console', icon: '💻', lessons: [{ id: 'js-1-1', title: 'console.log', xp: 50, starterCode: "console.log('Hi')", expectedOutput: "Hi" }] },
            { id: 2, title: 'Variables', icon: '📦', lessons: [{ id: 'js-2-1', title: 'Let & Const', xp: 50 }] },
            { id: 3, title: 'Functions', icon: '🔧', lessons: [{ id: 'js-3-1', title: 'Arrow Functions', xp: 50 }] },
            { id: 4, title: 'DOM', icon: 'tree', lessons: [{ id: 'js-4-1', title: 'getElementById', xp: 50 }] },
            { id: 5, title: 'Events', icon: '⚡', lessons: [{ id: 'js-5-1', title: 'OnClick', xp: 50 }] }
        ]
    },
    // === REACT ===
    'react': {
        id: 'react', title: 'React', description: 'Modern UI Library.', icon: '⚛️', difficulty: 'Intermediate',
        chapters: [
            { id: 1, title: 'Components', icon: '🧱', lessons: [{ id: 'react-1-1', title: 'JSX', xp: 50, starterCode: "const App = () => <h1>Hi</h1>", expectedOutput: "Hi" }] },
            { id: 2, title: 'Props', icon: '🎁', lessons: [{ id: 'react-2-1', title: 'Passing Data', xp: 50 }] },
            { id: 3, title: 'Hooks', icon: '🪝', lessons: [{ id: 'react-3-1', title: 'useState', xp: 50 }] },
            { id: 4, title: 'Effects', icon: '✨', lessons: [{ id: 'react-4-1', title: 'useEffect', xp: 50 }] }
        ]
    },
    // === SQL ===
    'sql': {
        id: 'sql', title: 'SQL', description: 'Database Mastery.', icon: '💾', difficulty: 'Intermediate',
        chapters: [
            { id: 1, title: 'Queries', icon: '🔍', lessons: [{ id: 'sql-1-1', title: 'SELECT', xp: 50, starterCode: "SELECT * FROM Users", expectedOutput: "Query executed successfully." }] },
            { id: 2, title: 'Filtering', icon: '🧹', lessons: [{ id: 'sql-2-1', title: 'WHERE', xp: 50 }] },
            { id: 3, title: 'Joining', icon: '🔗', lessons: [{ id: 'sql-3-1', title: 'INNER JOIN', xp: 50 }] }
        ]
    },
    // === TYPESCRIPT ===
    'ts': {
        id: 'ts', title: 'TypeScript', description: 'Type-Safe JS.', icon: '🛡️', difficulty: 'Intermediate',
        chapters: [
            { id: 1, title: 'The Basics', icon: '📘', lessons: [{ id: 'ts-1-1', title: 'Types', xp: 50, starterCode: "let x: number = 5", expectedOutput: "5" }] },
            { id: 2, title: 'Interfaces', icon: '📑', lessons: [{ id: 'ts-2-1', title: 'Define Shape', xp: 50 }] }
        ]
    }
};
