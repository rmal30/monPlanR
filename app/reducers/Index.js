import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import Counter from "./Counter";
import CourseStructure from "./CourseStructure";
import UI from "./UI";
import Notifications from "./Notifications";
import ImportantDates from "./ImportantDates";
import UnitSearch from "./UnitSearch";
import CourseSearchReducer from "./CourseSearchReducer";
import CourseSnapshot from "./CourseSnapshot";

const appReducer = combineReducers({
    CourseStructure,
    Counter,
    UI,
    Notifications,
    ImportantDates,
    UnitSearch,
    CourseSearch: CourseSearchReducer,
    CourseSnapshot,
    routing: routerReducer
});

export default appReducer;
