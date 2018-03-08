$(function() {
  if($('#home-page').length === 0) {
    return;
  }

  $('.role-selection').hide();

  $('#get-started').on('click', function() {
    $(this).hide();
    $('.role-selection').show();
  });

  $('.expand-calendar').on('click', function () {
     $('.ef-calendar').addClass('show');
  });

  $('.close-button').on('click', function () {
      $('.ef-calendar').removeClass('show');
  })
});
