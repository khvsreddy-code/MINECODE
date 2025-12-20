// MineCode App - Codedex Clone
document.addEventListener('DOMContentLoaded', () => {
    console.log('[MineCode] Initializing...');

    // Bind start button
    document.getElementById('start-btn')?.addEventListener('click', () => {
        console.log('[MineCode] Start clicked');
        document.getElementById('intro-screen').classList.remove('active');
        document.getElementById('main-screen').classList.add('active');
    });

    // Bind navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    console.log('[MineCode] ✅ Ready');
});
