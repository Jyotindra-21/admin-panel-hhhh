
const { UpdateValuesSchema } = require("../schemas/values");
const { doesExists, UpdateDetailsById } = require("../utils/operations");

exports.UpdateValues = async (req, res, next) => {
    try {
        const ValuesDetails = req.body;
        const validatedFields = UpdateValuesSchema.safeParse(ValuesDetails)
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }

        const idExists = await doesExists("values", "id", "id", validatedFields.data.id)
        if (!idExists) return res.status(400).json({ "error": `Id ${validatedFields.data.id} not found` })
        delete ValuesDetails["id"]
        await UpdateDetailsById("values", ValuesDetails, validatedFields.data.id)
        return res.json({ "success": "Value section successfully updated" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error })
    }
}
