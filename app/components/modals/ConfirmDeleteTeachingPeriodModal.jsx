import React, { PropTypes } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import * as courseActions from "../../actions/CourseActions";
import * as uiActions from "../../actions/UIActions";
import { bindActionCreators } from "redux";

/**
 * This modal sits and waits to be activated by the global show confirm delete teaching period modal boolean. This
 * listens for changes to units that would be affected by a teaching period deletion, as well as the index of the teaching 
 * period to remove and uses that for the modal actions
 */
const ConfirmDeleteTeachingPeriodModal = (props) => {
    let IDcount = 0;
    const { index, affectedUnits, showingConfirmDeleteTeachingPeriodModal, removeTeachingPeriod, hideConfirmDeleteTeachingPeriodUI, teachingPeriods } = props;
    
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
                <Button className="btncancel" floated={"right"} onClick={() => {removeTeachingPeriod(index, teachingPeriods[index].units, hideConfirmDeleteTeachingPeriodUI());}}>Remove Teaching Period</Button>
                <Button className="btnlightcancel" onClick={() => {hideConfirmDeleteTeachingPeriodUI();}}>Cancel</Button>
            </Modal.Actions>
        </Modal>);
};


/**
 * we need the following variables for the modal to be populated and controlled
 */
const mapStateToProps = (state) => {
    return {
        teachingPeriods: state.CourseStructure.teachingPeriods,
        affectedUnits: state.CourseStructure.affectedUnits,
        index: state.CourseStructure.indexOfTPtoRemove,
        showingConfirmDeleteTeachingPeriodModal: state.UI.showingConfirmDeleteTeachingPeriodModal
    };
};

/**
 * We need the hidemodal function from uiActions and the removeTeachingPeriod action from course Actions
 */
const mapDispatchToProps = (dispatch) => {
    const actionBundle = {...courseActions, ...uiActions};
    return bindActionCreators(actionBundle, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteTeachingPeriodModal);

ConfirmDeleteTeachingPeriodModal.propTypes = {
    index: PropTypes.number,
    affectedUnits: PropTypes.array,
    showingConfirmDeleteTeachingPeriodModal: PropTypes.bool,
    removeTeachingPeriod: PropTypes.func,
    hideConfirmDeleteTeachingPeriodUI: PropTypes.func,
    units: PropTypes.array,
    teachingPeriods: PropTypes.array
};