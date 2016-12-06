import React from "react";
import {Button, Container, Icon, Form, Grid} from "semantic-ui-react";
import { Link } from 'react-router'

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
            </div>
        </Container>
    );
}

export default Home;
