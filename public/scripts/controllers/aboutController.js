(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('.content').not('#about-page').hide();
    $('#about-page').fadeIn();
    $('.link a').fadeIn();
    $('#about-link').hide();
    if(!sessionStorage.getItem('storedToken')){
      $('#logout-link').hide();
      $('#following-link').hide();
    }
    else{
      $('#signup-link').hide();
      $('#login-link').hide();
    }
  };

  module.aboutController = aboutController;
})(window);
