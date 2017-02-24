import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import Counter from "./Counter";
import CourseStructure from "./CourseStructure";
import UI from "./UI";
import Notifications from "./Notifications";
import ImportantDates from "./ImportantDates";
import UnitSearch from "./UnitSearch";
import CourseSearch from "./CourseSearch";

const appReducer = combineReducers({
    CourseStructure,
    Counter,
    UI,
    Notifications,
    ImportantDates,
    UnitSearch,
    CourseSearch,
    routing: routerReducer
});

export default appReducer;
