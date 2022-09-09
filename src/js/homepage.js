import { NewServiceApi } from './authorization';
import cardFilmsTpl from './templates/cardMarkup.hbs';
const galleryContainer  = document.querySelector('.gallery');
const apiServise = new NewServiceApi();

export default async function homePageMarkup() {
  const data = await apiServise.serviceMovieTopApi();

     console.log(data.results);
  galleryContainer.innerHTML = cardFilmsTpl(data.results);
  
}

homePageMarkup()