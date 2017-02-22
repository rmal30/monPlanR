import React, { Component } from "react";
import  { Dropdown, Icon, Button } from "semantic-ui-react";
import { Accordion, AccordionItem } from "react-sanfona";
/**
This component is used in UnitSearchContainer. It filters the serach results based on location, faculty, credit points and/or teaching period.
*/
class FilterButtonContainer extends Component {
    /**
    This component is used in UnitSearchContainer. It filters the serach results based on location, faculty, credit points and/or teaching period.
    */
    constructor(){
        super();
        this.state = {
            showLocation: false,
            showFaculty: false,
            showCreditPoints: false,
            showTeachingPeriod: false,
            showFilter: false
        };

        this.showFilterClick = this.showFilterClick.bind(this);

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
    Handles click for showing/hiding filters.
    */
    showFilterClick(){
        this.setState({showFilter: !this.state.showFilter});
    }

    /**
     * The renderer simply returns a search component populated with the data necessary
     * @author JXNS
     */



    render(){
        return (
        <div>
          <Accordion>
                {[1].map((item) => {
                    return (
                        <AccordionItem title={<Button content={this.state.showFilter ? "Hide Filters" : "Show Filters"} icon={this.state.showFilter ? "minus" : "plus"} labelPosition="left" onClick={() => {this.showFilterClick();}} fluid className='icon filter-margin btnmainblue' />} slug={item} key={item}>
                            <div>
                              <div className={"filter-margin"}>
                                <div className="filter-div">
                                  <Dropdown className="filter-margin" placeholder='Campus' header='Select campus' fluid multiple search selection options={this.locations} />
                                  <Icon name='remove' className={this.state.showLocation ? "filter-margin filter-delete" : "hide-filter"} />
                                </div>
                                <div className="filter-div">
                                  <Dropdown className="filter-margin" placeholder='Faculty' header='Select faculty' fluid multiple search selection options={this.faculties} />
                                  <Icon name='remove' className={this.state.showFaculty ? "filter-margin filter-delete" : "hide-filter"} />
                                </div>
                                <div className="filter-div">
                                  <Dropdown className="filter-margin" placeholder='Credit Points' header='Select credit points' fluid search selection options={this.creditPoints} />
                                  <Icon name='remove' className={this.state.showCreditPoints ? "filter-margin filter-delete" : "hide-filter"} />
                                </div>
                                <div className="filter-div">
                                  <Dropdown className="filter-margin" placeholder='Teaching Period' header='Select teaching period' fluid multiple search selection options={this.teachingPeriods} />
                                  <Icon name='remove' className={this.state.showTeachingPeriod ? "filter-margin filter-delete" : "hide-filter"} />
                                </div>
                              </div>
                            </div>
                        </AccordionItem>
                    );
                })}
            </Accordion>


      </div>
        );
    }
}

export default(FilterButtonContainer);
