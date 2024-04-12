const { CateringQuotationMailSchema } = require("../schemas/sendMail");
const { Resend } = require("resend");
const { viewDetailByCondition } = require("../utils/operations");
const resend = new Resend(process.env.RESEND_API_KEY)

exports.CateringQuotationMail = async (req, res) => {
    try {
        const CateringDetails = await req.body
        const validatedFields = CateringQuotationMailSchema.safeParse(CateringDetails)
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }
        console.log(CateringDetails);
        const additionalNotesSection = CateringDetails.additionalNotes ? `<h2>Additional Notes: ${CateringDetails.additionalNotes}</h2>` : '';
        const totalPrice = await viewDetailByCondition("cateringcourse", "pricePerPax", "title", validatedFields.data.course)

        const data = await resend.emails.send({
            from: "test@melancompany.com",
            to: ["ayushtops37@gmail.com"],
            subject: "New Catering Quotation",
            html: `<div style="display:table">
                <h2>FirstName: ${CateringDetails.firstName}</h2>
                <h2>Mobile Num: ${CateringDetails.mobileNumber}</h2>
                <h2>Email: ${CateringDetails.email}</h2>
                <h2>Date of Catering: ${CateringDetails.dateOfCatering}</h2>
                <h2>Time of Catering: ${CateringDetails.timeOfCatering}</h2>
                <h2>Event Address: ${CateringDetails.eventAddress}</h2>
                <h2>No of PAX: ${CateringDetails.noOfPAX}</h2>
                <h2>Course: ${CateringDetails.course}</h2>
                <h2>Total Price: ${totalPrice[0].pricePerPax * CateringDetails.noOfPAX}</h2>
                ${additionalNotesSection}
            </div>`,
            text: "New Catering Quotation"
        });

        return res.json({ "success": "Email sent successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}
