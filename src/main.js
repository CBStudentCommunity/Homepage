function mobileCSS() {
  var theme = document.getElementsByTagName("link")[0];
  if (
    ("ontouchstart" in document && navigator.userAgent.match(/Android/i)) ||
    navigator.userAgent.match(/iPhone/i)
  ) {
    theme.setAttribute("href", "src/mobile.css");
  } else {
    theme.setAttribute("href", "src/desktop.css");
  }
}
