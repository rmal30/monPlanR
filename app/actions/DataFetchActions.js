import axios from "axios";
import CourseTemplate from "../utils/CourseTemplate";
import CostCalc from "../utils/CostCalc";

var parseString = require("xml2js").parseString;
import * as CourseActions from "./CourseActions";
import * as NotificationActions from "./Notifications";

/**
 * FETCH_COURSE_INFO
 */
export const fetchCourseInfo = (courseCode) => {
    return function (dispatch) {
        dispatch({
            type: "FETCH_COURSE_INFO_PENDING"
        });
        axios.get(`${MONPLAN_REMOTE_URL2}/courses/${courseCode}`)
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
            type: "FETCH_COURSE_TEMPLATE_PENDING"
        });

        dispatch({
            type: "SUBMIT_COURSE_FORM",
            startYear,
            courseCode
        });
        axios.get(`${MONPLAN_REMOTE_URL2}/courseMaps/${courseID}`)
            .then(resp => {

                dispatch({
                    type: "FETCH_COURSE_TEMPLATE_FULFILLED",
                    payload: resp
                });

                const result = CourseTemplate.parse(resp.data[0].propertyMap, startYear);

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
        axios.get(`${MONPLAN_REMOTE_URL2}/units/${unitCode}`)
            .then(resp => {
                let cost = CostCalc.calculateCost(parseInt(resp.data.scaBand, 10), parseInt(resp.data.creditPoints, 10));
                resp.data.cost = cost;
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
 * Called to populate the unit to add value, it indicates that a unit is being prepped
 * to be added to the course
 */
export const willAddUnit = (unitCode, customUnitToAdd, isDragging) => {
    return function (dispatch) {
        dispatch({
            type: "UPDATE_UNIT_IS_BEING_DRAGGED",
            isDragging
        });

        dispatch({
            type: "ADDING_UNIT",
            unitCode: unitCode
        });

        if(!customUnitToAdd) {
            dispatch({
                type: "FETCH_UNIT_INFO_PENDING"
            });

            axios.get(`${MONPLAN_REMOTE_URL2}/units/${unitCode}`)
                .then(resp => {
                    let cost =  CostCalc.calculateCost(resp.data.scaBand, resp.data.creditPoints);

                    resp.data.cost = cost;

                    dispatch({
                        type: "FETCH_UNIT_INFO_FULFILLED",
                        payload: resp,
                        unitCode
                    });

                    dispatch({
                        type: "UPDATE_UNIT_TO_ADD"
                    });

                    dispatch(CourseActions.highlightInvalidUnitSlots(resp.data, false));
                })
                .catch(err => {
                    dispatch({
                        type: "FETCH_UNIT_INFO_REJECTED",
                        payload: err
                    });

                    dispatch({
                        type: "CANCEL_ADDING_UNIT"
                    });

                    if(err.response) {
                        if(400 <= err.response.status && err.response.status < 500) {
                            dispatch(NotificationActions.addNotification({
                                id: "UNIT_INFO_ERROR",
                                title: "Server error",
                                message: `Unable to fetch details about ${unitCode} as it does not exist in our database. Please try again later.`,
                                level: "error"
                            }));
                        } else if(500 <= err.response.status && err.response.status < 600) {
                            dispatch(NotificationActions.addNotification({
                                id: "UNIT_INFO_ERROR",
                                title: "Server error",
                                message: `Unable to fetch details about ${unitCode} due to a server error. Please try again later.`,
                                level: "error"
                            }));
                        } else {
                            dispatch(NotificationActions.addNotification({
                                id: "UNIT_INFO_ERROR",
                                title: "Server error",
                                message: `Unable to fetch details about ${unitCode}. Please try again later.`,
                                level: "error"
                            }));
                        }
                    } else {
                        dispatch(NotificationActions.addNotification({
                            id: "UNIT_INFO_ERROR",
                            title: "Connection error",
                            message: `Unable to fetch details about ${unitCode}. Please check your connection and try again.`,
                            level: "error"
                        }));
                    }
                });
        } else if(isDragging) {
            dispatch({
                type: "UPDATE_UNIT_TO_ADD",
                customUnitToAdd
            });

            dispatch(CourseActions.highlightInvalidUnitSlots(customUnitToAdd, false));
        } else if(customUnitToAdd.readyToAddUnit) {
            dispatch({
                type: "UPDATE_UNIT_TO_ADD",
                customUnitToAdd
            });
        }
        else {
            dispatch({
                type: "SHOW_CUSTOM_UNIT_MODAL",
                unitCode
            });
        }
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
        axios.get(`${MONPLAN_REMOTE_URL2}/basic/periods`)
             .then(response => {
                 /**
                  * Compares start teaching period date between two teaching periods.
                  *
                  * @param {object} a - The first teaching period.
                  * @param {object} b - The second teaching period.
                  * Grabbing the common teaching periods and sorting
                  */
                 function compareDate(a, b) {
                     return Math.sign(new Date(a) - new Date(b));
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
    return function(dispatch) {
        dispatch({
            type: "FETCH_UNITS_PENDING"
        });

        axios.get(`${MONPLAN_REMOTE_URL2}/basic/units`)
            .then(resp => {
                dispatch({
                    type: "FETCH_UNITS_FULFILLED",
                    payload: resp.data
                });
            })
            .catch(err => {
                dispatch({
                    type: "FETCH_UNITS_REJECTED",
                    payload: err
                });
            });
    };
};

/**
 * FETCH_COURSES
 */
export const fetchCourses = () => {
    return (dispatch) => {
        dispatch({
            type: "FETCH_COURSES_PENDING"
        });

        axios.get(`${MONPLAN_REMOTE_URL2}/basic/courses`)
            .then(resp => {
                dispatch({
                    type: "FETCH_COURSES_FULFILLED",
                    payload: resp.data
                });
            })
            .catch(err => {
                dispatch({
                    type: "FETCH_COURSES_REJECTED",
                    payload: err
                });
            });
    };
};

/**
 * Once a course has been selected from the basic course list, we must then make a query to
 * get all the areas of study available for that course
 */
export const fetchAreaOfStudy = (courseCode) => {
    return (dispatch) => {
        dispatch({
            type: "FETCH_AOS_PENDING"
        });

        axios.get(`${MONPLAN_REMOTE_URL2}/basic/courses/${courseCode}`)
            .then(resp => {
                dispatch({
                    type: "FETCH_AOS_FULFILLED",
                    payload: resp.data.map(item => {
                        return {
                            text: item.propertyMap.aosName,
                            value: item.propertyMap.aosCode
                        };
                    }) //this excludes the key information that we do not care about
                });
            })
            .catch(err => {
                dispatch({
                    type: "FETCH_AOS_REJECTED",
                    payload: err
                });
            });
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

        const snapURL = `${MONPLAN_REMOTE_URL2}/snaps/`;
        const params = {
            "course": {
                teachingPeriods,
                numberOfUnits,
                totalCreditPoints: creditPoints,
                totalEstimatedCost: cost,
                startYear: startYear || new Date().getFullYear(),
            }
        };

        let instance = axios.create({
            headers: {"Content-Type": "application/json"}
        });

        instance.post(snapURL, params)
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

/**
* Fetchin Dates function
*/
export const fetchDates = () => {
    return function(dispatch){
        dispatch({
            type: "FETCH_IMPORTANT_DATES_PENDING",
        });
        axios.get("https://www.monash.edu/student-services-division/assets/scripts/asset-management/key-dates/feed.php?category=australia-students")
            .then(resp => {
                parseString(resp.data, function(err, result){
                    const values = result.rss.channel[0].item.map(currentItem => {
                        return {"date": currentItem.title[0], "description": currentItem.description[0]};
                    });
                    dispatch({
                        type: "FETCH_IMPORTANT_DATES_FULFILLED",
                        payload: values //The course id that was uploaded
                    });
                });
            })
            .catch(()=>{
                dispatch({
                    type: "FETCH_IMPORTANT_DATES_REJECTED"
                });

            });
    };

};
