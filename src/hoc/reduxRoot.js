import React, { PureComponent } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from '../store';

export default function (Root) {
  return class extends PureComponent {
    render() {
      return (<Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>);
    }
  };
}
