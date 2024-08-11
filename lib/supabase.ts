import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ibsmwupcebsfhnumddyj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlic213dXBjZWJzZmhudW1kZHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzNDQyMTgsImV4cCI6MjAzODkyMDIxOH0.TD9igdaBxnGfQ3xuEJhIBgrfxgrDoNLLBW5r0Dxefgo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
