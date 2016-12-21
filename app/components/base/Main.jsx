import React, { PropTypes } from "react";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

/* These imports handle the smooth transitioning between app views */
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "../../resources/css/transitions.css";

/**
 * The main layout used for all views.
 *
 * @param {object} props
 */
function Main(props) {
    Main.propTypes = {
        children: PropTypes.element.isRequired,
        location: PropTypes.object
    };

    return (
        <div className='main-container'>
            <Header />
            <ReactCSSTransitionGroup
                    transitionName="appear"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {React.cloneElement(props.children, {key: props.location.pathname})}
            </ReactCSSTransitionGroup>
            <div className="push" />
            <Footer className="footer"/>
        </div>
    );
}

export default Main;
