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

window.onload = function getRandomImageForClef() {
   noteName = String.fromCharCode(generateRandomNote());
   clef = "treble";
   console.log(noteName);
   document.getElementById("note-image").src = `assets/${noteName}-${clef}.png`;
};