function generateRandomNote() {
   //Returns a number
   //E.g. 65 (which represents A)
   return Math.floor(Math.random() * 7) + 97;
}

function isCorrect(selectedNote) {
   const noteSrc = document.getElementById("note-image").src;
   const correctNote = noteSrc.split("/").pop().split("-")[0];
   if (selectedNote !== correctNote) {
      return false;
   }
   return true;
}

function resetButtons() {}

function runOnCorrect() {
   console.log("correct!");
   getRandomImageForClef();
}

function runOnIncorrect() {
   console.log("failure!");
}

function onNoteSelection(event) {
   var selectedNote = event.target.id;
   if (isCorrect(selectedNote)) {
      runOnCorrect();
   } else {
      runOnIncorrect();
   }
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
