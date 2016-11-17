//drink type listener
$('.drink-type-cat li').on('click', function(e) {
  e.preventDefault();
  $('#thread-container').empty();
  var drinkTypeClicked = $(this).attr('id');
  console.log('button clicked', drinkTypeClicked);
  superagent
    .get(`/api/threads/drinkType/${drinkTypeClicked}`)
    .send({currUser: sessionStorage.getItem('storedUserID')})
    .then((res) => {
      const source = $('#thread-template').html();
      const template = Handlebars.compile(source);
      const threadObject = {
        thread: res.body
      };
      const newHtml = template(threadObject);
      $('#thread-container').append(newHtml);

      if (!sessionStorage.getItem('storedToken')) {
        $('#thread-container button').hide();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});