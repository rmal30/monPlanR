import React from "react";
import { Route, IndexRoute } from "react-router";

/* Components import here */
import Main from "../components/base/Main.jsx";
import Home from "../components/base/Home.jsx";
import Plan from "../components/base/Plan.jsx";
import Tooltips from "../components/multi/tooltips.jsx";
import Disclaimer from "../components/base/Disclaimer.jsx";

import MissingPage from "../components/base/404.jsx";

/* Containers import here */
import UnitInfoContainer from "../containers/UnitInfoContainer.jsx";

export default (
    <Route path="/" component={Main}>
        <IndexRoute component={Home} />
        <Route path="plan(/?courseDetails)" component={Plan} handler={Home} />
        <Route path="tooltips" component={Tooltips} />
        <Route path="unit" component={UnitInfoContainer} />
        <Route path="disclaimer" component={Disclaimer} />
        <Route path="*" component={MissingPage} />
    </Route>
);
