import _ from "lodash";
import React, { Component, PropTypes } from "react";
import { Search } from "semantic-ui-react";
import UnitQuery from "../utils/UnitQuery";
import UnitSearchResult from "../components/Unit/UnitSearchResult.jsx";

/**
 * Source is initialised here, it is populated later with responses from API
 */
let source = {};

/**
 * The result renderer function dictates what form results should be returned
 */
let resultRenderer = ({ UnitCode, UnitName, id, custom }) => (
    <UnitSearchResult
        UnitCode={UnitCode}
        UnitName={UnitName}
        custom={custom}
        id={id}
    />
);

resultRenderer.propTypes = {
    UnitCode: PropTypes.string,
    UnitName: PropTypes.string,
    id: PropTypes.number,
    custom: PropTypes.bool
};

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
            value: ""
        };

        this.resetComponent = this.resetComponent.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
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
        if(result.custom) {
            this.props.addCustomUnit(result.UnitCode.toUpperCase());
        } else {
            this.props.addToCourse(result.UnitCode);
        }

        this.resetComponent();
    }

    /**
     * Handle search change updates the currently entered text in the prompt and searchs through the results based on the currently entered text.
     * @author JXNS
     */
    handleSearchChange(e, value) {
        this.setState({ isLoading: true, value });

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

                if(reUnitCode.test(value.trim())) {
                    reducedResults.push({
                        UnitCode: value,
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
                        custom: result.custom || false
                    }
                )
            );

            /*
                BUG: Semantic UI React integration populates props in a div tag within SearchResult.js,
                     as a side effect of the augmentation feature. This gives the unknown props on <div> tag
            */

            this.setState({
                isLoading: false,
                results: reducedResults,
            });
        }, 500);
    }

    /**
     * The renderer simply returns a search component populated with the data necessary
     * @author JXNS
     */
    render() {
        const { isLoading, value, results } = this.state;

        return (
            <Search
                loading={isLoading}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={value}
                placeholder={"Search Unit"}
                noResultsMessage={"No units found"}
				selectFirstResult={true}
                resultRenderer={resultRenderer}
                onResultSelect={this.handleResultSelect}>
                </Search>
        );
    }
}

UnitSearchContainer.propTypes = {
    addToCourse: PropTypes.func,
    addCustomUnit: PropTypes.func
};

export default UnitSearchContainer;
