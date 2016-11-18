$('#region-select-search').on('change', function(event) {
  event.preventDefault();
  var regionChoice = $('#region-select-search').val();
  stateObject.drinkType = 'all';
  stateObject.region = regionChoice;
  $('#thread-container').empty();
  $('#thread-container').fadeIn();
  findThreads();
});





