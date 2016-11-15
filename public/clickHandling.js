$('area').on('click', function(e) {
  e.preventDefault();
  $('.content').hide();
  var regionClicked = $(this).attr('id');
  console.log(regionClicked); 
});

$('.drink-type-cat li').on('click', function(e) {
  e.preventDefault();
  var drinkTypeClicked = $(this).attr('id');
  console.log(drinkTypeClicked);
});