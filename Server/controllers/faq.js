const { AddFAQSchema, UpdateFAQSchema } = require("../schemas/faq")
const { doesExists, InsertDetails, UpdateDetailsById, ViewAllDetails, DeleteById, multiCheckDoesExists } = require('../utils/operations')

exports.CreateFAQ = async (req, res, next) => {
    try {
        const FAQDetails = req.body
        const validatedFields = AddFAQSchema.safeParse(FAQDetails)
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }
        const titleExists = await doesExists("faqs", "id", "question", validatedFields.data.question)
        if (titleExists) return res.status(409).json({ "error": "question already exists" })
        await InsertDetails("faqs", validatedFields.data)
        return res.json({ "success": "FAQ added successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}

exports.UpdateFAQ = async (req, res, next) => {
    try {
        const UpdateDetails = req.body;
        const validatedFields = UpdateFAQSchema.safeParse(UpdateDetails)
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }
        const idExists = await doesExists("faqs", "id", "id", validatedFields.data.id)
        if (!idExists) return res.status(400).json({ "erorr": `Id ${id} not found` })
        delete validatedFields.data["id"]
        await UpdateDetailsById("faqs", validatedFields.data, UpdateDetails.id)
        return res.json({ "succes": "FAQ fields are updated successfully" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}


exports.DeleteFAQ = async (req, res, next) => {
    try {
        const { id } = req.body;
        if (isNaN(id) || id < 0) return res.status(400).json({ "error": "Id must be positive and integer" })

        const idExists = await doesExists("faqs", "id", "id", id)
        if (!idExists) return res.status(400).json({ "erorr": `Id ${id} not found` })

        await DeleteById("faqs", id)

        return res.json({ "success": "FAQ successfuly deleted" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}


exports.ViewAllFAQ = async (req, res, next) => {
    try {
        const AllPromos = await ViewAllDetails("faqs")
        return res.json(AllPromos)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}