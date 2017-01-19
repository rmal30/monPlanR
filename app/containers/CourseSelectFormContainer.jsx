import React, { Component } from "react";
import { Button, Divider, Dropdown, Container, Header, Icon, Step, Popup, Search, Grid } from "semantic-ui-react";
import { Link } from "react-router";
import MediaQuery from "react-responsive";
import FuzzySearch from "../utils/FuzzySearch";
import UnitQuery from "../utils/UnitQuery";
import YearCalc from "../utils/YearCalc.js";
import CourseInfoContainer from "./CourseInfoContainer.jsx";




/**
 * Handles the data manipulation of the entry course select form
 */
class CourseSelectFormContainer extends Component {

    /**
     * constructs the form, gets the valid selectable dates
     */
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

        this.timer = null;

        this.handleChange = this.handleChange.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleSpecialisationSelect = this.handleSpecialisationSelect.bind(this);
        this.handleYearSelect = this.handleYearSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
     * Setting a timer helps reduce lag, but when component is unmounting we have to remove
     * the timer
     */
    componentWillUnmount() {
        if(this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    /**
     * handles the submission of the entire form
     */
    handleSubmit(event) {
        event.preventDefault();

        this.context.router.push({
            pathname: "/plan",
            query: {
                startYear: this.state.year,
                courseToLoad: this.state.code
            }
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
    handleChange(e) {
        if(this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        const { value } = e.target;

        if(!this.state.isLoading) {
            this.setState({
                isLoading: true
            });
        }

        this.timer = setTimeout(() => {
            let results = FuzzySearch.search(value, this.state.data, 5, ["courseCode", "courseName"]).map(current => {return current.item;});

            results = results.map(item => {
                return {title: item.courseCode, description: item.courseName, data: item};
            });

            this.setState({
                results: results,
                isLoading: false
            });
        }, 500);
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
                        onClick={this.handleSubmit}>
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
     * Partially resets the component when user focuses on course search input again.
     */
    handleReSelect() {
        this.setState({
            isLoading: false,
            specIsDisabled: true,
            yearIsDisabled: true,
            readyToSubmit: false,
            courseSelected: false,
            year: 0
        });
    }

    /**
     * Returns a Modal prompting the user to enter which course map they would
     * like to load.
     *
     * @returns {Modal}
     */
    render() {
        const defaultTemplate = (
            <Container>
                <br />
                <Header as="h1" icon textAlign="center">
                    <Icon name="graduation" />
                    Select a course
                    <Header.Subheader>Course details will be shown here</Header.Subheader>
                </Header>
            </Container>
        );

        return (
            <div>
                <Grid celled stackable>
                    <MediaQuery maxDeviceWidth={767}>
                        {mobile => {
                            if(mobile) {
                                return (null);
                            } else {
                                return (
                                    <Grid.Row>
                                      <div style={{overflowX: "auto"}}>
                                        <Step.Group>
                                            <Step
                                                active={!this.state.courseSelected}
                                                completed={this.state.courseSelected}
                                                title="Search a Course"
                                                description="Find a course using search"
                                                icon="search"/>
                                            <Step
                                                active={this.state.courseSelected && this.state.yearIsDisabled}
                                                completed={!this.state.yearIsDisabled}
                                                title="Choose an Area of Study"
                                                description="Choose one that sounds interesting to you"
                                                icon="mouse pointer" />
                                            <Step
                                                active={!this.state.yearIsDisabled && !this.state.readyToSubmit}
                                                completed={this.state.readyToSubmit}
                                                title="Select Start year"
                                                description="Select year that you started"
                                                icon="calendar" />
                                            <Step
                                                active={this.state.readyToSubmit}
                                                completed={this.state.readyToSubmit}
                                                title="Ready to Go!"
                                                description="Click 'Start Planning' to begin"
                                                icon="rocket" />
                                        </Step.Group>
                                      </div>
                                    </Grid.Row>
                                );
                            }
                        }}
                        </MediaQuery>
                    <Grid.Column width={4}>
                      <div style={{overflowX:"auto"}}>
                        <h4>Find your course:</h4>
                        <Search
                            loading={this.state.isLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={this.handleChange}
                            onFocus={this.handleReSelect.bind(this)}
                            results={this.state.results}
                            placeholder="Search for your course"
                            selectFirstResult
                            noResultsMessage="No courses found"
                            noResultsDescription="We only store 2017 course maps for most courses across Monash."
                            {...this.props}
                            fluid
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
                            fluid
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
                            fluid
                        />
                        <br />
                        <br />
                      </div>
                    </Grid.Column>
                    <MediaQuery maxDeviceWidth={767}>
                        {mobile => {
                            if(!mobile) {
                                return (
                                    <Grid.Column width={12} style={{height: 500, overflowY: "auto"}}>
                                        {this.state.courseSelected ? <CourseInfoContainer courseCode={this.state.CourseCode}/> : defaultTemplate}
                                    </Grid.Column>
                                );
                            } else {
                                return null;
                            }
                        }}
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
                                        onClick={this.handleSubmit}>
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
                    }}
                </MediaQuery>
            </div>
        );
    }
}

CourseSelectFormContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default CourseSelectFormContainer;
