import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore'; // eslint-disable-line import/default
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
import './styles/styles.css'; // Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css'; // toastr's CSS

/*
ENTRY POINT OF APP
*/

// could add initial state here; coursesReducer initializes it instead
// useful to rehydrate state passed from local store/server
// useful for server side rendering
const store = configureStore();
// once store is configured, dispatch action(s) against store
// fetch data from Api at page load time
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render (
  // provider wraps whole app: store is accissble everywhere in app.
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
