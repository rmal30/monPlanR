import React, { Component, PropTypes } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
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
        this.handleCancel = this.handleCancel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
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
     * If the user selects cancel, nothing happens and the modal closes
     */
    handleCancel() {
        this.props.hideConfirmDeleteTeachingPeriodUI();
    }

    /**
     * If the user presses confirm, the modal closes and the delete action is carried out by parent component
     */
    handleConfirm() {
        const { hideConfirmDeleteTeachingPeriodUI, removeTeachingPeriod, index, units } = this.props;
        
        hideConfirmDeleteTeachingPeriodUI();
        removeTeachingPeriod(index, units);
    }

    /**
     * on render we process the message that will be shown in the confirmation popup, if the state is set to open then we show the
     * modal, otherwise we just show the plain remove button
     */
    render() {
        let IDcount = 0;
        const { showingConfirmDeleteTeachingPeriodModal, affectedUnits } = this.props;
        if (this.props.showingConfirmDeleteTeachingPeriodModal) {
            return (
                <Modal
                    open={showingConfirmDeleteTeachingPeriodModal}
                    size="small">
                    <Modal.Header className="header-danger">
                        <p><Icon name="trash" />Are you sure you want to remove this teaching period?</p>
                    </Modal.Header>
                    <Modal.Content>
                        <div>
                            <p>Removing this teaching period will delete the following units from your course plan:</p>
                            <ul>{affectedUnits.map((item) => {return (<li key={item + IDcount++}>{item}</li>);})}</ul>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="btncancel" floated={"right"} onClick={this.handleConfirm}>Remove Teaching Period</Button>
                        <Button style={{borderRadius: "0px !important"}} onClick={this.handleCancel}>Cancel</Button>
                    </Modal.Actions>
                </Modal>
            );
        } else {
            return (
                <Button floated="right" onClick={this.handlePress} color="red" inverted size="tiny" icon="close" />
            );
        }
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
