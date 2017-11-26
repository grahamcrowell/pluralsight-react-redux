import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

/*
 * ACTION CREATORS
*/
export function loadCoursesSuccess(courses) {
  // define action
  return {
    type: types.LOAD_COURSES_SUCCESS, courses: courses
  };
}
export function updateCourseSuccess(course) {
  // define action
  return {
    type: types.UPDATE_COURSE_SUCCESS, course: course
  };
}
export function createCourseSuccess(course) {
  // define action
  return {
    type: types.CREATE_COURSE_SUCCESS, course: course
  };
}


/*
 * THUNKS
*/
// thunks always returns function that accepts a dispath
export function loadCourses() {
	return function(dispatch) {
    dispatch(beginAjaxCall());
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

// thunks always returns function that accepts a dispath
export function saveCourse(course) {
	// getState param provides direct access to redux store (not used here, useful for larger applications)
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
		// body of thunk
		return courseApi.saveCourse(course).then(courses => {
			// if input course has id then updating an existing course
			// else if no course id on passed then creating course
			course.id ? dispatch(updateCourseSuccess(course))
			: dispatch(createCourseSuccess(course));
		})
		// handle error by rethrowing up the stack
		.catch(error => {
      dispatch(ajaxCallError(error));
			throw(error);
		});
	};
}
