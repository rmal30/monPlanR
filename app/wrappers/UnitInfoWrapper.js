import { connect } from "react-redux";
import UnitInfo from "../components/Unit/UnitInfo.jsx";

/**
 * Course statistic group just needs the cost and credit points from the state
 */
const mapStateToProps = (state) => {
    const { unitInfo, unitLoadError, unitLoading, focusedUnitCode} = state.CourseStructure;
    return {
        //cost: unitInfo.cost,
        creditPoints: unitInfo.CreditPoints,
        error: unitLoadError,
        Faculty: unitInfo.Faculty,
        likeScore: unitInfo.enjoyRating,
        //isDisabled: unitInfo,
        isLoading: unitLoading,
        Synopsis: unitInfo.Sypnosis,
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


const UnitInfoWrapper = connect(mapStateToProps)(UnitInfo);
export default UnitInfoWrapper;