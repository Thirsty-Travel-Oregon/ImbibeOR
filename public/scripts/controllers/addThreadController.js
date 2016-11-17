(function(module) {
  var addThreadController = {};

  addThreadController.reveal = function() {
    $('.content').not('#add-thread').hide();
    $('#add-thread').fadeIn();
    $('.link a').fadeIn();
    $('#add-thread-link').hide();
    if(!sessionStorage.getItem('storedToken')){
      $('#logout-link').hide();
      $('#following-link').hide();
    }
    else{
      $('#signup-link').hide();
      $('#login-link').hide();
    }
  };

  module.addThreadController = addThreadController;
})(window);
