const express = require("express");
const router = express.Router();
const { AdminLogin } = require("../controllers/login"); // Corrected import path

require('dotenv').config()

// Middleware for parsing JSON in request body
router.use(express.json());

// Middleware for handling JSON syntax errors

router.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({ error: 'Invalid JSON format in request body' });
    }

    next(error);
});

router.post("/", AdminLogin);

module.exports = router;
