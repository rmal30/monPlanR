import React from "react";
import {Segment, Dimmer, Loader} from "semantic-ui-react";

/* These imports handle the smooth transitioning between app views */
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "../../resources/css/transitions.css";

function MainLoading(props) {
    return (

    <Segment height="100%">
      <Dimmer active>
        <Loader />
      </Dimmer>

    </Segment>
    );
}

export default MainLoading;
