import React, { Component, PropTypes } from "react";
import { Button, Container, Icon, Message, Popup, Table, Loader } from "semantic-ui-react";
import axios from "axios";
import MediaQuery from "react-responsive";

import UnitQuery from "../utils/UnitQuery";
import CourseTemplate from "../utils/CourseTemplate";

import Home from "./base/Home.jsx";
import TeachingPeriod from "./TeachingPeriod/TeachingPeriod.jsx";
import NoTeachingPeriod from "./TeachingPeriod/NoTeachingPeriod.jsx";
import InsertTeachingPeriod from "./TeachingPeriod/InsertTeachingPeriod.jsx";
import InsertTeachingPeriodButton from "./TeachingPeriod/InsertTeachingPeriodButton.jsx";
import CompletedCourseModal from "./modals/CompletedCourseModal.jsx";
import ClearCourseModal from "./modals/ClearCourseModal.jsx";
import ConfirmDeleteOverload from "./modals/ConfirmDeleteOverload.jsx";

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

        const { startYear, endYear } = this.props;

        this.minNumberOfUnits = 4;
        this.maxNumberOfUnits = 6;

        this.state = {
            numberOfUnits: 4,
            showInsertTeachingPeriods: false,
            teachingPeriods: this.generateCourse(startYear, endYear),
            teachingPeriodsData: null,
            showMoveUnitUI: false,
            unitToBeMoved: undefined,
            totalCreditPoints: this.props.totalCreditPoints,
            totalEstimatedCost: this.props.totalCost,
            isLoading: false,
            unlock: true,
            courseToLoad: this.props.courseToLoad,
            startYear: startYear || new Date().getFullYear(),
            isError: false,
            errorMsg: "",
            errorHeader: ""
        };

        let qURL = `${MONPLAN_REMOTE_URL}/basic/teachingperiods`;

        // Fetch common teaching periods to get names for each teaching period code.
        axios.get(qURL)
             .then(response => {
                 /**
                  * Compares start teaching period date between two teaching periods.
                  *
                  * @param {object} a - The first teaching period.
                  * @param {object} b - The second teaching period.
                  * Grabbing the common teaching periods and sorting
                  */
                 function compareDate(a, b) {
                     return Math.sign(new Date(...a.split("/").reverse()) - new Date(...b.split("/").reverse()));
                 }

                 response.data.sort(
                     (a, b) => compareDate(a.startDate, b.startDate) !== 0 ? compareDate(a.startDate, b.startDate) : compareDate(b.endDate, a.endDate)
                 );

                 this.setState({
                     teachingPeriodsData: response.data
                 });
             });

        this.generateCourse = this.generateCourse.bind(this);
        this.getAffectedUnits = this.getAffectedUnits.bind(this);
        this.loadCourseFromAPI = this.loadCourseFromAPI.bind(this);
        this.courseLoad = this.courseLoad.bind(this);
        this.nextSemester = this.nextSemester.bind(this);
        this.changeStartYear = this.changeStartYear.bind(this);
        this.getQuickSemesterString = this.getQuickSemesterString.bind(this);
        this.appendSemester = this.appendSemester.bind(this);
        this.showInsertTeachingPeriodsUI = this.showInsertTeachingPeriodsUI.bind(this);
        this.validate = this.validate.bind(this);
        this.processError = this.processError.bind(this);

        this.getCourseErrors = this.getCourseErrors.bind(this);
    }

    /**
     * This is necessary for passing down changes in the totals from the parent plan element,
     * it keeps the totals updated.
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.courseToLoad !== "" && this.state.unlock && nextProps.courseYear) {
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

        //let error = this.validate(this.props.unitToAdd);
        //this.processError(error);

        this.setState({
            totalCreditPoints: nextProps.totalCreditPoints,
            totalEstimatedCost: nextProps.totalCost
        });

    }

    processError(error) {
        let teachingPeriods = this.state.teachingPeriods;

        if (error.errorArray[0] === "All") {
            teachingPeriods = teachingPeriods.map(tp => {
                tp.isError = true;
                return tp;
            });

        } else if (error.errorArray.length > 0) {
            teachingPeriods = teachingPeriods.map((tp, index) => {
                let arr = error.errorArray;
                for (let i=0; i < arr.length; i++) {
                    if (index === arr[i]) {
                        tp.isError = true;
                        return tp;
                    }
                }
                tp.isError = false;
                return tp;
            });
        } else {
            teachingPeriods = teachingPeriods.map(tp => {
                tp.isError = false;
                return tp;
            });
        }

        this.setState({
            errorMsg: error.errorMsg,
            isError: error.isError,
            errorHeader: error.errorHeader,
            teachingPeriods
        });
    }

    validate(newUnit) {
        let error = {
            errorMsg: "",
            errorHeader: "",
            isError: false,
            errorArray: [] // This array holds the indices of all teaching periods with errors in them
        };

        let codeMap = {
            "FY-01": "Full year",
            "S1-01": "First semester",
            "S2-01": "Second semester",
            "SSA-02": "Summer semester A",
            "SSB-01": "Summer semester B",
            "WS-01": "Winter semester"
        };


        if (newUnit !== undefined) {
            for(let i=0; i < this.state.teachingPeriods.length; i++) {
                let TP = this.state.teachingPeriods[i];
                let TPcode = TP.code;

                for(let j=0; j < TP.units.length; j++) {

                    let unit = TP.units[j];

                    if (unit !== null) {
                        if (unit.UnitCode === newUnit.UnitCode) {
                            error.errorMsg = `Unit ${unit.UnitCode} already exists in your course plan.`;
                            error.errorHeader = "Error adding unit: " + unit.UnitCode;
                            error.isError = true;
                            error.errorArray = ["All"];
                            return error;
                        }
                    }
                }

                let offerings = newUnit.UnitLocationTP;
                if (codeMap[TPcode] !== undefined) {
                    // semester we're checking against is covered by mapping'
                    let re = new RegExp(codeMap[TPcode]);
                    let isValid = false;
                    for(let k=0; k < offerings.length; k++){
                        let locations = offerings[k][1];
                        for(let l=0; l < locations.length; l++) {
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
                        error.errorArray.push(i);
                    }
                }
            }
        }
        return error;
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
            if(units[i - 1].UnitCode === units[i].UnitCode && duplicateUnits.findIndex(unit => unit.UnitCode === units[i].UnitCode) === -1) {
                duplicateUnits.push(units[i]);
            }
        }

        errors = errors.concat(duplicateUnits.map(duplicateUnit => {
            return {
                message: `${duplicateUnit.UnitCode} already exists in your course plan.`,
                unitIndex: duplicateUnit.unitIndex,
                teachingPeriodIndex: duplicateUnit.teachingPeriodIndex
            };
        }));

        return errors;
    }

    /**
     * Generates a course structure of semester one and semester two teaching
     * periods, given start year and end year.
     *
     * @author Eric Jiang, Saurabh Joshi
     * @param {number} startYear - When the student commerces their course.
     * @param {number} endYear - When the student is expected to graduate.
     */
    generateCourse(startYear, endYear) {
        if(endYear - startYear > 12 || startYear === null || endYear === null) {
            // Assumes a four year course beginning this year.
            startYear = new Date().getFullYear();
            endYear = startYear + 3;
        }

        if(startYear <= endYear) { // Prevents from going into an endless for loop
            const arr = [];
            for(let year = startYear; year <= endYear; year++) {
                const semesterOneTeachingPeriod = {
                    year,
                    code: "S1-01",
                    units: new Array(4).fill(null),
                    isError: false
                };

                const semesterTwoTeachingPeriod = {
                    year,
                    code: "S2-01",
                    units: new Array(4).fill(null),
                    isError: false
                };

                arr.push(semesterOneTeachingPeriod);
                arr.push(semesterTwoTeachingPeriod);
            }

            return arr;
        }

        return [];
    }

    /**
     * Once the data is grabbed from API this will process it
     * TODO: rename to more descriptive name like "processCourseLoadedFromAPI"
     */
    loadCourseFromAPI(data, year) {
        let result = CourseTemplate.parse(data, year);

        this.setState({
            isLoading: false,
            teachingPeriods: result.newTeachingPeriods,
            numberOfUnits: result.overLoadNumber,
            unlock: true
        });

        this.props.handleChildUpdateTotals(result.newCP, result.newCost);

    }

    /**
     * on call will load the course from API with the given course code,
     * note that if there is an error, we turn off the loader and unlock the lock so
     * the user can make another request
     */
    courseLoad(courseCode, year) {
        this.setState({isLoading: true});
        this.clearCourse();
        UnitQuery.getCourseData(courseCode)
            .then(response => {
                let data = response.data;
                this.loadCourseFromAPI(data, year);
            })
            .catch(err => {
                console.log(err);

                this.setState({
                    isLoading: false,
                    unlock: true
                });
            });
    }

    /**
     * Saves list of teaching periods to local storage.
     *
     * @author Saurabh Joshi
     */
    saveCourse() {
        const { teachingPeriods, numberOfUnits, totalCreditPoints, totalEstimatedCost, startYear } = this.state;
        localStorage.setItem("courseStructure", JSON.stringify({
            teachingPeriods,
            numberOfUnits,
            totalCreditPoints,
            totalEstimatedCost,
            startYear,
            version: MONPLAN_VERSION
        }));
    }

    /**
     * Loads list of teaching periods from local storage.
     *
     * @author Saurabh Joshi
     */
    loadCourse() {
        const stringifedJSON = localStorage.getItem("courseStructure");

        if(stringifedJSON) {
            const { teachingPeriods, numberOfUnits, totalCreditPoints, totalEstimatedCost, startYear } = JSON.parse(stringifedJSON);
            this.setState({
                teachingPeriods,
                numberOfUnits,
                totalCreditPoints,
                totalEstimatedCost,
                startYear: startYear || new Date().getFullYear()
            });

            this.props.handleChildUpdateTotals(totalCreditPoints, totalEstimatedCost);
        }
    }

    /**
     * Clears course on call.
     *
     * @author Saurabh Joshi
     */
    clearCourse() {
        this.setState({
            teachingPeriods: [],
            numberOfUnits: 4,
            totalCreditPoints: 0,
            totalEstimatedCost: 0
        });
        this.props.handleChildUpdateTotals(0, 0);
    }

    /**
     * Loads course if it exists.
     *
     * @author Saurabh Joshi
     */
    componentWillMount() {
        if(Home.checkIfCourseStructureIsInLocalStorage()) {
            this.loadCourse();
        }

        this.props.attachGetCourseErrors(this.getCourseErrors);
    }

    componentWillUnmount() {
        this.props.detachGetCourseErrors();
    }

    /**
     * Set to auto save when the state of the component changes.
     *
     * @author Saurabh Joshi
     */
    componentDidUpdate() {
        this.saveCourse();
    }

    /**
     * Returns a list of units from the course structure
     *
     * @author Saurabh Joshi
     * @returns {array}
     */
    getListOfUnits() {
        const { teachingPeriods } = this.state;

        return teachingPeriods.map((ele, teachingPeriodIndex) =>
            ele.units.map((unit, unitIndex) => {
                if(unit) {
                    unit.teachingPeriodIndex = teachingPeriodIndex;
                    unit.unitIndex = unitIndex;

                    return unit;
                }
            }).filter(unit => unit)).reduce((units, list) => units.concat(list), []);
    }

    /**
     * Displays add teaching period buttons in between the teaching period
     * table rows.
     *
     * @author Saurabh Joshi
     * @param {string} teachingPeriodToInsertCode - what teaching period are we
     * inserting
     */
    showInsertTeachingPeriodsUI(teachingPeriodToInsertCode) {
        this.setState({
            showInsertTeachingPeriods: true,
            teachingPeriodToInsertCode
        });
    }

    /**
     * Hides the add teaching period buttons in between the teaching period
     * table rows.
     *
     * @author Saurabh Joshi
     */
    hideInsertTeachingPeriodsUI() {
        this.setState({
            showInsertTeachingPeriods: false
        });
    }

    /**
     * Inserts teaching period at a specified index.
     *
     * @author Saurabh Joshi
     * @param {number} index - Which index in array to insert the teaching period
     * @param {number} year - Year of teaching period that was taken place
     * @param {string} code - Teaching period code.
     */
    insertTeachingPeriod(index, year, code) {
        const teachingPeriods = [
            ...this.state.teachingPeriods.slice(0, index),
            {
                code,
                year,
                units: new Array(this.state.numberOfUnits).fill(null),
                isError: false
            },
            ...this.state.teachingPeriods.slice(index)
        ];

        this.setState({
            showInsertTeachingPeriods: false,
            teachingPeriods
        });
    }

    /**
     * Gets the next semester in the list of teaching periods.
     *
     * @author Saurabh Joshi
     */
    nextSemester() {
        const index = this.state.teachingPeriods.length;
        let year = this.state.startYear;
        let s1Code = "S1-01";
        let s2Code = "S2-01";

        let code = s1Code;

        const { teachingPeriods, teachingPeriodsData } = this.state;

        if(!teachingPeriodsData) {
            return { index, year, code, isError: false };
        }

        if(index > 0) {
            const startIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[index - 1].code);
            const s1middleIndex = teachingPeriodsData.findIndex(ele => ele.code === s1Code);
            const s2middleIndex = teachingPeriodsData.findIndex(ele => ele.code === s2Code);

            year = teachingPeriods[index - 1].year;

            if(startIndex < s1middleIndex) {
                // do nothing
            } else if(startIndex < s2middleIndex) {
                code = s2Code;
            } else if(startIndex >= s1middleIndex) {
                year ++;
            }
        }

        return { index, year, code, teachingPeriodsData };
    }

    /**
     * A quick option for students to insert semesters at the end of their
     * course structures.
     *
     * @author Saurabh Joshi
     */
    appendSemester() {
        const { index, year, code } = this.nextSemester();

        this.insertTeachingPeriod(index, year, code);
    }

    /**
     * Gets the quick semester append string to be displayed on the button.
     *
     * @author Saurabh Joshi
     */
    getQuickSemesterString() {
        const { teachingPeriodsData, year, code } = this.nextSemester();

        let teachingPeriodName = code;

        if(teachingPeriodsData) {
            const teachingPeriod = teachingPeriodsData.find((element) =>
                element.code === code
            );

            if(teachingPeriod !== undefined) {
                teachingPeriodName = teachingPeriod.name || code;
            }
        }

        return `${teachingPeriodName}, ${year}`;
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

        const { teachingPeriods } = this.state;
        teachingPeriods[teachingPeriodIndex].units[unitIndex] = unitToAdd;
        this.setState({ teachingPeriods });
        this.props.doneAddingToCourse(unitToAdd);
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
        let focusedUnit = this.state.teachingPeriods[teachingPeriodIndex].units[unitIndex];

        this.props.onUnitClick(focusedUnit.UnitCode, focusedUnit.custom);

        this.setState({
            isError: false,
            showMoveUnitUI: true,
            originalPosition: [teachingPeriodIndex, unitIndex],
            unitToBeMoved: this.state.teachingPeriods[teachingPeriodIndex].units[unitIndex]
        });
    }

    /**
     * Cancels the move unit operation.
     *
     * @author Saurabh Joshi
     */
    cancelMoving() {
        this.setState({
            showMoveUnitUI: false,
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
        const { teachingPeriods } = this.state;
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
        teachingPeriods[this.state.originalPosition[0]].units[this.state.originalPosition[1]] = temp;
        this.setState({
            showMoveUnitUI: false,
            originalPosition: undefined,
            teachingPeriods: teachingPeriods
        });
    }

    /**
     * Deletes a teaching period at a specified index.
     *
     * @author Saurabh Joshi
     * @param {number} index - Which teaching period in list to delete.
     */
    deleteTeachingPeriod(index) {
        const teachingPeriods = [
            ...this.state.teachingPeriods.slice(0, index),
            ...this.state.teachingPeriods.slice(index + 1)
        ];

        let { totalCreditPoints, totalEstimatedCost } = this.state;

        for (let i=0; i < this.state.teachingPeriods[index].units.length; i++) {
            let unit = this.state.teachingPeriods[index].units[i];
            if (unit !== null && unit !== undefined) {
                totalCreditPoints -= unit.CreditPoints;
                totalEstimatedCost -= unit.Cost;
            }
        }

        this.props.handleChildUpdateTotals(totalCreditPoints, totalEstimatedCost);
        this.setState({ teachingPeriods });
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
        this.props.removeFromCourse(teachingPeriods[teachingPeriodIndex].units[unitIndex]);
        teachingPeriods[teachingPeriodIndex].units[unitIndex] = undefined;
        this.setState({ teachingPeriods });
    }

    /**
     * Adds a column to the course structure.
     */
    incrementNumberOfUnits() {
        const teachingPeriods = this.state.teachingPeriods.slice();

        if(this.state.numberOfUnits < this.maxNumberOfUnits) {
            for(let i = 0; i < teachingPeriods.length; i++) {
                teachingPeriods[i].units.push(null);
            }

            this.setState({
                numberOfUnits: this.state.numberOfUnits + 1,
                teachingPeriods
            });
        }
    }

    /**
     * Returns an array of all units affected by an overload column removal
     */
    getAffectedUnits() {
        const teachingPeriods = this.state.teachingPeriods.slice();
        let unitIndex = this.state.numberOfUnits - 1;
        let unitArray = [];
        for(let i=0; i < teachingPeriods.length; i++) {
            let item = teachingPeriods[i].units[unitIndex];
            if (item !== null && item !== undefined) {
                unitArray.push(item.UnitCode + " - " + item.UnitName);
            }
        }

        return unitArray;
    }

    /**
     * Removes a column from the course structure.
     */
    decrementNumberOfUnits() {
        if(this.state.numberOfUnits > this.minNumberOfUnits) {
            const teachingPeriods = this.state.teachingPeriods.slice();

            let { totalCreditPoints, totalEstimatedCost } = this.state;
            let unitIndex = this.state.numberOfUnits - 1;

            for (let i=0; i < this.state.teachingPeriods.length; i++) {
                let unit = this.state.teachingPeriods[i].units[unitIndex];
                if (unit !== null && unit !== undefined) {
                    totalCreditPoints -= unit.CreditPoints;
                    totalEstimatedCost -= unit.Cost;
                }
            }
            this.props.handleChildUpdateTotals(totalCreditPoints, totalEstimatedCost);

            for(let i = 0; i < teachingPeriods.length; i++) {
                teachingPeriods[i].units.pop();
            }

            this.setState({
                numberOfUnits: this.state.numberOfUnits - 1
            });
        }
    }

    /**
     * Changes start year for no teaching period component.
     *
     * @author Saurabh Joshi
     * @param {number} startYear - When student commences their course
     */
    changeStartYear(startYear) {
        this.setState({ startYear });
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
    renderTeachingPeriod(teachingPeriod, index, errors) {
        return <TeachingPeriod
                    key={`${teachingPeriod.year}-${teachingPeriod.code}`}
                    index={index}
                    year={teachingPeriod.year}
                    code={teachingPeriod.code}
                    data={this.state.teachingPeriodsData}
                    numberOfUnits={this.state.numberOfUnits}
                    deleteTeachingPeriod={this.deleteTeachingPeriod.bind(this)}
                    addUnit={this.addUnit.bind(this)}
                    moveUnit={this.moveUnit.bind(this)}
                    swapUnit={this.swapUnit.bind(this)}
                    willMoveUnit={this.willMoveUnit.bind(this)}
                    deleteUnit={this.deleteUnit.bind(this)}
                    unitToAdd={this.props.unitToAdd}
                    showMoveUnitUI={this.state.showMoveUnitUI}
                    unitToBeMoved={this.state.unitToBeMoved}
                    units={teachingPeriod.units}
                    handleUnitDetailClick={this.props.onUnitClick}
                    viewUnitDetails={this.props.viewUnitDetails}
                    cancelMoving={this.cancelMoving.bind(this)}
                    errors={errors} />;
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
        const errors = this.getCourseErrors();

        const tableRows = [];
        let year, code, show = false;
        let areThereNoTeachingPeriods = false;
        const { teachingPeriodToInsertCode, teachingPeriods, teachingPeriodsData, showInsertTeachingPeriods } = this.state;
        if(showInsertTeachingPeriods) {
            year = this.state.startYear || new Date().getFullYear();
            code = teachingPeriodToInsertCode;
        }

        for(let i = 0; i <= teachingPeriods.length; i++) {
            show = true;
            if(i !== 0) {
                tableRows.push(this.renderTeachingPeriod(teachingPeriods[i - 1], i - 1, errors.filter(err => err.teachingPeriodIndex === i - 1)));
                year = teachingPeriods[i - 1].year;

                if(!showInsertTeachingPeriods) {
                    continue;
                }

                if(i !== teachingPeriods.length) {
                    const startIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[i - 1].code);
                    const middleIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriodToInsertCode);
                    const endIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[i].code);

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
                    const startIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[i - 1].code);
                    const middleIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriodToInsertCode);

                    year = teachingPeriods[i - 1].year;

                    if(startIndex >= middleIndex) {
                        year ++;
                    }
                }
            } else if(showInsertTeachingPeriods && teachingPeriods.length > 0) {
                const middleIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriodToInsertCode);
                const endIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[i].code);

                year = teachingPeriods[i].year;

                if(middleIndex >= endIndex) {
                    year --;
                }
            } else if(showInsertTeachingPeriods && teachingPeriods.length === 0) {
                // don't do anything
            } else {
                continue;
            }

            if(showInsertTeachingPeriods && show) {
                tableRows.push(
                    <InsertTeachingPeriod
                        index={i}
                        key={`${i}-insertTeachingPeriod`}
                        numberOfUnits={this.state.numberOfUnits}
                        insertTeachingPeriod={this.insertTeachingPeriod.bind(this)}
                        year={year}
                        teachingPeriodType="Teaching Period"
                        teachingPeriods={this.state.teachingPeriodsData}
                        code={code} />
                );
            }
        }

        if(this.state.teachingPeriods.length === 0) {
            areThereNoTeachingPeriods = true;
            tableRows.push(
                <NoTeachingPeriod
                    key="no-teaching-period"
                    startYear={this.state.startYear}
                    placeholderStartYear={new Date().getFullYear()}
                    changeStartYear={this.changeStartYear}
                    numberOfUnits={this.state.numberOfUnits}
                    semesterString={this.getQuickSemesterString()}
                    insertTeachingPeriod={this.insertTeachingPeriod.bind(this)}
                    appendSemester={this.appendSemester}
                    noFloat
                     />);
        }

        return (
            <Container>
                {this.state.isError &&
                    <Message negative className="no-print">
                        <Message.Header>
                           {this.state.errorHeader}
                        </Message.Header>
                        <p>
                            {this.state.errorMsg}
                        </p>
                    </Message>
                }
                {!this.state.showMoveUnitUI && !this.props.unitToAdd &&
                    <Message className="no-print">
                        <Message.Header>
                            Ready to add units to course plan
                        </Message.Header>
                        <p>
                            Search for units by clicking the plus icon in the header, then place it in your course plan.
                        </p>
                    </Message>
                }
                {this.props.unitToAdd && !this.state.showMoveUnitUI && !this.state.isError &&
                    <Message
                        positive
                        className="no-print"
                        onDismiss={this.props.cancelAddingToCourse}>
                        <Message.Header>
                            Adding {this.props.unitToAdd.UnitCode}
                        </Message.Header>
                        <p>
                            Select a table cell in your course structure to insert {this.props.unitToAdd.UnitCode}.
                        </p>
                    </Message>
                }
                {this.state.showMoveUnitUI &&
                    <Message info className="no-print">
                        <Message.Header>
                            Moving {this.state.unitToBeMoved.UnitCode}
                        </Message.Header>
                        <p>
                            Drop into a table cell in your course structure to move {this.state.unitToBeMoved.UnitCode}.
                            Dropping into a table cell where there is already an occupied unit will swap the units.
                        </p>
                    </Message>
                }
                <MediaQuery maxDeviceWidth={767}>
                    <Popup
                        trigger={<Button icon="plus" labelPosition="left" className="no-print" disabled={this.state.numberOfUnits >= this.maxNumberOfUnits || this.state.teachingPeriods.length === 0} onClick={this.incrementNumberOfUnits.bind(this)} color="green" fluid content="Add overload column" />}
                        content="Click this to overload a teaching period."
                        size='mini'
                        positioning='bottom center'
                        />
                    <ConfirmDeleteOverload
                        isDisabled={this.state.numberOfUnits <= this.minNumberOfUnits || this.state.teachingPeriods.length === 0}
                        getAffectedUnits={this.getAffectedUnits}
                        mobile
                        handleRemove={this.decrementNumberOfUnits.bind(this)} />
                </MediaQuery>
                <Table celled fixed striped compact>
                    {this.state.isLoading && <Loader active size="huge" />}
                    <MediaQuery minDeviceWidth={768}>
                        <Table.Header>
                            <Table.Row textAlign="center">
                                <Table.HeaderCell>Teaching Period</Table.HeaderCell>
                                <Table.HeaderCell colSpan={this.state.numberOfUnits}>
                                    Units
                                    <Popup
                                        trigger={<Button icon className="no-print" disabled={this.state.numberOfUnits >= this.maxNumberOfUnits || this.state.teachingPeriods.length === 0} onClick={this.incrementNumberOfUnits.bind(this)} color="green" floated="right"><Icon name='plus' /> Overload</Button>}
                                        content="Click this to overload a teaching period."
                                        size='mini'
                                        positioning='bottom center'
                                        />
                                    <ConfirmDeleteOverload
                                        isDisabled={this.state.numberOfUnits <= this.minNumberOfUnits || this.state.teachingPeriods.length === 0}
                                        getAffectedUnits={this.getAffectedUnits}
                                        handleRemove={this.decrementNumberOfUnits.bind(this)} />
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                    </MediaQuery>
                    <Table.Body>
                        {tableRows}
                    </Table.Body>
                </Table>
                <MediaQuery maxDeviceWidth={767}>
                    {mobile =>
                        <Container>
                            {!this.state.showInsertTeachingPeriods && !areThereNoTeachingPeriods &&
                            <InsertTeachingPeriodButton
                                semesterString={this.getQuickSemesterString()}
                                insert={this.showInsertTeachingPeriodsUI}
                                appendSemester={this.appendSemester}
                                mobile={mobile}
                                />
                            }
                            {this.state.showInsertTeachingPeriods &&
                            <Button fluid={mobile} className="no-print" floated={mobile ? "" : "right"} onClick={this.hideInsertTeachingPeriodsUI.bind(this)}>Cancel</Button>
                            }
                            {mobile && <div><br /></div>}
                            <ClearCourseModal disabled={this.state.teachingPeriods.length === 0} fluid={mobile} clearCourse={this.clearCourse.bind(this)} />
                            {mobile && <br />}
                            <CompletedCourseModal
                                trigger={<Button primary fluid={mobile} className="no-print">Complete course plan</Button>}
                                teachingPeriods={this.state.teachingPeriods}
                                numberOfUnits={this.state.numberOfUnits} />
                        </Container>
                    }
                </MediaQuery>
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
    totalCreditPoints: PropTypes.number.isRequired,
    totalCost: PropTypes.number.isRequired,
    handleChildUpdateTotals: PropTypes.func.isRequired,
    removeFromCourse: PropTypes.func.isRequired,
    onUnitClick: PropTypes.func.isRequired,
    cancelAddingToCourse: PropTypes.func,
    courseToLoad: PropTypes.string,
    viewUnitDetails: PropTypes.func,

    attachGetCourseErrors: PropTypes.func,
    detachGetCourseErrors: PropTypes.func
};

export default CourseStructure;
