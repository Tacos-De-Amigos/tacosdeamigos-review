import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aehsfsblrgxfbnupzffm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaHNmc2Jscmd4ZmJudXB6ZmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0NzE1NzAsImV4cCI6MTk5MjA0NzU3MH0.1KoVcQpf3fipT_2ufHegj6Cz6e321z5oPoH-bKsTZwU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
