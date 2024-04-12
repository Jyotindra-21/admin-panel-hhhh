const { z } = require("zod")
const { phoneRegex } = require("../utils/regexes")

const CateringQuotationMailSchema = z.object({
    firstName: z.string({ "required_error": "First name is required" })
        .min(1, { message: "First name cannot be empty" })
        .refine(value => /^[^\d\s]+$/.test(value), {
            message: "First name must not contain any numbers and spaces",
        }),

    mobileNumber: z.string({ "required_error": "Mobile number is required" })
        .regex(phoneRegex, { message: "Invalid Number!" }),

    email: z.string({ "required_error": "Email is required" })
        .email({ message: "Email is invalid" })
        .min(1, { message: "Email cannot be empty" }),

    dateOfCatering: z.string({ "required_error": "Date of catering is required" })
        .refine(value => {
            const currentDate = new Date();
            const selectedDate = new Date(value);
            return !isNaN(selectedDate.getTime()) && selectedDate > currentDate;
        }, {
            message: "Date must be a valid future date",
        }),

    timeOfCatering: z.string({ "required_error": "Time of catering is required" })
        .min(1, { message: "Time of catering cannot be empty" }),

    eventAddress: z.string({ "required_error": "Event address is required" })
        .min(1, { message: "Event address is required" }),

    noOfPAX: z.number({ "required1_error": "Number of PAX is required" })
        .int()
        .min(1, { message: "Number of PAX must be greater than 0" }),

    course: z.string({ "required_error": "Course selection is required" })
        .min(1, { message: "Course must be selected" }),

    additionalNotes: z.string().optional(),

});


module.exports = { CateringQuotationMailSchema }