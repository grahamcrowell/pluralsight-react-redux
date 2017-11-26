# 12 Async status and Error Handling
- Loading dots component to tell user when AJAX call in progress (`src/LoadingDots`)
- Multiple reduces handle same action
- AJAX status tracking:
  - Actions created when AJAX call begins and ends
  - Track actions in progress with convention: actions that use AJAX calls have action.type \*`_SUCESS`
  - Add reducer to root reducer
  - Update existing Thunks to dispatch action new creators
    - Allows for immediate UI update; optimistic approach to API
    - Consideration: dispatch these action creators in API to centralize dispatching
  - Hide dots component when no AJAX calls in progress
    - connect top level component to redux store (`src/components/App.js`)
      - Add `mapStateToProps` function to transform `state.ajaxCallsInProgress` into ON/OFF flag
- Use promises to prevent showing stale state (`redirect` in `src/components/course/ManageCoursePage.js`)
  - Use *local state* and toatr to indicate when save is in progress
- Handle errors from server side validation (mocked in API)


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
