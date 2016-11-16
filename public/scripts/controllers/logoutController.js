(function(module) {
  var logoutController = {};

  logoutController.reveal = function() {
    console.log('logout controller triggered.');
    $('.content').not('#logout-page').hide();
    $('#logout-page').fadeIn();
    $('.link a').fadeIn();
    $('#logout-link').hide();

    if(!sessionStorage.getItem('storedToken')){
      $('following-link').hide();
      $('#logout-button').hide();
      $('#logout-message').text('You are already logged out.  Sign up or log in.');
    }
    else{
        //TODO uncomment the following line once we get the updated backend with Username being stored correctly.
    //   $('#logout-message').text('You are currently logged in as '+sessionStorage(getItem('storedUsername'))+'.');
      $('#logout-button').fadeIn();
      $('#signup-link').hide();
      $('#login-link').hide();
    }
  };

  module.logoutController = logoutController;
})(window);
