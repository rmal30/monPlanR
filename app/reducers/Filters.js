const defaultState = {
    faculty: [],
    location: [],
    creditPointRange: {min:0, max:48}
};

const Filters = (state = defaultState, action) => {
    switch (action.type) {
        case "UPDATE_FACULTY_FILTER":
            return {
                ...state,
                faculty: [action.facultyArray]
            };
        case "UPDATE_LOCATION_FILTER":
            return {
                ...state,
                location: [action.locationArray]
            };
        case "UPDATE_CREDITPOINTRANGE_FILTER":
            return {
                ...state,
                creditPointRange: [action.creditPointRangeArray]
            };
        default:
            return state;
    }
};

export default Filters;
