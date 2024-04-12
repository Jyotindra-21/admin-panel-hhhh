const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET


const verifyJWT = (token) => {
    try {

        if (!token) {
            throw new Error("Token not provided")
        }

        const verification = jwt.verify(token, JWT_SECRET)
        if (!verification) throw new Error("Invalid JWT")
        return true

    }
    catch (error) {
        console.log("Error: ", error);
        throw error;
    }

}

module.exports = verifyJWT