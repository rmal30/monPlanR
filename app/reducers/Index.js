import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import Counter from "./Counter";
import CourseStructure from "./CourseStructure";
import UI from "./UI";
import Notifications from "./Notifications";
import ImportantDatesReducer from "./ImportantDatesReducer";
import UnitSearchReducer from "./UnitSearchReducer";
import CourseSearchReducer from "./CourseSearchReducer";
import CourseSnapshotReducer from "./CourseSnapshotReducer";

const appReducer = combineReducers({
    CourseStructure,
    Counter,
    UI,
    Notifications,
    ImportantDates: ImportantDatesReducer,
    UnitSearch: UnitSearchReducer,
    CourseSearch: CourseSearchReducer,
    CourseSnapshot: CourseSnapshotReducer,
    routing: routerReducer
});

export default appReducer;
