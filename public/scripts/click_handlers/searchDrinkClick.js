$('#drink-type-select-search').on('change', function(event) {
  event.preventDefault();
  var drinkChoice = $('#drink-type-select-search').val();
  stateObject.drinkType = drinkChoice;
  stateObject.region = 'all';
  $('#thread-container').empty();
  $('#thread-container').fadeIn();
  findThreads();
});





