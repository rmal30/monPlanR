import React, { PropTypes } from "react";
import { Button, Popup } from "semantic-ui-react";
import MediaQuery from "react-responsive";

import ControlledModal from "../modals/ControlledModal.jsx";
import UnitInfoContainer from "../../containers/UnitInfoContainer.jsx";

/**
 * Unit detail is a component that shows the unit information. It is rendered as a modal in mobile view, and as a popup
 * in tablet/desktop view.
 * @author JXNS, Saurabh Joshi
 *
 * @param {element} trigger - The element that you want to trigger the modal (only for mobile view)
 * @param {string} unitCode - The unitcode that serves as the key for the unit detail view request you want to pull up
 * @param {string} custom - If custom, hide some features of unit details, and do not perform a query.
 */
export default function UnitDetailModalPopup({ trigger, unitCode, custom }) {

    UnitDetailModalPopup.propTypes = {
        trigger: PropTypes.element.isRequired,
        unitCode: PropTypes.string,
        custom: PropTypes.bool
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
