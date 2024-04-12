const { z } = require("zod")


const AddEmailToNewsLetterSchema = z.object({
    id: z.string({ "required_error": "id is required" }),
    email: z.string().email({ message: "Email is invalid" }).min(1, {
        message: "Email cannot be empty",
    })
})

module.exports = { AddEmailToNewsLetterSchema }