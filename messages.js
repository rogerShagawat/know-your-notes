function setMessage(message) {
    document.getElementById("message").innerText = message
 
 }
 function clearMessage() {
    setMessage("")
 }
 
 function showCorrectMessage() {
    setMessage("Correct!")
 }
 
 function showIncorrectMessage(){
    setMessage(`Sorry, the correct note is ${correctNote.toUpperCase()}`)
 }