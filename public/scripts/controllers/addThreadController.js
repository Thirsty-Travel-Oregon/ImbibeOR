(function(module) {
  var addThreadController = {};

  addThreadController.reveal = function() {
    console.log('add thread controller triggered.');
    $('.content').not('#add-thread').hide();
    $('#add-thread').fadeIn();
    $('.link a').fadeIn();
    $('#add-thread-link').hide();
  };

  module.addThreadController = addThreadController;
})(window);
