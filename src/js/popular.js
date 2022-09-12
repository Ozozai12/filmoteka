import { NewServiceApi } from './authorization';
import { substitutionOfValues } from './card';
import createMarkupCard from './templates/cardMarkup.hbs';
import Pagination from 'tui-pagination';

const newserviceApi = new NewServiceApi();
let currentPage = 1

const tuiBox = document.getElementById("tui-pagination-container")


tuiBox.addEventListener('click', testClick)

function testClick(e){
  
  
  const pageList = e.target
 
  if( Number(pageList.textContent) > 0){
    
    window.scrollTo(0, 0)
  newserviceApi.pageNumber = Number(pageList.textContent)
  popularMovies();
    
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





async function popularMovies() {
  const gallery = document.querySelector('.gallery');


 

  
  const popular = await newserviceApi.serviceMovieTopApi().then( res => {
    currentPage = res.page
    console.log(currentPage);

    const container = document.getElementById('tui-pagination-container');
    const options = { 
         totalItems: res.total_results,
         itemsPerPage: 20,
        
         page: res.page ,
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
   const delHTml = document.querySelector(".tui-ico-prev")
   const delHTmlrg = document.querySelector(".tui-ico-next")
   delHTmlrg.innerHTML = ``
  //  `<svg width="16" height="16" fill="none" 
  //  xmlns="http://www.w3.org/2000/svg"><path 
  //  d="M3.333 8h9.334M8 12.667 12.667 8 8 3.333" 
  //  stroke="#000" 
  //  stroke-width="1.333"
  //  stroke-linecap="round"
  // stroke-linejoin="round"/></svg>`
  delHTml.innerHTML = ``
  // `<svg width="16" height="16" fill="none" 
  // class="tui-ico-prev"
  // xmlns="http://www.w3.org/2000/svg">
  // <path d="M12.667 8H3.333M8 12.667 3.333 8 8 3.333" 
  // stroke="#000" 
  // stroke-width="1.333" 
  // stroke-linecap="round" 
  // stroke-linejoin="round"/></svg>`
  const test = document.querySelector(".tui-prev")
  console.log(test);
  if(currentPage === 1){
    test.classList.add('visibility')
  }
  
  


      return res;});
  substitutionOfValues(popular.results);
  
  if (gallery) {
    gallery.innerHTML = createMarkupCard(popular.results);
  }

}



popularMovies();
