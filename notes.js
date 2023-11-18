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
function isCorrect(selectedNote) {
    correctNote = getCorrectNote()
    if (selectedNote !== correctNote) {
        return false;
    }
    return true;
}

function resetButtons() {
    // TODO reset the CSS of the buttons when failed
}



function runOnCorrect() {
    showCorrectMessage();

    // TODO should display on screen positive affirmation
}

function runOnIncorrect() {
    showIncorrectMessage()
    // TODO change css of the buttons so that they're greyed out when gotten wrong
}

function onNoteSelection(event) {
    var selectedNote = event.target.id;
    if (isCorrect(selectedNote)) {
        runOnCorrect();
    } else {
        runOnIncorrect();
    }
    console.log("here")
    setTimeout(() => {
        console.log("Delayed for 3 second.");
        getRandomImageForClef();
        resetButtons();
        clearMessage();
    }, 3000);
}
function getRandomImageForClef() {
    noteName = String.fromCharCode(generateRandomNote());
    clef = "treble";
    console.log(noteName);
    document.getElementById("note-image").src = `assets/${noteName}-${clef}.png`;
}

window.onload = getRandomImageForClef();

var parent = document.getElementById("note-buttons");
parent.addEventListener("click", onNoteSelection);
