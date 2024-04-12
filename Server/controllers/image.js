const { sliderSchema } = require("../schemas/slider");
const { InsertDetails, DeleteById, viewDetailByCondition, DeleteFileFromBucket } = require("../utils/operations");
const { AlphaNumericString } = require("../utils/regexes")
exports.AddImage = async (req, res) => {
    try {
        const imageDetails = req.body;
        const validatedFields = sliderSchema.safeParse(imageDetails)
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }

        await InsertDetails("sliders", validatedFields.data)
        return res.json({ "success": "Image added to the slider" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}


exports.DeleteImage = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id || isNaN(id) || id < 0) return res.status(400).json({ "error": "Id must be a positive integer" })

        const imageExists = await viewDetailByCondition("sliders", "id,imageurl", "id", id)
        if (!imageExists) return res.status(400).json({ "error": `Id ${id} not found` })
        const imagePath = imageExists[0].imageurl.split("hadramawt/")
        await DeleteFileFromBucket("hadramawt", imagePath)
        await DeleteById("sliders", id);
        return res.json({ "success": "Slider image deleted" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}


exports.viewAllImages = async (req, res) => {
    try {
        const type = req.query.type;
        if (!AlphaNumericString.test(type)) {
            return res.status(400).json({ "error": "Type validation failed: Type must contain only alphanumeric characters and spaces." });
        }

        if (type) {
            const sliderurls = await viewDetailByCondition("sliders", "id,imageurl,viewport", "type", type)
            if (sliderurls.length === 0) return res.status(400).json({ "error": "No images found" })
            return res.json(sliderurls)
        }
        return res.status(400).json({ "error": "type is required" })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}