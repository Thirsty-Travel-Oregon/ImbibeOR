// $('#add-thread-form').submit(function(event) {
//   event.preventDefault();
//   var submitData = $( this ).serializeArray();
//   if(!storedUserID){
//     alert('You are not currently logged in.  Please log in or sign up.');
//   }
//   else{
//     const submitObj = {
//       title: submitData[0].value,
//       text: submitData[1].value,
//       region: submitData[2].value,
//       drinkType: submitData[3].value,
//       userID: storedUserID
//     };
//     jsonData = JSON.stringify(submitObj);
//     console.log('submit object is ', jsonData);
    //   superagent
    //     .post('/api/thread')
    //     .set('Content-Type', 'application/json')
    //     .send(jsonData)
    //     .then((res) => {
    //       console.log('response is ', res);
        //   $('#add-thread-form').append('<p>New thread, <em>'+submitObj.title+'</em> added to the '+submitObj.region+'.</p>');
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  }
});





