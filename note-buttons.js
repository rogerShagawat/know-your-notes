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

function toggleButtonColors(showColor){
    console.log("hey")
    if(showColor){
        document.getElementById("a").style.backgroundColor = "indigo"
        document.getElementById("b").style.backgroundColor = "violet"
        document.getElementById("c").style.backgroundColor = "red"
        document.getElementById("d").style.backgroundColor = "orange"
        document.getElementById("e").style.backgroundColor = "yellow"
        document.getElementById("f").style.backgroundColor = "green"
        document.getElementById("g").style.backgroundColor = "blue"
    } else {
        for(let i = 0; i<=7;i++){
            document.getElementById(String.fromCharCode(i+97)).style.backgroundColor="lightgray"
        }
    }
}




var parent = document.getElementById("note-buttons");
parent.addEventListener("click", onNoteSelection);