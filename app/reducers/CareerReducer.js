const defaultState = {
    career: {},
    careerIsLoading: false,
    careerLoadError: false,
    relatedDegrees: [],
    relatedDegreesAreLoading: false,
    relatedDegreesError: false
};

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
                career: [],
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