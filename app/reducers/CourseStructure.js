/**
 * @author JXNS
 * The CourseStructure reducer is the most complex state to manage as it forms the core of the app.
 * The data structrue overview can be determied by looking at the default state of the reducer, but 
 * note that there are certain complexities not represented in here alone. 
 * 
 * I will not pretend that these action handlers follow a strictly consistent contract with the functions that call them,
 * but in general they will trust that they are being called correctly to reduce complexity (not checking for index out of bounds errors etc)
 */
const CourseStructure = (state = {teachingPeriods: [], numberOfUnits: 4}, action) => {
    
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
            Adds a teaching period to the end of the array with the given data
        */
        case "ADD_TEACHING_PERIOD":
            return Object.assign(
                {}, 
                state, 
                {teachingPeriods: [
                    {year: action.year, code: action.code, units: new Array(state.numberOfUnits).fill(null)},
                    ...state.teachingPeriods
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
                                ...state.units.slice(0, action.unitIndex),
                                action.unit,
                                ...state.units.slice(action.index + 1)
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
                                ...state.units.slice(0, action.unitIndex),
                                null,
                                ...state.units.slice(action.index + 1)
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
        
        default:
            return state;
    }
};

export default CourseStructure;