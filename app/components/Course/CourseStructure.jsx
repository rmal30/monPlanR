import React, { Component, PropTypes } from "react";
import { Container, Dimmer, Loader, Table, Segment } from "semantic-ui-react";
import MediaQuery from "react-responsive";
import { browserHistory } from "react-router";

import LocalStorage from "../../utils/LocalStorage.js";

import CourseViewActions from "./CourseViewActions.jsx";
import CourseEditActions from "./CourseEditActions.jsx";

import TeachingPeriod from "../TeachingPeriod/TeachingPeriod.jsx";
import NoTeachingPeriodContainer from "../../containers/TeachingPeriod/NoTeachingPeriodContainer.jsx";
import InsertTeachingPeriodContainer from "../../containers/TeachingPeriod/InsertTeachingPeriodContainer.jsx";
import OverloadButtonContainer from "../../containers/Buttons/OverloadButtonContainer.jsx";
import ConfirmDeleteOverload from "../modals/ConfirmDeleteOverload.jsx";
import ConfirmDeleteTeachingPeriodModal from "../modals/ConfirmDeleteTeachingPeriodModal.jsx";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as counterActions from "../../actions/CounterActions";
import * as courseActions from "../../actions/CourseActions";
import * as dataFetchActions from "../../actions/DataFetchActions";
import * as uiActions from "../../actions/UIActions";

/**
 * Set up any props you want course structure to be passed here
 */
const mapStateToProps = state => {
    return {
        creditPoints: state.Counter.creditPoints,
        cost: state.Counter.cost,
        teachingPeriods: state.CourseStructure.teachingPeriods,
        numberOfUnits: state.CourseStructure.numberOfUnits,
        teachingPeriodData: state.CourseStructure.teachingPeriodData,
        nextSemesterString: state.CourseStructure.nextSemesterString,
        courseLoading: state.CourseStructure.courseLoading,
        teachingPeriodCodeToInsert: state.CourseStructure.teachingPeriodCodeToInsert,
        showingInsertTeachingPeriodUI: state.UI.showingInsertTeachingPeriodUI,
        courseSnapshotLoading: state.CourseStructure.courseSnapshotLoading,
        courseErrors: state.CourseStructure.courseErrors,
        invalidUnitSlotCoordinates: state.CourseStructure.invalidUnitSlotCoordinates
    };
};

/**
 * Set up any functions from the action creators you want to pass in
 */
const mapDispatchToProps = dispatch => {
    const actionBundle = {
        ...counterActions,
        ...courseActions,
        ...dataFetchActions,
        ...uiActions};
    return bindActionCreators(actionBundle, dispatch);
};

/**
 * CourseStructure holds a table that allows students to plan their courses by
 * adding, moving and deleting units. It also holds action and status components
 * to give students feedback and ability to change the course structure.
 *
 * @extends React.Component
 * @param {number} startYear - The year the student commences their course.
 * @param {number} endYear - The expected graduation year.
 */
class CourseStructure extends Component {

    /**
     * Initialises state that holds a list of teachingPeriods.
     *
     * @param props - React props
     */
    constructor(props) {
        super(props);
    }

    /**
     * This is necessary for passing down changes in the totals from the parent plan element,
     * it keeps the totals updated.
     */
    componentWillReceiveProps(nextProps) {

        if (nextProps.courseToLoad && this.state.unlock && nextProps.courseYear) {
            if (nextProps.courseToLoad !== this.state.courseToLoad) {
                this.courseLoad(nextProps.courseToLoad, nextProps.courseYear);
            }
        }

        if(this.props.viewOnly && !this.props.switchToEditCourse && nextProps.switchToEditCourse) {
            const { saveCourseToLocalStorage, teachingPeriods, numberOfUnits, startYear, creditPoints, cost} = this.props;
            saveCourseToLocalStorage(teachingPeriods, numberOfUnits, startYear, creditPoints, cost);
            browserHistory.push("/plan");
        }
    }

    /**
     * Loads course if it exists.
     *
     * @author Saurabh Joshi
     */
    componentDidMount() {
        if(this.props.viewOnly) {
            if(this.props.snapID) {
                this.props.clearCourse();
                this.props.loadCourseSnap(this.props.snapID);
            }
            return;
        }

        if(LocalStorage.doesCourseStructureExist()) {
            this.props.clearCourse();
            this.props.loadCourseFromLocalStorage();
        }
    }

    /**
     * @author Saurabh Joshi
     */
    componentWillUnmount() {
        if(this.props.viewOnly) {
            return;
        }
    }

    /**
     * Set to auto save when the state of the component changes.
     *
     * @author Saurabh Joshi
     */
    componentDidUpdate() {
        if(!this.props.viewOnly) {
            const { saveCourseToLocalStorage, teachingPeriods, numberOfUnits, startYear, creditPoints, cost} = this.props;
            saveCourseToLocalStorage(teachingPeriods, numberOfUnits, startYear, creditPoints, cost);
        }
    }

    /**
     * Returns a table of teaching periods as table rows, and in teaching period
     * holds a list of units represented as table cells. It also renders an add button
     * as well as some status labels.
     *
     * @author Saurabh Joshi
     * @returns {ReactElement} CourseStructure
     */
    render() {
        const errors = this.props.courseErrors;
        const invalidUnitSlotCoordinates = this.props.invalidUnitSlotCoordinates;

        const tableRows = [];
        let year, displayButton = false;

        const { teachingPeriods, teachingPeriodData, showingInsertTeachingPeriodUI, teachingPeriodCodeToInsert } = this.props;
        if(showingInsertTeachingPeriodUI) {
            year = this.state.startYear || new Date().getFullYear();
        }

        for(let i = 0; i <= teachingPeriods.length; i++) {
            displayButton = true;

            if(i !== 0) {
                const teachingPeriod = teachingPeriods[i - 1];

                const tpErrors = errors.map(err =>
                    ({
                        ...err,
                        coordinates: err.coordinates.filter(x => x[0] === i - 1)
                    })
                ).filter(err => err.coordinates.length > 0);

                const tpInvalidUnitSlotCoordinates = invalidUnitSlotCoordinates.filter(xs => xs[0] === i - 1 || xs[0] === null);

                tableRows.push(
                    <TeachingPeriod
                        key={`${teachingPeriod.year}-${teachingPeriod.code}`}
                        index={i - 1}
                        year={teachingPeriod.year}
                        code={teachingPeriod.code}
                        units={teachingPeriod.units}
                        errors={tpErrors}
                        tempInvalidCoordinates={tpInvalidUnitSlotCoordinates} />
                    );

                year = teachingPeriod.year;

                if(!showingInsertTeachingPeriodUI) {
                    continue;
                }

                if(i !== teachingPeriods.length) {
                    const startIndex = teachingPeriodData.findIndex(ele => ele.code === teachingPeriods[i - 1].code);
                    const middleIndex = teachingPeriodData.findIndex(ele => ele.code === teachingPeriodCodeToInsert);
                    const endIndex = teachingPeriodData.findIndex(ele => ele.code === teachingPeriods[i].code);

                    if(startIndex !== -1 && endIndex !== -1) {
                        if(teachingPeriods[i - 1].year === teachingPeriods[i].year && startIndex < middleIndex && middleIndex < endIndex) {
                            year = teachingPeriods[i - 1].year;
                        }  else if(teachingPeriods[i - 1].year !== teachingPeriods[i].year) {
                            if(startIndex >= middleIndex && middleIndex >= endIndex) {
                                continue;
                            }
                            year = teachingPeriods[i - 1].year;

                            if(startIndex >= middleIndex) {
                                year ++;
                            }
                        } else {
                            continue;
                        }
                    }
                } else {
                    const startIndex = teachingPeriodData.findIndex(ele => ele.code === teachingPeriods[i - 1].code);
                    const middleIndex = teachingPeriodData.findIndex(ele => ele.code === teachingPeriodCodeToInsert);

                    year = teachingPeriods[i - 1].year;

                    if(startIndex >= middleIndex) {
                        year ++;
                    }
                }
            } else if(showingInsertTeachingPeriodUI && teachingPeriods.length > 0) {
                const middleIndex = teachingPeriodData.findIndex(ele => ele.code === teachingPeriodCodeToInsert);
                const endIndex = teachingPeriodData.findIndex(ele => ele.code === teachingPeriods[i].code);

                year = teachingPeriods[i].year;

                if(middleIndex >= endIndex) {
                    year --;
                }
            } else if(showingInsertTeachingPeriodUI && teachingPeriods.length === 0) {
                // don't do anything
            } else {
                continue;
            }

            if(showingInsertTeachingPeriodUI && displayButton) {
                tableRows.push(
                    <InsertTeachingPeriodContainer
                        index={i}
                        key={`${i}-insertTeachingPeriod`}
                        year={year}
                    />
                );
            }
        }

        if(this.props.teachingPeriods.length === 0) {
            tableRows.push(
                <NoTeachingPeriodContainer
                    key="no-teaching-period"
                    viewOnly={this.props.viewOnly}
                    noFloat
            />);
        }

        return (
            <Container>
                <ConfirmDeleteTeachingPeriodModal />
                {this.props.viewOnly &&
                    <CourseViewActions
                        switchToEditCourse={false}
                        handleEditCoursePlanClick={this.props.handleEditCoursePlanClick}
                        teachingPeriods={this.props.teachingPeriods}
                        numberOfUnits={this.props.numberOfUnits}
                        />
                }
                {!this.props.viewOnly &&
                    <MediaQuery maxDeviceWidth={767}>
                        <OverloadButtonContainer mobile />
                        <ConfirmDeleteOverload mobile />
                    </MediaQuery>
                }

                <Dimmer.Dimmable className="coursetable" as={Table} celled fixed striped compact>
                    {(this.props.courseLoading || this.props.courseSnapshotLoading) && <Dimmer inverted active><Loader inverted size="huge">Loading...</Loader></Dimmer>}
                    <MediaQuery minDeviceWidth={768}>
                        <Table.Header>
                            <Table.Row textAlign="center">
                                <Table.HeaderCell>
                                  <Segment>
                                    Teaching Period
                                  </Segment>
                              </Table.HeaderCell>
                                <Table.HeaderCell colSpan={this.props.numberOfUnits}>
                                    <Segment>
                                    Units
                                    {!this.props.viewOnly &&
                                        <span className="unitControl">
                                            <OverloadButtonContainer />
                                            <ConfirmDeleteOverload />
                                        </span>
                                    }
                                    </Segment>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                    </MediaQuery>
                    <Table.Body>
                        {tableRows}
                    </Table.Body>
                </Dimmer.Dimmable>
                {!this.props.viewOnly &&
                    <CourseEditActions />
                }
            </Container>
        );
    }
}

CourseStructure.propTypes = {
    viewOnly: PropTypes.bool,
    switchToEditCourse: PropTypes.bool,
    teachingPeriods: PropTypes.array,

    courseErrors: PropTypes.array,
    invalidUnitSlotCoordinates: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.number)
    ),

    numberOfUnits: PropTypes.number,
    startYear: PropTypes.number,
    creditPoints: PropTypes.number,
    cost: PropTypes.number,
    snapID: PropTypes.string,
    teachingPeriodData: PropTypes.array,
    showingInsertTeachingPeriodUI: PropTypes.bool,
    teachingPeriodCodeToInsert: PropTypes.string,
    courseLoading: PropTypes.bool,
    courseSnapshotLoading: PropTypes.bool,

    handleEditCoursePlanClick: PropTypes.func,
    clearCourse: PropTypes.func,
    loadCourseSnap: PropTypes.func,
    saveCourseToLocalStorage: PropTypes.func,
    loadCourseFromLocalStorage: PropTypes.func,

};

export default connect(mapStateToProps, mapDispatchToProps)(CourseStructure);
