const { z } = require("zod")
const bcrypt = require('bcrypt');
const generateToken = require("../lib/genToken")

const supabase = require("../lib/db")

const LoginSchema = z.object({
    username: z.string().min(1, {
        message: "Username is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
});

const Login = async (username, password) => {
    try {
        const validatedFields = LoginSchema.safeParse({ username, password })
        if (!validatedFields.success) {
            throw new Error("Invalid fields")
        }
        const { data, error } = await supabase.from("admin_login").select("password,id").eq("username", username);

        if (error) {
            throw new Error("Database error");
        }

        if (data.length > 0 && data[0].password) {
            const isCorrectPassword = await bcrypt.compare(password, data[0].password);
            if (isCorrectPassword) {
                const token = generateToken({ 'id': data[0].id })

                return token;
            } else {
                throw new Error("Invalid credentials");
            }
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        console.log(`\n\nError: ${error}\n\n`);
        throw error;
    }
};

module.exports = Login;
