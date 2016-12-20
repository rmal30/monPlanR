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
                <Icon name="checked calendar" />Well done on planning your course
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    There are several things you can do next:
                    <br />
                    <Header>1. Take it to your course advisor</Header>
                    <p>
                        Printing your course plan then showing it to your course
                        advisor will help speed up the process on whether or not
                        you can follow it.
                    </p>
                </Modal.Description>
            </Modal.Content>
        </ControlledModal>
    );
}