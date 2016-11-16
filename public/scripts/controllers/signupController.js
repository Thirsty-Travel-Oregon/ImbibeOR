(function(module) {
  var signupController = {};

  signupController.reveal = function() {
    console.log('signup controller triggered.');
    $('.content').not('#signup-page').hide();
    $('.thread-content').hide();
    $('.remark-content').hide();
    $('#signup-page').fadeIn();
    $('.link a').fadeIn();
    $('#signup-link').hide();
  };

  module.signupController = signupController;
})(window);
