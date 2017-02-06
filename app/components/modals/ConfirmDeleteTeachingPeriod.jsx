import React, { Component, PropTypes } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/CourseActions";
import * as uiActions from "../../actions/UIActions";
/**
 * @author JXNS
 * @param {array} units - The unit object array used in the teaching period, this is necessary to know what units a teaching period contains
 * @param {array} unitArray - The array of unitcode strings that is extracted from the unit array
 */
class ConfirmDeleteTeachingPeriod extends Component {

    /**
     * Sets up initial state and binds the functions
     */
    constructor(props) {
        super(props);

        this.handlePress = this.handlePress.bind(this);
    }

    /**
     * handles the initial pressing of the remove button. It then processes the current unit array. If the unit array is empty,
     * then it can jump straight to deleting the teaching period, however, if there are units in the array, then the confirmation modal
     * is triggered to open
     */
    handlePress() {
        const { attemptToDeleteTeachingPeriod, index, units } = this.props;
        attemptToDeleteTeachingPeriod(index, units);
    }

    /**
     * on render we process the message that will be shown in the confirmation popup, if the state is set to open then we show the
     * modal, otherwise we just show the plain remove button
     */
    render() {
        return (
            <Button floated="right" onClick={this.handlePress} color="red" inverted size="tiny" icon="close" />
        );
    }
}

/**
 * To confirm delete teaching period we need the bool representing whether the confirmation modal should be shown, 
 * and also need the units that would be affected by a deletion
 */
const mapStateToProps = (state) => {
    return {
        affectedUnits: state.CourseStructure.affectedUnits,
        showingConfirmDeleteTeachingPeriodModal: state.UI.showingConfirmDeleteTeachingPeriodModal
    };
};

/**
 * We need the removeTeachingPeriod and attemptToDeleteTeachingPeriod functions from courseActions, and need 
 * the show and hide confirmDeleteTeachingPeriodModal functions from uiActions
 */
const mapDispatchToProps = (dispatch) => {
    const actionBundle = {...courseActions, ...uiActions};
    return bindActionCreators(actionBundle, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteTeachingPeriod);

ConfirmDeleteTeachingPeriod.propTypes = {
    affectedUnits: PropTypes.array,
    removeTeachingPeriod: PropTypes.func,
    index: PropTypes.number,
    getAffectedUnitsInRow: PropTypes.func,
    showingConfirmDeleteTeachingPeriodModal: PropTypes.bool,
    hideConfirmDeleteTeachingPeriodUI: PropTypes.func,
    showConfirmDeleteTeachingPeriodUI: PropTypes.func,
    attemptToDeleteTeachingPeriod: PropTypes.func,
    units: PropTypes.array
};
