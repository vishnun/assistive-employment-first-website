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
    el.click();
  } else if (ariaEl.length > 0) {
    ariaEl.click();
  } else {
    $(":contains(" + content + ")").toArray().forEach(function (el) {
      $(el)[0].click();
    });
  }
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
      if (response == "") {
        response = data['result']['fulfillment']['messages'][1]['speech'];
      }
      
      if (data['result']['action'] == "click-action") {
        performClickOn(response);
      }
    },
    error: function () {
      console.log("Internal server error")
    }
  });
}
