(function(module) {
  var signupController = {};

  signupController.reveal = function() {
    // $('.content).not('.static').hide();
    $('.content).not('#signup-page').hide();
    // $('#home-page').fadeIn();
    // $('.link a').css({color:'white'});
    // $('#home-link').css({color:'grey'});
  };

  module.signupController = signupController;
})(window);
