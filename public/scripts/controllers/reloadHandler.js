$( document ).ready(function(){
  console.log('reload handler called');
  if(sessionStorage.getItem('storedUsername')){
    $('#user-status').text('Logged in as '+sessionStorage.getItem('storedUsername'));
  }
  else{
    $('#user-status').text('Not logged in');
  }
});