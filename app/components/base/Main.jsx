import React, { Component, PropTypes } from "react";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

/* These imports handle the smooth transitioning between app views */
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "../../resources/css/transitions.css";

import {StickyContainer, Sticky} from "react-sticky";

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
          <StickyContainer>
            <div className='main-container'>
              <Sticky style={{zIndex: '9999'}}>
                <Header handleMenuClick={this.handleMenuClick} handleSearchClick={this.handleSearchClick} />
              </Sticky>
                <div className='main-body'>
                  <ReactCSSTransitionGroup
                          transitionName="appear"
                          transitionEnterTimeout={500}
                          transitionLeaveTimeout={500}>
                          {React.cloneElement(this.props.children, {key: this.props.location.pathname, menuVisible: this.state.menuVisible, searchVisible: this.state.searchVisible, handleDocumentClick: this.handleDocumentClick})}
                  </ReactCSSTransitionGroup>
                  <Footer className="footer"/>
                </div>
            </div>
          </StickyContainer>
        );
    }
}

Main.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object
};

export default Main;
