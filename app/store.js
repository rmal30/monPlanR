import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { syncHistoryWithStore } from "react-router-redux";
import { browserHistory } from "react-router";
import logger from "redux-logger";
import promise from "redux-promise-middleware";
import appReducer from "./reducers/Index";


/**
 * Promise middle ware is used a little differently
 * 
 * The initial action should dispatch an action with a payload of a promise
 * 
 * like:
 *      store.dispatch({
 *          type: "FOO"
 *          payload: axios.get("""")
 * })
 * 
 * This then broken up into 
 * FOO_PENDING
 * FOO_FULFILLED
 * FOO_REJECTED
 */
const store = createStore(appReducer, composeWithDevTools(
    applyMiddleware(promise(), logger())));

// Named export the history to use 
export const history = syncHistoryWithStore(browserHistory, store);

export default store;