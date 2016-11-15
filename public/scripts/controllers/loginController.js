(function(module) {
  var loginController = {};

  signupController.reveal = function() {
    // $('.content).not('.static').hide();
    console.log('home controller triggered.');
    $('.content').not('#login-page').hide();
    // $('#home-page').fadeIn();
    // $('.link a').css({color:'white'});
    // $('#home-link').css({color:'grey'});
  };

  module.loginController = loginController;
})(window);
