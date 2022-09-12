import ApiService from './authorization';

// получаем переменные

const modalBox = document.querySelector('.box');

const cardImg = document.querySelector('.gallery');

let id;
let respData;
let genreList = [];
let listOfGenres;
let newApiService = new ApiService();

modalBox.innerHTML = ''

// вызываем модальное окно с карточкой

cardImg.addEventListener('click', getId)

// получаем id карточки, на которую кликнули

function getId(evt) {

  if (evt.target.nodeName !== "P" && evt.target.nodeName !== "IMG" && evt.target.nodeName !== "H2") {
    return
  }
  const id = evt.target.getAttribute('data-id')

  openModal(id)
}

// вызываем модалку

export default async function openModal(id) {

  newApiService.idNumber = id;

  respData = await newApiService.serviceIdMovie()

  // получаем список жанров

  const genres = Object.values(respData.genres);

  for (const genre of genres) {
    genreList.push(genre.name)
  }

  listOfGenres = genreList.join(', ')
  
  // рендерим динамическую разметку модалки при клике на карточку с фильмом

  modalBox.insertAdjacentHTML('afterBegin', createModal());

  const btnClose = document.querySelector('.button__modal-close');

  // вызов закрытия модалки

  btnClose.addEventListener('click', onModalClose);
  window.addEventListener('keydown', onModalCloseEsc)
  window.addEventListener('click', onModalCloseBckdrp)
}

// разметка одной карточки модального окна фильма

function createModal() {
    const markup =  `
    <div class="backdrop-modal">
      <div class="film-card modal" data-id=${id}>
        <img src="https://image.tmdb.org/t/p/w500${respData.poster_path}" alt="Txt" class="modal__image" width=240px/>
        <div>
          <h2 class="film-card__title">${respData.title}</h2>

          <table class="film-card__features">
            <tbody>
              <tr class="film-card__feature-list">
                  <td class="film-card__feature-name">Vote / Votes</td>
                  <td class="film-card__feature-description"><span class="vote">${respData.vote_average.toFixed(1)}</span> <span class="divider"> / </span> ${respData.vote_count}</td>
              </tr>
              <tr class="film-card__feature-list">
                  <td class="film-card__feature-name">Popularity</td>
                  <td class="film-card__feature-description">${respData.popularity.toFixed(1)}</td>
              </tr>
              <tr class="film-card__feature-list">
                  <td class="film-card__feature-name">Original Title</td>
                  <td class="film-card__feature-description original-title">${respData.original_title}</td>
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

// функция закрытия модалки при клике на кнопку закрытия

function onModalClose() {
  modalBox.innerHTML = '';
  genreList = [];
  window.removeEventListener('keydown', onModalCloseEsc)
}

// функция закрытия модалки по нажатию клавиши

function onModalCloseEsc(evt) {
    if (evt.code === 'Escape' &&  modalBox.innerHTML === '') {     
      return
    } else if (evt.code === 'Escape') {
      onModalClose();
    }
}

// функция закрытия модалки по клику на бекдроп

function onModalCloseBckdrp(evt) {
  if (evt.target === document.querySelector('.backdrop-modal')) {
    onModalClose()
  } else {
    return
  }
}


