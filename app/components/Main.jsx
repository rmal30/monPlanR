import React from "react";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

/* These imports handle the smooth transitioning between app views */
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import '../resources/css/transitions.css'

function Main(props) {
    return (
        <div className='main-container'>
            <Header />
            <ReactCSSTransitionGroup
                    transitionName="appear"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {React.cloneElement(props.children, {key: props.location.pathname})}
            </ReactCSSTransitionGroup>
            <Footer />
        </div>
    );
}

export default Main;