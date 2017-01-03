import _ from "lodash";
import React, { Component, PropTypes } from "react";
import UnitQuery from "../utils/UnitQuery";
import { Input, Menu } from "semantic-ui-react";

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
            value: "",
            searchResults: [],
            searchResultIndex: 0
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

    /**
     * Reset needs to be called after a unit is selected, when it is selected we change the entered value back to empty string (clears the searchbox).
     * @author JXNS
     */
    resetComponent() {
        this.setState({isLoading: false, results: [], value: ""});
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
        case 38:
            this.moveUpSearchResult();
            e.preventDefault();
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
        this.setState({ isLoading: true, value: e.target.value, searchResultIndex: 0 });

        setTimeout(() => {
            if(this.state.value.length < 1) {
                return this.resetComponent();
            }

            const re = new RegExp(_.escapeRegExp(this.state.value), "i");

            /**
             * isCodeMatch checks whether a result matches a regex for the Unit Code of a unit
             */
            const isCodeMatch = result => re.test(result.UnitCode);
            let matches = _.filter(source, isCodeMatch);
            let reducedResults;

            /**
             * isNameMatch checks whether a result matches a regex for the Unit Name of a unit
             */
            const isNameMatch = result => re.test(result.UnitName);
            matches = [...matches, ..._.filter(source, isNameMatch)];

            if (matches.length > 5) {
                reducedResults = matches.slice(0, 5);
            } else {
                reducedResults = matches;
            }

            // Show custom message.
            if(reducedResults.length === 0) {
                const reUnitCode = /^[a-zA-Z]{3}[0-9]{4}$/;

                if(reUnitCode.test(this.state.value.trim())) {
                    reducedResults.push({
                        UnitCode: this.state.value,
                        UnitName: "Create custom unit",
                        custom: true
                    });
                }
            }

            reducedResults = reducedResults.map(result =>
                // TODO: Find way to avoid workaround that fixes unknown key bug by setting childKey attribute.
                Object.assign(
                    {},
                    {
                        childKey: `${result.UnitCode}`,
                        UnitName: result.UnitName,
                        UnitCode: result.UnitCode,
                        Faculty: result.Faculty,
                        custom: result.custom || false
                    }
                )
            );

            this.setState({
                isLoading: false,
                searchResults: reducedResults
            });
        }, 500);
    }

    /**
     * The renderer simply returns a search component populated with the data necessary
     * @author JXNS
     */
    render() {
        const { isLoading, value } = this.state;

        return (
            <Menu.Item>
                <Menu.Item>
                    <Input
                        ref={(input) => {this.searchInput = input;}}
                        loading={isLoading}
                        onChange={this.handleSearchChange}
                        onKeyDown={this.onKeyDown}
                        placeholder="Search Unit"
                        icon="search"
                        value={value} />
                </Menu.Item>
                <Menu.Header>
                    Search Results
                </Menu.Header>
                <UnitSearchResultsContainer searchResultIndex={this.state.searchResultIndex} results={this.state.searchResults} addToCourse={this.props.addToCourse} />
            </Menu.Item>
        );
    }
}

UnitSearchContainer.propTypes = {
    addToCourse: PropTypes.func
};

export default UnitSearchContainer;
