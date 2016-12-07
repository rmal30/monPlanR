import React from "react";
import { Route, IndexRoute } from "react-router";

/* Components import here */
import Main from "../components/Main.jsx";
import Home from "../components/Home.jsx";
import Plan from "../components/Plan.jsx";

/* Containers import here*/
import UnitInfoContainer from "../containers/UnitInfoContainer.jsx";

module.exports = (
  <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="plan" component={Plan} />
      <Route path="unit" component={UnitInfoContainer} />
  </Route>
);
