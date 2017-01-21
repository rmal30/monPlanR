import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import { Provider } from "react-redux";

import routes from "./config/routes";
import store, { history } from "./store";

render((
    <Provider store={store}>
        <Router routes={routes} history={history} />
    </Provider>
    ), document.getElementById("app"));
