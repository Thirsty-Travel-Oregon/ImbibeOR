(function(module) {
  var followingController = {};

  followingController.reveal = function() {
    console.log('following controller triggered.');
    $('.content').not('#following-page').hide();
    $('#following-page').fadeIn();
    $('.link a').fadeIn();
    $('#following-link').hide();
    if(!sessionStorage.getItem('storedToken')){
      $('#logout-link').hide();
    }
    else{
      $('#signup-link').hide();
      $('#login-link').hide();
    }
  };

  module.followingController = followingController;
})(window);
