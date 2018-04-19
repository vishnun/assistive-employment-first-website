$(function () {
  bindCalendarButtons();
  bindAssistiveSupportButtons();
  initScreenReader();
  initFaceTracker();
});

function initFaceTracker() {
  var mouse = $("#assistive-arrow");
  var pointer = $('#object-pointer');
  var helpCenter = $('.controls-help');
  var $faceTrackerToggle = $('#toggle-face-tracker');
  var videoContainer = $('.video-container');
  
  function startFaceTracking() {
    videoContainer.show();
    pointer.show();
    mouse.show();
    helpCenter.show();
    trackFace(mouse, pointer);
  }
  
  function stopFaceTracking() {
    videoContainer.hide();
    pointer.hide();
    mouse.hide();
    helpCenter.hide();
  }
  
  $faceTrackerToggle.on('change', function () {
    if ($(this).prop('checked')) {
      Settings.updateFaceTracker("true");
      startFaceTracking();
    } else {
      Settings.updateFaceTracker("false");
      stopFaceTracking();
      location.reload();
    }
  });
  
  if (Settings.isFaceTrackerToggledOn()) {
    startFaceTracking();
    $faceTrackerToggle.prop('checked', true);
  }
}

function initScreenReader() {
  var reader = new ScreenReader();
  
  var readEls = $("[data-reader-text]");
  
  var readElCallback = function (e) {
    if (Settings.isScreenReaderToggledOn()) {
      var text = $(this).data('reader-text') || $(this).text();
      var readerRate = parseFloat(localStorage.getItem("readerRate"));
      reader.read(text, parseFloat(readerRate));
    }
  };
  readEls.on('mouseenter', _.debounce(readElCallback, 1000));
}

function bindCalendarButtons() {
  $('.expand-calendar').on('click', function () {
    $('.ef-calendar').toggleClass('show');
  });
  
  $('.close-button').on('click', function () {
    $('.ef-calendar').toggleClass('show');
  });
  
}


function bindAssistiveSupportButtons() {
  var $rootEl = $('html');
  
  $('.assistive-support').on('click', function () {
    $('.ef-assistive-drawer').toggleClass('show');
  });
  
  
  $('#screen-reader-toggle').on('change', function () {
    Settings.toggleScreenReader();
    initScreenReader();
  });
  
  $('#zoom-in-text').on('click', function () {
    var currentFontSize = $rootEl.css('font-size');
    if (parseInt(currentFontSize) === 20) {
      return;
    }
    $rootEl.css('font-size', parseInt(currentFontSize) + 1 + 'px');
    Settings.updateFontSize($rootEl.css('font-size'));
  });
  $('#changeReaderRange').on('change', function () {
    var val = $(this).val();
    Settings.changeReaderSettings(val);
  });
  
  $('#zoom-out-text').on('click', function () {
    var currentFontSize = $rootEl.css('font-size');
    if (parseInt(currentFontSize) === 12) {
      return;
    }
    $rootEl.css('font-size', parseInt(currentFontSize) - 1 + 'px');
    Settings.updateFontSize($rootEl.css('font-size'));
  });
  
}


