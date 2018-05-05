// const multer = require("multer");
// const nodemailer = require("nodemailer");
// const path = require("path");

// const multerOptions = {
//   storage: multer.memoryStorage(),
//   limits: { fileSize: process.env.FILE_SIZE },
//   filteFilter(req, file, next) {
//     next(null, true);
//   }
// };

// const fieldsSettings = [
//   {
//     name: "cv",
//     maxCount: 1
//   },
//   {
//     name: "pb",
//     maxCount: 1
//   }
// ];
// exports.upload = multer({ multerOptions }).fields(fieldsSettings);

// exports.sendMailWithoutFile = (req, res) => {
//   const output = `
//     <p>Nytt meddelande</p>
//     <h3>Kontakt detalier</h3>
//     <ul>
//      <li>Namn: ${req.body.name}</li>
//      <li>Email: ${req.body.email}</li>
//      <li>Telefon: ${req.body.phone}</li>
//     </ul>
//     `;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MAIL,
//       pass: process.env.MAIL_PASS
//     }
//   });

//   const mailOptions = {
//     from: req.body.email, // sender address
//     to: process.env.MAIL, // list of receivers
//     subject: `${req.body.subject}`, // Subject line
//     html: output // plain text body
//   };

//   transporter.sendMail(mailOptions, function(err, info) {
//     if (err) {
//       req.flash("error", err);
//     }
//     req.flash("success", "👍");

//     res.redirect("back");
//   });
// };

// exports.sendMail = async (req, res) => {
//   const output = `
//     <p>Nytt meddelande</p>
//     <h3>Kontakt detalier</h3>
//     <ul>
//      <li>Namn: ${req.body.name}</li>
//      <li>Email: ${req.body.email}</li>
//      <li>Telefon: ${req.body.phone}</li>
//     </ul>
//     `;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MAIL,
//       pass: process.env.MAIL_PASS
//     }
//   });

//   const mailOptions = {
//     from: req.body.email, // sender address
//     to: process.env.MAIL, // list of receivers
//     subject: req.body.subject, // Subject line
//     html: output, // plain text body
//     attachments: [
//       {
//         filename: req.files["cv"][0].originalname,
//         content: new Buffer(req.files["cv"][0].buffer)
//       },
//       {
//         filename: req.files["pb"][0].originalname,
//         content: new Buffer(req.files["pb"][0].buffer)
//       }
//     ]
//   };
//   //  let cv = req.files['cv'].originalname.split(".");
//   //  let pb = req.files['pb'].originalname.split(".");
//   //  pb = pb[pb.length - 1];
//   //  cv = cv[cv.length - 1];
//   //  if (cv == "doc" || cv == "docx" || cv == "pdf") {

//   transporter.sendMail(mailOptions, function(err, info) {
//     if (err) {
//       req.flash("error", err);
//     }
//     req.flash("success", "👍");

//     res.redirect("back");
//   });
//   //  } else {
//   //    req.flash("error", "Filen måste vara av typ pdf, doc eller docx");
//   //    res.redirect("back");
//   //  }
// };
