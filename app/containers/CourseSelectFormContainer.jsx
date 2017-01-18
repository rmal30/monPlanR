import React, { Component } from "react";
import { Button, Divider, Dropdown, Container, Form, Icon, Segment, Popup, Search, Grid } from "semantic-ui-react";
import { Link } from "react-router";
import MediaQuery from "react-responsive";
import FuzzySearch from "../utils/FuzzySearch";
import UnitQuery from "../utils/UnitQuery";
import YearCalc from "../utils/YearCalc.js";
import CourseInfoContainer from "./CourseInfoContainer.jsx";
/**
 *
 */
class CourseSelectFormContainer extends Component {

    constructor() {
            super();
            this.startYearPlaceholder = new Date().getFullYear() + 1;
            this.state = {
                CourseCode: "",
                data: {},
                isLoading: false,
                results: [],
                value: "",
                specialisations: [],
                code: "",
                years: YearCalc.getStartYearVals(this.startYearPlaceholder),
                year: 0,
                specIsDisabled: true,
                yearIsDisabled: true,
                readyToSubmit: false,
                courseSelected: false
            };

            this.handleChange = this.handleChange.bind(this);
            this.handleResultSelect = this.handleResultSelect.bind(this);
            this.handleLoadCourse = this.handleLoadCourse.bind(this);
            this.handleSpecialisationSelect = this.handleSpecialisationSelect.bind(this);
            this.handleYearSelect = this.handleYearSelect.bind(this);
        }

        /**
         * On mount we query the api once to get the data we are searching against
         */
        componentDidMount() {
            UnitQuery.getCourses()
                .then(response => {
                    this.setState({data: response.data});
                })
                .catch(err => {
                    console.error(err);
                });
        }

        /**
         * 
         */
        handleLoadCourse() {
            this.props.onCourseLoad(this.state.code, this.state.year);
            this.setState({
                CourseCode: "",
                value: "",
                modalOpen: false,
                disabled: true,
                specIsDisabled: true,
                yearIsDisabled: true,
                code: "",
                year: 0
            });

        }

        /**
         * Clears the course and then closes the modal.
         */
        handleClick() {
            this.handleClose();
        }

        /**
         * When a value is selected, we updated the prompt to show the title and save the coursecode to the state
         */
        handleResultSelect(e, value) {
            let specialisations = value.data.courseAOS.map(item => {
                return {
                    text: item.aosName,
                    value: item.code,
                };
            });
            this.setState({
                value: value.title,
                CourseCode: value.title,
                specIsDisabled: false,
                specialisations,
                courseSelected: true
            });

        }

        /**
         * On change to input we run a fuzzy search to get results and process the results into a semantic-ui search
         * friendly form (they require results in the form of title and description)
         */
        handleChange(e){
            let results = FuzzySearch.search(e.target.value, this.state.data, 5, ["courseCode", "courseName"]).map(current => {return current.item;});

            results = results.map(item => {
                return {title: item.courseCode, description: item.courseName, data: item};
            });

            this.setState({
                value: e.target.value,
                results: results
            });
        }

        /**
         * Changes specialisation value, and enables start year selection
         */
        handleSpecialisationSelect(e, { value }) {
            this.setState({
                code: value,
                yearIsDisabled: false
            });
        }

        /**
         * Changes starting year value.
         */
        handleYearSelect(e, { value }) {
            this.setState({
                year: value,
                readyToSubmit: true
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
                        color="green"
                        disabled={!this.state.readyToSubmit}
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
                trigger={<Button>Start without selecting course<Icon name="right arrow" /></Button>} />
        );
    }

        /**
         * Returns a Modal prompting the user to enter which course map they would
         * like to load.
         *
         * @returns {Modal}
         */
        render() {
            return (
                <div>
                <Grid celled stackable>
                    <Grid.Column width={4}>
                        <h4>Find your course:</h4>
                        <Search
                            loading={this.state.isLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={this.handleChange}
                            results={this.state.results}
                            value={this.state.value}
                            placeholder="Search for your course"
                            selectFirstResult
                            noResultsMessage="No courses found"
                            noResultsDescription="We only store 2017 course maps for most courses across Monash."
                            {...this.props}
                        />
                        <h4>Choose your area of study:</h4>
                        <br />
                        <Dropdown
                            disabled={this.state.specIsDisabled}
                            placeholder='Select Specialisation'
                            search
                            selection
                            options={this.state.specialisations}
                            onChange={this.handleSpecialisationSelect}
                        />
                        <br />
                        <h4>Select your start year:</h4>
                        <Dropdown
                            disabled={this.state.yearIsDisabled}
                            placeholder='Select Starting Year'
                            search
                            selection
                            options={this.state.years}
                            onChange={this.handleYearSelect}
                        />
                        <br />
                        <br />
                    </Grid.Column>
                    <MediaQuery maxDeviceWidth={767}>
                        {mobile => {if (!mobile){
                            return (
                                <Grid.Column width={12} style={{height: '500px', overflowY: 'scroll'}}>
                                    {this.state.courseSelected ? <CourseInfoContainer courseCode={this.state.CourseCode}/> : <p>Still need to select course...</p>}
                                </Grid.Column>
                            );
                        } else {
                            return null;
                        }}
                        }
                    </MediaQuery>
                    
                </Grid>
                <MediaQuery maxDeviceWidth={767}>
                            {mobile => {
                                if(mobile) {
                                    return (
                                        <Container>
                                            <Button
                                                fluid
                                                color="green"
                                                disabled={!this.state.readyToSubmit}
                                                onClick={this.submitData}>
                                                    Start Planning <Icon name="right arrow" />
                                            </Button>
                                            <Divider horizontal>OR</Divider>
                                            <Link to="/yearForm">
                                                <Button fluid>
                                                    Start without selecting course
                                                </Button>
                                            </Link>
                                        </Container>
                                    );
                                } else {
                                    return (
                                        <Button.Group>
                                            {this.btnStartPlan()}
                                            <Button.Or />
                                            <Link to="/yearForm">
                                                {this.btnEmptyPlan()}
                                            </Link>
                                        </Button.Group>
                                    );
                                }
                            }
                        }
                </MediaQuery>
                </div>
            );
        }
}

CourseSelectFormContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default CourseSelectFormContainer;