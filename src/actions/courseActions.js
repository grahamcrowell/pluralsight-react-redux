import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

// action creator
export function loadCoursesSuccess(courses) {
  // define action
  return {
    type: types.LOAD_COURSES_SUCCESS, courses: courses
  };
}

// thunks always returns function that accepts a dispath
export function loadCourses() {
	return function(dispatch) {
		// body of thunk
		// call to mockApi returns a promise of list courses
		return courseApi.getAllCourses().then(courses => {
			// dispatch action creator
			dispatch(loadCoursesSuccess(courses));
		})
		// handle error by rethrowing up the stack
		.catch(error => {
			throw(error);
		});
	};
}
