import React from "react";
import { Route, IndexRoute } from "react-router";

/* Components import here */
import Main from "../components/Base/Main.jsx";

import Home from "../components/Pages/Home.jsx";
import Plan from "../components/Pages/Plan.jsx";
import Graph from "../components/Pages/Graph.jsx";
import Future from "../components/Pages/myFuture/Future.jsx";
import CareerSelect from "../components/Pages/myFuture/CareerSelect.jsx";
import Commerce from "../components/Pages/myFuture/Commerce.jsx";
import View from "../components/Pages/View.jsx";
import YearFormContainer from "../containers/Forms/YearFormContainer.jsx";
import MissingPage from "../components/Pages/404.jsx";
import CareerDetailContainer from "../components/Pages/myFuture/CareerDetailContainer.jsx";


export default (
    <Route path="/" component={Main}>
        <IndexRoute darkBackground component={Home} />
        <Route path="future" myFuture noFooter noNav component={Future} />
        <Route path="future/select" myFuture noFooter noNav component={CareerSelect} />
        <Route path="future/commerce" myFuture noFooter noNav component={Commerce} />
        <Route path="future/career/:careerID" noFooter careerView noNav handler={CareerDetailContainer} component={CareerDetailContainer} />
        <Route path="yearForm" darkBackground component={YearFormContainer} />
        <Route path="plan(/?courseDetails)" noFooter component={Plan} handler={Home} showAddUnit showStatus />
        <Route path="graph" noFooter component={Graph} handler={Home} showAddUnit />
        <Route path="view/:id" component={View} showStatus />
        <Route path="*" component={MissingPage} />
    </Route>
);
