import React, { Component, PropTypes } from "react";
import { Button, Icon, Menu, Dropdown, Popup } from "semantic-ui-react";
import MediaQuery from "react-responsive";
import { Link } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as uiActions from "../../actionCreators/UIActions";
import ImportantDates from "../../containers/ImportantDates.jsx";
import Disclaimer from "../modals/disclaimer.jsx";
import ToSModal from "../modals/tos.jsx";
import PrivacyModal from "../modals/privacy.jsx";

/**
 * The header for the web app, which displays the logo, name, status and information menu.
 */
class Header extends Component {

    /**
     * Used for settings modal to tell which react element is the target.
     *
     * @returns {ReactElement} Dropdown
     */
    static getSettingsModalTrigger(handleOpen) {
        return <Dropdown.Item as="a" onClick={handleOpen}><i className="settings icon"></i> User Settings</Dropdown.Item>;
    }

    /**
     * The header component is a navigation bar that uses the Menu component.
     *
     * @returns {Menu}
     */
    render() {
        let content = this.props.courseErrors.length > 0
            ? <ul>{this.props.courseErrors.map((error, index) => <li key={index}>{error.message}</li>)}</ul> : "As you add units, we will inform you of any conflicts, such as missing prerequisites.";

        return (
            <Menu onClick={() => this.props.hideSidebar()} inverted compact className="no-print nav toolbars" style={{borderRadius: 0}}>
                <Menu.Menu>
                    <Link to="/">
                        <Menu.Item>
                            <img className="logo" src="/img/logo.png" alt="logo" />
                            <MediaQuery minDeviceWidth={768} style={{marginLeft: "1em"}}>monPlan</MediaQuery>
                        </Menu.Item>
                    </Link>
                    {this.props.showAddUnit &&
                    <Menu.Item>
                        <Button
                            icon
                            color={this.props.showingSidebar ? "grey" : "blue"}
                            onClick={e => {
                                e.stopPropagation() /* otherwise add unit button will never work*/;
                                this.props.showingSidebar ? this.props.hideSidebar() : this.props.showSidebar();
                            }}>
                                <Icon name="plus" className={this.props.showingSidebar && "active" || "normal"} />
                                <MediaQuery style={{display: "inline-block"}} minDeviceWidth={768}>
                                    &nbsp;&nbsp;{this.props.showingSidebar ? <span>&nbsp;&nbsp;&nbsp;Cancel&nbsp;&nbsp;</span> : "Add unit"}
                                </MediaQuery>
                        </Button>
                    </Menu.Item>
                    }
                </Menu.Menu>
                <Menu.Menu position="right">
                    {this.props.showStatus &&
                        <Popup
                            on="hover"
                            hoverable
                            wide
                            trigger={(
                                <Menu.Item className={this.props.courseErrors.length > 0 ? "status error" : "status"}>
                                    <MediaQuery minDeviceWidth={768}>
                                        Course status:&nbsp;<span id="statusTag">{this.props.courseErrors.length > 0 ? this.props.courseErrors.length + " error" + (this.props.courseErrors.length > 1 ? "s" : "") : "OK"}</span>
                                </MediaQuery>&nbsp;
                                    <Icon name={this.props.courseErrors.length > 0 ? "remove" : "checkmark"} inverted color={this.props.courseErrors.length > 0 ? "red" : "green"} />
                                </Menu.Item>
                            )}>
                            <Popup.Header>
                                {this.props.courseErrors.length > 0 ? "The following problems were discovered" : "Everything looks good"}
                            </Popup.Header>
                            <Popup.Content>
                                {content}
                            </Popup.Content>
                        </Popup>
                    }
                    <ImportantDates />
                    <Menu.Item as="a" href="https://docs.google.com/a/monash.edu/forms/d/e/1FAIpQLSf5Y65r7_9bAZbRysI2JYYcRAKNFgVck9XIIt67TfNwx26FqQ/viewform" target="_blank">
                        <Icon name="comment outline" />
                        <MediaQuery query="(min-device-width: 768px)">Give us feedback</MediaQuery>
                    </Menu.Item>
                    <MediaQuery maxDeviceWidth={767}>
                        {mobile =>
                            <Dropdown floating text={!mobile ? "About" : ""} icon={mobile ? "options" : "caret down"} className="item">
                                <Dropdown.Menu>
                                    {false /* disable access to app settings for now */ &&
                                    <div className="pleaseRemoveOnceYouEnableThis">
                                        <Menu.Header>App Settings</Menu.Header>
                                        <Menu getTrigger={Header.getSettingsModalTrigger} />
                                    </div>
                                    }
                                    <Dropdown.Header>Issues</Dropdown.Header>
                                    <Dropdown.Item as="a" href="https://gitreports.com/issue/MonashUnitPlanner/monPlanR" target="_blank"><i className="bug icon"></i> Submit an Issue</Dropdown.Item>
                                    <Dropdown.Header>Developer Links</Dropdown.Header>
                                    <Dropdown.Item as="a" href="https://github.com/MonashUnitPlanner" target="_blank"><Icon name="github" />GitHub Project</Dropdown.Item>
                                    <Dropdown.Header>About</Dropdown.Header>
                                    <Dropdown.Item as="a" href="https://monashunitplanner.github.io" target="_blank"  className="item"><i className="info icon"></i>The Project</Dropdown.Item>
                                    <Dropdown.Item as="a" href="https://github.com/MonashUnitPlanner/monPlanR/wiki/v0.2.0-Release-Notes" target="_blank"><i className="file text outline icon"></i>Release Notes</Dropdown.Item>
                                    <Dropdown.Header>Our Policies</Dropdown.Header>
                                    <ToSModal trigger={<Dropdown.Item as="a">Terms of Use</Dropdown.Item>} />
                                    <PrivacyModal trigger={<Dropdown.Item as="a">Privacy Policy</Dropdown.Item>} />
                                    <Disclaimer trigger={<Dropdown.Item as="a">Disclaimer</Dropdown.Item>} />
                                </Dropdown.Menu>
                            </Dropdown>
                        }
                    </MediaQuery>
                </Menu.Menu>
            </Menu>
        );
    }
}

/**
 * header needs actions such as showSidebar from redux
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(uiActions, dispatch);
};

/**
 * header only needs to know whether it is showing sidebar or not to alter
 * sidebar trigger button as needed
 */
const mapStatetoProps = (state) => {
    return {
        showingSidebar: state.UI.showingSidebar,
        courseErrors: state.CourseStructure.courseErrors
    };
};


export default connect(mapStatetoProps, mapDispatchToProps)(Header);

Header.propTypes = {
    handleDocumentClick: PropTypes.func,
    handleSearchClick: PropTypes.func,
    showAddUnit: PropTypes.bool,
    showStatus: PropTypes.bool,
    searchVisible: PropTypes.bool,
    courseErrors: PropTypes.array,
    showSidebar: PropTypes.func,
    hideSidebar: PropTypes.func,
    showingSidebar: PropTypes.bool
};
