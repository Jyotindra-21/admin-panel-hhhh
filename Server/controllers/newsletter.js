const { v4: uuid_v4 } = require('uuid');
const { InsertDetails, UpdateDetailsById, viewDetailByCondition, ViewAllDetails } = require('../utils/operations');
const { AddEmailToNewsLetterSchema } = require('../schemas/newsletter');
const { Resend } = require("resend")

const resend = new Resend(process.env.RESEND_API_KEY)

exports.AddEmailToNewsLetter = async (req, res) => {
    try {
        const EmailDetails = req.body
        EmailDetails["id"] = uuid_v4();
        const validatedFields = AddEmailToNewsLetterSchema.safeParse(EmailDetails)
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }
        const emailSubscription = await viewDetailByCondition("newslettermails", "id,email,status", "email", EmailDetails.email)

        if (emailSubscription.length === 1) {
            if (emailSubscription[0].status === "Subscribed") {
                return res.status(409).json({ "error": "Email already exists" })
            }
            else {
                UpdateDetailsById("newslettermails", { "status": "Subscribed" }, emailSubscription[0].id)
            }
        }
        await InsertDetails("newslettermails", EmailDetails)
        return res.json({ "success": "Email added to the newsletter" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}

exports.RemoveEmailFromNewsletter = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) return res.status(400).json({ "error": "Email is required" })

        const emailDetails = await viewDetailByCondition("newslettermails", "id,email,status", "email", email);
        console.log(emailDetails);

        if (emailDetails.length === 0) return res.status(400).json({ "error": "Email not found" })

        if (emailDetails[0].status === "Unsubscribed") return res.status(400).json({ "error": "Email already unsubscribed" })

        UpdateDetailsById("newslettermails", { "status": "Unsubscribed" }, emailDetails[0].id)
        return res.json({ "success": "Email unsubscribed" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}



exports.AddNewsLetterContent = async (req, res) => {
    try {
        const { html } = req.body;
        if (!html) return res.status(400).json({ "error": "html not found" })
        await UpdateDetailsById("newslettercontent", { "html": html }, 1)
        const EmailArray = [];

        const userEmails = await viewDetailByCondition("newslettermails", "email", "status", "Subscribed")
        for (const userEmail of userEmails) {
            const ResendConfigs = {
                "from": 'Acme <test@melancompany.com>',
                "to": [userEmail.email],
                "subject": 'Newsletter',
                "html": html,
            }
            EmailArray.push(ResendConfigs)
        }

        const data = await resend.batch.send(EmailArray)
        return res.json({ "success": "Newsletter added and started sending mails" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}