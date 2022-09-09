// рендерить розмітку однієї картки

import { ganresInfo } from './ganres';

export { cardMarkup };

function cardMarkup(data) {
  data.forEach(el => {
    //порівняння айді з масивом всіх жанрів
    ganresInfo.map(genre => {
      if (genre.id === el.genre_ids[0]) {
        el.genre_ids[0] = ganre.name;
      }
      if (genre.id === el.genre_ids[1]) {
        el.genre_ids[1] = ganre.name;
      }
      if (genre.id === el.genre_ids[2]) {
        el.genre_ids[2] = ganre.name;
      }
      if (genre.id === el.genre_ids[3]) {
        el.genre_ids[3] = ganre.name;
      }
      if (genre.id === el.genre_ids[4]) {
        el.genre_ids[4] = ganre.name;
      }
    });
    //список жанрів
    const genre = el.genre_ids;

    //лишає з дати тільки рік
    const realeaseData = el.release_date.slice(0, 4);
  });
}


<div class="Gallery">
      <div class="Card">
        <div class="CardThumb">
          <img
            id=""
            src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/zHQy4h36WwuCetKS7C3wcT1hkgA.jpg"
            alt=""
            loading="lazy"
            class="CardImage"
          />
          <div class="CardOverlay">
            <p class="CardText">
              An army ranger and his dog embark on a road trip along the Pacific Coast Highway to attend a friend's funeral.
            </p>
          </div>
        </div>
        <h2 class="CardTitle">Dog</h2>
        <div class="CardCaption">
           <span class="CardInfo">Drama, Fantastics | 2020</span>
          </div>
          <span class="CardRating">7,8</span>
        </div>
      </div>
   
