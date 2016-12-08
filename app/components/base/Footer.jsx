import React, {Component} from "react";
import {Container, Segment} from "semantic-ui-react";

class Footer extends Component {
    render () {
        return (
            <Segment inverted attached="bottom" className="footer stackable">
                <Container textAlign="center">
                    <h4 className="ui inverted header">monPlan</h4>
                    <p>A Monash University Course Planner, designed by Monash Students, for Monash Students.</p>
                    <br></br>
                    <img className="logo" src="resources/img/monash.png" alt="logo" />
                    <p>Copyright &copy; Monash University 2016</p>
                </Container>
            </Segment>
        );
    }
}

export default Footer;
