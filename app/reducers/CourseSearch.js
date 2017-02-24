const defaultState = {
    basicCourses: [],
    courseSearchIsLoading: false,
    courseSearchError: false,
    areasOfStudy: [],
    aosSearchIsLoading: false,
    aosSearchError: false
};

const CourseSearch = (state = defaultState, action) => {
    switch(action.type) {
        case "FETCH_COURSES_PENDING":
            return {
                ...state,
                courseSearchIsLoading: true,
                courseSearchError: false
            };

        case "FETCH_COURSES_FULFILLED":
            return {
                ...state,
                basicCourses: action.payload,
                courseSearchIsLoading: false,
            };

        case "FETCH_COURSES_REJECTED":
            return {
                ...state,
                basicCourses: [],
                courseSearchIsLoading: false,
                courseSearchError: true
            };

        case "FETCH_AOS_PENDING":
            return {
                ...state,
                aosSearchIsLoading: true,
                aosSearchError: false
            };

        case "FETCH_AOS_FULFILLED":
            return {
                ...state,
                areasOfStudy: action.payload,
                aosSearchIsLoading: false,
            };

        case "FETCH_AOS_REJECTED":
            return {
                ...state,
                areasOfStudy: [],
                aosSearchIsLoading: false,
                aosSearchError: true
            };
        
        default:
            return state;
    }
};

export default CourseSearch;