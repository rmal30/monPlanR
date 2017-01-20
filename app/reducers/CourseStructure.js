/**
 * The CourseStructure reducer...
 * 
 * A teaching period
 */
const CourseStructure = (state = {teachingPeriods: [], units: 4}, action) => {
    
    switch(action.type) {

        // Inserts a teaching period with the given data at the given location
        case "INSERT_TEACHING_PERIOD":
            return Object.assign({}, state, 
                {teachingPeriods: [
                    ...state.teachingPeriods.slice(0, action.index),
                    {year: action.year, code: action.code, units: []},
                    ...state.teachingPeriods.slice(action.index)
                ]}
            );
            
        case "REMOVE_TEACHING_PERIOD":
            return Object.assign({}, state, 
                {teachingPeriods: [
                    ...state.teachingPeriods.slice(0, action.index),
                    ...state.teachingPeriods.slice(action.index + 1)
                ]}
            );
        
        case "ADD_TEACHING_PERIOD":
            return Object.assign({}, state, 
                {teachingPeriods: [
                    {year: action.year, code: action.code, units: []},
                    ...state.teachingPeriods
                ]}
            );
        
        case "INCREASE_STUDY_LOAD":
            if(state.units >= 6) {
                return Object.assign({}, state, {
                    units: 6
                });
            } else {
                return Object.assign({}, state, {
                    units: state.units + 1
                });
            }
            
        
        case "DECREASE_STUDY_LOAD":
            if(state.units <= 4) {
                return Object.assign({}, state, {
                    units: 4
                });
            } else {
                return Object.assign({}, state, {
                    units: state.units - 1
                });
            }

        default:
            return state;
    }
};

export default CourseStructure;