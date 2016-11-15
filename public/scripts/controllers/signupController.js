(function(module) {
  var signupController = {};

  signupController.reveal = function() {
    console.log('signup controller triggered.');
    $('.content').not('#signup-page').hide();
    $('#signup-page').fadeIn();
    // $('#home-page').fadeIn();
    // $('.link a').css({color:'white'});
    // $('#home-link').css({color:'grey'});
  };

  module.signupController = signupController;
})(window);
