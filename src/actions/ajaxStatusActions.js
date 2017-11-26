import * as types from './actionTypes';

/*
 * Actions that track the status of AJAX calls
 */

export function beginAjaxCall() {
  return { type: types.BEGIN_AJAX_CALL };
}

export function ajaxCallError() {
  return { type: types.AJAX_CALL_ERROR };
}
