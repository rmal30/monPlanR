import React, { Component, PropTypes } from "react";
import UnitQuery from "../../utils/UnitQuery";
import { Button, Menu, Divider, Grid, Checkbox } from "semantic-ui-react";

import FuzzySearch from "../../utils/FuzzySearch";
import UnitSearchResultsContainer from "./UnitSearchResultsContainer.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dataFetchActions from "../../actions/DataFetchActions";

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
            empty: true,
            searchFilter: []
        };

        this.searchVisible = false;

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
        this.props.willAddUnit(searchResult.UnitCode, searchResult.custom, false);
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
                this.props.close();
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
     * Handle search change updates the currently entered text in the prompt and searchs through the results based on the currently entered text.
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

            const results = FuzzySearch.search(value, source, 8, ["UnitCode", "UnitName"], 100);

            const reUnitCode = /^[a-zA-Z]{3}[0-9]{4}$/;

            if(results.filter(result => result.item.UnitCode === value.trim().toUpperCase()).length === 0 && reUnitCode.test(value.trim())) {
                // Show custom draggable unit
                draggableCustomUnitExists = true;

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
                ({
                    childKey: `${item.UnitCode}`,
                    UnitName: item.UnitName,
                    UnitCode: item.UnitCode,
                    Faculty: item.Faculty,
                    custom: item.custom || false
                })
            );

            this.setState({
                isLoading: false,
                searchResults: reducedResults,
                showAddCustomUnitButton: !!value && !draggableCustomUnitExists,
                value,
                empty: !value
            });
        }, 200);

        this.setState({
            isLoading: true,
            searchResultIndex: 0,
            timeoutValue
        });
    }

    /**
     * The renderer simply returns a search component populated with the data necessary
     * @author JXNS
     */
    render() {
        const { isLoading } = this.state;

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
                    <div className={"ui icon input" + (isLoading ? " loading" : "")}>
                        <input
                            ref={(input) => {this.searchInput = input;}}
                            onChange={this.handleSearchChange}
                            onKeyDown={this.onKeyDown}
                            placeholder="Search to add unit" />
                        <i className="search icon" />
                    </div>
                </Menu.Item>
                {this.state.showAddCustomUnitButton &&
                    <Button onClick={() => this.props.addToCourse(this.state.value, true)} fluid className="btnmainblue">Add custom unit</Button>
                }
                {!this.state.isLoading && this.state.showAddCustomUnitButton &&
                    <div hidden>
                        <h3>Search Filter</h3>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                <b>Faculty</b>
                                {faculties.map((item) => {
                                    return <Checkbox label={item.label} value={item.value} />;
                                })}
                                </Grid.Column>
                                <Grid.Column width={8}>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                }
                <Divider />
                <UnitSearchResultsContainer searchResultIndex={this.state.searchResultIndex} empty={this.state.empty} results={this.state.searchResults}  />
            </Menu.Item>
        );
    }
}

UnitSearchContainer.propTypes = {
    addToCourse: PropTypes.func,
    searchVisible: PropTypes.bool,
    close: PropTypes.func,
    willAddUnit: PropTypes.func
};

/**
 * Used for focusing input when sidebar is shown.
 */
const mapStatetoProps = (state) => {
    return {
        searchVisible: state.UI.showingSidebar
    };
};

/**
 * Injects the required actions from redux action creators
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(dataFetchActions, dispatch);
};

export default connect(mapStatetoProps, mapDispatchToProps)(UnitSearchContainer);
