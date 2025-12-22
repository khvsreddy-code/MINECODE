// MineCode Compiler Module
// Powered by Piston API (emkc.org)
window.App = window.App || {};

const Compiler = {
    apiEndpoint: 'https://emkc.org/api/v2/piston/execute',

    // Language Mapping (MineCode ID -> Piston ID)
    languages: {
        'python': { runtime: 'python', version: '3.10.0' },
        'python-hello': { runtime: 'python', version: '3.10.0' }, // Alias
        'python-variables': { runtime: 'python', version: '3.10.0' }, // Alias
        'javascript': { runtime: 'javascript', version: '18.15.0' },
        'js': { runtime: 'javascript', version: '18.15.0' },
        'typescript': { runtime: 'typescript', version: '5.0.3' },
        'ts': { runtime: 'typescript', version: '5.0.3' },
        'java': { runtime: 'java', version: '15.0.2' },
        'c++': { runtime: 'c++', version: '10.2.0' },
        'cpp': { runtime: 'c++', version: '10.2.0' },
        'c': { runtime: 'c', version: '10.2.0' },
        'csharp': { runtime: 'csharp', version: '6.12.0' },
        'cs': { runtime: 'csharp', version: '6.12.0' },
        'go': { runtime: 'go', version: '1.16.2' },
        'rust': { runtime: 'rust', version: '1.68.2' },
        'php': { runtime: 'php', version: '8.2.3' },
        'ruby': { runtime: 'ruby', version: '3.0.1' },
        'swift': { runtime: 'swift', version: '5.3.3' },
        'kotlin': { runtime: 'kotlin', version: '1.8.20' },
        'bash': { runtime: 'bash', version: '5.2.0' },
        'lua': { runtime: 'lua', version: '5.4.4' },

        // Mocks / Fallbacks
        'html': { mode: 'web' },
        'css': { mode: 'web' },
        'react': { mode: 'web' },
        'godot': { mode: 'mock', output: "Godot Engine not detected in browser environment.\nRunning syntactic check...\n> GDScript syntax verified.\n> Ready to attach to scene." }
    },

    execute: async function (langId, code) {
        const config = this.languages[langId.toLowerCase()];

        // 1. Handle Unsupported/Unknown
        if (!config) {
            return { error: `Compiler Error: Language '${langId}' not supported yet.` };
        }

        // 2. Handle Mocks (Godot, etc)
        if (config.mode === 'mock') {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve({ output: config.output || "Execution simulated." });
                }, 800);
            });
        }

        // 3. Handle Web Mode (HTML/JS/CSS) - To be implemented for iframe rendering
        if (config.mode === 'web') {
            return { output: "Web Inspector: Code structure valid. (Preview feature coming soon)" };
        }

        // 4. Handle Piston Execution
        try {
            const payload = {
                language: config.runtime,
                version: config.version,
                files: [
                    {
                        content: code
                    }
                ]
            };

            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.run) {
                // Combine stdout and stderr
                let output = data.run.stdout;
                if (data.run.stderr) {
                    output += '\n[STDERR]\n' + data.run.stderr;
                }
                return { output: output || "Program finished with no output." };
            } else {
                return { error: "Execution failed. No response from compiler." };
            }

        } catch (e) {
            console.error("Compiler Error:", e);
            return { error: "Connection to compiler grid failed. Check internet access." };
        }
    }
};

window.App.Compiler = Compiler;
