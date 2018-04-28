exports.dump = obj => JSON.stringify(obj, null, 2);

exports.menu = [
  { slug: "/", title: "Home" },
  { slug: "/find-jobs", title: "Find Job" },
  { slug: "/find-staff", title: "Find staff" }
];

exports.cities = [
  { slug: "/cities/aten", title: "Jobba i Aten" },
  { slug: "/cities/st_julians", title: "Jobba på Malta" },
  { slug: "/cities/lissabon", title: "Jobba i Lissabon" }
];
