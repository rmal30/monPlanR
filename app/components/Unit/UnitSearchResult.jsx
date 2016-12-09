import React, { PropTypes } from "react";
import { Rating, Icon } from "semantic-ui-react"

function UnitSearchResult(props) {
    return (
        <div className="content">
            <div className="title">{props.UnitCode}</div>
            <div className="description">{props.UnitName}</div>
        </div>
    );
}

UnitSearchResult.propTypes = {
    UnitCode: PropTypes.string.isRequired,
    UnitName: PropTypes.string.isRequired,
}

export default UnitSearchResult;
