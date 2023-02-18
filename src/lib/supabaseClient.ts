import { createClient } from '@supabase/supabase-js'

const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID
const publicKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY
export const supabase = createClient(`https://${projectId}.supabase.co`, publicKey)
