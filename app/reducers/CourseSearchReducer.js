const defaultState = {
    basicCourses: [],               // Eventually is populated with an array of course objects, each with course name, course code etc
    courseSearchIsLoading: false,   // Indicates whether the course search results (represented by basicCourses[] above) have loaded
    courseSearchError: false,       // Indicates whether the course search results API call failed
    areasOfStudy: [],               // Eventually is populated with an array of area of study objects, with area of study codes/names etc
    aosSearchIsLoading: false,      // Indicates whether the area of study results (represented by areasOfStudy[] above) have loaded
    aosSearchError: false           // Indicates whether the area of study API call failed
};

/**
 * @author JXNS
 * The Course search reducer handles the state needed by course forms (course lists and areas of study).
 * In addition to this, because the loading of course lists and later, areas of study is async, we also need loading 
 * booleans and error booleans to help manage the load outcomes. 
 */
const CourseSearchReducer = (state = defaultState, action) => {
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

export default CourseSearchReducer;