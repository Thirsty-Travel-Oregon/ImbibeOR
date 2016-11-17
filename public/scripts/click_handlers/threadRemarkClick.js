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
