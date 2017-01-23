import React, { Component, PropTypes } from "react";
import UnitInfo from "../components/Unit/UnitInfo.jsx";
import UnitQuery from "../utils/UnitQuery";
import CostCalc from "../utils/CostCalc";

/**
 * The UnitInfoContainer class holds the state of and controls the unitInfo component. It fetches and updates the data that populates
 * the component.
 * @author JXNS
 */
export default class UnitInfoContainer extends Component {

    /**
     * The constructor for the UnitInfoContainer component, sets the initial state of the component and binds the necessary functions.
     * Collapse is initially set to true, isLoading set to false and isFirstsearch set to true. These initial values set up the
     * component for before the first search and are changed afterwards.
     * @author JXNS
     */
    constructor(props) {
        super(props);

        this.state = {
            collapse: false,
            isLoading: false,
            UnitCode: "",
            UnitName: "",
            Faculty: "",
            Synopsis: "",
            isFirstSearch: true,
            error: false,
            currentCreditPoints: 0,
            currentEstCost: 0,
            prereqs: "",
            prohibs: "",
            likeScore: 0,
            learnScore: 0,
            learnResponseCount: 0,
            enjoyResponseCount: 0

        };
        this.handleCollapseClick = this.handleCollapseClick.bind(this);
    }
    

    
    /**
     * @author JXNS
     * Currently a bit of a workaround for making this play nice with both the unit detail button and the
     * create custom unit modal. Component will recieve props is not called the first time it is rendered,
     * So component did mount needs to be called for the unit detail modal.
     */
    componentDidMount() {
        if(this.props.nUnitCode) {
            let nUnitCode = this.props.nUnitCode;
            if(this.state.isFirstSearch) {
                this.setState({collapse: false});
            }

            this.setState({
                isLoading: true,
                isFirstSearch: false
            });

            if(!this.props.custom) {
                UnitQuery.getExtendedUnitData(nUnitCode)
                    .then(unitDataResp => {
                        let unitData = unitDataResp.data;
                        unitData.Cost = CostCalc.calculateCost(unitData.SCABand, unitData.CreditPoints);
                        this.setState({
                            isLoading: false,
                            UnitCode: nUnitCode,
                            UnitName: unitData.UnitName,
                            Faculty: unitData.Faculty,
                            Synopsis: unitData.Sypnosis,
                            error: false,
                            currentCreditPoints: unitData.CreditPoints,
                            currentEstCost: unitData.Cost,
                            offeringArray: unitData.LocationAndTime,
                            prohibs: unitData.Proh,
                            prereqs: unitData.Preqs,
                            likeScore: unitData.enjoyRating,
                            learnScore: unitData.learnRating,
                            learnResponseCount: unitData.learnResponse,
                            enjoyResponseCount: unitData.enjoyResponse

                        });

                    })
                    .catch(error => {
                        console.error(error);
                        
                        this.setState({
                            isLoading: false,
                            UnitCode: nUnitCode,
                            error: true,
                        });
                    });

            } else {
                this.setState({
                    isLoading: false,
                    UnitCode: nUnitCode
                });
            }
        }
    }
    

    /**
     * When the collapse button is clicked, the collapse bool must be changed from true to false, or false to true depending on whether
     * it was collapsed or not previously.
     * @author JXNS
     */
    handleCollapseClick() {
        let newState = !(this.state.collapse);
        this.setState({
            collapse: newState
        });
    }

    /**
     * The component currently returns both the unitsearch and unitInfo components with all the gathered state.
     * @author JXNS
     */
    render() {
        return (
            <UnitInfo
                isDisabled={this.state.isFirstSearch}
                UnitCode={this.state.UnitCode}
                UnitName={this.state.UnitName}
                Faculty={this.state.Faculty}
                Synopsis={this.state.Synopsis}
                usefulnessScore={this.state.learnScore}
                likeScore={this.state.likeScore}
                collapse={this.state.collapse}
                isLoading={this.state.isLoading}
                onCollapseClick={this.handleCollapseClick}
                error={this.state.error}
                cost={this.state.currentEstCost}
                creditPoints={this.state.currentCreditPoints}
                offeringArray={this.state.offeringArray}
                prohibs={this.state.prohibs}
                prereqs={this.state.prereqs}
                learnResponseCount={this.state.learnResponseCount}
                enjoyResponseCount={this.state.enjoyResponseCount}
            />
        );
    }
}

UnitInfoContainer.propTypes = {
    nUnitCode: PropTypes.string,
    custom: PropTypes.bool
};
