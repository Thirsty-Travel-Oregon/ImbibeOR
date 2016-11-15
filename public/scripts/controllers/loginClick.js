$('area').on('click', function(e) {
  e.preventDefault();
  $('.content').hide();
  var regionClicked = $(this).attr('id');
  console.log(regionClicked); 
});
