// Dependency imports
import React, { Component, PropTypes } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "../../resources/css/transitions.css"; // What is this...?

// UI framework imports
import { Menu, Sidebar } from "semantic-ui-react";

// Local component imports
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

//Local container imports
import UnitSearchContainer from "../../containers/UnitSearchContainer.jsx";

// Redux actions import
import * as courseActions from "../../actions/CourseActions";
import * as counterActions from "../../actions/CounterActions";


/**
 * Redux binding for main, this passes in the state as props to the main component via connect method at the bottom
 */
const mapStateToProps = (state) => {
    return {
        course: state.Course,
        counter: state.Counter
    };
};

/**
 * Redux bindings for functions, passes the action creators through with dispatch built in
 */
const mapDispatchToProps = (dispatch) => {
    const actionBundle = Object.assign({}, courseActions, counterActions);
    return bindActionCreators(actionBundle, dispatch);
};

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
            courseErrors: []
        };

        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);

        this.attachAddToCourse = this.attachAddToCourse.bind(this);
        this.detachAddToCourse = this.detachAddToCourse.bind(this);

        this.updateStatus = this.updateStatus.bind(this);
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
     * Triggers the updating of the error status section
     */
    updateStatus(courseErrors) {
        this.setState({ courseErrors });
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
                    showAddUnit={!!this.state.addToCourse && this.props.children.props.route.showAddUnit}
                    showStatus={this.props.children.props.route.showStatus}
                    courseErrors={this.state.courseErrors} />
                <Sidebar.Pushable>
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
                                      updateStatus: this.updateStatus,
                                      courseErrors: this.state.courseErrors,

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


/**
 * THIS IS IMPORTANT
 * To ensure that redux connect plays well with react drag and drop (which also uses connect), 
 * we need to first connect the main app with drag and drop, then we take the connected dnd version and 
 * connect it again through the redux. 
 */
const App = DragDropContext(HTML5Backend)(Main);
export default connect(mapStateToProps, mapDispatchToProps)(App);
