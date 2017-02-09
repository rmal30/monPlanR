import React, { PropTypes } from "react";
import { Button, Modal } from "semantic-ui-react";

import ControlledModal from "../modals/ControlledModal.jsx";
import CourseInfoContainer from "../../containers/Course/CourseInfoContainer.jsx";

/**
 * This functions exactly like the unitDetailPopup, it renders a modal.
 * Currently only takes a trigger as a prop which the element that onClick,
 * opens the modal.
 *
 * @author JXNS
 */
export default function CourseDetailPopup({ trigger, courseCode }) {

    CourseDetailPopup.propTypes = {
        trigger: PropTypes.element.isRequired,
        courseCode: PropTypes.string
    };

    const closeTrigger = <Button className="btnlightcancel" content="Close" />;

    return (
        <ControlledModal
            openTrigger={trigger}
            closeTrigger={closeTrigger}>
            <Modal.Content style={{padding: 0}}>
                <Modal.Description>
                    <CourseInfoContainer modal courseCode={courseCode} />
                </Modal.Description>
            </Modal.Content>
        </ControlledModal>
    );
}
