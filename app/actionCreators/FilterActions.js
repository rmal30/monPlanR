/**
UNPDATE FACULTY
*/
export const updateFacultyFilter = (facultyArray) => {
    return {
        type: "UPDATE_FACULTY_FILTER",
        facultyArray
    };
};
/**
UNPDATE LOCATION
*/
export const updateLocationFilter = (locationArray) => {
    return {
        type: "UPDATE_LOCATION_FILTER",
        locationArray
    };
};
/**
UNPDATE CREDIT POINT RANGE
*/
export const updateCreditPointRangeFilter = (min, max) => {
    return {
        type: "UPDATE_CREDITPOINTRANGE_FILTER",
        min,
        max
    };
};
/**
UNPDATE TEACHING PERIOD
*/
export const updateTeachingPeriodFilter = (teachingPeriodArray) => {
    return {
        type: "UPDATE_TEACHINGPERIOD_FILTER",
        teachingPeriodArray
    };
};
