document.querySelector("html").classList.add("js");

var fileInput = document.querySelector(".input-file"),
  button = document.querySelector(".input-file-trigger"),
  the_return = document.querySelector(".file-return");
submit_btn = document.querySelector(".submit-btn");
overlay = document.querySelector(".overlay");
spinner = document.querySelector(".spanner");

button.addEventListener("keydown", function (event) {
  if (event.keyCode == 13 || event.keyCode == 32) {
    fileInput.focus();
  }
});
button.addEventListener("click", function (event) {
  fileInput.focus();
  return false;
});
fileInput.addEventListener("change", function (event) {
  the_return.innerHTML = this.value;
});
button.addEventListener("click", function (event) {
  overlay.classList.add(".show");
  spinner.classList.add(".show");
  return false;
});
