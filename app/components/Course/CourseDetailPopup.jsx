import React, { PropTypes } from "react";
import { Button, Popup } from "semantic-ui-react";
import MediaQuery from "react-responsive";

import ControlledModal from "../modals/ControlledModal.jsx";
import CourseInfoContainer from "../../containers/CourseInfoContainer.jsx";

/**
 * @author JXNS
 * This magical popup functions exactly like the unitDetailPopup, it shows a popup on desktops, while rendering 
 * a modal on mobiles. Currently only takes a trigger as a prop which the element that onClick, opens the 
 * modal/popup
 */
export default function CourseDetailPopup({ trigger, courseCode }) {

    CourseDetailPopup.propTypes = {
        trigger: PropTypes.element.isRequired,
        courseCode: PropTypes.string
    };

    const closeTrigger = <Button content="Close" />;

    return (
        <ControlledModal
            openTrigger={trigger}
            closeTrigger={closeTrigger}>
            <CourseInfoContainer courseCode={courseCode} />
        </ControlledModal>
    );
}
