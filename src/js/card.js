// рендерить розмітку однієї картки

import { genresInfo } from './genres';

export { cardMarkup };

function cardMarkup(data) {
  data.forEach(el => {
    //порівняння айді з масивом всіх жанрів
    genresInfo.map(genre => {
      if (genre.id === el.genre_ids[0]) {
        el.genre_ids[0] = genre.name;
      }
      if (genre.id === el.genre_ids[1]) {
        el.genre_ids[1] = genre.name;
      }
      if (genre.id === el.genre_ids[2]) {
        el.genre_ids[2] = genre.name;
      }
      if (genre.id === el.genre_ids[3]) {
        el.genre_ids[3] = genre.name;
      }
      if (genre.id === el.genre_ids[4]) {
        el.genre_ids[4] = genre.name;
      }
    });
    //список жанрів
    const genre = el.genre_ids;

    //лишає з дати тільки рік
    const realeaseData = el.release_date.slice(0, 4);
  });
}




