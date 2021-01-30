import {pathOr, map, propOr} from 'ramda';
import moment from 'moment';

import { formatWeatherDate, isEmptyOrNil } from '../Utils';

/**
 * Parses Weather object to its own format and return a new object
 *
 * @param {*} news
 * @returns
 */
const formatWeather = (weather) => {
  const dtTxt: number = propOr('', 'dt_txt', weather)
  const time = !isEmptyOrNil(dtTxt) && moment(dtTxt).format('LT')
  const date = !isEmptyOrNil(dtTxt) && formatWeatherDate(dtTxt);
  return {
    dtTxt,
    feelsLike: pathOr('', ['main', 'feels_like'], weather),
    description: pathOr('', ['weather', '0', 'description'], weather),
    temp: pathOr('', ['main', 'temp'], weather),
    time,
    date
  };
};

/**
 * Parses response from the endpoint.GET_CITY_WEATHER and returns formatted weather list
 *
 * @param {*} response
 * @returns
 */
const getFormattedCityWeatherList = (response) => {
  console.log(response)
  const weatherList = pathOr([], ['data', 'list'], response);
  return map((weather) => {
    return formatWeather(weather);
  }, weatherList);
};

export default {
  getFormattedCityWeatherList,
};
