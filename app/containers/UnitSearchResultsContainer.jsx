import React, { Component, PropTypes } from "react";
import { Button, Header, Menu } from "semantic-ui-react";

import UnitSearchResult from "../components/Unit/UnitSearchResult.jsx";

/**
 * Displays a list of
 */
class UnitSearchResultsContainer extends Component {
    /**
     * Binds methods to the instance.
     */
    constructor(props) {
        super(props);
        this.willAddUnit = this.willAddUnit.bind(this);
    }

    willAddUnit(code, custom, drag) {
        this.props.addToCourse(code, custom, drag);
    }

    render() {
        if(this.props.empty) {
            return (
                <div style={{lineHeight: 1.5}}>
                    To begin, please type in a unit name or unit code in the search bar.
                    <br /><br />
                    If the unit is not in our search results, then you can instead add a custom unit
                    by clicking the buttom below.
                    <br /><br />
                    <Button onClick={this.willAddUnit.bind(this, null, true)} fluid>Add custom unit</Button>
                </div>
            );
        }
        if(!this.props.results || this.props.results.length === 0) {
            return (
                <div style={{marginTop: "1em"}}>
                    <Header>
                        No units found
                        <Header.Subheader>
                            Type in a valid unit code to insert custom unit
                        </Header.Subheader>
                    </Header>
                </div>
            );
        }

        const eles = this.props.results.map((unitToAdd, index) => {
            const { UnitCode, UnitName, custom, Faculty } = unitToAdd;
            return (
                <Menu.Item active={this.props.searchResultIndex === index} key={index}>
                    <UnitSearchResult
                        key={UnitCode}
                        tabindex={1}
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

UnitSearchResultsContainer.propTypes = {
    addUnit: PropTypes.func,
    addToCourse: PropTypes.func,
    searchResultIndex: PropTypes.number,
    results: PropTypes.array,
    empty: PropTypes.bool
};

export default UnitSearchResultsContainer;
