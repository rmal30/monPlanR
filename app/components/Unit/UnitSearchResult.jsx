import React, { PropTypes } from "react";
import { Rating, Icon } from "semantic-ui-react"

/**
 * Returns the way in which we want a search result to be rendered
 * @author JXNS
 * 
 * @param {string} UnitCode - The unit code associated with a result.
 * @param {string} UnitName - The unit name associated with a result.
 */
function UnitSearchResult(props) {

    UnitSearchResult.propTypes = {
        UnitCode: PropTypes.string.isRequired,
        UnitName: PropTypes.string.isRequired,
    }

    return (
        <div className="content">
            <div className="title">{props.UnitCode}</div>
            <div className="description">{props.UnitName}</div>
        </div>
    );
}

export default UnitSearchResult;
