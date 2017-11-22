import {combineReducers} from 'redux';
// alias to courses for readability in CoursesPage mapStateToProps
import courses from './courseReducer';

const rootReducer = combineReducers ({
  // short hand property name
  // name here determines name used in CoursesPage mapStateToProps
  // state.courses
    courses
});

export default rootReducer;
