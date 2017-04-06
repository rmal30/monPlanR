import React, { Component, PropTypes } from "react";
import { Button, Icon, Popup, Modal } from "semantic-ui-react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actionCreators/CourseActions";
import * as uiActions from "../../actionCreators/UIActions";



/**
 * @author JXNS
 * @param {boolean} isDisabled - parent component controls when the button should be disabled
 * @param {function} getAffectedUnits - parent component calculates all units that would be affected by the remove and returns them in an array
 * @param {function} handleRemove - when user confirms deletion, this function is called to handle the removal of overload column
 */
class ConfirmDeleteOverload extends Component {

    /**
     * sets up start values, modal should not be opened at start and unitArray is empty
     */
    constructor(props) {
        super(props);

        this.handlePress = this.handlePress.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    /**
     * When the user presses the remove button, the parent calculates what (if any) units will be affected and returns them in an array.
     * If the array is empty, the parent can safely remove, if the array has values, then the confirm modal is displayed
     */
    handlePress() {
        const { teachingPeriods, numberOfUnits, attemptToDecreaseStudyLoad } = this.props;
        attemptToDecreaseStudyLoad(teachingPeriods, numberOfUnits - 1);
    }

    /**
     * The modal closes and the overload column is not affected if user presses cancel
     */
    handleCancel() {
        this.props.hideConfirmDecreaseStudyLoadUI();
    }

    /**
     * user confirms, the modal is closed and parents handles removal.
     */
    handleConfirm() {
        const { decreaseStudyLoad, teachingPeriods, numberOfUnits, hideConfirmDecreaseStudyLoadUI } = this.props;
        hideConfirmDecreaseStudyLoadUI();
        decreaseStudyLoad(teachingPeriods, numberOfUnits - 1);
    }

    /**
     * Construct list of affected items in message for modal, if the modal is not open then show a button
     */
    render() {
        let IDcount = 0;
        const { mobile, numberOfUnits, teachingPeriods, showingConfirmDecreaseStudyLoadModal } = this.props;
        const isDisabled = (numberOfUnits <= 4 || teachingPeriods.length === 0);
        const message = (<div>
                            <p>Removing this overload column will delete the following units from your course plan:</p>
                            <ul>{this.props.affectedUnits.map((item) => {return (<li key={item + IDcount++}>{item}</li>);})}</ul>
                        </div>);
        
        if (showingConfirmDecreaseStudyLoadModal) {
            return (
                <Modal
                    open={showingConfirmDecreaseStudyLoadModal}
                    size="small">
                    <Modal.Header className="header-danger">
                        <p><Icon name="trash" />Are you sure you want to remove overload column?</p>
                    </Modal.Header>
                    <Modal.Content>{message}</Modal.Content>
                    <Modal.Actions>
                        <Button className="btncancel" color='red' floated="right" onClick={this.handleConfirm}>Remove Column</Button>
                        <Button className="btnlightcancel" onClick={this.handleCancel}>Cancel</Button>
                    </Modal.Actions>
                </Modal>
            );
        } else {
            return (
                <Popup
                    trigger={<Button 
                                icon="minus" 
                                labelPosition={mobile ? "left" : undefined} 
                                className="no-print" 
                                disabled={isDisabled} 
                                onClick={this.handlePress} 
                                color="red" 
                                floated={!mobile ? "right" : undefined} 
                                fluid={mobile} 
                                content={mobile ? "Remove overload column" : ""} />}
                    content="Removes last column from your course plan."
                    size='mini'
                    positioning='bottom center'
                />
            );
        }
    }
}

/**
 * 
 */
const mapStateToProps = (state) => {
    return {
        numberOfUnits: state.CourseStructure.numberOfUnits,
        teachingPeriods: state.CourseStructure.teachingPeriods,
        showingConfirmDecreaseStudyLoadModal: state.UI.showingConfirmDecreaseStudyLoadModal,
        affectedUnits: state.CourseStructure.affectedUnits
    };
};

/**
 * 
 */
const mapDispatchToProps = (dispatch) => {
    const actionBundle = {...courseActions, ...uiActions};
    return bindActionCreators(actionBundle, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteOverload);

ConfirmDeleteOverload.propTypes = {
    mobile: PropTypes.bool,
    getAffectedUnitsInColumn: PropTypes.func,
    decreaseStudyLoad: PropTypes.func,
    numberOfUnits: PropTypes.number,
    showingConfirmDecreaseStudyLoadModal: PropTypes.bool,
    hideConfirmDecreaseStudyLoadUI: PropTypes.func,
    teachingPeriods: PropTypes.array,
    attemptToDecreaseStudyLoad: PropTypes.func,
    affectedUnits: PropTypes.array
};
