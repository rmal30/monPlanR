const defaultState = {
    career: {},                         // the object that contains all the career details returned from the api
    careerIsLoading: false,             // indicates whether the career is loading
    careerLoadError: false,             // indicates whether there was an error loading the career
    relatedCourseKeys: [],              // from the careers API, which tells which courses to fetch
    relatedCourses: [],                 // an array of courses that are related to the career
    relatedCoursesAreLoading: false,    // these degrees may take longer to load so this indicates whether all the degrees are ready
    relatedCoursesError: false          // if there is an error with the degrees this bool reflects that
};

/**
 * @author JXNS, Saurabh Joshi
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

        case "FETCH_RELATED_COURSES_PENDING":
            return {
                ...state,
                relatedCourseKeys: action.relatedCourseKeys,
                relatedCoursesAreLoading: true,
                relatedCoursesError: false
            };

        case "FETCH_RELATED_COURSES_FULFILLED":
            return {
                ...state,
                relatedCourses: state.relatedCourseKeys && state.relatedCourseKeys.map(relatedCourseKey => {
                    const relatedCourse = {
                        ...action.payload[relatedCourseKey.code]
                    };

                    relatedCourse.areaOfStudy = relatedCourse.areaOfStudies && relatedCourse.areaOfStudies[relatedCourseKey.areaOfStudyCode];

                    return relatedCourse;
                }),
                relatedCoursesAreLoading: false,
            };

        case "FETCH_RELATED_COURSES_REJECTED":
            return {
                ...state,
                relatedCourses: [],
                relatedCoursesAreLoading: false,
                relatedCoursesError: true
            };

        default:
            return state;
    }
};

export default Career;
