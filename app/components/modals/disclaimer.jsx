import React, { PropTypes } from "react";
import {Button, Icon, Modal} from "semantic-ui-react";

import ControlledModal from "./ControlledModal.jsx";

/**
 * The privacy policy modal.
 *
 * @author Eric Jiang, Saurabh Joshi
 */
export default function privacy({ trigger }) {
    privacy.propTypes = {
        trigger: PropTypes.element.isRequired
    };

    const closeTrigger = <Button content="OK, I've got it" className="btnlightblue" icon="checkmark" labelPosition="right" />;
    return (
        <ControlledModal
               openTrigger={trigger}
               closeTrigger={closeTrigger}>
            <Modal.Header className="header-primary">
                <Icon name="warning sign" />
                Disclaimer
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <p>monPlan is a tool designed to help students to design courses with ease. Our features are designed to assist you in planning your course,
                        including recommending units based off past SETU results. Since it is only a tool, we recommend you to see your faculty’s course advisor.</p>
                    <p>Our fundamental goal is to allow all Monash University students to add any units in any teaching period, for any year. Period.
                        We place trust in you as a student to plan your own course, and for some quick guidance, we will inform you if there is anything that might be wrong with your course plan.</p>
                    <p>Our promise is that we will never restrict you in adding your units to your course, and it is up to you and the course advisors to assist you with your plan.</p>
                  </Modal.Description>
            </Modal.Content>
        </ControlledModal>
    );
}
