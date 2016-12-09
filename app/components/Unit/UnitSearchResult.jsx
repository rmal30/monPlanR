import React, { PropTypes } from "react";
import { Rating, Icon } from "semantic-ui-react"

function UnitSearchResult(props) {
    return (
        <div className="content" onClick={props.onResultClick}>
            <div className="title">{props.UnitCode}</div>
            <div className="description">{props.UnitName}</div>
        </div>
    );
}

UnitSearchResult.propTypes = {
    UnitCode: PropTypes.string.isRequired,
    UnitName: PropTypes.string.isRequired,
    onResultClick: PropTypes.func.isRequired
}

export default UnitSearchResult;
