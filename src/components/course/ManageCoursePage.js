import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.course),
      errors: {}
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  // set form fields when loaded from url
  // React lifecycle function
  // auto called anytime (react thinks) props have changed
  componentWillReceiveProps(nextProps) {
    // check if actually changed
    if(this.props.course.id != nextProps.course.id) {
      // nessisary to populate form when existing course is loaded directly
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  // change handler
  updateCourseState(event) {
    const field = event.target.name;
    let course =  this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  // saveCourse function dispatch action that is passed in via props
  saveCourse(event) {
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course);
    // redirect to /courses after save
    this.context.router.push('/courses');
  }

  render() {
    return (
      <div>
        <CourseForm
          allAuthors={this.props.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          course={this.state.course}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// pull in react router context (global variable) so router is accessable via this.context.router
// we want router to be a required context type
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  // filter returns array
  const course = courses.filter(course => course.id == id);
  if (course.length) return course[0];
  return null;
}

// input: state ==>
// output: component properties
function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // from the path `course/:id`
  // empty course
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  // populate fields if editting existing course instead adding new course
  if(courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  // transform data into shape expected by components
  const authorsFormattedForDropDown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropDown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

