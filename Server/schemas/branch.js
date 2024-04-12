const { z } = require("zod")
const { AlphaNumericString, timeRegex } = require("../utils/regexes")

// Branch Schema
const addBranchSchema = z.object({
  name: z.string({ "required_error": "name is mandatory" }
  ).min(1).regex(AlphaNumericString, { message: "name must contain only alphanumeric characters and spaces" }),

  address: z.string({ "required_error": "address is required" }),

  startingTime: z.string({ "required_error": "startingTime time is required" }).min(1).regex(timeRegex, { message: "startingTime must be in the format of HH:MM AM or PM" }),

  endingTime: z.string({ "required_error": "endingTime is required" }).min(1).regex(timeRegex, { message: "endingTime time must be in the format of HH:MM AM or PM" }),

  google: z.string({ "required_error": "google link is required" }),

  waze: z.string({ "required_error": "waze link is required" }),

  address: z.string({ "required_error": "address is required" })
});

const updateBranchSchema = z.object({
  id: z.number({ "invalid_type_error": "id must be integer" }).positive({ message: "id must be a positive integer" }),

  name: z.string({ "required_error": "name is required" }).regex(AlphaNumericString, { message: "name must contain only alphanumeric characters and spaces" }),

  startingTime: z.string({ "required_error": "startingTime is required" }).regex(timeRegex, { message: "startingTime must be in the format of HH:MM AM or PM" }),

  endingTime: z.string({ "required_error": "endingTime is required" }).regex(timeRegex, { message: "endingTime must be in the format of HH:MM AM or PM" }),

  google: z.string({ "required_error": "google link is required" }),

  waze: z.string({ "required_error": "waze link is required" }),

  address: z.string({ "required_error": "address is required" })

}).required();

module.exports = { addBranchSchema, updateBranchSchema };