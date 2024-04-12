const { z } = require("zod")
const { AlphaNumericString } = require("../utils/regexes")

const TermsAndConditionsSchema = z.object({
    condition: z.string({ "required_error": "condition is required" }).regex(AlphaNumericString, { message: "condition must contain only alphanumeric characters and spaces" })

})

const UpdateTermsAndConditionsSchema = z.object({
    id: z.number({ "invalid_type_error": "id must be integer", "required_error": "id is required" }).positive({ message: "id must be a positive integer" }),

    condition: z.string({ "required_error": "condition is required" }).regex(AlphaNumericString, { message: "condition must contain only alphanumeric characters and spaces" })

})

const CateringCourseSchema = z.object({
    title: z.string({ "required_error": "title is required" }).regex(AlphaNumericString, { message: "title must contain only alphanumeric characters and spaces" }),

    imageurl: z.string({ "required_error": "imageurl is required" }),

    pricePerPax: z.number({ "invalid_type_error": "pricePerPax must be integer", "required_error": "pricePerPax is required" }).positive({ message: "pricePerPax must be a positive integer" }),

    popupImage: z.string({ "required_error": "popupImage is required" }),

    description: z.string({
        message: "Description is required"
    }).regex(AlphaNumericString, { message: "description must contain only alphanumeric characters and spaces" })
})

const UpdateCateringCourseSchema = z.object({
    id: z.number({ "invalid_type_error": "id must be integer" }).gt(0, {
        message: "id must be positive"
    }),

    title: z.string({ "required_error": "title is required" }).regex(AlphaNumericString, { message: "title must contain only alphanumeric characters and spaces" }),

    imageurl: z.string({ "required_error": "imageurl is required" }),

    popupImage: z.string({ "required_error": "popupImage is required" }),

    pricePerPax: z.number({ "invalid_type_error": "pricePerPax must be integer", "required_error": "pricePerPax is required" }).positive({ message: "pricePerPax must be a positive integer" }),

    description: z.string({
        message: "Description is required"
    }).regex(AlphaNumericString, { message: "description must contain only alphanumeric characters and spaces" })

})
module.exports = { TermsAndConditionsSchema, UpdateTermsAndConditionsSchema, CateringCourseSchema, UpdateCateringCourseSchema }

