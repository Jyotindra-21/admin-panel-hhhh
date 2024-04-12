const { updateHistorySectionSchema } = require("../schemas/history");
const { viewDetailByCondition, UpdateDetailsById, DeleteFileFromBucket } = require("../utils/operations");

exports.UpdateHistory = async (req, res, next) => {
    try {
        const HistoryDetails = req.body;
        const validatedFields = updateHistorySectionSchema.safeParse(HistoryDetails);
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }
        const imageUrl = await viewDetailByCondition("history", "id,imageurl", "id", validatedFields.data.id)
        if (!imageUrl) return res.status(400).json({ "error": `Id ${validatedFields.data.id} not found` })
        const path = imageUrl[0].imageurl.split("hadramawt/")[1];
        await DeleteFileFromBucket("hadramawt", path)
        await UpdateDetailsById("history", validatedFields.data, validatedFields.data.id)
        res.json({ "success": "Fields updated" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message })
    }
}
