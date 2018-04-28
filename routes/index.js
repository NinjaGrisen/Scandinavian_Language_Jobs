var express = require("express");
var router = express.Router();
var pageController = require("../controllers/pageController");

router.get("/", pageController.startPage);
router.get("/find-jobs", pageController.findJobs);
router.get("/find-job/:work", pageController.findJob);
router.get("/find-staff", pageController.findStaff);
router.get("/cities/:city", pageController.city);

module.exports = router;
