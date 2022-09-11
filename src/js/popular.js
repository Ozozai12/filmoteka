import { NewServiceApi } from './authorization';
import { substitutionOfValues } from './card';
import createMarkupCard from './templates/cardMarkup.hbs';

const newserviceApi = new NewServiceApi();

const nextBtn = document.querySelector('.next');
nextBtn.addEventListener('click', onClickNextBtn);
const prevBtn = document.querySelector('.prev');
prevBtn.addEventListener('click', onClickPrevBtn);

// document.querySelector('.to-top').addEventListener('click', e => {
//   newserviceApi.incrementPage()
//   popularMovies()

// document.querySelector('.next').addEventListener('click', e => {
//   newserviceApi.incrementPage()
//   popularMovies()
// })

async function popularMovies() {
  const gallery = document.querySelector('.gallery');

  const popular = await newserviceApi.serviceMovieTopApi();
  substitutionOfValues(popular.results);
  if (gallery) {
    gallery.innerHTML = createMarkupCard(popular.results);
  }

  if (newserviceApi.page === 1) {
    prevBtn.classList.add('is__hidden');
  }
}
popularMovies();

function onClickNextBtn() {
  // newServiceApi.serviceMovieTopApi().then(res=> {newServiceApi.incrementPage()
  //     console.log(res)})
  newserviceApi.incrementPage();
  popularMovies();
  window.scrollTo(0, 0);
  const a = newserviceApi.serviceMovieTopApi().then(res => {
    console.log(res);
    return res;
  });
  if (newserviceApi.page > 1) {
    prevBtn.classList.remove('is__hidden');
  }
}

function onClickPrevBtn() {
  newserviceApi.decrementPage();
  popularMovies();
  window.scrollTo(0, 0);
}
