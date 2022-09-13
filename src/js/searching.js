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
let currentPage = 1

function testting (){
  const tuibtn = document.querySelectorAll('.tui-page-btn')
  const body = document.body;
  if(body.classList.contains("dark-theme")){
    tuibtn.forEach(el => el.classList.add('dark-btn'))
  }
}
tuiBox.addEventListener('click', testTargetClick)
function testTargetClick(e){

  

  const pageList = e.target
 
  if( Number(pageList.textContent) > 0){
    
    newServiceApi.pageNumber = Number(pageList.textContent)
    
    newServiceApi.serviceSearchMovie().then(res => {  testting()
      substitutionOfValues(res.results)
      
      currentPage = res.page
     
      gallery.innerHTML = createCardMarkup(res.results)})
      
      window.scrollTo(0, 0) 
  } 
  else if(pageList.classList.contains("tui-ico-next") ||pageList.classList.contains("tui-next")){
    window.scrollTo(0, 0) 
    
    newServiceApi.incrementPage()
    newServiceApi.serviceSearchMovie().then(res => {  testting()
      substitutionOfValues(res.results)
      
      gallery.innerHTML = createCardMarkup(res.results)

      currentPage = res.page
    }
      
      )
  }else if(pageList.classList.contains("tui-ico-prev") ||pageList.classList.contains("tui-prev")){
    newServiceApi.decrementPage()
    newServiceApi.serviceSearchMovie().then(res => {  testting()
      substitutionOfValues(res.results)
      
      gallery.innerHTML = createCardMarkup(res.results)

      currentPage = res.page
    } 

         )
      window.scrollTo(0, 0) 
      
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
              src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
              alt="movie poster"
              width="50"
              height="80"
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

  
  newServiceApi.ressetPage()
  newServiceApi.serviceSearchMovie().then(res => {
   
// Пагинация 
 
  const delBox = document.getElementById("tui-pagination-container")
  delBox.innerHTML = ''



    
    const container = document.getElementById('tui-pagination-container__search');
    const options = {
      totalItems: res.total_results,
      itemsPerPage: 20,
                            
      page: res.page,
      centerAlign: true,
      firstItemClassName: 'tui-first-child',
      lastItemClassName: 'tui-last-child',
      visiblePages:5,
      // template: {
      //   page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      //   currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      //   moveButton:
      //     '<a href="#" class="tui-page-btn tui-{{type}} visibility">' +
      //     '<span ></span>' +
      //     '</a>',
      //   disabledMoveButton:
      //     '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      //     '<span ></span>' +
      //     '</span>',
      //   moreButton:
      //     '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      //     '<span class="tui-ico-ellip"></span>' +
      //     '</a>'
      // }
      template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
            '<a href="#" class="tui-page-btn tui-{{type}}">' +
                '<span class="tui-ico-{{type}}"></span>' +
            '</a>',
        disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                '<span class="tui-ico-{{type}}"></span>' +
            '</span>',
        moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                '<span class="tui-ico-ellip">...</span>' +
            '</a>'
         
    }
    };
    
    const pagination = new Pagination(container, options);
    const testPrev = document.querySelector(".tui-prev")

    testPrev.classList.add('visibility')

    
    
    
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



 