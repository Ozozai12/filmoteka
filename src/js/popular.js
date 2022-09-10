import { NewServiceApi } from './authorization';
import { substitutionOfValues } from './card';
import createMarkupCard from './templates/cardMarkup.hbs';

const newserviceApi = new NewServiceApi();


async function popularMovies() {
  const gallery = document.querySelector('.gallery');

  const popular = await newserviceApi.serviceMovieTopApi();
  substitutionOfValues(popular.results);


  gallery.innerHTML = createMarkupCard(popular.results);
}
popularMovies();
