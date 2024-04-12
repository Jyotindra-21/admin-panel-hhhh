const { AddPromoTnCSchema, UpdatePromoTncSchema } = require("../schemas/promotnc")
const { doesExists, InsertDetails, UpdateDetailsById, ViewAllDetails, DeleteById, multiCheckDoesExists, viewDetailByCondition } = require('../utils/operations')

exports.CreatePromoTnC = async (req, res, next) => {
    try {
        const PromoDetails = req.body
        const validatedFields = AddPromoTnCSchema.safeParse(PromoDetails)
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }
        const titleExists = await doesExists("promotnc", "id", "title", validatedFields.data.title)
        if (titleExists) return res.status(409).json({ "error": "Promo with same title already exists" })
        const categoryExists = await multiCheckDoesExists("category", "id", "categoryname", validatedFields.data.categoryname, "type", "Promotnc")
        if (!categoryExists) {
            const newCategory = {
                "categoryname": validatedFields.data.categoryname,
                "type": "Promotnc"
            }
            await InsertDetails("category", newCategory)
        }
        await InsertDetails("promotnc", validatedFields.data)
        return res.json({ "success": "Promo added successfully" })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "error": error });
    }
}

exports.UpdatePromoTnC = async (req, res, next) => {
    try {
        const UpdateDetails = req.body;
        const validatedFields = UpdatePromoTncSchema.safeParse(UpdateDetails)
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }
        const idExists = await doesExists("promotnc", "id", "id", validatedFields.data.id)
        if (!idExists) return res.status(400).json({ "erorr": "Id not found" })
        const categoryExists = await doesExists("category", "id", "categoryname", validatedFields.data.categoryname)
        if (!categoryExists) {
            const newCategory = {
                "categoryname": validatedFields.data.categoryname,
                "type": validatedFields.data.type
            }
            await InsertDetails("category", newCategory)
        }
        delete validatedFields.data["id"]
        await UpdateDetailsById("promotnc", validatedFields.data, UpdateDetails.id)
        return res.json({ "succes": "Promo fields are updated successfully" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}


exports.DeletePromos = async (req, res, next) => {
    try {
        const { id } = req.body;
        if (isNaN(id) || id < 0) return res.status(400).json({ "error": "Id must be positive and integer" })

        const isDeleted = await DeleteById("promotnc", id)
        if (!isDeleted) return res.status(400).json({ "error": "Id doesn't exist" })
        return res.json({ "success": "Promo successfuly deleted" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}


exports.ViewAllPromos = async (req, res, next) => {
    try {
        const AllPromos = {}
        const AllPromoCategory = await viewDetailByCondition("category", "categoryname", "type", "Promotnc")
        for (const promoCategory of AllPromoCategory) {
            AllPromos[promoCategory.categoryname] = await viewDetailByCondition("promotnc", "*", "categoryname", promoCategory.categoryname)
        }
        return res.json(AllPromos)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}