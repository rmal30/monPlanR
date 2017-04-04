// To support slightly older browsers that do not support certain methods
import "babel-polyfill";

import React from "react";
import { render } from "react-dom";
import { Router } from "react-router";
import { Provider } from "react-redux";

// Styling
import "semantic-ui-less/semantic.less";
import "./public/css/custom.css";
import "./public/css/monash.css";

import routes from "./config/routes";
import store, { history } from "./store";

const ReactGA = require("react-ga");
ReactGA.initialize("UA-88744252-1");

/**
* logPageView
*/
function logPageView() {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
}

render((
    <Provider store={store}>
        <Router routes={routes} history={history} onUpdate={logPageView}/>
    </Provider>
    ), document.getElementById("app"));
