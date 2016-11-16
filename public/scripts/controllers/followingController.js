(function(module) {
  var followingController = {};

  followingController.reveal = function() {
    console.log('following controller triggered.');
    $('.content').not('#following-page').hide();
    $('#following-page').fadeIn();
    $('.link a').fadeIn();
    $('#following-link').hide();
    if(!sessionStorage.getItem('storedToken')){
      $('#logout-link').hide();
      $('#following-page').append('<h1>You are currently not logged in.  Sign up or log in.</h1>');
    }
    else{
      const userId =  sessionStorage.getItem('storedUserID');
      var token ='Bearer ' +sessionStorage.getItem('storedToken')+'';
        superagent
            .get('/api/threads')
            .set('Authorization', token)
            .set('Content-Type', 'application/json')
            .send(jsonData)
            .then((res) => {
            $('#add-thread-form').append('<h3>New thread, <em>'+submitObj.title+'</em> added to the '+submitObj.region+' region.</h3>');
            })
            .catch((err) => {
            console.log(err);
            });
    }
});
      $('#signup-link').hide();
      $('#login-link').hide();
    }
  };

  module.followingController = followingController;
})(window);
