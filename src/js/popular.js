import { NewServiceApi } from './authorization';
import { cardMarkup } from './card';
const serviceApi = new NewServiceApi();

const serviceTopApi = async () => {
  const data = await serviceApi.serviceMovieTopApi();
  cardMarkup(data.results);
};
serviceTopApi();
