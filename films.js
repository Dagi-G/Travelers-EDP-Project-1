let filmH1;
let releasedSpan;
let directorSpan;
let episodeSpan;
let charDiv;
let planetDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;


addEventListener('DOMContentLoaded', () => {
    filmH1 = document.querySelector("#film");
    releasedSpan = document.querySelector("#released")    
    directorSpan = document.querySelector("#director")    
    episodeSpan = document.querySelector("#episode")    
    planetSpan = document.querySelector('#planet');
    charactersUl = document.querySelector('#characters > ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getFilms(id)
});

async function getFilms(id) {
    let film
    try {
        film = await fetchFilms(id)
        film.characters = await fetchCharacter(film.characters)
        film.planets = await fetchPlanets(film.planets)

    }
    catch (ex) {
        console.error(`Error reading film ${id} data`, ex.message)
    }
  renderFilm(film)
}
async function fetchFilms(id) {
    const filmUrl = `${baseUrl}/films/${id}`
    return await fetch(filmUrl)
      .then(res => res.json())
}
async function fetchCharacter(film) {
    const url = `${baseUrl}/films/${film?.id}/characters`;
    const characters = await fetch(url)
      .then(res => res.json())
    return characters
}
async function fetchPlanets(id) {
    const url = `${baseUrl}/films/${id}/planets`;
    const planets = await fetch(url)
      .then(res => res.json())
    return planets;
}
const renderFilm = film => {
  document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
  filmH1.textContent = film?.title;
  releasedSpan.textContent = film?.release_date;
  directorSpan.textContent = film?.director;
  episodeSpan.textContent = film?.episode_id
  planetSpan.innerHTML = `<a href="/planets.html?id=${film?.planets[0].id}">${film?.planets[0].name}</a>`
  const charactersLis = film?.characters?.map(character => `<li><a href="/characters.html?id=${character.id}">${character.name}</li>`)
  charactersUl.innerHTML = charactersLis.join("");
}


  