import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import Counter from "./Counter";
import CourseStructure from "./CourseStructure";
import UI from "./UI";
import Notifications from "./Notifications";

const appReducer = combineReducers({
    CourseStructure,
    Counter,
    UI,
    Notifications,
    routing: routerReducer
});

export default appReducer;
