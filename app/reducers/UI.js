
const defaultState = {
    showingInsertTeachingPeriodUI: false,
    showMovingUnitUI: false,
    showAddingUnitUI: false,
    readOnly: false,
    showingConfirmDeleteTeachingPeriodModal: false,
    showingConfirmDecreaseStudyLoadModal: false,
    showingSidebar: false
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
        
        case "SHOW_ADD_UNIT_UI":
            return {
                ...state,
                showAddingUnitUI: true
            };
        
        case "HIDE_ADD_UNIT_UI":
            return {
                ...state,
                showAddingUnitUI: false
            };
        
        case "SHOW_MOVE_UNIT_UI":
            return {
                ...state,
                showMovingUnitUI: true
            };
        
        case "HIDE_MOVE_UNIT_UI":
            return {
                ...state,
                showMovingUnitUI: false
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


        case "ADDING_UNIT":
            return {
                ...state,
                showingSidebar: false
            };
        
        default:
            return state;
    }
} ;

export default UI;