import { combineReducers } from 'redux';
import { reducerFactory } from '../utils/reducer';
import project from './project';
import global from './global';

const reducers = reducerFactory([
  'loading',
  global,
  project,
]);

export default combineReducers({
  ...reducers,
});

