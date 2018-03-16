var ScreenReader = function () {
  
  var speechSynthesis = window.mozSpeechSynthesis || window.msSpeechSynthesis || window.oSpeechSynthesis || window.webkitSpeechSynthesis || window.speechSynthesis,
    ss, isResult = false;
  
  var voices = [];
  
  if (speechSynthesis === undefined) {
    alert('Your browser don\'t support Web Speech Synthesis API. We recommend using chrome browser.');
    return;
  }
  
  function populateVoiceList() {
    voices = speechSynthesis.getVoices();
  }
  
  populateVoiceList();
  
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  
  function start(text, params) {
    
    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.pitch = params.pitch || 1;
    utterThis.rate = params.rate || 1;
    utterThis.voice = params.voice || 'English';
    speechSynthesis.speak(utterThis);
    
    utterThis.onend = function (event) {
      console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };
    utterThis.onpause = function (event) {
      var char = event.utterance.text.charAt(event.charIndex);
      console.log('Speech paused at character ' + event.charIndex + ' of "' +
        event.utterance.text + '", which is "' + char + '".');
    };
    
  };
  
  function readIt(text) {
    event.preventDefault();
    
    // var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    var selectedOption = 'Samantha';
    var params = {
      voice: null,
      rate: 1,
      pitch: 1
    };
    
    for (i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        params.voice = voices[i];
      }
    }
    
    if (!params.voice) {
      params.voice = voices[1];
    }
    
    start(text, params);
    
    return false;
  }
  
  return {
    read: readIt
  }
};
