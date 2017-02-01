import axios from "axios";
import CourseTemplate from "../utils/CourseTemplate";

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
                
                const result = CourseTemplate.parse(resp.data, startYear);

                dispatch({
                    type: "LOAD_NEW_TEACHING_PERIODS",
                    value: result.newTeachingPeriods
                });

                dispatch({
                    type: "GET_NEW_NUMBER_OF_UNITS",
                    value: result.overLoadNumber
                });

                dispatch({
                    type: "INCREMENT_CREDIT_POINTS",
                    value: result.newCP
                });
                dispatch({
                    type: "INCREMENT_COST",
                    value: result.newCost
                });
                dispatch({
                    type: "GET_NEXT_SEMESTER_STRING"
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


/**
 * When given a course ID it will load a course snapshot from the API and process it
 */
export const loadCourseSnap = (snapID) => {
    
    return function(dispatch) {
        dispatch({
            type: "FETCH_COURSE_SNAPSHOT_PENDING"
        });

        axios.get(`${MONPLAN_REMOTE_URL}/snaps/${snapID}`)
            .then(resp => {
                const { teachingPeriods, numberOfUnits, totalCreditPoints, totalEstimatedCost, startYear } = resp.data.snapshotData;
                
                dispatch({
                    type: "FETCH_COURSE_SNAPSHOT_FULFILLED",
                    payload: resp
                });
                
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
                    year: startYear
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
            })
            .catch(() => {
                dispatch({
                    type: "FETCH_COURSE_SNAPSHOT_REJECTED"
                });
            });
    };
};

/**
 * Uploads the given course structure to the snapshot API and when sucessful, returns
 * the data with the unique ID linking to the snap
 */
export const uploadCourseSnap = (teachingPeriods, numberOfUnits, creditPoints, cost, startYear) => {
    return function(dispatch) {
        dispatch({
            type: "UPLOAD_COURSE_SNAPSHOT_PENDING"
        });
        axios.post(`${MONPLAN_REMOTE_URL}/snaps/`,
            {
                "course": {
                    teachingPeriods,
                    numberOfUnits,
                    totalCreditPoints: creditPoints,
                    totalEstimatedCost: cost,
                    startYear: startYear || new Date().getFullYear()
                }
            })
            .then(response => {
                dispatch({
                    type: "UPLOAD_COURSE_SNAPSHOT_FULFILLED",
                    payload: response //The course id that was uploaded
                });
            })
            .catch(() => {
                dispatch({
                    type: "UPLOAD_COURSE_SNAPSHOT_REJECTED"
                });
            });
        
    };
};