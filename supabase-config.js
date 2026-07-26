// ============================================================
// PASTE YOUR OWN VALUES HERE — this is the only file you edit for setup.
// Find these in: Supabase Dashboard → Project Settings → API
// ============================================================
const SUPABASE_URL = "https://gyhqyrowewmjcvwxnejk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5aHF5cm93ZXdtamN2d3huZWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwNTYwOTAsImV4cCI6MjEwMDYzMjA5MH0.LWMMrpzJjJDYirHWmqJ9tx5dwEm--q75VsH81oA5Jdg";

// Creates one shared client used by every page (loaded after the CDN script)
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Admin emails must match schema.sql's is_admin() function exactly
const ADMIN_EMAILS = ["office@nafvna.com", "ceo@nafvna.com", "info@nafvna.com"];

function isAdminEmail(email) {
  return ADMIN_EMAILS.includes((email || "").toLowerCase());
}