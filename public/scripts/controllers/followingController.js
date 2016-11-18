(function(module) {
  var followingController = {};

  followingController.reveal = function() {
    console.log('following controller triggered.');
    $('#following-threads-tag .appended-threadname').remove();
    $('#following-users-tag .appended-username').remove();
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
              console.log(res.body);
              if(res.body.threadsFollowed.length){
                $('#following-threads-tag').text('You are following these threads:');
                res.body.threadsFollowed.forEach(function(threadId){ 
                  superagent
                    .get ('/api/threads/'+threadId)
                    .set('Authorization', token)
                    .set('Content-Type', 'application/json')
                     .then((res) => {
                       console.log('res body is ', res.body[0]); 
                       $('#following-threads-tag').append('<h4 class="appended-threadname">'+res.body[0].title+'</h4>');
                     })
                        .catch((err) => {
                          console.log(err);
                        });
                });
              }
              else{
                $('#following-threads-tag').text('You are currently not following any threads.');
              }
              if(res.body.usersFollowed.length){
                $('#following-users-tag').text('You are following these users:');
                res.body.usersFollowed.forEach(function(userId){ 
                  superagent
                    .get ('/api/users/searchuser/'+userId)
                    .set('Authorization', token)
                    .set('Content-Type', 'application/json')
                     .then((res) => {
                       console.log(res.body.username);
                       $('#following-users-tag').append('<h4 class="appended-username">'+res.body.username+'</h4>');
                     })
                        .catch((err) => {
                          console.log(err);
                        });
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
