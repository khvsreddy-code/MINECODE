// Validator Engine
// Removed global App assignment

const Validator = {
    run: function (code, project, runtimeState = null) {
        if (!project || !project.tasks) return { success: false, results: [] };

        const results = project.tasks.map(task => {
            const passed = task.validate(code, runtimeState);
            let feedback = passed ? "Correct." : "Incomplete.";

            // SMART HINTING (Better than CodeDex)
            if (!passed) {
                if (code.trim() === "") {
                    feedback = "Input not detected. Type your code in the editor.";
                } else if (task.description.includes("print") && !code.includes("print")) {
                    feedback = "Hint: You need to use the `print()` function.";
                } else if (code.includes("print") && !code.includes("(")) {
                    feedback = "Syntax Warning: Missing parentheses in print call.";
                } else if (task.description.includes("variable") && !code.includes("=")) {
                    feedback = "Hint: Use '=' to assign a value to a variable.";
                }
            }

            return {
                description: task.description,
                passed: passed,
                feedback: feedback
            };
        });

        const allPassed = results.every(r => r.passed);

        return {
            success: allPassed,
            results: results
        };
    }
};

window.App.Validator = Validator;
