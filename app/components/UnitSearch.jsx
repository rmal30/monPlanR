import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'


const test = [
  {"title": "FIT2001",
   "description" : "Systems Development"
  },
  {"title": "FIT2024",
   "description" : "Software Engineering Practice"
  },
  {"title": "FIT2069",
   "description" : "Computer Architecture"
  },
  {"title": "FIT2070",
   "description" : "Operating Systems"
  },
  {"title": "FIT3042",
   "description" : "System Tools"
  },
]

var request = new XMLHttpRequest();
request.open("GET", "../data/units/simple.json", false);
request.send(null);
var source = JSON.parse(request.responseText);    
console.log(JSON.stringify(source))



export default class UnitSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: ''
    };

    this.resetComponent = this.resetComponent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);

  }

  resetComponent() {
    this.setState({ isLoading: false, results: [], value: '' })
  }

  handleChange(e, result) {
     this.setState({ value: result.title })
  }

  handleSearchChange(e, value) {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.UnitCode) || re.test(result.description)

      if (this.results.length > 5) {
        this.setS
      }
      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onChange={this.handleChange}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>

      </Grid>
    )
  }
}