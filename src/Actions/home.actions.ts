import {pathOr} from 'ramda';

import { HomeApiHandlers, HomeHelpers, } from '../Services';
import { isEmptyOrNil } from '../Utils';
import { ACTION_TYPES } from '.';
import { toggleAppScreenLoader } from './appLoader.actions';

export const getCityWeatherReport = (city) => {
  return async (dispatch, getState) => {
    const errorMessage = pathOr('', ['home', 'errorMessage'], getState());
    if(!isEmptyOrNil(errorMessage)){      
      dispatch({
      type: ACTION_TYPES.HOME_ACTIONS.SET_CITY_ERROR_MESSAGE,
      payload: '',
    });
    }
    await dispatch(toggleAppScreenLoader(true))
    const weatherResponse = await HomeApiHandlers.getCityWeatherReport(city);
    if (!isEmptyOrNil(weatherResponse.data)) {
      const weatherList = HomeHelpers.getFormattedCityWeatherList(weatherResponse);
      dispatch({
        type: ACTION_TYPES.HOME_ACTIONS.SET_CITY_WEATHER,
        payload: weatherList,
      });
    }else{
      const errorMessage = pathOr('', ['error', 'response', 'data', 'message'], weatherResponse)
      dispatch({
        type: ACTION_TYPES.HOME_ACTIONS.SET_CITY_ERROR_MESSAGE,
        payload: errorMessage,
      });
      console.log(errorMessage)
    }
    await dispatch(toggleAppScreenLoader(false))
  };
};

export const emptyCityWeatherReportList = () => {
  return async (dispatch) => {      
    dispatch({
    type: ACTION_TYPES.HOME_ACTIONS.SET_CITY_WEATHER,
    payload: [],
  });
  };
}
