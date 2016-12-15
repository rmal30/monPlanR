import React from "react";
import { Route, IndexRoute } from "react-router";

/* Components import here */
import Main from "../components/base/Main.jsx";
import Home from "../components/base/Home.jsx";
import Plan from "../components/base/Plan.jsx";
import tooltips from "../components/multi/tooltips.jsx";

/* Containers import here*/
import UnitInfoContainer from "../containers/UnitInfoContainer.jsx";

module.exports = (
  <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="plan(/?courseDetails)" component={Plan} handler={Home}/>
      <Route path="tooltips" component={tooltips} />
      <Route path="unit" component={UnitInfoContainer} />
  </Route>
);
