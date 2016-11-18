(function(module) {
  var searchThreadsController = {};

  searchThreadsController.reveal = function() {
    console.log('search threads controller triggered.');
    $('.content').not('#search-threads').hide();
    $('#thread-container').empty();
    $('#search-threads').fadeIn();
    $('.link a').fadeIn();
    $('#search-threads-link').hide();
    if(!sessionStorage.getItem('storedToken')){
      $('#logout-link').hide();
      $('#following-link').hide();
    }
    else{
      $('#signup-link').hide();
      $('#login-link').hide();
    }
  };

  module.searchThreadsController = searchThreadsController;
})(window);
