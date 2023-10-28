
function generateRandomNote() {
    //Returns a number
    //E.g. 65 (which represents A)
    return (Math.floor(Math.random() * 7) + 97)
}

window.onload = function getRandomImageForClef() {
    noteName = String.fromCharCode(generateRandomNote())
    clef = "treble"
    console.log(noteName)
    document.getElementById("note-image").src = `assets/${noteName}-${clef}.png`;
}

