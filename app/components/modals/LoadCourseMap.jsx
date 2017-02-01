import React, { Component, PropTypes } from "react";
import { Button, Icon, Modal, Search, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dataFetchActions from "../../actions/DataFetchActions";
import FuzzySearch from "../../utils/FuzzySearch";
import UnitQuery from "../../utils/UnitQuery";
import YearCalc from "../../utils/YearCalc";

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
            data: {},
            isLoading: false,
            results: [],
            value: "",
            specialisations: [],
            code: "",
            years: YearCalc.getStartYearVals(this.startYearPlaceholder),
            year: 0,
            specIsDisabled: true,
            yearIsDisabled: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleLoadCourse = this.handleLoadCourse.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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
        this.props.onCourseLoad(code, year);
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
            specialisations
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
                        fluid
                        onClick={this.handleOpen.bind(this)}
                        className="btnlightblue">
                        Load Course Map
                    </Button>
                )}
                open={this.state.modalOpen}
                onClose={this.handleCancel}>
                <Modal.Header>
                    <Icon name="external square" /> Load Course Map
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>
                            To load a course map, enter your course name and it
                            will automatically load up a template for you.
                        </p>
                    <br />
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

                    <br />
                    <Dropdown
                        disabled={this.state.specIsDisabled}
                        placeholder='Select Specialisation'
                        search
                        selection
                        options={this.state.specialisations}
                        onChange={this.handleSpecialisationSelect}/>
                    <br />
                    <br />
                    <p>
                        Please note that all course maps are for students who
                        commence their course in 2017, so your course map may
                        differ if you started your course before 2017.
                    </p>
                    <Dropdown
                        disabled={this.state.yearIsDisabled}
                        placeholder='Select Starting Year'
                        search
                        selection
                        options={this.state.years}
                        onChange={this.handleYearSelect}/>
                    </Modal.Description>
                </Modal.Content>

                <Modal.Actions>
                    {this.state.CourseCode === "" ? <Button disabled color="green">Load Course Map</Button> : <Button disabled={this.state.code === "" || !this.state.year} onClick={this.handleLoadCourse} color="green">Load {this.state.CourseCode} Map</Button>}
                    <Button onClick={this.handleCancel}>Cancel</Button>
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

LoadCourseMap.propTypes = {
    CourseCode: PropTypes.string,
    onCourseLoad: PropTypes.func,
    fetchCourseInfo: PropTypes.func,
    submitCourseForm: PropTypes.func
};

export default connect(null, mapDispatchToProps)(LoadCourseMap);
