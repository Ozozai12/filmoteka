import ApiService from './authorization';
import {
  onBtnWatchedClick,
  onBtnWatchedRemoveClick,
  onBtnQueueClick,
  onBtnQueueRemoveClick,
  renderCards,
} from './watch-queue';
// получаем переменные

const modalBox = document.querySelector('.backdrop-modal');

const cardImgG = document.querySelector('.gallery');
const cardImgL = document.querySelector('.library');

let id;
let respData;
let genreList = [];
let listOfGenres;
let newApiService = new ApiService();
let imgBox;

let STORAGE_KEY_WATCHED = 'watched';
let STORAGE_KEY_QUEUE = 'queue';
let localstorageFilmIdWatched = [];
let localstorageFilmIdQueue = [];

const savedTheme = localStorage.getItem('theme');
const modal = document.querySelector('.modal-window');

const btnWatchedHeader = document.querySelector('#watched-header');
const btnQueueHeader = document.querySelector('#queue-header');

modalBox.innerHTML = '';

// вызываем модальное окно с карточкой

if (cardImgG) {
  cardImgG.addEventListener('click', getId);
}
if (cardImgL) {
  cardImgL.addEventListener('click', getId);
}

// получаем id карточки, на которую кликнули

function getId(evt) {
  if (
    (evt.target.nodeName !== 'P' && evt.target.nodeName !== 'IMG') ||
    evt.target.classList.contains('kitten')
  ) {
    return;
  }

  // modalBox.classList.remove('is-hidden');
  id = evt.target.getAttribute('data-id');

  openModal(id);
}

// вызываем модалку

export default async function openModal(id) {
  if (
    !localStorage.getItem(STORAGE_KEY_WATCHED) &&
    !localStorage.getItem(STORAGE_KEY_QUEUE)
  ) {
    localStorage.setItem(
      STORAGE_KEY_WATCHED,
      JSON.stringify(localstorageFilmIdWatched)
    );

    localStorage.setItem(
      STORAGE_KEY_QUEUE,
      JSON.stringify(localstorageFilmIdQueue)
    );
  }

  newApiService.idNumber = id;

  respData = await newApiService.serviceIdMovie();

  // получаем список жанров

  const genres = Object.values(respData.genres);

  for (const genre of genres) {
    genreList.push(genre.name);
  }

  listOfGenres = genreList.join(', ');

  // рендерим динамическую разметку модалки при клике на карточку с фильмом
  modalBox.classList.remove('is-hidden');
  modalBox.insertAdjacentHTML('afterBegin', createModal());

  const savedTheme = localStorage.getItem('theme');
  const modal = document.querySelector('.modal-window');

  updataModalTheme();
  function updataModalTheme() {
    if (savedTheme === 'loaded dark-theme') {
      modal.classList.add('dark-theme');
    }
  }

  document.body.style.overflow = 'hidden';

  // подставляем дефолтное изображение если нет постера

  imgBox = document.querySelector('.image-box');

  if (respData.poster_path === null) {
    imgBox.innerHTML = `<img
      src="https://cdn.pixabay.com/photo/2014/03/25/16/27/movie-297135_960_720.png"
      alt="Txt"
      class="modal__image"
    />`;
  }

  // добавляем трейлер фильма

  newApiService.idVideo = id;
  const respTrailer = await newApiService.serviceTrailerMovie();
  if (respTrailer.results[0]) {
    imgBox.innerHTML = `
  <img
    src="https://image.tmdb.org/t/p/w500${respData.poster_path}"
    alt="Txt"
    class="modal__image"
    width="240px"
  />
  <button class="play_video">
  <a href="#" class="playBut">

  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
    x="0px"
    y="0px"
    width="64px"
    height="64px"
    viewBox="0 0 213.7 213.7"
    enable-background="new 0 0 213.7 213.7"
    xml:space="preserve"
    stroke-width="15"
  >
    <polygon
      class="triangle"
      id="XMLID_18_"
      fill="none"
      stroke-width="15"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-miterlimit="10"
      points="
73.5,62.5 148.5,105.8 73.5,149.1 "
    />

    <circle
      class="circle"
      id="XMLID_17_"
      fill="none"
      stroke-width="7"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-miterlimit="10"
      cx="106.8"
      cy="106.8"
      r="103.3"
    />
  </svg>
</a>
</button>`;

    document.querySelector('.play_video').addEventListener('click', e => {
      e.preventDefault();
      imgBox.innerHTML = `<iframe
      class="treiler_iframe"
          width="240"
          height="437"
          src="https://www.youtube.com/embed/${respTrailer.results[0].key}"
          frameborder="0"
          allowfullscreen
           >
           </iframe>`;
    });
  }

  const btnClose = document.querySelector('.button__modal-close');

  // вызов закрытия модалки

  btnClose.addEventListener('click', onModalClose);
  window.addEventListener('keydown', onModalCloseEsc);
  window.addEventListener('click', onModalCloseBckdrp);

  // Слушатели на кнопки для локалсторедж (Олег)
  if (cardImgL) {
    if (btnQueueHeader.classList.contains('btn__library--current')) {
      const modalBtnWatched = document.querySelector('.button__watch');
      modalBtnWatched.addEventListener('click', e => {
        const watchedFilmsById = JSON.parse(
          localStorage.getItem(STORAGE_KEY_WATCHED)
        );

        if (watchedFilmsById && watchedFilmsById.includes(id)) {
          return;
        }
        if (!watchedFilmsById) {
          modalBtnWatched.classList.toggle('visually-hidden');
          removeBtnWatch.classList.toggle('visually-hidden');
          localstorageFilmIdWatched.push(id);
          localStorage.setItem(
            STORAGE_KEY_WATCHED,
            JSON.stringify(localstorageFilmIdWatched)
          );
        }

        if (watchedFilmsById) {
          modalBtnWatched.classList.toggle('visually-hidden');
          removeBtnWatch.classList.toggle('visually-hidden');
          localstorageFilmIdWatched = watchedFilmsById.concat(id);
          localStorage.setItem(
            STORAGE_KEY_WATCHED,
            JSON.stringify(localstorageFilmIdWatched)
          );
        }

        //  if (cardImgL) {
        //    cardImgL.innerHTML = '';
        //  }

        //  renderCards(localstorageFilmIdWatched);
      });

      const removeBtnWatch = document.querySelector('.button__remove--watch');
      removeBtnWatch.addEventListener('click', e => {
        const watchedFilmsById = JSON.parse(
          localStorage.getItem(STORAGE_KEY_WATCHED)
        );

        localstorageFilmIdWatched = watchedFilmsById;

        const filmId = id;
        const index = localstorageFilmIdWatched.indexOf(filmId);

        if (!watchedFilmsById.includes(filmId)) {
          return;
        }
        modalBtnWatched.classList.toggle('visually-hidden');
        removeBtnWatch.classList.toggle('visually-hidden');
        localstorageFilmIdWatched.splice(index, 1);
        localStorage.setItem(
          STORAGE_KEY_WATCHED,
          JSON.stringify(localstorageFilmIdWatched)
        );

        //  if (cardImgL) {
        //    cardImgL.innerHTML = '';
        //  }

        //  renderCards(watchedFilmsById);
      });

      const modalBtnWQueue = document.querySelector('.button__queue');
      modalBtnWQueue.addEventListener('click', e => {
        const watchedFilmsById = JSON.parse(
          localStorage.getItem(STORAGE_KEY_QUEUE)
        );

        if (watchedFilmsById && watchedFilmsById.includes(id)) {
          return;
        }
        if (!watchedFilmsById) {
          modalBtnWQueue.classList.toggle('visually-hidden');
          removeBtnQueue.classList.toggle('visually-hidden');
          localstorageFilmIdQueue.push(id);
          localStorage.setItem(
            STORAGE_KEY_QUEUE,
            JSON.stringify(localstorageFilmIdQueue)
          );
        }

        if (watchedFilmsById) {
          modalBtnWQueue.classList.toggle('visually-hidden');
          removeBtnQueue.classList.toggle('visually-hidden');
          localstorageFilmIdQueue = watchedFilmsById.concat(id);
          localStorage.setItem(
            STORAGE_KEY_QUEUE,
            JSON.stringify(localstorageFilmIdQueue)
          );
        }

        if (cardImgL) {
          cardImgL.innerHTML = '';
        }

        renderCards(localstorageFilmIdQueue);
      });

      const removeBtnQueue = document.querySelector('.button__remove--queue');
      removeBtnQueue.addEventListener('click', e => {
        const watchedFilmsById = JSON.parse(
          localStorage.getItem(STORAGE_KEY_QUEUE)
        );

        localstorageFilmIdQueue = watchedFilmsById;

        const filmId = id;
        const index = localstorageFilmIdQueue.indexOf(filmId);

        if (!watchedFilmsById.includes(filmId)) {
          return;
        }
        modalBtnWQueue.classList.toggle('visually-hidden');
        removeBtnQueue.classList.toggle('visually-hidden');
        localstorageFilmIdQueue.splice(index, 1);
        localStorage.setItem(
          STORAGE_KEY_QUEUE,
          JSON.stringify(localstorageFilmIdQueue)
        );

        if (cardImgL) {
          cardImgL.innerHTML = '';
        }

        renderCards(watchedFilmsById);
      });
    }

    if (btnWatchedHeader.classList.contains('btn__library--current')) {
      const modalBtnWatched = document.querySelector('.button__watch');
      modalBtnWatched.addEventListener('click', e => {
        const watchedFilmsById = JSON.parse(
          localStorage.getItem(STORAGE_KEY_WATCHED)
        );

        if (watchedFilmsById && watchedFilmsById.includes(id)) {
          return;
        }
        if (!watchedFilmsById) {
          modalBtnWatched.classList.toggle('visually-hidden');
          removeBtnWatch.classList.toggle('visually-hidden');
          localstorageFilmIdWatched.push(id);
          localStorage.setItem(
            STORAGE_KEY_WATCHED,
            JSON.stringify(localstorageFilmIdWatched)
          );
        }

        if (watchedFilmsById) {
          modalBtnWatched.classList.toggle('visually-hidden');
          removeBtnWatch.classList.toggle('visually-hidden');
          localstorageFilmIdWatched = watchedFilmsById.concat(id);
          localStorage.setItem(
            STORAGE_KEY_WATCHED,
            JSON.stringify(localstorageFilmIdWatched)
          );
        }

        if (cardImgL) {
          cardImgL.innerHTML = '';
        }

        renderCards(localstorageFilmIdWatched);
      });

      const removeBtnWatch = document.querySelector('.button__remove--watch');
      removeBtnWatch.addEventListener('click', e => {
        const watchedFilmsById = JSON.parse(
          localStorage.getItem(STORAGE_KEY_WATCHED)
        );

        localstorageFilmIdWatched = watchedFilmsById;

        const filmId = id;
        const index = localstorageFilmIdWatched.indexOf(filmId);

        if (!watchedFilmsById.includes(filmId)) {
          return;
        }
        modalBtnWatched.classList.toggle('visually-hidden');
        removeBtnWatch.classList.toggle('visually-hidden');
        localstorageFilmIdWatched.splice(index, 1);
        localStorage.setItem(
          STORAGE_KEY_WATCHED,
          JSON.stringify(localstorageFilmIdWatched)
        );

        if (cardImgL) {
          cardImgL.innerHTML = '';
        }

        renderCards(watchedFilmsById);
      });

      const modalBtnWQueue = document.querySelector('.button__queue');
      modalBtnWQueue.addEventListener('click', e => {
        const watchedFilmsById = JSON.parse(
          localStorage.getItem(STORAGE_KEY_QUEUE)
        );

        if (watchedFilmsById && watchedFilmsById.includes(id)) {
          return;
        }
        if (!watchedFilmsById) {
          modalBtnWQueue.classList.toggle('visually-hidden');
          removeBtnQueue.classList.toggle('visually-hidden');
          localstorageFilmIdQueue.push(id);
          localStorage.setItem(
            STORAGE_KEY_QUEUE,
            JSON.stringify(localstorageFilmIdQueue)
          );
        }

        if (watchedFilmsById) {
          modalBtnWQueue.classList.toggle('visually-hidden');
          removeBtnQueue.classList.toggle('visually-hidden');
          localstorageFilmIdQueue = watchedFilmsById.concat(id);
          localStorage.setItem(
            STORAGE_KEY_QUEUE,
            JSON.stringify(localstorageFilmIdQueue)
          );
        }

        // if (cardImgL) {
        //   cardImgL.innerHTML = '';
        // }

        // renderCards(localstorageFilmIdQueue);
      });

      const removeBtnQueue = document.querySelector('.button__remove--queue');
      removeBtnQueue.addEventListener('click', e => {
        const watchedFilmsById = JSON.parse(
          localStorage.getItem(STORAGE_KEY_QUEUE)
        );

        localstorageFilmIdQueue = watchedFilmsById;

        const filmId = id;
        const index = localstorageFilmIdQueue.indexOf(filmId);

        if (!watchedFilmsById.includes(filmId)) {
          return;
        }
        modalBtnWQueue.classList.toggle('visually-hidden');
        removeBtnQueue.classList.toggle('visually-hidden');
        localstorageFilmIdQueue.splice(index, 1);
        localStorage.setItem(
          STORAGE_KEY_QUEUE,
          JSON.stringify(localstorageFilmIdQueue)
        );

        // if (cardImgL) {
        //   cardImgL.innerHTML = '';
        // }

        // renderCards(watchedFilmsById);
      });
    }
  }
  const modalBtnWatched = document.querySelector('.button__watch');
  modalBtnWatched.addEventListener('click', e => {
    const watchedFilmsById = JSON.parse(
      localStorage.getItem(STORAGE_KEY_WATCHED)
    );

    if (watchedFilmsById && watchedFilmsById.includes(id)) {
      return;
    }
    if (!watchedFilmsById) {
      modalBtnWatched.classList.toggle('visually-hidden');
      removeBtnWatch.classList.toggle('visually-hidden');
      localstorageFilmIdWatched.push(id);
      localStorage.setItem(
        STORAGE_KEY_WATCHED,
        JSON.stringify(localstorageFilmIdWatched)
      );
    }

    if (watchedFilmsById) {
      modalBtnWatched.classList.toggle('visually-hidden');
      removeBtnWatch.classList.toggle('visually-hidden');
      localstorageFilmIdWatched = watchedFilmsById.concat(id);
      localStorage.setItem(
        STORAGE_KEY_WATCHED,
        JSON.stringify(localstorageFilmIdWatched)
      );
    }

    if (cardImgL) {
      cardImgL.innerHTML = '';
    }

    renderCards(localstorageFilmIdWatched);
  });

  const removeBtnWatch = document.querySelector('.button__remove--watch');
  removeBtnWatch.addEventListener('click', e => {
    const watchedFilmsById = JSON.parse(
      localStorage.getItem(STORAGE_KEY_WATCHED)
    );

    localstorageFilmIdWatched = watchedFilmsById;

    const filmId = id;
    const index = localstorageFilmIdWatched.indexOf(filmId);

    if (!watchedFilmsById.includes(filmId)) {
      return;
    }
    modalBtnWatched.classList.toggle('visually-hidden');
    removeBtnWatch.classList.toggle('visually-hidden');
    localstorageFilmIdWatched.splice(index, 1);
    localStorage.setItem(
      STORAGE_KEY_WATCHED,
      JSON.stringify(localstorageFilmIdWatched)
    );

    if (cardImgL) {
      cardImgL.innerHTML = '';
    }

    renderCards(watchedFilmsById);
  });

  const modalBtnWQueue = document.querySelector('.button__queue');
  modalBtnWQueue.addEventListener('click', e => {
    const watchedFilmsById = JSON.parse(
      localStorage.getItem(STORAGE_KEY_QUEUE)
    );

    if (watchedFilmsById && watchedFilmsById.includes(id)) {
      return;
    }
    if (!watchedFilmsById) {
      modalBtnWQueue.classList.toggle('visually-hidden');
      removeBtnQueue.classList.toggle('visually-hidden');
      localstorageFilmIdQueue.push(id);
      localStorage.setItem(
        STORAGE_KEY_QUEUE,
        JSON.stringify(localstorageFilmIdQueue)
      );
    }

    if (watchedFilmsById) {
      modalBtnWQueue.classList.toggle('visually-hidden');
      removeBtnQueue.classList.toggle('visually-hidden');
      localstorageFilmIdQueue = watchedFilmsById.concat(id);
      localStorage.setItem(
        STORAGE_KEY_QUEUE,
        JSON.stringify(localstorageFilmIdQueue)
      );
    }

    if (cardImgL) {
      cardImgL.innerHTML = '';
    }

    renderCards(localstorageFilmIdQueue);
  });

  const removeBtnQueue = document.querySelector('.button__remove--queue');
  removeBtnQueue.addEventListener('click', e => {
    const watchedFilmsById = JSON.parse(
      localStorage.getItem(STORAGE_KEY_QUEUE)
    );

    localstorageFilmIdQueue = watchedFilmsById;

    const filmId = id;
    const index = localstorageFilmIdQueue.indexOf(filmId);

    if (!watchedFilmsById.includes(filmId)) {
      return;
    }
    modalBtnWQueue.classList.toggle('visually-hidden');
    removeBtnQueue.classList.toggle('visually-hidden');
    localstorageFilmIdQueue.splice(index, 1);
    localStorage.setItem(
      STORAGE_KEY_QUEUE,
      JSON.stringify(localstorageFilmIdQueue)
    );

    if (cardImgL) {
      cardImgL.innerHTML = '';
    }

    renderCards(watchedFilmsById);
  });
}

// Конец)

// console.log(btnWatchedHeader.classList.contains('btn__library--current'));
// разметка одной карточки модального окна фильма

function createModal() {
  modalBox.innerHTML = '';

  const watchedFilmsById = JSON.parse(
    localStorage.getItem(STORAGE_KEY_WATCHED)
  );

  const queueFilmsById = JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE));
  const baseMarkup = `
    <div class="modal-window">
        <div class="film-card" data-id=${id}>
            <div class="image-box">
            <img src="https://image.tmdb.org/t/p/original${
              respData.poster_path
            }" alt="${respData.title}" class="modal__image" loading='lazy'/>
            </div>
            <div>
                <h2 class="film-card__title">${respData.title}</h2>
    
                <table class="film-card__features">
                    <tbody>
                        <tr class="film-card__feature-list">
                            <td class="film-card__feature-name">Vote / Votes</td>
                            <td class="film-card__feature-description"><span class="vote">${respData.vote_average.toFixed(
                              1
                            )}</span> <span class="divider"> / </span> ${
    respData.vote_count
  }</td>
                        </tr>
                        <tr class="film-card__feature-list">
                            <td class="film-card__feature-name">Popularity</td>
                            <td class="film-card__feature-description">${respData.popularity.toFixed(
                              1
                            )}</td>
                        </tr>
                        <tr class="film-card__feature-list">
                            <td class="film-card__feature-name">Original Title</td>
                            <td class="film-card__feature-description original-title">${
                              respData.original_title
                            }</td>
                        </tr>
                        <tr class="film-card__feature-list">
                            <td class="film-card__feature-name">Genre</td>
                            <td class="film-card__feature-description">${listOfGenres}</td>
                        </tr>
                    </tbody>
                </table>
    
                <h3 class="about__title">About</h3>
                <p class="about__text">
                    ${respData.overview}
                </p>
            
          

        <button class="button__modal-close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            class="bi bi-x-lg"
            viewBox="0 0 32 32"
          >
            <path d="M32 3.223l-3.223-3.223-12.777 12.777-12.777-12.777-3.223 3.223 12.777 12.777-12.777 12.777 3.223 3.223 12.777-12.777 12.777 12.777 3.223-3.223-12.777-12.777 12.777-12.777z"></path>
          </svg>
        </button>`;

  if (!watchedFilmsById.includes(id) && !queueFilmsById.includes(id)) {
    return `${baseMarkup}
      <div class="button__box">
            <button type="button" class="button__watch button">Add to watched</button>
            <button type="button" class="button__remove--watch button visually-hidden">Remove from watched</button>
            <button type="button" class="button__queue button">Add to queue</button>
            <button type="button" class="button__remove--queue button visually-hidden">Remove from queue</button>
          </div>
      </div>
    </div>
  </div>`;
  }

  if (watchedFilmsById.includes(id) && !queueFilmsById.includes(id)) {
    return `${baseMarkup}
          <div class="button__box">
            <button type="button" class="button__watch button visually-hidden">Add to watched</button>
            <button type="button" class="button__remove--watch button ">Remove from watched</button>
            <button type="button" class="button__queue button">Add to queue</button>
            <button type="button" class="button__remove--queue button visually-hidden">Remove from queue</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  if (!watchedFilmsById.includes(id) && queueFilmsById.includes(id)) {
    return `${baseMarkup}
          <div class="button__box">
            <button type="button" class="button__watch button">Add to watched</button>
            <button type="button" class="button__remove--watch button visually-hidden">Remove from watched</button>
            <button type="button" class="button__queue button  visually-hidden">Add to queue</button>
            <button type="button" class="button__remove--queue button">Remove from queue</button>
          </div>
      </div>
    </div>
  </div>
  `;
  }

  if (watchedFilmsById.includes(id) && queueFilmsById.includes(id)) {
    return `${baseMarkup}
    <div class="button__box">
            <button type="button" class="button__watch button visually-hidden">Add to watched</button>
            <button type="button" class="button__remove--watch button ">Remove from watched</button>
            <button type="button" class="button__queue button  visually-hidden">Add to queue</button>
            <button type="button" class="button__remove--queue button">Remove from queue</button>
          </div>
      </div>
    </div>
  </div>
  `;
  }
  updataModalTheme();
}

// function updataModalTheme() {
//   if (savedTheme === 'loaded dark-theme') {

//       modal.classList.add('dark-theme');

//   }
// }

// функция закрытия модалки при клике на кнопку закрытия

function onModalClose() {
  modalBox.classList.add('is-hidden');
  imgBox.innerHTML = `<img src="https://image.tmdb.org/t/p/original${respData.poster_path}" alt="${respData.title}" class="modal__image" loading='lazy'/>
                      `;
  genreList = [];

  document.body.style.overflow = 'scroll';
  document.body.style.top = '';

  window.removeEventListener('keydown', onModalCloseEsc);
}

// функция закрытия модалки по нажатию клавиши

function onModalCloseEsc(evt) {
  if (evt.code === 'Escape' && modalBox.innerHTML === '') {
    return;
  } else if (evt.code === 'Escape') {
    onModalClose();
  }
}

// функция закрытия модалки по клику на бекдроп

function onModalCloseBckdrp(evt) {
  if (evt.target === document.querySelector('.backdrop-modal')) {
    onModalClose();
  } else {
    return;
  }
}

export { id };
