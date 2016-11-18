(function(module) {
  function editThreadClick(threadId) {
    const token = 'Bearer ' + sessionStorage.getItem('storedToken');
    superagent
      .get('/api/threads/'+ threadId)
      .set('Content-Type', 'application/json')
      .then(res => {
        $('#thread-container').empty();
        const source = $('#thread-template').html();
        const template = Handlebars.compile(source);
        let threadObj = {thread: res.body};
        const newHtml = template(threadObj);
        $('#thread-container').append(newHtml);
        $('#edit-thread').fadeIn();
      })
      .catch(err => {
        console.log(err);
      });

    $('#edit-thread-form').on('submit', function(e){
      e.preventDefault();
      $('#edit-thread').hide();
      const editedText = $('#edit-thread-textarea').val();
      superagent
        .put('api/threads/'+ threadId)
        .set({'Content-Type': 'application/json'})
        .set({'Authorization': token})
        .send({'text': editedText})
        .then((res) => {
          superagent
            .get(`/api/threads/${threadId}`)
            .set('Authorization', token)
            .then(res => {
              $('#thread-container').empty();
              const source = $('#thread-template').html();
              const template = Handlebars.compile(source);
              let threadObj = {thread: res.body};
              const newHtml = template(threadObj);
              $('#thread-container').append(newHtml);
            });
        })
      .catch((err) => {
        console.log(err);
      });
    }, false);
  };

  module.editThreadClick = editThreadClick;
})(window);



