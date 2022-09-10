import ApiService from './authorization';

// получаем переменные

const modalBox = document.querySelector('.box');

const cardImg = document.querySelector('.gallery');

let backdrop;
let respData;
let genreList = [];
let newApiService = new ApiService();

modalBox.innerHTML = ''

// вызываем модальное окно с карточкой

cardImg.addEventListener('click', getId)

// получаем id карточки, на которую кликнули

function getId(evt) {
  const id = evt.target.getAttribute('data-id')

  openModal(id)
}

// вызываем модалку

async function openModal(id) {

  newApiService.idNumber = id;

  respData = await newApiService.serviceIdMovie()

  // получаем список жанров

  const genres = Object.values(respData.genres);

  for (const genre of genres) {
    genreList.push(genre.name)
  }

  // рендерим динамическую разметку модалки при клике на карточку с фильмом

  modalBox.insertAdjacentHTML('afterBegin', createModal());

  const btnClose = document.querySelector('.button__modal-close');
  btnClose.addEventListener('click', onModalClose);

  backdrop = document.querySelector('.backdrop')
}

// разметка одной карточки модального окна фильма

function createModal() {
    const markup =  `
    <div class="backdrop">
      <div class="film-card modal">
        <img src="https://image.tmdb.org/t/p/original${respData.poster_path}" alt="Txt" class="modal__image"/>
        <div>
          <h2 class="film-card__title">${respData.title}</h2>
          <div class="film-card__features">
            <ul class="film-card__feature-list">
              <li class="film-card__feature-name">Vote / Votes</li>
              <li class="film-card__feature-name">Popularity</li>
              <li class="film-card__feature-name">Original Title</li>
              <li class="film-card__feature-name">Genre</li>
            </ul>
            
            <ul>
              <li class="film-card__feature-description"><span class="vote">${respData.vote_average.toFixed(1)}</span> <span
                                class="divider"> / </span> ${respData.vote_count}</li>
              <li class="film-card__feature-description">${respData.popularity.toFixed(1)}</li>
              <li class="film-card__feature-description original-title">${respData.original_title}</li>
              <li class="film-card__feature-description">${genreList}</li>
            </ul>
          </div>
          <h3 class="about__title">About</h3>
          <p class="about__text">
            ${respData.overview}
          </p>
            
          <div class="button__box">
            <button type="button" class="button__watch button">Add to watched</button>
            <button type="button" class="button__queue button">Add to queue</button>
          </div>

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
        </button>
      </div>
    </div>
  </div>
  `
  return markup;
}

// закрытие модалки при клике на кнопку закрытия

function onModalClose() {
  modalBox.innerHTML = '';
  genreList = [];
}

// закрытие модалки по нажатию клавиши

window.addEventListener('keydown', onModalCloseEsc)

function onModalCloseEsc(evt) {
    if (evt.code === 'Escape' &&  modalBox.innerHTML === '') {     
      return
    } else if (evt.code === 'Escape') {
        onModalClose();
    }
}

// закрытие модалки по клику на бекдроп

window.addEventListener('click', onModalCloseBckdrp)

function onModalCloseBckdrp(evt) {
  if (evt.target === backdrop) {
    onModalClose();
  } else {
    return
  }
}


