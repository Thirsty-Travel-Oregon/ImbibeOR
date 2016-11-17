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
    $('#add-remark').fadeIn();
    $('#add-remark-form').submit(event => {
      event.preventDefault();
      $('#thread-container').empty();
      let submitData = $('textarea[name="Remark Text"]').val();
      const submitObj = {
        text: submitData,
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
          // console.log('resbod', res.body);
          superagent
            // .get(`/api/threads/${res.body.threadId}`)
            .get('/api/threads')
            .set('Authorization', token)
            .then(res => {
              const source = $('#thread-template').html();
              const template = Handlebars.compile(source);
              // let remarksArr = res.body.remarks;
              // let remarkObj = {};
              // for(let i = 0; i < remarksArr.length; i++) {
              //   remarkObj['remark' + (i + 1) + ''] = remarksArr[i].text;
              // }
              // console.log('remarkobj', remarkObj);
              let threadObj = {thread: res.body};
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
