import { ACTION_TYPES } from '../../Actions';
const { HOME_ACTIONS } = ACTION_TYPES;

const initialState = {
  weatherList: [],
  errorMessage: ''
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case HOME_ACTIONS.SET_CITY_WEATHER:
      return { ...state, weatherList: action.payload };
      case HOME_ACTIONS.SET_CITY_ERROR_MESSAGE:
        return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export default home;
