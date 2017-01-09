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
            prohibs: ""

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
                            offeringArray: data.UnitLocationTP,
                            prohibs: data.Prohibitions,
                            prereqs: data.Prerequisites
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
     * The unitSelected function is called whenever a new unit is selected.
     * @author JXNS
     * @param {string} nUnitCode - the new unit code selected by the child component, this code is used as the query param for the api call.
     */
    componentWillReceiveProps(nextProps) {
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
                        offeringArray: data.UnitLocationTP,
                        prohibs: data.Prohibitions,
                        prereqs: data.Prerequisites
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
                prohibs={this.state.prohibs}
                prereqs={this.state.prereqs}
            />
        );
    }
}

UnitInfoContainer.propTypes = {
    nUnitCode: PropTypes.string
};
