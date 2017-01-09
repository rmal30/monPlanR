import React, { Component, PropTypes } from "react";

import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
// import TouchBackend from "react-dnd-touch-backend";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

import { Menu, Sidebar } from "semantic-ui-react";

import UnitSearchContainer from "../../containers/UnitSearchContainer.jsx";
// import UnitDragPreview from "../Unit/UnitDragPreview.jsx";

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
            searchVisible: false,
            addToCourse: null
        };

        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.attachAddToCourse = this.attachAddToCourse.bind(this);
        this.detachAddToCourse = this.detachAddToCourse.bind(this);
    }

    attachAddToCourse(addToCourse) {
        this.setState({
            addToCourse
        });
    }

    detachAddToCourse() {
        this.setState({
            addToCourse: null
        });
    }

    handleSearchClick() {
        this.setState({
            searchVisible: !this.state.searchVisible
        });
    }

    handleDocumentClick() {
        if(this.state.searchVisible) {
            this.setState({
                searchVisible: false
            });
        }
    }

    render() {
        return (
            <div className='main-container'>
                <Header
                    handleSearchClick={this.handleSearchClick}
                    searchVisible={this.state.searchVisible}
                    handleDocumentClick={this.handleDocumentClick}
                    showAddUnit={!!this.state.addToCourse} />
                <Sidebar.Pushable>
                    {this.state.addToCourse &&
                    <Sidebar as={Menu} animation="overlay" style={{width: 300}} direction="left" visible={this.state.searchVisible} vertical>
                        <UnitSearchContainer addToCourse={this.state.addToCourse} searchVisible={this.state.searchVisible} />
                    </Sidebar>
                    }
                    <Sidebar.Pusher dimmed={this.state.menuVisible} onClick={this.handleDocumentClick} className="main-body">
                        <ReactCSSTransitionGroup
                              transitionName="appear"
                              transitionEnterTimeout={500}
                              transitionLeaveTimeout={500}>
                              {React.cloneElement(this.props.children,
                                  {
                                      key: this.props.location.pathname,
                                      searchVisible: this.state.searchVisible,
                                      handleDocumentClick: this.handleDocumentClick,
                                      attachAddToCourse: this.attachAddToCourse,
                                      detachAddToCourse: this.detachAddToCourse
                                  })}
                        </ReactCSSTransitionGroup>
                        <Footer className="footer"/>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

Main.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object
};

export default DragDropContext(HTML5Backend)(Main);
