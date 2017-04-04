
const defaultState = {
    showingInsertTeachingPeriodUI: false,
    showingMovingUnitUI: false,
    showingAddingUnitUI: false,
    readOnly: false,
    showingConfirmDeleteTeachingPeriodModal: false,
    showingCustomUnitModal: false,
    showingConfirmDecreaseStudyLoadModal: false,
    showingSidebar: false,
    showingPalette: false
};

/**
 * @author JXNS
 * A simple reducer to handle UI state globally. I'm not entirely convinced this is a better way to manage it, however I do see that props
 * that equate to these are passed around quite frequently within the courseStructure component, so I feel there is a need for this.
 */
const UI = (state = defaultState, action) => {

    switch (action.type) {

        case "SHOW_INSERT_TEACHING_PERIOD_UI":
            return {
                ...state,
                showingInsertTeachingPeriodUI: true
            };

        case "HIDE_INSERT_TEACHING_PERIOD_UI":
            return {
                ...state,
                showingInsertTeachingPeriodUI: false
            };

        case "ADDING_UNIT":
            return {
                ...state,
                showingAddingUnitUI: true,
                showingSidebar: false
            };

        case "ADD_UNIT":
        case "CANCEL_ADDING_UNIT":
            return {
                ...state,
                showingAddingUnitUI: false
            };

        case "MOVING_UNIT":
            return {
                ...state,
                showingMovingUnitUI: true
            };

        case "MOVE_UNIT":
        case "SWAP_UNIT":
        case "CANCEL_MOVING_UNIT":
            return {
                ...state,
                showingMovingUnitUI: false
            };

        case "SET_COURSE_READ_ONLY":
            return {
                ...state,
                readOnly: true
            };

        case "SET_COURSE_READ_AND_WRITE":
            return {
                ...state,
                readOnly: false
            };

        case "SHOW_CONFIRM_DELETE_TEACHING_PERIOD_MODAL":
            return {
                ...state,
                showingConfirmDeleteTeachingPeriodModal: true
            };

        case "HIDE_CONFIRM_DELETE_TEACHING_PERIOD_MODAL":
            return {
                ...state,
                showingConfirmDeleteTeachingPeriodModal: false
            };

        case "SHOW_CONFIRM_DECREASE_STUDY_LOAD_MODAL":
            return {
                ...state,
                showingConfirmDecreaseStudyLoadModal: true
            };

        case "HIDE_CONFIRM_DECREASE_STUDY_LOAD_MODAL":
            return {
                ...state,
                showingConfirmDecreaseStudyLoadModal: false
            };

        case "SHOW_CUSTOM_UNIT_MODAL":
            return {
                ...state,
                showingCustomUnitModal: true,
                customUnitCode: action.unitCode,
                customTpIndex: action.tpIndex,
                customUnitIndex: action.unitIndex
            };

        case "HIDE_CUSTOM_UNIT_MODAL":
            return {
                ...state,
                showingCustomUnitModal: false
            };

        case "SHOW_SIDEBAR":
            return {
                ...state,
                showingSidebar: true
            };

        case "HIDE_SIDEBAR":
            return {
                ...state,
                showingSidebar: false
            };

        case "TOGGLE_PALETTE":
            return {
                ...state,
                showingPalette: !state.showingPalette
            };

        default:
            return state;
    }
} ;

export default UI;
