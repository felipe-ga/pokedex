function buildListOfPokemonHtml(response){
    let html = "";
    pokemons = response.pokemon;
    totalPages = Math.ceil(response.count / response.limit);
    pagePrevious = response.nextPage - 2;
    $.each(pokemons, function (index, pokemon) { 
        let body = `<div class="container">
                    <section class="mx-auto my-5 section-card">
                        <div class="card testimonial-card mt-2 mb-3">
                            <div class="card-up aqua-gradient"></div>
                            <div class="avatar mx-auto white">
                            <img src="${pokemon.photo == null ? 'https://www.pngwing.com/es/free-png-awfzy' : pokemon.photo}" class="rounded-circle img-fluid"
                                alt="${pokemon.name}">
                            </div>
                            <div class="card-body text-center">
                                <p class="card-title type-pokemon">Name: <span class="font-weight-bold">${pokemon.name == undefined ? 'No name' : pokemon.name}</span></p>
                                <p class="card-title type-pokemon">Weight: <span class="font-weight-bold">${pokemon.weight == undefined ? 'No weight' : pokemon.weight}</span></p>
                                {list-types}
                                <br>
                                {list-abilities}
                                <hr>
                                <p>
                                    <a title="see details" onclick="findEvolutions(${pokemon.idPokemon});" target="" href="#">See details</a>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>`;
        let bodyFinal = body.replace('{list-types}', buildHtmlType(pokemon.types)).replace('{list-abilities}', buildHtmlAbility(pokemon.abilities));
        
        html += bodyFinal;
   });
   calculateDataPagination(response.nextPage);
   $("#content-pokemon").html(html);
}

function buildHtmlAbility(abilities){
    let htmlAbilityFinal = `
    <div class="">
        <h5 class="card-title type-pokemon">Ability:</h5> 
        <ul class="list-group">
            {list-abilities}
        </ul>   
    </div>`;
    let htmlAbility = ``;
    $.each(abilities, function (i,ability) {
        htmlAbility += `<li class="list-group-item"><span class="font-weight-bold">${ability.name}</span></li>`;
    }); 
    return htmlAbilityFinal.replace('{list-abilities}', htmlAbility);
}


function buildHtmlType(types){
    let htmlTypesFinal = `
    <div class="">
        <h5 class="card-title type-pokemon">Types:</h5> 
        <ul class="list-group">
            {list-types}
        </ul>   
    </div>`;
    let htmlTypes = ``;
    $.each(types, function (i,type) {
            htmlTypes += `<li class="list-group-item"><span class="font-weight-bold">${type.name}</span></li>`;
    }); 
    return htmlTypesFinal.replace('{list-types}', htmlTypes);
}

function setInformationEvolutions(response){
    let pokemon = pokemons.find(p => p.idPokemon == response.idPokemon);
    let evolutions = "";
    evolutions += `
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${pokemon.photo == undefined ? 'No name' : pokemon.photo}" class="img-fluid rounded-start" alt="${pokemon.name}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                            <h5 class="card-title"><span class="font-weight-bold">Name:</span> ${pokemon.name == undefined ? '' : pokemon.name}</h5>
                            <p class="card-text"><span class="font-weight-bold">Effect:</span> ${response.effect.short_effect == undefined ? '' : response.effect.short_effect}</p>
                            </div>
                        </div>
                    </div>
                </div>`;

    evolutions += `<h5 class="card-title">Evolutions</h5>`;
    response.evolves = response.evolves.filter(x => x.name !==pokemon.name);
    let htmlEvolutions = `
    <div class="card">
        <div class="card-body pb-0">
            <div class="news">
                {li-evolutions}
            </div>
        </div>
    </div>`;
    let htmlList = ``;
    $.each(response.evolves, function (i, p) { 
        htmlList += `
        <div class="post-item clearfix">
            <img src="${p.photo == null ? '' : p.photo}" class="img-fluid rounded-start evolution-character" alt="${p.name}">
            <h4><a href="#">${p.name == null ? '' : p.name}</a></h4>
        </div>`;

    });
    evolutions += htmlEvolutions.replace('{li-evolutions}', htmlList);
    $("#modal-body").html(evolutions);
    openModal("modal-detail-pokemon");
}

