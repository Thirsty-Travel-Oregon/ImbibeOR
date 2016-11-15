(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    console.log('login controller triggered.');
    $('.content').not('#about-page').hide();
    $('#about-page').fadeIn();
    // $('#home-page').fadeIn();
    // $('.link a').css({color:'white'});
    // $('#home-link').css({color:'grey'});
  };

  module.aboutController = aboutController;
})(window);
