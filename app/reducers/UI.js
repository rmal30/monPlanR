
const defaultState = {
    showInsertTeachingPeriodUI: false,
    showMovingUnitUI: false,
    showAddingUnitUI: false
};

/**
 * @author JXNS
 * A simple reducer to handle UI state globally. I'm not entirely convinced this is a better way to manage it, however I do see that props 
 * that equate to these are passed around quite frequently within the courseStructure component, so I feel there is a need for this.
 */
const UI = (state = defaultState, action) => {

    switch (action.type) {
        
        case "SHOW_INSERT_TEACHING_PERIOD_UI":
            return Object.assign(
                {},
                state,
                {showInsertTeachingPeriodUI: true}
            );
        
        case "HIDE_INSERT_TEACHING_PERIOD_UI":
            return Object.assign(
                {},
                state,
                {showInsertTeachingPeriodUI: false}
            );
        
        case "SHOW_ADD_UNIT_UI":
            return Object.assign(
                {},
                state,
                {showAddingUnitUI: true}
            );
        
        case "HIDE_ADD_UNIT_UI":
            return Object.assign(
                {},
                state,
                {showAddingUnitUI: false}
            );
        
        case "SHOW_MOVE_UNIT_UI":
            return Object.assign(
                {},
                state,
                {showMovingUnitUI: true}
            );
        
        case "HIDE_MOVE_UNIT_UI":
            return Object.assign(
                {},
                state,
                {showMovingUnitUI: false}
            );

        
        default:
            return state;
    }
} ;

export default UI;