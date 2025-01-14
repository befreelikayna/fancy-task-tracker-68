import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aqxvhvmqcjgdzryxjrld.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxeHZodm1xY2pnZHpyeXhqcmxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NTI5NzAsImV4cCI6MjAyNjMyODk3MH0.7_XUvxVqoYgYrACYT_Zr3qZZn_p0NKu3O_cJD4QnLbY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);