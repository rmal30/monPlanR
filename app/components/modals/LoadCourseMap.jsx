import React, { Component, PropTypes } from "react";
import { Button, Icon, Modal, Search, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dataFetchActions from "../../actions/DataFetchActions";
import FuzzySearch from "../../utils/FuzzySearch";
import YearCalc from "../../utils/YearCalc";
import ShowYear from "../../utils/ShowYear";

/**
* A modal used specifically for students who wish to clear their course.
*/
class LoadCourseMap extends Component {
    /**
     * Holds states
     * courseCode - the Code to Be Found.
     */
    constructor() {
        super();
        this.startYearPlaceholder = new Date().getFullYear() + 1;
        this.state = {
            CourseCode: "",
            results: [],
            value: "",
            code: "",
            years: YearCalc.getStartYearVals(this.startYearPlaceholder),
            year: ShowYear(),
            specIsDisabled: true,
            yearIsDisabled: true
        };

        this.handleLoadCourse = this.handleLoadCourse.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSpecialisationSelect = this.handleSpecialisationSelect.bind(this);
        this.handleYearSelect = this.handleYearSelect.bind(this);
    }

    /**
     * On mount we query the api once to get the data we are searching against
     */
    componentDidMount() {
        this.props.fetchCourses();

    }

    /**
     * Opens the modal
     */
    handleOpen() {
        this.setState({
            modalOpen: true
        });
    }

    /**
     * Closes the modal
     */
    handleCancel() {
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
     * Called when the user presses the load course button, we close the modal, reset the component and call the parents
     * onCourseLoad function, feeding it the courseCode
     */
    handleLoadCourse() {
        const { CourseCode, code, year} = this.state;
        this.props.fetchCourseInfo(CourseCode);
        this.props.submitCourseForm(CourseCode, year, code);

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
        this.props.fetchAreaOfStudy(value.data.courseCode);
        this.setState({
            value: value.title,
            CourseCode: value.title,
            specIsDisabled: false,
        });

    }

    /**
     * On change to input we run a fuzzy search to get results and process the results into a semantic-ui search
     * friendly form (they require results in the form of title and description)
     */
    handleChange(e){
        let results = FuzzySearch.search(e.target.value, this.props.basicCourses, 5, ["courseCode", "courseName"], 400).map(current => {return current.item;});

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
            year: value
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
            <Modal trigger={(
                    <Button
                        fluid={this.props.mobile}
                        onClick={this.handleOpen.bind(this)}
                        className="btnlightblue">
                        Load course map
                    </Button>
                )}
                open={this.state.modalOpen}
                onClose={this.handleCancel}>
                <Modal.Header className="header-primary">
                    <Icon name="upload" /> Load a course map
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <div className="load-course-steps active">
                            <h3>Step 1/3: Find your course</h3>
                            <br />
                            <Search
                                className="srch"
                                loading={this.props.courseSearchIsLoading}
                                onResultSelect={this.handleResultSelect}
                                onSearchChange={this.handleChange}
                                results={this.state.results}
                                value={this.state.value}
                                placeholder="Search for your course"
                                selectFirstResult
                                noResultsMessage="No courses found"
                                noResultsDescription="We only store 2017 course maps for most courses across Monash."
                            />
                            <br />
                        </div>

                        <div className={"load-course-steps " + (!this.state.specIsDisabled && "active") }>
                            <h3>Step 2/3: Find your specialisation</h3>
                            <Dropdown
                                className="drpdown"
                                disabled={this.state.specIsDisabled}
                                placeholder='Select Specialisation'
                                search
                                selection
                                options={this.props.areasOfStudy}
                                onChange={this.handleSpecialisationSelect}/>
                            <br />
                            <br />
                        </div>

                        <div className={"load-course-steps " + (!this.state.yearIsDisabled && "active")}>
                            <h3>Step 3/3: Select your starting year</h3>
                            <p><i>
                                Please note that all course maps are for students who
                                commence their course in 2017, so your course map may
                                differ if you started your course before 2017.</i>
                            </p>
                            <Dropdown
                                className="drpdown"
                                disabled={this.state.yearIsDisabled}
                                placeholder='Select Starting Year'
                                search
                                selection
                                options={this.state.years}
                                onChange={this.handleYearSelect}
                                value={this.state.year}
                                />
                        </div>

                    </Modal.Description>
                </Modal.Content>

                <Modal.Actions>
                    <Button disabled={false} onClick={this.handleCancel} className="btnlightcancel">Cancel</Button>
                    <Button disabled={this.state.CourseCode === "" || this.state.code === "" || !this.state.year} onClick={this.handleLoadCourse} className="btnorange">Load {this.state.CourseCode || "Course"} Map</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

/**
 * Grab redux functions
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(dataFetchActions, dispatch);
};

/**
 * We need to check for error, loading and fulfilled data from redux store
 */
const mapStateToProps = (state) => {
    return {
        basicCourses: state.CourseStructure.basicCourses,
        courseSearchIsLoading: state.CourseStructure.courseSearchIsLoading,
        courseSearchError: state.CourseStructure.courseSearchError,
        areasOfStudy: state.CourseStructure.areasOfStudy,
        aosSearchIsLoading: state.CourseStructure.aosSearchIsLoading,
        aosSearchError: state.CourseStructure.aosSearchError
    };
};

LoadCourseMap.propTypes = {
    CourseCode: PropTypes.string,
    onCourseLoad: PropTypes.func,
    fetchCourseInfo: PropTypes.func,
    submitCourseForm: PropTypes.func,
    mobile: PropTypes.bool,
    areasOfStudy: PropTypes.array,
    basicCourses: PropTypes.array,
    courseSearchIsLoading: PropTypes.bool,
    fetchAreaOfStudy: PropTypes.func,
    fetchCourses: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadCourseMap);
