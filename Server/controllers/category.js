const { AddCategorySchema, UpdateCategorySchema } = require("../schemas/category")
const { InsertDetails, doesExists, multiCheckDoesExists, UpdateDetailsById, ViewAllDetails, viewDetailByCondition, DeleteById } = require("../utils/operations");

exports.CreateCategory = async (req, res, next) => {
    try {
        const categoryDetails = req.body;

        const validatedFields = AddCategorySchema.safeParse(categoryDetails);
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }
        const categExists = await multiCheckDoesExists("category", "id", "categoryname", validatedFields.data.categoryname, "type", validatedFields.data.type)
        if (categExists) return res.status(409).json({ "error": "Category name already exists" })

        await InsertDetails("category", categoryDetails)

        return res.json({ "success": "Category added" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
};

exports.DeleteCategory = async (req, res, next) => {
    try {
        const { id } = req.body;
        if (isNaN(id) || id < 0) return res.status(400).json({ "error": "Id must be a positive integer" })
        const idExists = await doesExists("category", "id", "id", id);
        if (!idExists) return res.status(400).json({ "error": `Id ${id} not found` })
        await DeleteById("category", id)
        return res.json({ "success": "Category deleted" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}

exports.UpdateCategory = async (req, res, next) => {
    try {
        const { id, categoryname, type } = req.body;

        const validatedFields = UpdateCategorySchema.safeParse({ id, categoryname, type });
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }
        const idExists = await doesExists("category", "id", "id", id)
        if (!idExists) return res.status(409).json({ "error": `Category Id ${validatedFields.data.id} does not exists` })
        const categExist = await multiCheckDoesExists("category", "id", "categoryname", validatedFields.data.categoryname, "type", validatedFields.data.type)
        if (categExist) return res.status(409).json({ "error": "Category name already exists" })
        await UpdateDetailsById("category", { categoryname, type }, id)
        return res.json({ "success": "Category Updated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}
