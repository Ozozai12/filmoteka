export { NewServiceApi };
const key = 'bef2e1469ade062164db331fc6ab2f25';
const url = 'https://api.themoviedb.org/3';
export default class NewServiceApi {
  constructor() {
    this.searchValue = '';
    this.page = 1;
    this.id = NaN;
  }

  // сервіс  топ популярних фільмів за тиждень
  async serviceMovieTopApi() {
    try {
      const resp = await fetch(
        `${url}/trending/movie/week?api_key=${key}&media_type=all&time_window=week&page=${this.page}`
      );
      const respData = await resp.json();

      return respData;
    } catch (error) {
      console.error(error.message);
    }
  }

  // сервіс пошук фільмів за значенням
  async serviceSearchMovie() {
    try {
      const resp = await fetch(
        `${url}/search/movie?api_key=${key}&query="${this.searchValue}`
      );

      const respData = await resp.json();

      return respData;
    } catch (error) {
      console.error(error.message);
    }
  }

  // сервіс пошку фільмів по айді
  async serviceIdMovie(id) {
    try {
      const resp = await fetch(`${url}/movie/${this.id},?api_key=${key}`);

      const respData = await resp.json();

      return respData;
    } catch (error) {
      console.error(error.message);
    }
  }

  ressetPage() {
    this.page = 1;
  }

  incrementPage() {
    return (this.page += 1);
  }

  decrementPage() {
    return (this.page -= 1);
  }

  set query(nuwQuery) {
    this.searchValue = nuwQuery;
  }

  set pageNumber(nuwPage) {
    this.page = nuwPage;
  }

  set idNumber(nuwId) {
    this.id = nuwId;
  }
}
