import React, { Component, PropTypes } from "react";
import { Icon, Menu, Dropdown, Popup } from "semantic-ui-react";
import MediaQuery from "react-responsive";
import { Link } from "react-router";

import ToSModal from "../modals/tos.jsx";
import PrivacyModal from "../modals/privacy.jsx";
// import SettingsModal from "../modals/settings.jsx";


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
            ? <ul>{this.props.courseErrors.map((error, index) => <li key={index}>{error.message}</li>)}</ul> : "As you add units, we will inform you of any conflicts, such as duplicate units.";

        return (
            <Menu inverted compact className="no-print nav" onClick={this.props.handleDocumentClick} style={{borderRadius: 0}}>
                <Menu.Menu>
                    <Link to="/">
                        <Menu.Item>
                            <img className="logo" src="/resources/img/logo.png" alt="logo" />
                            <MediaQuery minDeviceWidth={768}>monPlan</MediaQuery>
                        </Menu.Item>
                    </Link>
                    {this.props.showAddUnit &&
                    <Menu.Item onClick={this.props.handleSearchClick} className={this.props.searchVisible ? "active" : ""}>
                        <Icon name="plus" />
                        Add unit
                    </Menu.Item>
                    }
                </Menu.Menu>
                <Menu.Menu position="right">
                    {this.props.showStatus &&
                    <Popup
                        on="click"
                        wide
                        trigger={(
                            <Menu.Item>
                                <MediaQuery minDeviceWidth={768}>
                                    Course status: <span id="statusTag">{this.props.courseErrors.length > 0 ? this.props.courseErrors.length + " error" + (this.props.courseErrors.length > 1 ? "s" : "") : "OK"}</span>
                                </MediaQuery>
                                <Icon name={this.props.courseErrors.length > 0 ? "remove" : "checkmark"} color={this.props.courseErrors.length > 0 ? "red" : "green"} />
                            </Menu.Item>
                        )}>
                        <Popup.Header>
                            {this.props.courseErrors.length > 0 ? "Errors" : "Everything looks good"}
                        </Popup.Header>
                        <Popup.Content>
                            {content}
                        </Popup.Content>
                    </Popup>
                    }
                    <Menu.Item as="a" href="https://docs.google.com/a/monash.edu/forms/d/e/1FAIpQLSf5Y65r7_9bAZbRysI2JYYcRAKNFgVck9XIIt67TfNwx26FqQ/viewform" target="_blank">
                        <Icon name="comment outline" />
                        <MediaQuery query="(min-device-width: 768px)">Give us feedback</MediaQuery>
                    </Menu.Item>
                    <MediaQuery maxDeviceWidth={767}>
                        {mobile =>
                            <Dropdown floating text={!mobile ? "Menu" : ""} icon={mobile ? "options" : "caret down"} className="item">
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
                                </Dropdown.Menu>
                            </Dropdown>
                        }
                    </MediaQuery>
                </Menu.Menu>
            </Menu>
        );
    }
}

Header.propTypes = {
    handleDocumentClick: PropTypes.func,
    handleSearchClick: PropTypes.func,
    showAddUnit: PropTypes.bool,
    showStatus: PropTypes.bool,
    searchVisible: PropTypes.bool,
    courseErrors: PropTypes.array
};

export default Header;
