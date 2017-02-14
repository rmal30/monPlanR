import { connect } from "react-redux";
import React, { PropTypes } from "react";
import CostCalc from "../../utils/CostCalc";

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
        return <UnitInfoPlaceholder  error={true} />;
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
    const { unitInfo, unitLoadError, unitLoading, focusedUnitCode} = state.CourseStructure;

    return {
        cost: CostCalc.calculateCost(unitInfo.scaBand, unitInfo.creditPoints),
        creditPoints: unitInfo.creditPoints,
        error: unitLoadError,
        Faculty: unitInfo.faculty,
        likeScore: unitInfo.enjoyScore,
        isLoading: unitLoading,
        Synopsis: unitInfo.sypnosis, //Unfortunate spelling error built into API
        UnitCode: focusedUnitCode,
        UnitName: unitInfo.unitName,
        usefulnessScore: unitInfo.learnScore,
        prereqs: unitInfo.preqs,
        prohibs: unitInfo.proh,
        offeringArray: [],
        learnResponseCount: unitInfo.learnResponse,
        enjoyResponseCount: unitInfo.enjoyResponse
    };
};

export default connect(mapStateToProps)(UnitInfoContainer);


// Proptypes declaration
UnitInfoContainer.propTypes = {
    error: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};
