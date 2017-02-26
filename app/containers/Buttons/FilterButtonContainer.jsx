import React, { Component, PropTypes } from "react";
import  { Dropdown, Button, Header } from "semantic-ui-react";
import { Accordion, AccordionItem } from "react-sanfona";
import { connect } from "react-redux";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

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
     * The renderer simply returns a search component populated with the data necessary with Filters
     * @author JXNS, CCS, Eric Jiang
     */
    render(){
        return (
        <div>
          <Accordion onChange={() => {this.showFilterClick();}}>
                {[1].map((item) => {
                    return (
                        <AccordionItem title={<Button
                            disabled={this.props.unitSearchIsLoading}
                            content={this.state.showFilter ? "Hide Filters" : "Show Filters"}
                            icon={this.state.showFilter ? "minus" : "plus"}
                            labelPosition="left"
                            fluid className='icon filter-margin btnmainblue' />} slug={item} key={item}>
                            <div>
                              <div className={"filter-margin"}>
                                <div className="filter-div">
                                  <Dropdown className="filter-margin" placeholder='Campus' fluid multiple search selection options={this.locations} />
                                </div>
                                <div className="filter-div">
                                  <Dropdown className="filter-margin" placeholder='Faculty' fluid multiple search selection options={this.faculties} />
                                </div>
                                <div className="filter-div">
                                  <Dropdown className="filter-margin" placeholder='Teaching Period' fluid multiple search selection options={this.teachingPeriods} />
                                </div>
                                <div className={"slider-dressing"}>
                                   <Header as='h4'>Credit Points</Header>
                                    <Range min={0}
                                           max={48}
                                           step={null}
                                           defaultValue={[0,48]}
                                           marks={{0:"0", 3:"3", 6:"6", 12:"12", 18:"18", 24:"24", 36:"36", 48:"48"}}/>
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

/**
Handles click for showing/hiding filters.
*/
const mapStateToProps = (state) => {
    return {
        unitSearchIsLoading: state.CourseStructure.unitSearchIsLoading
    };
};
export default connect(mapStateToProps)(FilterButtonContainer);

FilterButtonContainer.propTypes = {
    unitSearchIsLoading: PropTypes.bool
};
