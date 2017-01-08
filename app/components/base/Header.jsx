import React, { Component } from "react";
import { Icon, Menu, Dropdown, Popup } from "semantic-ui-react";
import MediaQuery from "react-responsive";
import { Link } from "react-router";

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
            <Menu inverted className="no-print nav" onClick={this.props.handleDocumentClick}>
                <Menu.Header>
                    <Link to="/">
                        <Menu.Item>
                            <img className="logo" src="resources/img/logo.png" alt="logo" />
                            <MediaQuery query="(min-device-width: 300px)">monPlan</MediaQuery>
                        </Menu.Item>
                    </Link>
                </Menu.Header>
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
                    <Menu.Item as="a" href="https://docs.google.com/a/monash.edu/forms/d/e/1FAIpQLScyXYUi_4-C7juCSrsvxqBuQCf1rKpoJLb7fVknxxApfrym2g/viewform" target="_blank">
                        <Icon name="comment outline" />
                        <MediaQuery query="(min-device-width: 768px)">Give us feedback</MediaQuery>
                    </Menu.Item>
                    <Menu.Item onClick={this.props.handleMenuClick}>
                        <Icon name="options" />
                        <MediaQuery query="(min-device-width: 768px)">Menu</MediaQuery>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default Header;
