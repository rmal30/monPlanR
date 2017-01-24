import { connect } from "react-redux";
import UnitInfo from "../components/Unit/UnitInfo.jsx";
import CostCalc from "../utils/CostCalc";

/**
 * Course statistic group just needs the cost and credit points from the state
 */
const mapStateToProps = (state) => {
    const { unitInfo, unitLoadError, unitLoading, focusedUnitCode} = state.CourseStructure;
    //const cost = CostCalc.calculateCost(unitInfo.SCABand, unitInfo.CreditPoints);

    return {
        cost: CostCalc.calculateCost(unitInfo.SCABand, unitInfo.CreditPoints),
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