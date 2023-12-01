let totalIncorrect = 0;
let totalCorrect = 0;
let currentNote = 0;
let isFirstClick = true;

function generateRandomNote() {
   //Returns a number
   //E.g. 65 (which represents A)
   return Math.floor(Math.random() * 7) + 97;
}

function setMessage(message) {
   let messageElement = document.getElementById("message");
   messageElement.classList.remove(["visible"]);
   messageElement.classList.add(["hidden"]);
   messageElement.innerText = message;
}

function getRandomImageForClef() {
   accidental = 0;

   var accidentalModeCheckbox = document.getElementById("accidentals");

   if (accidentalModeCheckbox.checked) {
      //natural = 0, flat = 1, sharp =2
      accidental = Math.floor(Math.random() * 3);
   }
   noteName = String.fromCharCode(generateRandomNote());
   instrumentSelector = document.getElementById("instrument-selector");
   clef = instrumentSelector.value;
   console.log(noteName);
   currentNote = noteName;

   if (accidental == 0) {
      document.getElementById(
         "note-image"
      ).src = `assets/${noteName}-${clef}.png`;
   } else if (accidental == 1) {
      document.getElementById(
         "note-image"
      ).src = `assets/${noteName}-flat-${clef}.png`;
   } else if (accidental == 2) {
      document.getElementById(
         "note-image"
      ).src = `assets/${noteName}-sharp-${clef}.png`;
   }
}

function updateCounters() {
   let correctCounter = document.getElementById("correct-counter");
   let incorrectCounter = document.getElementById("incorrect-counter");
   correctCounter.innerHTML = `Correct: ${totalCorrect}`;
   incorrectCounter.innerHTML = `Incorrect: ${totalIncorrect}`;
}

function toggleButtonColors() {
   console.log("hey");
   if (this.checked) {
      document.getElementById("a").style.backgroundColor = "indigo";
      document.getElementById("b").style.backgroundColor = "violet";
      document.getElementById("c").style.backgroundColor = "red";
      document.getElementById("d").style.backgroundColor = "orange";
      document.getElementById("e").style.backgroundColor = "yellow";
      document.getElementById("f").style.backgroundColor = "green";
      document.getElementById("g").style.backgroundColor = "blue";
   } else {
      document.getElementById("a").style.backgroundColor = "lightgray";
      document.getElementById("b").style.backgroundColor = "lightgray";
      document.getElementById("c").style.backgroundColor = "lightgray";
      document.getElementById("d").style.backgroundColor = "lightgray";
      document.getElementById("e").style.backgroundColor = "lightgray";
      document.getElementById("f").style.backgroundColor = "lightgray";
      document.getElementById("g").style.backgroundColor = "lightgray";
      // for (let i = 0; i <= 7; i++) {
      //    document.getElementById(
      //       String.fromCharCode(i + 97)
      //    ).style.backgroundColor = "lightgray";
      // }
   }
}

function onNoteSelection(event) {
   if (isFirstClick) {
      // TODO start the timer
      timer = true;
      stopWatch(); // in timer.js
      isFirstClick = false;
   }

   var selectedNote = event.target.id;
   if (selectedNote === currentNote) {
      // Correct
      totalCorrect++;
      setMessage(`Correct!`);
   } else {
      // Incorrect
      totalIncorrect++;
      setMessage(`Sorry, the correct note was ${currentNote.toUpperCase()}`);
   }

   getRandomImageForClef();
   updateCounters();
}

// Listeners/Events

function settingsDropdownEvent() {
   document.getElementById("myDropdown").classList.toggle("show");
}

window.onload = getRandomImageForClef();

var noteButtons = document.getElementById("note-buttons");
noteButtons.addEventListener("click", onNoteSelection);

var instrumentSelector = document.getElementById("instrument-selector");
instrumentSelector.addEventListener("change", getRandomImageForClef);

var colorCheckbox = document.getElementById("color-notes");
colorCheckbox.addEventListener("click", toggleButtonColors);
