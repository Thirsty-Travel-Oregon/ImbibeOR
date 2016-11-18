$('#following-page').on('click', 'button', function(event) {
  event.preventDefault();
  console.log(event.target);
  const token = 'Bearer ' + sessionStorage.getItem('storedToken');

  const buttonClass = event.target.getAttribute('class');
  console.log(buttonClass);

  if (buttonClass === 'view-followed-thread-button'){
    $('#thread-container').empty();
    const threadId = event.target.getAttribute('data-threadId');
    console.log('match');
    superagent
   .get('/api/threads/'+threadId)
          .set({'Authorization': token})
          .then((res) =>{
            console.log('res.body is ', res.body);
            const source = $('#thread-template').html();
            const template = Handlebars.compile(source);
            const threadObject = {
              thread: [res.body[0]]
            };
            const newHtml = template(threadObject);
            $('#thread-container').append(newHtml);
            $('#thread-container').fadeIn();
            if (!sessionStorage.getItem('storedToken')) {
              $('#thread-container button').hide();
              $('#remark-buttons button').hide();
            }
          })
           .catch((err) => {
             console.log(err);
           });
  }

});





