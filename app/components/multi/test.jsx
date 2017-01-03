import React, {Component} from "react";
import fuzzy from "../../utils/fuzzy.js";
import {Input} from "semantic-ui-react";
/**
 * This is a testing module for our Fuzzy search algorithm
 */
 class Test extends Component {
      constructor(props){
          super(props);
          this.handleChange = this.handleChange.bind(this);
      }

      handleChange(e){
          var value = e.target.value;
          if (value.length >= 4) {
            var results = fuzzy(e.target.value);
          }
      }

      render(){
        return (
            <Input placeholder="Search Unit" icon="search" onChange={this.handleChange} />
        );
      }
}

export default Test;
