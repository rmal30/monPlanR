import React, { PropTypes } from "react";

import Unit from "./Unit.jsx";

/**
 * Returns the way in which we want a search result to be rendered
 * @author JXNS
 *
 * @param {string} UnitCode - The unit code associated with a result.
 * @param {string} UnitName - The unit name associated with a result.
 * @param {string} Faculty - The faculty associated with a result.
 * @param {bool} custom - Whether or not the unit is a custom unit.
 * @param {number} id - Index of search result.
 * @param {func} addUnit - Function that adds a unit to the course structure.
 * @param {object} unitToAdd - The unit to be added to the course.
 * @param {func} willAddUnit - Function that triggers add unit UI upon call.
 */
function UnitSearchResult({ UnitCode, UnitName, Faculty, custom, id, unitToAdd, willAddUnit }) {
    UnitSearchResult.propTypes = {
        UnitCode: PropTypes.string.isRequired,
        UnitName: PropTypes.string.isRequired,
        custom: PropTypes.bool,
        id: PropTypes.number.isRequired
    };

    const searchResult = (
        <Unit
            basic
            detailButton
            newUnit
            onUnitClick={willAddUnit}
            custom={custom}
            unitToAdd={unitToAdd}
            index={id}
            code={UnitCode}
            name={UnitName}
            faculty={Faculty} />
    );

    return searchResult;
}

export default UnitSearchResult;
