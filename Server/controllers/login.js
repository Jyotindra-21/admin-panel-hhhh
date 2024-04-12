
const Login = require("../utils/login")

exports.AdminLogin = async (req,res,next)=> {
    try {

        const { username, password } = req.body;
        if(!username || !password){
            return res.status(400).json({"error":"Username and Password are required"})
        }
        const result = await Login(username, password)

        return res.json({ "token": result })
    } catch (error) {
        if (error instanceof SyntaxError && error.status === 400) {
            return res.status(400).json({ error: 'Invalid JSON format in request body' });
        }
        console.error("Error:", error);
        return res.status(500).json({ "error": error.message });
    }
}

