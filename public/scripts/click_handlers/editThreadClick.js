(function(module) {
  function editThreadClick(threadId) {
    const token = 'Bearer ' + sessionStorage.getItem('storedToken');
    console.log('Edit thread click called');
    console.log('thread Id is ', threadId);
    superagent
      .get('/api/threads/'+threadId)
        .set('Content-Type', 'application/json')
        .then(res => {
          console.log('response body is', res.body[0])
          $('#edit-thread-title').html(res.body[0].title);
          $('#edit-thread-textarea').html(res.body[0].text);
          $('#edit-thread').fadeIn();
        })
        .catch(err => {
          console.log(err);
        });

    $('#edit-thread-form').on('submit', function(){
      const editedText = $('#edit-thread-textarea').val();
      console.log('edited text is ', editedText);
      superagent
        .put('api/threads/'+threadId)
        .set({'Content-Type': 'application/json'})
        .set({'Authorization': token})
        .send({'text': editedText})
        .then((res) => {
          console.log('res.body is ', res.body);
        })
      .catch((err) => {
        console.log(err);
      });
    });
  };

  module.editThreadClick = editThreadClick;
})(window);



