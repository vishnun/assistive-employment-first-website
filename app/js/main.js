$(function () {
  bindCalendarButtons();
  bindAssistiveSupportButtons();
  initScreenReader();
});

function initScreenReader() {
  var reader = new ScreenReader();
  
  var readEls = $("[data-reader-text]");
  

    var readElCallback = function (e) {
        var text = $(this).data('reader-text') || $(this).text();
        var readerRate = parseInt(localStorage.getItem("readerRate"));
        if (Settings.isScreenReaderToggledOn()) {
            reader.read(text,readerRate);
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
