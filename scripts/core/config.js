// Core Configuration Module
window.App = window.App || {};

const Config = {
    version: "1.0.0",
    debug: true,
    modules: ['Router', 'Curriculum', 'Validator', 'Runtime', 'Gamification', 'Editor', 'Catalog'],

    // Feature Flags
    features: {
        voice: false,
        multiplayer: false
    },

    // System Messages
    messages: {
        startup: "MineCode OS Booting...",
        error_generic: "System Malfunction.",
        success_generic: "Course complete.",
        error_syntax: "Syntax Error."
    }
};

window.App.Config = Config;
