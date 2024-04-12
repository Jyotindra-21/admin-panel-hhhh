// Value schema
const { z } = require("zod")
const { AlphaNumericString } = require("../utils/regexes")


const UpdateValuesSchema = z.object({
    id: z.number({ "required_error": "id is required", "invalid_type_error": "id must be integer" }).gt(0, {
        message: "Id must be positive"
    }),
    imageurl: z.string(),
    title: z.string().min(1).regex(AlphaNumericString, { message: "title must contain only alphanumeric characters and spaces" }),
    description: z.string().min(1).regex(AlphaNumericString, { message: "description must contain only alphanumeric characters and spaces" }),
})

module.exports = { UpdateValuesSchema }