const { ViewAllDetails } = require("../utils/operations")

exports.ViewFirst = async (req, res, next) => {
    try {
        const { table } = req.body
        
        if (!table || table.length === 0) return res.status(400).json({ "error": "Table name is required" })
        const data = await ViewAllDetails(table)
        if(data) return res.json(data)
        return res.status(400).json({"error":`${table} table not found`})

    } catch (error) {
        return res.status(500).json({ "error": error })
    }
}