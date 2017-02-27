const defaultState = {
    teachingPeriodData: null,           // Eventually becomes the array of teaching periods that are offered at Monash
    teachingPeriodsDataLoading: false,  // Indicates whether the teaching period dat is loading
    teachingPeriodsDataError: false     // Indicates whether there was an error loading the teaching periods
};

/**
 * @author JXNS
 * The teaching period data reducer handles the state surrounding the inital load of a list of 
 * teaching periods offered at Monash University. It is a fairly simple reducer as it just handles a single fetch cycle of 
 * a piece of data, and you see that reflected below in the Pending, fulfilled and rejected cases 
 */
const TeachingPeriodDataReducer = (state = defaultState, action) => {
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

export default TeachingPeriodDataReducer;