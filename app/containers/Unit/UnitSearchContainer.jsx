import React, { Component, PropTypes } from "react";
import { Button, Menu, Divider, Grid, Checkbox } from "semantic-ui-react";

import * as UIActions from "../../actions/UIActions";
import FuzzySearch from "../../utils/FuzzySearch";
import UnitSearchResultsContainer from "./UnitSearchResultsContainer.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dataFetchActions from "../../actions/DataFetchActions";
import CostCalc from "../../utils/CostCalc";
import FilterButtonContainer from "../Buttons/FilterButtonContainer.jsx";

/**
 * This component searches through the available units for selection
 * @author JXNS
 */
class UnitSearchContainer extends Component {

    /**
     * The constructor initialises the state and binds the methods used
     * @author JXNS
     */
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            searchResults: [],
            searchResultIndex: 0,
            timeoutValue: null,
            empty: true,
            searchFilter: []
        };

        this.searchVisible = false;

        this.resetComponent = this.resetComponent.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    /**
     * Before the component mounts we query the database for the unit info.
     * @author JXNS
     */
    componentWillMount() {
        this.props.fetchUnits();
    }

    /**
     * If sidebar becomes visible, then focus and select the search bar.
     */
    componentDidUpdate(prevProps) {
        if(!prevProps.searchVisible && this.props.searchVisible) {
            this.searchInput.focus();
            this.searchInput.select();
        }
    }

    /**
     * Reset needs to be called after a unit is selected, when it is selected we change the entered value back to empty string (clears the searchbox).
     * @author JXNS
     */
    resetComponent() {
        if(this.state.timeoutValue) {
            clearTimeout(this.state.timeoutValue);
        }

        this.searchInput.value = "";

        this.setState({
            results: [],
            timeoutValue: null,
            searchResultIndex: 0
        });
    }

    /**
     * Moves search selection up by one. If the first result was selected,
     * then the last result will be selected.
     */
    moveUpSearchResult() {
        this.setState({
            searchResultIndex: (this.state.searchResultIndex - 1 + this.state.searchResults.length) % this.state.searchResults.length
        });
    }

    /**
     * Moves search selection down by one. If the last result was selected,
     * then the first result will be selected.
     */
    moveDownSearchResult() {
        this.setState({
            searchResultIndex: (this.state.searchResultIndex + 1) % this.state.searchResults.length
        });
    }

    /**
     * Selects the currently selected search result
     */
    selectSearchResult() {
        // Ignore if there are no search results
        if(this.state.searchResults.length === 0) {
            return;
        }

        const searchResult = this.state.searchResults[this.state.searchResultIndex];
        this.props.willAddUnit(searchResult.unitCode, searchResult.custom, false);
    }

    /**
     * If one of the following keys are pressed, then the following actions are
     * performed: Enter selects the search result, up moves search selection up
     * by one, and down moves search selection down by one.
     */
    onKeyDown(e) {
        switch(e.keyCode) {
            case 13: // Enter
                this.selectSearchResult();
                e.preventDefault();
                break;
            case 27: // Escape
                this.props.hideSidebar();
                e.preventDefault();
                break;
            case 38: // Up
                this.moveUpSearchResult();
                e.preventDefault();
                break;
            case 40: // Down
                this.moveDownSearchResult();
                e.preventDefault();
                break;
        }
    }

    /**
     * Handle search change updates the currently entered text in the prompt and searches through the results based on the currently entered text.
     * @author JXNS
     */
    handleSearchChange(e) {
        const { value } = e.target;
        let draggableCustomUnitExists = false;

        if(this.state.timeoutValue) {
            clearTimeout(this.state.timeoutValue);
        }

        const timeoutValue = setTimeout(() => {
            let reducedResults = [];

            const results = FuzzySearch.search(value, this.props.basicUnits, 8, ["unitCode", "unitName"], 100, );
            const reUnitCode = /^[a-zA-Z]{3}[0-9]{4}$/;
            if(results.filter(result => result.item.unitCode === value.trim().toUpperCase()).length === 0 && reUnitCode.test(value.trim())) {
                // Show custom draggable unit
                draggableCustomUnitExists = true;

                const customUnit = {
                    item: {
                        unitCode: value.trim().toUpperCase(),
                        unitName: "Create custom unit",
                        custom: true
                    }
                };

                reducedResults = [customUnit, ...results];
            } else {
                reducedResults = results;
            }

            reducedResults = reducedResults.map(({ item }) =>
                ({
                    childKey: `${item.unitCode}`,
                    unitName: item.unitName,
                    unitCode: item.unitCode,
                    faculty: item.faculty,
                    creditPoints: item.creditPoints,
                    locationAndTime: item.locationAndTime,
                    scaBand: item.scaBand,
                    cost: CostCalc.calculateCost(item.scaBand, item.creditPoints),
                    custom: item.custom || false
                })
            );

            this.setState({
                searchResults: reducedResults,
                showAddCustomUnitButton: !!value && !draggableCustomUnitExists,
                value,
                empty: !value
            });
        }, 200);

        this.setState({
            searchResultIndex: 0,
            timeoutValue
        });
    }

    /**
     * The renderer simply returns a search component populated with the data necessary
     * @author JXNS
     */
    render() {
        const { unitSearchIsLoading } = this.props;

        const faculties = [
            {label: "Art, Design and Architecture", value: "Art, Design and Architecture"},
            {label: "Arts", value: "Arts"},
            {label: "Business and Economics", value: "Business and Economics"},
            {label: "Education", value: "Education"},
            {label: "Engineering", value: "Engineering"},
            {label: "Information Technology", value: "Information Technology"},
            {label: "Law", value: "Law"},
            {label: "Science", value: "Science"},
            {label: "Medicine, Nursing and Health Sciences", value: "Medicine, Nursing and Health Sciences"},
            {label: "Pharmacy and Pharmaceutical Sciences", value: "Pharmacy and Pharmaceutical Sciences"}
        ];

        return (
            <Menu.Item>
                <Menu.Item>
                    <div className={"ui icon input" + (unitSearchIsLoading ? " loading" : "")}>
                        <input
                            ref={(input) => {this.searchInput = input;}}
                            onChange={this.handleSearchChange}
                            onKeyDown={this.onKeyDown}
                            disabled={this.props.unitSearchIsLoading}
                            placeholder={this.props.unitSearchIsLoading ? "Loading, Fetching Units...": "Search to add unit"} />
                        <i className="search icon" />
                    </div>
                    <FilterButtonContainer />
                        {this.state.showAddCustomUnitButton &&
                            <Button onClick={() => this.props.showCustomUnitUI(this.state.value)} fluid className="btnmainblue add-unit-btn">Add custom unit</Button>
                        }
                </Menu.Item>
                {this.state.unitSearchIsLoading && "Loading Unit Data"}
                <Divider />
                <UnitSearchResultsContainer
                    searchResultIndex={this.state.searchResultIndex}
                    empty={this.state.empty}
                    results={this.state.searchResults}  />
            </Menu.Item>
        );
    }
}

UnitSearchContainer.propTypes = {
    showCustomUnitUI: PropTypes.func,
    searchVisible: PropTypes.bool,
    hideSidebar: PropTypes.func,
    willAddUnit: PropTypes.func,
    fetchUnits: PropTypes.func,
    unitSearchIsLoading: PropTypes.bool,
    basicUnits: PropTypes.array
};

/**
 * Used for focusing input when sidebar is shown.
 */
const mapStatetoProps = (state) => {
    return {
        searchVisible: state.UI.showingSidebar,
        basicUnits: state.UnitSearch.basicUnits,
        unitSearchIsLoading: state.UnitSearch.unitSearchIsLoading,
        unitSearchError: state.UnitSearch.unitSearchError
    };
};

/**
 * Injects the required actions from redux action creators
 */
const mapDispatchToProps = dispatch => {
    return bindActionCreators({...dataFetchActions, ...UIActions}, dispatch);
};

export default connect(mapStatetoProps, mapDispatchToProps)(UnitSearchContainer);
