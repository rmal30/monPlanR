import React, { PropTypes } from "react";
import {Button, Icon, Modal, List} from "semantic-ui-react";
import ControlledModal from "./ControlledModal.jsx";

export default function notes({ trigger }) {
    notes.propTypes = {
        trigger: PropTypes.element.isRequired
    };

    const closeTrigger = <Button content="OK" positive icon="checkmark" labelPosition="right" />;
    return (
        <ControlledModal
               openTrigger={trigger}
               closeTrigger={closeTrigger}>
            <Modal.Header>
                <Icon name="file text outline" />
                Release notes - v{MONPLAN_VERSION}
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <List bulleted>
                        <List.Item>Many bug fixes</List.Item>
                        <List.Item>Added Loading Screen</List.Item>
                        <List.Item>Changed Visiblity from Display to Unit Action Button</List.Item>
                        <List.Item>Updated minifier for faster load tme</List.Item>
                        <List.Item>
                            <List.Header>API Changes</List.Header>
                                <List.Item>Updated API to v0.3.1 for future proofng API with better and more response information</List.Item>
                                <List.Item>Added unimplemented authentication layer for API</List.Item>
                        </List.Item>

                    </List>
                </Modal.Description>
            </Modal.Content>
        </ControlledModal>
    );
}
