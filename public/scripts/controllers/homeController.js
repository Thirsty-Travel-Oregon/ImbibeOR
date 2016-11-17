(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    console.log('home controller triggered.');
    $('.content').not('#flexcontainer').hide();
    $('#flexcontainer').fadeIn();
    $('#thread-container').fadeIn();
    $('#view-threads').fadeIn();
    $('#view-remarks').fadeIn();
    $('.link a').fadeIn();
    $('#home-link').hide();
    if(!sessionStorage.getItem('storedToken')){
      $('#logout-link').hide();
      $('#following-link').hide();
    }
    else{
      $('#signup-link').hide();
      $('#login-link').hide();
    }
  };

  module.homeController = homeController;
})(window);
