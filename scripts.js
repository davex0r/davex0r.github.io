// script.js
function toggleContent() {
  var content = document.getElementById('expandableContent');
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}