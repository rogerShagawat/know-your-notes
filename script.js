let totalIncorrect = 0;
let totalCorrect = 0;
let currentNote = "";
let isFirstClick = true;
let isDropDownOpen = false;
let currentClef = "treble";

function generateRandomNote(isAccidentalOn) {
   const noteLetter = String.fromCharCode(Math.floor(Math.random() * 7) + 97);
   let note = noteLetter;
   if (isAccidentalOn) {
      const accidentalness = Math.floor(Math.random() * 3);
      if (accidentalness === 0) {
         note = `${noteLetter}`;
      } else if (accidentalness === 1) {
         note = `${noteLetter}-flat`;
      } else {
         note = `${noteLetter}-sharp`;
      }
   }
   if (note === currentNote) {
      note = generateRandomNote(isAccidentalOn);
   }
   return note;
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

   renderNote(noteName, clef);

   console.log(noteName);
   currentNote = noteName;

   // document.getElementById("note-image").src = `assets/${noteName}-${clef}.png`;
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
   } else {
      Object.keys(buttonNotes).forEach((button) =>
         buttonNotes[button].classList.add("uncolored")
      );
   }
}

function onNoteSelection(event) {
   if (isFirstClick) {
      timer = true;
      startTimer(); // in timer.js
      isFirstClick = false;
   }

   var selectedNote = event.target.id;
   // console.log(selectedNote);
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
   // console.log(`Checked: ${document.getElementById("accidentals").checked}`);
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
   let drop = document.getElementById("myDropdown");
   // console.log("here");
   drop.classList.toggle("show");
   if (drop.classList.value.includes("show")) {
      isDropDownOpen = true;
   } else {
      isDropDownOpen = false;
   }
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

function clickOffDropdown(event) {
   const target = event.target.closest("#dropdown");
   if (!target && isDropDownOpen) {
      document.getElementById("myDropdown").classList.toggle("show");
      isDropDownOpen = false;
   }
}

window.addEventListener("click", clickOffDropdown);

function renderNote(note, clef) {
   console.log(`${note}, ${clef}`);
   const { Accidental, Formatter, Renderer, Stave, StaveNote } = Vex.Flow;
   const noteDict = {
      a: new StaveNote({
         keys: [`a/4`],
         duration: "q",
      }),
      b: new StaveNote({
         keys: [`b/4`],
         duration: "q",
      }),
      c: new StaveNote({
         keys: [`c/5`],
         duration: "q",
      }),
      d: new StaveNote({
         keys: [`d/5`],
         duration: "q",
      }),
      e: new StaveNote({
         keys: [`e/5`],
         duration: "q",
      }),
      f: new StaveNote({
         keys: [`f/4`],
         duration: "q",
      }),
      g: new StaveNote({
         keys: [`g/4`],
         duration: "q",
      }),
   };

   // Create an SVG renderer and attach it to the DIV element named "boo".
   const div = document.getElementById("output");
   while (div.hasChildNodes()) {
      div.removeChild(div.lastChild);
   }
   let renderer = new Renderer(div, Renderer.Backends.SVG);
   // renderer.
   // Configure the rendering context.
   renderer.resize(300, 300);
   const context = renderer.getContext();
   context.setFont("Arial", 10);
   context.scale(2.5, 2.5);

   // Create a stave of width 400 at position 10, 40 on the canvas.
   const stave = new Stave(10, 10, 100);

   // Add a clef.
   stave.addClef(clef);

   // Connect it to the rendering context and draw!
   stave.setContext(context).draw();

   let splitNote = note.split("-");
   let staveNote = noteDict[splitNote[0]];

   if (splitNote[1]) {
      if (splitNote[1] === "flat") {
         staveNote.addModifier(new Accidental("b"), 0);
      } else if (splitNote[1] === "sharp") {
         staveNote.addModifier(new Accidental("#"), 0);
      }
   }

   let notes = [staveNote];
   // }

   // Helper function to justify and drawe.
   Formatter.FormatAndDraw(context, stave, notes);
}
