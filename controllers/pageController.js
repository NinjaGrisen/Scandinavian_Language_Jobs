const jobs = require("../public/data/arbete");
const cities = require("../public/data/cities");

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
