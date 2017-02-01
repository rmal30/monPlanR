import React, { PropTypes, Component } from "react";
import { Button, Container, Divider, Form, Icon, Popup, Search, Segment } from "semantic-ui-react";
import { Link } from "react-router";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dataFetchActions from "../../actions/DataFetchActions";

import FuzzySearch from "../../utils/FuzzySearch";
import UnitQuery from "../../utils/UnitQuery";
import YearCalc from "../../utils/YearCalc.js";




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
            year: (this.startYearPlaceholder - 1),
            currentYear: (this.startYearPlaceholder - 1),
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
        this.props.fetchCourseInfo(CourseCode);
        this.props.submitCourseForm(CourseCode, year, code);
        
        this.context.router.push({
            pathname: "/plan"
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
        if(this.state.year.length !== 0){
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
                color="yellow"
                style={{backgroundColor: "#fdb515"}}
                disabled={this.state.yearIsDisabled || this.state.specIsDisabled || !this.state.courseSelected}
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
                fluid={mobile}>
                Start without selecting course
                {!mobile && <Icon name="right arrow" />}
            </Button>
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
            courseSelected: false,
            year: (this.state.currentYear)
        });
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
                                            label=""
                                            loading={this.state.isLoading}
                                            onResultSelect={this.handleResultSelect}
                                            onSearchChange={this.handleChange}
                                            onFocus={this.handleReSelect.bind(this)}
                                            results={this.state.results}
                                            placeholder="Search for your course"
                                            noResultsMessage="No courses found"
                                            noResultsDescription="We only store 2017 course maps for most courses across Monash."
                                            fluid
                                        />
                                </Form.Field>
                                <Form.Dropdown
                                    placeholder='Select Specialisation'
                                    search
                                    selection
                                    options={this.state.specialisations}
                                    onChange={this.handleSpecialisationSelect}
                                />
                                <Form.Dropdown
                                    placeholder='Select Starting Year'
                                    search
                                    selection
                                    options={this.state.years}
                                    onChange={this.handleYearSelect}
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
                                            <Popup
                                                header="Start Now"
                                                content="Click now to start planning with the current specified start/end years"
                                                trigger={this.btnStartPlan()} />
                                            <Button.Or />
                                            <Link to="/yearForm">
                                                <Popup
                                                    header="Empty Template"
                                                    content="Click here to start off with an empty template with no teaching periods added"
                                                    direction="bottom right"
                                                    trigger={this.btnEmptyPlan()} />
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
