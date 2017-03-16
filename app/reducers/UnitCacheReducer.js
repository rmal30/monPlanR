const defaultState = {
    timeOfLastAccess: 0,
    unitCache: {},
    cacheSize: 0,
    MAX_CACHE_SIZE: 20
};

/**
 * @author JXNS
 * The unit cache is just as it sounds, a cache for units. The api calls for unit info are not hugely 
 * costly, however users often make many unit info calls so it is in our interest to cache these results.
 * The cache currently operates as a simple initiliase on refresh cache, but I have designed it to be easily 
 * portable to a local storage saved cache in future (checking for stale data via the time of access values)
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