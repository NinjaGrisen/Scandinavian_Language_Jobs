exports.dump = obj => JSON.stringify(obj, null, 2);

exports.menu = [
  { slug: "/", title: "Hem" },
  { slug: "/find-jobs", title: "Lediga jobb" },
  { slug: "/find-staff", title: "For employers" }
];

exports.cities = [
  { slug: "/cities/aten", title: "Jobba i Aten" },
  { slug: "/cities/st_julians", title: "Jobba på Malta" },
  { slug: "/cities/lissabon", title: "Jobba i Lissabon" }
];
