/*
 * Object Graph that is stored in our store
 */
// initially there are no authors or courses are in the store
// and no AJAX calls in progress
export default {
  authors: [],
  courses: [],
  ajaxCallsInProgress: 0 // tracks number of AJAX calls currently in progress
};
