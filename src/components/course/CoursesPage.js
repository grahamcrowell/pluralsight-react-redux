import React from 'react';

class CoursesPage extends React.Component {
  // create new course form; component container
  constructor(props, context) {
    super(props, context);

    // set local state
    this.state = {
      course: {title: null}
    };
  }
  // called on each key stroke, updates state.
  onTitleChange(event){
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course: course});
  }
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
