
$('#signup-form').submit(function(event) {
  event.preventDefault();
  console.log('signup form submitted');
  var submitData = $( this ).serializeArray();
  console.log(submitData);
  const submitObj = {
    name: submitData[0].value,
    email: submitData[1].value,
    username: submitData[2].value,
    password: submitData[3].value
  };
  jsonData = JSON.stringify(submitObj);
  console.log(jsonData);
  superagent
    .post('/api/auth/signup')
    .set('Content-Type', 'application/json')
    .send(jsonData)
    .then((res) => {
      $('#signup-form').append('<p>Signed up as <em>'+submitObj.username+'</em></p>');
      $('#signup-form').append('<p>Your new password is <em>'+submitObj.password+'</em></p>');
      $('#signup-form').append('<p>Your token is <em>'+res.text+'</em></p>');
    })
    .catch((err) => {
      console.log(err);
    });
});

