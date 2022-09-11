import { NewServiceApi } from './authorization';
import { substitutionOfValues } from './card';
import createMarkupCard from './templates/cardMarkup.hbs';

const newserviceApi = new NewServiceApi();
let totalPages;
const nextBtn = document.querySelector('.next')
  nextBtn.addEventListener("click", onClickNextBtn)
  const prevBtn = document.querySelector('.prev')
  prevBtn.addEventListener("click", onClickPrevBtn)
  
  
async function popularMovies() {
  const gallery = document.querySelector('.gallery');

  const popular = await newserviceApi.serviceMovieTopApi().then( res => {
      console.log(res);
      totalPages = res.total_results
      console.log(totalPages);
      return res;});
  substitutionOfValues(popular.results);


  gallery.innerHTML = createMarkupCard(popular.results);

  displayPagination(totalPages);
 

  
}
function test (){

   if(newserviceApi.page === 1){
    prevBtn.classList.add("is__hidden")
  }
  if(newserviceApi.page > 1){
    prevBtn.classList.remove("is__hidden")
  }
}

popularMovies();


function onClickNextBtn(){
    // newServiceApi.serviceMovieTopApi().then(res=> {newServiceApi.incrementPage()
    //     console.log(res)})
   newserviceApi.incrementPage()
   popularMovies()
   window.scrollTo(0, 0);
  //  const a = newserviceApi.serviceMovieTopApi().then( res => {
  //   console.log(res);
  //   return res;})
   
}

   function onClickPrevBtn(){
    
    newserviceApi.decrementPage()
   popularMovies()
   window.scrollTo(0, 0);
   }

 
  function displayPagination(totalPages) {
    const paginationEl = document.querySelector('.pagination');
    const pagesCount = Math.ceil(totalPages / 20);
    const ulEl = document.createElement("ul");
    ulEl.classList.add('pagination__list');

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl)
    }
    paginationEl.appendChild(ulEl)
    test()
  }
  function displayPaginationBtn(page) {
    const liEl = document.createElement("li");
    liEl.classList.add('pagination__item')
    liEl.innerText = page

    // if (pageNumber == page) liEl.classList.add('pagination__item--active');

    liEl.addEventListener('click', (e) => {
      const page = e.currentTarget.textContent
      newserviceApi.pageNumber = Number(page);
      // console.log(pageNumber);
      console.log(page);
      popularMovies();

      // let currentItemLi = document.querySelector('li.pagination__item--active');
      // currentItemLi.classList.remove('pagination__item--active');

      // liEl.classList.add('pagination__item--active');
    })

    return liEl;




   
  }