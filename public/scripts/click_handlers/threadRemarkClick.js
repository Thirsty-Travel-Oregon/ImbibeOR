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

  const remarkIdMarker = e.target.getAttribute('data-remId');
  console.log('remarkIdMarker', remarkIdMarker);

  const remOwnerIdMarker = e.target.getAttribute('data-userId');
  console.log('remOwnerIdMarker', remOwnerIdMarker);


  if (threadButtonClicked === 'add-remark') {
    superagent
      .get(`/api/${name}`)
      .then((res) => {
        console.log('res', res);
//do something with the response
//not working yet
//thats why so many comments
//as a placeholder
      })
      .catch((err) => {
        console.log(err);
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
    //way not done yet!
    superagent
      .put(`/api/threads/${threadIdMarker}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .then(() => {

      })
      .catch((err) => {
        console.log(err);
      });
  }else if (threadButtonClicked === 'edit-remark') {
    //still way not done!
    superagent
      .put(`/api/threads/${remarkIdMarker}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .then(() => {

      })
      .catch((err) => {
        console.log(err);
      });
  }else if (threadButtonClicked === 'delete-thread') {
    //don't think this is done?
    superagent
      .delete(`/api/users/followThread/${userIdMarker}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send({threadId: threadIdMarker, userId: threadOwnerIdMarker})
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  }else if (threadButtonClicked === 'delete-remark') {
    //don't think this is done?
    superagent
      .delete(`/api/users/followThread/${userIdMarker}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send({threadId: threadIdMarker, userId: remOwnerIdMarker})
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  }else if (threadButtonClicked === 'create-thread') {
    location.href = '/add-thread';
  }

});