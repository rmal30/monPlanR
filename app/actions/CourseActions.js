/**
 * INSERT_TEACHING_PERIOD
 */
export const insertTeachingPeriod = (index, year, code) => {
    return {
        type: "INSERT_TEACHING_PERIOD",
        index,
        year,
        code
    };
};

/**
 * REMOVE_TEACHING_PERIOD
 */
export const removeTeachingPeriod = (index) => {
    return {
        type: "REMOVE_TEACHING_PERIOD",
        index
    };
};

/**
 * ADD_TEACHING_PERIOD
 */
export const addTeachingPeriod = (year, code) => {
    return {
        type: "ADD_TEACHING_PERIOD",
        year,
        code
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
    return {
        type: "SUBMIT_YEAR_FORM",
        startYear,
        endYear
    };
};