import "babel-polyfill";

import React from "react";
import { render } from "react-dom";
import { Router } from "react-router";
import { Provider } from "react-redux";
import "./public/css/custom.css";
import "./public/css/monash.css";
import routes from "./config/routes";
import store, { history } from "./store";

render((
    <Provider store={store}>
        <Router routes={routes} history={history} />
    </Provider>
    ), document.getElementById("app"));
