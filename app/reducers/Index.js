import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import Counter from "./Counter";
import CourseStructure from "./CourseStructure";

const appReducer = combineReducers({
    CourseStructure,
    Counter,
    routing: routerReducer
});

export default appReducer;
