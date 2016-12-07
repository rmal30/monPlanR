import React, {Component} from "react";
import {Container, Segment} from "semantic-ui-react";

class Footer extends Component {
    render () {
        return (
            <Segment inverted attached="bottom" className="footer stackable">
                <Container textAlign="center">
                    <h4 className="ui inverted header">monPlan</h4>
                    <p>A Monash University Course Planner, designed by Monash Students, for Monash Students.</p>
                    <p>This project is licensed under <strong>the MIT License</strong> by monPlan</p>
                    <p>Copyright &copy; monPlan 2016 | Copyright &copy; Monash University 2016</p>
                    <img className="logo" src="resources/img/monash.png" alt="logo" />
                </Container>
            </Segment>
        );
    }
}

export default Footer;
