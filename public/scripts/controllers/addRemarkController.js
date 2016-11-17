(function(module) {
  let addRemarkController = {};

  addRemarkController.reveal = function() {
    $('.content').not('#add-remark').hide();
    $('#add-remark').fadeIn();
    $('.link a').fadeIn();
    if(!sessionStorage.getitem('storedToken')) {
      $('#logout-link').hide();
      $('#following-link').hide();
    } else {
      $('#signup-link').hide();
      $('#login-link').hide();
    }
  };
  module.addRemarkController = addRemarkController;
})(window);