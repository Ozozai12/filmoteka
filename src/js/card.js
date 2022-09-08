import { ganresInfo } from './ganres';

export { createMarkup };
export default function createMarkup(data) {
  data.forEach(el => {
    //порівняння айді з масивом всіх жанрів
    ganresInfo.map(ganre => {
      if (ganre.id === el.genre_ids[0]) {
        el.genre_ids[0] = ganre.name;
      }
      if (ganre.id === el.genre_ids[1]) {
        el.genre_ids[1] = ganre.name;
      }
      if (ganre.id === el.genre_ids[2]) {
        el.genre_ids[2] = ganre.name;
      }
      if (ganre.id === el.genre_ids[3]) {
        el.genre_ids[3] = ganre.name;
      }
      if (ganre.id === el.genre_ids[4]) {
        el.genre_ids[4] = ganre.name;
      }
    });
    //список жанрів
    const ganre = el.genre_ids;

    //лишає з дати тільки рік
    const realeaseData = el.release_date.slice(0, 4);
  });
}
