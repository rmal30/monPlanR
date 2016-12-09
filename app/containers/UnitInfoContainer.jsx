import React, { Component } from "react";
import UnitInfo from "../components/Unit/UnitInfo.jsx";
import UnitSearch from "../components/Unit/UnitSearch.jsx";

const testData = {
    "UnitCode": "FIT2001",
    "UnitName": "Systems development",
    "Faculty": "it",
    "Synopsis": "The unit introduces students to systems analysis and design as a problem solving activity, within the framework of a selected methodology. It will focus on contemporary industry practice; investigating understanding and documenting system requirements; a range of design and implementation activities; and professional skills required for systems development.",
    "Preqs": "24 points of FIT units",
    "Proh": "BUS2021, CPE2003, CSE1204, CSE1205, GCO1813, GCO2601, GCO2852, GCO2826, IMS1001, IMS1002, IMS1805, IMS2071, IMS9001",
    "usefulnessScore": 3,
    "likeScore": 3
  };

class UnitInfoContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            isLoading: true,
            unitCode: ""
        };
        this.handleCollapseClick = this.handleCollapseClick.bind(this);
        this.unitSelected = this.unitSelected.bind(this);
    }

    handleCollapseClick() {
        let newState = !(this.state.collapse);
        this.setState({
            collapse: newState
        });
    }

    componentDidMount(){
        setTimeout(function(){
            this.setState({
                isLoading: false
            });
        }.bind(this)
        ,1000);
    }

    unitSelected(nUnitCode){
        console.log(nUnitCode)
        this.setState({unitCode: nUnitCode})
    }

    render() {
        return (
            <div>
                <UnitSearch onResult={this.unitSelected} />
                <UnitInfo
                    UnitCode={this.state.unitCode}
                    UnitName={testData.UnitName}
                    Synopsis={testData.Synopsis}
                    usefulnessScore={testData.usefulnessScore}
                    likeScore={testData.likeScore}
                    collapse={this.state.collapse}
                    isLoading={this.state.isLoading}
                    onCollapseClick={this.handleCollapseClick}
                />
            </div>
        );
    }
}

export default UnitInfoContainer;
