import _ from "lodash";
import React, { Component } from "react";
import { Search, Grid, Header, Item } from "semantic-ui-react";
import getUnitData from "../../utils/unitSearch";
import axios from 'axios';

let source = [
    { UnitCode: "FIT2001", UnitName: "Systems Development"}

]
const resultRenderer = ({UnitCode, UnitName}) => (
    <div className="content">
        <div className="title">{UnitCode}</div>
        <div className="description">{UnitName}</div>
    </div>
    
)

export default class UnitSearch extends Component {
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
        this.handleResultSelect = this.handleResultSelect.bind(this);

    }

    componentDidMount() {
        /*
        axios.get("../../data/units/simple.json")
            .then(function(response) {
                source = response.data;
                this.setState({
                    isLoading: false
                })
            })
            .catch(function(error) {
                console.log(error);
            })
            */
    }

    resetComponent() {
        this.setState({ isLoading: false, results: [], value: ""});
    }

    handleChange(e, result) {
        this.setState({ 
            value: result.UnitCode,
        });
    }

    handleSearchChange(e, value) {
        this.setState({ isLoading: true, value });

        setTimeout(() => {
            if(this.state.value.length < 1) {
                return this.resetComponent();
            }

            const re = new RegExp(_.escapeRegExp(this.state.value), "i");
            const isMatch = (result) => re.test(result.UnitCode) || re.test(result.UnitName);
            let matches = _.filter(source, isMatch)
            let reducedResults
            if (matches.length > 5){
                reducedResults = matches.slice(0,5)
            } else {
                reducedResults = matches
            }
            
            this.setState({
                isLoading: false,
                results: reducedResults,
            });
        }, 500);
    }

    handleResultSelect(){
        alert("hello")
    }

    render() {
        const { isLoading, value, results } = this.state;

        return (
            <Search
                resultRenderer={resultRenderer}
                loading={isLoading}
                onChange={this.handleChange}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={value}
                placeholder="Add Unit"
                noResultsMessage="No units found"
                onResultSelect={this.handleResultSelect}
                {...this.props}
            />
        );
    }
}
