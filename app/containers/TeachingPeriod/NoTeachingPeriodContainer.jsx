import React, { PropTypes } from "react";
import { Container, Dropdown, Header, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as courseActions from "../../actionCreators/CourseActions";
import InsertTeachingPeriodButton from "../../components/TeachingPeriod/InsertTeachingPeriodButton.jsx";

import YearCalc from "../../utils/YearCalc.js";

/**
 * This component is displayed when there are no teaching periods in the course
 * structure.
 */
const NoTeachingPeriodContainer = (props) => {
    const 
        {   
            numberOfUnits, 
            viewOnly,
            startYear,
            mobile,
            noFloat,
            teachingPeriods,
            teachingPeriodData
        } = props;

    let { nextSemesterString } = props; 

    /**
     * Pulls function from redux, inserting a semester
     */
    const handleInsertSemester = (code) => {
        props.insertTeachingPeriod(0, startYear, code);
    };

    /**
     * Pulls a function from redux for adding a semester to the end of the array
     */
    const handleAppendSemester = () => {
        props.addTeachingPeriod(teachingPeriods, startYear, teachingPeriodData);
    };
    
    /**
     * Pulls a function from redux handling the changing of the start year
     */
    const handleChangeYear = (year) => {
        props.changeStartYear(year);
    };


    if (nextSemesterString === null){
        nextSemesterString =  "Semester 1, 2016";
    }
    return (
        <Table.Row>
            <Table.Cell colSpan={numberOfUnits + 1} style={{overflow: "visible"}}>
              <Header as="h3" icon textAlign="center">
                  <Icon name="calendar" />
                  No teaching periods
                  {!viewOnly &&
                      <Header.Subheader>
                          Click add semester button below to get started.
                      </Header.Subheader>
                  }
              </Header>
              {!viewOnly &&
                  <Container textAlign="center">
                      <Dropdown
                          onChange={(e, { value }) => handleChangeYear(parseInt(value))}
                          placeholder="Select start year" search selection
                          value={startYear || ""}
                          options={YearCalc.getStartYearVals(startYear)}/>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <InsertTeachingPeriodButton
                          semesterString={nextSemesterString}
                          insert={code => handleInsertSemester(code)}
                          addSemester={handleAppendSemester}
                          mobile={mobile}
                          noFloat={noFloat}
                          />
                  </Container>
              }
            </Table.Cell>
        </Table.Row>
    );
};

/**
 * grabs the necessary props from redux store
 */
const mapStateToProps = (state) => {
    return {
        numberOfUnits: state.CourseStructure.numberOfUnits,
        startYear: state.CourseStructure.startYear,
        nextSemesterString: state.CourseStructure.nextSemesterString,
        teachingPeriods: state.CourseStructure.teachingPeriods,
        teachingPeriodData: state.CourseStructure.teachingPeriodData
        
    };
};

/**
 * grabs functions necessary
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(courseActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NoTeachingPeriodContainer);


NoTeachingPeriodContainer.propTypes = {
    numberOfUnits: PropTypes.number.isRequired,
    startYear: PropTypes.number,
    changeStartYear: PropTypes.func.isRequired,
    nextSemesterString: PropTypes.string,
    insertTeachingPeriod: PropTypes.func.isRequired,
    addTeachingPeriod: PropTypes.func.isRequired,
    mobile: PropTypes.bool,
    noFloat: PropTypes.bool,
    viewOnly: PropTypes.bool,
    teachingPeriods: PropTypes.array,
    teachingPeriodData: PropTypes.array
};