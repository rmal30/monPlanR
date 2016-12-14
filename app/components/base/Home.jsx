import React, {Component} from "react";
import {Button, Container, Form, Grid, Icon, Message, Segment} from "semantic-ui-react";
import {Link, Router, Route} from "react-router";

import YearFormContainer from '../../containers/YearFormContainer.jsx'

/**
 * Home page that is shown to the user when they load the domain.
 *
 * @class
 */
class Home extends Component {

    /**
     * Renders the welcome page, with a form and a disclaimer.
     *
     * @method
     */
    render() {
        //const { formData, value } = this.state;
        // currently using onBlur instead of onChange for faster input, but need to test this to see if it will present an issue later.
        return (
            <Container className="ui main text">
                <div id="welcome" className="ui container">
                    <h1>Welcome to monPlan!</h1>
                        <p>
                            monPlan allows you to plan your course structure whilst you are at
                            Monash University. We know that choosing units isn't particularly easy, so we've
                            designed a web app that you can use to simplify tasks.
                        </p>
                        <h2>To begin:</h2>
                        <Grid.Row>
                            <YearFormContainer />
                        </Grid.Row>
                    <h4>Disclaimer</h4>
                    <p className="disclaimer">monPlan is a tool designed to help students to design courses with ease. Our features are designed to assist you in planning your course, including recommending units based off past
                      SETU results. Since it is only a tool, we recommend you to see your faculty’s course advisor.</p>
                    <p className="disclaimer">Our fundamental goal is to allow all Monash University students to add any units in any teaching period, for any year. Period.
                      We place trust in you as a student to plan your own course, and for some quick guidance, we will inform you if there is anything that might be wrong with your course plan.</p>
                    <p className="disclaimer">Our promise is that we will never restrict you in adding your units to your course, and it is up to you and the course advisors to assist you with your plan.</p>

                </div>
            </Container>
        );
    }
}

export default Home;
