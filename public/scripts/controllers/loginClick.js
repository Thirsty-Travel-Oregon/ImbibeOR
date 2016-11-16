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
      const token = res.body.token;
      $('#login-form').append('<p>Logged as <em>'+submitObj.username+'</em></p>');
      $('#login-form').append('<p>Your token is <em>'+token+'</em></p>');
      sessionStorage.setItem('storedToken', token);
      sessionStorage.setItem('storedUserID', res.body.userId);
      console.log('user ID stored as ', sessionStorage.getItem('storedUserID'));
    })
    .catch((err) => {
      console.log(err);
    });
});





