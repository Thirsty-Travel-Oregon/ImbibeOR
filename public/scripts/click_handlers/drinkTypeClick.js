//drink type listener
$('.drink-type-cat li').on('click', function(e) {
  e.preventDefault();
  $('#thread-container').empty();
  var drinkTypeClicked = $(this).attr('id');
  console.log(drinkTypeClicked);
  superagent
    .get(`/api/threads/drinkType/${drinkTypeClicked}`)
    .then((res) => {
      console.log(res.body);
      const source = $('#thread-template').html();
      const template = Handlebars.compile(source);
      const threadObject = {thread: res.body};
      const newHtml = template(threadObject);
      $('#thread-container').append(newHtml);
    })
    .catch((err) => {
      console.log(err);
    });
});