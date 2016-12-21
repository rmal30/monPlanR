import React, { PropTypes } from "react";
import { Button, Modal } from "semantic-ui-react";

import ControlledModal from "./ControlledModal.jsx";
import UnitInfoContainer from "../../containers/UnitInfoContainer.jsx";

/**
 * Unit detail modal is a modal that shows the Unit information 
 * @author JXNS
 * 
 * @param {element} trigger - The element that you want to trigger the modal
 * @param {string} unitCode - The unitcode that serves as the key for the unit detail view request you want to pull up 
 */
export default function UnitDetailModal({ trigger, unitCode }) {
    
    UnitDetailModal.propTypes = {
        trigger: PropTypes.element.isRequired,
        unitCode: PropTypes.string
    };

    const closeTrigger = <Button content="Close" />;
    return (
        <ControlledModal
               openTrigger={trigger}
               closeTrigger={closeTrigger}>
            <Modal.Header>
                Unit Information
            </Modal.Header>
            <Modal.Content>
                {unitCode ? <UnitInfoContainer nUnitCode={unitCode} /> : <UnitInfoContainer />}
            </Modal.Content>
        </ControlledModal>
    );
}