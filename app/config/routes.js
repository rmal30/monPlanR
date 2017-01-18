import React from "react";
import { Route, IndexRoute } from "react-router";

/* Components import here */
import Main from "../components/base/Main.jsx";
import Home from "../components/base/Home.jsx";
import Plan from "../components/base/Plan.jsx";
import Disclaimer from "../components/base/Disclaimer.jsx";
import View from "../components/base/View.jsx";
import YearFormContainer from "../containers/YearFormContainer.jsx";

import MissingPage from "../components/base/404.jsx";

export default (
    <Route path="/" component={Main}>
        <IndexRoute component={Home} />
        <Route path="yearSelect" component={YearFormContainer} />
        <Route path="plan(/?courseDetails)" component={Plan} handler={Home} />
        <Route path="view/:id" component={View} />
        <Route path="disclaimer" component={Disclaimer} />
        <Route path="*" component={MissingPage} />
    </Route>
);
