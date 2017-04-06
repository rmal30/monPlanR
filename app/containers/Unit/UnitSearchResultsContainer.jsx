import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, Header, Menu } from "semantic-ui-react";

import * as UIActions from "../../actionCreators/UIActions";
import * as DataFetchActions from "../../actionCreators/DataFetchActions";
import UnitSearchResult from "../../components/Unit/UnitSearchResult.jsx";

/**
 * Displays a list of units if there are search results.
 *
 * @author Saurabh Joshi
 */
class UnitSearchResultsContainer extends Component {
    /**
     * Binds method to the instance.
     */
    constructor(props) {
        super(props);
    }

    /**
     * Using the new API, shows loading message. Otherwise if the search bar is
     * empty, then it returns the default view where it
     * indicates to the user what they should do next if they want to add new
     * units. If there are no search results, then no results component is
     * rendered. Otherwise a list of UnitSearchResults are rendered to the
     * screen.
     */
    render() {
        if(this.props.unitSearchIsLoading){
            return (
                <div style={{lineHeight: 1.5, marginTop: "1em"}}>
                    <Header as="h2">Loading Units for the first time...</Header>
                    Currently fetching units information from our server via our awesome API, please wait while we load this into your browser
                    for the first time. This action will be performed every time you revisit this page and/or refresh this page.
                    <hr/>
                    Otherwise you can create a custom unit below
                    <br /><br />
                    <Button className="btnmainblue" onClick={() => this.props.showCustomUnitUI()} fluid>Add custom unit</Button>
                </div>
            );
        }
        if(this.props.empty && !this.props.unitSearchIsLoading) {
            return (
                <div style={{lineHeight: 1.5, marginTop: "1em"}}>
                    <Header as="h2">Add unit</Header>
                    To begin, please type in a unit name or unit code in the search bar.
                    <br /><br />
                    If the unit is not in our search results, then you can instead add a custom unit
                    by clicking the button below.
                    <br /><br />
                    <Button className="btnmainblue" onClick={() => this.props.showCustomUnitUI()} fluid>Add custom unit</Button>
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
            const { unitCode, unitName, custom, faculty } = unitToAdd;
            return (
                <Menu.Item active={this.props.searchResultIndex === index} key={index}>
                    <UnitSearchResult
                        willAddUnit={this.props.willAddUnit}
                        key={unitCode}
                        tabindex={1}
                        unitCode={unitCode}
                        unitName={unitName}
                        custom={custom}
                        faculty={faculty}
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
    willAddUnit: PropTypes.func,
    addToCourse: PropTypes.func,
    searchResultIndex: PropTypes.number,
    results: PropTypes.array,
    empty: PropTypes.bool,
    showCustomUnitUI: PropTypes.func,
    unitSearchIsLoading: PropTypes.bool
};

/**
 * Injects show custom unit modal action into the props
 */
const mapDispatchToProps = dispatch => {
    const actionBundle = {...UIActions, ...DataFetchActions};
    return bindActionCreators(actionBundle, dispatch);
};

/**
* Injecting Props
*/
const mapStatetoProps = state => {
    return {
        unitSearchIsLoading: state.CourseStructure.unitSearchIsLoading
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(UnitSearchResultsContainer);
