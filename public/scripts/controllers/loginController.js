(function(module) {
  var loginController = {};

  loginController.reveal = function() {
    console.log('login controller triggered.');
    $('.content').not('#login-page').hide();
    $('.thread-content').hide();
    $('.remark-content').hide();
    $('#login-page').fadeIn();
    $('.link a').fadeIn();
    $('#login-link').hide();
  };

  module.loginController = loginController;
})(window);
