// import filmCard from './templates/image-card.hbs';
import filmCard from './templates/markupOneCard.hbs';
import filmCards from './templates/cardMarkup.hbs';
import { NewServiceApi } from './authorization';
import modal, { id } from './modal';
import { substitutionOfValues } from './card';

const btnWatchedHeader = document.querySelector('#watched-header');
const btnQueueHeader = document.querySelector('#queue-header');
// const modalBtnWatched = document.querySelector('.button__watch');
// const modalBtnWQueue = document.querySelector('.button__queue');
const libraryDiv = document.querySelector('.library');

// console.log(btnWatchedHeader);

// для варианта с одним ключом
let STORAGE_KEY_WATCHED = 'watched';
let STORAGE_KEY_QUEUE = 'queue';
let localstorageFilmIdWatched = [];
let localstorageFilmIdQueue = [];

// разные ключи айди но одно значение
// let STORAGE_VALUE_WATCHED = 'watched';
// let STORAGE_VALUE_QUEUE = 'queue';
// const keyArray = [];

const newServiceApi = new NewServiceApi();

// modalBtnWatched.addEventListener('click', onBtnWatchedClick);

export default function onBtnWatchedClick() {
  localstorageFilmIdWatched.push(id);
  localStorage.setItem(
    STORAGE_KEY_WATCHED,
    JSON.stringify(localstorageFilmIdWatched)
  );

  //   if (!keyArray.includes(id)) {
  //     keyArray.push(id);
  //   }

  //   localStorage.setItem(id, STORAGE_KEY_WATCHED);

  //   console.log(keyArray);
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
  //   libraryDiv.innerHTML = '';
  const noWatchedMessage = 'There are no films in watched!';
  const watchedFilmsById = JSON.parse(
    localStorage.getItem(STORAGE_KEY_WATCHED)
  );

  //   if (libraryDiv === '') {
  //     return libraryDiv.insertAdjacentHTML('beforeend', noWatchedMessage);
  //   }
  watchedFilmsById.map(film => {
    newServiceApi.id = Number(film);
    newServiceApi.serviceIdMovie().then(res => {
      libraryDiv.insertAdjacentHTML('beforeend', filmCard(res));
    });
  });
}

// const removeWatched = document.querySelector('.???')
// removeWatched.addEventListener('click');

// function onRemoveBtnClick() {
//     localStorage.removeItem('???');
// }

btnQueueHeader.addEventListener('click', renderQueueList);

function renderQueueList() {}
