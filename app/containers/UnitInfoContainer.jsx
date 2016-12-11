import React, { Component } from "react";
import UnitInfo from "../components/Unit/UnitInfo.jsx";
import UnitSearch from "../components/Unit/UnitSearch.jsx";
import UnitQuery from "../utils/UnitQuery";
import _ from "lodash";

class UnitInfoContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapse: true,
            isLoading: false,
            UnitCode: "",
            UnitName: "",
            Faculty: "Faculty of IT",
            Synopsis: "",
            isFirstSearch: true
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

    unitSelected(nUnitCode){
        
        this.setState({
            isLoading: true,
            collapse: false,
            isFirstSearch: false
        });

        setTimeout(function(){
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
        }.bind(this)
        ,300);

        
    }

    render() {
        return (
            <div>
                <br />
                <UnitSearch onResult={this.unitSelected} />
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
                />
            </div>
        );
    }
}

export default UnitInfoContainer;
