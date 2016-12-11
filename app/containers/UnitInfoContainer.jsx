import React, { Component } from "react";
import UnitInfo from "../components/Unit/UnitInfo.jsx";
import UnitSearch from "../components/Unit/UnitSearch.jsx";
import UnitQuery from "../utils/UnitQuery";
import _ from "lodash";


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
            collapse: true,
            isLoading: true,
            UnitCode: "",
            UnitName: "",
            Faculty: "Faculty of IT",
            Synopsis: ""
        };
        this.handleCollapseClick = this.handleCollapseClick.bind(this);
        this.unitSelected = this.unitSelected.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
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
        
        this.setState({
            isLoading: true,
            collapse: false
        });

        UnitQuery.getExtendedUnitData(nUnitCode)
            .then(function(response) {
                let source = response.data;
                const re = new RegExp(_.escapeRegExp(nUnitCode), "i");
                const isMatch = (result) => re.test(result.UnitCode);
                let match = _.filter(source, isMatch)[0];
                this.setState({
                    isLoading: false,
                    UnitCode: match.UnitCode,
                    UnitName: match.UnitName,
                    Faculty: match.Faculty,
                    Synopsis: match.Sypnosis
                });
            }.bind(this))
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <br />
                <UnitSearch onResult={this.unitSelected} />
                <UnitInfo
                    UnitCode={this.state.UnitCode}
                    UnitName={this.state.UnitName}
                    Faculty={this.state.Faculty}
                    Synopsis={this.state.Synopsis}
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
