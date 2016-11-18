//map listener
$('area').on('click', function(e) {
  e.preventDefault();
  $('#thread-container').empty();
  stateObject.region = $(this).attr('id');
  $('#state-region').text(stateObject.region + ' region');
  findThreads();
});