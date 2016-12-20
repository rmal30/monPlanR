import React, { PropTypes } from "react";
import { Button, Dropdown, Header, Icon, Modal } from "semantic-ui-react";
import fileDownload from "react-file-download";

import ControlledModal from "./ControlledModal.jsx";
import UnitInfoContainer from "../../containers/UnitInfoContainer.jsx"

/**
 *
 */
export default function UnitDetailModal({ trigger, unitCode }) {


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