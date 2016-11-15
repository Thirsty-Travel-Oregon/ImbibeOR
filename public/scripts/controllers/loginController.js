(function(module) {
  var loginController = {};

  loginController.reveal = function() {
    console.log('login controller triggered.');
    $('.content').not('#login-page').hide();
    $('#login-page').fadeIn();
    // $('#home-page').fadeIn();
    // $('.link a').css({color:'white'});
    // $('#home-link').css({color:'grey'});
  };

  module.loginController = loginController;
})(window);
