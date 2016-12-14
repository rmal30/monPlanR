import React, {Component} from "react";
import {Button, Dropdown, Container, Form, Grid, Icon, Message, Segment, Input, Label} from "semantic-ui-react";
import {Link, Router, Route} from "react-router";
import ErrorMessage from "../components/multi/ErrorMessage.jsx";
import YearCalc from "../utils/YearCalc.js"

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

        this.returnData = this.returnData.bind(this);
        this.submitData = this.submitData.bind(this);
        this.handleUpdateStartYear = this.handleUpdateStartYear.bind(this);
        this.handleUpdateEndYear = this.handleUpdateEndYear.bind(this);

        this.validStartYears = YearCalc.getStartYearVals(this.startYearPlaceholder);
        this.validEndYears = [];

    }


    handleUpdateStartYear(event){
        let selectedStartYear = event.target.textContent
        this.validEndYears = YearCalc.getEndYearVals(selectedStartYear);
        this.setState({
            startYear: selectedStartYear,
            endYearDisabled: false
        })

    }

    handleUpdateEndYear(event){
        let selectedEndYear = event.target.textContent
        this.validEndYears = YearCalc.getEndYearVals(selectedEndYear);
        this.setState({
            endYear: selectedEndYear,
            notReadyToSubmit: false
        })
    }
    /**
     * 
     */
    returnData() {
        return this.state;
    }

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
        //const { formData, value } = this.state;
        // currently using onBlur instead of onChange for faster input, but need to test this to see if it will present an issue later.
    
        return (
            <Form size="large" error>
                <Segment raised>
                    <Form.Field>
                        <label>Commencement Year:</label>
                        <Dropdown onAddItem={this.handleUpdateStartYear} placeholder="Select start year" fluid search selection options={this.validStartYears}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Graduation Year:</label>
                        <Dropdown onAddItem={this.handleUpdateEndYear} placeholder="Select end year" disabled={this.state.endYearDisabled} fluid search selection options={this.validEndYears}/>
                    </Form.Field>
                    <Button 
                        color="green" 
                        disabled={this.state.notReadyToSubmit}
                        onClick={this.submitData}>
                            Start Planning <Icon name="right arrow" />
                    </Button>
                    <Link to="/plan">
                        <Button color="blue" >
                            Start with an empty template <Icon name="right arrow" />
                        </Button>
                    </Link>
                </Segment>
            </Form>
        );
    }
}


YearFormContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default YearFormContainer;