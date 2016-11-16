(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    console.log('home controller triggered.');
    $('.content').not('#flexcontainer').hide();
    $('.thread-content').fadeIn();
    $('.remark-content').fadeIn();
    $('#flexcontainer').fadeIn();
    $('#thread-container').fadeIn();
    $('#view-threads').fadeIn();
    $('#view-remarks').fadeIn();
    $('.link a').fadeIn();
    $('#home-link').hide();
  };

  module.homeController = homeController;
})(window);
