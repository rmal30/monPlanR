import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import Counter from "./Counter";
import CourseStructure from "./CourseStructure";
import UI from "./UI";

const appReducer = combineReducers({
    CourseStructure,
    Counter,
    UI,
    routing: routerReducer
});

export default appReducer;
