import { NewServiceApi } from './authorization';
import { substitutionOfValues } from './card';
import createMarkupCard from './templates/cardMarkup.hbs';
import Pagination from 'tui-pagination';

const newserviceApi = new NewServiceApi();

let currentPage = 1
const tuiBox = document.getElementById("tui-pagination-container")
tuiBox.addEventListener('click', testTargetClick)

function testTargetClick(e){
  
  
  const pageList = e.target
 
  if( Number(pageList.textContent) > 0){
    
    
  newserviceApi.pageNumber = Number(pageList.textContent)
  popularMovies();
   window.scrollTo(0, 0) 
  } else if(pageList.classList.contains("tui-ico-next") ||pageList.classList.contains("tui-next")){
    
    newserviceApi.incrementPage()
    popularMovies();
    window.scrollTo(0, 0);
  }else if(pageList.classList.contains("tui-ico-prev") ||pageList.classList.contains("tui-prev")){
    newserviceApi.decrementPage()
    popularMovies();
    window.scrollTo(0, 0);
  }
  
}


function testting ( ){
  const tuibtn = document.querySelectorAll('.tui-page-btn')
  const body = document.body;
  if(body.classList.contains("dark-theme")){
    tuibtn.forEach(el => el.classList.add('dark-btn'))
  }
}


async function popularMovies() {
  const gallery = document.querySelector('.gallery');


 

  
  const popular = await newserviceApi.serviceMovieTopApi().then( res => {
    currentPage = res.page
 
    const container = document.getElementById('tui-pagination-container');
    const options = { 
         totalItems: res.total_results,
         itemsPerPage: 20,
        
         page: res.page ,
         centerAlign: true,
         firstItemClassName: 'tui-first-child',
         lastItemClassName: 'tui-last-child',
         visiblePages:5,
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

  const test = document.querySelector(".tui-prev")
  if(currentPage === 1){
    test.classList.add('visibility')
  }
  
  testting()


      return res;});
  substitutionOfValues(popular.results);
  
  if (gallery) {
    gallery.innerHTML = createMarkupCard(popular.results);
  }

}



popularMovies();
