const { z } = require("zod");
const { AlphaNumericString } = require("../utils/regexes")

// About us Schema
const AboutUsSchema = z.object({
    introduction: z.string({ "required_error": "introduction is required" }).min(1, {
        message: "introduction is required"
    }).regex(AlphaNumericString, { message: "introduction must contain only alphanumeric characters and spaces" }),
    title: z.string({ "required_error": "title is required" }).min(1, {
        message: "title is required"
    }).regex(AlphaNumericString, { message: "title must contain only alphanumeric characters and spaces" }),
    description: z.string({
        "required_error": "description is required"
    })
}).required();




module.exports = { AboutUsSchema }
