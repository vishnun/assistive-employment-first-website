// The main.js file has code which handles the initiation of interactions on the website.
$(function () {
  bindCalendarButtons();
  bindAssistiveSupportButtons();
  initScreenReader();
});

function bindFaceAndColorTracker() {
  var mouse = $("#assistive-arrow");
  var pointer = $('#object-pointer');
  var helpCenter = $('.controls-help');
  var $faceTrackerToggle = $('#toggle-face-tracker');
  var $colorTrackerToggle = $('#toggle-color-tracker');
  var videoContainer = $('.video-container');
  var $assistiveDrawer = $('.ef-assistive-drawer');
  
  function setupVisualsForTracking() {
    videoContainer.show();
    pointer.show();
    mouse.show();
    helpCenter.show();
  }
  
  function stopTracking() {
    videoContainer.hide();
    pointer.hide();
    mouse.hide();
    helpCenter.hide();
  }
  
  $faceTrackerToggle.on('change', function () {
    if ($(this).prop('checked')) {
      Settings.updateFaceTracker("true");
      setupVisualsForTracking();
      trackFace(mouse, pointer);
    } else {
      Settings.updateFaceTracker("false");
      stopTracking();
      location.reload();
    }
    $assistiveDrawer.toggleClass('show');
  });
  
  $colorTrackerToggle.on('change', function () {
    if ($(this).prop('checked')) {
      Settings.updateColorTracker("true");
      setupVisualsForTracking();
      trackColor(mouse, pointer);
    } else {
      Settings.updateColorTracker("false");
      stopTracking();
      location.reload();
    }
    $assistiveDrawer.toggleClass('show');
  });
  
  if (Settings.isFaceTrackerToggledOn()) {
    setupVisualsForTracking();
    trackFace(mouse, pointer);
    $faceTrackerToggle.prop('checked', true);
  } else if (Settings.isColorTrackerToggledOn()) {
    setupVisualsForTracking();
    trackColor(mouse, pointer);
    $colorTrackerToggle.prop('checked', true);
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
  var $assistiveDrawer = $('.ef-assistive-drawer');
  
  $('.assistive-support').on('click', function () {
    $assistiveDrawer.toggleClass('show');
  });
  
  $('#screen-reader-toggle').on('change', function () {
    Settings.toggleScreenReader();
    initScreenReader();
  });
  
  bindFaceAndColorTracker();
  
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


