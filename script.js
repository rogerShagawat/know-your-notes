let totalIncorrect = 0;
let totalCorrect = 0;
let currentNote = 0;
let isFirstClick = true;

function generateRandomNote(isAccidentalOn) {
   //Returns a number
   //E.g. 65 (which represents A)
   const noteLetter = String.fromCharCode(Math.floor(Math.random() * 7) + 97);
   if (isAccidentalOn) {
      const accidentalness = Math.floor(Math.random() * 3);
      if (accidentalness === 0) {
         return `${noteLetter}`;
      } else if (accidentalness === 1) {
         return `${noteLetter}-flat`;
      } else {
         return `${noteLetter}-sharp`;
      }
   } else {
      return noteLetter;
   }
}

function setMessage(message) {
   document.getElementById("message").remove();
   let messageContainer = document.getElementById("message-container");
   let messageElement = document.createElement("h2");
   messageElement.innerHTML = message;
   messageElement.id = "message";
   messageContainer.appendChild(messageElement);
}

function getRandomImageForClef() {
   let isAccidentalOn = false;

   var accidentalModeCheckbox = document.getElementById("accidentals");

   if (accidentalModeCheckbox.checked) {
      //natural = 0, flat = 1, sharp =2
      isAccidentalOn = true;
   }
   noteName = generateRandomNote(isAccidentalOn);
   let instrumentSelector = document.getElementById("instrument-selector");
   clef = instrumentSelector.value;
   console.log(noteName);
   currentNote = noteName;

   document.getElementById("note-image").src = `assets/${noteName}-${clef}.png`;
}

function updateCounters() {
   let correctCounter = document.getElementById("correct-counter");
   let incorrectCounter = document.getElementById("incorrect-counter");
   correctCounter.innerHTML = `Correct: ${totalCorrect}`;
   incorrectCounter.innerHTML = `Incorrect: ${totalIncorrect}`;
}

function toggleButtonColors() {
   if (document.getElementById("color-notes").checked) {
      Object.keys(buttonNotes).forEach((button) =>
         buttonNotes[button].classList.remove("uncolored")
      );
      // document.getElementById("a").style.backgroundColor = "indigo";
      // document.getElementById("b").style.backgroundColor = "violet";
      // document.getElementById("c").style.backgroundColor = "red";
      // document.getElementById("d").style.backgroundColor = "orange";
      // document.getElementById("e").style.backgroundColor = "yellow";
      // document.getElementById("f").style.backgroundColor = "green";
      // document.getElementById("g").style.backgroundColor = "blue";
   } else {
      Object.keys(buttonNotes).forEach((button) =>
         buttonNotes[button].classList.add("uncolored")
      );
   }
}

function onNoteSelection(event) {
   if (isFirstClick) {
      timer = true;
      stopWatch(); // in timer.js
      isFirstClick = false;
   }

   var selectedNote = event.target.id;
   console.log(selectedNote);
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

function toggleAccidentalVisibility() {
   getRandomImageForClef();
   console.log(`Checked: ${document.getElementById("accidentals").checked}`);
   if (document.getElementById("accidentals").checked) {
      Object.keys(buttonNotes).forEach((button) => {
         if (
            button.toLowerCase().includes("sharp") ||
            button.toLowerCase().includes("flat")
         )
            buttonNotes[button].style.visibility = "visible";
      });
   } else {
      Object.keys(buttonNotes).forEach((button) => {
         if (
            button.toLowerCase().includes("sharp") ||
            button.toLowerCase().includes("flat")
         )
            buttonNotes[button].style.visibility = "hidden";
      });
   }
}

// Listeners/Events

function settingsDropdownEvent() {
   document.getElementById("myDropdown").classList.toggle("show");
}

window.onload = getRandomImageForClef();
window.onload = toggleAccidentalVisibility();
window.onload = toggleButtonColors();

// let noteButtons = document.getElementById("all-note-buttons");
// noteButtons.addEventListener("click", onNoteSelection);
let noteButtons = document.querySelectorAll(".note.btn");
noteButtons.forEach((button) =>
   button.addEventListener("click", onNoteSelection)
);

let instrumentSelector = document.getElementById("instrument-selector");
instrumentSelector.addEventListener("change", getRandomImageForClef);

let colorCheckbox = document.getElementById("color-notes");
colorCheckbox.addEventListener("change", toggleButtonColors);

let accidentalsCheckbox = document.getElementById("accidentals");
accidentalsCheckbox.addEventListener("change", toggleAccidentalVisibility);

document.getElementById("reset").addEventListener("click", () => {
   totalIncorrect = 0;
   totalCorrect = 0;
   isFirstClick = true;
   updateCounters();
});
