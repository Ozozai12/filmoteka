import NewServiceApi from './authorization';

import createCardMarkup from './templates/cardMarkup.hbs';

import openModal from './modal';

import { substitutionOfValues } from './card';

const newServiceApi = new NewServiceApi();

const form = document.querySelector('.search__form');

const input = document.querySelector('.search__form--input');

const gallery = document.querySelector('.gallery');

const searchingList = document.querySelector('.searching-list');

function onMovieClick(event) {

    newServiceApi.id = event.target.closest('li').getAttribute('id');

    newServiceApi.serviceIdMovie()
        .then(res => {
            const arr = [];
            arr[0] = res
            searchingList.innerHTML = ''
            openModal(event.target.closest('li').getAttribute('id'))
        })
        .catch(err => console.log(err))
};

function createSearchingList(event) {

    if (event.target.value === '') {
        searchingList.innerHTML = '';
        return;        
    }

    newServiceApi.searchValue = event.target.value;

    newServiceApi.serviceSearchMovie().then(res => {

        if (res.results.length === 0) {

            const errorNotificationMarkup = `
            <li>
                <p class="error-notification">
                    Search result not successful. Enter the correct movie name and try
                    again
                </p>
            </li>`

            searchingList.innerHTML = errorNotificationMarkup;    
            return;
        }
        
        const searchingListMarkup = res.results.slice(0, 5).map(movie => 

            movie.poster_path ? 
        `<li class="searching-list__item" id='${movie.id}'>
            <img
              class="searching-list__photo"
              src="https://image.tmdb.org/t/p/original/${movie.poster_path}"
              alt="movie poster"
              width="50"
            />
            <p class="searching-list__title">${movie.title}</p>
        </li>` :
                
        `<li class="searching-list__item" id='${movie.id}'>
            <img
              class="searching-list__photo"
              src="https://cdn.pixabay.com/photo/2014/03/25/16/27/movie-297135_960_720.png"
              alt="movie poster"
              width="50"
            />
            <p class="searching-list__title">${movie.title}</p>
        </li>`
        
        ).join('')

        searchingList.innerHTML = searchingListMarkup

        searchingList.addEventListener('click', onMovieClick)

    })



    
};

function createMoviesList(event) {
    event.preventDefault();

    newServiceApi.searchValue = event.target.search.value;

    newServiceApi.serviceSearchMovie().then(res => {

        if (res.results.length === 0) {

            const errorNotificationMarkup = `
            <li>
                <p class="error-notification">
                    Search result not successful. Enter the correct movie name and try
                    again
                </p>
            </li>`

            searchingList.innerHTML = errorNotificationMarkup;    
            return;
        }
        searchingList.innerHTML = '';

        substitutionOfValues(res.results);

        gallery.innerHTML = createCardMarkup(res.results)
    })

};


form.addEventListener('submit', createMoviesList);

input.addEventListener('input', createSearchingList)