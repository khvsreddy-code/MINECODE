
/**
 * SUPABASE CLIENT INITIALIZATION
 * Connects to the backend database
 */

const SUPABASE_URL = 'https://eskyhqcbbjsvobsdqkgh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVza3locWNiYmpzdm9ic2Rxa2doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNDExMzMsImV4cCI6MjA4MTcxNzEzM30.0nAqMaPMyVHzTtJwjJXubXdMfbjyUlfc0batLn-hr3o';

// Ensure the library is loaded
if (typeof supabase === 'undefined') {
    console.error('CRITICAL: Supabase JS library not loaded. Check index.html');
} else {
    // Initialize Client
    window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('🔌 Supabase Client Connected');
}
