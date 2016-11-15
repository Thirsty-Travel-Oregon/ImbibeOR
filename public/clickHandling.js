$('area').on('click', function(e) {
  e.preventDefault();
  $('.content').hide();
  var regionClicked = $(this).attr('id');
  console.log(regionClicked); 
});

$('.drink-type-cat li').on('click', function(e) {
  e.preventDefault();
  var drinkTypeClicked = $(this).attr('id');
  $('.content').hide();
  console.log(drinkTypeClicked);
});

$('.thread-content button').on('click', function(e) {
  e.preventDefault();
  var threadButtonClicked = $(this).attr('name');
  console.log(threadButtonClicked);
});

$('.remark-content button').on('click', function(e) {
  e.preventDefault();
  var remarkButtonClicked = $(this).attr('name');
  console.log(remarkButtonClicked);
});