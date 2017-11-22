import * as types from '../actions/actionTypes';


// handles action
// reducer is a function that excepts a state and an action and
// then returns a new state

// state = [] defines initial state to be empty array for this reducer
export default function courseReducer(state = [], action) {
  // defaults params part of ES6
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      // return state from Api
      return action.courses;

      // reducer doesn't handle this action then just return state
    default:
      return state;
  }
}
