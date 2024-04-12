
const jwt = require("jsonwebtoken")
const verifyJWT = require("../lib/verifyToken")
function isAuthenticated(req, res, next) {
    const authToken = req.headers['authorization'];
    try {
        if (authToken) {
            const token = authToken.split("Bearer ")[1];
            if (!token) {
                res.status(401).json({ "error": "Unauthorized" });
            }
            const isAuthorized = verifyJWT(token)
            if (!isAuthorized) {
                res.status(401).json({ "error": "Unauthorized" }); // 'Authorization' header is missing
            }
            next()
        } else {
            res.status(401).json({ "error": "Unauthorized" }); // 'Authorization' header is missing
        }
    }
    catch(error){
        if(error instanceof jwt.JsonWebTokenError){
            res.status(401).json({ "error": "Invalid JWT" }); // 'Authorization' header is missing
        }
    }
    
}

module.exports = isAuthenticated;


// import { createClient } from "@supabase/supabase-js";

// const supabase_key = import.meta.env.VITE_SUPABASE_KEY
// const supabase_url = import.meta.env.VITE_SUPABASE_URL
// export const supabase = createClient(supabase_url,supabase_key)