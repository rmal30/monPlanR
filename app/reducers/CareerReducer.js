const defaultState = {
    career: {},
    careerIsLoading: false,
    careerLoadError: false
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
        
        default:
            return state;
    }
};

export default Career;