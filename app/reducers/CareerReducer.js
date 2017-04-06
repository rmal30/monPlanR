const defaultState = {
    career: {},                         // the object that contains all the career details returned from the api
    careerIsLoading: false,             // indicates whether the career is loading
    careerLoadError: false,             // indicates whether there was an error loading the career
    relatedDegrees: [],                 // an array of degree objects that are related to the career
    relatedDegreesAreLoading: false,    // these degrees may take longer to load so this indicates whether all the degrees are ready
    relatedDegreesError: false          // if there is an error with the degrees this bool reflects that
};

/**
 * @author JXNS
 * The career reducer is used to handle the data fetching and manipulation of 
 * career info and the degrees related to it. The actions follow the simple pattern of 
 * pending, fulfilled and rejected states for async work
 */
const Career = (state = defaultState, action) => {
    switch(action.type) {
        case "FETCH_CAREER_PENDING":
            return {
                ...state,
                careerIsLoading: true,
                careerLoadError: false
            };
        
        case "FETCH_CAREER_FULFILLED":
            return {
                ...state,
                career: action.payload,
                careerIsLoading: false
            };
        
        case "FETCH_CAREER_REJECTED":
            return {
                ...state,
                career: {},
                careerIsLoading: false,
                careerLoadError: true
            };
        
        case "FETCH_RELATED_DEGREES_PENDING":
            return {
                ...state,
                relatedDegreesAreLoading: true,
                relatedDegreesError: false
            };
        
        case "FETCH_RELATED_DEGREES_FULFILLED":
            return {
                ...state,
                relatedDegrees: action.payload,
                relatedDegreesAreLoading: false,
            };

        case "FETCH_RELATED_DEGREES_REJECTED":
            return {
                ...state,
                relatedDegrees: [],
                relatedDegreesAreLoading: false,
                relatedDegreesError: true
            };

        default:
            return state;
    }
};

export default Career;