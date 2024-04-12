// Necessary imports

const express = require("express");
const router = express.Router();
// Authentication middleware
const { viewAllImages } = require("../controllers/image");
const { ViewAllBranchDetails } = require("../controllers/branch");
const { ViewAboutUsIntro, ViewAboutUs } = require("../controllers/about");
const { ViewMission } = require("../controllers/mission");

const { ViewAllPromos } = require("../controllers/promotnc");
const { ViewAllFAQ } = require("../controllers/faq");
const { ViewAllVoucherDetails } = require("../controllers/voucher");
const { ViewMenus } = require("../controllers/menu");
const { ViewConditions, ViewCourses } = require("../controllers/catering");
const { ViewPrivacyAndPolicies } = require("../controllers/privacynpolicy");
const apicache = require('apicache');

let cache = apicache.middleware;

const onlyStatus200 = (req, res) => res.statusCode === 200

const cacheSmall = cache("30 seconds", onlyStatus200)
const cacheSuccesses = cache('1 minutes', onlyStatus200)
router.use(express.json());

router.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res
      .status(400)
      .json({ error: "Invalid JSON format in request body" });
  }
  next(error);
});

// Get slider
router.get("/slider", cacheSuccesses, viewAllImages);

// Get branches
router.get("/branches", cacheSuccesses, ViewAllBranchDetails)

// Get about us page details
router.get("/about", cacheSuccesses, ViewAboutUs);

// Get all promos
router.get("/promotnc", cacheSmall, ViewAllPromos);

// Get all FAQS
router.get("/faqs", cacheSuccesses, ViewAllFAQ)

// Get Voucher images
router.get("/voucher", cacheSmall, ViewAllVoucherDetails)

// Get conditions
router.get("/tnc", cacheSuccesses, ViewConditions)

// Get courses
router.get("/course", cacheSmall, ViewCourses)

// Get Menu Items
router.get("/menu", cacheSmall, ViewMenus)

// Get privacy and policies
router.get("/privacynpolicy", cacheSuccesses, ViewPrivacyAndPolicies)

module.exports = router
