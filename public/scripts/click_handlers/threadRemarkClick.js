//buttons for the threads
$('#thread-container').on('click', 'button', function(e) {
  e.preventDefault();
  const token = 'Bearer ' + sessionStorage.getItem('storedToken');

  const threadButtonClicked = $(this).attr('name');
  const currUserId = sessionStorage.getItem('storedUserID');
  const username = sessionStorage.getItem('storedUsername');
  const threadOwnerIdMarker = e.target.getAttribute('data-userId');
  const threadIdMarker = e.target.getAttribute('data-threadId');
  const remarkIdMarker = e.target.getAttribute('data-remId');
  const remOwnerIdMarker = e.target.getAttribute('data-userId');
  const $textArea = $('textarea[name="Remark Text"]');

  if (threadButtonClicked === 'add-remark') {
    $('#add-remark').fadeIn();
    $textArea.val('');
    $('#add-remark-form').submit(event => {
      event.preventDefault();
      $('#thread-container').empty();
      let submitData = $textArea.val();
      const submitObj = {
        text: submitData,
        threadId: threadIdMarker,
        userId: currUserId,
        username: username
      };
      $('#add-remark-form').off();
      let jsonData = JSON.stringify(submitObj);
      superagent
        .post('/api/remarks/')
        .set('Content-Type', 'application/json')
        .set('Authorization', token)
        .send(jsonData)
        .then((res) => {
          $('#add-remark').hide();
          $('#thread-container').empty();
          findThreads();
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
  }else if (threadButtonClicked === 'edit-thread') {
    const threadIdMarker = e.target.getAttribute('data-threadId');
    editThreadClick(threadIdMarker);

  }else if (threadButtonClicked === 'edit-remark') {
    const threadIdMarker = e.target.getAttribute('data-threadId');
    console.log('in threadRemarkClick', remarkIdMarker);
    editRemarkClick(remarkIdMarker, threadIdMarker);


  }else if (threadButtonClicked === 'delete-thread') {
    superagent
      .delete(`/api/threads/${threadIdMarker}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .then(res => {
        $('#thread-container').empty();
        findThreads();
      })
      .catch((err) => {
        console.log(err);
      });
  }else if (threadButtonClicked === 'delete-remark') {
    superagent
      .delete(`/api/remarks/${remarkIdMarker}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .then(res => {
        $('#thread-container').empty();
        findThreads();
      })
      .catch((err) => {
        console.log(err);
      });
  }else if (threadButtonClicked === 'create-thread') {
    location.href = '/add-thread';
  }

});