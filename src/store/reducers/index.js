import { combineReducers } from 'redux';
import { reducerFactory } from '../utils/reducer';
import project from './project';

const reducers = reducerFactory([
  'loading',
  project,
]);

export default combineReducers({
  ...reducers,
});

