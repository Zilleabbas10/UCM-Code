import { combineReducers } from 'redux';
import appScreenLoader from './appScreenLoader.reducer';
import home from './home.reducer';

export default combineReducers({
  appScreenLoader,
  home
});
