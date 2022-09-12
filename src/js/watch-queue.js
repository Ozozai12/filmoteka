// import filmCard from './templates/image-card.hbs';
import filmCard from './templates/markupOneCard.hbs';
import filmCards from './templates/cardMarkup.hbs';
import { NewServiceApi } from './authorization';
import modal, { id } from './modal';

const btnWatchedHeader = document.querySelector('#watched-header');
const btnQueueHeader = document.querySelector('#queue-header');
const libraryDiv = document.querySelector('.library');

let STORAGE_KEY_WATCHED = 'watched';
let STORAGE_KEY_QUEUE = 'queue';
let localstorageFilmIdWatched = [];
let localstorageFilmIdQueue = [];

const newServiceApi = new NewServiceApi();

renderWatchedList();

function onBtnWatchedClick() {
  const watchedFilmsById = JSON.parse(
    localStorage.getItem(STORAGE_KEY_WATCHED)
  );

  if (watchedFilmsById && watchedFilmsById.includes(id)) {
    return;
  }
  if (!watchedFilmsById) {
    localstorageFilmIdWatched.push(id);
    localStorage.setItem(
      STORAGE_KEY_WATCHED,
      JSON.stringify(localstorageFilmIdWatched)
    );
  }
  localstorageFilmIdWatched = watchedFilmsById.concat(id);
  localStorage.setItem(
    STORAGE_KEY_WATCHED,
    JSON.stringify(localstorageFilmIdWatched)
  );

  if (libraryDiv) {
    libraryDiv.innerHTML = '';
  }

  renderCards(localstorageFilmIdWatched);
}

function onBtnQueueClick() {
  const watchedFilmsById = JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE));

  if (watchedFilmsById && watchedFilmsById.includes(id)) {
    return;
  }
  if (!watchedFilmsById) {
    localstorageFilmIdQueue.push(id);
    localStorage.setItem(
      STORAGE_KEY_QUEUE,
      JSON.stringify(localstorageFilmIdQueue)
    );
  }
  localstorageFilmIdQueue = watchedFilmsById.concat(id);
  localStorage.setItem(
    STORAGE_KEY_QUEUE,
    JSON.stringify(localstorageFilmIdQueue)
  );

  if (libraryDiv) {
    libraryDiv.innerHTML = '';
  }

  renderCards(localstorageFilmIdQueue);
}

if (libraryDiv) {
  btnWatchedHeader.addEventListener('click', renderWatchedList);
  btnQueueHeader.addEventListener('click', renderQueueList);
}

function renderWatchedList() {
  if (libraryDiv) {
    libraryDiv.innerHTML = '';
  }

  const watchedFilmsById = JSON.parse(
    localStorage.getItem(STORAGE_KEY_WATCHED)
  );

  renderCards(watchedFilmsById);
}

function renderQueueList() {
  if (libraryDiv) {
    libraryDiv.innerHTML = '';
  }

  const watchedFilmsById = JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE));
  renderCards(watchedFilmsById);
}

function onBtnWatchedRemoveClick() {
  const watchedFilmsById = JSON.parse(
    localStorage.getItem(STORAGE_KEY_WATCHED)
  );

  localstorageFilmIdWatched = watchedFilmsById;

  const filmId = id;
  const index = localstorageFilmIdWatched.indexOf(filmId);

  if (!watchedFilmsById.includes(filmId)) {
    return;
  }
  localstorageFilmIdWatched.splice(index, 1);
  localStorage.setItem(
    STORAGE_KEY_WATCHED,
    JSON.stringify(localstorageFilmIdWatched)
  );

  if (libraryDiv) {
    libraryDiv.innerHTML = '';
  }

  renderCards(watchedFilmsById);
}

function onBtnQueueRemoveClick() {
  const watchedFilmsById = JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE));

  localstorageFilmIdQueue = watchedFilmsById;

  const filmId = id;
  const index = localstorageFilmIdQueue.indexOf(filmId);

  if (!watchedFilmsById.includes(filmId)) {
    return;
  }
  localstorageFilmIdQueue.splice(index, 1);
  localStorage.setItem(
    STORAGE_KEY_QUEUE,
    JSON.stringify(localstorageFilmIdQueue)
  );

  if (libraryDiv) {
    libraryDiv.innerHTML = '';
  }

  renderCards(watchedFilmsById);
}

function renderCards(watchedFilmsById) {
  if (libraryDiv) {
    watchedFilmsById.map(film => {
      newServiceApi.id = Number(film);
      newServiceApi.serviceIdMovie().then(res => {
        libraryDiv.insertAdjacentHTML('beforeend', filmCard(res));
      });
    });
  }
}

export {
  onBtnWatchedClick,
  onBtnWatchedRemoveClick,
  onBtnQueueClick,
  onBtnQueueRemoveClick,
};
