// Necessary imports

const express = require("express");
const router = express.Router();

// Authentication middleware
const isAuthenticated = require("../middlewares/isAuthenticated");

// Controllers

const { UpdateBranches } = require("../controllers/branch")
const { UpdateAboutUs } = require("../controllers/about")
const { UpdateHistory } = require("../controllers/history")
const { UpdateMission } = require("../controllers/mission");
const { UpdateCategory } = require("../controllers/category");
const { UpdateMenuItem } = require("../controllers/menu");
const { UpdatePromoTnC } = require("../controllers/promotnc");
const { UpdateFAQ } = require("../controllers/faq");
const { UpdateVoucherSection } = require("../controllers/voucher");
const { UpdateValues } = require("../controllers/values");
const { UpdateCondition, UpdateCourse } = require("../controllers/catering");
const { UpdatePrivacyPolicy } = require("../controllers/privacynpolicy");
router.use(express.json());

router.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({ error: 'Invalid JSON format in request body' });
    }
    next(error);
});

// To update details on about us page
router.put("/aboutus", isAuthenticated, UpdateAboutUs)

// Update branches
router.put("/branch", isAuthenticated, UpdateBranches)

// Update history section
router.put("/history", isAuthenticated, UpdateHistory)

// Update mission sectoin
router.put("/mission", isAuthenticated, UpdateMission)

// Update category
router.put("/category", isAuthenticated, UpdateCategory)


// Update Values section
router.put("/values", isAuthenticated, UpdateValues)

// Update Menu Item
router.put("/menu", isAuthenticated, UpdateMenuItem)

// Update PromoTnC
router.put("/promotnc", isAuthenticated, UpdatePromoTnC)

// Update FAQs
router.put("/faqs", isAuthenticated, UpdateFAQ)

// Update Terms and Conditions
router.put("/tnc", isAuthenticated, UpdateCondition)

// Update course
router.put("/course", isAuthenticated, UpdateCourse)

// update voucher section
router.put("/vouchersection", isAuthenticated, UpdateVoucherSection)

// Update privacy and policy
router.put("/privacynpolicy", isAuthenticated, UpdatePrivacyPolicy)



module.exports = router