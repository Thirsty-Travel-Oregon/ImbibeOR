(function(module) {
  var logoutController = {};

  logoutController.reveal = function() {
    console.log('logout controller triggered.');
    $('.content').not('#logout-page').hide();
    $()
    // $('.thread-content').hide();
    // $('.remark-content').hide();
    $('#logout-page').fadeIn();
    $('.link a').fadeIn();
    $('#logout-link').hide();

    if(!sessionStorage.getItem('storedToken')){
      $('following-link').hide();
    }
    else{
      $('#signup-link').hide();
      $('#login-link').hide();
    }
  };

  module.logoutController = logoutController;
})(window);
