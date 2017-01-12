import React, { PropTypes } from "react";
import { Button, Popup } from "semantic-ui-react";
import MediaQuery from "react-responsive";

import ControlledModal from "../modals/ControlledModal.jsx";
import UnitInfoContainer from "../../containers/UnitInfoContainer.jsx";

/**
 * 
 * @author JXNS
 
 */
export default function CourseDetailPopup({ trigger, unitCode, custom }) {

    CourseDetailPopup.propTypes = {
        trigger: PropTypes.element.isRequired,
        // more to add..
    };

    const closeTrigger = <Button content="Close" />;

    return (
        <MediaQuery maxDeviceWidth={767}>
            {mobile => {
                if(mobile) {
                    return <ControlledModal
                                openTrigger={trigger}
                                closeTrigger={closeTrigger}>
                                    {unitCode ? <UnitInfoContainer nUnitCode={unitCode} custom={custom} /> : <UnitInfoContainer />}
                            </ControlledModal>;
                } else {
                    return <Popup
                        trigger={trigger}
                        on="click"
                        positioning="bottom center"
                        style={{maxWidth: 800}}
                        basic>
                            {unitCode ? <UnitInfoContainer nUnitCode={unitCode} custom={custom} /> : <UnitInfoContainer />}
                    </Popup>;
                }
            }}
        </MediaQuery>
    );
}
