$(function() {
  $('.expand-calendar').on('click', function() {
    $('.ef-calendar').addClass('show');
  });

  $('.close-button').on('click', function() {
    $('.ef-calendar').removeClass('show');
  })
});
