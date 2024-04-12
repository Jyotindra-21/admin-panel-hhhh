const { AboutUsSchema } = require("../schemas/aboutUs")
const { UpdateDetailsById, ViewAllDetails } = require("../utils/operations")

// About us Section

exports.ViewAboutUs = async (req, res) => {
    try {

        let PageDetails = {}
        const Intro = await ViewAllDetails("aboutpage")
        const Branch = await ViewAllDetails("branches")
        const History = await ViewAllDetails("history")
        const Missions = await ViewAllDetails("mission")
        const Values = await ViewAllDetails("values")

        PageDetails["introduction"] = Intro
        PageDetails["branches"] = Branch
        PageDetails["history"] = History
        PageDetails["mission"] = Missions
        PageDetails["values"] = Values

        return res.json(PageDetails)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "error": error.message });
    }
}

exports.UpdateAboutUs = async (req, res) => {
    try {
        const AboutUsDetails = req.body
        const validatedFields = AboutUsSchema.safeParse(AboutUsDetails)
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ error: errorMessage });
        }
        const details = {
            "introduction": validatedFields.data.introduction,
            "title": validatedFields.data.title,
            "description": validatedFields.data.description
        }
        await UpdateDetailsById("aboutpage", details, 1)
        res.json({ "message": "Fields updated" })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ "error": error.message });
    }
}





