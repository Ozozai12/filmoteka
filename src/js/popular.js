import { NewServiceApi } from './authorization';
import { substitutionOfValues } from './card';
import createMarkupCard from './templates/cardMarkup.hbs';
import Pagination from 'tui-pagination';

const newserviceApi = new NewServiceApi();

const tuiBox = document.getElementById("tui-pagination-container")

tuiBox.addEventListener('click', testClick)
function testClick(e){

  
  const pageList = Number(e.target.textContent)
  // console.log(e.target.textContent);
  if(pageList > 0){
    window.scrollTo(0, 0)
  newserviceApi.pageNumber = pageList
  popularMovies();
    
  } 
  
}



async function popularMovies() {
  const gallery = document.querySelector('.gallery');

  const popular = await newserviceApi.serviceMovieTopApi().then( res => {

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
    

      // console.log(res);
      totalPages = res.total_results
      // console.log(totalPages);
      return res;});
  substitutionOfValues(popular.results);

  
gallery.innerHTML = createMarkupCard(popular.results);
}



popularMovies();