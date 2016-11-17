//finds threads and appends them to the page
(function(module) {

  function findThreads(){
    console.log('find threads called.  State object is', stateObject);
    console.log('/api/threads/region/'+stateObject.region+'/drinkType/'+stateObject.drinkType)
    superagent
      .get('/api/threads/region/'+stateObject.region+'/drinkType/'+stateObject.drinkType)
      .send({currUser: sessionStorage.getItem('storedUserID')})
      .then((res) => {
        const source = $('#thread-template').html();
        const template = Handlebars.compile(source);
        const threadObject = {
          thread: res.body
        };
        console.log(res.body, threadObject);
        const newHtml = template(threadObject);
        $('#thread-container').append(newHtml);

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
