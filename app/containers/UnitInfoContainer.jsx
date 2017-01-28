import { connect } from "react-redux";
import React, { PropTypes } from "react";
import UnitInfo from "../components/Unit/UnitInfo.jsx";
import UnitInfoPlaceholder from "../components/Unit/UnitInfoPlaceholder.jsx";
import CostCalc from "../utils/CostCalc";

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
const mapStateToProps = (state) => {
    const { unitInfo, unitLoadError, unitLoading, focusedUnitCode} = state.CourseStructure;

    return {
        cost: CostCalc.calculateCost(unitInfo.SCABand, unitInfo.CreditPoints),
        creditPoints: unitInfo.CreditPoints,
        error: unitLoadError, 
        Faculty: unitInfo.Faculty,
        likeScore: unitInfo.enjoyRating,
        isLoading: unitLoading,
        Synopsis: unitInfo.Sypnosis, //Unfortunate spelling error built into API
        UnitCode: focusedUnitCode,
        UnitName: unitInfo.UnitName,
        usefulnessScore: unitInfo.learnRating,
        prereqs: unitInfo.Preqs,
        prohibs: unitInfo.Proh,
        offeringArray: unitInfo.LocationAndTime,
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
