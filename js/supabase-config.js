// ============================================
// AFRISTAY - Supabase Configuration
// ============================================

const SUPABASE_URL = "https://vwwsowclumhbhefwwxjc.supabase.co"; // e.g. https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3d3Nvd2NsdW1oYmhlZnd3eGpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyMzI2NDIsImV4cCI6MjEwMDgwODY0Mn0.XTpZXU1HyEICgaiExt0bFd_gaYa9qIuUtZSvt5UofEY";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);