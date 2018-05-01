const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/", pageController.startPage);
router.get("/find-jobs", pageController.findJobs);
router.get("/find-job/:work", pageController.findJob);
router.get("/find-staff", pageController.findStaff);
router.get("/cities/:city", pageController.city);
router.get("/contact", pageController.contact);

router.post(
  "/send",
  pageController.upload,
  catchErrors(pageController.sendMail)
);

module.exports = router;
