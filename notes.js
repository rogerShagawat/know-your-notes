function generateRandomNote() {
    //Returns a number
    //E.g. 65 (which represents A)
    return Math.floor(Math.random() * 7) + 97;
}

function getCorrectNote() {
    const noteSrc = document.getElementById("note-image").src;
    const correctNote = noteSrc.split("/").pop().split("-")[0];
    return correctNote
}

function getRandomImageForClef() {
    noteName = String.fromCharCode(generateRandomNote());
    instrumentSelector = document.getElementById("instrument-selector");
    clef = (instrumentSelector.value) 
    console.log(noteName);
    document.getElementById("note-image").src = `assets/${noteName}-${clef}.png`;
}

window.onload = getRandomImageForClef();



var instrumentSelector = document.getElementById("instrument-selector");
instrumentSelector.addEventListener("change",getRandomImageForClef)