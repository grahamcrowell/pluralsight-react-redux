import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';

// Container component
class CoursesPage extends React.Component {
  // create new course form; component container
  constructor(props, context) {
    super(props, context);

    // set local state
    this.state = {
      course: {title: ""} // input can't be null => use ""
    };

    // ES6 requires explicit binding to ensure correct 'this'
    // bind this of onTitleChange&onClickSave to the this of Courses page context
    // bind here and not in event handlers for performance; (bind defines new function)
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }
  // called on each key stroke, updates state.
  onTitleChange(event){
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course: course});
  }
  onClickSave() {
    // depends on mapDispatchToProps
    this.props.createCourse(this.state.course);
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }
  render() {
    return (
      <div>
        <h1>Courses</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input
        type="text"
        onChange={this.onTitleChange} // calls function above
        value={this.state.course.title} />
        <input
        type="submit"
        onClick={this.onClickSave} // calls function above
        value="Save" />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  createCourse: PropTypes.func.isRequired
};

// returns properties we want to see exposed on CoursesPath component
function mapStateToProps(state, ownProps) {
  return {
    // access courses from redux store
    courses: state.courses
  };
}

// dispatch comes from redux
function mapDispatchToProps(dispatch) {
  return {
    // wrap action with call to dispatch
    createCourse: course => dispatch(courseActions.createCourse(course))
  };
}

// connect is higher order function
// if mapDispatchToProps is defined connect will NOT attach a dispatch property to component
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
