const defaultState = {
    timeOfLastAccess: 0,
    unitCache: {},
    cacheSize: 0,
    MAX_CACHE_SIZE: 20
};

/**
 * @author JXNS
 */
const UnitCacheReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "INITIALISE_NEW_CACHE": //if the cache is invalid or there is nothing saved in local storage then we create a fresh one
            return {
                ...defaultState,
                timeOfLastAccess: action.timeOfAccess
            };
        
        case "REMOVE_ITEM_FROM_CACHE":
            return {
                ...state,
                cacheSize: state.cacheSize - 1,
                unitCache: Object.keys(state.unitCache).reduce((unitCache, key) => {
                    if(key !== action.keyValueToDelete) {
                        unitCache[key] = state.unitCache[key];
                    }
                    return unitCache;
                }, {})
            };

        case "ADD_ITEM_TO_CACHE":
            return {
                ...state,
                timeOfLastAccess: action.timeOfAccess,
                cacheSize: state.cacheSize + 1,
                unitCache: {
                    ...state.unitCache,
                    [action.unitCode]: {
                        timeOfLastAccess: action.timeOfAccess,
                        unitInfo: action.unitInfo
                    }
                }
            };

        default:
            return state;
    }
};

export default UnitCacheReducer;