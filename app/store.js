import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { syncHistoryWithStore } from "react-router-redux";
import { browserHistory } from "react-router";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import appReducer from "./reducers/Index";


const store = createStore(appReducer, composeWithDevTools(
    applyMiddleware(promise(), thunk)));

// Named export the history to use 
export const history = syncHistoryWithStore(browserHistory, store);

export default store;