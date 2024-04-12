// Necessary imports

const express = require("express");
const router = express.Router();

// Authentication middleware
const isAuthenticated = require("../middlewares/isAuthenticated");

// Controllers

const { DeleteBranches } = require("../controllers/branch")
const { DeleteImage } = require("../controllers/image");
const { DeleteCategory } = require("../controllers/category");
const { DeleteMenuItem } = require("../controllers/menu");
const { DeletePromos } = require("../controllers/promotnc");
const { DeleteFAQ } = require("../controllers/faq");
const { DeleteVoucherSection } = require("../controllers/voucher");
const { DeleteCondition, DeleteCourse } = require("../controllers/catering");
const { RemoveEmailFromNewsletter } = require("../controllers/newsletter");

router.use(express.json());

router.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({ error: 'Invalid JSON format in request body' });
    }

    next(error);
});

// Branch delete
router.delete("/branch", isAuthenticated, DeleteBranches)

// slider delete
router.delete("/slider", isAuthenticated, DeleteImage)

// category delete
router.delete("/category", isAuthenticated, DeleteCategory)

// menu item delete
router.delete("/menu", isAuthenticated, DeleteMenuItem)

// Promo Delete
router.delete("/promotnc", isAuthenticated, DeletePromos)

// FAQ delete
router.delete("/faqs", isAuthenticated, DeleteFAQ)

// Condition Delete
router.delete("/tnc",isAuthenticated,DeleteCondition)

// Course delete
router.delete("/course",isAuthenticated,DeleteCourse)

// Voucher section delete
router.delete("/vouchersection", isAuthenticated, DeleteVoucherSection)

// Unscribe email
router.delete("/newslettermail",RemoveEmailFromNewsletter)
module.exports = router