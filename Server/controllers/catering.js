const { TermsAndConditionsSchema, UpdateTermsAndConditionsSchema, CateringCourseSchema, UpdateCateringCourseSchema } = require("../schemas/catering");
const { doesExists, InsertDetails, UpdateDetailsById, DeleteById, ViewAllDetails } = require("../utils/operations");

exports.AddTermsAndCondition = async (req, res, next) => {
    try {
        const conditions = req.body;
        const validatedFields = TermsAndConditionsSchema.safeParse(conditions)
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }
        const conditionExists = await doesExists("termsandconditions", "id", "condition", validatedFields.data.condition);
        if (conditionExists) return res.status(409).json({ "error": "Condition already exists" })

        await InsertDetails("termsandconditions", validatedFields.data)
        return res.json({ "success": "Condition successfully added" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}


exports.AddCateringCourse = async (req, res, next) => {
    try {
        const cateringCourse = req.body;
        const validatedFields = CateringCourseSchema.safeParse(cateringCourse)
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }
        const conditionExists = await doesExists("cateringcourse", "id", "title", validatedFields.data.title);
        if (conditionExists) return res.status(409).json({ "error": "title already exists" })
        await InsertDetails("cateringcourse", validatedFields.data)
        return res.json({ "success": "Course added successfully" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}


exports.UpdateCourse = async (req, res, next) => {
    try {
        const courseDetails = req.body;
        const validatedFields = UpdateCateringCourseSchema.safeParse(courseDetails)
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }
        const idExists = await doesExists("cateringcourse", "id", "id", validatedFields.data.id);
        if (!idExists) return res.status(400).json({ "error": `Id ${validatedFields.data.id} not found` })

        delete courseDetails["id"]
        await UpdateDetailsById("cateringcourse", courseDetails, validatedFields.data.id)
        return res.json({ "success": "Course updated" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}
exports.UpdateCondition = async (req, res, next) => {
    try {
        const conditionDetails = req.body;
        const validatedFields = UpdateTermsAndConditionsSchema.safeParse(conditionDetails)
        if (!validatedFields.success) {
            const errorMessage = validatedFields.error.errors[0].message;;
            return res.status(400).json({ "error": errorMessage });
        }
        const idExists = await doesExists("termsandconditions", "id", "id", validatedFields.data.id);
        if (!idExists) return res.status(400).json({ "error": `Id ${validatedFields.data.id} not found` })
        delete conditionDetails["id"]
        await UpdateDetailsById("termsandconditions", conditionDetails, validatedFields.data.id)
        return res.json({ "success": "Condition updated" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}


exports.DeleteCourse = async (req, res, next) => {
    try {
        const { id } = req.body;

        if (isNaN(id) || id < 0) return res.status(500).json({ "error": "id must be a positive integer" })
        const idExists = await doesExists("cateringcourse", "id", "id", id)
        if (!idExists) return res.status(400).json({ "error": `Id ${id} not found` })

        await DeleteById("cateringcourse", id);

        return res.json({ "success": "Course deleted" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}


exports.DeleteCondition = async (req, res, next) => {
    try {
        const { id } = req.body;

        if (isNaN(id) || id < 0) return res.status(500).json({ "error": "id must be a positive integer" })
        const idExists = await doesExists("termsandconditions", "id", "id", id)
        if (!idExists) return res.status(400).json({ "error": `Id ${id} not found` })

        await DeleteById("termsandconditions", id);

        return res.json({ "success": "Condition deleted" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}

exports.ViewCourses = async (req, res, next) => {
    try {
        const courses = await ViewAllDetails("cateringcourse")
        return res.json(courses)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}

exports.ViewConditions = async (req, res, next) => {
    try {
        const conditions = await ViewAllDetails("termsandconditions")
        return res.json(conditions)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}