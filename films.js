let filmH1;
let releasedSpan;
let directorSpan;
let episodeSpan;
let charDiv;
let planetDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;


addEventListener('DOMcontentLoaded', () => {
    filmH1 = document.querySelector("h1#film");
    releasedSpan = document.querySelector("span#released")    
    directorSpan = document.querySelector("span#director")    
    episodeSpan = document.querySelector("span#episode")    
    planetSpan = document.querySelector('span#planet');
    characterSpan = document.querySelector('span#character');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getFilms(id)
});

async function getFilms(id) {
    let films
    try {
        films = await fetchFilms(id)
        films.character = await fetchCharacter(id)
        films.planets = await fetchPlanets(id)
    }
    catch (ex) {
        console.error(`Error reading film ${id} data`, ex.message)
    }
  renderFilm(films)
}
async function fetchFilms(id) {
    let filmUrl = `${baseUrl}/films/${id}`
    return await fetch(filmUrl)
    .then(res => res.json())
}
async function fetchCharacter(films) {
    const url = `${baseUrl}/films/${films}/characters`;
    const character = await fetch(url)
      .then(res => res.json())
    return character
}
async function fetchPlanet(films) {
    const url = `${baseUrl}/films/${films}/planets}`;
    const planet = await fetch(url)
      .then(res => res.json())
    return planet;
}
const renderFilm = film => {
  document.title = `SWAPI - ${films?.title}`;  // Just to make the browser tab say their name
  filmH1.textContent = films?.title;
  releasedSpan.textContent = film?.released;
  directorSpan.textContent = films?.director;
  episodeSpan.textContent = films?.episode_id;
  console.log(title)
  console.log(films)
}
  