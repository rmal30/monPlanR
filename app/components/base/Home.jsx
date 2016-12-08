import React from "react";
import {Button, Container, Icon, Form, Grid} from "semantic-ui-react";
import { Link } from "react-router";

/**
 * The home component
 * @param props
 **/
function Home(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const startPlanning = (e) => {

    };
    const startPlanningEmpty = (e) => {

    };
    return (
        <Container className="ui main text">
            <div id="welcome" className="ui container">
                <h1>Welcome to monPlan!</h1>
                <p>monPlan allows you to plan your course structure whilst you are at
                    Monash University. We know that choosing units isn't particularly easy, so we've
                    designed a web app that you can use to simplify tasks.</p>
                    <h2>To Begin</h2>
                    <p>Please enter your commencement and graduation year to get started.</p>
                    <Grid.Row>
                        <Form onSubmit={handleSubmit} size="large">
                            <div className="ui raised segment">
                                <Form.Field>
                                    <div className="ui labeled input">
                                        <div className="ui label">Commencement Year:</div>
                                        <input id="startYr" name="startYr" type="text" placeholder="2016" />
                                    </div>
                                </Form.Field>
                                <Form.Field>
                                    <div className="ui labeled input">
                                        <div className="ui label">Graduation Year:</div>
                                        <input id="gradYr" name="gradYr" type="text" placeholder="2018" />
                                    </div>
                                </Form.Field>
                                <Link to="/plan"><Button color="green">Start Planning <Icon name="right arrow" /></Button></Link>
                                <Button onClick={startPlanningEmpty}>Start with empty template</Button>
                            </div>
                        </Form>
                    </Grid.Row>
                <h4>Disclaimer</h4>
                <p className="disclaimer">Our fundamental goal is to allow all Monash University students to add any units in any teaching period, for any year. Period.
                  We place trust in you as a student to plan your own course, rather than babysitting you by integrating rigid rules that tells you exactly what you can and cannot do.
                  These rules are complicated to implement in our software, so we only implemented the basics.</p>
                <p className="disclaimer">For some quick guidance, we will inform you if there is anything that might be wrong with your course plan. However, our promise is that we will never restrict you in
                  adding your units to your course, and it is up to you and the course advisors to assist you with your plan.</p>
                <p className="disclaimer">monPlan is a tool designed to help students to design courses with ease. Our features are designed to assist you in planning your course, including recommending units based off past
                  SETU results. Since it is a tool, we recommend you to see your faculty’s course advisor.</p>

            </div>
        </Container>
    );
}

export default Home;
