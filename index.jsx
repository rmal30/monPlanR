import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";

import routes from "./app/config/routes";

if(typeof VERSION !== "undefined") {
    console.log(VERSION);
}

render((
    <Router routes={routes} history={browserHistory} />
    ), document.getElementById("app"));
