import * as NotificationActions from "./Notifications.js";
import { nextSemester } from "../utils/NextSemesterString";

/**
 * INSERT_TEACHING_PERIOD
 */
export const insertTeachingPeriod = (index, year, code) => {
    return function (dispatch) {
        dispatch({
            type: "INSERT_TEACHING_PERIOD",
            index,
            year,
            code
        });
        dispatch({
            type: "GET_NEXT_SEMESTER_STRING"
        });
    };
};

/**
 * REMOVE_TEACHING_PERIOD
 */
export const removeTeachingPeriod = (index, units) => {
    return function (dispatch) {
        dispatch({
            type: "REMOVE_TEACHING_PERIOD",
            index,
            units
        });

        dispatch({
            type: "GET_NEXT_SEMESTER_STRING"
        });
    };
};

/**
 * ADD_TEACHING_PERIOD
 */
export const addTeachingPeriod = (teachingPeriods, startYear, teachingPeriodData) => {
    return function (dispatch) {

        const { year, code } = nextSemester(teachingPeriods, startYear, teachingPeriodData);

        dispatch({
            type: "APPEND_TEACHING_PERIOD",
            year,
            code
        });

        dispatch({
            type: "GET_NEXT_SEMESTER_STRING"
        });
    };
};

/**
 * INCREASE_STUDY_LOAD
 */
export const increaseStudyLoad = () => {
    return {
        type: "INCREASE_STUDY_LOAD"
    };
};

/**
 * DECREASE_STUDY_LOAD
 */
export const decreaseStudyLoad = (teachingPeriods, index) => {
    let units = teachingPeriods.reduce((result, tp) => {
        let unit = tp.units[index];
        if (unit !== null && unit !== undefined) {
            return result.concat(unit);
        } else {
            return result;
        }
    }, []);
    return {
        type: "DECREASE_STUDY_LOAD",
        units
    };
};

/**
 * ADD_UNIT
 */
export const addUnit = (tpIndex, unitIndex, unit) => {
    return {
        type: "ADD_UNIT",
        tpIndex,
        unitIndex,
        unit,
        cost: unit.Cost,
        creditPoints: unit.CreditPoints
    };
};

/**
 * REMOVE_UNIT
 */
export const removeUnit = (tpIndex, unitIndex, creditPoints, cost) => {
    return {
        type: "REMOVE_UNIT",
        tpIndex,
        unitIndex,
        creditPoints,
        cost
    };
};

/**
 * CLEAR_COURSE
 */
export const clearCourse = () => {
    return function(dispatch) {
        dispatch({
            type: "CLEAR_COURSE"
        });

        dispatch({
            type: "GET_NEXT_SEMESTER_STRING"
        });
    };
};

/**
 * GENERATE_COURSE
 */
export const generateCourse = (startYear, endYear) => {
    return {
        type: "GENERATE_COURSE",
        startYear,
        endYear
    };
};


/**
 * SUBMIT_YEAR_FORM
 */
export const submitYearForm = (startYear, endYear) => {
    return function(dispatch) {
        dispatch({
            type: "SUBMIT_YEAR_FORM",
            startYear,
            endYear
        });
        dispatch({
            type: "GENERATE_COURSE",
            startYear,
            endYear
        });
        dispatch({
            type: "GET_NEXT_SEMESTER_STRING"
        });
    };
};


/**
 * CHANGE_START_YEAR
 */
export const changeStartYear = (year) => {
    return function(dispatch) {
        dispatch({
            type: "CHANGE_START_YEAR",
            year
        });
        dispatch({
            type: "GET_NEXT_SEMESTER_STRING"
        });
    };
};

/**
 * GET_NEXT_SEMESTER_STRING
 */
export const getNextSemesterString = () => {
    return {
        type: "GET_NEXT_SEMESTER_STRING"
    };
};


/**
 * Uses a thunk and loads and processes the course data from localStorage
 */
export const loadCourseFromLocalStorage = () => {
    return function(dispatch) {
        const stringifedJSON = localStorage.getItem("courseStructure");
        const { teachingPeriods, numberOfUnits, totalCreditPoints, totalEstimatedCost, startYear } = JSON.parse(stringifedJSON);

        dispatch({
            type: "LOAD_NEW_TEACHING_PERIODS",
            value: teachingPeriods
        });

        dispatch({
            type: "GET_NEW_NUMBER_OF_UNITS",
            value: numberOfUnits
        });

        dispatch({
            type: "CHANGE_START_YEAR",
            year: (parseInt(startYear, 10) || new Date().getFullYear())
        });

        dispatch({
            type: "INCREMENT_CREDIT_POINTS",
            value: totalCreditPoints
        });

        dispatch({
            type: "INCREMENT_COST",
            value: totalEstimatedCost
        });

        dispatch({
            type: "GET_NEXT_SEMESTER_STRING"
        });
    };
};

/**
 * Gets the units that would be affected by the deletion of a column
 */
export const getAffectedUnitsInColumn = (index) => {
    return {
        type: "GET_AFFECTED_UNITS_IN_OVERLOAD_COLUMN",
        index
    };
};


/**
 * Will attempt to delete a teaching period with the given index. It calculates which, if any units would be affected by the deletion,
 * and if there is - it updates the affected units array so the modal can display and prompt the user to confirm.
 * If there are no units that would be affected by the move (i.e. an empty teaching period), then the teaching period is removed
 * without prompting for confirmation
 */
export const attemptToDeleteTeachingPeriod = (index, units) => {
    return function(dispatch) {
        let affectedUnits = units.reduce((result, unit) => {
            if (unit !== null && unit !== undefined) {
                return result.concat(unit.UnitCode + " - " + unit.UnitName);
            } else {
                return result;
            }
        }, []);

        if (affectedUnits.length > 0) {
            dispatch({
                type: "SHOW_CONFIRM_DELETE_TEACHING_PERIOD_MODAL"
            });

            dispatch({
                type: "UPDATE_AFFECTED_UNITS",
                affectedUnits
            });

            dispatch({
                type: "UPDATE_INDEX_OF_TP_TO_REMOVE",
                index
            });
        } else {
            dispatch(removeTeachingPeriod(index, units));
        }
    };
};


/**
 * Attempts to decrease the study load, it calculate the units that would be affected by this deletion. If no units would be affected,
 * automatically decreases the study load, otherwise shows the confirmation modal with the affected units.
 */
export const attemptToDecreaseStudyLoad = (teachingPeriods, index) => {
    return function(dispatch) {
        let units = [];
        let affectedUnits = teachingPeriods.reduce((result, tp) => {
            let unit = tp.units[index];
            if (unit !== null && unit !== undefined) {
                units.push(unit);
                return result.concat(unit.UnitCode + " - " + unit.UnitName);
            } else {
                return result;
            }
        }, []);

        if (affectedUnits.length > 0){
            dispatch({
                type: "SHOW_CONFIRM_DECREASE_STUDY_LOAD_MODAL"
            });
            dispatch({
                type: "UPDATE_AFFECTED_UNITS",
                affectedUnits
            });
        } else {
            dispatch({
                type: "DECREASE_STUDY_LOAD",
                units
            });
        }
    };
};
/**
 * Gets the units that would be affected by the deletion of a row
 */
export const getAffectedUnitsInRow = (index) => {
    return {
        type: "GET_AFFECTED_UNITS_IN_TEACHING_PERIOD_ROW",
        index
    };
};

/**
 * All this does is interact with local storage, the action is not strictly necessary, as the reducer doesn't handle it
 * But I argue for debugging purposes it's useful to be able to track when the save course action is firing
 */
export const saveCourseToLocalStorage = (teachingPeriods, numberOfUnits, startYear, creditPoints, cost) => {
    return function(dispatch) {
        localStorage.setItem("courseStructure", JSON.stringify({
            teachingPeriods,
            numberOfUnits,
            totalCreditPoints: creditPoints,
            totalEstimatedCost: cost,
            startYear,
            version: MONPLAN_VERSION
        }));

        /**Perhaps bad practice but only exists to notify devs that a save occured */
        dispatch({
            type: "SAVED_COURSE_TO_LOCALSTORAGE"
        });
    };
};


/**
 * When a unit starts being moved, we need to save it's original index position so when it is dropped or swapped we are aware
 */
export const movingUnit = (unit, unitIndex, tpIndex) => {
    return dispatch => {
        dispatch({
            type: "MOVING_UNIT", //No handlers for this but useful for debugging purposes
            unit,
            unitIndex,
            tpIndex
        });

        dispatch(NotificationActions.addNotification({
            id: "MOVING_UNIT",
            title: `Moving ${unit.UnitCode}`,
            message: "Drop into a table cell to move the unit. If there is already a unit, then those units will be swapped.",
            dismissable: false
        }));
    };
};

/**
 * Cancels moving unit, which is used when user drags the unit outside of the
 * table then letting go of the mouse button.
 */
export const cancelMovingUnit = () => {
    return dispatch => {
        dispatch({
            type: "CANCEL_MOVING_UNIT"
        });

        dispatch(NotificationActions.removeNotification("MOVING_UNIT"));
    };
};

/**
 * When a unit starts being moved, we need to save it's original index position so when it is dropped or swapped we are aware
 */
export const moveUnit = (newUnitIndex, newTPIndex) => {
    return dispatch => {
        dispatch({
            type: "MOVE_UNIT", //No handlers for this but useful for debugging purposes
            newUnitIndex,
            newTPIndex
        });

        dispatch(NotificationActions.removeNotification("MOVING_UNIT"));
    };
};

/**
 * When a unit starts being moved, we need to save it's original index position so when it is dropped or swapped we are aware
 */
export const swapUnit = (newUnitIndex, newTPIndex, unitToSwap) => {
    return dispatch => {
        dispatch({
            type: "SWAP_UNIT", //No handlers for this but useful for debugging purposes
            newUnitIndex,
            newTPIndex,
            unitToSwap
        });

        dispatch(NotificationActions.removeNotification("MOVING_UNIT"));
    };
};

/**
 * Validates course structure.
 */
export const validateCourse = () => {
    return {
        type: "VALIDATE_COURSE"
    };
};
