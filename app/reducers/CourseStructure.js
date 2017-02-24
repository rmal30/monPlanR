import { getSemesterString, nextSemester } from "../utils/NextSemesterString";
import { validateCoursePlan, getInvalidUnitSlotCoordinates } from "../utils/ValidateCoursePlan";

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

    basicCourses: [],
    courseSearchIsLoading: false,
    courseSearchError: false,

    areasOfStudy: [],
    aosSearchIsLoading: false,
    aosSearchError: false,

    // Holds a list of placeholders where a unit is on top of it.
    hidingPlaceholders: [],

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
        preqs: "",
        creditPoints: 0,
        rules: [],
        locationAndTime: "",
        enjoyScore: 0,
        learnScore: 0,
        learnResponse: 0,
        proh: "",
        scaBand: 0,
        unitName: "",
        enjoyResponse: 0,
        faculty: "",
        unitCode: "",
        eftsl: 0,
        descriptions: ""
    },

    courseInfo: {
        courseCode: "",
        courseName: "",
        faculty: "",
        creditPoints: 0,
        courseDescription: "",
        durationStr: "",
        modeAndLocation: "",
        awards: "",
        abrTitle: ""
    },

    // Course errors is used for displaying course error messages.
    courseErrors: [],
    invalidUnitSlotCoordinates: [],

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
                    {year: action.year, totalCreditpoints: 0, code: action.code, units: new Array(state.numberOfUnits).fill(null)},
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
                        totalCreditpoints: 0,
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
        case "ADD_UNIT": {
            const hidingPlaceholders = [...state.hidingPlaceholders];
            if(state.teachingPeriods[action.tpIndex].units[action.unitIndex] && state.teachingPeriods[action.tpIndex].units[action.unitIndex].placeholder) {
                hidingPlaceholders.push({
                    coordinate: [action.tpIndex, action.unitIndex],
                    unit: state.teachingPeriods[action.tpIndex].units[action.unitIndex]
                });
            }

            return {
                ...state,
                unitToAdd: undefined, //reset unit after adding
                hidingPlaceholders,
                teachingPeriods: [
                    ...state.teachingPeriods.slice(0, action.tpIndex),
                    {
                        ...state.teachingPeriods[action.tpIndex],
                        totalCreditpoints: state.teachingPeriods[action.tpIndex].totalCreditpoints + action.unit.creditPoints,
                        units: [
                            ...state.teachingPeriods[action.tpIndex].units.slice(0, action.unitIndex),
                            action.unit,
                            ...state.teachingPeriods[action.tpIndex].units.slice(action.unitIndex + 1)
                        ]
                    },
                    ...state.teachingPeriods.slice(action.tpIndex + 1),
                ]
            };
        }

        /*
            Removes a unit at the given location from the course structure,
            first it finds the tp by finding array item at state.tpIndex,
            then it returns a unit array with the object at that location overwritten with
            null
        */
        case "REMOVE_UNIT": {
            const unitPlaceholderIndex = state.hidingPlaceholders.findIndex(unitPlaceholder => unitPlaceholder.coordinate[0] === action.tpIndex && unitPlaceholder.coordinate[1] === action.unitIndex);
            let unitPlaceholder;
            if(unitPlaceholderIndex > -1) {
                unitPlaceholder = {...state.hidingPlaceholders[unitPlaceholderIndex].unit};
            }

            return {
                ...state,
                hidingPlaceholders: unitPlaceholderIndex > -1 ? [...state.hidingPlaceholders.slice(0, unitPlaceholderIndex), ...state.hidingPlaceholders.slice(unitPlaceholderIndex + 1)] : [...state.hidingPlaceholders],

                teachingPeriods: state.teachingPeriods.map((tp, index) => {
                    if (index === action.tpIndex) {
                        return {
                            ...tp,
                            totalCreditpoints: Math.max(0, tp.totalCreditpoints - action.creditPoints),
                            units: [
                                ...tp.units.slice(0, action.unitIndex),
                                unitPlaceholder || null,
                                ...tp.units.slice(action.unitIndex + 1)
                            ]
                        };
                    }

                    return tp;
                })
            };
        }

        /*
            Resets the data structure to it's basic form, perhaps worth just returning state, but depends if the base state ever becomes more complex
        */
        case "CLEAR_COURSE":
            return {
                ...state,
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
                    courseCode: action.payload.data.propertyMap.courseCode,
                    courseName: action.payload.data.propertyMap.courseName,
                    faculty: action.payload.data.propertyMap.mangFac,
                    creditPoints: action.payload.data.propertyMap.creditPoints,
                    courseDescription: action.payload.data.propertyMap.courseDescrip.value,
                    durationStr: action.payload.data.propertyMap.courseDuration,
                    modeAndLocation: action.payload.data.propertyMap.modeLoc.value,
                    awards: action.payload.data.propertyMap.courseAward,
                    abrTitle: action.payload.data.propertyMap.abrevTitle
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
                courseTemplateData: action.payload.data.propertyMap
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
                unitLoadError: action.payload
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

        
        case "FETCH_COURSES_PENDING":
            return {
                ...state,
                courseSearchIsLoading: true,
                courseSearchError: false
            };

        case "FETCH_COURSES_FULFILLED":
            return {
                ...state,
                basicCourses: action.payload,
                courseSearchIsLoading: false,
            };

        case "FETCH_COURSES_REJECTED":
            return {
                ...state,
                basicCourses: [],
                courseSearchIsLoading: false,
                courseSearchError: true
            };

        case "FETCH_AOS_PENDING":
            return {
                ...state,
                aosSearchIsLoading: true,
                aosSearchError: false
            };

        case "FETCH_AOS_FULFILLED":
            return {
                ...state,
                areasOfStudy: action.payload,
                aosSearchIsLoading: false,
            };

        case "FETCH_AOS_REJECTED":
            return {
                ...state,
                areasOfStudy: [],
                aosSearchIsLoading: false,
                aosSearchError: true
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
                teachingPeriods: action.value,
                courseErrors: validateCoursePlan(action.value, state.courseInfo.courseCode)
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

        case "UPDATE_COURSE_INFO":
            return {
                ...state,
                courseInfo: action.courseInfo
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

        case "MODIFIED_COURSE_PLAN":
            return {
                ...state,
                courseSnapshotUploading: false,
                courseSnapshotUploadError: false,
                courseSnapshotUploadSucessful: false,
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
            if(action.customUnitToAdd) {
                return {
                    ...state,
                    unitToAdd: action.customUnitToAdd
                };
            } else {
                return {
                    ...state,
                    unitToAdd: action.unit
                };
            }

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

        case "CANCEL_MOVING_UNIT":
            return {
                ...state,
                unitToBeMoved: undefined,
                tpIndexOfUnitToBeMoved: undefined,
                unitsIndexOfUnitToBeMoved: undefined
            };

        case "CANCEL_ADDING_UNIT":
            return {
                ...state,
                unitToAdd: undefined
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

        /**
         * The ugliest handling of array immutability ever, I've attempted to do swaps with a slice but it still
         * seemed to violate the immutability of the arrays, the only way I can think to do this better is either look at
         * a) a framework like immutable.js to abstract these nasty complexities that come with immutability
         * b) investigate doing the swap in the action creator instead and then just feeding in the new teaching periods
         */
        case "MOVE_UNIT": {
            const hidingPlaceholders = [...state.hidingPlaceholders];
            if(state.teachingPeriods[action.newTPIndex].units[action.newUnitIndex] && state.teachingPeriods[action.newTPIndex].units[action.newUnitIndex].placeholder) {
                hidingPlaceholders.push({
                    coordinate: [action.newTPIndex, action.newUnitIndex],
                    unit: state.teachingPeriods[action.newTPIndex].units[action.newUnitIndex]
                });
            }

            const unitPlaceholderIndex = hidingPlaceholders.findIndex(unitPlaceholder => unitPlaceholder.coordinate[0] === state.tpIndexOfUnitToBeMoved && unitPlaceholder.coordinate[1] === state.unitsIndexOfUnitToBeMoved);
            let unitPlaceholder;
            if(unitPlaceholderIndex > -1) {
                unitPlaceholder = {...hidingPlaceholders[unitPlaceholderIndex].unit};
            }

            if(action.newTPIndex > state.tpIndexOfUnitToBeMoved){
                return {
                    ...state,
                    hidingPlaceholders: unitPlaceholderIndex > -1 ? [...hidingPlaceholders.slice(0, unitPlaceholderIndex), ...hidingPlaceholders.slice(unitPlaceholderIndex + 1)] : [...hidingPlaceholders],
                    teachingPeriods: [
                        ...state.teachingPeriods.slice(0, state.tpIndexOfUnitToBeMoved),
                        {
                            ...state.teachingPeriods[state.tpIndexOfUnitToBeMoved],
                            totalCreditpoints: Math.max(0, state.teachingPeriods[state.tpIndexOfUnitToBeMoved].totalCreditpoints - state.unitToBeMoved.creditPoints),
                            units: [
                                ...state.teachingPeriods[state.tpIndexOfUnitToBeMoved].units.slice(0, state.unitsIndexOfUnitToBeMoved),
                                unitPlaceholder || null,
                                ...state.teachingPeriods[state.tpIndexOfUnitToBeMoved].units.slice(state.unitsIndexOfUnitToBeMoved + 1)
                            ]
                        },
                        ...state.teachingPeriods.slice(state.tpIndexOfUnitToBeMoved + 1, action.newTPIndex),
                        {
                            ...state.teachingPeriods[action.newTPIndex],
                            totalCreditpoints: state.teachingPeriods[action.newTPIndex].totalCreditpoints + state.unitToBeMoved.creditPoints,
                            units: [
                                ...state.teachingPeriods[action.newTPIndex].units.slice(0, action.newUnitIndex),
                                state.unitToBeMoved,
                                ...state.teachingPeriods[action.newTPIndex].units.slice(action.newUnitIndex + 1)
                            ]
                        },
                        ...state.teachingPeriods.slice(action.newTPIndex + 1)

                    ],
                    unitToBeMoved: undefined,
                    tpIndexOfUnitToBeMoved: 0,
                    unitsIndexOfUnitToBeMoved: 0
                };
            } else if (action.newTPIndex === state.tpIndexOfUnitToBeMoved) {

                if(action.newUnitIndex > state.unitsIndexOfUnitToBeMoved) {
                    return {
                        ...state,
                        hidingPlaceholders: unitPlaceholderIndex > -1 ? [...hidingPlaceholders.slice(0, unitPlaceholderIndex), ...hidingPlaceholders.slice(unitPlaceholderIndex + 1)] : [...hidingPlaceholders],
                        teachingPeriods: [
                            ...state.teachingPeriods.slice(0, action.newTPIndex),
                            {
                                ...state.teachingPeriods[action.newTPIndex],
                                units: [
                                    ...state.teachingPeriods[action.newTPIndex].units.slice(0, state.unitsIndexOfUnitToBeMoved),
                                    unitPlaceholder || null,
                                    ...state.teachingPeriods[action.newTPIndex].units.slice(state.unitsIndexOfUnitToBeMoved + 1, action.newUnitIndex),
                                    state.unitToBeMoved,
                                    ...state.teachingPeriods[action.newTPIndex].units.slice(action.newUnitIndex + 1)
                                ]
                            },
                            ...state.teachingPeriods.slice(action.newTPIndex + 1)
                        ],
                        unitToBeMoved: undefined,
                        tpIndexOfUnitToBeMoved: 0,
                        unitsIndexOfUnitToBeMoved: 0
                    };
                } else if (state.unitsIndexOfUnitToBeMoved > action.newUnitIndex) {
                    return {
                        ...state,
                        hidingPlaceholders: unitPlaceholderIndex > -1 ? [...hidingPlaceholders.slice(0, unitPlaceholderIndex), ...hidingPlaceholders.slice(unitPlaceholderIndex + 1)] : [...hidingPlaceholders],
                        teachingPeriods: [
                            ...state.teachingPeriods.slice(0, action.newTPIndex),
                            {
                                ...state.teachingPeriods[action.newTPIndex],
                                units: [
                                    ...state.teachingPeriods[action.newTPIndex].units.slice(0, action.newUnitIndex),
                                    state.unitToBeMoved,
                                    ...state.teachingPeriods[action.newTPIndex].units.slice(action.newUnitIndex + 1, state.unitsIndexOfUnitToBeMoved),
                                    unitPlaceholder || null,
                                    ...state.teachingPeriods[action.newTPIndex].units.slice(state.unitsIndexOfUnitToBeMoved + 1)
                                ]
                            },
                            ...state.teachingPeriods.slice(action.newTPIndex + 1)
                        ],
                        unitToBeMoved: undefined,
                        tpIndexOfUnitToBeMoved: 0,
                        unitsIndexOfUnitToBeMoved: 0
                    };
                } else {
                    // the positions are exactly the same, so no need to change teaching periods
                    return {
                        ...state,
                        unitToBeMoved: undefined,
                        tpIndexOfUnitToBeMoved: 0,
                        unitsIndexOfUnitToBeMoved: 0
                    };
                }

            } else {
                return {
                    ...state,
                    hidingPlaceholders: unitPlaceholderIndex > -1 ? [...hidingPlaceholders.slice(0, unitPlaceholderIndex), ...hidingPlaceholders.slice(unitPlaceholderIndex + 1)] : [...hidingPlaceholders],
                    teachingPeriods: [
                        ...state.teachingPeriods.slice(0, action.newTPIndex),
                        {
                            ...state.teachingPeriods[action.newTPIndex],
                            totalCreditpoints: state.teachingPeriods[action.newTPIndex].totalCreditpoints + state.unitToBeMoved.creditPoints,
                            units: [
                                ...state.teachingPeriods[action.newTPIndex].units.slice(0, action.newUnitIndex),
                                state.unitToBeMoved,
                                ...state.teachingPeriods[action.newTPIndex].units.slice(action.newUnitIndex + 1)
                            ]
                        },
                        ...state.teachingPeriods.slice(action.newTPIndex + 1, state.tpIndexOfUnitToBeMoved),
                        {
                            ...state.teachingPeriods[state.tpIndexOfUnitToBeMoved],
                            totalCreditpoints: Math.max(0, state.teachingPeriods[state.tpIndexOfUnitToBeMoved].totalCreditpoints - state.unitToBeMoved.creditPoints),
                            units: [
                                ...state.teachingPeriods[state.tpIndexOfUnitToBeMoved].units.slice(0, state.unitsIndexOfUnitToBeMoved),
                                unitPlaceholder || null,
                                ...state.teachingPeriods[state.tpIndexOfUnitToBeMoved].units.slice(state.unitsIndexOfUnitToBeMoved + 1)
                            ]
                        },
                        ...state.teachingPeriods.slice(state.tpIndexOfUnitToBeMoved + 1)

                    ],
                    unitToBeMoved: undefined,
                    tpIndexOfUnitToBeMoved: 0,
                    unitsIndexOfUnitToBeMoved: 0
                };
            }
        }

        case "SWAP_UNIT":
            if(action.newTPIndex > state.tpIndexOfUnitToBeMoved){
                return {
                    ...state,
                    teachingPeriods: [
                        ...state.teachingPeriods.slice(0, state.tpIndexOfUnitToBeMoved),
                        {
                            ...state.teachingPeriods[state.tpIndexOfUnitToBeMoved],
                            units: [
                                ...state.teachingPeriods[state.tpIndexOfUnitToBeMoved].units.slice(0, state.unitsIndexOfUnitToBeMoved),
                                action.unitToSwap,
                                ...state.teachingPeriods[state.tpIndexOfUnitToBeMoved].units.slice(state.unitsIndexOfUnitToBeMoved + 1)
                            ]
                        },
                        ...state.teachingPeriods.slice(state.tpIndexOfUnitToBeMoved + 1, action.newTPIndex),
                        {
                            ...state.teachingPeriods[action.newTPIndex],
                            units: [
                                ...state.teachingPeriods[action.newTPIndex].units.slice(0, action.newUnitIndex),
                                state.unitToBeMoved,
                                ...state.teachingPeriods[action.newTPIndex].units.slice(action.newUnitIndex + 1)
                            ]
                        },
                        ...state.teachingPeriods.slice(action.newTPIndex + 1)

                    ],
                    unitToBeMoved: undefined,
                    tpIndexOfUnitToBeMoved: 0,
                    unitsIndexOfUnitToBeMoved: 0
                };
            } else if (action.newTPIndex === state.tpIndexOfUnitToBeMoved) {

                if(action.newUnitIndex > state.unitsIndexOfUnitToBeMoved) {
                    return {
                        ...state,
                        teachingPeriods: [
                            ...state.teachingPeriods.slice(0, action.newTPIndex),
                            {
                                ...state.teachingPeriods[action.newTPIndex],
                                units: [
                                    ...state.teachingPeriods[action.newTPIndex].units.slice(0, state.unitsIndexOfUnitToBeMoved),
                                    action.unitToSwap,
                                    ...state.teachingPeriods[action.newTPIndex].units.slice(state.unitsIndexOfUnitToBeMoved + 1, action.newUnitIndex),
                                    state.unitToBeMoved,
                                    ...state.teachingPeriods[action.newTPIndex].units.slice(action.newUnitIndex + 1)
                                ]
                            },
                            ...state.teachingPeriods.slice(action.newTPIndex + 1)
                        ],
                        unitToBeMoved: undefined,
                        tpIndexOfUnitToBeMoved: 0,
                        unitsIndexOfUnitToBeMoved: 0
                    };
                } else if (state.unitsIndexOfUnitToBeMoved > action.newUnitIndex) {
                    return {
                        ...state,
                        teachingPeriods: [
                            ...state.teachingPeriods.slice(0, action.newTPIndex),
                            {
                                ...state.teachingPeriods[action.newTPIndex],
                                units: [
                                    ...state.teachingPeriods[action.newTPIndex].units.slice(0, action.newUnitIndex),
                                    state.unitToBeMoved,
                                    ...state.teachingPeriods[action.newTPIndex].units.slice(action.newUnitIndex + 1, state.unitsIndexOfUnitToBeMoved),
                                    action.unitToSwap,
                                    ...state.teachingPeriods[action.newTPIndex].units.slice(state.unitsIndexOfUnitToBeMoved + 1)
                                ]
                            },
                            ...state.teachingPeriods.slice(action.newTPIndex + 1)
                        ],
                        unitToBeMoved: undefined,
                        tpIndexOfUnitToBeMoved: 0,
                        unitsIndexOfUnitToBeMoved: 0
                    };
                } else {
                    // the positions are exactly the same, so no need to change teaching periods
                    return {
                        ...state,
                        unitToBeMoved: undefined,
                        tpIndexOfUnitToBeMoved: 0,
                        unitsIndexOfUnitToBeMoved: 0
                    };
                }

            } else {
                return {
                    ...state,
                    teachingPeriods: [
                        ...state.teachingPeriods.slice(0, action.newTPIndex),
                        {
                            ...state.teachingPeriods[action.newTPIndex],
                            units: [
                                ...state.teachingPeriods[action.newTPIndex].units.slice(0, action.newUnitIndex),
                                state.unitToBeMoved,
                                ...state.teachingPeriods[action.newTPIndex].units.slice(action.newUnitIndex + 1)
                            ]
                        },
                        ...state.teachingPeriods.slice(action.newTPIndex + 1, state.tpIndexOfUnitToBeMoved),
                        {
                            ...state.teachingPeriods[state.tpIndexOfUnitToBeMoved],
                            units: [
                                ...state.teachingPeriods[state.tpIndexOfUnitToBeMoved].units.slice(0, state.unitsIndexOfUnitToBeMoved),
                                action.unitToSwap,
                                ...state.teachingPeriods[state.tpIndexOfUnitToBeMoved].units.slice(state.unitsIndexOfUnitToBeMoved + 1)
                            ]
                        },
                        ...state.teachingPeriods.slice(state.tpIndexOfUnitToBeMoved + 1)

                    ],
                    unitToBeMoved: undefined,
                    tpIndexOfUnitToBeMoved: 0,
                    unitsIndexOfUnitToBeMoved: 0
                };
            }

        case "VALIDATE_COURSE":
            return {
                ...state,
                courseErrors: validateCoursePlan(state.teachingPeriods, state.courseInfo && state.courseInfo.courseCode)
            };

        case "HIGHLIGHT_INVALID_UNIT_SLOTS":
            return {
                ...state,
                invalidUnitSlotCoordinates: getInvalidUnitSlotCoordinates(state.teachingPeriods, action.tempUnit, action.ignoreCoordinate),
                highlightingInvalidUnitSlots: true
            };

        case "CLEAR_HIGHLIGHTING_INVALID_UNIT_SLOTS":
            return {
                ...state,
                invalidUnitSlotCoordinates: [],
                highlightingInvalidUnitSlots: false
            };

        default:
            return state;
    }
};

export default CourseStructure;
