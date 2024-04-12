const { z } = require("zod");
const { AlphaNumericString } = require("../utils/regexes");

const AddVoucherSchema = z.object({
  imageurl: z.string({ "required_error": "imageurl is required" }).min(1),

  title: z.string({ "required_error": "title is required" }).min(1).regex(AlphaNumericString, {
    "message": "title must contain only alphanumeric characters and spaces",
  }),

  validity: z.string({ "required_error": "validity is required" }).regex(/^\d{4}-\d{2}-\d{2}$/),

  description: z.string({ "required_error": "description is required" }).regex(AlphaNumericString, {
    "message":
      "description must contain only alphanumeric characters and spaces",
  }),
});

const UpdateVoucherSectionSchema = z.object({
  id: z.number({ "invalid_type_error": "id must be integer" }).gt(0, {
    message: "id must be positive"
  }),
  imageurl: z.string({ "required_error": "imageurl is required" }).min(1),
  title: z.string().min(1, { "message": "title is required" }).regex(AlphaNumericString, {
    "message": "title must contain only alphanumeric characters and spaces",
  })
  ,
  validity: z.string({ "required_error": "validity is required" }).regex(/^\d{4}-\d{2}-\d{2}$/),
  description: z.string({ "message": "description is required" }).regex(AlphaNumericString, {
    "message": "description must contain only alphanumeric characters and spaces",
  }),
});

module.exports = { AddVoucherSchema, UpdateVoucherSectionSchema };
