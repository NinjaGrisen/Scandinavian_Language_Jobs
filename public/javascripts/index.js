var toggleMenuBtn = document.querySelector(".toggle-menu");
var menu = document.querySelector(".header");

toggleMenuBtn.addEventListener("click", function(e) {
  menu.classList.toggle("active");
  e.currentTarget.classList.toggle("active");
});
