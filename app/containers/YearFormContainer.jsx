import React, {Component} from "react";
import {Button, Divider, Dropdown, Container, Form, Grid, Header, Icon, Message, Segment, Input, Label} from "semantic-ui-react";
import {Link, Router, Route} from "react-router";
import MediaQuery from "react-responsive";

import ErrorMessage from "../components/multi/ErrorMessage.jsx";
import YearCalc from "../utils/YearCalc.js";


import Tooltips from "../components/multi/tooltips.jsx";
/**
 *
 * @class
 */
class YearFormContainer extends Component {
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
    handleUpdateStartYear(event){
        let selectedStartYear = "";

        if(event.type === "click"){
            selectedStartYear = event.target.textContent;
        } else if (event.type === "keydown"){
            selectedStartYear = event.target.nextSibling.innerText;
        } else {
            console.log("error with collection of events");
        }

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
     */
    handleUpdateEndYear(event){
        let selectedEndYear = "";

        if(event.type === "click"){
            selectedEndYear = event.target.textContent;
        } else if (event.type === "keydown"){
            selectedEndYear = event.target.nextSibling.innerText;
        } else {
            console.log("error with collection of events");
        }

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

    btnStartPlan(){
        return (Tooltips.generate("Start Now", "Click now to start planning with the current specified start/end years", "", <Button
                color="green"
                disabled={this.state.notReadyToSubmit}
                onClick={this.submitData}>
                    Start Planning <Icon name="right arrow" />
            </Button>));
    }

    btnEmptyPlan(){
        return (Tooltips.generate('Empty Template','Click here to start off with an empty template with no Teaching Periods added',
                'bottom right',
                <Button>
                    Just start with an empty template <Icon name="right arrow" />
            </Button>));
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
            <Form size="large" error>
                <Segment raised>
                    <p>Please enter your commencement and graduation year to get started.</p>
                    <Form.Field>
                        <label>Commencement Year:</label>
                        {Tooltips.generate('Select a Year', 'Begin typing and select a year from the dropdown menu, for validation purposes you will have to select a year here first'
                            , "top right", <Dropdown onChange={this.handleUpdateStartYear} placeholder="Select start year" fluid search selection options={this.validStartYears}/>)}
                    </Form.Field>
                    <Form.Field>
                        <label>Graduation Year:</label>
                        <Dropdown onAddItem={this.handleUpdateEndYear} placeholder="Select end year" disabled={this.state.endYearDisabled} fluid search selection options={this.validEndYears}/>
                    </Form.Field>
                    <MediaQuery maxDeviceWidth={767}>
                        {mobile => {
                            if(mobile) {
                                return (
                                    <Container>
                                        <Button
                                            fluid
                                            color="green"
                                            disabled={this.state.notReadyToSubmit}
                                            onClick={this.submitData}>
                                                Start Planning <Icon name="right arrow" />
                                        </Button>
                                        <Divider />
                                        <Container textAlign="center">
                                            <b style={{fontSize: "1.5em"}}>or</b>
                                        </Container>
                                        <Divider />
                                        <Link to="/plan">
                                            <Button fluid>
                                                Just start with an empty template
                                            </Button>
                                        </Link>
                                    </Container>
                                );
                            } else {
                                return (
                                        <Button.Group>
                                            {this.btnStartPlan()}
                                            <Button.Or />
                                            <Link to="/plan">
                                                {this.btnEmptyPlan()}
                                            </Link>
                                        </Button.Group>
                                );
                            }
                        }
                    }
                    </MediaQuery>
                </Segment>
            </Form>
        );
    }
}


YearFormContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default YearFormContainer;
