import React, { Component, PropTypes } from "react";
import { Button, Container, Dimmer, Icon, Popup, Table, Loader } from "semantic-ui-react";
import axios from "axios";
import MediaQuery from "react-responsive";
import { browserHistory } from "react-router";

import LocalStorage from "../../utils/LocalStorage.js";
import UnitQuery from "../../utils/UnitQuery";
import CourseTemplate from "../../utils/CourseTemplate";

import CourseViewActions from "./CourseViewActions.jsx";
import CourseEditActions from "./CourseEditActions.jsx";
import CourseMessage from "./CourseMessage.jsx";

import TeachingPeriod from "../TeachingPeriod/TeachingPeriod.jsx";
import NoTeachingPeriod from "../TeachingPeriod/NoTeachingPeriod.jsx";
import InsertTeachingPeriod from "../TeachingPeriod/InsertTeachingPeriod.jsx";
import ConfirmDeleteOverload from "../modals/ConfirmDeleteOverload.jsx";


import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as counterActions from "../../actions/CounterActions";
import * as courseActions from "../../actions/CourseActions";



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
            /* Data state */
            numberOfUnits: 4,
            teachingPeriods: this.generateCourse(startYear, endYear),

            startYear: startYear,

            /* UI state */
            showInsertTeachingPeriods: false,
            teachingPeriodsData: null,
            showMoveUnitUI: false,
            unitToBeMoved: undefined,
            isLoading: false,
            unlock: true,

            isUploading: false,
            uploadingError: false,
            uploaded: false,

            courseToLoad: this.props.courseToLoad
        };

        // Fetch common teaching periods to get names for each teaching period code.
        axios.get(`${MONPLAN_REMOTE_URL}/basic/teachingperiods`)
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
        this.hideInsertTeachingPeriodsUI = this.hideInsertTeachingPeriodsUI.bind(this);
        this.clearCourse = this.clearCourse.bind(this);
        this.getCourseErrors = this.getCourseErrors.bind(this);
        this.uploadCourseToDatabase = this.uploadCourseToDatabase.bind(this);
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
            this.saveCourseToLocalStorage();
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

            const teachingPeriodStr = codeMap[this.state.teachingPeriods[units[i].teachingPeriodIndex].code];

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

        const { teachingPeriods } = this.state;

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

        for(let i = 0; i < this.state.teachingPeriods.length; i++) {

            const teachingPeriodStr = codeMap[this.state.teachingPeriods[i].code];

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
     * Generates a course structure of semester one and semester two teaching
     * periods, given start year and end year.
     *
     * @author Eric Jiang, Saurabh Joshi
     * @param {number} startYear - When the student commences their course.
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
                    units: new Array(4).fill(null)
                };

                const semesterTwoTeachingPeriod = {
                    year,
                    code: "S2-01",
                    units: new Array(4).fill(null)
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

        this.props.incrementCost(result.newCost);
        this.props.incrementCreditPoints(result.newCP);

    }

    /**
     * Processes a course template loaded from redux
     */
    loadCourseTemplate() {
        setTimeout(() => {
            const { clearCourse, courseTemplateData, startYear } = this.props;
            this.clearCourse();
            clearCourse(); //redux function passed through
            let courseTemplate = CourseTemplate.parse(courseTemplateData, startYear);
            this.setState({
                teachingPeriods: courseTemplate.newTeachingPeriods,
                numberOfUnits: courseTemplate.overLoadNumber
            });
            
            this.props.incrementCost(courseTemplate.newCost);
            this.props.incrementCreditPoints(courseTemplate.newCP);
        }, 1000);
    }
    /**
     * on call will load the course from API with the given course code,
     * note that if there is an error, we turn off the loader and unlock the lock so
     * the user can make another request
     */
    courseLoad(courseCode, year) {
        this.setState({isLoading: true});
        this.clearCourse();
        this.props.clearCourse(); //confusing I know, but this is the redux function passed through
        UnitQuery.getCourseData(courseCode)
            .then(response => {
                let data = response.data;
                this.loadCourseFromAPI(data, year);
            })
            .catch(err => {
                console.error(err);

                this.setState({
                    isLoading: false,
                    unlock: true
                });
            });
    }

    /**
     * As the name implies, this loads the course from our API
     */
    loadCourseFromDatabase() {
        this.setState({
            isLoading: true
        });

        axios.get(this.props.fetchURL)
            .then(response => {
                const { teachingPeriods, numberOfUnits, totalCreditPoints, totalEstimatedCost, startYear } = response.data.snapshotData;

                this.props.incrementCost(totalEstimatedCost);
                this.props.incrementCreditPoints(totalCreditPoints);
                this.setState({
                    teachingPeriods,
                    numberOfUnits,
                    totalCreditPoints,
                    totalEstimatedCost,
                    isLoading: false,
                    startYear: startYear || new Date().getFullYear()
                });
            })
            .catch(error => {
                console.error(error);
                this.setState({
                    isLoading: false
                });
            });
    }

    /**
     * Saves list of teaching periods to local storage.
     *
     * @author Saurabh Joshi
     */
    saveCourseToLocalStorage() {
        const { teachingPeriods, numberOfUnits, startYear } = this.state;

        localStorage.setItem("courseStructure", JSON.stringify({
            teachingPeriods,
            numberOfUnits,
            totalCreditPoints: this.props.creditPoints,
            totalEstimatedCost: this.props.cost,
            startYear,
            version: MONPLAN_VERSION
        }));
    }

    /**
     * Uploads course as a snapshot
     *
     * @author Saurabh Joshi
     */
    uploadCourseToDatabase() {
        if(this.state.isUploading || this.state.uploaded) {
            return;
        }

        const { teachingPeriods, numberOfUnits, startYear } = this.state;

        this.setState({
            isUploading: true,
            uploaded: false,
            uploadingError: false
        });

        axios.post(`${MONPLAN_REMOTE_URL}/snaps/`,
            {
                "course": {
                    teachingPeriods,
                    numberOfUnits,
                    totalCreditPoints: this.props.creditPoints,
                    totalEstimatedCost: this.props.cost,
                    startYear: startYear || new Date().getFullYear()
                }
            })
            .then(response => {
                this.setState({
                    isUploading: false,
                    uploaded: true,
                    uploadedCourseID: response.data
                });
            })
            .catch(error => {
                this.setState({
                    isUploading: false,
                    uploadingError: true
                });
                console.error(error);
            });
    }

    /**
     * Loads list of teaching periods from local storage.
     *
     * @author Saurabh Joshi
     */
    loadCourseFromLocalStorage() {
        const stringifedJSON = localStorage.getItem("courseStructure");

        if(stringifedJSON) {
            const { teachingPeriods, numberOfUnits, totalCreditPoints, totalEstimatedCost, startYear } = JSON.parse(stringifedJSON);

            this.props.incrementCost(totalEstimatedCost);
            this.props.incrementCreditPoints(totalCreditPoints);

            this.setState({
                teachingPeriods,
                numberOfUnits,
                totalCreditPoints,
                totalEstimatedCost,
                startYear: startYear || new Date().getFullYear()
            });

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
        this.props.clearCourse();
    }

    /**
     * Loads course if it exists.
     *
     * @author Saurabh Joshi
     */
    componentDidMount() {
        if(this.props.viewOnly) {
            if(this.props.fetchURL) {
                this.props.clearCourse();
                this.loadCourseFromDatabase();
            }
            return;
        }

        if(LocalStorage.doesCourseStructureExist()) {
            this.props.clearCourse();
            this.loadCourseFromLocalStorage();
        } else {
            this.loadCourseTemplate();
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
    componentDidUpdate(prevProps, prevState) {
        if(!this.props.viewOnly) {
            this.saveCourseToLocalStorage();
        }

        if(prevState.uploaded && this.state.uploaded) {
            this.setState({
                uploaded: false
            });
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
        const { teachingPeriods } = this.state;

        return teachingPeriods.map((ele, teachingPeriodIndex) =>
            ele.units.map((unit, unitIndex) => {
                if(unit) {
                    return Object.assign({}, unit, {
                        teachingPeriodIndex,
                        unitIndex
                    });
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
                units: new Array(this.state.numberOfUnits).fill(null)
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
        const s1Code = "S1-01";
        const s2Code = "S2-01";

        let code = s1Code;

        const { teachingPeriods, teachingPeriodsData } = this.state;

        if(!teachingPeriodsData) {
            return { index, year, code };
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

        return { index, year, code };
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
        const { year, code } = this.nextSemester();
        const { teachingPeriodsData } = this.state;

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
        teachingPeriods[this.state.originalPosition[0]].units[this.state.originalPosition[1]] = !temp.placeholder ? temp : null;

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

        this.getListOfUnits().forEach(unit => {
            this.props.decrementCreditPoints(unit.CreditPoints);
            this.props.decrementCost(unit.Cost);
        });

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
        const unitToRemove = teachingPeriods[teachingPeriodIndex].units[unitIndex];

        this.props.decrementCost(unitToRemove.Cost);
        this.props.decrementCreditPoints(unitToRemove.CreditPoints);

        const updatedTeachingPeriod = Object.assign(
            {},
            teachingPeriods[teachingPeriodIndex],
            {
                units: [
                    ...teachingPeriods[teachingPeriodIndex].units.slice(0, unitIndex),
                    null,
                    ...teachingPeriods[teachingPeriodIndex].units.slice(unitIndex + 1)
                ]
            }
        );

        this.setState({
            teachingPeriods: [
                ...teachingPeriods.slice(0, teachingPeriodIndex),
                updatedTeachingPeriod,
                ...teachingPeriods.slice(teachingPeriodIndex + 1)
            ]
        });
    }

    /**
     * Adds a column to the course structure.
     */
    incrementNumberOfUnits() {
        if(this.state.numberOfUnits >= this.maxNumberOfUnits) {
            return;
        }


        let { teachingPeriods } = this.state;
        teachingPeriods = teachingPeriods.map(teachingPeriod => {
            return Object.assign(
                {},
                teachingPeriod,
                {units: [...teachingPeriod.units, null]}
            );
        });

        this.setState({
            numberOfUnits: this.state.numberOfUnits + 1,
            teachingPeriods
        });
    }

    /**
     * Returns an array of all units affected by an overload column removal
     */
    getAffectedUnits() {
        const teachingPeriods = this.state.teachingPeriods.slice();
        let unitIndex = this.state.numberOfUnits - 1;
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
     * Removes a column from the course structure.
     *
     * @author JXNS, Saurabh Joshi
     */
    decrementNumberOfUnits() {
        if(this.state.numberOfUnits > this.minNumberOfUnits) {
            let teachingPeriods = this.state.teachingPeriods;

            let { numberOfUnits } = this.state;

            teachingPeriods = teachingPeriods.map(teachingPeriod => {
                const unit = teachingPeriod.units[numberOfUnits - 1];

                if (unit !== null && unit !== undefined) {
                    this.props.decrementCreditPoints(unit.CreditPoints);
                    this.props.decrementCost(unit.Cost);
                }

                teachingPeriod.units = teachingPeriod.units.slice(0, -1);
                return teachingPeriod;
            });



            this.setState({
                numberOfUnits: this.state.numberOfUnits - 1,
                teachingPeriods
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
    renderTeachingPeriod(teachingPeriod, index, errors, tempInvalidCoordinates) {
        return <TeachingPeriod
                    key={`${teachingPeriod.year}-${teachingPeriod.code}`}
                    viewOnly={this.props.viewOnly}
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
        let year, code, show = false;

        const { teachingPeriodToInsertCode, teachingPeriods, teachingPeriodsData, showInsertTeachingPeriods } = this.state;
        if(showInsertTeachingPeriods) {
            year = this.state.startYear || new Date().getFullYear();
            code = teachingPeriodToInsertCode;
        }

        for(let i = 0; i <= teachingPeriods.length; i++) {
            show = true;
            if(i !== 0) {
                tableRows.push(this.renderTeachingPeriod(teachingPeriods[i - 1], i - 1, errors.map(err => {
                    const finalErr = Object.assign({}, err);
                    finalErr.coordinates = finalErr.coordinates.filter(x => x[0] === i - 1);
                    return finalErr;
                }).filter(err => err.coordinates.length > 0), tempInvalidCoordinates.filter(xs => xs[0] === i - 1 || xs[0] === null)));
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
            tableRows.push(
                <NoTeachingPeriod
                    key="no-teaching-period"
                    viewOnly={this.props.viewOnly}
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
                        teachingPeriods={this.state.teachingPeriods}
                        numberOfUnits={this.state.numberOfUnits}
                        />
                }
                {!this.props.viewOnly &&
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
                }
                <Dimmer.Dimmable as={Table} celled fixed striped compact>
                    {this.props.courseLoading && <Dimmer inverted active><Loader inverted size="huge">Loading...</Loader></Dimmer>}
                    <MediaQuery minDeviceWidth={768}>
                        <Table.Header>
                            <Table.Row textAlign="center">
                                <Table.HeaderCell>Teaching Period</Table.HeaderCell>
                                <Table.HeaderCell colSpan={this.state.numberOfUnits}>
                                    Units
                                    {!this.props.viewOnly &&
                                        <span>
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
                                        </span>
                                    }
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                    </MediaQuery>
                    <Table.Body>
                        {tableRows}
                    </Table.Body>
                </Dimmer.Dimmable>
                {!this.props.viewOnly &&
                    <CourseEditActions
                        showInsertTeachingPeriods={this.state.showInsertTeachingPeriods}
                        showInsertTeachingPeriodsUI={this.showInsertTeachingPeriodsUI}
                        hideInsertTeachingPeriodsUI={this.hideInsertTeachingPeriodsUI}

                        teachingPeriods={this.state.teachingPeriods}
                        numberOfUnits={this.state.numberOfUnits}
                        appendSemester={this.appendSemester}
                        clearCourse={this.clearCourse}
                        semesterString={this.getQuickSemesterString()}

                        isUploading={this.state.isUploading}
                        uploaded={this.state.uploaded}
                        uploadingError={this.state.uploadingError}
                        uploadedCourseID={this.state.uploadedCourseID}
                        uploadCourseToDatabase={this.uploadCourseToDatabase}
                         />
                }
            </Container>
        );
    }
}

/**
 * Set up any props you want course structure to be passed here
 */
const mapStateToProps = state => {
    return {
        creditPoints: state.Counter.creditPoints,
        cost: state.Counter.cost,
        startYear: state.CourseStructure.startYear,
        endYear: state.CourseStructure.endYear,
        courseTemplateData: state.CourseStructure.courseTemplateData,
        courseLoading: state.CourseStructure.courseLoading
    };
};

/**
 * Set up any functions from the action creators you want to pass in
 */
const mapDispatchToProps = dispatch => {
    const actionBundle = Object.assign({}, counterActions, courseActions);
    return bindActionCreators(actionBundle, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseStructure);

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
    courseTemplateData: PropTypes.object,
    courseLoading: PropTypes.bool,


    /* Validation */
    updateStatus: PropTypes.func.isRequired,
    /* Used for diff checks */
    courseErrors: PropTypes.array.isRequired,

    viewOnly: PropTypes.bool,
    switchToEditCourse: PropTypes.bool,
    fetchURL: PropTypes.string
};