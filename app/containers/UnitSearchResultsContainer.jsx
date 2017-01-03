import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

import UnitSearchResult from "../components/Unit/UnitSearchResult.jsx";

class UnitSearchResultsContainer extends Component {
    constructor(props) {
        super(props);
        this.willAddUnit = this.willAddUnit.bind(this);
    }

    willAddUnit(code) {
        this.props.addToCourse(code, false);
    }

    render() {
        if(!this.props.results) {
            return (
                <div>
                    <h1>No units found</h1>
                    <p>Type in a valid unit code to insert custom unit</p>
                </div>
            );
        }

        const eles = this.props.results.map((unitToAdd, index) => {
            const { UnitCode, UnitName, custom, Faculty } = unitToAdd;
            return (
                <Menu.Item active={this.props.searchResultIndex === index} key={index}>
                    <UnitSearchResult
                        key={UnitCode}
                        UnitCode={UnitCode}
                        UnitName={UnitName}
                        custom={custom}
                        Faculty={Faculty}
                        willAddUnit={this.willAddUnit}
                        addUnit={this.props.addUnit}
                        active={this.props.searchResultIndex === index}
                        unitToAdd={unitToAdd}
                        id={index} />
                </Menu.Item>
            );
        });

        return <Menu.Menu>{eles}</Menu.Menu>;
    }
}

export default UnitSearchResultsContainer;
