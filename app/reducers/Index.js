import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import Counter from "./Counter";
import Course from "./Course";

const appReducer = combineReducers({
    Course,
    Counter,
    routing: routerReducer
});

export default appReducer;