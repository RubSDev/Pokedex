const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
const pokemon = document.getElementById("pokemonName");
const buttonSearch = document.getElementById("searchPokemon");
const buttonDelete = document.getElementById("deletePokemon");
const appNode = document.getElementById("app");

buttonSearch.addEventListener("click", insertPokemon);
//Mobile
//buttonSearch.addEventListener("touchstart", insertPokemon);

buttonDelete.addEventListener("click", deletePokemon);
//Mobile
//buttonDelete.addEventListener("touchstart", deletePokemon);

function insertPokemon() {
  window
    .fetch(`${baseUrl}${pokemon.value.toLowerCase()}`)
    .then((response) => {
      if (response.status == 404) {
        alert("This pokemon is not avalible. Try with another one!");
      } else {
        return response.json();
      }
    })
    .then((responseJSON) => {
      const allItems = [];

      const result = [];

      for (let pokemonInfo in responseJSON) {
        result.push([pokemonInfo, responseJSON[pokemonInfo]]);
      }

      console.table(result);
      //*Crear imagen
      const pokemonImage = document.createElement("img");
      pokemonImage.src = result[14][1].front_default;

      //*Nombre e ID
      const pokemonName = document.createElement("h2");
      pokemonName.innerText = `Name:${result[10][1]} - ID: ${result[6][1]}`;

      //*Type
      const pokemonType = document.createElement("h2");
      pokemonType.innerText = `Type:${result[16][1][0].type.name}`;

      //*Contenedor
      const container = document.createElement("div");
      container.append(pokemonImage, pokemonName, pokemonType);

      allItems.push(container);

      appNode.append(...allItems);
    });
}

function deletePokemon() {
  let allPokemon = appNode.childNodes; //*Node list
  allPokemon = Array.from(allPokemon); //*Array

  allPokemon.forEach((pokemon) => {
    pokemon.remove(pokemon);
  });
}
