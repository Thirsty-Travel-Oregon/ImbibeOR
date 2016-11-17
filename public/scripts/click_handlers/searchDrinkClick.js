$('#drink-type-select-search').on('change', function(event) {
  event.preventDefault();
  var drinkChoice = $('#drink-type-select-search').val();
  stateObject.drinkType = drinkChoice;
  stateObject.region = 'all';
  $('#thread-template').fadeIn();
  findThreads();
});





