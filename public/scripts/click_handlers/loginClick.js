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
      sessionStorage.setItem('storedToken', token);
      sessionStorage.setItem('storedUserID', res.body.userId);
      sessionStorage.setItem('storedUsername', res.body.userName);
      alert('Logged in as '+res.body.userName+'.');
      $('#user-status').text('Logged in as '+res.body.userName);
      $('#signup-link').hide();
      $('#login-link').hide();
      $('#following-link').fadeIn();
      $('#logout-link').fadeIn();
    })
    .then(() => {
      location.href = '/';
    })
    .catch((err) => {
      console.log(err);
    });
});





