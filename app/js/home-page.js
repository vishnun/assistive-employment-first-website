$(function() {
  if ($('#home-page').length === 0) {
    return;
  }

  $('.role-selection').hide();

  $('#get-started').on('click', function() {
    $(this).hide();
    $('.role-selection').show();
  });

});
