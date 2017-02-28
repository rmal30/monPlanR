export const updateFacultyFilter = (facultyArray) => {
    return {
        type: "UPDATE_FACULTY_FILTER",
        facultyArray
    };
};

export const updateLocationFilter = (locationArray) => {
    return {
        type: "UPDATE_LOCATION_FILTER",
        locationArray
    };
};

export const updateCreditPointRangeFilter = (creditPointRangeArray) => {
    return {
        type: "UPDATE_CREDITPOINTRANGE_FILTER",
        creditPointRangeArray
    };
};
