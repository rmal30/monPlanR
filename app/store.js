import { createStore } from "redux";
import { syncHistoryWithStore } from "react-router-redux";
import { browserHistory } from "react-router";

import appReducer from "./reducers/index";

const store = createStore(appReducer);

// Named export the history to use 
export const history = syncHistoryWithStore(browserHistory, store);

export default store;