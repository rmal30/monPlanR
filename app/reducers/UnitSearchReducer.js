const defaultState = {
    basicUnits: [],                 // The array of all units we have on record for searching purposes
    unitSearchIsLoading: false,     // Indicates whether the units are loading from API
    unitSearchError: false          // Indicates whether there was an error loading the units
};

/**
 * @author JXNS
 * The unit search reducer is in control of the slice of state representing the 
 * array of units currently offered by Monash. 
 */
const UnitSearchReducer = (state = defaultState, action) => {
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


export default UnitSearchReducer;