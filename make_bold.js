window.onload = function() {
    let contentDiv = document.getElementById("content");
    let text = contentDiv.innerHTML;

    // Replace the word "sample" with "<strong>sample</strong>"
    let newText = text.replace(/David/g, "<strong>$&</strong>");

    contentDiv.innerHTML = newText;
}