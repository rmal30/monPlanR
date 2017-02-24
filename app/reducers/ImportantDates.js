const defaultState = {
    importantDates: [],
    importantDatesLoading: false,
    importantDatesError: false
};

const ImportantDates = (state = defaultState, action) => {
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


export default ImportantDates;