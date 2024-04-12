const { z } = require("zod")
const { AlphaNumericString } = require("../utils/regexes")

// History Schema

const updateHistorySectionSchema = z.object({
    id: z.number({ "required_error": "id is required", "invalid_type_error": "id must be integer" }).gt(0, {
        message: "id must be positive"
    }),
    imageurl: z.string({ "required_error": "imageurl is required" }),
    description: z.string({
        message: "description is required"
    }).regex(AlphaNumericString, { message: "description must contain only alphanumeric characters and spaces" })

})

module.exports = { updateHistorySectionSchema }