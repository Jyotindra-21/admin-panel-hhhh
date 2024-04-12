const { z } = require("zod")
const { AlphaNumericString } = require("../utils/regexes")


const sliderSchema = z.object({
    imageurl: z.string({ "required_error": "imageurl is required" }),
    viewport: z.enum(["Mobile", "Desktop"], { "message": "viewport must be either 'Mobile' or 'Desktop'" }),
    type: z.string({ "required_error": "type is required" }).min(1).regex(AlphaNumericString, { "message": "type must contain only alphanumeric characters and spaces" }),
})

const updateSliderSchema = z.object({
    id: z.number({ "invalid_type_error": "id must be integer" }).positive({ "message": "id must be a positive integer" }),
    imageurl: z.string({ "required_error": "imageurl is required" }),
    viewport: z.enum(["Mobile", "Desktop"], { "message": "viewport must be either 'Mobile' or 'Desktop'" }),
    type: z.string({ "required_error": "type is required" }).min(1).regex(AlphaNumericString, { "message": "type must contain only alphanumeric characters and spaces" })
});

module.exports = { sliderSchema, updateSliderSchema };