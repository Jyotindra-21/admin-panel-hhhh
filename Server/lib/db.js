require('dotenv').config()
const { createClient } = require("@supabase/supabase-js")

const supabase_key = process.env.SUPABASE_KEY
const supabase_url = process.env.SUPABASE_URL

const supabase = createClient(supabase_url,supabase_key)

module.exports = supabase;
