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
let resultRenderer = ({ UnitCode, UnitName }) => (
    <UnitSearchResult
        UnitCode={UnitCode}
        UnitName={UnitName}
    />
);

resultRenderer.propTypes = {
    UnitCode: PropTypes.string,
    UnitName: PropTypes.string
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
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);

    }

    /**
     * Before the component mounts we query the database for the unit info.
     * @author JXNS
     */
    componentDidMount() {
        UnitQuery.getUnitCodeAndUnitNames()
            .then(function(response) {
                source = response.data;
                this.setState({
                    isLoading: false
                });
            }.bind(this))
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
     * Handle change is called whenever the user selects a result, this function calls the parent onResult function and the resets the component.
     * @author JXNS
     */
    handleChange(e, result) {
        this.props.onResult(result.UnitCode);
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
             * isMatch checks whether a result matches a regex for the Unit Code or Unit Name of a unit
             */
            const isMatch = (result) => re.test(result.UnitCode) || re.test(result.UnitName);
            let matches = _.filter(source, isMatch);
            let reducedResults;
            if (matches.length > 5){
                reducedResults = matches.slice(0,5);
            } else {
                reducedResults = matches;
            }

            reducedResults = reducedResults.map(result =>
                // TODO: Find way to avoid workaround that fixes unknown key bug by setting childKey attribute.
                Object.assign({}, {childKey: `${result.UnitCode}`, UnitName: result.UnitName, UnitCode: result.UnitCode})
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
                onChange={this.handleChange}>
                </Search>
        );
    }
}

UnitSearchContainer.propTypes = {
    onResult: PropTypes.func
};

export default UnitSearchContainer;
