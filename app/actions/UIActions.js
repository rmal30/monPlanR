/**
 * shows the insert teaching period UI
 */
export const showInsertTeachingPeriodUI = (tpCode) => {
    return {
        type: "SHOW_INSERT_TEACHING_PERIOD_UI",
        tpCode
    };
};

/**
 * hides the insert teaching period UI
 */
export const hideInsertTeachingPeriodUI = () => {
    return {
        type: "HIDE_INSERT_TEACHING_PERIOD_UI"
    };
};

/**
 * shows the adding unit UI
 */
export const showAddingUnitUI = () => {
    return {
        type: "SHOW_ADD_UNIT_UI"
    };
};

/**
 * hides the adding unit UI
 */
export const hideAddingUnitUI = () => {
    return {
        type: "HIDE_ADD_UNIT_UI"
    };
};

/**
 * shows the move unit UI
 */
export const showMoveUnitUI = () => {
    return {
        type: "SHOW_MOVE_UNIT_UI"
    };
};

/**
 * hides the move unit UI
 */
export const hideMoveUnitUI = () => {
    return {
        type: "HIDE_MOVE_UNIT_UI"
    };
};

/**
 * shows the confirm delete teaching period modal
 */
export const showConfirmDeleteTeachingPeriodUI = () => {
    return {
        type: "SHOW_CONFIRM_DELETE_TEACHING_PERIOD_MODAL"
    };
};

/**
 * hides the confirm delete teaching period modal
 */
export const hideConfirmDeleteTeachingPeriodUI = () => {
    return {
        type: "HIDE_CONFIRM_DELETE_TEACHING_PERIOD_MODAL"
    };
};

/**
 * shows the confirm decrease study load modal
 */
export const showConfirmDecreaseStudyLoadUI = () => {
    return {
        type: "SHOW_CONFIRM_DECREASE_STUDY_LOAD_MODAL"
    };
};

/**
 * hides the confirm decrease study load modal
 */
export const hideConfirmDecreaseStudyLoadUI = () => {
    return {
        type: "HIDE_CONFIRM_DECREASE_STUDY_LOAD_MODAL"
    };
};

/**
 * shows the custom unit modal
 */
export const showCustomUnitUI = unitCode => {
    return {
        type: "SHOW_CUSTOM_UNIT_MODAL",
        unitCode
    };
};

/**
 * hides the custom unit modal
 */
export const hideCustomUnitUI = () => {
    return {
        type: "HIDE_CUSTOM_UNIT_MODAL"
    };
};

/**
 * Shows the add unit sidebar
 */
export const showSidebar = () => {
    return {
        type: "SHOW_SIDEBAR"
    };
};

/**
 * hides the add unit sidebar
 */
export const hideSidebar = () => {
    return {
        type: "HIDE_SIDEBAR"
    };
};

/**
 * Sets the course to read only, for snapshot viewing purposes this means the user can safely 
 * view but not edit a course map
 */
export const setCourseReadOnly = () => {
    return {
        type: "SET_COURSE_READ_ONLY"
    };
};

/**
 * This lets the user edit and view a course map
 */
export const setCourseReadAndWrite = () => {
    return {
        type: "SET_COURSE_READ_AND_WRITE"
    };
};