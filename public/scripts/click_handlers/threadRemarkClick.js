//buttons for the threads
$('#thread-container').on('click', 'button', function(e) {
  e.preventDefault();
  const token = 'Bearer ' + sessionStorage.getItem('storedToken');

  const threadButtonClicked = $(this).attr('name');
  console.log('button clicked', threadButtonClicked);

  const currUserId = sessionStorage.getItem('storedUserID');
  console.log('currUserId', currUserId);

  const threadOwnerIdMarker = e.target.getAttribute('data-userId');
  console.log('threadOwnerIdMarker', threadOwnerIdMarker);

  const threadIdMarker = e.target.getAttribute('data-threadId');
  console.log('threadIdMarker', threadIdMarker);


  if (threadButtonClicked === 'add-remark') {
    console.log('button is being clicked');
    $('#add-remark').fadeIn();
    $('#add-remark-form').submit(event => {
      event.preventDefault();
      let submitData = $(this).serializeArray();
      const submitObj = {
        text: submitData[0].value,
        threadId: threadIdMarker,
        userId: currUserId
      };
      let jsonData = JSON.stringify(submitObj);
      superagent
        .post('/api/remarks/')
        .set('Content-Type', 'application/json')
        .set('Authorization', token)
        .send(jsonData)
        .then(res => {
          $('#add-remark').hide();
        })
        .catch(err => {
          console.log(err);
        });
    });
  }else if (threadButtonClicked === 'follow-user') {
    superagent
      .put(`/api/users/followUser/${currUserId}`)
      .set({'Content-Type': 'application/json'})
      .set({'Authorization': token})
      .send({userId: threadOwnerIdMarker})
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      });
  }else if (threadButtonClicked === 'follow-thread') {
    superagent
      .put(`/api/users/followThread/${currUserId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send({threadId: threadIdMarker})
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  }else if (threadButtonClicked === 'edit-post') {
    //how to do this???
  }else if (threadButtonClicked === 'delete-thread') {
    superagent
      .put(`/api/users/followThread/${userIdMarker}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send({threadId: threadIdMarker})
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  }else if (threadButtonClicked === 'create-thread') {
    location.href = '/add-thread';
  }

});

$('.remark-content button').on('click', function(e) {
  e.preventDefault();
  var remarkButtonClicked = $(this).attr('name');
  console.log(remarkButtonClicked);
});
