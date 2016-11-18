(function(module) {
  var logoutController = {};

  logoutController.reveal = function() {
    console.log('logout controller triggered.');
    $('.content').not('#logout-page').hide();
    $('#logout-page').fadeIn();
    $('.link a').fadeIn();
    $('#logout-link').hide();

    if(!sessionStorage.getItem('storedToken')){
      $('#following-link').hide();
      $('#logout-button').hide();
      $('#logout-message').text('You are already logged out.  Sign up or log in.');
    }
    else{
      let userName = sessionStorage.getItem('storedUsername');
      $('#logout-message').text('You are currently logged in as '+ userName+'.');
      $('#logout-button').fadeIn();
      $('#signup-link').hide();
      $('#login-link').hide();
    }
  };

  module.logoutController = logoutController;
})(window);
