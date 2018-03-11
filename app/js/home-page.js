$(function() {
  if ($('#home-page').length === 0) {
    return;
  }

  $('.role-selection').hide();

  $('#get-started').on('click', function() {
    $(this).hide();
    $('.role-selection').show();
  });


  var reader = new ScreenReader();

  var readEls = $("[data-reader-text]");

  readEls.on('mouseenter', function() {
    var text = $(this).data('reader-text');
    // If the assistive support toggle is ON (from cookies or local storage) else return
    reader.read(text);
  });

});
