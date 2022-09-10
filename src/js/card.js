// рендерить розмітку однієї картки

import { genresInfo } from './genres';

export { substitutionOfValues };


// функція, змінює значення з дати яку надає апі
function substitutionOfValues(data) {
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
    //список жанрів, переводить в стрінг, робить пробіли між комами
    el.genre_ids = String(el.genre_ids).replaceAll(',', ', ');
    //лишає з дати тільки рік
    el.release_date = el.release_date.slice(0, 4);

    //заокруглює число рейтинга
    el.vote_average = el.vote_average.toFixed(1);
  });
}
