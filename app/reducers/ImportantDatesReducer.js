const defaultState = {
    importantDates: [],             // Eventually becomes the array of important dates from the API
    importantDatesLoading: false,   // Indicates whether the dates are loading from the API
    importantDatesError: false      // Indicates whether there was an error loading the dates from the API
};

/**
 * @author JXNS
 * The important dates reducer handles the data surrounding the array of important 
 * dates we load from Monash.
 */
const ImportantDatesReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "FETCH_IMPORTANT_DATES_PENDING":
            return {
                ...state,
                importantDatesLoading: true,
                importantDatesError: false
            };

        case "FETCH_IMPORTANT_DATES_REJECTED":
            return {
                ...state,
                importantDates: [],
                importantDatesLoading: false,
                importantDatesError: true
            };

        case "FETCH_IMPORTANT_DATES_FULFILLED":
            return {
                ...state,
                importantDates: action.payload,
                importantDatesLoading: false,
                importantDatesError: false
            };
        
        default: 
            return state;
    }
};


export default ImportantDatesReducer;