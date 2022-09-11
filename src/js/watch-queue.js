// import filmCard from './templates/image-card.hbs';
import filmCard from './templates/markupOneCard.hbs';
import filmCards from './templates/cardMarkup.hbs';
import { NewServiceApi } from './authorization';
import modal, { id } from './modal';
import { substitutionOfValues } from './card';

const btnWatchedHeader = document.querySelector('#watched-header');
const btnQueueHeader = document.querySelector('#queue-header');
// const modalBtnWatched = document.querySelector('.button__watch');
const modalBtnWQueue = document.querySelector('.button__queue');
const libraryDiv = document.querySelector('.library');
// const removeBtnWatch = document.querySelector('.button__remove');

// для варианта с одним ключом
let STORAGE_KEY_WATCHED = 'watched';
let STORAGE_KEY_QUEUE = 'queue';
let localstorageFilmIdWatched = [];
let localstorageFilmIdQueue = [];

const newServiceApi = new NewServiceApi();

function onBtnWatchedClick() {
  const watchedFilmsById = JSON.parse(
    localStorage.getItem(STORAGE_KEY_WATCHED)
  );

  if (!watchedFilmsById) {
    localstorageFilmIdWatched.push(id);
    localStorage.setItem(
      STORAGE_KEY_WATCHED,
      JSON.stringify(localstorageFilmIdWatched)
    );
  }
  localstorageFilmIdWatched = watchedFilmsById.concat(id);
  //   localstorageFilmIdWatched.push(id);
  localStorage.setItem(
    STORAGE_KEY_WATCHED,
    JSON.stringify(localstorageFilmIdWatched)
  );
}

//   const modalBtnWQueue = document.querySelector('.button__queue');
//   modalBtnWQueue.addEventListener('click', onBtnQueueClick);

// export default function onBtnQueueClick() {
//      localstorageFilmIdQueue.push(id);
//   localStorage.setItem(
//     STORAGE_KEY_QUEUE,
//     JSON.stringify(localstorageFilmIdQueue)
//   );
// }

//   НУЖНА КНОПКА REMOVE В МОДАЛКЕ!!!!!!!!!!
// function localStorageRemove() {
//   localStorage.removeItem(STORAGE_KEY_WATCHED);
// }

btnWatchedHeader.addEventListener('click', renderWatchedList);

function renderWatchedList() {
  libraryDiv.innerHTML = '';

  const watchedFilmsById = JSON.parse(
    localStorage.getItem(STORAGE_KEY_WATCHED)
  );

  watchedFilmsById.map(film => {
    newServiceApi.id = Number(film);
    newServiceApi.serviceIdMovie().then(res => {
      libraryDiv.insertAdjacentHTML('beforeend', filmCard(res));
    });
  });
}

// btnQueueHeader.addEventListener('click', renderQueueList);

// function renderQueueList() {}

// const removeBtnWatch = document.querySelector('.button__remove');
// modalBtnWQueue.addEventListener('click', onBtnRemoveClick);

// function onBtnRemoveClick() {
//   const watchedFilmsById = JSON.parse(
//     localStorage.getItem(STORAGE_KEY_WATCHED)
//   );
//   console.log(watchedFilmsById);
// localStorage.removeItem();
// }

export { onBtnWatchedClick, onBtnRemoveClick };
