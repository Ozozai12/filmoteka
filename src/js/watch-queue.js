// import filmCard from './templates/image-card.hbs';
import filmCard from './templates/markupOneCard.hbs';
import filmCards from './templates/cardMarkup.hbs';
import { NewServiceApi } from './authorization';
import modal, { id } from './modal';
import nothingHereUrl from '../images/nothingHere.webp';

const btnWatchedHeader = document.querySelector('#watched-header');
const btnQueueHeader = document.querySelector('#queue-header');
const libraryDiv = document.querySelector('.library');

let STORAGE_KEY_WATCHED = 'watched';
let STORAGE_KEY_QUEUE = 'queue';
let localstorageFilmIdWatched = [];
let localstorageFilmIdQueue = [];

const newServiceApi = new NewServiceApi();

renderWatchedList();

// function onBtnWatchedClick() {
//   const watchedFilmsById = JSON.parse(
//     localStorage.getItem(STORAGE_KEY_WATCHED)
//   );

//   if (watchedFilmsById && watchedFilmsById.includes(id)) {
//     return;
//   }
//   if (!watchedFilmsById) {
//     localstorageFilmIdWatched.push(id);
//     localStorage.setItem(
//       STORAGE_KEY_WATCHED,
//       JSON.stringify(localstorageFilmIdWatched)
//     );
//   }

//   if (watchedFilmsById) {
//     localstorageFilmIdWatched = watchedFilmsById.concat(id);
//     localStorage.setItem(
//       STORAGE_KEY_WATCHED,
//       JSON.stringify(localstorageFilmIdWatched)
//     );
//   }

//   if (libraryDiv) {
//     libraryDiv.innerHTML = '';
//   }

//   renderCards(localstorageFilmIdWatched);
// }

// function onBtnQueueClick() {
//   const watchedFilmsById = JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE));

//   if (watchedFilmsById && watchedFilmsById.includes(id)) {
//     return;
//   }
//   if (!watchedFilmsById) {
//     localstorageFilmIdQueue.push(id);
//     localStorage.setItem(
//       STORAGE_KEY_QUEUE,
//       JSON.stringify(localstorageFilmIdQueue)
//     );
//   }

//   if (watchedFilmsById) {
//     localstorageFilmIdQueue = watchedFilmsById.concat(id);
//     localStorage.setItem(
//       STORAGE_KEY_QUEUE,
//       JSON.stringify(localstorageFilmIdQueue)
//     );
//   }

//   if (libraryDiv) {
//     libraryDiv.innerHTML = '';
//   }

//   renderCards(localstorageFilmIdQueue);
// }

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

  if (libraryDiv) {
    renderCards(watchedFilmsById);
  }
}

function renderQueueList() {
  if (libraryDiv) {
    libraryDiv.innerHTML = '';
  }

  const watchedFilmsById = JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE));

  if (libraryDiv) {
    renderCards(watchedFilmsById);
  }
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

  if (!watchedFilmsById || watchedFilmsById.length === 0) {
    libraryDiv.innerHTML = `<div STYLE="margin:0 auto"><img src="${nothingHereUrl}" min-width="600" min-height="600" alt="nothingHere" class="kitten"></img></div>`;
    let intViewportHeight = window.innerHeight-522;
    libraryDiv.style.minHeight = `${intViewportHeight}px`;
  }
  if (watchedFilmsById) {
    watchedFilmsById.map(film => {
      newServiceApi.id = Number(film);
      newServiceApi.serviceIdMovie().then(res => {

     
      res.genres = res.genres.splice(0, 2)
      res.release_date = res.release_date.slice(0, 4);
      res.vote_average = res.vote_average.toFixed(1);
        

        if (libraryDiv) {
          libraryDiv.insertAdjacentHTML('beforeend', filmCard(res));
        } 
      });
    });
  }
}

export {
  onBtnWatchedClick,
  onBtnWatchedRemoveClick,
  onBtnQueueClick,
  onBtnQueueRemoveClick,
  renderCards,
};
