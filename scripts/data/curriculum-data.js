window.CurriculumData = {
    getArchetype: function (lang) {
        const l = lang.toLowerCase();
        if (['rust', 'cpp', 'c', 'go'].includes(l)) return 'SYSTEMS';
        if (['java', 'csharp', 'swift', 'kotlin'].includes(l)) return 'ENTERPRISE';
        if (['javascript', 'typescript', 'php'].includes(l)) return 'WEB';
        if (['lua', 'godot', 'gdscript'].includes(l)) return 'GAME';
        if (['sql', 'python', 'r'].includes(l)) return 'DATA';
        return 'Data'; // Default fallback
    },

    generateCurriculum: function (lang, syntax) {
        const archetype = this.getArchetype(lang);
        let CURRICULUM = [];

        // === 1. SYSTEMS TRACK (C++, Rust, Go) ===
        if (archetype === 'SYSTEMS') {
            CURRICULUM = [
                {
                    title: "THE SIGNAL (I/O)",
                    desc: "Mastering the raw input/output stream.",
                    lessons: [
                        { title: "System Handshake", concept: "print", story: "Initialize communication with the kernel.", task: `Print "System Online".`, validator: (o) => o.includes("System Online"), template: syntax.main.replace('$CODE', '// Print code') },
                        { title: "Data Types", concept: "types", story: "In Systems programming, exact types matter. Integer vs Float.", task: `Print 5 (int) and 5.5 (float) on separate lines.`, validator: (o) => o.includes("5") && o.includes("5.5"), template: syntax.main.replace('$CODE', '') }
                    ]
                },
                {
                    title: "MEMORY & POINTERS",
                    desc: "Direct memory access and address manipulation.",
                    lessons: [
                        { title: "Stack Allocation", concept: "vars", story: "Allocating variables on the stack.", task: `Create an integer 'id' = 101. Print it.`, validator: (o) => o.includes("101"), template: syntax.main.replace('$CODE', '') },
                        { title: "The Address", concept: "pointers", story: "Variables live at a memory address. In C++/Rust, we often need to reference this address.", task: `(Concept) Create x = 10. Change it to 20. Print it.`, validator: (o) => o.includes("20"), template: syntax.main.replace('$CODE', '') }
                    ]
                },
                {
                    title: "LOGIC GATES",
                    desc: "Branching execution paths.",
                    lessons: [
                        { title: "If/Else", concept: "if", task: `If 10 > 5 print "High", else print "Low".`, validator: (o) => o.includes("High"), template: syntax.main.replace('$CODE', '') }
                    ]
                },
                {
                    title: "ITERATION & LOOPS",
                    desc: "High-performance repetition cycles.",
                    lessons: [
                        { title: "For Loop", concept: "loop", task: `Loop 5 times. Print current index.`, validator: (o) => o.includes("4"), template: syntax.main.replace('$CODE', '') }
                    ]
                },
                {
                    title: "CONCURRENCY",
                    desc: "Multi-threaded execution.",
                    lessons: [
                        { title: "Parallel Logic", concept: "threads", story: "Running two tasks at once.", task: `(Simulated) Print "Thread 1" and "Thread 2".`, validator: (o) => o.includes("Thread 1"), template: syntax.main.replace('$CODE', '') }
                    ]
                },
                {
                    title: "SYSTEM ARCHITECTURE",
                    desc: "Structs and memory layout.",
                    lessons: [
                        { title: "Struct Definition", concept: "struct", story: "Grouping data tightly.", task: `Define a struct/class 'Point' with x,y.`, validator: (o) => o, template: syntax.main.replace('$CODE', '') }
                    ]
                }
            ];
        }
        // === 2. WEB TRACK (JS, TS, PHP) === 
        else if (archetype === 'WEB') {
            CURRICULUM = [
                {
                    title: "THE DOMAIN (Basics)",
                    desc: "Scripting the web environment.",
                    lessons: [
                        { title: "Console Log", concept: "print", story: "Logging to the browser console.", task: `Log "Hello Web".`, validator: (o) => o.includes("Hello Web"), template: syntax.main.replace('$CODE', '') }
                    ]
                },
                {
                    title: "VARIABLES & SCOPE",
                    desc: "Managing state in the browser.",
                    lessons: [
                        { title: "Let vs Const", concept: "vars", story: "Mutable vs Immutable state.", task: `Define a const 'version' = 1.0. Print it.`, validator: (o) => o.includes("1"), template: syntax.main.replace('$CODE', '') }
                    ]
                },
                {
                    title: "THE EVENT LOOP (Async)",
                    desc: "Understanding non-blocking I/O.",
                    lessons: [
                        { title: "Simulated Delay", concept: "async", story: "Web tasks take time. We don't block main thread.", task: `Print "Start". Then print "End".`, validator: (o) => o.includes("Start") && o.includes("End"), template: syntax.main.replace('$CODE', '') }
                    ]
                },
                {
                    title: "DOM MANIPULATION",
                    desc: "Controlling the view layer.",
                    lessons: [
                        { title: "Element Select", concept: "dom", story: "(Concept) Imagine selecting a div.", task: `Print "Selected #app"`, validator: (o) => o.includes("Selected"), template: syntax.main.replace('$CODE', '') }
                    ]
                },
                {
                    title: "FUNCTIONS & CALLBACKS",
                    desc: "Passing logic as data.",
                    lessons: [
                        { title: "Arrow Functions", concept: "arrow", story: "Modern concise syntax.", task: `Create function that prints "Clicked". Call it.`, validator: (o) => o.includes("Clicked"), template: syntax.main.replace('$CODE', '') }
                    ]
                },
                {
                    title: "API & FETCH",
                    desc: "Talking to external servers.",
                    lessons: [
                        { title: "JSON Data", concept: "json", task: `Create object {id: 1}. Print it.`, validator: (o) => o, template: syntax.main.replace('$CODE', '') }
                    ]
                }
            ];
        }
        // === 3. GAME TRACK (Lua, Godot) ===
        else if (archetype === 'GAME') {
            CURRICULUM = [
                {
                    title: "INIT WORLD",
                    desc: "Setting up the game environment.",
                    lessons: [{ title: "Hello World", task: `Print "Game Start".`, validator: (o) => o.includes("Game Start"), template: syntax.main.replace('$CODE', '') }]
                },
                {
                    title: "GAME OBJECTS",
                    desc: "Manipulating entities.",
                    lessons: [{ title: "Spawn Entity", story: "Creating a variable is like spawning an object.", task: `Create 'enemy' = "Orc". Print enemy.`, validator: (o) => o.includes("Orc"), template: syntax.main.replace('$CODE', '') }]
                },
                {
                    title: "GAME LOOP",
                    desc: "The heartbeat of the engine.",
                    lessons: [{ title: "While Loop", story: "Games run in an infinite loop.", task: `Loop 3 times printing "Frame".`, validator: (o) => o.includes("Frame"), template: syntax.main.replace('$CODE', '') }]
                },
                {
                    title: "EVENTS & SIGNALS",
                    desc: "Reacting to player input.",
                    lessons: [{ title: "On Touch", story: "Logic triggered by actions.", task: `If input == "jump" print "Jump!". (Set input="jump")`, validator: (o) => o.includes("Jump"), template: syntax.main.replace('$CODE', 'var input = "jump"') }]
                },
                {
                    title: "VECTORS & PHYSICS",
                    desc: "Moving in 3D space.",
                    lessons: [{ title: "Position Update", story: "x = x + speed.", task: `Set x=0. Add 5 to x. Print x.`, validator: (o) => o.includes("5"), template: syntax.main.replace('$CODE', '') }]
                }
            ];
        }
        // === 4. ENTERPRISE TRACK (Java, C#) ===
        else if (archetype === 'ENTERPRISE') {
            CURRICULUM = [
                { title: "HELLO ENTERPRISE", desc: "Boilerplate and structure.", lessons: [{ title: "Main Method", task: `Print "System Ready".`, validator: (o) => o.includes("System Ready"), template: syntax.main.replace('$CODE', '') }] },
                { title: "TYPES & VARIABLES", desc: "Strong typing systems.", lessons: [{ title: "String & Int", task: `Define string name="Ops" and int id=1. Print both.`, validator: (o) => o.includes("Ops"), template: syntax.main.replace('$CODE', '') }] },
                { title: "OBJECT ORIENTED", desc: "Classes and Objects.", lessons: [{ title: "Class Def", task: `(Concept) Define a class User.`, validator: (o) => o, template: syntax.main.replace('$CODE', '') }] },
                { title: "INHERITANCE", desc: "Extending functionality.", lessons: [{ title: "Extends", task: `(Concept) Print "Subclass created".`, validator: (o) => o, template: syntax.main.replace('$CODE', '') }] },
                { title: "INTERFACES", desc: "Contracts and implementation.", lessons: [{ title: "Implements", task: `Print "Interface implemented".`, validator: (o) => o, template: syntax.main.replace('$CODE', '') }] },
                { title: "DATA STRUCTURES", desc: "Lists and Maps.", lessons: [{ title: "ArrayList", task: `Create list. Add "Item". Print list.`, validator: (o) => o.includes("Item"), template: syntax.main.replace('$CODE', '') }] }
            ];
        }
        // === 5. DATA / SCRIPTING (Python, SQL) ===
        else {
            CURRICULUM = [
                {
                    title: "THE SOURCE (Basics)",
                    desc: "Scripting fundamentals.",
                    lessons: [
                        { title: "Hello Data", concept: "print", story: "**Objective:** Output data stream.", task: `Print "Data Stream Active".`, validator: (o) => o.includes("Data Stream Active"), template: syntax.main.replace('$CODE', '') },
                        { title: "Variables", concept: "vars", task: `Set x = 10. Print x.`, validator: (o) => o.includes("10"), template: syntax.main.replace('$CODE', '') }
                    ]
                },
                {
                    title: "DATA STRUCTURES",
                    desc: "Organizing information.",
                    lessons: [
                        { title: "Lists/Arrays", concept: "list", story: "Storing sequences.", task: `Create list [1, 2, 3]. Print it.`, validator: (o) => o.includes("1") || o.includes("[1, 2, 3]"), template: syntax.main.replace('$CODE', '') },
                        { title: "Search List", concept: "access", task: `Print the first item of list [10, 20].`, validator: (o) => o.includes("10"), template: syntax.main.replace('$CODE', '') }
                    ]
                },
                {
                    title: "LOGIC FLOW",
                    desc: "Filtering data.",
                    lessons: [
                        { title: "Filter If", concept: "if", task: `Set validation = true. If true, print "Valid".`, validator: (o) => o.includes("Valid"), template: syntax.main.replace('$CODE', '') }
                    ]
                },
                {
                    title: "ITERATION",
                    desc: "Processing datasets.",
                    lessons: [
                        { title: "For Loop", concept: "loop", task: `Loop 3 times. Print "Row".`, validator: (o) => o.includes("Row"), template: syntax.main.replace('$CODE', '') },
                        { title: "Active Recall: Sum", concept: "loop_sum", task: `Sum numbers 1 to 5 using a loop. Print total (15).`, validator: (o) => o.includes("15"), template: syntax.main.replace('$CODE', '') }
                    ]
                },
                {
                    title: "FUNCTIONS",
                    desc: "Reusable transforms.",
                    lessons: [
                        { title: "Def Function", concept: "func", task: `Define 'add(a,b)' that prints sum. Call with 5,5.`, validator: (o) => o.includes("10"), template: syntax.main.replace('$CODE', '') }
                    ]
                },
                {
                    title: "ALGORITHMS",
                    desc: "Complex data processing.",
                    lessons: [
                        { title: "Sorting Logic", concept: "logic", task: `(Concept) Print "Sorted".`, validator: (o) => o, template: syntax.main.replace('$CODE', '') }
                    ]
                }
            ];
        }

        // === HYBRID INJECTIONS (VERSATILITY UPGRADE) ===

        // 1. C++ (Systems + Game)
        if (lang === 'cpp' || lang === 'c++') {
            CURRICULUM.push(
                {
                    title: "GAME MATH (Vectors)",
                    desc: "The mathematics of 3D space.",
                    lessons: [
                        {
                            title: "Vector Struct",
                            concept: "struct",
                            story: "**MISSION:** In the simulation, every entity exists at a coordinate. We need a data structure to represent this.\n\nDefine a `struct Vector3` with three float components: `x`, `y`, and `z`. Then, instantiate one at (0, 0, 0) and print 'Entity Spawned'.",
                            task: "Define struct Vector3 { float x, y, z; }; in main, create one and print.",
                            validator: (o) => o.includes("Entity Spawned") && (o.includes("struct") || o.includes("class")),
                            template: syntax.main.replace('$CODE', '// Define struct here...\n\n    // inside main:\n    // Vector3 v = {0,0,0};\n')
                        },
                        {
                            title: "Dot Product Logic",
                            concept: "math",
                            story: "**MISSION:** To detect if an enemy is looking at us, we use the Dot Product.\n\nCalculate the dot product of two mock vectors (just multiply x*x + y*y). Print the result.",
                            task: "Calculate 5*5 + 2*2 manually and print the result (29).",
                            validator: (o) => o.includes("29"),
                            template: syntax.main.replace('$CODE', 'int v1 = 5; int v2 = 2;\n    // Calculate dot...')
                        }
                    ]
                },
                {
                    title: "ENGINE ARCHITECTURE",
                    desc: "Managing the Simulation Loop.",
                    lessons: [
                        {
                            title: "The Update Loop",
                            concept: "loop",
                            story: "**MISSION:** A game engine is just an infinite loop that updates the world state.\n\nSimulate 3 'frames' of a game loop. In each frame, print 'Updating Physics...'.",
                            task: "Write a for-loop that runs 3 times.",
                            validator: (o) => (o.match(/Updating Physics/g) || []).length === 3,
                            template: syntax.main.replace('$CODE', '// for (int i = 0; i < 3; i++) ...')
                        }
                    ]
                }
            );
        }

        // 2. C# (Enterprise + Game)
        if (lang === 'csharp' || lang === 'c#') {
            CURRICULUM.push(
                {
                    title: "GAME COMPONENTS",
                    desc: "Entity-Component Systems (Unity Style).",
                    lessons: [
                        { title: "MonoBehaviour", concept: "oop", story: "Scripting behaviors.", task: `Print "Start Game".`, validator: (o) => o.includes("Start"), template: syntax.main.replace('$CODE', '') },
                        { title: "Transform", concept: "struct", story: "Moving objects.", task: `Print "Position Updated".`, validator: (o) => o, template: syntax.main.replace('$CODE', '') }
                    ]
                }
            );
        }

        // 3. PYTHON (Scripting + AI/Data)
        if (lang === 'python') {
            CURRICULUM.push(
                {
                    title: "DATA SCIENCE",
                    desc: "Crunching massive datasets.",
                    lessons: [
                        {
                            title: "Matrix Operations",
                            concept: "array",
                            story: "**MISSION:** Deep Learning relies on matrices. We often load data into 2D arrays.\n\nCreate a 2D list representing a 2x2 identity matrix: `[[1,0], [0,1]]`. Print it.",
                            task: "Define the matrix and print it.",
                            validator: (o) => o.includes("[[1, 0], [0, 1]]") || o.includes("[1, 0]"),
                            template: syntax.main.replace('$CODE', 'matrix = [[1,0], [0,1]]\nprint(matrix)')
                        }
                    ]
                },
                {
                    title: "ARTIFICIAL INTELLIGENCE",
                    desc: "Machine Learning Concepts.",
                    lessons: [
                        {
                            title: "The Activation Function",
                            concept: "func",
                            story: "**MISSION:** Neural networks need non-linearity. The ReLU function is simple: if input > 0 return input, else return 0.\n\nImplement `relu(x)` and test it with -5 (returns 0) and 10 (returns 10).",
                            task: "Define def relu(x): ... and print relu(-5) and relu(10).",
                            validator: (o) => o.includes("0") && o.includes("10"),
                            template: syntax.main.replace('$CODE', 'def relu(x):\n    # logic here\n    pass\n\nprint(relu(-5))\nprint(relu(10))')
                        },
                        {
                            title: "Gradient Descent (Mock)",
                            concept: "loop",
                            story: "**MISSION:** Neural networks learn by minimizing 'loss'. We simulate this by lowering a value over time.\n\nStart with `loss = 1.0`. Create a loop that subtracts 0.1 from loss 10 times. Print 'Loss Optimized'.",
                            task: "Loop 10 times, loss -= 0.1. Print final message.",
                            validator: (o) => o.includes("Optimized"),
                            template: syntax.main.replace('$CODE', 'loss = 1.0\n# loop here')
                        }
                    ]
                }
            );
        }

        // 4. JS/TS (Web + Backend)
        if (lang.includes('script') || lang === 'js' || lang === 'ts') {
            CURRICULUM.push(
                {
                    title: "SERVER SIDE (Node.js)",
                    desc: "Running JS on the metal.",
                    lessons: [
                        { title: "HTTP Server", concept: "server", story: "Handling requests.", task: `Print "Server Listening 8080".`, validator: (o) => o.includes("Listening"), template: syntax.main.replace('$CODE', '') }
                    ]
                }
            );
        }

        // 5. JAVA/KOTLIN (Enterprise + Mobile)
        if (['java', 'kotlin'].includes(lang)) {
            CURRICULUM.push(
                {
                    title: "MOBILE ARCHITECTURE (Android)",
                    desc: "Building for the palm of the hand.",
                    lessons: [
                        { title: "Activity Lifecycle", concept: "oop", story: "Apps have a lifecycle.", task: `Print "OnCreate" and "OnStart".`, validator: (o) => o.includes("OnCreate"), template: syntax.main.replace('$CODE', '') },
                        { title: "View Binding", concept: "ui", story: "Connecting code to UI.", task: `Print "View Bound".`, validator: (o) => o.includes("Bound"), template: syntax.main.replace('$CODE', '') }
                    ]
                }
            );
        }

        // 6. SWIFT (Enterprise + iOS)
        if (lang === 'swift') {
            CURRICULUM.push(
                {
                    title: "IOS DEVELOPMENT",
                    desc: "The Apple Ecosystem.",
                    lessons: [
                        { title: "SwiftUI View", concept: "ui", story: "Declarative UI.", task: `Print "Body View".`, validator: (o) => o.includes("View"), template: syntax.main.replace('$CODE', '') },
                        { title: "Combine Framework", concept: "async", story: "Reactive streams.", task: `Print "Stream Active".`, validator: (o) => o.includes("Stream"), template: syntax.main.replace('$CODE', '') }
                    ]
                }
            );
        }

        // 7. GO (Systems + Cloud)
        if (lang === 'go') {
            CURRICULUM.push(
                {
                    title: "CLOUD ENGINEERING",
                    desc: "Scalable Microservices.",
                    lessons: [
                        { title: "Goroutines", concept: "threads", story: "Lightweight threads.", task: `Print "Routine Started".`, validator: (o) => o.includes("Routine"), template: syntax.main.replace('$CODE', '') },
                        { title: "Channels", concept: "pipe", story: "Talking between threads.", task: `Print "Message Received".`, validator: (o) => o.includes("Received"), template: syntax.main.replace('$CODE', '') }
                    ]
                }
            );
        }

        // 8. RUST (Systems + Embedded)
        if (lang === 'rust') {
            CURRICULUM.push(
                {
                    title: "EMBEDDED SYSTEMS",
                    desc: "Coding on the bare metal.",
                    lessons: [
                        { title: "No Std Lib", concept: "metal", story: "Disabling standard features.", task: `Print "Core Only".`, validator: (o) => o.includes("Core"), template: syntax.main.replace('$CODE', '') },
                        { title: "Unsafe Rust", concept: "unsafe", story: "Breaking the rules.", task: `Print "Unsafe Block".`, validator: (o) => o.includes("Unsafe"), template: syntax.main.replace('$CODE', '') }
                    ]
                }
            );
        }

        // 9. RUBY/PHP (Scripting + Web Frameworks)
        if (['ruby', 'php'].includes(lang)) {
            CURRICULUM.push(
                {
                    title: "WEB FRAMEWORKS",
                    desc: "MVC Architecture (Rails/Laravel).",
                    lessons: [
                        { title: "Routing", concept: "web", story: "Mapping URLs to code.", task: `Print "Route: /home".`, validator: (o) => o.includes("Route"), template: syntax.main.replace('$CODE', '') },
                        { title: "ORM Models", concept: "db", story: "Database as Objects.", task: `Print "User.find(1)".`, validator: (o) => o.includes("User"), template: syntax.main.replace('$CODE', '') }
                    ]
                }
            );
        }

        // 10. BASH (Scripting + DevOps)
        if (lang === 'bash') {
            CURRICULUM.push(
                {
                    title: "DEVOPS AUTOMATION",
                    desc: "CI/CD and Pipelines.",
                    lessons: [
                        { title: "Pipeline Script", concept: "ci", story: "Automating builds.", task: `Print "Build Success".`, validator: (o) => o.includes("Success"), template: syntax.main.replace('$CODE', '') },
                        { title: "Server Health", concept: "admin", story: "Monitoring uptime.", task: `Print "Uptime OK".`, validator: (o) => o.includes("OK"), template: syntax.main.replace('$CODE', '') }
                    ]
                }
            );
        }

        // 11. HTML/CSS (Design Mastery)
        if (['html', 'css'].includes(lang)) {
            CURRICULUM.push(
                {
                    title: "DESIGN MASTERY",
                    desc: "Responsive & Interactive.",
                    lessons: [
                        { title: "Flexbox/Grid", concept: "ui", story: "Layout engines.", task: `Print "Grid Active".`, validator: (o) => o.includes("Grid"), template: syntax.main.replace('$CODE', '') },
                        { title: "Animations", concept: "css", story: "Keyframes and transitions.", task: `Print "Animate".`, validator: (o) => o.includes("Animate"), template: syntax.main.replace('$CODE', '') }
                    ]
                }
            );
        }

        // 12. REACT (State Mastery)
        if (lang === 'react') {
            CURRICULUM.push(
                {
                    title: "STATE ARCHITECTURE",
                    desc: "Managing complex flows.",
                    lessons: [
                        { title: "Context API", concept: "state", story: "Global state.", task: `Print "Provider Active".`, validator: (o) => o.includes("Provider"), template: syntax.main.replace('$CODE', '') },
                        { title: "Custom Hooks", concept: "hook", story: "Reusable logic.", task: `Print "Hook Use".`, validator: (o) => o.includes("Hook"), template: syntax.main.replace('$CODE', '') }
                    ]
                }
            );
        }

        // 13. SQL (DB Admin Mastery)
        if (lang === 'sql') {
            CURRICULUM.push(
                {
                    title: "DBA MASTERY",
                    desc: "Performance and Security.",
                    lessons: [
                        { title: "Indexing", concept: "perf", story: "Speeding up queries.", task: `Print "Index Created".`, validator: (o) => o.includes("Index"), template: syntax.main.replace('$CODE', '') },
                        { title: "Stored Procs", concept: "logic", story: "Database logic.", task: `Print "Procedure Run".`, validator: (o) => o.includes("Procedure"), template: syntax.main.replace('$CODE', '') }
                    ]
                }
            );
        }

        // 14. GIT (Workflow Mastery)
        if (lang === 'git') {
            CURRICULUM.push(
                {
                    title: "TEAM WORKFLOWS",
                    desc: "Collaborating at scale.",
                    lessons: [
                        { title: "Interactive Rebase", concept: "git", story: "Rewriting history.", task: `Print "History Cleaned".`, validator: (o) => o.includes("History"), template: syntax.main.replace('$CODE', '') },
                        { title: "Cherry Pick", concept: "git", story: "Surgical commits.", task: `Print "Commit Picked".`, validator: (o) => o.includes("Picked"), template: syntax.main.replace('$CODE', '') }
                    ]
                }
            );
        }

        // 15. DATA TOOLS (NumPy, ML)
        if (['numpy', 'ml'].includes(lang)) {
            CURRICULUM.push(
                {
                    title: "DATA PIPELINES",
                    desc: "Automating intelligence.",
                    lessons: [
                        { title: "ETL Process", concept: "data", story: "Extract, Transform, Load.", task: `Print "Data Processed".`, validator: (o) => o.includes("Processed"), template: syntax.main.replace('$CODE', '') },
                        { title: "Model Deploy", concept: "cloud", story: "Serving predictions.", task: `Print "Model Served".`, validator: (o) => o.includes("Served"), template: syntax.main.replace('$CODE', '') }
                    ]
                }
            );
        }

        // === CAPSTONE PROTOCOL (ANTI-TUTORIAL HELL) ===
        CURRICULUM.push(
            {
                title: "CAPSTONE: THE ARCHITECT",
                desc: "No guides. No starter code. Pure creation.",
                lessons: [
                    {
                        title: "System Design Protocol",
                        story: "# ⚠️ FINAL EXAMINATION\n\nYou have traversed the signal paths, mastered the logic gates, and architected complex structures. Now, you must prove your autonomy.\n\n**OBJECTIVE:** Design a cohesive system using at least 3 major concepts (e.g., Loops, Functions, Conditional Logic, or OOP).\n\n**SCENARIO:** You are building the core of a new Operating System. You need to verify its boot sequence.\n\n1. Initialize a `boot_sequence` function.\n2. Inside, use a loop to check 3 'systems'.\n3. If a system matches a specific condition, return success.\n4. Print 'System Functional' ONLY if all checks pass.",
                        task: "Write a complete program from scratch. It must run without errors and output 'System Functional'.",
                        hint: "There is no help here. You are the Architect now.",
                        validator: (o, c) => o.includes("System Functional") && c.includes("boot_sequence") && (c.includes("for") || c.includes("while")) && c.includes("if"),
                        template: "// ⚠️ CAPSTONE PROTOCOL INITIATED\n// NO STARTER CODE PROVIDED.\n// PROVE YOUR MASTERY.\n\n"
                    }
                ]
            }
        );
        return CURRICULUM;
    }
};
