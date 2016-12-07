import React, { Component } from "react";
import UnitInfo from "../components/UnitInfo.jsx"

const testData = {
    "UnitCode": "FIT2001",
    "UnitName": "Systems development",
    "Faculty": "it",
    "Synopsis": "The unit introduces students to systems analysis and design as a problem solving activity, within the framework of a selected methodology. It will focus on contemporary industry practice; investigating understanding and documenting system requirements; a range of design and implementation activities; and professional skills required for systems development.",
    "Preqs": "24 points of FIT units",
    "Proh": "BUS2021, CPE2003, CSE1204, CSE1205, GCO1813, GCO2601, GCO2852, GCO2826, IMS1001, IMS1002, IMS1805, IMS2071, IMS9001",
    "usefulnessScore": 3,
    "likeScore": 3
  }

class UnitInfoContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            isLoading: false
        };
        this.handleCollapseClick = this.handleCollapseClick.bind(this);
    }

    handleCollapseClick() {
        let newState = !(this.state.collapse);
        this.setState({
            collapse: newState
        });
    }

    render() {
        return (
            <UnitInfo 
                UnitCode={testData.UnitCode}
                UnitName={testData.UnitName}
                Synopsis={testData.Synopsis}
                usefulnessScore={testData.usefulnessScore}
                likeScore={testData.likeScore}
                collapse={this.state.collapse}
                isLoading={this.state.isLoading}
                onCollapseClick={this.handleCollapseClick}
            />
        );
    }
}

export default UnitInfoContainer;