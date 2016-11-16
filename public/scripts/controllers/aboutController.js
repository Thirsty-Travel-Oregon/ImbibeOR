(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    console.log('about controller triggered.');
    $('.content').not('#about-page').hide();
    $('remark-content').hide();
    $('.thread-content').hide();
    $('#about-page').fadeIn();
    $('.link a').fadeIn();
    $('#about-link').hide();
  };

  module.aboutController = aboutController;
})(window);
