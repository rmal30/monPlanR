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

import FullTestSuite from "../../tests/FullTestSuite";

/**
 * The main layout used for all views.
 *
 * @param {object} props
 */
class Main extends Component {
    /**
     * The state holds a boolean value for whether or not to show the sidebar,
     * and a function which is used for the "Add unit" sidebar to make it
     * functional.
     *
     * @author Saurabh Joshi
     */
    constructor(props) {
        super(props);

        this.state = {
            searchVisible: false,
            addToCourse: null,
            getCourseErrors: null,
            courseErrors: null
        };


        /**
         * Test suite runs by default on refresh, if fed 'silent', 
         * no console logs will be presented unless a component fails
         * If fed nothing it will display just output of sucessful reducer 
         * test groups and if fed "verbose" will output results of each individual 
         * unit test as well.
         */
        FullTestSuite("silent");

        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);

        this.attachAddToCourse = this.attachAddToCourse.bind(this);
        this.detachAddToCourse = this.detachAddToCourse.bind(this);

        this.attachGetCourseErrors = this.attachGetCourseErrors.bind(this);
        this.detachGetCourseErrors = this.detachGetCourseErrors.bind(this);
    }

    /**
     * Attaches addToCourse function to the state.
     *
     * @author Saurabh Joshi
     */
    attachAddToCourse(addToCourse) {
        this.setState({ addToCourse });
    }

    /**
     * Detaches addToCourse function from the state.
     *
     * @author Saurabh Joshi
     */
    detachAddToCourse() {
        this.attachAddToCourse(null);
    }

    /**
     * Attaches getCourseErrors function to the state.
     *
     * @author Saurabh Joshi
     */
    attachGetCourseErrors(getCourseErrors) {
        this.setState({ getCourseErrors });
    }

    /**
     * Detaches getCourseErrors function from the state.
     *
     * @author Saurabh Joshi
     */
    detachGetCourseErrors() {
        this.attachGetCourseErrors(null);
    }

    /**
     * Handles the add unit menu item click, which toggles the view of the
     * sidebar.
     *
     * @author Saurabh Joshi
     */
    handleSearchClick() {
        this.setState({
            searchVisible: !this.state.searchVisible
        });
    }

    /**
     * When the user clicks anywhere but the sidebar, this method is used
     * to hide the sidebar from view.
     *
     * @author Saurabh Joshi
     */
    handleDocumentClick() {
        if(this.state.searchVisible) {
            this.setState({
                searchVisible: false
            });
        }
    }

    /**
     * Renders a header and a sidebar pushable, which holds the "Add unit"
     * sidebar. The children props is within the sidebar pusher, which is where
     * page components are rendered.
     *
     * @author Saurabh Joshi
     */
    render() {
        return (
            <div className="main-container">
                <Header
                    handleSearchClick={this.handleSearchClick}
                    searchVisible={this.state.searchVisible}
                    handleDocumentClick={this.handleDocumentClick}
                    showAddUnit={!!this.state.addToCourse}
                    showStatus={!!this.state.getCourseErrors}
                    courseErrors={typeof this.state.getCourseErrors === "function" ? this.state.getCourseErrors() : []} />
                <Sidebar.Pushable >
                    {this.state.addToCourse &&
                    <Sidebar as={Menu} animation="overlay" style={{width: 300}} direction="left" visible={this.state.searchVisible} vertical>
                        <UnitSearchContainer addToCourse={this.state.addToCourse} searchVisible={this.state.searchVisible} />
                    </Sidebar>
                    }
                    <Sidebar.Pusher id="main-body" dimmed={this.state.menuVisible} onClick={this.handleDocumentClick}>
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
                                      detachAddToCourse: this.detachAddToCourse,
                                      attachGetCourseErrors: this.attachGetCourseErrors,
                                      detachGetCourseErrors: this.detachGetCourseErrors
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
