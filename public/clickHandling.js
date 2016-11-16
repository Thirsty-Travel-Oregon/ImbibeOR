//map listener
//all get requests
$('area').on('click', function(e) {
  e.preventDefault();
  $('#thread-container').empty();
  var regionClicked = $(this).attr('id');
  console.log(regionClicked);
  superagent
    .get(`/api/threads/region/${regionClicked}`)
    .then((res) => {
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

//drink type listener
//all get requests
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

//buttons for the threads
$('#thread-container').on('click', 'button', function(e) {
  e.preventDefault();
  var threadButtonClicked = $(this).attr('name');
  console.log(threadButtonClicked);
  if (threadButtonClicked === 'add-remark') {
    superagent
      .get(`/api/${name}`)
      .then((res) => {
        console.log(res);
        //do something with the response
      })
      .catch((err) => {
        console.log(err);
      });
  }else if (threadButtonClicked === 'follow-user') {
    let id = sessionStorage.getItem('storedUserID');
    let token = 'Bearer ' + sessionStorage.getItem('storedToken');
    superagent
      .post(`/api/users/followUser/${id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send('{"userId": data-userId}')
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      });
  }else if (threadButtonClicked === 'follow-thread') {
    superagent
      .post(`/api/users/followThread/${data-threadId}`)
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  }else if (threadButtonClicked === 'edit-post') {

  }else if (threadButtonClicked === 'delete-thread') {

  }else if (threadButtonClicked === 'create-thread') {

  }

});

$('.remark-content button').on('click', function(e) {
  e.preventDefault();
  var remarkButtonClicked = $(this).attr('name');
  console.log(remarkButtonClicked);
});

$('#signup-form').on('submit', function(e) {
  e.preventDefault();
  console.log('data');
});