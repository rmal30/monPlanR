import React, { Component } from "react";
import {Search, Grid, Container, Icon, Menu, Label, Dropdown, Popup} from "semantic-ui-react";
import MediaQuery from "react-responsive";

import ToSModal from "../modals/tos.jsx";
import PrivacyModal from "../modals/privacy.jsx";
import SettingsModal from "../modals/settings.jsx";

/**
 * The header for the web app, which displays the logo, name, status and information menu.
 */
class Header extends Component {
    static getSettingsModalTrigger(handleOpen) {
        return <Dropdown.Item as="a" onClick={handleOpen}><i className="settings icon"></i> User Settings</Dropdown.Item>;
    }
    render() {
        return (
            <Menu attached="top" inverted>
                <Menu.Header className="item">
                    <img className="logo" src="resources/img/logo.png" alt="logo" />
                    <MediaQuery query="(min-device-width: 300px)">monPlan v0.1.0</MediaQuery>
                </Menu.Header>
                <Menu.Menu position="right">
                    {false /* disable status for now */ &&
                    <Popup
                        id="displayMessage"
                        trigger={<Menu.Item><MediaQuery query="(min-device-width: 500px)">Status: <span id="statusTag">OK</span></MediaQuery><Icon name="checkmark" color="green" id="statusIcon" /></Menu.Item>}
                        header="Everything looks good"
                        content="As you add units, we will inform you of any conflicts, such as missing prerequisites."
                        />
                    }
                    <Dropdown floating text="Menu" className="item">
                        <Dropdown.Menu>
                            {false /* disable access to app settings for now */ &&
                            <div className="pleaseRemoveOnceYouEnableThis">
                                <Dropdown.Header>App Settings</Dropdown.Header>
                                <SettingsModal getTrigger={Header.getSettingsModalTrigger} />
                            </div>
                            }
                            <Dropdown.Header>Issues</Dropdown.Header>
                            <Dropdown.Item as="a" href="https://gitreports.com/issue/MonashUnitPlanner/monPlan" target="_blank"><i className="bug icon"></i> Submit an Issue</Dropdown.Item>
                            <Dropdown.Header>Quick Links (for Devs)</Dropdown.Header>
                            <Dropdown.Item as="a" href="https://github.com/MonashUnitPlanner" target="_blank"><Icon name="github" />GitHub Project</Dropdown.Item>
                            <Dropdown.Item as="a" href="https://monplan.slack.com" target="_blank"><Icon name="slack" />Slack (for Devs)</Dropdown.Item>
                            <Dropdown.Header>About</Dropdown.Header>
                            <Dropdown.Item as="a" href="https://monashunitplanner.github.io" target="_blank"  className="item"><i className="info icon"></i>The Project</Dropdown.Item>
                            <Dropdown.Item as="a" href="https://goo.gl/TO6Z3M" target="_blank" className="item"><i className="users icon"></i> Join the Team</Dropdown.Item>
                            <Dropdown.Header as="a" className="ui inverted header">Our Policies</Dropdown.Header>
                            <ToSModal trigger={<Dropdown.Item as="a">Terms of Use</Dropdown.Item>} />
                            <PrivacyModal trigger={<Dropdown.Item as="a">Privacy Policy</Dropdown.Item>} />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default Header;
