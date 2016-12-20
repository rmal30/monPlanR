import React, { Component } from "react";

import UnitInfo from "../components/Unit/UnitInfo.jsx";
import UnitQuery from "../utils/UnitQuery";
import CostCalc from "../utils/CostCalc";

/**
 * The UnitInfoContainer class holds the state of and controls the unitInfo component. It fetches and updates the data that populates
 * the component.
 * @author JXNS
 */
class UnitInfoContainer extends Component {

    /**
     * The constructor for the UnitInfoContainer component, sets the initial state of the component and binds the necessary functions.
     * Collapse is initially set to true, isLoading set to false and isFirstsearch set to true. These initial values set up the
     * component for before the first search and are changed afterwards.
     * @author JXNS
     */
    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
            isLoading: false,
            UnitCode: "",
            UnitName: "",
            Faculty: "",
            Synopsis: "",
            isFirstSearch: true,
            error: false,
            currentCreditPoints: 0,
            currentEstCost: 0

        };
        this.handleCollapseClick = this.handleCollapseClick.bind(this);
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
     * The unitSelected function is called whenever a new unit is selected.
     * @author JXNS
     * @param {string} nUnitCode - the new unit code selected by the child component, this code is used as the query param for the api call.
     */
    componentWillReceiveProps(nextProps) {
        let scaMap = [0, 132, 188, 220]; //sca band 1 through 3 maps to their per credit point cost

        if(nextProps.newUnit !== undefined) {
            let nUnitCode = nextProps.newUnit.UnitCode;

            if(this.state.isFirstSearch) {
                this.setState({collapse: false});
            }

            this.setState({
                isLoading: true,
                isFirstSearch: false
            });

            UnitQuery.getExtendedUnitData(nUnitCode)
                .then(response => {
                    let data = response.data;
                    data.Cost = CostCalc.calculateCost(data.SCABand, data.CreditPoints);
                    
                    this.setState({
                        isLoading: false,
                        UnitCode: nUnitCode,
                        UnitName: data.UnitName,
                        Faculty: data.Faculty,
                        Synopsis: data.Description,
                        error: false,
                        currentCreditPoints: data.CreditPoints,
                        currentEstCost: data.Cost,
                        offeringArray: data.UnitLocationTP
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
                        isLoading: false,
                        UnitCode: nUnitCode,
                        error: true,
                    });
                });
        }
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
                usefulnessScore={5}
                likeScore={3}
                collapse={this.state.collapse}
                isLoading={this.state.isLoading}
                onCollapseClick={this.handleCollapseClick}
                error={this.state.error}
                cost={this.state.currentEstCost}
                creditPoints={this.state.currentCreditPoints}
                offeringArray={this.state.offeringArray}
            />
        );
    }
}

export default UnitInfoContainer;
