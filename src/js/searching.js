import NewServiceApi from './authorization';

import createCardMarkup from './templates/cardMarkup.hbs';

import openModal from './modal';

import { substitutionOfValues } from './card';

// Пагинация
import Pagination from 'tui-pagination';
// Пагинация

const newServiceApi = new NewServiceApi();

const form = document.querySelector('.search__form');

const input = document.querySelector('.search__form--input');

const gallery = document.querySelector('.gallery');

const searchingList = document.querySelector('.searching-list');


// Пагинация
const tuiBox = document.getElementById("tui-pagination-container__search")

tuiBox.addEventListener('click', testClick)
function testClick(e){
    
  const pageList = e.target.textContent
  console.log(e.target.textContent);
  if(Number(pageList) > 0){
    // window.scrollTo(0, 0)
    newServiceApi.pageNumber = Number(pageList)
    console.log(pageList);
    newServiceApi.serviceSearchMovie().then(res => {gallery.innerHTML = createCardMarkup(res.results)
    console.log(res);})
  
  } else if(pageList === "next"){
    console.log(pageList);
    newServiceApi.incrementPage()
    newServiceApi.serviceSearchMovie().then(res => {gallery.innerHTML = createCardMarkup(res.results)})
  }else if(pageList === "prev" ){
    newServiceApi.decrementPage()
    newServiceApi.serviceSearchMovie().then(res => {gallery.innerHTML = createCardMarkup(res.results)})
  }

}
// Пагинация


function onMovieClick(event) {
  newServiceApi.id = event.target.closest('li').getAttribute('id');

  newServiceApi
    .serviceIdMovie()
    .then(res => {
      const arr = [];
      arr[0] = res;
      searchingList.innerHTML = '';
      openModal(event.target.closest('li').getAttribute('id'));
    })
    .catch(err => console.log(err));
}

function createSearchingList(event) {
  if (event.target.value === '') {
    searchingList.innerHTML = '';
    return;
  }


  if (event.target.value === '') {
    searchingList.innerHTML = '';
    return;
  }

  newServiceApi.searchValue = event.target.value;

  newServiceApi.serviceSearchMovie().then(res => {
      


    newServiceApi.serviceSearchMovie().then(res => {
      if (res.results.length === 0) {
        const errorNotificationMarkup = `
            <li>
                <p class="error-notification">
                    Search result not successful. Enter the correct movie name and try
                    again
                </p>
            </li>`;

        searchingList.innerHTML = errorNotificationMarkup;
        return;
      }

      const searchingListMarkup = res.results
        .slice(0, 5)
        .map(movie =>
          movie.poster_path
            ? `<li class="searching-list__item" id='${movie.id}'>
            <img
              class="searching-list__photo"
              src="https://image.tmdb.org/t/p/original/${movie.poster_path}"
              alt="movie poster"
              width="50"
            />
            <p class="searching-list__title">${movie.title}</p>
        </li>`
            : `<li class="searching-list__item" id='${movie.id}'>
            <img
              class="searching-list__photo"
              src="https://cdn.pixabay.com/photo/2014/03/25/16/27/movie-297135_960_720.png"
              alt="movie poster"
              width="50"
            />
            <p class="searching-list__title">${movie.title}</p>
        </li>`

        
        ).join('')
            


      searchingList.innerHTML = searchingListMarkup;

      searchingList.addEventListener('click', onMovieClick);
    });
  })
}

function createMoviesList(event) {

  event.preventDefault();

  newServiceApi.searchValue = event.target.search.value;

  // Пагинация 
  const delBox = document.getElementById("tui-pagination-container")
  delBox.innerHTML = ''
  // Пагинация

  newServiceApi.serviceSearchMovie().then(res => {
    console.log(res);


    // Пагинация
    const container = document.getElementById('tui-pagination-container__search');
    const options = {
      totalItems: res.total_results,
      itemsPerPage: 20,
                            
      page: res.page,
      centerAlign: true,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
      template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
          '<a href="#" class="tui-page-btn tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</a>',
        disabledMoveButton:
          '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
          '<span class="tui-ico-{{type}}">{{type}}</span>' +
          '</span>',
        moreButton:
          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
          '<span class="tui-ico-ellip">...</span>' +
          '</a>'
      }
    };
    const pagination = new Pagination(container, options);
                    
    // Пагинация

    newServiceApi.serviceSearchMovie().then(res => {
      if (res.results.length === 0) {
        const errorNotificationMarkup = `
            <li>
                <p class="error-notification">
                    Search result not successful. Enter the correct movie name and try
                    again
                </p>
            </li>`;


        searchingList.innerHTML = errorNotificationMarkup;
        return;
      }
      searchingList.innerHTML = '';

                

      substitutionOfValues(res.results);

      gallery.innerHTML = createCardMarkup(res.results)
    })

  })
}

if (gallery) {
    form.addEventListener('submit', createMoviesList);
    input.addEventListener('input', createSearchingList);
  }

