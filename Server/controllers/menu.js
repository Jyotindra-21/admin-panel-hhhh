const { AddMenuItemSchema, UpdateMenuItemSchema } = require("../schemas/menuitem")
const { InsertDetails, doesExists, UpdateDetailsById, DeleteById, viewDetailByCondition, multiCheckDoesExists } = require("../utils/operations");


exports.AddMenuItem = async (req, res, next) => {
    try {
        const MenuDetails = req.body;
        const validatedFields = AddMenuItemSchema.safeParse(MenuDetails)
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }

        const menuExists = await doesExists("menuitems", "id", "name", validatedFields.data.name)
        if (menuExists) return res.status(409).json({ "error": "Menu item with same name already exists" })
        const categExists = await multiCheckDoesExists("category", "id", "categoryname", validatedFields.data.categoryname, "type", "Menu")
        if (!categExists) {
            const newCategory = {
                "categoryname": validatedFields.data.categoryname,
                "type": "Menu"
            }
            await InsertDetails("category", newCategory)
        }
        delete validatedFields.data['type']

        await InsertDetails("menuitems", validatedFields.data)
        return res.json({ "success": "Menu Item added" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });

    }
}

exports.UpdateMenuItem = async (req, res, next) => {
    try {
        const MenuDetails = req.body;
        const validatedFields = UpdateMenuItemSchema.safeParse(MenuDetails)
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;
            return res.status(400).json({ error: errorMessage });
        }

        const idExists = await doesExists("menuitems", "id", "id", validatedFields.data.id)
        if (!idExists) return res.status(400).json({ "error": `Id ${validatedFields.data.id} not found` })
        delete MenuDetails['id']
        await UpdateDetailsById("menuitems", MenuDetails, validatedFields.data.id)
        return res.json({ "success": "Menu Item Updated" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });

    }
}

exports.DeleteMenuItem = async (req, res, next) => {
    try {
        const { id } = req.body;

        if (isNaN(id) || id < 0) return res.status(500).json({ "error": "id must be a positive integer" })
        const idExists = await doesExists("menuitems", "id", "id", id)
        if (!idExists) return res.status(400).json({ "error": `Id ${id} not found` })

        await DeleteById("menuitems", id);

        return res.json({ "success": "Menu Item deleted" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}


exports.ViewMenus = async (req, res, next) => {
    try {
        const AllMenuItems = {}
        const Categories = await viewDetailByCondition("category", "categoryname", "type", "Menu")
        for (const category of Categories) {
            AllMenuItems[category.categoryname] = await viewDetailByCondition("menuitems", "*", "categoryname", category.categoryname)
        }
        return res.json(AllMenuItems)

    } catch (error) {

    }
}