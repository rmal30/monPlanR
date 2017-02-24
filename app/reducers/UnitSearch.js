const defaultState = {
    basicUnits: [],
    unitSearchIsLoading: false,
    unitSearchError: false
};

const UnitSearch = (state = defaultState, action) => {
    switch(action.type) {
        case "FETCH_UNITS_PENDING":
            return {
                ...state,
                basicUnits: [],
                unitSearchIsLoading: true,
                unitSearchError: false
            };

        case "FETCH_UNITS_FULFILLED":
            return {
                ...state,
                basicUnits: action.payload,
                unitSearchIsLoading: false,
            };

        case "FETCH_UNITS_REJECTED":
            return {
                ...state,
                basicUnits: [],
                unitSearchIsLoading: false,
                unitSearchError: true
            };
        
        default: 
            return state;
    }
};


export default UnitSearch;