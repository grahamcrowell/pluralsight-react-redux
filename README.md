# 11 Async writes in Redux

- Manage Courses page (`src/components/course/ManageCoursePage.js`)
- Form inputs (`src/components/common/SelectInput.js` and `src/components/common/TextInput.js`)
- Create Authors Drop Down (create new "slice of state")
	- Action: create thunk and action creator (`src/actions/authorActions.js`)
	- Reducer: handle action (`src/reducers/index.js`)
	- Add to root reducer: listen for action (`src/reducers/index.js`)
	- Dispatch action at load time (`src/index.js`)
	- Transform data from consumption by components (`mapStateToProps` in `src/components/course/ManageCoursePage.js`)
- Centralize initial state (`src/reducers/initialState.js`)
- Handle form inputs with changeHandler (`updateCourseState` in `src/components/course/ManageCoursePage.js`)
- Save Function
	- Action, Thunk, ActionType
	- Reducer,
	- Add Course button (`src/component/course/CoursesPage`)
  - On save, redirect to courses; react context
  - componentWillRecieveProps; react lifesyle function

# 10 Async with Redux

- Mock API setup
- Add Thunk to store
- Create Courses Thunk
- Dispatch API call at load time
- Create nested components
