//all region map listener
$('#all-regions-button').on('click', function(e) {
  e.preventDefault();
  $('#thread-container').empty();
  stateObject.region = 'all';
  console.log('all regions button clicked');
  $('#state-region').text(stateObject.region + ' regions');
  findThreads();
});