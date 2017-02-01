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
 * Fetches teaching period string list from API, note that there is no guarantee the teaching periods 
 * will be ordered correctly so we sort them before using them in the state
 */
export const fetchTeachingPeriods = () => {
    return function (dispatch) {
        dispatch({
            type: "FETCH_TEACHING_PERIODS_PENDING"
        });
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

                 dispatch({
                     type: "FETCH_TEACHING_PERIODS_FULFILLED",
                     payload: response.data
                 });

                 dispatch({
                     type: "GET_NEXT_SEMESTER_STRING"
                 });
             })
            .catch(err => {
                dispatch({
                    type: "FETCH_TEACHING_PERIODS_REJECTED",
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