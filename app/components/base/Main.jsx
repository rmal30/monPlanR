import React, { Component, PropTypes } from "react";

import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

import ToSModal from "../modals/tos.jsx";
import PrivacyModal from "../modals/privacy.jsx";
import SettingsModal from "../modals/settings.jsx";
import Notes from "../modals/NotesModal.jsx";

import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

import UnitSearchContainer from "../../containers/UnitSearchContainer.jsx";

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
                <Header handleMenuClick={this.handleMenuClick} handleSearchClick={this.handleSearchClick} handleDocumentClick={this.handleDocumentClick} />
                <div className='main-body'>
                    <Sidebar.Pushable as={Segment}>
                        <Sidebar as={Menu} animation="overlay" style={{width: 300}} direction="right" visible={this.state.menuVisible} icon="labeled" vertical inverted>
                            <Menu.Item>
                                {false /* disable access to app settings for now */ &&
                                <div className="pleaseRemoveOnceYouEnableThis">
                                    <Menu.Header>App Settings</Menu.Header>
                                    <Menu getTrigger={Header.getSettingsModalTrigger} />
                                </div>
                                }
                                <Menu.Header>Issues</Menu.Header>
                                <Menu.Item as="a" href="https://gitreports.com/issue/MonashUnitPlanner/monPlan" target="_blank"><i className="bug icon"></i> Submit an Issue</Menu.Item>
                                <Menu.Header>Developer Links</Menu.Header>
                                <Menu.Item as="a" href="https://github.com/MonashUnitPlanner" target="_blank"><Icon name="github" />GitHub Project</Menu.Item>
                                <Menu.Header>About</Menu.Header>
                                <Menu.Item as="a" href="https://monashunitplanner.github.io" target="_blank"  className="item"><i className="info icon"></i>The Project</Menu.Item>
                                <Notes trigger={<Menu.Item as="a"><i className="file text outline icon"></i>Release Notes</Menu.Item>} />
                                <Menu.Header>Our Policies</Menu.Header>
                                <ToSModal trigger={<Menu.Item as="a">Terms of Use</Menu.Item>} />
                                <PrivacyModal trigger={<Menu.Item as="a">Privacy Policy</Menu.Item>} />
                            </Menu.Item>
                        </Sidebar>
                        <Sidebar.Pusher dimmed={this.state.menuVisible}>
                            <ReactCSSTransitionGroup
                                  transitionName="appear"
                                  transitionEnterTimeout={500}
                                  transitionLeaveTimeout={500}>
                                  {React.cloneElement(this.props.children, {key: this.props.location.pathname, menuVisible: this.state.menuVisible, searchVisible: this.state.searchVisible, handleDocumentClick: this.handleDocumentClick})}
                            </ReactCSSTransitionGroup>
                            <Footer className="footer"/>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </div>
            </div>
        );
    }
}

Main.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object
};

export default DragDropContext(HTML5Backend)(Main);
