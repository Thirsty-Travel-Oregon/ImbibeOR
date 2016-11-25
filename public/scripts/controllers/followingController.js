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
              // alias when repetitive:
              const threadFollowed = req.body.threadsFollowed;
              if(threadsFollowed.length){
                $('#following-threads-tag').text('You are following these threads:');
                threadsFollowed.forEach(function(threadId){ 
                  superagent
                    .get ('/api/threads/'+threadId)
                    .set('Authorization', token)
                    .set('Content-Type', 'application/json')
                     .then((res) => {
                       console.log('res body is ', res.body[0]); 
                       $('#following-threads-tag').append('<div class ="content" id="followed-thread-div"><h3 class="appended-threadname" data-threadId="'+threadId+'">'+res.body[0].title+'</h3><button class="view-followed-thread-button" data-threadId="'+threadId+'">View Thread</button><button class="unfollow-thread-button" data-threadId="'+threadId+'">Unfollow Thread</button><div>');
                     })
                        .catch((err) => {
                          console.log(err);
                        });
                });
              }
              else{
                $('#following-threads-tag').text('You are currently not following any threads.');
              }
              const usersFollowed = res.body.usersFollowed;
              if(usersFollowed.length){
                // Food for thought: consider this code versus your original code...
                const tag = $('#following-users-tag');
                
                tag.text('You are following these users:');

                const getUsers = usersFollowed.map(userId => superagent
                  .get ('/api/users/searchuser/'+userId)
                  .set('Authorization', token)
                  .set('Content-Type', 'application/json')
                );

                Promise.all(getUsers)
                  .then(res => res.map(r => res.body.username)
                  .then(usernames => {
                    usernames.forEach(username => {
                      tag.append(`<div class ="content" id="followed-user-div">
                        <h3 class="appended-username">${username}</h3>
                        <button class="view-followed-user-button" 
                          data-userId="${userId}" 
                          data-name="${username}">
                          View Threads by User
                        </button>
                        <button class="unfollow-button" 
                          data-userId="${userId}" 
                          data-name="${username}">
                          Unfollow User
                        </button>
                        <div>
                      `);
                    });
                  })
                  .catch(err => console.log(err));
           
                
    }
  };

  module.followingController = followingController;
})(window);
