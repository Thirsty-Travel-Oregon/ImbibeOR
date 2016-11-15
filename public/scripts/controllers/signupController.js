(function(module) {
  var signupController = {};

  signupController.reveal = function() {
    console.log('signup controller triggered.');
    $('.content').not('#signup-page').hide();
    $('#signup-page').fadeIn();
    $('.link a').fadeIn();
    $('#signup-link').hide();
  };

  module.signupController = signupController;
})(window);
