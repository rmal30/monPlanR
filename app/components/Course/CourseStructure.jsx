import React, { Component, PropTypes } from "react";
import { Container, Dimmer, Loader, Table, Segment } from "semantic-ui-react";
import MediaQuery from "react-responsive";
import { browserHistory } from "react-router";

import LocalStorage from "../../utils/LocalStorage.js";

import CourseViewActions from "./CourseViewActions.jsx";
import CourseEditActions from "./CourseEditActions.jsx";
import CourseMessage from "./CourseMessage.jsx";

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
        courseSnapshotLoading: state.CourseStructure.courseSnapshotLoading
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

        this.state = {
            /* UI state */
            showMoveUnitUI: false,
            unitToBeMoved: undefined,
            courseToLoad: this.props.courseToLoad
        };


        this.getAffectedUnits = this.getAffectedUnits.bind(this);
        this.getCourseErrors = this.getCourseErrors.bind(this);
    }

    /**
     * This is necessary for passing down changes in the totals from the parent plan element,
     * it keeps the totals updated.
     */
    componentWillReceiveProps(nextProps) {

        if (nextProps.courseToLoad && this.state.unlock && nextProps.courseYear) {
            if (nextProps.courseToLoad !== this.state.courseToLoad) {
                this.setState({unlock: false, courseToLoad: nextProps.courseToLoad});
                this.courseLoad(nextProps.courseToLoad, nextProps.courseYear);
            }
        }

        /* If position is specified, no need to ask user again to select a
           table cell as the user has already dropped the unit into a cell */
        if(nextProps.unitToAdd && nextProps.unitToAdd.position) {
            this.addUnit(nextProps.unitToAdd.position[0], nextProps.unitToAdd.position[1], nextProps.unitToAdd);
        }

        if(this.props.viewOnly && !this.props.switchToEditCourse && nextProps.switchToEditCourse) {
            const { saveCourseToLocalStorage, teachingPeriods, numberOfUnits, startYear, creditPoints, cost} = this.props;
            saveCourseToLocalStorage(teachingPeriods, numberOfUnits, startYear, creditPoints, cost);
            browserHistory.push("/plan");
        }
    }

    /**
     * Reads in course structure and returns a list of errors.
     *
     * @author JXNS, Saurabh Joshi
     */
    getCourseErrors() {
        let errors = [];

        // Finds duplicates
        const units = this.getListOfUnits().sort((a, b) => {
            a = a.UnitCode;
            b = b.UnitCode;

            // Use unicode comparison
            if(a < b) {
                return -1;
            } else if(a === b) {
                return 0;
            } else {
                return 1;
            }
        });

        const duplicateUnits = [];

        for(let i = 1; i < units.length; i++) {
            if(units[i - 1].UnitCode === units[i].UnitCode && !units[i - 1].placeholder) {
                const index = duplicateUnits.findIndex(unit => unit.UnitCode === units[i].UnitCode);
                if(index === -1) {
                    duplicateUnits.push({
                        UnitCode: units[i].UnitCode,
                        coordinates: [[units[i - 1].teachingPeriodIndex, units[i - 1].unitIndex], [units[i].teachingPeriodIndex, units[i].unitIndex]]
                    });
                } else {
                    duplicateUnits[index].coordinates.push([units[i].teachingPeriodIndex, units[i].unitIndex]);
                }
            }
        }

        errors = errors.concat(duplicateUnits.map(duplicateUnit => {
            return {
                message: `${duplicateUnit.UnitCode} already exists in your course plan.`,
                coordinates: duplicateUnit.coordinates
            };
        }));

        // Check if unit in the teaching period is being offered
        let codeMap = {
            "FY-01": "Full year",
            "S1-01": "First semester",
            "S2-01": "Second semester",
            "SSA-02": "Summer semester A",
            "SSB-01": "Summer semester B",
            "WS-01": "Winter semester"
        };

        for(let i = 0; i < units.length; i++) {
            let offerings = units[i].LocationAndTime;

            if(!offerings) {
                continue;
            }

            const teachingPeriodStr = codeMap[this.props.teachingPeriods[units[i].teachingPeriodIndex].code];

            if (teachingPeriodStr !== undefined) {
                // semester we're checking against is covered by mapping'
                let re = new RegExp(teachingPeriodStr);

                let isValid = false;

                for(let k = 0; k < offerings.length; k++) {
                    let locations = offerings[k][1];
                    if(!locations) {
                        continue;
                    }

                    for(let l = 0; l < locations.length; l++) {
                        let offering = locations[l];
                        let isMatch = re.test(offering);

                        if(isMatch) {
                            isValid = true;
                            break;
                        }
                    }
                    if(isValid) {
                        break;
                    }
                }

                if (!isValid) {
                    errors.push({
                        message: `${units[i].UnitCode} is not offered in ${teachingPeriodStr ? teachingPeriodStr.toLowerCase() : "this teaching period"}`,
                        coordinates: [[units[i].teachingPeriodIndex, units[i].unitIndex]]
                    });
                }
            }
        }

        return errors;
    }

    /**
     * [teachingPeriodIndex, unitIndex]
     * If null is specified, then it highlights everything
     * e.g. [0, null] highlights all units in first teaching period
     * e.g. [null, 4] highlights all units in fourth Column
     * e.g. [null, null] highlights all units in course plan.
     */
    invalidCoordinatesForTempUnit() {
        let tempUnit;
        let duplicateGraceFlag = false;
        if(this.state.showMoveUnitUI) {
            tempUnit = this.state.unitToBeMoved;
            duplicateGraceFlag = true;
        } else if(this.props.unitToAdd) {
            tempUnit = this.props.unitToAdd;
        } else {
            return [];
        }

        const { teachingPeriods } = this.props;

        let duplicateFound = false;

        for(let i = 0; i < teachingPeriods.length; i++) {
            for(let j = 0; j < teachingPeriods[i].units.length; j++) {
                if(!duplicateFound) {
                    if(teachingPeriods[i].units[j] && teachingPeriods[i].units[j].UnitCode === tempUnit.UnitCode && !teachingPeriods[i].units[j].placeholder) {
                        if(duplicateGraceFlag) {
                            duplicateGraceFlag = false;
                        } else {
                            // Found duplicate, invalidate all coordinates
                            duplicateFound = true;
                        }
                    }
                }
            }
        }

        if(duplicateFound) {
            return [[null, null]];
        }

        // Check if unit in the teaching period is being offered
        let codeMap = {
            "FY-01": "Full year",
            "S1-01": "First semester",
            "S2-01": "Second semester",
            "SSA-02": "Summer semester A",
            "SSB-01": "Summer semester B",
            "WS-01": "Winter semester"
        };


        let offerings = tempUnit.LocationAndTime;

        if(!offerings) {
            return [];
        }

        const coordinates = [];

        for(let i = 0; i < this.props.teachingPeriods.length; i++) {

            const teachingPeriodStr = codeMap[this.props.teachingPeriods[i].code];

            if (teachingPeriodStr !== undefined) {
                // semester we're checking against is covered by mapping'
                let re = new RegExp(teachingPeriodStr);

                let isValid = false;

                for(let k = 0; k < offerings.length; k++) {
                    let locations = offerings[k][1];
                    if(!locations) {
                        continue;
                    }

                    for(let l = 0; l < locations.length; l++) {
                        let offering = locations[l];
                        let isMatch = re.test(offering);

                        if(isMatch) {
                            isValid = true;
                            break;
                        }
                    }
                    if(isValid) {
                        break;
                    }
                }

                if (!isValid) {
                    coordinates.push([i, null]);
                }
            }
        }

        return coordinates;
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

        const currentCourseErrors = this.getCourseErrors();

        // Redux may solve this anti-pattern of diff checks and updating parent component's state
        if(currentCourseErrors.length !== this.props.courseErrors.length || this.props.courseErrors.reduce((a, err, i) => a || err.message !== currentCourseErrors[i].message || err.coordinates.length !== currentCourseErrors[i].coordinates.length, false)) {
            this.props.updateStatus(currentCourseErrors);
        }
    }

    /**
     * Returns a list of units from the course structure
     *
     * @author Saurabh Joshi
     * @returns {array}
     */
    getListOfUnits() {
        const { teachingPeriods } = this.props;

        return teachingPeriods.map((ele, teachingPeriodIndex) =>
            ele.units.map((unit, unitIndex) => {
                if(unit) {
                    return {
                        ...unit,
                        teachingPeriodIndex,
                        unitIndex
                    };
                }
            }).filter(unit => unit)).reduce((units, list) => units.concat(list), []);
    }



    /**
     * Inserts unit into course structure.
     *
     * @author Saurabh Joshi
     * @param {number} teachingPeriodIndex
     * @param {number} unitIndex
     * @param {string} code
     * @param {string} name
     */
    addUnit(teachingPeriodIndex, unitIndex, unitToAdd) {
        // If a customm unit has been dragged and dropped onto a table cell, prompt user to enter details
        if(unitToAdd.custom && unitToAdd.dragged) {
            this.props.addToCourse(unitToAdd.UnitCode, true, false, [teachingPeriodIndex, unitIndex]);
            return;
        }

        const { teachingPeriods } = this.props;
        teachingPeriods[teachingPeriodIndex].units[unitIndex] = unitToAdd;
        this.setState({ teachingPeriods });
        this.props.doneAddingToCourse(unitToAdd);
        this.props.incrementCreditPoints(unitToAdd.CreditPoints);
        this.props.incrementCost(unitToAdd.Cost);
    }

    /**
     * Allows user to move unit into another table cell.
     *
     * @author Saurabh Joshi
     * @param {number} teachingPeriodIndex
     * @param {number} unitIndex
     */
    willMoveUnit(teachingPeriodIndex, unitIndex) {
        if (this.props.unitToAdd !== undefined) {
            this.props.cancelAddingToCourse();
        }

        this.setState({
            showMoveUnitUI: true,
            originalPosition: [teachingPeriodIndex, unitIndex],
            unitToBeMoved: this.props.teachingPeriods[teachingPeriodIndex].units[unitIndex]
        });
    }

    /**
     * Cancels the move unit operation.
     *
     * @author Saurabh Joshi
     */
    cancelMoving() {
        this.setState({
            showMoveUnitUI: false
        });
    }

    /**
     * Moves unit to specified position.
     *
     * @author Saurabh Joshi
     * @param {number} teachingPeriodIndex
     * @param {number} unitIndex
     */
    moveUnit(teachingPeriodIndex, unitIndex) {
        const { teachingPeriods } = this.props;

        if(this.state.originalPosition) {
            teachingPeriods[this.state.originalPosition[0]].units[this.state.originalPosition[1]] = null;
        }

        teachingPeriods[teachingPeriodIndex].units[unitIndex] = this.state.unitToBeMoved;

        this.setState({
            showMoveUnitUI: false,
            originalPosition: null,
            teachingPeriods: teachingPeriods
        });
    }

    /**
     * Swaps units over according to their positions. This method is used
     * when the student wants to move their unit to another position where the
     * table cell is occupied by another unit.
     *
     * @author Saurabh Joshi
     * @param {number} teachingPeriodIndex
     * @param {number} unitIndex
     */
    swapUnit(teachingPeriodIndex, unitIndex) {
        const { teachingPeriods } = this.state;
        const temp = teachingPeriods[teachingPeriodIndex].units[unitIndex];

        teachingPeriods[teachingPeriodIndex].units[unitIndex] = teachingPeriods[this.state.originalPosition[0]].units[this.state.originalPosition[1]];
        teachingPeriods[this.state.originalPosition[0]].units[this.state.originalPosition[1]] = !temp.placeholder ? temp : null;

        this.setState({
            showMoveUnitUI: false,
            originalPosition: undefined,
            teachingPeriods: teachingPeriods
        });
    }


    /**
     * Deletes a unit at a specified teaching period index and specified unit
     * index. This is done by setting the array element to undefined.
     *
     * @author Saurabh Joshi
     * @param {number} teachingPeriodIndex - Which teaching period are you referring to.
     * @param {number} unitIndex - Which unit in teaching period to remove.
     */
    deleteUnit(teachingPeriodIndex, unitIndex) {
        const { teachingPeriods } = this.state;
        const unitToRemove = teachingPeriods[teachingPeriodIndex].units[unitIndex];

        this.props.decrementCost(unitToRemove.Cost);
        this.props.decrementCreditPoints(unitToRemove.CreditPoints);

        const updatedTeachingPeriod = {
            ...teachingPeriods[teachingPeriodIndex],
            units: [
                ...teachingPeriods[teachingPeriodIndex].units.slice(0, unitIndex),
                null,
                ...teachingPeriods[teachingPeriodIndex].units.slice(unitIndex + 1)
            ]
        };

        this.setState({
            teachingPeriods: [
                ...teachingPeriods.slice(0, teachingPeriodIndex),
                updatedTeachingPeriod,
                ...teachingPeriods.slice(teachingPeriodIndex + 1)
            ]
        });
    }


    /**
     * Returns an array of all units affected by an overload column removal
     */
    getAffectedUnits() {
        const teachingPeriods = this.props.teachingPeriods.slice();
        let unitIndex = this.props.numberOfUnits - 1;
        let unitArray = [];
        for(let i = 0; i < teachingPeriods.length; i++) {
            let item = teachingPeriods[i].units[unitIndex];
            if (item !== null && item !== undefined) {
                unitArray.push(item.UnitCode + " - " + item.UnitName);
            }
        }

        return unitArray;
    }

    /**
     * Returns a rendered teaching period component as a table row to be used in
     * a table.
     *
     * @author Saurabh Joshi
     * @param {number} teachingPeriod - The teaching period object.
     * @param {number} index - For bookkeeping which teaching period is which.
     * @param {array} errors - Errors related to the teaching period.
     */
    renderTeachingPeriod(teachingPeriod, index, errors, tempInvalidCoordinates) {
        return <TeachingPeriod
                    key={`${teachingPeriod.year}-${teachingPeriod.code}`}
                    index={index}
                    year={teachingPeriod.year}
                    code={teachingPeriod.code}
                    units={teachingPeriod.units}
                    
                    addUnit={this.addUnit.bind(this)}
                    moveUnit={this.moveUnit.bind(this)}
                    swapUnit={this.swapUnit.bind(this)}
                    willMoveUnit={this.willMoveUnit.bind(this)}
                    deleteUnit={this.deleteUnit.bind(this)}
                    unitToAdd={this.props.unitToAdd}
                    showMoveUnitUI={this.state.showMoveUnitUI}
                    unitToBeMoved={this.state.unitToBeMoved}
                    cancelMoving={this.cancelMoving.bind(this)}
                    errors={errors}
                    tempInvalidCoordinates={tempInvalidCoordinates} />;
    }

    /**
     * Returns a table of teaching periods as table rows, and in teaching period
     * holds a list of units represented as table cells. It also renders an add button
     * as well as some status labels.
     *
     * TODO: Modularise into smaller components for course structure.
     *
     * @author Saurabh Joshi
     * @returns {ReactElement} CourseStructure
     */
    render() {
        // do not use this.props.courseErrors as it may hold an outdated version, as the diff checks only looks at the messages
        const errors = this.getCourseErrors();
        const tempInvalidCoordinates = this.invalidCoordinatesForTempUnit();

        const tableRows = [];
        let year, show = false;

        const { teachingPeriods, teachingPeriodData, showingInsertTeachingPeriodUI, teachingPeriodCodeToInsert } = this.props;
        if(showingInsertTeachingPeriodUI) {
            year = this.state.startYear || new Date().getFullYear();
        }

        for(let i = 0; i <= teachingPeriods.length; i++) {
            show = true;
            if(i !== 0) {
                tableRows.push(this.renderTeachingPeriod(teachingPeriods[i - 1], i - 1, errors.map(err =>
                    ({
                        ...err,
                        coordinates: err.coordinates.filter(x => x[0] === i - 1)
                    })
                ).filter(err => err.coordinates.length > 0), tempInvalidCoordinates.filter(xs => xs[0] === i - 1 || xs[0] === null)));
                year = teachingPeriods[i - 1].year;

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

            if(showingInsertTeachingPeriodUI && show) {
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
                {!this.props.viewOnly &&
                    <CourseMessage
                        isError={this.state.isError}
                        errorHeader={this.state.errorHeader}
                        errorMsg={this.state.errorMsg}

                        unitToAdd={this.props.unitToAdd}
                        showMoveUnitUI={this.state.showMoveUnitUI}
                        unitToBeMoved={this.state.unitToBeMoved}

                        cancelAddingToCourse={this.props.cancelAddingToCourse}
                        />
                }
                {this.props.viewOnly &&
                    <CourseViewActions
                        switchToEditCourse={this.state.switchToEditCourse}
                        handleEditCoursePlanClick={this.props.handleEditCoursePlanClick}
                        teachingPeriods={this.props.teachingPeriods}
                        numberOfUnits={this.props.numberOfUnits}
                        />
                }
                {!this.props.viewOnly &&
                    <MediaQuery maxDeviceWidth={767}>
                        <OverloadButtonContainer mobile/>
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
    startYear: PropTypes.number,
    endYear: PropTypes.number,
    unitToAdd: PropTypes.shape({
        UnitName: PropTypes.string,
        UnitCode: PropTypes.string,
        Faculty: PropTypes.string
    }),
    addToCourse: PropTypes.func,
    doneAddingToCourse: PropTypes.func,
    cancelAddingToCourse: PropTypes.func,
    courseToLoad: PropTypes.string,
    handleEditCoursePlanClick: PropTypes.func,

    /* Redux functions */
    creditPoints: PropTypes.number,
    cost: PropTypes.number,
    incrementCost: PropTypes.func,
    incrementCreditPoints: PropTypes.func,
    clearCourse: PropTypes.func,
    decrementCost: PropTypes.func,
    decrementCreditPoints: PropTypes.func,
    teachingPeriods: PropTypes.array,
    numberOfUnits: PropTypes.number,
    fetchTeachingPeriods: PropTypes.func,
    teachingPeriodData: PropTypes.array,
    insertTeachingPeriod: PropTypes.func,
    addTeachingPeriod: PropTypes.func,
    showInsertTeachingPeriodUI: PropTypes.func,
    hideInsertTeachingPeriodUI: PropTypes.func,
    getNextSemesterString: PropTypes.func,
    nextSemesterString: PropTypes.string,
    courseLoading: PropTypes.bool,
    loadCourseFromLocalStorage: PropTypes.func,
    saveCourseToLocalStorage: PropTypes.func,
    showingInsertTeachingPeriodUI: PropTypes.bool,
    teachingPeriodCodeToInsert: PropTypes.string,
    loadCourseSnap: PropTypes.func,
    courseSnapshotLoading: PropTypes.bool,

    /* Validation */
    updateStatus: PropTypes.func.isRequired,
    /* Used for diff checks */
    courseErrors: PropTypes.array.isRequired,
    
    snapID: PropTypes.string,
    viewOnly: PropTypes.bool,
    switchToEditCourse: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseStructure);
