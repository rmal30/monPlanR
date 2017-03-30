import React, { Component, PropTypes } from "react";
import  { Dropdown, Button, Header } from "semantic-ui-react";
import { Accordion, AccordionItem } from "react-sanfona";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as filterActions from "../../actions/FilterActions";
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
        this.handleFacultyChange = this.handleFacultyChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleCreditPointChange = this.handleCreditPointChange.bind(this);
        this.handleTeachingPeriodChange = this.handleTeachingPeriodChange.bind(this);

        this.faculties = [
            {text: "Art, Design and Architecture", value: "Faculty of Art, Design and Architecture"},
            {text: "Arts", value: "Faculty of Arts"},
            {text: "Business and Economics", value: "Faculty of Business and Economics"},
            {text: "Education", value: "Faculty of Education"},
            {text: "Engineering", value: "Faculty of Engineering"},
            {text: "Information Technology", value: "Faculty of Information Technology"},
            {text: "Law", value: "Faculty of Law"},
            {text: "Science", value: "Faculty of Science"},
            {text: "Medicine, Nursing and Health Sciences", value: "Faculty of Medicine, Nursing and Health Sciences"},
            {text: "Pharmacy and Pharmaceutical Sciences", value: "Faculty of Pharmacy and Pharmaceutical Sciences"}
        ];
        this.locations = [
            {text:"Clayton", value: "Clayton", flag: "au"},
            {text: "Caulfield", value: "Caulfield", flag: "au"},
            {text: "Berwick", value: "Berwick", flag: "au"},
            {text: "Peninsula", value: "Peninsula", flag: "au"},
            {text: "City", value: "City (Melbourne)", flag: "au"},
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
    Handles location change and dispatches action to filter reducer.
    */
    handleLocationChange(e, data){
        this.props.updateLocationFilter(data.value);
        this.props.onFilterChange();
    }
    /**
    Handles faculty change and dispatches action to filter reducer.
    */
    handleFacultyChange(e, data){
        this.props.updateFacultyFilter(data.value);
        this.props.onFilterChange();
    }
    /**
    Handles credit point change and dispatches action to filter reducer.
    */
    handleCreditPointChange(e){
        this.props.updateCreditPointRangeFilter(e[0],e[1]);
        this.props.onFilterChange();
    }
    /**
    Handles teaching period change and dispatches action to filter reducer.
    */
    handleTeachingPeriodChange(e, data){
        this.props.updateTeachingPeriodFilter(data.value);
        this.props.onFilterChange();
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
                            color="orange"
                            fluid className='icon filter-margin filter-button'/>} slug={item} key={item}>
                            <div>
                              <div>
                                <div>
                                  <Dropdown className="filter-margin-small" placeholder='Campus' onChange={this.handleLocationChange} fluid multiple search selection options={this.locations} />
                                </div>
                                <div className="filter-div">
                                  <Dropdown className="filter-margin" placeholder='Faculty' onChange={this.handleFacultyChange} fluid multiple search selection options={this.faculties} />
                                </div>
                                <div className="filter-div">
                                  <Dropdown className="filter-margin" placeholder='Teaching Period' onChange={this.handleTeachingPeriodChange} fluid multiple search selection options={this.teachingPeriods} />
                                </div>
                                <div className={"slider-dressing"}>
                                   <Header as='h4'>Credit Points</Header>
                                    <Range onChange={this.handleCreditPointChange}
                                           min={0}
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
Mapping state to props
*/
const mapStateToProps = (state) => {
    return {
        unitSearchIsLoading: state.UnitSearch.unitSearchIsLoading
    };
};
/**
Mapping dispatch to props
*/
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(filterActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterButtonContainer);

FilterButtonContainer.propTypes = {
    unitSearchIsLoading: PropTypes.bool,
    updateFacultyFilter: PropTypes.func,
    updateLocationFilter: PropTypes.func,
    updateCreditPointRangeFilter: PropTypes.func,
    updateTeachingPeriodFilter: PropTypes.func,
    onFilterChange: PropTypes.func
};
