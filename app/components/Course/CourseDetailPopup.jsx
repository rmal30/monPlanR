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
export default function CourseDetailPopup({ trigger }) {

    CourseDetailPopup.propTypes = {
        trigger: PropTypes.element.isRequired,
    };

    const closeTrigger = <Button content="Close" />;

    return (
        <MediaQuery maxDeviceWidth={767}>
            {mobile => {
                if(mobile) {
                    return <ControlledModal
                                openTrigger={trigger}
                                closeTrigger={closeTrigger}>
                                    <CourseInfoContainer />
                            </ControlledModal>;
                } else {
                    return <Popup
                        trigger={trigger}
                        on="click"
                        positioning="bottom center"
                        style={{maxWidth: 800}}
                        basic>
                            <CourseInfoContainer />
                    </Popup>;
                }
            }}
        </MediaQuery>
    );
}
