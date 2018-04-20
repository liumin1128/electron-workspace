import { combineReducers } from 'redux';
import { reducerFactory } from '../utils/reducer';
import project from './project';
import global from './global';
import log from './log';

const reducers = reducerFactory([
  'loading',
  global,
  log,
  project,
]);

export default combineReducers({
  ...reducers,
});

