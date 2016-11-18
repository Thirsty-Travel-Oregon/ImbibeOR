//This function is still not working.  It needs to be edited.


(function(module) {
  function editRemarkClick(remarkId, threadId) {
    const token = 'Bearer ' + sessionStorage.getItem('storedToken');
    superagent
      .get(`/api/threads/${threadId}`)
      .set('Content-Type', 'application/json')
      .then(res => {
        $('#thread-container').empty();
        const source = $('#thread-template').html();
        const template = Handlebars.compile(source);
        let threadObj = {thread: res.body};
        const newHtml = template(threadObj);
        $('#thread-container').append(newHtml);
        $('#edit-remark').fadeIn();
      })
      .catch(err => {
        console.log(err);
      });

    $('#edit-remark-form').on('submit', function(e){
      e.preventDefault();
      $('#edit-remark').hide();
      const editedText = $('#edit-remark-textarea').val();
      superagent
        .put('api/remarks/' + remarkId)
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
    });
  };

  module.editRemarkClick = editRemarkClick;
})(window);



