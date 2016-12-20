import React, { PropTypes } from "react";
import { Button } from "semantic-ui-react";

import CustomUnitModal from "../modals/CustomUnitModal.jsx";

/**
 * Returns the way in which we want a search result to be rendered
 * @author JXNS
 *
 * @param {string} UnitCode - The unit code associated with a result.
 * @param {string} UnitName - The unit name associated with a result.
 * @param {number} id - Index of search result.
 */
function UnitSearchResult(props) {

    UnitSearchResult.propTypes = {
        UnitCode: PropTypes.string.isRequired,
        UnitName: PropTypes.string.isRequired,
        custom: PropTypes.bool,
        id: PropTypes.number.isRequired
    };

    const searchResult = (
        <div className="content">
            {props.id === 0 && <b style={{float: "right", color: "#005d95"}}>Press Enter</b>}
            <div className="title">
                {props.UnitCode}
            </div>
            <div className="description">{props.UnitName}</div>
        </div>
    );

    return props.custom
        ? <CustomUnitModal trigger={searchResult} UnitCode={props.UnitCode} />
        : searchResult;
    /* <Unit
        basic
        name={props.UnitName}
        code={props.UnitCode} /> */
}

export default UnitSearchResult;
