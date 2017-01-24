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
    courseLoading: false,
    unitLoading: false,
    unitLoadError: false,
    courseInfoLoadError: false,
    courseTemplateLoadError: false,
    data: null,
    unitInfo: null,
    focusedUnitCode: null
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
            return Object.assign(
                {},
                state,
                {teachingPeriods: [
                    ...state.teachingPeriods.slice(0, action.index),
                    {year: action.year, code: action.code, units: new Array(state.numberOfUnits).fill(null)},
                    ...state.teachingPeriods.slice(action.index)
                ]}
            );

        /*
            Removes a teaching period located at the given index
        */
        case "REMOVE_TEACHING_PERIOD":
            return Object.assign(
                {}, 
                state, 
                {teachingPeriods: [
                    ...state.teachingPeriods.slice(0, action.index),
                    ...state.teachingPeriods.slice(action.index + 1)
                ]}
            );

        /*
            Appends a teaching period to the end of the array with the given data
        */
        case "APPEND_TEACHING_PERIOD":
            return Object.assign(
                {},
                state,
                {teachingPeriods: [
                    ...state.teachingPeriods,
                    {year: action.year, code: action.code, units: new Array(state.numberOfUnits).fill(null)}
                ]}
            );

        /*
            Increases the number of units a student can take in all of the teaching periods. If the number of units is already at it's max
            it will stop the state from being broken, otherwise it will increase the number by one and also append a blank unit to the end of
            each teaching period array
        */
        case "INCREASE_STUDY_LOAD":
            if(state.numberOfUnits >= 6) {
                return Object.assign(
                    {}, 
                    state, 
                    {numberOfUnits: 6}
                );
            } else {
                return Object.assign(
                    {},
                    state,
                    {numberOfUnits: state.numberOfUnits + 1},
                    {teachingPeriods: state.teachingPeriods.map(tp => {
                        return Object.assign(
                            {},
                            tp,
                            {units: [...tp.units, null]}
                        );
                    })} 
                );
            }
        
        /*
            Decreases the number of units a student can take in all of the teaching periods. If the number of units is already at it's min
            it will stop the state from being broken, otherwise it will decrease the number by one and also remove the last unit from each teaching array
        */
        case "DECREASE_STUDY_LOAD":
            if(state.numberOfUnits <= 4) {
                return Object.assign(
                    {},
                    state,
                    {numberOfUnits: 4}
                );
            } else {
                return Object.assign(
                    {},
                    state,
                    {numberOfUnits: state.numberOfUnits - 1},
                    {teachingPeriods: state.teachingPeriods.map(tp => {
                        return Object.assign(
                            {},
                            tp,
                            {units: tp.units.slice(0, state.numberOfUnits-1)}
                        );
                    })}
                );
            }

        /*
            Adds a unit with the given details to course structure at the given location
        */
        case "ADD_UNIT":
            return Object.assign(
                {},
                state,
                {teachingPeriods: state.teachingPeriods.map((tp, index) => {
                    if (index === action.tpIndex) {
                        return Object.assign(
                            {},
                            tp,
                            {units: [
                                ...tp.units.slice(0, action.unitIndex),
                                action.unit,
                                ...tp.units.slice(action.unitIndex + 1)
                            ]}
                        );
                    } else {
                        return tp;
                    }
                })}
            );
  
        /*
            Removes a unit at the given location from the course structure,
            first it finds the tp by finding array item at state.tpIndex,
            then it returns a unit array with the object at that location overwritten with
            null
        */
        case "REMOVE_UNIT":
            return Object.assign(
                {},
                state,
                {teachingPeriods: state.teachingPeriods.map((tp, index) => {
                    if (index === action.tpIndex) {
                        return Object.assign(
                            {},
                            tp,
                            {units: [
                                ...tp.units.slice(0, action.unitIndex),
                                null,
                                ...tp.units.slice(action.unitIndex + 1)
                            ]}
                        );
                    } else {
                        return tp;
                    }
                })}
            );

        /*
            Resets the data structure to it's basic form, perhaps worth just returning state, but depends if the base state ever becomes more complex
        */
        case "CLEAR_COURSE":
            return {
                teachingPeriods: [],
                numberOfUnits: 4
            };
        
        case "FETCH_COURSE_INFO_PENDING":
            return Object.assign(
                {},
                state,
                {courseLoading: true}
            );
        
        case "FETCH_COURSE_INFO_FULFILLED":
            return Object.assign(
                {},
                state,
                {courseLoading: false, courseInfoLoadError: false, data: action.payload}
            );

        case "FETCH_COURSE_INFO_REJECTED":
            return Object.assign(
                {},
                state,
                {courseLoading: false, courseInfoLoadError: true, data: null}
            );
        
        case "FETCH_COURSE_TEMPLATE_PENDING":
            return Object.assign(
                {},
                state,
                {courseLoading: true}
            );
        
        case "FETCH_COURSE_TEMPLATE_FULFILLED":
            return Object.assign(
                {},
                state,
                {courseLoading: false, courseTemplateLoadError: false, data: action.payload}
            );
        
        case "FETCH_COURSE_TEMPLATE_REJECTED":
            return Object.assign(
                {},
                state,
                {courseLoading: false, courseTemplateLoadError: true, data: null}
            );
        
        case "FETCH_UNIT_INFO_PENDING":
            return Object.assign(
                {},
                state,
                {unitLoading: true, unitLoadError: false}
            );
        
        case "FETCH_UNIT_INFO_FULFILLED":
            return Object.assign(
                {},
                state,
                {unitLoading: false, unitInfo: action.payload.data}
            );
        
        case "FETCH_UNIT_INFO_REJECTED":
            return Object.assign(
                {},
                state,
                {unitLoading: false, unitLoadError: true, unitInfo: null}
            );
        
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
                    teachingPeriods,
                    numberOfUnits: 4
                };
            }

            return {
                teachingPeriods: [],
                numberOfUnits: 4
            };
        }

        default:
            return state;
    }
};

export default CourseStructure;
