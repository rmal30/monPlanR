import React, { PropTypes, Component } from "react";
import { Button, Container, Divider, Form, Icon, Search, Segment } from "semantic-ui-react";
import { Link } from "react-router";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dataFetchActions from "../../actions/DataFetchActions";

import FuzzySearch from "../../utils/FuzzySearch";
import UnitQuery from "../../utils/UnitQuery";
import YearCalc from "../../utils/YearCalc.js";
import ShowYear from "../../utils/ShowYear";




/**
 * Handles the data manipulation of the entry course select form
 */
class CourseSelectFormContainer extends Component {

    /**
     * constructs the form, gets the valid selectable dates
     */
    constructor() {
        super();
        this.startYearPlaceholder = new Date().getFullYear();
        this.state = {
            CourseCode: "",
            data: {},
            isLoading: false,
            results: [],
            value: "",
            specialisations: [],
            code: "",
            years: YearCalc.getStartYearVals(this.startYearPlaceholder),
            year: (ShowYear()),
            specIsDisabled: true,
            yearIsDisabled: true,
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
        const { CourseCode, year, code } = this.state;
        this.props.submitCourseForm(CourseCode, year, code); // I dont love it, but the order of these two is important here
        this.props.fetchCourseInfo(CourseCode); // grab updated course details

        this.context.router.push({
            pathname: "/plan"
        });
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
            courseSelected: true,
            readyToSubmit: this.state.CourseCode === value.title
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

        this.timer = setTimeout(() => {
            let results = FuzzySearch.search(value, this.state.data, 5, ["courseCode", "courseName"], 400).map(current => {return current.item;});

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
            readyToSubmit: !this.state.yearIsDisabled,
            yearIsDisabled: false,
        });
        if(this.state.year){
            this.setState({
                readyToSubmit: true
            });
        }
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
    btnStartPlan(mobile) {
        return (
            <Button
                fluid={mobile}
                className="btnorange"
                disabled={!this.state.readyToSubmit}
                onClick={this.handleSubmit}>
                    Start Planning <Icon name="right arrow" />
            </Button>
        );
    }

    /**
     * btnEmptyPlan is a function that returns a tooltipped button for the start year form
     */
    btnEmptyPlan(mobile) {
        return (
            <Button
                fluid={mobile}
                className="btnempty">
                Start without selecting course
                {!mobile && <Icon name="right arrow" />}
            </Button>
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
            <Segment basic>
                <MediaQuery maxDeviceWidth={767}>
                    {mobile =>
                        <Form size={!mobile ? "big" : undefined}>
                            <Form.Group widths="equal">
                                <Form.Field>
                                        <Search
                                            className="srch"
                                            label=""
                                            loading={this.state.isLoading}
                                            onResultSelect={this.handleResultSelect}
                                            onSearchChange={this.handleChange}
                                            results={this.state.results}
                                            placeholder="Search for your course"
                                            noResultsMessage="No courses found"
                                            noResultsDescription="We only store 2017 course maps for most courses across Monash."
                                            fluid
                                        />
                                </Form.Field>
                                <Form.Dropdown
                                    placeholder='Select specialisation'
                                    className="drpdown"
                                    disabled={this.state.specIsDisabled}
                                    search
                                    selection
                                    options={this.state.specialisations}
                                    onChange={this.handleSpecialisationSelect}
                                />
                                <Form.Dropdown
                                    placeholder='Select starting year'
                                    className="drpdown"
                                    disabled={this.state.yearIsDisabled}
                                    search
                                    selection
                                    options={this.state.years}
                                    onChange={this.handleYearSelect}
                                    value={this.state.year}
                                />
                            </Form.Group>

                            {mobile && (
                                    <Container>
                                        {this.btnStartPlan(true)}
                                        <Divider horizontal inverted>OR</Divider>
                                        <Link to="/yearForm">
                                            {this.btnEmptyPlan(true)}
                                        </Link>
                                    </Container>
                            )}
                            {!mobile && (
                                    <Container textAlign="right">
                                        <br />
                                        <Button.Group size="big">
                                            {this.btnStartPlan()}
                                            <Button.Or />
                                            <Link to="/yearForm">
                                            {this.btnEmptyPlan()}
                                            </Link>
                                        </Button.Group>
                                    </Container>
                                )
                            }
                        </Form>
                    }
                </MediaQuery>
            </Segment>
        );
    }
}

/**
 * Maps the necessary actions to form for submission
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(dataFetchActions, dispatch);
};

export default connect(null, mapDispatchToProps)(CourseSelectFormContainer);

CourseSelectFormContainer.contextTypes = {
    router: PropTypes.object.isRequired,
};

CourseSelectFormContainer.propTypes = {
    fetchCourseInfo: PropTypes.func,
    submitCourseForm: PropTypes.func
};
