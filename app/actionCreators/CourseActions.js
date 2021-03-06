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

        dispatch(validateCourse());
        dispatch({
            type: "MODIFIED_COURSE_PLAN"
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

        dispatch(validateCourse());
        dispatch({
            type: "MODIFIED_COURSE_PLAN"
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

        dispatch(validateCourse());
        dispatch({
            type: "MODIFIED_COURSE_PLAN"
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
    return function(dispatch) {
        let units = [];
        let unitCoords = [];
        let affectedUnitStrings = [];
        for(let i=0; i < teachingPeriods.length; i++) {
            let currentUnits = teachingPeriods[i].units;
            for(let j=0; j < currentUnits.length; j++) {
                let unit = currentUnits[j];
                if(unit !== null && unit !== undefined) {
                    if(!unit.placeholder) {
                        const unitLength = Math.min(6, unit.creditPoints / 6);
                        if ((unitLength + j - 1) >= index){
                            unitCoords.push([i,j]);
                            units.push(unit);
                            affectedUnitStrings.push(unit.unitCode + " - " + unit.unitName);
                        }
                    }
                }
            }
        }
        dispatch({
            type: "PREP_FOR_DELETION",
            unitCoords
        });
        dispatch({
            type: "DECREASE_STUDY_LOAD",
            units
        });
    };
};

/**
 * ADD_UNIT
 */
export const addUnit = (tpIndex, unitIndex, unit) => {
    return function(dispatch) {
        dispatch({
            type: "ADD_UNIT",
            tpIndex,
            unitIndex,
            unit,
            cost: unit.cost,
            creditPoints: unit.creditPoints
        });

        dispatch(clearHighlightingInvalidUnitSlots());
        dispatch(validateCourse());
        dispatch({
            type: "MODIFIED_COURSE_PLAN"
        });
    };
};

/**
 * REMOVE_UNIT
 */
export const removeUnit = (tpIndex, unitIndex, creditPoints, cost) => {
    return function(dispatch) {
        dispatch({
            type: "REMOVE_UNIT",
            tpIndex,
            unitIndex,
            creditPoints,
            cost
        });

        dispatch(validateCourse());
        dispatch({
            type: "MODIFIED_COURSE_PLAN"
        });
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

        dispatch({
            type: "VALIDATE_COURSE"
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
        const { teachingPeriods, numberOfUnits, totalCreditPoints, totalEstimatedCost, startYear, courseInfo } = JSON.parse(stringifedJSON);
        dispatch({
            type: "LOAD_NEW_TEACHING_PERIODS",
            value: teachingPeriods
        });

        if(courseInfo) {
            dispatch({
                type: "UPDATE_COURSE_INFO",
                courseInfo
            });
        }

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

        dispatch({
            type: "LOADED_FROM_LOCAL_STORAGE"

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
 *   attempt to delete a teaching period with the given index. It calculates which, if any units would be affected by the deletion,
 * and if there is - it updates the affected units array so the modal can display and prompt the user to confirm.
 * If there are no units that would be affected by the move (i.e. an empty teaching period), then the teaching period is removed
 * without prompting for confirmation
 */
export const attemptToDeleteTeachingPeriod = (index, units) => {
    return function(dispatch) {
        let affectedUnits = units.reduce((result, unit) => {
            if (unit !== null && unit !== undefined) {
                if(!unit.placeholder) {
                    return result.concat(unit.unitCode + " - " + unit.unitName);
                } else {
                    return result;
                }
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
        let unitCoords = [];
        let affectedUnitStrings = [];
        for(let i=0; i < teachingPeriods.length; i++) {
            let currentUnits = teachingPeriods[i].units;
            for(let j=0; j < currentUnits.length; j++) {
                let unit = currentUnits[j];
                if(unit !== null && unit !== undefined) {
                    if(!unit.placeholder) {
                        const unitLength = Math.min(6, unit.creditPoints / 6);
                        if ((unitLength + j - 1) >= index){
                            unitCoords.push([i,j]);
                            units.push(unit);
                            affectedUnitStrings.push(unit.unitCode + " - " + unit.unitName);
                        }
                    }
                }
            }
        }
        if (affectedUnitStrings.length > 0){
            dispatch({
                type: "SHOW_CONFIRM_DECREASE_STUDY_LOAD_MODAL"
            });
            dispatch({
                type: "UPDATE_AFFECTED_UNITS",
                affectedUnits: affectedUnitStrings
            });
        } else {
            dispatch({
                type: "PREP_FOR_DELETION",
                unitCoords
            });
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
export const saveCourseToLocalStorage = (teachingPeriods, numberOfUnits, startYear, creditPoints, cost, courseInfo) => {
    return function(dispatch) {
        localStorage.setItem("courseStructure", JSON.stringify({
            teachingPeriods,
            numberOfUnits,
            totalCreditPoints: creditPoints,
            totalEstimatedCost: cost,
            startYear,
            courseInfo,
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

        dispatch(highlightInvalidUnitSlots(unit, [tpIndex, unitIndex]));
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

        dispatch(clearHighlightingInvalidUnitSlots());
    };
};

/**
 * Simply dispatches the cancel adding unit action
 */
export const cancelAddingUnit = () => {
    return dispatch => {
        dispatch({
            type: "CANCEL_ADDING_UNIT"
        });
        dispatch(clearHighlightingInvalidUnitSlots());
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

        dispatch(clearHighlightingInvalidUnitSlots());
        dispatch(validateCourse());
        dispatch({
            type: "MODIFIED_COURSE_PLAN"
        });
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

        dispatch(clearHighlightingInvalidUnitSlots());
        dispatch(validateCourse());
        dispatch({
            type: "MODIFIED_COURSE_PLAN"
        });
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

/**
 * Highlights invalid unit slots where the unit being dragged cannot go.
 */
export const highlightInvalidUnitSlots = (tempUnit, ignoreCoordinate) => {
    return {
        type: "HIGHLIGHT_INVALID_UNIT_SLOTS",
        tempUnit,
        ignoreCoordinate
    };
};

/**
 * Clears highlighting of invalid unit slots
 */
export const clearHighlightingInvalidUnitSlots = () => {
    return {
        type: "CLEAR_HIGHLIGHTING_INVALID_UNIT_SLOTS"
    };
};


/**
 * When we know the cache contains a requested unit's data, we can use that instead
 */
export const useDataFromCache = (cacheEntry) => {
    return {
        type: "USE_DATA_FROM_CACHE",
        cacheData: cacheEntry 
    };
};

