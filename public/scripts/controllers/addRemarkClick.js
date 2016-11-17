$('#add-remark-form').submit(event => {
  event.preventDefault();
  let submitData = $(this).serializeArray();
  const userId = sessionStorage.getItem('storedUserId');
  if(!userId.length) {
    alert('You are not currently logged in. Please log in or sign up.');
  } else {
    const submitObj = {
      text: submitData[0].value,
      // threadId: yyy,
      userId: userId
    };
    if (parentRemark) {
      submitObj.parentRemId = parentRemId;
    }
    jsonData = JSON.stringify(submitObj);
    let token = `Bearer ${sessionStorage.getItem('storedToken')}`;

    superagent
      .post('/api/remarks/')
      .set('Authorization', token)
      .set('Content-Type', 'application/json')
      .send(jsonData)
      .then(res => {

      })
      .catch(err => {
        console.log(err);
      });
  }
});