import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr'; // notifications

export class ManageCoursePage extends React.Component { // eslint-disable-line import/no-named-as-default
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, props.course), // 'this' keyword ommited since passed on constructor
      errors: {},
      // use local state to track if a save is inprogress
      saving: false
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

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }
    this.setState({errors: errors});
    return formIsValid;
  }
  saveCourse(event) {
    event.preventDefault();
    if (!this.courseFormIsValid()) {
      return;
    }
    // update local state to track saves in progress and show notification
    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      // use Thunk promise to delay redirect until AJAX is resolved
      .then(() => this.redirect())
      .catch(error => {
        // notify user when error
        toastr.error(error);
        // update local state to track saves
        this.setState({saving: false});
      });
  }
  redirect() {
    // update local state to track when save completes
    this.setState({saving: false});
    // notification of sucess
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }

  render() {
    return (
        <CourseForm
          allAuthors={this.props.authors}
          onChange={this.updateCourseState}
          onSave={this.saveCourse}
          course={this.state.course}
          errors={this.state.errors}
          saving={this.state.saving}/>
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
  router: PropTypes.object // Left optional to avoid linting warning when testing. Behaviour isn't impacted.
};

function getCourseById(courses, id) {
  // filter returns array
  const course = courses.filter(course => course.id == id);
  if (course.length) return course[0]; // Since filter return an array it has to be the very first element
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

