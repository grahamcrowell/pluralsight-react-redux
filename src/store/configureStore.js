import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
// initialState param useful for (server side rendering) state initialization
export default function configureStore(initialState) {
  return createStore(
    rootReducer
    ,initialState
    // see react-sling repo for hotreloading middle ware etc
    ,applyMiddleware(thunk, reduxImmutableStateInvariant()));
}
