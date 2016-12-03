import React, { Component } from 'react'
import {Search, Grid, Container, Icon, Menu, Label, Dropdown, Popup} from "semantic-ui-react"
import UnitSearch from './UnitSearch.jsx'

class Header extends Component {
    toggleToS() {

    }
    togglePrivacy() {

    }
    render() {
        return (
            <Menu attached="top" inverted stackable>
                <Menu.Header className="item">
                    <img className="logo" src="./img/logo.png" alt="logo" />
                    monPlan Alpha
                </Menu.Header>
                <UnitSearch className="item" />
                <Menu.Item id="creditCounter">
                    <Label color="green" size="large">
                        Total Credits Earnt
                        <Label.Detail id="credits">0</Label.Detail>
                    </Label>
                </Menu.Item>
                <Menu.Menu position="right">
                    <Popup
                        id="displayMessage"
                        trigger={<Menu.Item>Status: <span id="statusTag">OK</span> <Icon name="checkmark" color="green" id="statusIcon" /></Menu.Item>}
                        header="Everything looks good"
                        content="As you add units, we will inform you of any conflicts, such as missing prerequisites."
                        />
                    <Dropdown icon="info">
                        <Dropdown.Menu>
                            <Dropdown.Header>Quick Links (for Devs)</Dropdown.Header>
                            <Dropdown.Item as="a" href="https://github.com/MonashUnitPlanner" target="_blank"><Icon name="github" />GitHub Project</Dropdown.Item>
                            <Dropdown.Item as="a" href="https://monplan.slack.com" target="_blank"><Icon name="slack" />Slack (for Devs)</Dropdown.Item>
                            <Dropdown.Header>About</Dropdown.Header>
                            <Dropdown.Item as="a" href="https://gitreports.com/issue/MonashUnitPlanner/monPlan" target="_blank"><i className="bug icon"></i> Submit an Issue</Dropdown.Item>
                            <Dropdown.Item as="a" href="https://monashunitplanner.github.io" target="_blank"  className="item"><i className="info icon"></i>The Project</Dropdown.Item>
                            <Dropdown.Item as="a" href="https://goo.gl/TO6Z3M" target="_blank" className="item"><i className="users icon"></i> Join the Team</Dropdown.Item>
                            <Dropdown.Header as="a" className="ui inverted header">Our Policies</Dropdown.Header>
                            <Dropdown.Item as="a" onClick={this.toggleToS.bind(this)}>Terms of Use</Dropdown.Item>
                            <Dropdown.Item as="a" onClick={this.togglePrivacy.bind(this)}>Privacy Policy</Dropdown.Item><br />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default Header
