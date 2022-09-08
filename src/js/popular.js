import { NewServiceApi } from './authorization';
import { createMarkup } from './card';
const serviceApi = new NewServiceApi();

const serviceTopApi = async () => {
  const data = await serviceApi.serviceMovieTopApi();
  createMarkup(data.results);
};
serviceTopApi();
