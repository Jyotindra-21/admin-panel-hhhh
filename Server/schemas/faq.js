const { z } = require("zod")
const {AlphaNumericString} = require("../utils/regexes")

const AddFAQSchema = z.object({
    categoryname: z.string({ "required_error": "categoryname is required" }).regex(AlphaNumericString, { message: "categoryname must contain only alphanumeric characters and spaces" }),

    question: z.string({ "required_error": "question is required" }).regex(AlphaNumericString, { message: "question must contain only alphanumeric characters and spaces" }),

    answer: z.string({ "required_error": "answer is required" }).regex(AlphaNumericString, { message: "answer must contain only alphanumeric characters and spaces" })
})

const UpdateFAQSchema = z.object({
    id: z.number({ "required_error": "id is required", "invalid_type_error": "id must be integer" }).gt(0, {
        message: "id must be positive"
    }),

    categoryname: z.string({ "required_error": "categoryname is required" }).regex(AlphaNumericString, { message: "categoryname must contain only alphanumeric characters and spaces" }),

    question: z.string({ "required_error": "question is required" }).regex(AlphaNumericString, { message: "question must contain only alphanumeric characters and spaces" }),


    answer: z.string({ "required_error": "answer is required" }).regex(AlphaNumericString, { message: "answer must contain only alphanumeric characters and spaces" })
})

module.exports = { AddFAQSchema, UpdateFAQSchema }