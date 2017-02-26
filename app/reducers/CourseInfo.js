const defaultState = {
    courseInfoLoadError: false,
    courseInfoLoading: false,
    courseInfo: {
        courseCode: "",
        courseName: "",
        faculty: "",
        creditPoints: 0,
        courseDescription: "",
        durationStr: "",
        modeAndLocation: "",
        awards: "",
        abrTitle: ""
    },
};

const CourseInfo = (state = defaultState, action) => {
    switch(action.type) {
        
        case "CLEAR_COURSE":
            return {
                ...state,
                courseInfo: {
                    courseName: "",
                    faculty: "",
                    creditPoints: 0,
                    courseDescription: "",
                    durationStr: "",
                    modeAndLocation: "",
                    awards: "",
                    abrTitle: ""
                }
            };

        case "FETCH_COURSE_INFO_PENDING":
            return {
                ...state,
                courseInfoLoading: true,
                courseInfoLoadError: false
            };

        case "FETCH_COURSE_INFO_FULFILLED":
            return {
                ...state,
                courseInfoLoading: false,
                courseInfo: {
                    courseCode: action.payload.data.propertyMap.courseCode,
                    courseName: action.payload.data.propertyMap.courseName,
                    faculty: action.payload.data.propertyMap.mangFac,
                    creditPoints: action.payload.data.propertyMap.creditPoints,
                    courseDescription: action.payload.data.propertyMap.courseDescrip.value,
                    durationStr: action.payload.data.propertyMap.courseDuration,
                    modeAndLocation: action.payload.data.propertyMap.modeLoc.value,
                    awards: action.payload.data.propertyMap.courseAward,
                    abrTitle: action.payload.data.propertyMap.abrevTitle
                }
            };

        case "FETCH_COURSE_INFO_REJECTED":
            return {
                ...state,
                courseInfoLoading: false,
                courseInfoLoadError: true
            };
        
        default:
            return state;
    }
};

export default CourseInfo;