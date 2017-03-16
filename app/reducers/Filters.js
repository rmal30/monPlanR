const defaultState = {
    faculty: [],
    location: [],
    creditPointRange: {min:0, max:48},
    teachingPeriod: []
};
/***
    These are the filter reducers. 
*/
const Filters = (state = defaultState, action) => {
    switch (action.type) {
        case "UPDATE_FACULTY_FILTER":
            return {
                ...state,
                faculty: action.facultyArray
            };
        case "UPDATE_LOCATION_FILTER":
            return {
                ...state,
                location: action.locationArray
            };
        case "UPDATE_CREDITPOINTRANGE_FILTER":
            return {
                ...state,
                creditPointRange: {
                    min: action.min,
                    max: action.max
                }
            };
        case "UPDATE_TEACHINGPERIOD_FILTER":
            return {
                ...state,
                teachingPeriod: action.teachingPeriodArray
            };
        default:
            return state;
    }
};

export default Filters;
