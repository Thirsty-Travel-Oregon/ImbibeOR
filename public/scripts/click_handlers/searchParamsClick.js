$('#search-params-select').on('change', function(event) {
  event.preventDefault();
  var paramChoice = $('#search-params-select').val();

  if(paramChoice === 'author' || paramChoice === 'text'){
    $('#region-select-div').fadeOut();
    $('#drink-type-select-div').fadeOut();
    $('#search-text-div').fadeIn();
  }

  else if(paramChoice === 'region'){
    $('#drink-type-select-div').fadeOut();
    $('#search-text-div').fadeOut();
    $('#region-select-div').fadeIn();
  }

  else if(paramChoice === 'drink-type'){
    $('#region-select-div').fadeOut();
    $('#search-text-div').fadeOut();
    $('#drink-type-select-div').fadeIn();
  }

});





