const { z } = require("zod");

const { AlphaNumericString } = require("../utils/regexes")

const AddCategorySchema = z.object({
    categoryname: z.string({ "required_error": "categoryname is required" }).regex(AlphaNumericString, { message: "category name must contain only characters, digits, and spaces" }),

    type: z.string({ "required_error": "type is required" }).regex(AlphaNumericString, { message: "type must contain only characters, digits, and spaces" })
});



const UpdateCategorySchema = z.object({
    id: z.number({ "required_error": "id is required", "invalid_type_error": "ud must be integer" }).gt(0, {
        message: "id must be positive"
    }),
    categoryname: z.string({ "required_error": "categoryname is required" }).regex(AlphaNumericString, { message: "categoryname must contain only characters, digits, and spaces" }),

    type: z.string({ "required_error": "type is required" }).min(1, {
        message: " Type is required"
    }).regex(AlphaNumericString, { message: "type must contain only characters, digits, and spaces" })
});


module.exports = { AddCategorySchema, UpdateCategorySchema };
