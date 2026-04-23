(async () => {
    const TOTAL_POKEMONS = 151;
    const TOTAL_PAGES = 10;
    const fs = require('fs');

    let fileContent = '';
    const pokemonsNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`).then(res => res.json());

    filecontent  = '\n';
    for (let i = 1; i <= TOTAL_PAGES; i++) {
        fileContent += `\n/pokemons/page/${i}`;
    }

    pokemonsNameList.results.forEach((pokemon) => {
        fileContent += `\n/pokemon/${pokemon.name}`;
    });

    fs.writeFileSync('routes.txt', fileContent);
    console.log('Generaed routes!');

})()