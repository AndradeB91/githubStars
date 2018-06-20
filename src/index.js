import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createReduxStore } from './redux';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/layout/App';

const store = createReduxStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
