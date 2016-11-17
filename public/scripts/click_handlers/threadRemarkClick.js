//buttons for the threads
$('#thread-container').on('click', 'button', function(e) {
  e.preventDefault();
  const token = 'Bearer ' + sessionStorage.getItem('storedToken');

  const threadButtonClicked = $(this).attr('name');
  console.log('button clicked', threadButtonClicked);

  const currUserId = sessionStorage.getItem('storedUserID');
  console.log('currUserId', currUserId);

  const username = sessionStorage.getItem('storedUsername');
  const threadOwnerIdMarker = e.target.getAttribute('data-userId');
  const threadIdMarker = e.target.getAttribute('data-threadId');
  const remarkIdMarker = e.target.getAttribute('data-remId');
  const remOwnerIdMarker = e.target.getAttribute('data-userId');

  if (threadButtonClicked === 'add-remark') {
    $('#add-remark').fadeIn();
    $('#add-remark-form').submit(event => {
      event.preventDefault();
      $('#thread-container').empty();
      let submitData = $('textarea[name="Remark Text"]').val();
      const submitObj = {
        text: submitData,
        threadId: threadIdMarker,
        userId: currUserId,
        username: username
      };
      let jsonData = JSON.stringify(submitObj);
      console.log('jsondata', jsonData);
      superagent
        .post('/api/remarks/')
        .set('Content-Type', 'application/json')
        .set('Authorization', token)
        .send(jsonData)
        .then((res) => {
          $('#add-remark').hide();
          console.log('thread Id Marker', threadIdMarker);
          superagent
            .get(`/api/threads/${threadIdMarker}`)
            .set('Authorization', token)
            .then(res => {
              const source = $('#thread-template').html();
              const template = Handlebars.compile(source);
              let threadObj = {thread: res.body};
              console.log('res body', res.body);
              const newHtml = template(threadObj);
              $('#thread-container').append(newHtml);
            });
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
    superagent
      .delete(`/api/threads/${threadIdMarker}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send({threadId: threadIdMarker, userId: threadOwnerIdMarker})
      .then(() => {
        location.href = '/';
      })
      .catch((err) => {
        console.log(err);
      });
  }else if (threadButtonClicked === 'delete-remark') {
    superagent
      .delete(`/api/remarks/${remarkIdMarker}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send({threadId: threadIdMarker, userId: remOwnerIdMarker})
      .then(() => {
        location.href = '/';
      })
      .catch((err) => {
        console.log(err);
      });
  }else if (threadButtonClicked === 'create-thread') {
    location.href = '/add-thread';
  }

});