import React from "react";
import { Route, IndexRoute } from "react-router";

/* Components import here */
import Main from "../components/Main.jsx";
import Home from "../components/Home.jsx";
import Plan from "../components/Plan.jsx";
import MainLoading from "../components/MainLoading.jsx";
import tooltips from "../components/multi/tooltips.jsx";
/* Containers import here*/


module.exports = (
  <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="plan" component={Plan} />
      <Route path="tooltips" component={tooltips} />
      <Route path="MainLoading" component={MainLoading} />
  </Route>
);
