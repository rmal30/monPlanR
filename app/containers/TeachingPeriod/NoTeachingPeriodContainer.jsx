import React, { PropTypes } from "react";
import { Container, Dropdown, Header, Icon, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as courseActions from "../../actions/CourseActions";
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
            nextSemesterString, 
            viewOnly,
            startYear,
            mobile,
            noFloat
        } = props;

    const handleInsertSemester = (code) => {
        props.insertTeachingPeriod(0, startYear, code);
    };

    const handleAppendSemester = () => {
        props.addTeachingPeriod(startYear, "S1-01"); //hardcoded until we deal with the generate next add thing
    };
    
    const handleChangeYear = (year) => {
        props.changeStartYear(year);
    };

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
                          appendSemester={handleAppendSemester}
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
 * 
 */
const mapStateToProps = (state) => {
    return {
        numberOfUnits: state.CourseStructure.numberOfUnits,
        startYear: state.CourseStructure.startYear,
        nextSemesterString: state.CourseStructure.nextSemesterString
        
    };
};

/**
 * 
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(courseActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NoTeachingPeriodContainer);


NoTeachingPeriodContainer.propTypes = {
    numberOfUnits: PropTypes.number.isRequired,
    startYear: PropTypes.number,
    changeStartYear: PropTypes.func.isRequired,
    nextSemesterString: PropTypes.string.isRequired,
    insertTeachingPeriod: PropTypes.func.isRequired,
    appendSemester: PropTypes.func.isRequired,
    mobile: PropTypes.bool,
    noFloat: PropTypes.bool,
    viewOnly: PropTypes.bool
};