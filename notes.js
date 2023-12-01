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
    accidental = 0;

    var accidentalModeCheckbox = document.getElementById("accidentals");

    if(accidentalModeCheckbox.checked){
        //natural = 0, flat = 1, sharp =2
        accidental =  Math.floor(Math.random() * 3);
    }
    noteName = String.fromCharCode(generateRandomNote());
    instrumentSelector = document.getElementById("instrument-selector");
    clef = (instrumentSelector.value) 
    console.log(noteName);

    if(accidental ==0) {
        document.getElementById("note-image").src = `assets/${noteName}-${clef}.png`;
    } else if (accidental ==1){
        document.getElementById("note-image").src = `assets/${noteName}-flat-${clef}.png`;

    } else if (accidental ==2){
        document.getElementById("note-image").src = `assets/${noteName}-sharp-${clef}.png`;

    }
    
}

function toggleAccidentalMode(){
    var accidentalModeCheckbox = document.getElementById("accidentals");

if(!accidentalModeCheckbox.checked) {
        
        sharps = document.getElementById("note-buttons-sharps")
        sharps.style.visibility = 'hidden'
       
        flats = document.getElementById("note-buttons-flats")
        flats.style.visibility = 'hidden';
    } else {
        
        sharps = document.getElementById("note-buttons-sharps")
        sharps.style.visibility = 'visible'
        
        flats = document.getElementById("note-buttons-flats")
        flats.style.visibility = 'visible';
    }

}

window.onload = getRandomImageForClef();


var accidentalModeCheckbox = document.getElementById("accidentals");
accidentalModeCheckbox.addEventListener("change", toggleAccidentalMode)

var instrumentSelector = document.getElementById("instrument-selector");
instrumentSelector.addEventListener("change",getRandomImageForClef)

