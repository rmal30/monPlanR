import React, { PropTypes } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import * as courseActions from "../../actions/CourseActions";
import * as uiActions from "../../actions/UIActions";
import { bindActionCreators } from "redux";

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
                <Button style={{borderRadius: "0px !important"}} onClick={() => {hideConfirmDeleteTeachingPeriodUI();}}>Cancel</Button>
            </Modal.Actions>
        </Modal>);
};


const mapStateToProps = (state) => {
    return {
        teachingPeriods: state.CourseStructure.teachingPeriods,
        affectedUnits: state.CourseStructure.affectedUnits,
        index: state.CourseStructure.indexOfTPtoRemove,
        showingConfirmDeleteTeachingPeriodModal: state.UI.showingConfirmDeleteTeachingPeriodModal
    };
};


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