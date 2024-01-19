var isWhite = false;
function changeColor() {
    if (isWhite) {
        document.body.style.backgroundColor = "#4b4b4bdc";
        isWhite = false;
    } else {
        document.body.style.backgroundColor = "white";
        isWhite = true;
    }
}