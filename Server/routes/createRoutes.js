// Necessary imports

const express = require("express");
const router = express.Router();

// Authentication middleware
const isAuthenticated = require("../middlewares/isAuthenticated");

// Controllers

const { CreateBranch } = require("../controllers/branch")
const { AddImage } = require("../controllers/image");
const { CreateCategory } = require("../controllers/category");
const { AddMenuItem } = require("../controllers/menu");
const { CreatePromoTnC } = require("../controllers/promotnc");
const { CreateFAQ } = require("../controllers/faq");
const { AddVoucherSection } = require("../controllers/voucher");
const { AddTermsAndCondition, AddCateringCourse } = require("../controllers/catering");
const { AddEmailToNewsLetter, AddNewsLetterContent } = require("../controllers/newsletter");
router.use(express.json());


router.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({ error: 'Invalid JSON format in request body' });
    }

    next(error);
});



// Add Branch
router.post("/branch", isAuthenticated, CreateBranch)

// Add slider images
router.post("/slider", isAuthenticated, AddImage)

// Add category
router.post("/category", isAuthenticated, CreateCategory)

// Add Menu item
router.post("/menu", isAuthenticated, AddMenuItem)

// Add Promo
router.post("/promotnc", isAuthenticated, CreatePromoTnC)

// Add FAQ
router.post("/faqs", isAuthenticated, CreateFAQ)

// Add Terms and Condition
router.post("/tnc", isAuthenticated, AddTermsAndCondition)

// Add Catering Course
router.post("/course", isAuthenticated, AddCateringCourse)

// Add Voucher section
router.post("/vouchersection", isAuthenticated, AddVoucherSection)

// Add email to newsletter
router.post("/newslettermail", AddEmailToNewsLetter)

// Add newsletter content
router.post("/newslettercontent", isAuthenticated, AddNewsLetterContent)
module.exports = router