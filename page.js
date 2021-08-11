
//
// Init UI
//

storageToList();
updateVoicesUI();
window.addEventListener("voicesupdated", () => updateVoicesUI());



//
// Event Listeners
//

document.querySelector("#demo").addEventListener("click", () => demo());
document.querySelector("#bell").addEventListener("click", () => bell());
document.querySelector("#voice").addEventListener("click", () => voice());
document.querySelector("#stop").addEventListener("click", () => stop());


document.querySelector("#rate").addEventListener("input", () => {
  // Get rate Value from the input
  const rate = document.querySelector("#rate").value;

  // Set rate property of the SpeechSynthesisUtterance instance
  speech.rate = rate;

  // Update the rate label
  document.querySelector("#rate-label").innerHTML = rate;
});

document.querySelector("#pitch").addEventListener("input", () => {
  // Get pitch Value from the input
  const pitch = document.querySelector("#pitch").value;

  // Set pitch property of the SpeechSynthesisUtterance instance
  speech.pitch = pitch;

  // Update the pitch label
  document.querySelector("#pitch-label").innerHTML = pitch;
});

document.querySelector("#voices").addEventListener("change", () => {
  // On Voice change, use the value of the select menu (which is the index of the voice in the global voice array)
  speech.voice = voices[document.querySelector("#voices").value];
});

document.querySelector("#add").addEventListener("click", () => {
  var option = document.createElement("option");
  option.text = document.querySelector("textarea").value;
  document.querySelector("#selector").add(option);
  listToStorage();
  activateTab("#storage-tab");
});

document.querySelector("#edit").addEventListener("click", () => {
  edit();
  activateTab("#speakit-tab");
});

document.querySelector("#selector-bell").addEventListener("click", () => {
  edit();
  bell();
});

document.querySelector("#selector-voice").addEventListener("click", () => {
  edit();
  voice();
});

document.querySelector("#delete").addEventListener("click", () => {
  var sel = document.querySelector("#selector");
  sel.options[sel.selectedIndex].remove();
  listToStorage();
});




//
// Functions: SOUND
//

function demo() {
  document.querySelector("textarea").value = "This is a demonstration. You can change this voice, and customize the text.";
  bell();
}

function voice() {
  speak(document.querySelector("textarea").value);
}

function bell() {
  bellAndSpeak(document.querySelector("textarea").value);
}


//
// Functions: UI
//

function updateVoicesUI() {
  // Set the Voice Select List. (Set the Index as the value, which we'll use later when the user updates the Voice using the Select Menu.)
  let voiceSelect = document.querySelector("#voices");
  voices.forEach((voice, i) => (voiceSelect.options[i] = new Option(voice.name, i)));
}

function activateTab(tabName) {
  var sel = document.querySelector(tabName);
  var tab = bootstrap.Tab.getOrCreateInstance(sel);
  tab.show();
}

function edit() {
  var sel = document.querySelector("#selector");
  document.querySelector("textarea").value = sel.options[sel.selectedIndex].text;
}

function listToStorage() {
	var sel = document.querySelector("#selector");

	var vals = [];
	for (var i = 0;i < sel.options.length; i++) {
		vals.push(sel.options[i].value);
	}
	localStorage.setItem("strings", JSON.stringify(vals));
}

function storageToList() {
	if (localStorage.getItem("strings") == null)
		return;
	var strings = JSON.parse(localStorage.getItem("strings"));
	for (i = 0; i < strings.length; i++) {
		var option = document.createElement("option");
		option.text = strings[i];
		document.querySelector("#selector").add(option);
	}
}



//
// Functions: UI
//

function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}
