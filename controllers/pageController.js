const jobs = require("../public/data/arbete");
const cities = require("../public/data/cities");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");

const multerOptions = {
  storage: multer.memoryStorage(),
  filteFilter(req, file, next) {
    next(null, true);
  }
};
exports.upload = multer(multerOptions).single("cv");

exports.startPage = (req, res) => {
  const promotedWork = [];
  for (let i = 0; i < Object.entries(jobs).length; i++) {
    if (Object.entries(jobs)[i][1].promoted === "true") {
      promotedWork.push(Object.entries(jobs)[i][1]);
    }
  }
  res.render("index", { jobs, promotedWork, cities, title: "About us" });
};

exports.findJobs = (req, res) => {
  res.render("jobs", { title: "För arbetssökande", jobs });
};
exports.findJob = (req, res) => {
  const job = jobs[req.params.work.toLowerCase()];

  res.render("job", { job, title: job.name });
};

exports.findStaff = (req, res) => {
  res.render("staff", { jobs, title: "For employers" });
};

exports.city = (req, res) => {
  const city = cities[req.params.city.toLowerCase()];
  res.render("city", { title: req.params.city, city, jobs });
};

exports.contact = (req, res) => {
  res.render("contact", { title: "contact" });
};

exports.sendMail = async (req, res) => {
  const output = `
   <p>Nytt meddelande</p>
   <h3>Kontakt detalier</h3>
   <ul>
    <li>Namn: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Telefon: ${req.body.phone}</li>
   </ul>
   `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "scanlanjob@gmail.com",
      pass: "ajabaja1337"
    }
  });

  const mailOptions = {
    from: "sender@email.com", // sender address
    to: "scanlanjob@gmail.com", // list of receivers
    subject: "Subject of your email", // Subject line
    html: output, // plain text body
    attachments: [
      {
        filename: req.file.originalname,
        content: new Buffer(req.file.buffer)
      }
    ]
  };
  console.log(req.file);
  let docType = req.file.originalname.split(".");
  docType = docType[docType.length - 1];
  if (docType == "doc" || docType == "docx" || docType == "pdf") {
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) console.log(err);
      else res.render("contact", { title: "Cotnact", msg: "Success" });
    });
  } else {
    res.render("contact", { title: "Cotnact", msg: "Invalid doctype" });
  }
};
