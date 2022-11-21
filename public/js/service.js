function executeApi(url, func){
    $.ajax({
        url: url,
        beforeSend: function() {
            Swal.fire({
                title: 'Loading data...',
                html: 'Please wait...',
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading()
                }
              });
        },
        success: function(data) {
            func(data);
            swal.close();
        },
        error: function(){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })
        },
        type: 'GET'
      });
}

function findEvolutions(idPokemon){
  let url = hots + findEvolutionsEndPoint.replace("{idPokemon}", idPokemon);
  executeApi(url, setInformationEvolutions);
}

function init(page){
  let url = hots + findByPageEndPoint.replace("{page}", page).replace("{limit}", limit);
  executeApi(url, buildListOfPokemonHtml);
}