//map listener
$('area').on('click', function(e) {
  e.preventDefault();
  $('#thread-container').empty();
  var regionClicked = $(this).attr('id');
  console.log(regionClicked);
  superagent
    .get(`/api/threads/region/${regionClicked}`)
    .send({currUser: sessionStorage.getItem('storedUserID')})
    .then((res) => {
      console.log(res.body);
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