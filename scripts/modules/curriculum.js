// Curriculum Database (Omni-Curriculum)
window.App = window.App || {};

const Curriculum = {
    // Top Level: Language Tracks
    tracks: [
        { id: 'python', title: 'The Legend of Python', description: 'Master the ancient language of the backend servers.', icon: '🐍', progress: 0, usage: 'AI, Data Science & Backend', level: 'Beginner' },
        { id: 'web', title: 'The Web Weavers', description: 'Construct the visual cortex using HTML & CSS.', icon: '🌐', progress: 0, usage: 'Frontend Web Development', level: 'Beginner' },
        { id: 'js', title: 'JavaScript Spark', description: 'Ignite interactivity in the browser.', icon: '⚡', progress: 0, usage: 'Interactive Web & Logic', level: 'Intermediate' },
        { id: 'java', title: 'The Fortress of Java', description: 'Object-Oriented Architecture for enterprise systems.', icon: '☕', progress: 0, usage: 'Enterprise & Android Apps', level: 'Intermediate' },
        { id: 'cpp', title: 'C++ Systems Core', description: 'Low-level memory management and high performance.', icon: '⚙️', progress: 0, usage: 'Game Engines & Systems', level: 'Advanced' },
        { id: 'sql', title: 'The SQL Vaults', description: 'Query the infinite databases of the old world.', icon: '🗄️', progress: 0, usage: 'Database Management', level: 'Beginner' },
        { id: 'react', title: 'React Reactor', description: 'Component-based UI construction.', icon: '⚛️', progress: 0, usage: 'Modern Web UI', level: 'Intermediate' },
        { id: 'rust', title: 'Rust Iron', description: 'Memory safety without garbage collection.', icon: '🦀', progress: 0, usage: 'Systems Programming', level: 'Advanced' },
        { id: 'go', title: 'Go Cloud', description: 'Concurrent systems for the modern age.', icon: '🐹', progress: 0, usage: 'Cloud & Microservices', level: 'Intermediate' },
        { id: 'git', title: 'Git Chronos', description: 'Version control and timeline manipulation.', icon: '📚', progress: 0, usage: 'Collaboration Tools', level: 'Essential' },
        { id: 'c', title: 'C Foundation', description: 'The bedrock of all modern systems.', icon: '🏗️', progress: 0, usage: 'Operating Systems', level: 'Hardcore' },
        { id: 'csharp', title: 'C# Architect', description: 'Build the metaverse with .NET.', icon: '#️⃣', progress: 0, usage: 'Game Dev (Unity) & Windows', level: 'Intermediate' },
        { id: 'godot', title: 'Godot Engine', description: 'Forge interactive worlds and simulations.', icon: '🤖', progress: 0, usage: 'Game Development', level: 'Beginner' }
    ],

    // Helper to calculate progress
    calculateProgress: function (completedProjectIds) {
        if (!completedProjectIds) return;
        this.tracks.forEach(track => {
            const trackCourses = this.courses[track.id];
            if (!trackCourses) return;

            let totalProjects = 0;
            let completedInTrack = 0;

            trackCourses.forEach(course => {
                if (course.projects) {
                    totalProjects += course.projects.length;
                    course.projects.forEach(p => {
                        if (completedProjectIds.includes(p.id)) completedInTrack++;
                    });
                }
            });

            track.progress = totalProjects === 0 ? 0 : Math.round((completedInTrack / totalProjects) * 100);
        });
    },

    // Active Track Content
    courses: {
        python: [
            {
                id: 0, title: "Mission 1: Neural Uplink",
                projects: [
                    {
                        id: "p1_1",
                        title: "Breaching the Firewall",
                        visualAction: "sequenceBoot",
                        // Gamified Theory using CodeDex Split Layout
                        theory: `
                            <div class="mission-brief">
                                <h3>⚡ ACCESS BLOCKED</h3>
                                <p><strong>Commander:</strong> "Initiate, the mainframe is rejecting our connection. We need you to manually override the security handshake."</p>
                                <p>The <code>print()</code> function is your standard broadcast tool. Use it to send the override signal.</p>
                                <div class="dialogue-box">
                                    <strong>SYSTEM AI:</strong> "Unidentified user. Please state your designation to proceed."
                                </div>
                            </div>
                        `,
                        tasks: [{ description: "Broadcast 'ACCESS_GRANTED'", validate: (c, r) => r.output.includes("ACCESS_GRANTED") }],
                        hint: "Type: print('ACCESS_GRANTED')",
                        initialCode: "# Hack the firewall below:\n# Send the signal 'ACCESS_GRANTED'\n"
                    },
                    {
                        id: "p1_2",
                        title: "Energy Calibration",
                        visualAction: "sequencePower",
                        theory: "<h3>Variables are Containers</h3><p>Think of a variable like a storage crate. You label it (name) and put something inside (value).</p><pre>shield_integrity = 100</pre>",
                        tasks: [{ description: "Set energy to 100", validate: (c, r) => r.variables['energy'] == 100 }],
                        hint: "energy = 100",
                        initialCode: "energy = 0\n"
                    }
                ]
            },
            {
                id: 1, title: "Sequence 2: Logic Gates",
                projects: [
                    { id: "p2_1", title: "Access Control", visualAction: "sequenceAccess", theory: "<h3>The Gatekeeper (If/Else)</h3><p>Code needs to make decisions. <code>if</code> blocks are like guards checking your ID card.</p>", tasks: [{ description: "Check if role is 'Admin'", validate: (c, r) => c.includes('if') }], hint: "if role == 'Admin':", initialCode: "role = 'Guest'\n" }
                ]
            }
        ],
        web: [
            {
                id: 0, title: "Mission 1: Web Weaver",
                projects: [
                    {
                        id: "w1_1",
                        title: "The Visual Shell",
                        visualAction: "sequenceWeb",
                        theory: `
                            <div class="mission-brief">
                                <h3>🌐 SYSTEM DARK</h3>
                                <p><strong>Architect:</strong> "The Visual Cortex is offline. We are blind. You must reconstruct the interface from raw HTML protocols."</p>
                                <p>HTML is the skeleton. The <code>&lt;h1&gt;</code> tag creates a primary header—the skull of the document.</p>
                                <div class="dialogue-box">
                                    <strong>PROTOCOL:</strong> "Initialize visual feed. Construct Level 1 Header: 'SYSTEM_ONLINE'."
                                </div>
                            </div>
                        `,
                        tasks: [{ description: "Create <h1>SYSTEM_ONLINE</h1>", validate: (c) => c.includes("<h1>") && c.includes("SYSTEM_ONLINE") }],
                        initialCode: "<!-- Construct the visual shell -->\n"
                    },
                    {
                        id: "w1_2",
                        title: "Neural Links",
                        theory: "<h3>Hyperlink Nodes</h3><p>The web is a brain. <code>&lt;a&gt;</code> tags (anchors) connect thoughts together.</p><p>Link the core to the mainframe.</p>",
                        tasks: [{ description: "Link to '#mainloop'", validate: (c) => c.includes("<a") && c.includes("#mainloop") }],
                        initialCode: "<!-- Create a link anchor -->\n"
                    }
                ]
            }
        ],
        js: [
            {
                id: 0, title: "Spark Logic",
                projects: [
                    { id: "j1_1", title: "Console Signal", theory: "<h3>The Browser Console</h3><p>JavaScript lives in the browser. <code>console.log()</code> is your diagnostic tool.</p>", tasks: [{ description: "Log 'Ready'", validate: (c, r) => r.output.includes("Ready") }], initialCode: "console.log('Waiting')" }
                ]
            }
        ],
        java: [
            {
                id: 0, title: "The Fortress Gate (Basics)",
                projects: [
                    {
                        id: "jv1_1",
                        title: "Hello Fortress",
                        visualAction: "sequenceGate",
                        theory: `
                            <div class="mission-brief">
                                <h3>🏰 FORTRESS GATES SEALED</h3>
                                <p><strong>Warden:</strong> "Halt! The JVM gates are closed. Only authorized code may enter the citadel."</p>
                                <p>Java requires a strict structure. All code must live inside a <code>class</code>. The <code>main</code> method is your entry key.</p>
                                <div class="dialogue-box">
                                    <strong>GATEKEEPER:</strong> "Speak the passphrase 'Gate Open' to enter."
                                </div>
                            </div>
                        `,
                        tasks: [{ description: "Print 'Gate Open'", validate: (c) => c.includes("Gate Open") }],
                        initialCode: "public class Main {\n    public static void main(String[] args) {\n        // Open the gate\n    }\n}"
                    },
                    { id: "jv1_2", title: "Type Armor", theory: "<h3>Strong Typing</h3><p>In Java, variables wear armor. You cannot put a Sword (String) into a Quiver (int). You must declare the type.</p>", tasks: [{ description: "Define int power = 9000", validate: (c) => c.includes("int power = 9000") }], initialCode: "" }
                ]
            },
            {
                id: 1, title: "Object Architects (OOP)",
                projects: [
                    { id: "jv2_1", title: "Library System", theory: "<h3>Blueprints (Classes)</h3><p>A Class isn't the house; it's the blueprint. You use the blueprint to build as many houses (Objects) as you need.</p>", tasks: [{ description: "Create Book class", validate: (c) => c.includes("class Book") }], initialCode: "// Define Book class\n" }
                ]
            }
        ],
        cpp: [
            {
                id: 0, title: "Memory Lane",
                projects: [
                    {
                        id: "cpp1_1",
                        title: "Hello Core",
                        visualAction: "sequenceStream",
                        theory: `
                            <div class="mission-brief">
                                <h3>💾 DIRECT UPLINK</h3>
                                <p><strong>System:</strong> "OS interface bypassed. Initializing direct memory uplink..."</p>
                                <p>C++ speaks directly to the hardware. Use <code>cout</code> (Character Output) to stream data to the display.</p>
                                <div class="dialogue-box">
                                    <strong>KERNEL:</strong> "Awaiting signal. Broadcast 'Core Active' to sync."
                                </div>
                            </div>
                        `,
                        tasks: [{ description: "Print 'Core Active'", validate: (c) => c.includes("Core Active") }],
                        initialCode: "#include <iostream>\nusing namespace std;\nint main() {\n\n}"
                    },
                    {
                        id: "cpp1_2",
                        title: "Pointer Probe",
                        theory: "<h3>Treasure Maps (Pointers)</h3><p>A normal variable holds the Treasure. A <b>Pointer</b> holds the <b>Map</b> to the treasure.</p><p><code>&x</code> gets the address (Where is it?). <code>*p</code> looks at the map (What is there?).</p>",
                        tasks: [{ description: "Create pointer p to address of x", validate: (c) => c.includes("*p = &x") }],
                        initialCode: "int x = 5;\n// Create a map (pointer) to x\n"
                    }
                ]
            }
        ],
        sql: [
            {
                id: 0, title: "Data Retrieval",
                projects: [
                    { id: "sql1_1", title: "Select All", theory: "<h3>The Request</h3><p>SQL is polite. You ask to <code>SELECT</code> items <code>FROM</code> a specific shelf (Table).</p>", tasks: [{ description: "Select all from 'Logs'", validate: (c) => c.toLowerCase().includes("select * from logs") }], initialCode: "-- Query here" }
                ]
            }
        ],
        react: [
            {
                id: 0, title: "Component Core",
                projects: [
                    { id: "r1_1", title: "Elements", theory: "<h3>JSX Components</h3><p>React lets you invent your own HTML tags. Want a <code>&lt;ProfileCard /&gt;</code>? Build it as a function.</p>", tasks: [{ description: "Return a <div>Hello</div>", validate: (c) => c.includes("<div>Hello</div>") }], initialCode: "function App() {\n  return \n}" }
                ]
            }
        ],
        rust: [
            {
                id: 0, title: "Iron Ownership",
                projects: [
                    { id: "rst1_1", title: "Hello Cargo", theory: "<h3>The Macro</h3><p>Rust is safe. <code>println!</code> is a macro (code that writes code) to ensure you don't crash printing text.</p>", tasks: [{ description: "Print 'Rust'", validate: (c) => c.includes("println!(\"Rust\")") }], initialCode: "fn main() {\n}" },
                    {
                        id: "rst1_2",
                        title: "The Borrow Checker",
                        theory: "<h3>The Relay Baton (Ownership)</h3><p>Rust memory is a relay race. Only one runner holds the baton (variable) at a time.</p><p>If you pass `a` to `b`, `a` is empty. You can't use `a` anymore!</p>",
                        tasks: [{ description: "Move variable a to b", validate: (c) => c.includes("let b = a") }],
                        initialCode: "let a = String::from(\"hello\");\n// content moved below"
                    }
                ]
            }
        ],
        go: [
            {
                id: 0, title: "Go Routines",
                projects: [
                    { id: "go1_1", title: "Package Main", theory: "<h3>Fmt</h3><p>`fmt.Println`</p>", tasks: [{ description: "Print 'Go'", validate: (c) => c.includes("fmt.Println") }], initialCode: "package main\nimport \"fmt\"\nfunc main() {}" }
                ]
            }
        ],
        git: [
            {
                id: 0, title: "Time Travel",
                projects: [
                    { id: "git1_1", title: "Init", theory: "<h3>Initialize</h3><p>`git init` starts tracking.</p>", tasks: [{ description: "Initialize repo", validate: (c) => c.includes("git init") }], initialCode: "# Terminal" }
                ]
            }
        ],
        c: [
            {
                id: 0, title: "The Foundation (Memory)",
                projects: [
                    {
                        id: "c1_1",
                        title: "Memory Forge (Malloc)",
                        visualAction: "sequenceCargo",
                        theory: "<h3>Manual Allocation</h3><p>In the C layer, you must forge memory manually. <code>malloc(size)</code> allocates raw bytes.</p><pre>int* ptr = (int*)malloc(sizeof(int));</pre>",
                        tasks: [{ description: "Alloc 10 integers", validate: (c) => c.includes("malloc") && c.includes("10") }],
                        hint: "int* arr = (int*)malloc(10 * sizeof(int));",
                        initialCode: "#include <stdlib.h>\n\nint main() {\n    // Forge your memory array here\n    \n    return 0;\n}"
                    },
                    {
                        id: "c1_2",
                        title: "Structural Integrity",
                        visualAction: "sequenceGate",
                        theory: "<h3>Structs</h3><p>Define custom blueprints compatible with the hardware.</p>",
                        tasks: [{ description: "Define struct 'Node'", validate: (c) => c.includes("struct Node") }],
                        hint: "struct Node { int id; };",
                        initialCode: "// Define the Node blueprint\n"
                    }
                ]
            },
            {
                id: 1, title: "System Shell",
                projects: [
                    { id: "c2_1", title: "Command Override", theory: "<h3>ExecVP</h3><p>Hijack the process execution flow.</p>", tasks: [{ description: "Execute 'ls'", validate: (c) => c.includes("execvp") }], initialCode: "#include <unistd.h>\n" }
                ]
            }
        ],
        csharp: [
            {
                id: 0, title: "The Architect (OOP)",
                projects: [
                    { id: "cs1_1", title: "Console Link", theory: "<h3>Console I/O</h3><p>Established link via .NET Core.</p>", tasks: [{ description: "Write 'Link Established'", validate: (c) => c.includes("Console.WriteLine") }], initialCode: "using System;\n\nclass Program {\n    static void Main() {\n        // Establish link\n    }\n}" }
                ]
            },
            {
                id: 1, title: ".NET Core Systems",
                projects: [
                    { id: "cs2_1", title: "Inventory Manager", theory: "<h3>Generic Collections</h3><p>Safe storage.</p>", tasks: [{ description: "New List<string>", validate: (c) => c.includes("List<string>") }], initialCode: "using System.Collections.Generic;\n" }
                ]
            }
        ],
        godot: [
            {
                id: 0, title: "Engine Initialization",
                projects: [
                    {
                        id: "gd1_1",
                        title: "Scene Graph",
                        visualAction: "sequenceBoot",
                        theory: "<h3>Nodes & Scenes</h3><p>Everything is a Node. Nodes live in Scenes.</p><p>Extend <code>Node2D</code> to begin simulation.</p>",
                        tasks: [{ description: "Extend Node2D", validate: (c) => c.includes("extends Node2D") }],
                        hint: "extends Node2D",
                        initialCode: "# Initialize Script\nextends Node\n\nfunc _ready():\n    print(\"Engine Online\")"
                    },
                    {
                        id: "gd1_2",
                        title: "Signal Transmission",
                        visualAction: "sequenceSignal",
                        theory: "<h3>Signals</h3><p>Nodes communicate via asynchronous signals.</p>",
                        tasks: [{ description: "Define signal 'ping'", validate: (c) => c.includes("signal ping") }],
                        hint: "signal ping",
                        initialCode: "extends Node2D\n\n# Define signal below\n"
                    }
                ]
            },
            {
                id: 1, title: "Physics Layer",
                projects: [
                    { id: "gd2_1", title: "Kinematic Protocol", theory: "<h3>CharacterBody2D</h3><p>Movement with collision logic.</p>", tasks: [{ description: "Call move_and_slide()", validate: (c) => c.includes("move_and_slide") }], initialCode: "extends CharacterBody2D\n\nfunc _physics_process(delta):\n    pass" }
                ]
            }
        ]
    },

    // Global helper to get project
    getProject: function (projectId) {
        for (const track in this.courses) {
            for (const stratum of this.courses[track]) {
                const proj = stratum.projects.find(p => p.id === projectId);
                if (proj) return proj;
            }
        }
        return null; // Not found
    }
};

// Assign
window.App.Curriculum = Curriculum;
