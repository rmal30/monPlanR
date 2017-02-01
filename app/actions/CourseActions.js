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
export const removeTeachingPeriod = (index, tp) => {
    return function (dispatch) {
        dispatch({
            type: "REMOVE_TEACHING_PERIOD",
            index,
            tp
        });

        dispatch({
            type: "GET_NEXT_SEMESTER_STRING"
        });
    };
};

/**
 * ADD_TEACHING_PERIOD
 */
export const addTeachingPeriod = (year, code) => {
    return function (dispatch) {
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
export const decreaseStudyLoad = () => {
    return {
        type: "DECREASE_STUDY_LOAD"
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
        unit
    };
};

/**
 * REMOVE_UNIT
 */
export const removeUnit = (tpIndex, unitIndex) => {
    return {
        type: "REMOVE_UNIT",
        tpIndex,
        unitIndex
    };
};

/**
 * CLEAR_COURSE
 */
export const clearCourse = () => {
    return {
        type: "CLEAR_COURSE"
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