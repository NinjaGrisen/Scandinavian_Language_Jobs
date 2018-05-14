var toggleMenuBtn = document.querySelector(".toggle-menu");
var menu = document.querySelector(".header");
var gdprSpan = document.querySelectorAll(".gdpr__span");
var gdprModule = document.querySelector(".gdpr__module");
var body = document.querySelector("body");
var closeGdprModule = document.querySelector(".gdpr__module button");

if (gdprSpan.length > 0) {
  for (var i = 0; i < gdprSpan.length; i++) {
    gdprSpan[i].addEventListener("click", function() {
      gdprModule.classList.add("gdpr__module__display");
      body.classList.add("module-active");
    });
  }

  closeGdprModule.addEventListener("click", function() {
    gdprModule.classList.remove("gdpr__module__display");
    body.classList.remove("module-active");
  });
}

toggleMenuBtn.addEventListener("click", function(e) {
  menu.classList.toggle("active");
  e.currentTarget.classList.toggle("active");
});
