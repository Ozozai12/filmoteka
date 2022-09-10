// import filmCard from './templates/image-card.hbs';
import filmCard from './templates/cardMarkup.hbs';
import { NewServiceApi } from './authorization';

const btnWatchedHeader = document.querySelector('#watched-header');
const btnQueueHeader = document.querySelector('#queue-header');
const modalBtnWatched = document.querySelector('.button__watch');
const modalBtnWQueue = document.querySelector('.button__queue');
const libraryGallaryDiv = document.querySelector('.gallary')

let STORAGE_KEY = 'filmId';

const newServiceApi = new NewServiceApi();

const watched = document.querySelector('.watched');
const watchedDiv = document.querySelector('.watched__container');
const wachedFilms = document.querySelector('.watched__films');

watched.addEventListener('click', renderWatchPage);

function onBtnWatchedClick() {
  newServiceApi.serviceMovieTopApi().then(renderWatchPage);
}

function renderWatchPage() {
  // watchedDiv.insertAdjacentHTML('beforeend', filmCard);
  // console.log(filmCard);
  console.log(
    newServiceApi.serviceMovieTopApi().then(data => {
      const apiCardId = `film ID: ${data.results[0].id}`;
      // watchedDiv.insertAdjacentHTML('beforeend', apiCardId);
      console.log(data.results);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(apiCardId));
      // console.log(testApiCard);
    })
  );
}

const remove = document.querySelector('.remove');
remove.addEventListener('click', localStorageRemove);

function localStorageRemove() {
  localStorage.removeItem(STORAGE_KEY);
}

wachedFilms.addEventListener('click', readLocalStorage);

function readLocalStorage() {
  watchedDiv.innerHTML = '';
  const noWatchedMessage = 'There are no films in watched!';
  const localStorageFilm = localStorage.getItem(STORAGE_KEY);
  const parsedStorageFilm = JSON.parse(localStorageFilm);

  if (!parsedStorageFilm) {
    return watchedDiv.insertAdjacentHTML('beforeend', noWatchedMessage);
  }
  return watchedDiv.insertAdjacentHTML('beforeend', parsedStorageFilm);
}
