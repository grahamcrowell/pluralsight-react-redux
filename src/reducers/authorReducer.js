import * as types from '../actions/actionTypes';
import initialState from './initialState';


// handles action
// reducer is a function that excepts a state and an action and
// then returns a new state

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      // return state from Api
      return action.authors;

      // reducer doesn't handle this action then just return state
    default:
      return state;
  }
}
