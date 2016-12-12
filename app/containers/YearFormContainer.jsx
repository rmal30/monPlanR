import React, {Component} from "react";
import {Button, Container, Form, Grid, Icon, Message, Segment} from "semantic-ui-react";
import {Link, Router, Route} from "react-router";

/**
 * Home page that is shown to the user when they load the domain.
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
        //const { formData, value } = this.state;
        // currently using onBlur instead of onChange for faster input, but need to test this to see if it will present an issue later.
        return (
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
                <pre>{this.state.startYear}</pre>
            </Form>
        );
    }
}


YearFormContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default YearFormContainer;