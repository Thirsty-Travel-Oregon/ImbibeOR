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
      alert('You are currently not logged in.  Sign up or log in.');
    }
    else{
      $('#signup-link').hide();
      $('#login-link').hide();
      const userId =  sessionStorage.getItem('storedUserID');
      var token ='Bearer ' +sessionStorage.getItem('storedToken')+'';
      superagent
            .get('/api/users/'+userId)
            .set('Authorization', token)
            .set('Content-Type', 'application/json')
            .then((res) => {
              if(res.body.threadsFollowed.length){
                res.body.threadsFollowed.forEach(thread, function(){ 
                  $('#following-threads-tag').append('<h4>'+thread+'</h4>');
                });
              }
              else{
                $('#following-threads-tag').text('You are currently not following any threads.');
              }
              if(res.body.usersFollowed.length){
                res.body.usersFollowed.forEach(user, function(){ 
                  $('#following-users-tag').append('<h3>'+user+'</h3>');
                });
              }
              else{
                $('#following-users-tag').text('You are currently not following any users.');
              }
            })
            .catch((err) => {
              console.log(err);
            });
    }
  };

  module.followingController = followingController;
})(window);
