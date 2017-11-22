export function createCourse(course) {
  // define action
  return {
    type: 'CREATE_COURSE', course: course
  }
}
