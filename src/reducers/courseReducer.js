// handles action 
// reducer is a function that excepts a state and an action and
// then returns a new state

export default function courseReducer(state = [], action) { // defaults params part of ES6
  switch (action.type) {
    case 'CREATE_COURSE':
      // RECALL: state is immutable 
      // [... ] ES6 spread operator
      return [
        ...state, // returns new instance of state array
        // Object.assign creates deep copy of course
        Object.assign({}, action.course)
        // return new state via the action that was passed in
      ];

      // reducer doesn't handle this action then just return state
    default:
      return state;
  }
}
