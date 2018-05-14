const jobs = require("../public/data/arbete");
const cities = require("../public/data/cities");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");

const multerOptions = {
  storage: multer.memoryStorage(),
  limits: { fileSize: process.env.FILE_SIZE },
  filteFilter(req, file, next) {
    next(null, true);
  }
};

const fieldsSettings = [
  {
    name: "cv",
    maxCount: 1
  },
  {
    name: "pb",
    maxCount: 1
  }
];
exports.upload = multer({ multerOptions }).fields(fieldsSettings);

exports.startPage = (req, res) => {
  const promotedWork = [];
  for (let i = 0; i < Object.entries(jobs).length; i++) {
    if (Object.entries(jobs)[i][1].promoted === "true") {
      promotedWork.push(Object.entries(jobs)[i][1]);
    }
  }
  res.render("index", {
    jobs,
    promotedWork,
    cities,
    title: "Om oss"
  });
};

exports.findJobs = (req, res) => {
  res.render("jobs", { title: "För arbetssökande", jobs });
};
exports.findJob = (req, res) => {
  console.log(decodeURI(req.params.work.toLowerCase()));

  console.log(req.params.work.toLowerCase());

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

exports.sendMailWithoutFile = (req, res) => {
  let companyName = "";
  if (req.body.companyName) {
    companyName = `<li>Company name: <b>${req.body.companyName}</b></li>`;
  }
  const output = `
   <h3>Kontakt detalier</h3>
   <ul>
    <li>Namn: <b>${req.body.name}</b></li>
    <li>Email: <b>${req.body.email}</b></li>
    <li>Telefon: <b>${req.body.phone}</b></li>
    ${companyName}
   </ul>
    <h3>Message</h3>
    <p>${req.body.textarea}</p>
   
   `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASS
    }
  });

  const mailOptions = {
    from: req.body.email,
    to: process.env.MAIL,
    subject: `${req.body.subject}`,
    html: output
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      req.flash("error", err);
    }
    req.flash("success", "👍");

    res.redirect("back");
  });
};

exports.sendMail = async (req, res) => {
  const output = `
   <p>Nytt meddelande</p>
   <h3>Kontakt detalier</h3>
   <ul>
    <li>Namn: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Telefon: ${req.body.phone}</li>
    <p>Message</p>
    <p>${req.body.textarea}</p>
   </ul>
   `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASS
    }
  });

  const mailOptions = {
    from: req.body.email,
    to: process.env.MAIL,
    subject: req.body.subject,
    html: output,
    attachments: [
      {
        filename: req.files["cv"][0].originalname,
        content: new Buffer(req.files["cv"][0].buffer)
      },
      {
        filename: req.files["pb"][0].originalname,
        content: new Buffer(req.files["pb"][0].buffer)
      }
    ]
  };
  let cv = req.files["cv"][0].originalname.split(".");
  let pb = req.files["pb"][0].originalname.split(".");
  console.log(req.files);
  pb = pb[pb.length - 1];
  cv = cv[cv.length - 1];
  if (
    cv == "doc" ||
    cv == "docx" ||
    (cv == "pdf" && pb == "doc") ||
    pb == "docx" ||
    pb == "pdf"
  ) {
    if (
      req.files["cv"][0].size > process.env.FILE_SIZE ||
      req.files["pb"][0].size > process.env.FILE_SIZE
    ) {
      req.flash("error", "Filen är för stor, får inte vara större än 1mb");
      res.redirect("back");
    }
    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        req.flash("error", err);
      }
      req.flash("success", "👍");

      res.redirect("back");
    });
  } else {
    req.flash("error", "Alla filer måste vara av typ pdf, doc eller docx");
    res.redirect("back");
  }
};
