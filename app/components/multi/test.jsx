import React, {Component} from "react";
import fuzzy from "../../utils/fuzzy";
import UnitQuery from "../../utils/UnitQuery";
import {Input} from "semantic-ui-react";
/**
 * This is a testing module for our Fuzzy search algorithm
 */
 class Test extends Component {
      constructor(props){
          super(props);
          this.state = {
              results: [],
              data: {}
          }
          this.handleChange = this.handleChange.bind(this);
      }

      handleChange(e){
          var value = e.target.value;
          if (value.length > 0) {
            var results = fuzzy(e.target.value, this.state.data);
            let newResults = results.map(value => {
                return value.item.UnitCode + " - " + value.item.UnitName
            });
            this.setState({results: newResults});
          }
      }

      componentWillMount() {
          UnitQuery.getUnitCodeAndUnitNames()
            .then(response => {
                let data = response.data;
                this.setState({data: data});
            })
            .catch(err => {
                console.log(err);
            });
      }

      render(){
        return (
            <div>
                <Input placeholder="Search Unit" icon="search" onChange={this.handleChange} />
                <h4>Results: </h4>
                <ul>{this.state.results.map(item => {return <li>{item}</li>})}</ul>
            </div>
            
        );
      }
}

export default Test;
