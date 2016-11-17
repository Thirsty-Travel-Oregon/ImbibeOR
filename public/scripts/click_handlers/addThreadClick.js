$('#add-thread-form').submit(function(event) {
  event.preventDefault();
  var submitData = $( this ).serializeArray();
  const userId =  sessionStorage.getItem('storedUserID');
  if(!userId.length){
    alert('You are not currently logged in.  Please log in or sign up to add a new thread.');
  }
  else{
    const submitObj = {
      title: submitData[0].value,
      text: submitData[1].value,
      region: document.getElementById('region-select').value,
      drinkType: document.getElementById('drink-type-select').value,
      userId: userId,
      username: sessionStorage.getItem('storedUsername')
    };
    jsonData = JSON.stringify(submitObj);
    var token ='Bearer ' +sessionStorage.getItem('storedToken')+'';

    superagent
        .post('/api/threads')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(jsonData)
        .then(res => {
          superagent
            .get(`/api/threads/${res.body._id}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', token)
            .then(res => {
              page('/');
              const source = $('#thread-template').html();
              const template = Handlebars.compile(source);
              let threadObj = {thread: res.body};
              const newHtml = template(threadObj);
              $('#thread-container').append(newHtml);
            });
        })
        .catch((err) => {
          console.log(err);
        });
  }
});





