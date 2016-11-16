//buttons for the threads
$('#thread-container').on('click', 'button', function(e) {
  e.preventDefault();
  const id = sessionStorage.getItem('storedUserID');
  const token = 'Bearer ' + sessionStorage.getItem('storedToken');
  const threadButtonClicked = $(this).attr('name');
  console.log('id', id);

  const userIdMarker = e.target.getAttribute('data-userId');
  console.log('userIdMarker', userIdMarker);
  const threadIdMarker = e.target.getAttribute('data-threadId');
  console.log('threadIdMarker', threadIdMarker);

  console.log('button clicked', threadButtonClicked);

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
      .put(`/api/users/followUser/${userIdMarker}`)
      .set({'Content-Type': 'application/json'})
      .set({'Authorization': token})
      .send({userId: id})
      .then(() => {
      })
      .catch((err) => {
        console.log(err);
      });
  }else if (threadButtonClicked === 'follow-thread') {
    superagent
      .put(`/api/users/followThread/${userIdMarker}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send({threadId: threadIdMarker
      })
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
