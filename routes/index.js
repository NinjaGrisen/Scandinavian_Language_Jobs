const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const { catchErrors } = require("../handlers/errorHandlers");

const multer = require("multer");

router.get("/", pageController.startPage);
router.get("/find-jobs", pageController.findJobs);
router.get("/find-job/:work", pageController.findJob);
router.get("/find-staff", pageController.findStaff);
router.get("/cities/:city", pageController.city);

router.post(
  "/sendWithFile",

  catchErrors(pageController.sendMail)
);
router.post(
  "/find-job/sendWithFile",
  pageController.upload,
  catchErrors(pageController.sendMail)
);

//pageController.upload,

router.post("/sendWithoutFile", pageController.sendMailWithoutFile);
router.post("/find-job/sendWithoutFile", pageController.sendMailWithoutFile);

module.exports = router;
