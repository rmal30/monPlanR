import React, { PropTypes } from "react";
import { Button } from "semantic-ui-react";

import ControlledModal from "../modals/ControlledModal.jsx";

import UnitInfoWrapper from "../../containers/Unit/UnitInfoContainer.jsx";
/**
 * Unit detail is a component that shows the unit information.
 * @author JXNS, Saurabh Joshi
 *
 * @param {element} trigger - The element that you want to trigger the modal (only for mobile view)
 * @param {string} unitCode - The unitcode that serves as the key for the unit detail view request you want to pull up
 * @param {string} custom - If custom, hide some features of unit details, and do not perform a query.
 * @returns {ControlledModal}
 */
export default function UnitDetailModal({ trigger, onClick }) {

    UnitDetailModal.propTypes = {
        trigger: PropTypes.element.isRequired,
        unitCode: PropTypes.string,
        custom: PropTypes.bool,
        onClick: PropTypes.func
    };

    const closeTrigger = <Button className="btnlightcancel" content="Close" />;

    return <ControlledModal
                onClick={onClick}
                openTrigger={trigger}
                closeTrigger={closeTrigger}>
                <UnitInfoWrapper />
            </ControlledModal>;
}
