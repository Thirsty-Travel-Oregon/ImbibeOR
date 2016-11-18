//finds threads and appends them to the page
(function(module) {

  function findThreads(){
    const token = 'Bearer ' + sessionStorage.getItem('storedToken');
    superagent
      .get('/api/threads/region/'+stateObject.region+'/drinkType/'+stateObject.drinkType)
      .set({'Authorization': token})
      .then((res) => {
        const source = $('#thread-template').html();
        const template = Handlebars.compile(source);
        const threadObject = {
          thread: res.body
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
  };

  module.findThreads = findThreads;
})(window);
