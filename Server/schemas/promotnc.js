const { z } = require("zod")
const { AlphaNumericString, } = require("../utils/regexes")

const AddPromoTnCSchema = z.object({
    categoryname: z.string({
        "required_error": "categoryname is required"
    }).regex(AlphaNumericString, {
        "message": "categoryname must be alphanumeric",
    }),
    title: z.string({
        "required_error": "title is required"
    }).regex(AlphaNumericString, {
        "message": "title must be alphanumeric",
    }),
    description: z.string({
        "required_error": "description is required"
    }).regex(AlphaNumericString, {
        "message": "description must be alphanumeric",
    })
});

const UpdatePromoTncSchema = z.object({
    id: z.number({ "invalid_type_error": "id must be integer" }).positive({ "message": "id must be a positive integer" }),

    categoryname: z.string({
        "required_error": "categoryname is required"
    }).regex(AlphaNumericString, {
        "message": "categoryname must be alphanumeric",
    }),
    title: z.string({
        "required_error": "title is required"
    }).regex(AlphaNumericString, {
        "message": "title must be alphanumeric",
    }),
    description: z.string({
        "required_error": "description is required"
    }).regex(AlphaNumericString, {
        "message": "description must be alphanumeric",
    })

});

module.exports = { AddPromoTnCSchema, UpdatePromoTncSchema }