$('#signup-form').submit(function(event) {
  event.preventDefault();
  var submitData = $( this ).serializeArray();
  const submitObj = {
    name: submitData[0].value,
    email: submitData[1].value,
    username: submitData[2].value,
    password: submitData[3].value
  };
  jsonData = JSON.stringify(submitObj);
  superagent
    .post('/api/auth/signup')
    .set('Content-Type', 'application/json')
    .send(jsonData)
    .then((res) => {
      sessionStorage.setItem('storedToken', res.body.token);
      sessionStorage.setItem('storedUserID', res.body.userId);
      sessionStorage.setItem('storedUsername', res.body.userName);
      alert('Logged in as '+res.body.userName+'.');
      $('#signup-link').hide();
      $('#login-link').hide();
      $('#logout-link').fadeIn();
    })
    .catch((err) => {
      console.log(err);
    });
});

