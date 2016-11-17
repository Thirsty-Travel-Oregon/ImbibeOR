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
      sessionStorage.setItem('storedToken', token);
      sessionStorage.setItem('storedUserID', res.body.userId);
      sessionStorage.setItem('storedUsername', res.body.userName);
      console.log('resbod', res.body);
      $('#signup-link').hide();
      $('#login-link').hide();
      $('#logout-link').fadeIn();
    })
    .catch((err) => {
      console.log(err);
    });
});





