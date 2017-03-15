/**
 * Initialises a new new cache, also sets the first time of access
 * value
 */
export const initialiseCache = (timeOfAccess) => {
    return {
        type: "INITIALISE_NEW_CACHE",
        timeOfLastAccess: timeOfAccess
    };
};

/**
 * Removes an item from the cache with the given unitcode as a 
 * key value
 */
export const removeItemFromCache = (unitCode) => {
    return {
        type: "REMOVE_ITEM_FROM_CACHE",
        keyValueToDelete: unitCode
    };
};

/**
 * Adds an item to the cache, it will have the unitcode as it's key, and the unit info and 
 * time of access will be part of the data associated with the key
 */
export const addItemToCache = (timeOfAccess, unitCode, unitInfo) => {
    return {
        type: "ADD_ITEM_TO_CACHE",
        timeOfLastAccess: timeOfAccess,
        unitCode,
        unitInfo
    };
};