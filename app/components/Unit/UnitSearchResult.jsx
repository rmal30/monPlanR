import React, { PropTypes } from "react";

import Unit from "./Unit.jsx";

/**
 * Returns the way in which we want a search result to be rendered
 * @author JXNS
 *
 * @param {string} UnitCode - The unit code associated with a result.
 * @param {string} UnitName - The unit name associated with a result.
 * @param {number} id - Index of search result.
 */
function UnitSearchResult({ UnitCode, UnitName, Faculty, custom, id, addUnit, unitToAdd, willAddUnit }) {
    UnitSearchResult.propTypes = {
        UnitCode: PropTypes.string.isRequired,
        UnitName: PropTypes.string.isRequired,
        custom: PropTypes.bool,
        id: PropTypes.number.isRequired
    };

    const searchResult = (
        <Unit
            basic
            newUnit
            willAddUnit={willAddUnit}
            addUnit={addUnit}
            onUnitClick={willAddUnit}
            custom={custom}
            unitToAdd={unitToAdd}
            index={id}
            code={UnitCode}
            name={UnitName}
            faculty={Faculty} />
    );

    /*<div className="content">
        {props.active && <b style={{float: "right", color: "#005d95"}}>Press Enter</b>}
        <div className="title">
            {props.UnitCode}
        </div>
        <div className="description">{props.UnitName}</div>
    </div>*/

    return searchResult;
    /* <Unit
        basic
        name={props.UnitName}
        code={props.UnitCode} /> */
}

export default UnitSearchResult;
