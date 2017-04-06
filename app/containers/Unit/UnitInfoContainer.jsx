import { connect } from "react-redux";
import React, { PropTypes } from "react";

import UnitInfo from "../../components/Unit/UnitInfo.jsx";
import UnitInfoPlaceholder from "../../components/Unit/UnitInfoPlaceholder.jsx";

/**
 * A unit information container. This container grabs the data required for a unit info view from
 * redux store via mapStateToProps function. It has some simple logic in the form of choosing whether to render
 * a loading view, a error view or a unit info view.
 *
 * @author JXNS
 */
const UnitInfoContainer = (props) => {

    const { error, isLoading } = props;

    if(error) {
        let errorString;

        if(error.response && 400 <= error.response.status && error.response.status < 500) {
            errorString = "We do not have this unit in our servers. Perhaps this is a custom unit?";
        } else if(error.response && 500 <= error.response.status && error.response.status < 600) {
            errorString = "Our server is having problems. Please try again later.";
        } else {
            errorString = "Please check your connection and try again.";
        }
        return <UnitInfoPlaceholder  errorString={errorString} />;
    } else if (isLoading) {
        return <UnitInfoPlaceholder />;
    } else {
        return <UnitInfo {...props} />;
    }
};

/**
 * Grabs the data from the redux store
 */
const mapStateToProps = state => {
    const { unitInfo, unitLoadError, unitLoading, focusedUnitCode } = state.CourseStructure;

    return {
        cost: unitInfo.cost,
        creditPoints: unitInfo.creditPoints,
        error: unitLoadError,
        Faculty: unitInfo.faculty,
        likeScore: unitInfo.enjoyScore,
        isLoading: unitLoading,
        Synopsis: unitInfo.description,
        UnitCode: focusedUnitCode,
        UnitName: unitInfo.unitName,
        usefulnessScore: unitInfo.learnScore,
        prereqs: unitInfo.preqs,
        prohibs: unitInfo.proh,
        offeringArray: unitInfo.locationAndTime,
        learnResponseCount: unitInfo.learnResponse,
        enjoyResponseCount: unitInfo.enjoyResponse
    };
};

export default connect(mapStateToProps)(UnitInfoContainer);


// Proptypes declaration
UnitInfoContainer.propTypes = {
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    isLoading: PropTypes.bool.isRequired
};
