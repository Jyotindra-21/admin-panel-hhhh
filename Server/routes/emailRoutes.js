// Necessary imports

const express = require("express");
const { CateringQuotationMail } = require("../controllers/sendMail");
const router = express.Router();

router.use(express.json());


router.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({ error: 'Invalid JSON format in request body' });
    }

    next(error);
});


router.post("/quotation",CateringQuotationMail)



module.exports = router