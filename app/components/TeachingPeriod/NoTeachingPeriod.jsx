import React, { PropTypes } from "react";
import { Container, Dropdown, Header, Icon, Table } from "semantic-ui-react";

import InsertTeachingPeriodButton from "./InsertTeachingPeriodButton.jsx";

import YearCalc from "../../utils/YearCalc.js";

/**
 * This component is displayed when there are no teaching periods in the course
 * structure.
 */
export default function NoTeachingPeriod({ numberOfUnits, placeholderStartYear, startYear, changeStartYear, semesterString, showInsertTeachingPeriodsUI, appendSemester, mobile, noFloat }) {
    NoTeachingPeriod.propTypes = {
        numberOfUnits: PropTypes.number.isRequired,
        placeholderStartYear: PropTypes.number.isRequired,
        startYear: PropTypes.number,
        changeStartYear: PropTypes.func.isRequired,
        semesterString: PropTypes.string.isRequired,
        showInsertTeachingPeriodsUI: PropTypes.func.isRequired,
        appendSemester: PropTypes.func.isRequired,
        mobile: PropTypes.bool,
        noFloat: PropTypes.bool
    };

    return (
        <Table.Row>
            <Table.Cell colSpan={numberOfUnits + 1} style={{overflow: "visible"}}>
              <Header as="h3" icon textAlign="center">
                  <Icon name="calendar" />
                  No teaching periods
                  <Header.Subheader>
                      Click add semester button below to get started.
                  </Header.Subheader>
              </Header>
              <Container textAlign="center">
                  <Dropdown
                      onChange={(e, { value }) => changeStartYear(parseInt(value))}
                      placeholder="Select start year" search selection
                      value={startYear || ""}
                      options={YearCalc.getStartYearVals(placeholderStartYear)}/>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <InsertTeachingPeriodButton
                      semesterString={semesterString}
                      showInsertTeachingPeriodsUI={showInsertTeachingPeriodsUI}
                      appendSemester={appendSemester}
                      mobile={mobile}
                      noFloat={noFloat}
                      />
              </Container>
            </Table.Cell>
        </Table.Row>
    );
}
