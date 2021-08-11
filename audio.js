
//
// Init Audio
//

let speech = new SpeechSynthesisUtterance();
speech.lang = "en";
let voices = [];
// Timer
let timerVoice = null;
// Our custom voice-related event
var onvoicesupdated = new CustomEvent("voicesupdated");
updateVoicesList();
window.speechSynthesis.onvoiceschanged = () => updateVoicesList();


// 
// Functions: List
//

function updateVoicesList() {
  // Get List of Voices
  voices = window.speechSynthesis.getVoices();

  // Initially set the First Voice in the Array.
  speech.voice = voices[0];
  window.dispatchEvent(onvoicesupdated);
}



//
// Functions: Audio
//

function stop() {
  // Cancel the speechSynthesis instance
  window.speechSynthesis.cancel();

  if (timerVoice != null) {
    clearTimeout(timerVoice);
  }
}

function speak(text) {
  // Set the text property with the value of the textarea
  speech.text = text;

  // Start Speaking
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

function bellAndSpeak(text) {
  var audio = new Audio('bell.mp3');
  audio.play();
  timerVoice = setTimeout(function() { speak(text) }, 2500);
}
