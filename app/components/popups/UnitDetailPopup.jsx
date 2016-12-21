import React, { PropTypes } from "react";
import { Popup } from "semantic-ui-react";

import UnitInfoContainer from "../../containers/UnitInfoContainer.jsx";

/**
 * Unit detail modal is a modal that shows the Unit information
 * @author JXNS
 *
 * @param {element} trigger - The element that you want to trigger the modal
 * @param {string} unitCode - The unitcode that serves as the key for the unit detail view request you want to pull up
 */
export default function UnitDetailPopup({ trigger, unitCode }) {

    UnitDetailPopup.propTypes = {
        trigger: PropTypes.element.isRequired,
        unitCode: PropTypes.string
    };

    return (
        <Popup
            trigger={trigger}
            on="click"
            positioning="bottom center"
            style={{maxWidth: 800}}
            basic>
                {unitCode ? <UnitInfoContainer nUnitCode={unitCode} /> : <UnitInfoContainer />}
        </Popup>
    );
}
