import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fbobjmafsbrwkfbxwagb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZib2JqbWFmc2Jyd2tmYnh3YWdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0OTI2ODgsImV4cCI6MjAzMjA2ODY4OH0.U261Q16horkOY1pGiCpvh1Ze9-bhvhTWilolgXd3mps";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
