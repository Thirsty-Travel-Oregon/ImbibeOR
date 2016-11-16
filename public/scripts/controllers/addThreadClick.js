$('#add-thread-form').submit(function(event) {
  event.preventDefault();
  var submitData = $( this ).serializeArray();
  console.log(submitData);
  const userId =  sessionStorage.getItem('storedUserID');
  if(!userId.length){
    alert('You are not currently logged in.  Please log in or sign up.');
  }
  else{
    const submitObj = {
      title: submitData[0].value,
      text: submitData[1].value,
      region: document.getElementById('region-select').value,
      drinkType: document.getElementById('drink-type-select').value,
      userId: userId
    };
    console.log(submitObj);
    jsonData = JSON.stringify(submitObj);
    console.log('submit object is ', jsonData);
    var token ='Bearer ' +sessionStorage.getItem('storedToken')+'';
    console.log('token is ',token);

    superagent
        .post('/api/threads')
        .set('Authorization', token)
        .set('Content-Type', 'application/json')
        .send(jsonData)
        .then((res) => {
          console.log('response is ', res);
          $('#add-thread-form').append('<h3>New thread, <em>'+submitObj.title+'</em> added to the '+submitObj.region+' region.</h3>');
        })
        .catch((err) => {
          console.log(err);
        });
  }
});





