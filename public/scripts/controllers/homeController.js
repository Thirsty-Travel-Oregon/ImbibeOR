(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    console.log('home controller triggered.');
    $('.content').not('#flexcontainer').hide();
    // $('#home-page').fadeIn();
    // $('.link a').css({color:'white'});
    // $('#home-link').css({color:'grey'});
  };

  module.homeController = homeController;
})(window);
