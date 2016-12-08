import React from "react";


/* These imports handle the smooth transitioning between app views */
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "../resources/css/transitions.css";

function Main(props) {
    return (
        <ReactCSSTransitionGroup
                transitionName="appear"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                {React.cloneElement(props.children, {key: props.location.pathname})}
            </ReactCSSTransitionGroup>
    );
}

export default Main;