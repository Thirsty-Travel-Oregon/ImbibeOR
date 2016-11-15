(function(module) {
  var signupController = {};

  signupController.reveal = function() {
    // $('.content).not('.static').hide();
    console.log('home controller triggered.');
    $('.content').not('#signup-page').hide();
    // $('#home-page').fadeIn();
    // $('.link a').css({color:'white'});
    // $('#home-link').css({color:'grey'});
  };

  module.signupController = signupController;
})(window);
