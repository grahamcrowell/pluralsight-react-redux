import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import './styles/styles.css'; // Webpack can import CSS files too
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// could add initial state here; coursesReducer initializes it instead
// useful to rehydrate state passed from local store/server
// useful for server side rendering
const store = configureStore();

render (
  // provider wraps whole app: store is accissble everywhere in app.
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
