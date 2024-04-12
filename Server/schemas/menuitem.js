const { z } = require("zod")
const { AlphaNumericString } = require("../utils/regexes")

const AddMenuItemSchema = z.object({
    name: z.string({ "required_error": "name is required" }).min(1).regex(AlphaNumericString, { message: "name must contain only alphanumeric characters and spaces" }),

    imageurl: z.string({ "required_error": "imageurl is required" }).min(1),

    description: z.string({ "required_error": "description is required" }),

    categoryname: z.string({ "required_error": "categoryname is required" }),

    type: z.string({ "required_error": "type is required" }),



})


const UpdateMenuItemSchema = z.object({
    id: z.number({ "required_error": "id is required", "invalid_type_error": "id must be integer" }).positive({ message: "id must be a positive integer" }),

    name: z.string({ "required_error": "name is required" }).min(1).regex(AlphaNumericString, { message: "name must contain only alphanumeric characters and spaces" }),

    imageurl: z.string({ "required_error": "imageurl is required" }).min(1),

    description: z.string({ "required_error": "description is required" }),

    categoryname: z.string({ "required_error": "categoryname is required" }),

    type: z.string({ "required_error": "type is required" }).min(1).regex(AlphaNumericString, { message: "type must contain only alphanumeric characters and spaces" }),
})

module.exports = { AddMenuItemSchema, UpdateMenuItemSchema }