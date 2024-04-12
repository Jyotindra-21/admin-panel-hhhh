const { UpdateMissionSchema } = require("../schemas/mission")
const supabase = require("../lib/db")
const { ViewAllDetails, doesExists, viewDetailByCondition, UpdateDetailsById, DeleteFileFromBucket } = require("../utils/operations")
// Mission section

exports.ViewMission = async (req, res, next) => {
    try {
        const MissionDetails = await ViewAllDetails("mission")
        return res.json(MissionDetails)
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ "error": error.message });
    }
}

exports.UpdateMission = async (req, res, next) => {
    try {
        const MissionDetails = req.body;
        const validatedFields = UpdateMissionSchema.safeParse(MissionDetails);
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }
        const idExists = await doesExists("mission", "id", "id", validatedFields.data.id)
        if (!idExists) return res.status(400).json({ "error": `Id ${id} not found` })
        const ImageDetails = await viewDetailByCondition("mission", "imageurl", "id", validatedFields.data.id)
        const path = ImageDetails[0].imageurl.split("hadramawt/")[1];
        await DeleteFileFromBucket("hadramawt", path)
        await UpdateDetailsById("mission", validatedFields.data, validatedFields.data.id)
        res.json({ "success": "Fields updated" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message })
    }
}
