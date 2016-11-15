$('#login-form').submit(function(event) {
  event.preventDefault();
  var submitData = $( this ).serializeArray();
  const submitObj = {
    username: submitData[0].value,
    password: submitData[1].value
  };
  jsonData = JSON.stringify(submitObj);
  superagent
    .post('/api/auth/signin')
    .set('Content-Type', 'application/json')
    .send(jsonData)
    .then((res) => {
      console.log('response is ', res);
      $('#login-form').append('<p>Signed up as <em>'+submitObj.username+'</em></p>');
      $('#login-form').append('<p>Your token is <em>'+res.text+'</em></p>');
    })
    .catch((err) => {
      console.log(err);
    });
});





