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