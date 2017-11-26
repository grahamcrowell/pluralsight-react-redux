import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';
import { beginAjaxCall } from './ajaxStatusActions';

// action creator
export function loadAuthorsSuccess(authors) {
  // define action
  return {
    type: types.LOAD_AUTHORS_SUCCESS, authors: authors
  };
}

/*
 * Cources thunk
*/
// thunks always returns function that accepts a dispath
export function loadAuthors() {

	return dispatch => {
	dispatch(beginAjaxCall());
		// body of thunk
		// call to mockApi returns a promise of list authors
		return authorApi.getAllAuthors().then(authors => {
			// dispatch action creator
			dispatch(loadAuthorsSuccess(authors));
		})
		// handle error by rethrowing up the stack
		.catch(error => {
			throw(error);
		});
	};
}
