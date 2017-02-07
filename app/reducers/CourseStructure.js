import { getSemesterString, nextSemester } from "../utils/NextSemesterString";

/**
 * @author JXNS, Saurabh Joshi
 * The CourseStructure reducer is the most complex state to manage as it forms
 * the core of the app. The data structure overview can be determined by
 * looking at the default state of the reducer, but note that there are certain
 * complexities not represented in here alone.
 *
 * I (JXNS) will not pretend that these action handlers follow a strictly
 * consistent contract with the functions that call them, but in general they
 * will trust that they are being called correctly to reduce complexity (not
 * checking for index out of bounds errors etc).
 */
const defaultState = {
    teachingPeriods: [],
    numberOfUnits: 4,

    affectedUnits: [],
    
    courseInfoLoading: false,
    courseLoading: false,

    unitLoading: false,
    unitLoadError: false,
    unitToAdd: undefined,
    unitToAddCode: "",
    unitIsBeingDragged: false,

    courseInfoLoadError: false,
    courseTemplateLoadError: false,
    courseTemplateData: null,

    courseSnapshotLoading: false,
    courseSnapshotLoadError: false,
    courseSnapshotData: null,

    courseSnapshotUploading: false,
    courseSnapshotUploadError: false,
    courseSnapshotUploadData: null,
    courseSnapshotUploadSucessful: false,

    teachingPeriodData: null,
    teachingPeriodsDataLoading: false,
    teachingPeriodsDataError: false,

    teachingPeriodCodeToInsert: null,
    nextSemesterString: null,
    indexOfTPtoRemove: 0,

    unitToBeMoved: undefined,
    tpIndexOfUnitToBeMoved: 0,
    unitsIndexOfUnitToBeMoved: 0,

    unitInfo: {
        cost: 0,
        creditPoints: 0,
        Faculty: "",
        likeScore: 0,
        Synopsis: "",
        UnitName: "",
        usefulnessScore: 0,
        prereqs: "",
        prohibs: "",
        offeringArray: "",
        learnResponseCount: 0,
        enjoyResponseCount: 0,
        SCABand: 0
    },

    courseInfo: {
        courseName: "",
        faculty: "",
        creditPoints: 0,
        courseDescription: "",
        durationStr: "",
        modeAndLocation: "",
        awards: "",
        abrTitle: ""
    },

    focusedUnitCode: null,
    focusedCourse: null,
    startYear: new Date().getFullYear(), //Default to the current year
    endYear: new Date().getFullYear() + 4 //4 years is avg degree length
};

/**
 * Course structure reducer
 */
const CourseStructure = (state = defaultState, action) => {

    switch(action.type) {

        /*
            Inserts a teaching period with the given data at the given location, note that there is a seperate action for simply appending a
            unit to the end of the array called "ADD_TEACHING_PERIOD"
        */
        case "INSERT_TEACHING_PERIOD":
            return {
                ...state,
                teachingPeriods: [
                    ...state.teachingPeriods.slice(0, action.index),
                    {year: action.year, code: action.code, units: new Array(state.numberOfUnits).fill(null)},
                    ...state.teachingPeriods.slice(action.index)
                ]
            };

        /*
            Removes a teaching period located at the given index
        */
        case "REMOVE_TEACHING_PERIOD":
            return {
                ...state,
                teachingPeriods: [
                    ...state.teachingPeriods.slice(0, action.index),
                    ...state.teachingPeriods.slice(action.index + 1)
                ]
            };

        /*
            Appends a teaching period to the end of the array with the given data
        */
        case "APPEND_TEACHING_PERIOD":
            return {
                ...state,
                teachingPeriods: [
                    ...state.teachingPeriods,
                    {
                        year: action.year,
                        code: action.code,
                        units: new Array(state.numberOfUnits).fill(null)
                    }
                ]
            };

        /*
            Increases the number of units a student can take in all of the teaching periods. If the number of units is already at it's max
            it will stop the state from being broken, otherwise it will increase the number by one and also append a blank unit to the end of
            each teaching period array
        */
        case "INCREASE_STUDY_LOAD":
            if(state.numberOfUnits >= 6) {
                return {
                    ...state,
                    numberOfUnits: 6
                };
            } else {
                return {
                    ...state,
                    numberOfUnits: state.numberOfUnits + 1,
                    teachingPeriods: state.teachingPeriods.map(tp => {
                        return {
                            ...tp,
                            units: [...tp.units, null]
                        };
                    })
                };
            }

        /*
            Decreases the number of units a student can take in all of the teaching periods. If the number of units is already at it's min
            it will stop the state from being broken, otherwise it will decrease the number by one and also remove the last unit from each teaching array
        */
        case "DECREASE_STUDY_LOAD":
            if(state.numberOfUnits <= 4) {
                return {
                    ...state,
                    numberOfUnits: 4
                };
            } else {
                return {
                    ...state,
                    numberOfUnits: state.numberOfUnits - 1,
                    teachingPeriods: state.teachingPeriods.map(tp => {
                        return {
                            ...tp,
                            units: tp.units.slice(0, state.numberOfUnits - 1)
                        };
                    })
                };
            }

        /*
            Adds a unit with the given details to course structure at the given location
        */
        case "ADD_UNIT":
            return {
                ...state,
                unitToAdd: undefined, //reset unit after adding
                teachingPeriods: [
                    ...state.teachingPeriods.slice(0, action.tpIndex),
                    {
                        ...state.teachingPeriods[action.tpIndex],
                        units: [
                            ...state.teachingPeriods[action.tpIndex].units.slice(0, action.unitIndex),
                            action.unit,
                            ...state.teachingPeriods[action.tpIndex].units.slice(action.unitIndex + 1)
                        ]
                    },
                    ...state.teachingPeriods.slice(action.tpIndex + 1),
                ]
            };

        /*
            Removes a unit at the given location from the course structure,
            first it finds the tp by finding array item at state.tpIndex,
            then it returns a unit array with the object at that location overwritten with
            null
        */
        case "REMOVE_UNIT":
            return {
                ...state,
                teachingPeriods: state.teachingPeriods.map((tp, index) => {
                    if (index === action.tpIndex) {
                        return {
                            ...tp,
                            units: [
                                ...tp.units.slice(0, action.unitIndex),
                                null,
                                ...tp.units.slice(action.unitIndex + 1)
                            ]
                        };
                    }

                    return tp;
                })
            };

        /*
            Resets the data structure to it's basic form, perhaps worth just returning state, but depends if the base state ever becomes more complex
        */
        case "CLEAR_COURSE":
            return {
                ...state,
                teachingPeriods: [],
                numberOfUnits: 4
            };

        case "FETCH_COURSE_INFO_PENDING":
            return {
                ...state,
                courseInfoLoading: true,
                courseInfoLoadError: false
            };

        case "FETCH_COURSE_INFO_FULFILLED":
            return {
                ...state,
                courseInfoLoading: false,
                focusedCourse: action.courseCode,
                courseInfo: {
                    courseName: action.payload.data.courseName,
                    faculty: action.payload.data.mangFac,
                    creditPoints: action.payload.data.creditPoints,
                    courseDescription: action.payload.data.courseDescrip,
                    durationStr: action.payload.data.courseDuration,
                    modeAndLocation: action.payload.data.modeLoc,
                    awards: action.payload.data.courseAward,
                    abrTitle: action.payload.data.abrevTitle
                }
            };

        case "FETCH_COURSE_INFO_REJECTED":
            return {
                ...state,
                courseInfoLoading: false,
                courseInfoLoadError: true
            };

        case "FETCH_COURSE_TEMPLATE_PENDING":
            return {
                ...state,
                courseLoading: true
            };

        case "FETCH_COURSE_TEMPLATE_FULFILLED":
            return {
                ...state,
                courseLoading: false,
                courseTemplateLoadError: false,
                courseTemplateData: action.payload.data
            };

        case "FETCH_COURSE_TEMPLATE_REJECTED":
            return {
                ...state,
                courseLoading: false,
                courseTemplateLoadError: true,
                courseTemplateData: null
            };

        case "FETCH_UNIT_INFO_PENDING":
            return {
                ...state,
                unitLoading: true,
                unitLoadError: false,
                unitInfo: defaultState.unitInfo
            };

        case "FETCH_UNIT_INFO_FULFILLED":
            return {
                ...state,
                unitLoading: false,
                unitInfo: action.payload.data,
                focusedUnitCode: action.unitCode
            };

        case "FETCH_UNIT_INFO_REJECTED":
            return {
                ...state,
                unitLoading: false,
                unitLoadError: true
            };


        case "FETCH_TEACHING_PERIODS_PENDING":
            return {
                ...state,
                teachingPeriodsDataLoading: true,
                teachingPeriodsDataError: false
            };

        case "FETCH_TEACHING_PERIODS_FULFILLED":
            return {
                ...state,
                teachingPeriodData: action.payload,
                teachingPeriodsDataLoading: false,
            };

        case "FETCH_TEACHING_PERIODS_REJECTED":
            return {
                ...state,
                teachingPeriodData: null,
                teachingPeriodsDataLoading: false,
                teachingPeriodsDataError: true
            };

        case "SUBMIT_COURSE_FORM":
            return {
                ...state,
                startYear: action.startYear,
                focusedCourse: action.courseCode
            };

        case "SUBMIT_YEAR_FORM":
            return {
                ...state,
                startYear: action.startYear,
                endYear: action.endYear
            };

        case "CHANGE_START_YEAR":
            return {
                ...state,
                startYear: action.year
            };

        case "SHOW_INSERT_TEACHING_PERIOD_UI":
            return {
                ...state,
                teachingPeriodCodeToInsert: action.tpCode
            };

        case "GET_NEXT_SEMESTER_STRING":
            return {
                ...state,
                nextSemesterString: getSemesterString(nextSemester(state.teachingPeriods, state.startYear, state.teachingPeriodData))
            };

        case "LOAD_NEW_TEACHING_PERIODS":
            return {
                ...state,
                teachingPeriods: action.value
            };

        case "GET_NEW_NUMBER_OF_UNITS":
            return {
                ...state,
                numberOfUnits: action.value
            };

        case "UPLOAD_COURSE_SNAPSHOT_PENDING":
            return {
                ...state,
                courseSnapshotUploading: true,
                courseSnapshotUploadError: false,
                courseSnapshotUploadSucessful: false
            };

        case "UPLOAD_COURSE_SNAPSHOT_FULFILLED":
            return {
                ...state,
                courseSnapshotUploading: false,
                courseSnapshotUploadData: action.payload.data,
                courseSnapshotUploadSucessful: true
                
            };

        case "UPLOAD_COURSE_SNAPSHOT_REJECTED":
            return {
                ...state,
                courseSnapshotUploading: false,
                courseSnapshotUploadError: true,
                courseSnapshotUploadData: null
            };

        case "FETCH_COURSE_SNAPSHOT_PENDING":
            return {
                ...state,
                courseSnapshotLoading: true,
                courseSnapshotLoadError: false,
            };

        case "FETCH_COURSE_SNAPSHOT_FULFILLED":
            return {
                ...state,
                courseSnapshotLoading: false,
                courseSnapshotData: action.payload.data
            };

        case "FETCH_COURSE_SNAPSHOT_REJECTED":
            return {
                ...state,
                courseSnapshotLoading: false,
                courseSnapshotLoadError: true,
                courseSnapshotData: null
            };

        case "UPDATE_AFFECTED_UNITS":
            return {
                ...state,
                affectedUnits: action.affectedUnits
            };

        case "UPDATE_INDEX_OF_TP_TO_REMOVE":
            return {
                ...state,
                indexOfTPtoRemove: action.index
            };


        case "UPDATE_UNIT_TO_ADD":
            return {
                ...state,
                unitToAdd: state.unitInfo
            };
        
        case "UPDATE_UNIT_IS_BEING_DRAGGED":
            return {
                ...state,
                unitIsBeingDragged: action.isDragging
            };

        case "MOVING_UNIT":
            return {
                ...state,
                unitToBeMoved: action.unit,
                tpIndexOfUnitToBeMoved: action.tpIndex,
                unitsIndexOfUnitToBeMoved: action.unitIndex
            };
        
        /**
         * Generates a course structure of semester one and semester two teaching
         * periods, given start year and end year. If start year and end year
         * are not specified, not in the right order, or they are too far
         * apart, then it will return an empty course structure.
         *
         * @author Eric Jiang, Saurabh Joshi
         * @param {number} startYear - When the student commences their course.
         * @param {number} endYear - When the student is expected to graduate.
         */
        case "GENERATE_COURSE": {
            if(action.startYear !== null && action.endYear !== null && action.endYear - action.startYear <= 12 && action.startYear <= action.endYear) {
                const teachingPeriods = [];

                for(let year = action.startYear; year <= action.endYear; year++) {
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

                    teachingPeriods.push(semesterOneTeachingPeriod);
                    teachingPeriods.push(semesterTwoTeachingPeriod);
                }

                return {
                    ...state,
                    teachingPeriods,
                    numberOfUnits: 4
                };
            }

            return {
                ...state,
                teachingPeriods: [],
                numberOfUnits: 4
            };
        }

        default:
            return state;
    }
};

export default CourseStructure;
