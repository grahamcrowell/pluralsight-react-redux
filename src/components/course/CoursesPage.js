import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

// Container component
class CoursesPage extends React.Component {
  // constructor initializes state
  constructor(props, context) {
    super(props, context);
    // bind function called by button "Add Course"
    this.redirectToAddCoursesPage = this.redirectToAddCoursesPage.bind(this);

    // set local state
    this.state = {
      course: {title: ""} // input can't be null => use ""
    };

  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursesPage() {
    browserHistory.push('/course');
  }

  // container components should not include UI
  // should only pass state to "dumb" child components
  render() {
    const {courses} = this.props;
    // CourseList component displays table of courses
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit"
              value="Add Course"
              className="btn btn-primary"
              onClick={this.redirectToAddCoursesPage}/>
        <CourseList courses={courses}/>
      </div>
    );
  }
}

// prop types for validation
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// returns properties we want to see exposed on CoursesPath component
function mapStateToProps(state, ownProps) {
  return {
    // access courses from redux store
    courses: state.courses
  };
}

// dispatch comes from connect wrapper
function mapDispatchToProps(dispatch) {
  return {
    // bindActionCreators is convience function that wraps action with call to dispatch
    actions: bindActionCreators(courseActions, dispatch)
    // another option:
    // createCourse: bindActionCreators(courseActions.createCourse, dispatch)
  };
}

// connect is higher order function
// if mapDispatchToProps is defined connect will NOT attach a dispatch property to component
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
