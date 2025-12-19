// Python-like Runtime Environment (Mock)
window.App = window.App || {};

const Runtime = {
    state: {
        variables: {},
        output: [],
        history: []
    },

    init: function () {
        this.reset();
    },

    reset: function () {
        this.state.variables = {};
        this.state.output = [];
        this.state.history = [];
    },

    // Mock Execution
    run: async function (code) {
        this.state.output = [];
        const lines = code.split('\n');

        for (let line of lines) {
            line = line.trim();
            if (!line || line.startsWith('#')) continue;
            await this.processLine(line);
        }

        return {
            output: this.state.output,
            variables: this.state.variables
        };
    },

    processLine: async function (line) {
        // Handle Print
        try {
            if (line.match(/^print\((.*)\)$/)) {
                const content = line.match(/^print\((.*)\)$/)[1];
                // Handle strings
                if (content.startsWith("'") || content.startsWith('"')) {
                    this.state.output.push(content.slice(1, -1));
                } else {
                    // Handle variable lookups
                    const val = this.state.variables[content];
                    this.state.output.push(val !== undefined ? val : `NameError: ${content} is not defined`);
                }
            }
            // Handle Assignment: x = 10
            else if (line.includes('=')) {
                const parts = line.split('=');
                const key = parts[0].trim();
                const val = parts[1].trim();
                this.state.variables[key] = parseInt(val) || val;
            }
        } catch (e) {
            console.error(e);
            this.state.output.push(`Runtime Error: ${e.message}`);
        }
    }
};

window.App.Runtime = Runtime;
