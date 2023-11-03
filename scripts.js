// script.js
function toggleContent(contentID) {
  var content = document.getElementById(contentID);
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}