//This module adds user data to the store when the submit is clicked.


//this function is currently defunct
function runDisplayPosts(res, res, next){
  return function displayPosts(req, res, next){
    res.write(html); 
        promise('../public/index.html')
                .then(function(data) {  
                    response.write('<div "class=thread">');
                    response.write('<h2>'+res.Thread.title+'</h2><br>');
                    response.write('<p><em>Region:  </em>'+res.Thread.region+'</p><br>');
                    response.write('<p><em>Drink Type:  </em>'+res.Thread.drinkType+'</p><br>');
                    response.write('<p>'+res.Thread.text+'</p>');
                    response.write('/<div>');
                    response.end()})
                .then (comments.forEach(comment){
                    response.write('<div "class=comment">');
                    response.write('<h4>'+res.Remark.title+'</h4><br>');
                    response.write('<h5>'+res.Remark.userID+'</h5><br>');
                    response.write('<p>'+res.Remark.text+'</p>');
                    response.write('/<div>');
                    response.end()})
                }
                .catch(function(err){
                    console.log('caught error is ', err);
                }); 
    });
};



    .catch(next);
  }
}  

module.exports = runDisplayPosts;