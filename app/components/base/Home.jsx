import React, {Component} from "react";
import {Button, Container, Form, Grid, Icon, Message, Segment} from "semantic-ui-react";
import {Link, Router, Route} from "react-router";

/**
 * Home page that is shown to the user when they load the domain.
 *
 * @class
 */
class Home extends Component {
    /**
     * Assumes that the student will plan a full time 4 year course next year.
     *
     * @constructor
     */
    constructor(props) {
        super(props);

        this.startYearPlaceholder = new Date().getFullYear() + 1;
        this.endYearPlaceholder = this.startYearPlaceholder + 3;

        this.state = {
            startYear: this.startYearPlaceholder,
            endYear: this.endYearPlaceholder
        };

        this.returnData = this.returnData.bind(this);
        this.changeEndYear = this.changeEndYear.bind(this);
        this.changeStartYear = this.changeStartYear.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    /**
     * Changes end year in the state.
     *
     * @method
     * @param e - Event object
     */
    changeEndYear(e) {
        this.setState({
            endYear: e.target.value
        });
    }

    /**
     * Changes start year in the state.
     *
     * @method
     * @param e - Event object
     */
    changeStartYear(e) {
        this.setState({
            startYear: e.target.value
        });
    }

    returnData() {
        return this.state;
    }

    /**
     * Directs user to /plan where they can start planning their course.
     *
     * @method
     * @param event
     */
    submitData(event) {
        event.preventDefault();

        const { startYear, endYear } = this.state;

        this.context.router.push({
            pathname: "/plan",
            query: {
                startYear: startYear,
                endYear: endYear
            }
        });
    }

    /**
     * Renders the welcome page, with a form and a disclaimer.
     *
     * @method
     */
    render() {
        const { formData, value } = this.state;

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
                        <p>Please enter your commencement and graduation year to get started.</p>
                        <Grid.Row>
                            <Form size="large">
                                <Segment raised>
                                    <Form.Field>
                                        <label>Commencement Year:</label>
                                        <input type="text" placeholder={this.startYearPlaceholder} onChange={this.changeStartYear} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Graduation Year:</label>
                                        <input type="text" placeholder={this.endYearPlaceholder} onChange={this.changeEndYear} />
                                    </Form.Field>
                                    <Button color="green" onClick={this.submitData}>Start Planning <Icon name="right arrow" /></Button>
                                     <Link to="/plan"><Button color="blue" >Start with an empty template <Icon name="right arrow" /></Button></Link>
                                </Segment>
                            </Form>
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


Home.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Home;
