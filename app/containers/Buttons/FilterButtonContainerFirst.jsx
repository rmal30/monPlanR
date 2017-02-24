import React, { Component } from "react";
import  { Dropdown, Icon } from "semantic-ui-react";

/**
This component is used in UnitSearchContainer. It filters the serach results based on location, faculty, credit points and/or teaching period.
*/
class FilterButtonContainerFirst extends Component {
    /**
    This component is used in UnitSearchContainer. It filters the serach results based on location, faculty, credit points and/or teaching period.
    */
    constructor(){
        super();
        this.state = {
            showLocation: false,
            showFaculty: false,
            showCreditPoints: false,
            showTeachingPeriod: false
        };

        this.showLocationClick = this.showLocationClick.bind(this);
        this.showFacultyClick = this.showFacultyClick.bind(this);
        this.showCreditPointsClick = this.showCreditPointsClick.bind(this);
        this.showTeachingPeriodClick = this.showTeachingPeriodClick.bind(this);

        this.faculties = [
            {text: "Art, Design and Architecture", value: "Art, Design and Architecture"},
            {text: "Arts", value: "Arts"},
            {text: "Business and Economics", value: "Business and Economics"},
            {text: "Education", value: "Education"},
            {text: "Engineering", value: "Engineering"},
            {text: "Information Technology", value: "Information Technology"},
            {text: "Law", value: "Law"},
            {text: "Science", value: "Science"},
            {text: "Medicine, Nursing and Health Sciences", value: "Medicine, Nursing and Health Sciences"},
            {text: "Pharmacy and Pharmaceutical Sciences", value: "Pharmacy and Pharmaceutical Sciences"}
        ];
        this.locations = [
            {text:"Clayton", value: "Clayton", flag: "au"},
            {text: "Caulfield", value: "Caulfield", flag: "au"},
            {text: "Berwick", value: "Berwick", flag: "au"},
            {text: "Peninsula", value: "Peninsula", flag: "au"},
            {text: "City", value: "City", flag: "au"},
            {text: "South Africa", value: "South Africa", flag: "za"},
            {text: "Malaysia", value: "Malaysia", flag: "my"},
            {text: "Prato", value: "Prato", flag: "it"}
        ];
        this.creditPoints = [
            {text: "0", value: 0},
            {text: "3", value: 3},
            {text: "6", value: 6},
            {text: "12", value: 12},
            {text: "18", value: 18},
            {text: "24", value: 24},
        ];
        this.teachingPeriods = [
            {text: "Full year", value: "Full year"},
            {text: "First semester", value: "First semester"},
            {text: "Second semester", value: "Second semester"},
            {text: "Summer semester", value: "Summer semester"},
            {text: "Winter semester", value: "Winter semester"},
            {text: "Other", value: "Other"},
        ];
    }

    /**
    Handles click for showing/hiding campus filter in search.
    */
    showLocationClick(){
        this.setState({showLocation: !this.state.showLocation});
    }
    /**
    Handles click for showing/hiding faculty filter in search.
    */
    showFacultyClick(){
        this.setState({showFaculty: !this.state.showFaculty});
    }
    /**
    Handles click for showing/hiding credit points filter in search.
    */
    showCreditPointsClick(){
        this.setState({showCreditPoints: !this.state.showCreditPoints});
    }
    /**
    Handles click for showing/hiding teachng period filter in search.
    */
    showTeachingPeriodClick(){
        this.setState({showTeachingPeriod: !this.state.showTeachingPeriod});
    }

    /**
     * The renderer simply returns a search component populated with the data necessary
     * @author JXNS
     */
    render(){
        return (
        <div>
          <div>
            <Dropdown text='Add filter' icon='plus'  fluid floating labeled button className='icon filter-margin btnmainblue'>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => {this.showLocationClick();}}>Campus</Dropdown.Item>
                <Dropdown.Item onClick={() => {this.showFacultyClick();}}>Faculty</Dropdown.Item>
                <Dropdown.Item onClick={() => {this.showCreditPointsClick();}}>Credit points</Dropdown.Item>
                <Dropdown.Item onClick={() => {this.showTeachingPeriodClick();}}>Teaching period</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="filter-div">
          <Dropdown className={this.state.showLocation ? "filter-margin" : "hide-filter"} placeholder='Campus' header='Select campus' fluid multiple search selection options={this.locations} />
          <Icon name='remove' className={this.state.showLocation ? "filter-margin filter-delete" : "hide-filter"} onClick={() => {this.showLocationClick();}}/>
          </div>
          <div className="filter-div">
          <Dropdown className={this.state.showFaculty ? "filter-margin" : "hide-filter"} placeholder='Faculty' header='Select faculty' fluid multiple search selection options={this.faculties} />
          <Icon name='remove' className={this.state.showFaculty ? "filter-margin filter-delete" : "hide-filter"} onClick={() => {this.showFacultyClick();}}/>
          </div>
          <div className="filter-div">
          <Dropdown className={this.state.showCreditPoints ? "filter-margin" : "hide-filter"} placeholder='Credit Points' header='Select credit points' fluid search selection options={this.creditPoints} />
          <Icon name='remove' className={this.state.showCreditPoints ? "filter-margin filter-delete" : "hide-filter"} onClick={() => {this.showCreditPointsClick();}}/>
          </div>
          <div className="filter-div">
          <Dropdown className={this.state.showTeachingPeriod ? "filter-margin" : "hide-filter"} placeholder='Teaching Period' header='Select teaching period' fluid multiple search selection options={this.teachingPeriods} />
          <Icon name='remove' className={this.state.showTeachingPeriod ? "filter-margin filter-delete" : "hide-filter"} onClick={() => {this.showTeachingPeriodClick();}}/>
          </div>
      </div>
        );
    }
}

export default(FilterButtonContainerFirst);
