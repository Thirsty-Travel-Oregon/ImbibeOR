//This function is still not working.  It needs to be edited.


(function(module) {
  function editRemarkClick(remarkId, threadId) {
    const token = 'Bearer ' + sessionStorage.getItem('storedToken');
    console.log('Edit remark click called');
    console.log('remark Id is ', remarkId);
    superagent
      .get(`/api/remarks/${remarkId}`)
      .set('Content-Type', 'application/json')
      .then(res => {
        console.log('in edit remark click - res.body', res.body);
        $('#edit-remark-textarea').html(res.body.text);
        $('#edit-remark').fadeIn();
      })
      .catch(err => {
        console.log(err);
      });

    $('#edit-remark-form').on('submit', function(){
      const editedText = $('#edit-remark-textarea').val();
      console.log('edited remark text is ', editedText);
      superagent
        .put('api/remarks/'+remarkId)
        .set({'Content-Type': 'application/json'})
        .set({'Authorization': token})
        .send({'text': editedText})
        .then((res) => {
          console.log('res.body is ', res.body);
        })
        .then((res) => {
          $('#add-remark').hide();
          $('#thread-container').empty();
          console.log('thread Id Marker', threadId);
          superagent
            .get(`/api/threads/${threadId}`)
            //error in server console at this point
            //Cast to ObjectId failed for value "null" at path "_id"
            //GET /api/threads/null 500 5.277 ms - 33
            .set('Authorization', token)
            .then(res => {
              $('#thread-container').empty();
              const source = $('#thread-template').html();
              const template = Handlebars.compile(source);
              let threadObj = {thread: res.body};
              console.log('thread object: ', threadObj);
              const newHtml = template(threadObj);
              $('#thread-container').append(newHtml);
            });
        })
      .catch((err) => {
        console.log(err);
      });
    });
  };

  module.editRemarkClick = editRemarkClick;
})(window);



