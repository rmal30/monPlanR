// Dependency imports
import React, { Component, PropTypes } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "../../public/css/transitions.css"; // What is this...?

// UI framework imports
import { Menu, Sidebar } from "semantic-ui-react";

// Local component imports
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

//Local container imports
import UnitSearchContainer from "../../containers/Unit/UnitSearchContainer.jsx";

// Redux actions import
import * as courseActions from "../../actions/CourseActions";
import * as counterActions from "../../actions/CounterActions";
import * as dataFetchActions from "../../actions/DataFetchActions";
import * as uiActions from "../../actions/UIActions";


/**
 * Redux binding for main, this passes in the state as props to the main component via connect method at the bottom
 */
const mapStateToProps = (state) => {
    return {
        courseStructure: state.CourseStructure,
        counter: state.Counter,
        showingSidebar: state.UI.showingSidebar,
        showingPalette: state.UI.showingPalette
    };
};

/**
 * Redux bindings for functions, passes the action creators through with dispatch built in
 */
const mapDispatchToProps = (dispatch) => {
    const actionBundle = {
        ...courseActions,
        ...counterActions,
        ...dataFetchActions,
        ...uiActions
    };
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

        this.props.fetchTeachingPeriods(); // grabs teaching period strings from API
        this.props.fetchDates();
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
                {!this.props.children.props.route.noNav && <Header
                    showAddUnit={this.props.children.props.route.showAddUnit}
                    showStatus={this.props.children.props.route.showStatus} />}
                <Sidebar.Pushable>
                    {this.props.children.props.route.showAddUnit &&
                    <Sidebar as={Menu} animation="overlay" style={{width: 300}} direction="left" visible={this.props.showingSidebar} vertical>
                        <UnitSearchContainer />
                    </Sidebar>
                    }
                    <Sidebar.Pusher
                        id="main-body"
                        style={{
                            backgroundColor: this.props.children.props.route.darkBackground ? "#003c5b" : "white"
                        }}
                        className={
                            this.props.children.props.route.myFuture ? "study" : null +
                            this.props.children.props.route.careerView ? "viewCareer" : null
                        }
                        onClick={this.props.hideSidebar}>
                        <ReactCSSTransitionGroup
                              transitionName="appear"
                              transitionEnterTimeout={500}
                              transitionLeaveTimeout={500}>
                              {React.cloneElement(this.props.children,
                                  {
                                      key: this.props.location.pathname
                                  })}
                        </ReactCSSTransitionGroup>
                        {!this.props.children.props.route.noFooter && <Footer className="footer"/>}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

Main.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object,
    fetchTeachingPeriods: PropTypes.func,
    showingSidebar: PropTypes.bool,
    hideSidebar: PropTypes.func,
    fetchDates: PropTypes.func
};


/**
 * THIS IS IMPORTANT
 * To ensure that redux connect plays well with react drag and drop (which also uses connect),
 * we need to first connect the main app with drag and drop, then we take the connected dnd version and
 * connect it again through the redux.
 */
const App = DragDropContext(HTML5Backend)(Main);
export default connect(mapStateToProps, mapDispatchToProps)(App);
