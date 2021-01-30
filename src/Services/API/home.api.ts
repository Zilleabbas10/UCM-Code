import {axiosInstance} from './api.config';
import APP_ENDPOINTS from './endpoints';

const getCityWeatherReport = async (cityName) => {
  const URL = `${APP_ENDPOINTS.GET_CITY_WEATHER}&q=${cityName}`
  try {
    const response = await axiosInstance.get(URL);
    return {...response};
  } catch (error) {
    return {error, data: null};
  }
};

export default {
  getCityWeatherReport,
};
