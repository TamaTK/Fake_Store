import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import App from './App';
import store from './stores/store';

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

registerRootComponent(RootApp);