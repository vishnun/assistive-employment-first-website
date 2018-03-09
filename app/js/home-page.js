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
    reader.read(text);
  });

});
