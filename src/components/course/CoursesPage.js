import React from 'react';

class CoursesPage extends React.Component {
  // create new course form; component container
  constructor(props, context) {
    super(props, context);

    // set local state
    this.state = {
      course: {title: ""} // input can't be null => use ""
    };

    // ES6 requires explicit binding to ensure correct 'this'
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }
  // called on each key stroke, updates state.
  onTitleChange(event){
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course: course});
  }
  // state undefined.  'this' is wrong.  ES6 doesn't autobind.
  onClickSave() {
    alert(`Saving course: ${this.state.course.title}`)
  }
  render() {
    return (
      <div>
        <h1>Courses</h1>
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

export default CoursesPage;
