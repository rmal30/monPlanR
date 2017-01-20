/**
 * The CourseStructure reducer...
 * 
 * A teaching period
 */
const CourseStructure = (state = {teachingPeriods: [], numberOfUnits: 4}, action) => {
    
    switch(action.type) {

        // Inserts a teaching period with the given data at the given location
        case "INSERT_TEACHING_PERIOD":
            return Object.assign(
                {}, 
                state, 
                {teachingPeriods: [
                    ...state.teachingPeriods.slice(0, action.index),
                    {year: action.year, code: action.code, units: [null, null, null, null]},
                    ...state.teachingPeriods.slice(action.index)
                ]}
            );
            
        case "REMOVE_TEACHING_PERIOD":
            return Object.assign(
                {}, 
                state, 
                {teachingPeriods: [
                    ...state.teachingPeriods.slice(0, action.index),
                    ...state.teachingPeriods.slice(action.index + 1)
                ]}
            );
        
        case "ADD_TEACHING_PERIOD":
            return Object.assign(
                {}, 
                state, 
                {teachingPeriods: [
                    {year: action.year, code: action.code, units: new Array(state.numberOfUnits).fill(null)},
                    ...state.teachingPeriods
                ]}
            );
        
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