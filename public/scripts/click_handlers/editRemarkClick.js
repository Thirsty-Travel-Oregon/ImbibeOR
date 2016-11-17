//This function is still not working.  It needs to be edited.


(function(module) {
  function editRemarkClick(threadId) {
    const token = 'Bearer ' + sessionStorage.getItem('storedToken');
    console.log('Edit remark click called');
    console.log('thread Id is ', threadId);
    superagent
    //   .get('/api/threads/'+threadId)
    //     .set('Content-Type', 'application/json')
    //     .then(res => {
    //       $('#edit-thread-title').html(res.body.title);
    //       $('#edit-thread-textarea').html(res.body.text);
    //       $('#edit-thread').fadeIn();
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });

    $('#edit-remark-form').on('submit', function(){
      const editedText = $('#edit-remark-textarea').val();
      console.log('edited remark text is ', editedText);
      superagent
        // .put('api/threads/'+threadId)
        // .set({'Content-Type': 'application/json'})
        // .set({'Authorization': token})
        // .send({'text': editedText})
        // .then((res) => {
        //   console.log('res.body is ', res.body);
        // })
      .catch((err) => {
        console.log(err);
      });
    });
  };

  module.editRemarkClick = editRemarkClick;
})(window);



