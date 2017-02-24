const defaultState = {
    teachingPeriodData: null,
    teachingPeriodsDataLoading: false,
    teachingPeriodsDataError: false
};

const TeachingPeriodData = (state = defaultState, action) => {
    switch(action.type) {
        case "FETCH_TEACHING_PERIODS_PENDING":
            return {
                ...state,
                teachingPeriodsDataLoading: true,
                teachingPeriodsDataError: false
            };

        case "FETCH_TEACHING_PERIODS_FULFILLED":
            return {
                ...state,
                teachingPeriodData: action.payload,
                teachingPeriodsDataLoading: false,
            };

        case "FETCH_TEACHING_PERIODS_REJECTED":
            return {
                ...state,
                teachingPeriodData: null,
                teachingPeriodsDataLoading: false,
                teachingPeriodsDataError: true
            };
        default:
            return state;
    }
};

export default TeachingPeriodData;