import React, {Component} from "react";
import {Button, Container, Form, Grid, Icon, Message, Segment, Input, Label} from "semantic-ui-react";
import {Link, Router, Route} from "react-router";

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
            isEndYearError: false,
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

        if(e.target.value == ""){
            this.setState({endYear: this.endYearPlaceholder})
        }

        if (e.target.value.length >= 4) {
            let currentEndYear = parseInt(e.target.value);
            let maxEndYear = parseInt(this.state.startYear, 10) + 10;
            let minEndYear = parseInt(this.state.startYear, 10)
        
            if(currentEndYear < minEndYear){
                this.setState({
                    isEndYearError: true,
                    endYearErrorMessage: "End year must be equal to or greater than start year"
                });
            } else if (currentEndYear > maxEndYear){
                this.setState({
                    isEndYearError: true,
                    endYearErrorMessage: "Ending year must be less than " + maxEndYear.toString()
                });
            } else {
                this.setState({isEndYearError: false});
            }
        } else {
            this.setState({isEndYearError: false});
        }
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

        if(e.target.value == ""){
            this.setState({startYear: this.startYearPlaceholder})
        }

        if (e.target.value.length >= 4) {
            let currentStartYear = parseInt(e.target.value, 10);
            let maxStartYear = parseInt(this.startYearPlaceholder, 10) + 10;
            let minStartYear = parseInt(this.startYearPlaceholder, 10) - 10;
        
            if(currentStartYear > maxStartYear){
                this.setState({
                    isStartYearError: true,
                    startYearErrorMessage: "Starting year must be less than " + maxStartYear.toString()
                });
            } else if (currentStartYear < minStartYear){
                this.setState({
                    isStartYearError: true,
                    startYearErrorMessage: "Starting year must be greater than " + minStartYear.toString()
                });
            } else {
                this.setState({isStartYearError: false});
            }
        } else {
            this.setState({isStartYearError: false});
        }
        

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
        //const { formData, value } = this.state;
        // currently using onBlur instead of onChange for faster input, but need to test this to see if it will present an issue later.
        
        let startYearErrorMessage;
        let endYearErrorMessage;

        if (this.state.isStartYearError) {
            startYearErrorMessage = <Message
                        error
                        header="Invalid start year"
                        content={this.state.startYearErrorMessage}
                    />
        }

        if (this.state.isEndYearError) {
            endYearErrorMessage = <Message
                        error
                        header="Invalid end year"
                        content={this.state.endYearErrorMessage}
                    />
        }
        
        return (
            <Form size="large" error>
                <Segment raised>
                    <Form.Field>
                        <label>Commencement Year:</label>
                        <Form.Input 
                            type="text" 
                            placeholder={this.startYearPlaceholder} 
                            onChange={this.changeStartYear} 
                            error={this.state.isStartYearError} />
                        {startYearErrorMessage}
                    </Form.Field>
                    <Form.Field>
                        <label>Graduation Year:</label>
                        <Form.Input
                            type="text" 
                            placeholder={this.endYearPlaceholder} 
                            onChange={this.changeEndYear} 
                            error={this.state.isEndYearError} />
                        {endYearErrorMessage}
                    </Form.Field>
                    <Button 
                        color="green" 
                        disabled={this.state.isStartYearError || this.state.isEndYearError} 
                        onClick={this.submitData}>
                            Start Planning <Icon name="right arrow" />
                    </Button>
                    <Link to="/plan">
                        <Button color="blue" >
                            Start with an empty template <Icon name="right arrow" />
                        </Button>
                    </Link>
                    {startYearErrorMessage}
                </Segment>
            </Form>
        );
    }
}


YearFormContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default YearFormContainer;