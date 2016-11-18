//drink type listener
$('.drink-type-cat li').on('click', function(e) {
  e.preventDefault();
  $('#thread-container').empty();
  stateObject.drinkType= $(this).attr('id');
  findThreads();
});