import React, { Component } from "react";
import { Button, Divider, Dropdown, Container, Form, Icon, Segment, Popup } from "semantic-ui-react";
import { Link } from "react-router";
import MediaQuery from "react-responsive";

import YearCalc from "../utils/YearCalc.js";

/**
 * The year form container prompts students to enter in their commercement and
 * their graduation years.
 */
class YearFormContainer extends Component {
    /**
     * Assumes that the student will plan a full time 4 year course next year.
     */
    constructor(props) {
        super(props);

        this.startYearPlaceholder = new Date().getFullYear();
        this.endYearPlaceholder = this.startYearPlaceholder + 3;

        this.state = {
            startYear: this.startYearPlaceholder,
            endYear: this.endYearPlaceholder,
            startYearErrorMessage: "",
            isStartYearError: false,
            endYearErrorMessage: "",
            endYearDisabled: true,
            notReadyToSubmit: true
        };

        this.submitData = this.submitData.bind(this);
        this.handleUpdateStartYear = this.handleUpdateStartYear.bind(this);
        this.handleUpdateEndYear = this.handleUpdateEndYear.bind(this);

        this.validStartYears = YearCalc.getStartYearVals(this.startYearPlaceholder);
        this.validEndYears = [];

    }

    /**
     * Called when user selects a start year from the dropdown, it finds the type of event
     * (mouseclick or enter key press) and grabs the data accordingly. It may seem crazy to have to seperate these, but the
     * semantic UI component doesn't have an easy way to get data from a dropdown on keypress easily'.
     * Also note that it then calculates the valid dropdown values for end year and re-enables the endyear dropdown.
     */
    handleUpdateStartYear(event, { value }) {
        const selectedStartYear = value;

        this.validEndYears = YearCalc.getEndYearVals(selectedStartYear);
        this.setState({
            startYear: selectedStartYear,
            endYearDisabled: false
        });
    }

    /**
     * Called when user selects an end year from the dropdown. As with handleUpdateStartYear it distingushes between
     * click and keyboard events because the way the data is accessed is different. The end year dropdown is the last piece of info
     * necessary for the form to be 'valid' so it makes the submit button not disabled.
     *
     * @param {SyntheticEvent} event
     * @param {object} value
     */
    handleUpdateEndYear(event, { value }) {
        const selectedEndYear = value;

        this.setState({
            endYear: selectedEndYear,
            notReadyToSubmit: false
        });
    }

    /**
     * When the form is submitted we move to the /plan page and feed the page the start and end year
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
     * btnStartPlan is a function that returns a tooltipped button for the start year form when you want to start
     */
    btnStartPlan() {
        return (
            <Popup
                header="Start Now"
                content="Click now to start planning with the current specified start/end years"
                trigger={(
                    <Button
                        color="yellow"
                        disabled={this.state.notReadyToSubmit}
                        onClick={this.submitData}>
                            Start Planning <Icon name="right arrow" />
                    </Button>
                )} />
        );
    }

    /**
     * btnEmptyPlan is a function that returns a tooltipped button for the start year form
     */
    btnEmptyPlan() {
        return (
            <Popup
                header="Empty Template"
                content="Click here to start off with an empty template with no teaching periods added"
                direction="bottom right"
                trigger={<Button>Just start with an empty template <Icon name="right arrow" /></Button>} />
        );
    }
    /**

    /**
     * Renders the welcome page, with a form and a disclaimer.
     *
     * @method
     */
    render() {
        //const { formData, value } = this.state;
        // currently using onBlur instead of onChange for faster input, but need to test this to see if it will present an issue later.

        return (

            <Container style={{color: "white"}}>
                <div style={{padding: "4.5em"}}></div>
                <h1 style={{textAlign: "center", fontSize: "3em"}}>monPlan</h1>
                <p style={{textAlign: "center", fontSize: "1.5em"}}>
                    Planning your course at Monash is now easier than ever.
                </p>
                <Segment basic>
                    <MediaQuery maxDeviceWidth={767}>
                        {mobile =>
                            <Form size={!mobile ? "big" : undefined}>
                                <Form.Group widths="equal">
                                    <Form.Field>
                                        <Popup
                                            header="Select a start year"
                                            content="Begin typing or clicking a year from the dropdown menu. This is the year that you want to start planning from onwards."
                                            positioning="top right"
                                            on="focus"
                                            trigger={<Dropdown
                                                        onChange={this.handleUpdateStartYear}
                                                        placeholder="Select start year" fluid search selection
                                                        options={this.validStartYears}/>}
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Popup
                                            header="Select an end year"
                                            content="Begin typing or clicking a year from the dropdown menu. This is the last year that you want to plan for."
                                            positioning="top right"
                                            on="focus"
                                            trigger={<Dropdown
                                                        onChange={this.handleUpdateEndYear}
                                                        placeholder="Select end year" fluid search selection
                                                        options={this.validEndYears}
                                                        disabled={this.state.endYearDisabled}/>}
                                        />
                                    </Form.Field>
                                </Form.Group>
                                {mobile &&
                                    <Container>
                                        <Button
                                            fluid
                                            color="yellow"
                                            disabled={this.state.notReadyToSubmit}
                                            onClick={this.submitData}>
                                                Start Planning <Icon name="right arrow" />
                                        </Button>
                                        <Divider horizontal inverted>OR</Divider>
                                        <Link to="/plan">
                                            <Button fluid>
                                                Just start with an empty template
                                            </Button>
                                        </Link>
                                    </Container>
                                }
                                {!mobile &&
                                    <Container textAlign="right">
                                        <br />
                                        <Button.Group size="big">
                                            {this.btnStartPlan()}
                                            <Button.Or />
                                            <Link to="/plan">
                                                {this.btnEmptyPlan()}
                                            </Link>
                                        </Button.Group>
                                    </Container>
                                }
                        </Form>
                        }
                    </MediaQuery>
                </Segment>
            </Container>
        );
    }
}


YearFormContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default YearFormContainer;
