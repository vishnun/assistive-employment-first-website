$(function () {
  bindCalendarButtons();
  bindAssistiveSupportButtons();
  initScreenReader();
});

function initScreenReader() {
  var reader = new ScreenReader();
  var readEls = $("[data-reader-text]");
  
  readEls.on('mouseenter', function () {
    var text = $(this).data('reader-text') || $(this).text();
    if (Settings.isScreenReaderToggledOn()) {
      reader.read(text);
    }
  });
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
  
  
  $('#screen-reader-toggle').on('click', function () {
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
  
  $('#zoom-out-text').on('click', function () {
    var currentFontSize = $rootEl.css('font-size');
    if (parseInt(currentFontSize) === 12) {
      return;
    }
    $rootEl.css('font-size', parseInt(currentFontSize) - 1 + 'px');
    Settings.updateFontSize($rootEl.css('font-size'));
  });
  
}
