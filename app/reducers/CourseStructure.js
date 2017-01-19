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
            return state;
        
        case "ADD_TEACHING_PERIOD":
            return state;
        
        case "INCREASE_LOAD":
            return state;
        
        case "DECREASE_LOAD":
            return state;

        default:
            return state;
    }
};

export default CourseStructure;