$(function() {
  if ($('#home-page').length === 0) {
    return;
  }


  $('.role-selection').hide();

  // The get started button gets hidden to show the role selection dropdown.
  $('#get-started').on('click', function() {
    $(this).hide();
    $('.role-selection').css('display', 'inline-block');
  });
  

});
