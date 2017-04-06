const defaultState = {
    careers: [],                // the array of all careers you can choose from
    careersAreLoading: false,   // whether or not the careers are still loading
    careersLoadError: false     // whether or not there was an error loading the careers
};

/**
 * @author JXNS
 * The careers reducer handles the initial loading of all the possible careers 
 * into the application, these careers have id's that are later used to link to 
 * the more detailed career data. 
 */
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