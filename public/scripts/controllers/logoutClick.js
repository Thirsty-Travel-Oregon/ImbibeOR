$('#logout-button').on('click', function(event) {
  event.preventDefault();
  sessionStorage.clear();
  $('#logout-button').hide();
  $('#logout-message').text('You are now logged out.');
  $('#user-status').text('Not logged in');
  $('#following-link').hide();
  $('#signup-link').fadeIn();
  $('#login-link').fadeIn();
  $('#following-link').fadeIn();
  // location.href = '/';
});





