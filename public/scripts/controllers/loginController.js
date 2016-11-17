(function(module) {
  var loginController = {};

  loginController.reveal = function() {
    console.log('login controller triggered.');
    $('.content').not('#login-page').hide();
    $('#login-page').fadeIn();
    $('.link a').fadeIn();
    $('#login-link').hide();
    if(!sessionStorage.getItem('storedToken')){
      $('#logout-link').hide();
      $('following-link').hide();
    }
    else{
      $('#signup-link').hide();
    }
  };

  module.loginController = loginController;
})(window);
