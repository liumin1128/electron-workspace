
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';
import effect from './utils/effect';
import rootReducer from './reducers';
import effects from './effects';

const persistConfig = {
  transforms: [immutableTransform({
    // whitelist: ['project'],
  })],
  key: 'root',
  storage,
  whitelist: ['project'],
};

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default (initialState = {}) => {
//   const store = createStore(
//     persistedReducer,
//     initialState,
//     bindMiddleware([effect(effects)]),
//   );
//   const persistor = persistStore(store);
//   return { store, persistor };
// };

export const store = createStore(
  persistedReducer,
  bindMiddleware([effect(effects)]),
);
export const persistor = persistStore(store);
