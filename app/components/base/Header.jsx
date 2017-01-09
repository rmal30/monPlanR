import React, { Component } from "react";
import { Icon, Menu, Dropdown, Popup } from "semantic-ui-react";
import MediaQuery from "react-responsive";
import { Link } from "react-router";

import ToSModal from "../modals/tos.jsx";
import PrivacyModal from "../modals/privacy.jsx";
import SettingsModal from "../modals/settings.jsx";


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
     * @returns {ReactElement} Header
     */
    render() {
        return (
            <Menu inverted compact className="no-print nav" onClick={this.props.handleDocumentClick}>
                <Link to="/">
                    <Menu.Item>
                        <img className="logo" src="resources/img/logo.png" alt="logo" />
                        <MediaQuery query="(min-device-width: 768px)">monPlan</MediaQuery>
                    </Menu.Item>
                </Link>
                {this.props.showAddUnit &&
                <Menu.Menu>
                    <Menu.Item onClick={this.props.handleSearchClick}>
                        <Icon name="plus" />
                        <MediaQuery query="(min-device-width: 768px)">Add unit</MediaQuery>
                    </Menu.Item>
                </Menu.Menu>
                }
                <Menu.Menu position="right">
                    {false /* disable status for now */ &&
                    <Popup
                        id="displayMessage"
                        trigger={<Menu.Item><MediaQuery query="(min-device-width: 500px)">Status: <span id="statusTag">OK</span></MediaQuery><Icon name="checkmark" color="green" id="statusIcon" /></Menu.Item>}
                        header="Everything looks good"
                        content="As you add units, we will inform you of any conflicts, such as missing prerequisites."
                        />
                    }
                    <Menu.Item as="a" href="https://docs.google.com/a/monash.edu/forms/d/e/1FAIpQLSf5Y65r7_9bAZbRysI2JYYcRAKNFgVck9XIIt67TfNwx26FqQ/viewform" target="_blank">
                        <Icon name="comment outline" />
                        <MediaQuery query="(min-device-width: 768px)">Give us feedback</MediaQuery>
                    </Menu.Item>
                    <Menu.Item>
                        <MediaQuery maxDeviceWidth={767}>
                            {mobile =>
                                <Dropdown floating text={!mobile ? "Menu" : ""} icon={mobile ? "options" : "caret down"}>
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
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default Header;
