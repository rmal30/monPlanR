import React, { Component } from 'react'
import UnitSearch from './UnitSearch.jsx'

class Header extends Component {
    render () {
        return (
            <div className="ui top attached inverted stackable menu">
        <a className="header item">
            <img className="logo" src="../resources/img/logo.png" alt="logo" />
            monPlan Alpha
        </a>

        <div id="unitSearch" className="item">
            <UnitSearch />
        </div>

        <div id="creditCounter" className="item">
            <div className="ui green large label">
                Total Credits Earnt
                <div id="credits" className="detail">0</div>
            </div>
        </div>
        <div className="right menu">
            <div id="displayMessage" className="ui item pop" data-title="Everything looks good" data-content="As you add units, we will inform you of any
                conflicts, such as missing prerequisites.">
                Status:  <span id="statusTag">OK</span> <i id="statusIcon" className="icon green checkmark"></i>
            </div>
            <div className="ui normal dropdown icon item">
                <i className="info icon"></i>
                <div className="menu">
                    <h4 className="ui inverted header">Quick Links (for Devs)</h4>
                    <a href="https://github.com/MonashUnitPlanner" target="_blank" className="item"><i className="github icon"></i>GitHub Project</a>
                    <a href="https://monplan.slack.com" className="item"><i className="slack icon"></i>Slack (for Devs)</a>
                    <h4 className="ui inverted header">About</h4>
                    <a href="https://gitreports.com/issue/MonashUnitPlanner/monPlan" target="_blank"  className="item"><i className="bug icon"></i> Submit an Issue</a>
                    <a href="https://monashunitplanner.github.io" target="_blank"  className="item"><i className="info icon"></i>The Project</a>
                    <a href="https://goo.gl/TO6Z3M" target="_blank" className="item"><i className="users icon"></i> Join the Team</a>
                    <h4 className="ui inverted header">Our Policies</h4>
                    <a className="item" onClick="toggleToS()">Terms of Use</a>
                    <a className="item" onClick="togglePrivacy()">Privacy Policy</a><br />
                </div>
            </div>
        </div>
    </div>
        )
    }
}

export default Header
