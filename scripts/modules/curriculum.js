// Curriculum Database (Omni-Curriculum Protocol)
window.App = window.App || {};

const Curriculum = {
    // Top Level: Language Tracks
    tracks: [
        { id: 'python', title: 'The Legend of Python', description: 'Master the ancient language of the backend servers.', icon: '🐍', progress: 0, usage: 'AI, Data Science & Backend', level: 'Beginner to Advanced' },
        { id: 'web', title: 'The Web Weavers', description: 'Construct the visual cortex using HTML & CSS.', icon: '🌐', progress: 0, usage: 'Frontend Web Development', level: 'Beginner to Advanced' },
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
        // --- 🐍 PYTHON: The Golden Path (Full AI/ML Arc) ---
        python: [
            {
                id: 0, stratum: "Beginner", title: "Stratum 1: The Snake Pit (Basics)",
                projects: [
                    {
                        id: "p1_1", title: "Breaching the Firewall", visualAction: "sequenceBoot",
                        theory: `<div class="mission-brief"><h3>⚡ ACCESS BLOCKED</h3><p><strong>Commander:</strong> "Initiate, the mainframe is rejecting our connection. Use the <code>print()</code> broadcast tool."</p></div>`,
                        tasks: [{ description: "Broadcast 'ACCESS_GRANTED'", validate: (c, r) => r.output.includes("ACCESS_GRANTED") }],
                        initialCode: "# Hack the firewall below:\n# Send the signal 'ACCESS_GRANTED'\n"
                    },
                    {
                        id: "p1_2", title: "Energy Calibration", visualAction: "sequencePower",
                        theory: "<h3>Variables</h3><p>Variables are labelled storage crates.</p><pre>shield_integrity = 100</pre>",
                        tasks: [{ description: "Set energy to 100", validate: (c, r) => r.variables['energy'] == 100 }],
                        initialCode: "energy = 0\n"
                    },
                    {
                        id: "p1_3", title: "The Gatekeeper", visualAction: "sequenceAccess",
                        theory: "<h3>Control Flow (If/Else)</h3><p>Code needs to make decisions based on data.</p>",
                        tasks: [{ description: "Check if role == 'Admin'", validate: (c) => c.includes("if role == 'Admin':") }],
                        initialCode: "role = 'Initiate'\n# Add logic check below\n"
                    }
                ]
            },
            {
                id: 1, stratum: "Intermediate", title: "Stratum 2: Serpent Logic (Structures)",
                projects: [
                    { id: "p2_1", title: "Data Collections", theory: "<h3>Lists & Dictionaries</h3><p>Store multiple items in one variable.</p>", tasks: [{ description: "Create list 'items'", validate: (c) => c.includes("items =") }], initialCode: "# Inventory system\n" },
                    { id: "p2_2", title: "Modular Functions", theory: "<h3>Functions</h3><p>Reusable blocks of code. `def action():`</p>", tasks: [{ description: "Define 'scan_area'", validate: (c) => c.includes("def scan_area") }], initialCode: "# Define function\n" },
                    { id: "p2_3", title: "Object Orientation", theory: "<h3>Classes</h3><p>Blueprints for creating complex objects.</p>", tasks: [{ description: "Create 'Drone' class", validate: (c) => c.includes("class Drone") }], initialCode: "class Drone:\n    pass" }
                ]
            },
            {
                id: 2, stratum: "Advanced", title: "Stratum 3: Neural Ascension (AI/ML)",
                projects: [
                    { id: "p3_1", title: "The Decorator Pattern", theory: "<h3>Decorators</h3><p>Modify function behavior without changing code. `@wrapper`</p>", tasks: [{ description: "Use decorator", validate: (c) => c.includes("@") }], initialCode: "# Advanced meta-programming\n" },
                    { id: "p3_2", title: "Neural Nodes (NumPy)", theory: "<h3>Matrix Operations</h3><p>Simulating neural weights using arrays.</p>", tasks: [{ description: "Create weight matrix", validate: (c) => c.includes("weights =") }], initialCode: "# Simulating neurons\n" },
                    { id: "p3_3", title: "Sentience (Simple AI)", theory: "<h3>The Perceptron</h3><p>A single neuron learning from inputs.</p>", tasks: [{ description: "Implement activation", validate: (c) => c.includes("def activate") }], initialCode: "# Neural activation function\n" }
                ]
            }
        ],

        // --- 🌐 WEB: The Visual Cortex (Full Stack Arc) ---
        web: [
            {
                id: 0, stratum: "Beginner", title: "Stratum 1: HTML Structure",
                projects: [
                    {
                        id: "w1_1", title: "The Visual Shell", visualAction: "sequenceWeb",
                        theory: `<h3>🌐 HTML Basics</h3><p>The skeleton of the web. <code>&lt;h1&gt;</code> is the skull.</p>`,
                        tasks: [{ description: "Create <h1>SYSTEM_ONLINE</h1>", validate: (c) => c.includes("<h1>") }],
                        initialCode: "<!-- Construct visual shell -->\n"
                    },
                    {
                        id: "w1_2", title: "Styling Protocols", visualAction: "sequenceWeb",
                        theory: `<h3>🎨 CSS Styling</h3><p>Color the void. <code>style="color: cyan;"</code></p>`,
                        tasks: [{ description: "Add style attribute", validate: (c) => c.includes("style=") }],
                        initialCode: "<h1 style=''>Neon Text</h1>"
                    }
                ]
            },
            {
                id: 1, stratum: "Intermediate", title: "Stratum 2: Responsive Grid",
                projects: [
                    { id: "w2_1", title: "Flexbox Layout", theory: "<h3>Flexbox</h3><p>Align elements in 1D space.</p>", tasks: [{ description: "display: flex", validate: (c) => c.includes("flex") }], initialCode: "<style>\n .container {}\n</style>" },
                    { id: "w2_2", title: "CSS Grid", theory: "<h3>CSS Grid</h3><p>2D layout systems for dashboards.</p>", tasks: [{ description: "display: grid", validate: (c) => c.includes("grid") }], initialCode: "" }
                ]
            },
            {
                id: 2, stratum: "Advanced", title: "Stratum 3: Dynamic DOM",
                projects: [
                    { id: "w3_1", title: "DOM Manipulation", theory: "<h3>JavaScript Integation</h3><p>Modify HTML via scripts.</p>", tasks: [{ description: "Select element", validate: (c) => c.includes("document.querySelector") }], initialCode: "<script>\n</script>" },
                    { id: "w3_2", title: "Async Fetch", theory: "<h3>API Calls</h3><p>Retrieve data from the Lattice.</p>", tasks: [{ description: "Use fetch()", validate: (c) => c.includes("fetch") }], initialCode: "" }
                ]
            }
        ],

        // --- ⚡ JS: Interactive Logic ---
        js: [
            {
                id: 0, stratum: "Beginner", title: "Stratum 1: Script Spark",
                projects: [{ id: "j1_1", title: "Console Signal", theory: "<h3>Console.log</h3>", tasks: [{ description: "Log 'Ready'", validate: (r) => r.output.includes("Ready") }], initialCode: "console.log('Waiting')" }]
            },
            {
                id: 1, stratum: "Intermediate", title: "Stratum 2: Event Horizon",
                projects: [{ id: "j2_1", title: "Event Listeners", theory: "<h3>Events</h3><p>React to user clicks.</p>", tasks: [], initialCode: "" }]
            },
            {
                id: 2, stratum: "Advanced", title: "Stratum 3: Async/Await",
                projects: [{ id: "j3_1", title: "Promises", theory: "<h3>Asynchronous Code</h3>", tasks: [], initialCode: "" }]
            }
        ],

        // --- ☕ JAVA: Enterprise Fortress ---
        java: [
            {
                id: 0, stratum: "Beginner", title: "Stratum 1: The Fortress Gate",
                projects: [{ id: "jv1_1", title: "Hello Fortress", visualAction: "sequenceGate", theory: "<h3>Class Structure</h3>", tasks: [{ description: "Print 'Open'", validate: (c) => c.includes("Open") }], initialCode: "public class Main {}" }]
            },
            {
                id: 1, stratum: "Intermediate", title: "Stratum 2: Object Architects",
                projects: [{ id: "jv2_1", title: "Inheritance", theory: "<h3>Extends</h3>", tasks: [], initialCode: "" }]
            },
            {
                id: 2, stratum: "Advanced", title: "Stratum 3: Concurrent Streams",
                projects: [{ id: "jv3_1", title: "Multithreading", theory: "<h3>Threads</h3>", tasks: [], initialCode: "" }]
            }
        ],

        // --- ⚙️ C++: Systems Core ---
        cpp: [
            {
                id: 0, stratum: "Beginner", title: "Stratum 1: Memory Lane",
                projects: [{ id: "cpp1_1", title: "Direct Uplink", visualAction: "sequenceStream", theory: "<h3>cout</h3>", tasks: [{ description: "Print 'Active'", validate: (c) => c.includes("Active") }], initialCode: "#include <iostream>" }]
            },
            {
                id: 1, stratum: "Intermediate", title: "Stratum 2: Pointer Probe",
                projects: [{ id: "cpp2_1", title: "Memory Addresses", theory: "<h3>Pointers</h3>", tasks: [], initialCode: "" }]
            },
            {
                id: 2, stratum: "Advanced", title: "Stratum 3: Engine Optimization",
                projects: [{ id: "cpp3_1", title: "Memory Management", theory: "<h3>New/Delete</h3>", tasks: [], initialCode: "" }]
            }
        ],

        // --- 🗄️ SQL: The Vaults ---
        sql: [
            { id: 0, stratum: "Beginner", title: "Stratum 1: Retrieval", projects: [{ id: "sql1_1", title: "SELECT *", theory: "<h3>Queries</h3>", tasks: [], initialCode: "-- SELECT" }] },
            { id: 1, stratum: "Intermediate", title: "Stratum 2: Joins", projects: [{ id: "sql2_1", title: "INNER JOIN", theory: "<h3>Connecting Tables</h3>", tasks: [], initialCode: "" }] },
            { id: 2, stratum: "Advanced", title: "Stratum 3: Optimization", projects: [{ id: "sql3_1", title: "Indexing", theory: "<h3>Performance</h3>", tasks: [], initialCode: "" }] }
        ],

        // --- ⚛️ REACT: Component Reactor ---
        react: [
            { id: 0, stratum: "Beginner", title: "Startum 1: Components", projects: [{ id: "r1_1", title: "Hello JSX", theory: "<h3>JSX</h3>", tasks: [], initialCode: "" }] },
            { id: 1, stratum: "Intermediate", title: "Stratum 2: State Hooks", projects: [{ id: "r2_1", title: "useState", theory: "<h3>Hooks</h3>", tasks: [], initialCode: "" }] },
            { id: 2, stratum: "Advanced", title: "Stratum 3: Context API", projects: [{ id: "r3_1", title: "Global State", theory: "<h3>Providers</h3>", tasks: [], initialCode: "" }] }
        ],

        // --- 🦀 RUST: Iron Safety ---
        rust: [
            { id: 0, stratum: "Beginner", title: "Stratum 1: Cargo Init", projects: [{ id: "rst1_1", title: "Hello World", theory: "<h3>println!</h3>", tasks: [], initialCode: "" }] },
            { id: 1, stratum: "Intermediate", title: "Stratum 2: Ownership", projects: [{ id: "rst2_1", title: "Borrow Checker", theory: "<h3>Ownership</h3>", tasks: [], initialCode: "" }] },
            { id: 2, stratum: "Advanced", title: "Stratum 3: Concurrency", projects: [{ id: "rst3_1", title: "Channels", theory: "<h3>Safe Threads</h3>", tasks: [], initialCode: "" }] }
        ],

        // --- 🐹 GO: Cloud Systems ---
        go: [
            { id: 0, stratum: "Beginner", title: "Stratum 1: Goroutines", projects: [{ id: "go1_1", title: "Package main", theory: "<h3>fmt</h3>", tasks: [], initialCode: "" }] },
            { id: 1, stratum: "Intermediate", title: "Stratum 2: Channels", projects: [{ id: "go2_1", title: "Message Passing", theory: "<h3>Channels</h3>", tasks: [], initialCode: "" }] },
            { id: 2, stratum: "Advanced", title: "Stratum 3: Microservices", projects: [{ id: "go3_1", title: "HTTP Server", theory: "<h3>net/http</h3>", tasks: [], initialCode: "" }] }
        ],

        // --- 📚 GIT: Chronos ---
        git: [
            { id: 0, stratum: "Beginner", title: "Stratum 1: Timeline", projects: [{ id: "git1_1", title: "Init & Commit", theory: "<h3>Version Control</h3>", tasks: [], initialCode: "" }] },
            { id: 1, stratum: "Intermediate", title: "Stratum 2: Branching", projects: [{ id: "git2_1", title: "Checkout", theory: "<h3>Parallel Timelines</h3>", tasks: [], initialCode: "" }] },
            { id: 2, stratum: "Advanced", title: "Stratum 3: Merging", projects: [{ id: "git3_1", title: "Merge Conflicts", theory: "<h3>Resolution</h3>", tasks: [], initialCode: "" }] }
        ],

        // --- 🏗️ C: Foundation ---
        c: [
            { id: 0, stratum: "Beginner", title: "Stratum 1: Bedrock", projects: [{ id: "c1_1", title: "Malloc", theory: "<h3>Direct Memory</h3>", tasks: [], initialCode: "" }] },
            { id: 1, stratum: "Intermediate", title: "Stratum 2: Pointers", projects: [{ id: "c2_1", title: "Addressing", theory: "<h3>*ptr</h3>", tasks: [], initialCode: "" }] },
            { id: 2, stratum: "Advanced", title: "Stratum 3: OS Kernel", projects: [{ id: "c3_1", title: "Syscalls", theory: "<h3>Kernel</h3>", tasks: [], initialCode: "" }] }
        ],

        // --- #️⃣ C#: Architect ---
        csharp: [
            { id: 0, stratum: "Beginner", title: "Stratum 1: Construct", projects: [{ id: "cs1_1", title: "Console.Write", theory: "<h3>.NET</h3>", tasks: [], initialCode: "" }] },
            { id: 1, stratum: "Intermediate", title: "Stratum 2: LINQ", projects: [{ id: "cs2_1", title: "Data Query", theory: "<h3>LINQ</h3>", tasks: [], initialCode: "" }] },
            { id: 2, stratum: "Advanced", title: "Stratum 3: Unity Core", projects: [{ id: "cs3_1", title: "MonoBehaviour", theory: "<h3>Game Loop</h3>", tasks: [], initialCode: "" }] }
        ],

        // --- 🤖 GODOT: Simulations ---
        godot: [
            { id: 0, stratum: "Beginner", title: "Stratum 1: Scene Graph", projects: [{ id: "gd1_1", title: "Node2D", theory: "<h3>Nodes</h3>", tasks: [], initialCode: "" }] },
            { id: 1, stratum: "Intermediate", title: "Stratum 2: GDScript", projects: [{ id: "gd2_1", title: "Signals", theory: "<h3>Events</h3>", tasks: [], initialCode: "" }] },
            { id: 2, stratum: "Advanced", title: "Stratum 3: Shaders", projects: [{ id: "gd3_1", title: "Visual Effects", theory: "<h3>Shaders</h3>", tasks: [], initialCode: "" }] }
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
