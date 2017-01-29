import axios from "axios";

/**
 * FETCH_COURSE_INFO
 */
export const fetchCourseInfo = (courseCode) => {

    return function (dispatch) {
        dispatch({
            type: "FETCH_COURSE_INFO_PENDING"
        });
        axios.get(`${MONPLAN_REMOTE_URL}/courses/info/${courseCode}`)
            .then(resp => {
                dispatch({
                    type: "FETCH_COURSE_INFO_FULFILLED",
                    payload: resp,
                    courseCode
                });
            })
            .catch(err => {
                dispatch({
                    type: "FETCH_COURSE_INFO_REJECTED",
                    payload: err
                });
            });
    };
};

/**
 * FETCH_COURSE_TEMPLATE
 */
export const submitCourseForm = (courseCode, startYear, courseID) => {
    return function (dispatch) {
        dispatch({
            type: "SUBMIT_COURSE_FORM",
            startYear,
            courseCode
        });
        dispatch({
            type: "FETCH_COURSE_TEMPLATE_PENDING"
        });
        axios.get(`${MONPLAN_REMOTE_URL}/courses/${courseID}`)
            .then(resp => {
                dispatch({
                    type: "FETCH_COURSE_TEMPLATE_FULFILLED",
                    payload: resp
                });
            })
            .catch(err => {
                dispatch({
                    type: "FETCH_COURSE_TEMPLATE_REJECTED",
                    payload: err
                });
            });
    };
};

/**
 * FETCH_UNIT_INFO
 */
export const fetchUnitInfo = (unitCode) => {
    return function (dispatch) {
        dispatch({
            type: "FETCH_UNIT_INFO_PENDING"
        });
        axios.get(`${MONPLAN_REMOTE_URL}/units/${unitCode}`)
            .then(resp => {
                dispatch({
                    type: "FETCH_UNIT_INFO_FULFILLED",
                    payload: resp,
                    unitCode
                });
            })
            .catch(err => {
                dispatch({
                    type: "FETCH_UNIT_INFO_REJECTED",
                    payload: err
                });
            });
    };
};

/**
 * FETCH_UNITS
 */
export const fetchUnits = () => {
    return {
        type: "FETCH_UNITS",
        payload: axios.get(`${MONPLAN_REMOTE_URL}/basic/units`)
    };
};

/**
 * FETCH_COURSES
 */
export const fetchCourses = () => {
    return {
        type: "FETCH_COURSES",
        payload: axios.get(`${MONPLAN_REMOTE_URL}/basic/courses`)
    };
};