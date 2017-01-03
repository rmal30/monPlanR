import React, { Component, PropTypes } from "react";

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
class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuVisible: false
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    handleSearchClick() {
        this.setState({
            searchVisible: !this.state.searchVisible,
            menuVisible: false
        });
    }

    handleMenuClick() {
        this.setState({
            menuVisible: !this.state.menuVisible,
            searchVisible: false
        });
    }

    handleDocumentClick() {
        if(this.state.menuVisible || this.state.searchVisible) {
            this.setState({
                menuVisible: false,
                searchVisible: false
            });
        }
    }

    render() {
        return (
            <div className='main-container'>
                <Header handleMenuClick={this.handleMenuClick} handleSearchClick={this.handleSearchClick} />
                <ReactCSSTransitionGroup
                        transitionName="appear"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}>
                        {React.cloneElement(this.props.children, {key: this.props.location.pathname, menuVisible: this.state.menuVisible, searchVisible: this.state.searchVisible, handleDocumentClick: this.handleDocumentClick})}
                </ReactCSSTransitionGroup>
                <div className="push" />
                <Footer className="footer"/>
            </div>
        );
    }
}

Main.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object
};

export default Main;
