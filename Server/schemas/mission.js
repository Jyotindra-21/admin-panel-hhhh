const { z } = require("zod")
const { AlphaNumericString } = require("../utils/regexes")
// Mission schema

const UpdateMissionSchema = z.object({
    id: z.number({ "invalid_type_error": "id must be integer" }).gt(0, {
        message: "id must be positive"
    }),
    imageurl: z.string({"required_error":"imageurl is required"}),
    description: z.string({ "required_error": "description is required" }
    ).min(1).regex(AlphaNumericString, { message: "description must contain only alphanumeric characters and spaces" }),
})

module.exports = { UpdateMissionSchema }