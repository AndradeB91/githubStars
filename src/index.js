import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createReduxStore } from './redux';
import { graphqlClient } from './api/graphql';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './components/layout/App';

const store = createReduxStore();

ReactDOM.render(
  <ApolloProvider client={graphqlClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
