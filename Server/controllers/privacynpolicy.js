const { UpdateDetailsById, ViewAllDetails } = require("../utils/operations");

exports.UpdatePrivacyPolicy = async (req, res) => {
    try {
        const { html } = req.body;
        if (!html) return res.status(400).json({ "error": "html not found" })
        await UpdateDetailsById("privacynpolicy", { "html": html }, 1)
        return res.json({ "success": "Privacy and Policy Updated" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}

exports.ViewPrivacyAndPolicies = async (req, res) => {
    try {
        const Policies = await ViewAllDetails("privacynpolicy")
        return res.json(Policies)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "error": error.message });
    }
}