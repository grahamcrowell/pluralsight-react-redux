import * as types from '../actions/actionTypes';
import initialState from './initialState';

/*
 * COURSE REDUCER
 */
// handles action, can't mutate state, make deep copy for each change in state
// reducer is a function that excepts a state and an action and
// then returns a new state

export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {
      // handle each action type
      case types.LOAD_COURSES_SUCCESS:
        // return state from Api
        return action.courses;
      case types.CREATE_COURSE_SUCCESS:
        // add new course to array of courses held in slice of state passed
        // can't mutate state so:
        // deep copy of array using spread operator
        // append new course Object assign
        return [
          ...state, // ES6 spread operator; explodes out elements of array 'state'
                 // creates deep copy
                 // state variable here is only a specific slice of state
          Object.assign({},action.course) // create new empty object then assign action.course
        ];
      case types.UPDATE_COURSE_SUCCESS:
        // filter state to get all courses except course that's being updated
        // but can't mutate state so:
        // make deep copy of that filtered array
        // append new course Object assign
        return [
          ...state.filter(course => course.id !== action.course.id), // ES6 filter then explode
          Object.assign({}, action.course)// create new empty object then assign action.course
        ];
      // reducer doesn't handle this action then just return state
      default:
        return state;
  }
}

