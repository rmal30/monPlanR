const defaultState = {
    careers: [],
    careersAreLoading: false,
    careersLoadError: false
};

const Careers = (state = defaultState, action) => {
    switch(action.type) {
        case "FETCH_CAREERS_PENDING":
            return {
                ...state,
                careersAreLoading: true,
                careersLoadError: false
            };
        
        case "FETCH_CAREERS_FULFILLED":
            return {
                ...state,
                careers: action.payload,
                careersAreLoading: false
            };
        
        case "FETCH_CAREERS_REJECTED":
            return {
                ...state,
                careers: [],
                careersAreLoading: false,
                careersLoadError: true
            };
        
        default:
            return state;
    }
};

export default Careers;