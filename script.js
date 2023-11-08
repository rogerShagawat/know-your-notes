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

function resetButtons() {
   // TODO reset the CSS of the buttons when failed
}

function runOnCorrect() {
   console.log("correct!");
   getRandomImageForClef();
   resetButtons();
   // TODO should display on screen positive affirmation
}

function runOnIncorrect() {
   console.log("failure!");
   // TODO change css of the buttons so that they're greyed out when gotten wrong
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

function myFunction() {
   document.getElementById("myDropdown").classList.toggle("show");
 }
 
 // Close the dropdown menu if the user clicks outside of it
//  window.onclick = function(event) {
//    if (!event.target.matches('.dropbtn')) {
//      var dropdowns = document.getElementsByClassName("dropdown-content");
//      var i;
//      for (i = 0; i < dropdowns.length; i++) {
//        var openDropdown = dropdowns[i];
//        if (openDropdown.classList.contains('show')) {
//          openDropdown.classList.remove('show');
//        }
//      }
//    }
//  }