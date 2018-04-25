// DialogFlow is used to handle the machine learning way of extracting useful information from the voice commands.

// It uses speech recognition to get the user command and sends it to dialog flow to extract the keywords used for interaction on the browser.

var accessToken = "a364a593a00349f1ba80c89172914701";
var baseUrl = "https://api.api.ai/v1/";

var recognition;
var SpeechGrammarList;

$(document).ready(function () {
  
  var SPACE_KEY = 32, ENTER_KEY = 13;
  
  $('body').keypress(function (event) {
    if (event.which === SPACE_KEY) {
      event.preventDefault();
      switchRecognition();
    }
  });
  
  // $("#rec").click(function(event) {
  //   switchRecognition();
  // });
  
  $('#rec').on('click', function () {
    send("Help");
  });
});


function startRecognition() {
  recognition = new webkitSpeechRecognition();
  SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
  
  recognition.onstart = function (event) {
    updateRec();
  };
  
  recognition.onresult = function (event) {
    var text = "";
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      text += event.results[i][0].transcript;
    }
    send(text);
    stopRecognition();
  };
  recognition.onend = function () {
    stopRecognition();
  };
  recognition.lang = "en-US";
  recognition.start();
}

function stopRecognition() {
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
  updateRec();
}

function switchRecognition() {
  if (recognition) {
    stopRecognition();
  } else {
    startRecognition();
  }
}

function updateRec() {
  $("#rec").text(recognition ? "Stop" : "Speak");
}

function performClickOn(content) {
  var el = $(".clickable:contains(" + content + ")");
  var ariaEl = $(".clickable[aria-label*='" + content + "']");
  if (el.length > 0) {
    el.get(0).click();
  } else if (ariaEl.length > 0) {
    ariaEl.get(0).click();
  } else {
    $(":contains(" + content + ")").toArray().forEach(function (el) {
      $(el)[0].click();
    });
  }
}

function scrollToBottom(){
  $("html, body").animate({ scrollTop: document.body.scrollHeight });
}

function scrollToTop(){
  $("html, body").animate({ scrollTop: -document.body.scrollHeight });
}

function scrollDown() {
  window.scrollBy({
    top: 300,
    left: 0,
    behavior: 'smooth'
  });
}

function scrollUp() {
  window.scrollBy({
    top: -300,
    left: 0,
    behavior: 'smooth'
  });
}

function scrollRight() {
  window.scrollBy({
    top: 0,
    left: 50,
    behavior: 'smooth'
  });
}

function scrollLeft() {
  window.scrollBy({
    top: 0,
    left: -50,
    behavior: 'smooth'
  });
}

function performScrollOn(scrollOption) {
  var scrollMethod = {
    top: scrollToTop,
    bottom: scrollToBottom,
    down: scrollDown,
    up: scrollUp,
    left: scrollLeft,
    right: scrollRight
  };
  scrollMethod[scrollOption].call();
}

function send(text) {
  $.ajax({
    type: "POST",
    url: baseUrl + "query?v=20180308",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + accessToken
    },
    data: JSON.stringify({
      query: text,
      lang: "en",
      sessionId: "ksksksksks"
    }),
    
    success: function (data) {
      // console.log(data);
      response = data['result']['fulfillment']['speech'];
      if (response === "") {
        response = data['result']['fulfillment']['messages'][1]['speech'];
      }
      
      if (data['result']['action'] === "click-action") {
        performClickOn(response);
      }
      if(data['result']['action'] === "scroll-action") {
        performScrollOn(response);
      }
    },
    error: function () {
      console.log("Internal server error")
    }
  });
}
