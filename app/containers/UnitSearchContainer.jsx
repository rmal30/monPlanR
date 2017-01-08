import _ from "lodash";
import React, { Component, PropTypes } from "react";
import UnitQuery from "../utils/UnitQuery";
import { Input, Menu } from "semantic-ui-react";

import FuzzySearch from "../utils/FuzzySearch";
import UnitSearchResultsContainer from "./UnitSearchResultsContainer.jsx";

/**
 * Source is initialised here, it is populated later with responses from API
 */
let source = {};

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
            isLoading: false,
            results: [],
            searchResults: [],
            searchResultIndex: 0,
            timeoutValue: null,
            empty: true
        };

        this.resetComponent = this.resetComponent.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    /**
     * Before the component mounts we query the database for the unit info.
     * @author JXNS
     */
    componentDidMount() {

        UnitQuery.getUnitCodeAndUnitNames()
            .then(response => {
                source = response.data;
                this.setState({
                    isLoading: false
                });
            })
            .catch(function(error) {
                console.error(error);
            });
    }

    componentDidUpdate() {
        if(!this.props.searchVisible) {
            this.searchInput.value = "";
        } else {
            this.searchInput.focus();
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
            isLoading: false,
            results: [],
            timeoutValue: null,
            searchResultIndex: 0
        });
    }

    /**
     * Handle result select is called whenever the user selects a result, this function calls a parent function and the resets the component.
     * @author JXNS
     */
    handleResultSelect(e, result) {
        this.props.addToCourse(result.UnitCode.toUpperCase(), result.custom);
        this.resetComponent();
    }

    moveUpSearchResult() {
        this.setState({
            searchResultIndex: (this.state.searchResultIndex - 1 + this.state.searchResults.length) % this.state.searchResults.length
        });
    }

    moveDownSearchResult() {
        this.setState({
            searchResultIndex: (this.state.searchResultIndex + 1) % this.state.searchResults.length
        });
    }

    selectSearchResult() {
        const searchResult = this.state.searchResults[this.state.searchResultIndex];
        this.props.addToCourse(searchResult.UnitCode, searchResult.custom);
    }

    onKeyDown(e) {
        switch(e.keyCode) {
        case 13:
            this.selectSearchResult();
            e.preventDefault();
            break;
        case 37:
            this.moveUpSearchResult();
            break;
        case 38:
            this.moveUpSearchResult();
            e.preventDefault();
            break;
        case 39:
            this.moveDownSearchResult();
            break;
        case 40:
            this.moveDownSearchResult();
            e.preventDefault();
            break;
        }
    }

    /**
     * Handle search change updates the currently entered text in the prompt and searchs through the results based on the currently entered text.
     * @author JXNS
     */
    handleSearchChange(e) {
        const { value } = e.target;

        if(this.state.timeoutValue) {
            clearTimeout(this.state.timeoutValue);
        }

        const timeoutValue = setTimeout(() => {
            let reducedResults = [];

            const results = FuzzySearch.search(value, source, 5, ["UnitCode", "UnitName"]);

            const reUnitCode = /^[a-zA-Z]{3}[0-9]{4}$/;

            if(results.filter(result => result.item.UnitCode === value.trim().toUpperCase()).length === 0 && reUnitCode.test(value.trim())) {
                // Show custom unit
                const customUnit = {
                    item: {
                        UnitCode: value.trim().toUpperCase(),
                        UnitName: "Create custom unit",
                        custom: true
                    }
                };

                reducedResults = [customUnit, ...results];
            } else {
                reducedResults = results;
            }

            reducedResults = reducedResults.map(({ item }) =>
                // TODO: Find way to avoid workaround that fixes unknown key bug by setting childKey attribute.
                Object.assign(
                    {},
                    {
                        childKey: `${item.UnitCode}`,
                        UnitName: item.UnitName,
                        UnitCode: item.UnitCode,
                        Faculty: item.Faculty,
                        custom: item.custom || false
                    }
                )
            );

            this.setState({
                isLoading: false,
                searchResults: reducedResults,
                empty: !value
            });
        }, 200);

        this.setState({ isLoading: true, searchResultIndex: 0, timeoutValue });
    }

    /**
     * The renderer simply returns a search component populated with the data necessary
     * @author JXNS
     */
    render() {
        const { isLoading } = this.state;

        return (
            <Menu.Item>
                <Menu.Item>
                    <div className={"ui icon input" + (isLoading ? " loading" : "")}>
                        <input
                            ref={(input) => {this.searchInput = input;}}
                            onChange={this.handleSearchChange}
                            onKeyDown={this.onKeyDown}
                            placeholder="Search Unit" />
                        <i className="search icon" />
                    </div>
                </Menu.Item>

                <UnitSearchResultsContainer searchResultIndex={this.state.searchResultIndex} empty={this.state.empty} results={this.state.searchResults} addToCourse={this.props.addToCourse} />
            </Menu.Item>
        );
    }
}

UnitSearchContainer.propTypes = {
    addToCourse: PropTypes.func
};

export default UnitSearchContainer;
