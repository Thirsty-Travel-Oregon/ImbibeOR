(function(module) {
  var addThreadController = {};

  addThreadController.reveal = function() {
    console.log('add thread controller triggered.');
    $('.content').not('#add-thread').hide();
    $('.thread-content').hide();
    $('.remark-content').hide();
    $('#add-thread').fadeIn();
    $('.link a').fadeIn();
    $('#add-thread-link').hide();
  };

  module.addThreadController = addThreadController;
})(window);
