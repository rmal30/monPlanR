import React, { Component, PropTypes } from "react";
import {Button, Container, Dropdown, Grid, Header, Icon, Label, Message, Segment, Table} from "semantic-ui-react";
import axios from "axios";
var MediaQuery = require("react-responsive");

import Home from "./base/Home.jsx";

import TeachingPeriod from "./TeachingPeriod/TeachingPeriod.jsx";
import InsertTeachingPeriod from "./TeachingPeriod/InsertTeachingPeriod.jsx";

/**
 * CourseStructure holds a table that allows students to plan their courses by
 * adding, moving and deleting units. It also holds action and status components
 * to give students feedback and ability to change the course structure.
 *
 * @extends React.Component
 * @param {number} startYear - The year the student commerces their course.
 * @param {number} endYear - The expected graduation year.
 */
class CourseStructure extends Component {

    /**
     * Initialises state that holds a list of teachingPeriods.
     *
     * @param props - React props
     */
    constructor(props) {
        super(props);

        const { startYear, endYear } = this.props;

        this.state = {
            numberOfUnits: 4,
            showInsertTeachingPeriods: false,
            teachingPeriods: this.generateCourse(startYear, endYear),
            teachingPeriodsData: null,
            showMoveUnitUI: false,
            unitToBeMoved: undefined
        };

        // Fetch common teaching periods to get names for each teaching period code.
        axios.get("/data/teachingPeriods/common.json")
             .then(response => {
                 function compareDate(a, b) {
                     return Math.sign(new Date(...a.split("/").reverse()) - new Date(...b.split("/").reverse()));
                 }

                 response.data.sort(
                     (a, b) => compareDate(a.startDate, b.startDate) !== 0 ? compareDate(a.startDate, b.startDate) : compareDate(b.endDate, a.endDate)
                 );

                 this.setState({
                     teachingPeriodsData: response.data
                 });
             });

        this.generateCourse = this.generateCourse.bind(this);
    }

    /**
     * Generates a course structure of semester one and semester two teaching
     * periods, given start year and end year.
     *
     * @author Eric Jiang, Saurabh Joshi
     * @param {number} startYear - When the student commerces their course.
     * @param {number} endYear - When the student is expected to graduate.
     */
    generateCourse(startYear, endYear) {
        if(endYear - startYear > 12 || startYear === null || endYear === null) {
            startYear = new Date().getFullYear();
            endYear = startYear + 3;
        }

        if(startYear <= endYear) {
            const arr = [];
            for(let year = startYear; year <= endYear; year++) {
                const semesterOneTeachingPeriod = {
                    year,
                    code: "S1-01",
                    numberOfUnits: 4,
                    units: [null, null, null, null]
                };

                const semesterTwoTeachingPeriod = {
                    year,
                    code: "S2-01",
                    numberOfUnits: 4,
                    units: [null, null, null, null]
                };

                arr.push(semesterOneTeachingPeriod);
                arr.push(semesterTwoTeachingPeriod);
            }

            return arr;
        }

        return [];
    }

    /**
     * Displays add teaching period buttons in between the teaching period
     * table rows.
     *
     * @author Saurabh Joshi
     * @param {string} teachingPeriodToInsertCode - what teaching period are we
     * inserting
     */
    showInsertTeachingPeriodsUI(teachingPeriodToInsertCode) {
        this.setState({
            showInsertTeachingPeriods: true,
            teachingPeriodToInsertCode
        });
    }

    /**
     * Hides the add teaching period buttons in between the teaching period
     * table rows.
     *
     * @author Saurabh Joshi
     */
    hideInsertTeachingPeriodsUI() {
        this.setState({
            showInsertTeachingPeriods: false
        });
    }

    /**
     * Inserts teaching period at a specified index.
     *
     * @author Saurabh Joshi
     * @param {number} index - Which index in array to insert the teaching period
     * @param {number} year - Year of teaching period that was taken place
     * @param {string} code - Teaching period code.
     */
    insertTeachingPeriod(index, year, code) {
        const teachingPeriods = [
            ...this.state.teachingPeriods.slice(0, index),
            {
                code,
                year,
                numberOfUnits: 4,
                units: [null, null, null, null]
            },
            ...this.state.teachingPeriods.slice(index)
        ];

        this.setState({
            showInsertTeachingPeriods: false,
            teachingPeriods
        });
    }

    /**
     * A quick option for students to insert semesters at the end of their
     * course structures.
     *
     * @author Saurabh Joshi
     */
    appendSemester() {
        const index = this.state.teachingPeriods.length;
        let year = new Date().getFullYear();
        let s1Code = "S1-01";
        let s2Code = "S2-01";

        let code = s1Code;

        const { teachingPeriods, teachingPeriodsData } = this.state;

        if(!teachingPeriodsData) {
            return;
        }

        if(index > 0) {
            const startIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[index - 1].code);
            const s1middleIndex = teachingPeriodsData.findIndex(ele => ele.code === s1Code);
            const s2middleIndex = teachingPeriodsData.findIndex(ele => ele.code === s2Code);

            year = teachingPeriods[index - 1].year;

            if(startIndex < s1middleIndex) {
                // do nothing
            } else if(startIndex < s2middleIndex) {
                code = s2Code;
            } else if(startIndex >= s1middleIndex) {
                year ++;
            }
        }

        this.insertTeachingPeriod(index, year, code);
    }

    /**
     * Gets the quick semester append string to be displayed on the button.
     *
     * @author Saurabh Joshi
     */
    getQuickSemesterString() {
        const index = this.state.teachingPeriods.length;
        let year = new Date().getFullYear();
        let s1Code = "S1-01";
        let s2Code = "S2-01";

        let code = s1Code;

        const { teachingPeriods, teachingPeriodsData } = this.state;

        if(!teachingPeriodsData) {
            return;
        }

        if(index > 0) {
            const startIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[index - 1].code);
            const s1middleIndex = teachingPeriodsData.findIndex(ele => ele.code === s1Code);
            const s2middleIndex = teachingPeriodsData.findIndex(ele => ele.code === s2Code);

            year = teachingPeriods[index - 1].year;

            if(startIndex < s1middleIndex) {
                // do nothing
            } else if(startIndex < s2middleIndex) {
                code = s2Code;
            } else if(startIndex >= s1middleIndex) {
                year ++;
            }
        }

        let teachingPeriodName = code;

        if(teachingPeriodsData) {
            const teachingPeriod = teachingPeriodsData.find((element) =>
                element.code === code
            );

            if(teachingPeriod !== undefined) {
                teachingPeriodName = teachingPeriod.name || code;
            }
        }

        return `${teachingPeriodName}, ${year}`;
    }

    /**
     * Inserts unit into course structure.
     *
     * @author Saurabh Joshi
     * @param {number} teachingPeriodIndex
     * @param {number} unitIndex
     * @param {string} code
     * @param {string} name
     */
    addUnit(teachingPeriodIndex, unitIndex, unitToAdd) {
        const { teachingPeriods } = this.state;
        teachingPeriods[teachingPeriodIndex].units[unitIndex] = unitToAdd;
        this.setState({ teachingPeriods });
        this.props.doneAddingToCourse();
    }

    /**
     * Allows user to move unit into another table cell.
     *
     * @author Saurabh Joshi
     * @param {number} teachingPeriodIndex
     * @param {number} unitIndex
     */
    willMoveUnit(teachingPeriodIndex, unitIndex) {
        this.setState({
            showMoveUnitUI: true,
            originalPosition: [teachingPeriodIndex, unitIndex],
            unitToBeMoved: this.state.teachingPeriods[teachingPeriodIndex].units[unitIndex]
        });
    }

    /**
     * Cancels the move unit operation.
     *
     * @author Saurabh Joshi
     */
    cancelMoving() {
        this.setState({
            showMoveUnitUI: false,
            originalPosition: undefined,
            unitToBeMoved: undefined
        });
    }

    /**
     * Moves unit to specified position.
     *
     * @param {number} teachingPeriodIndex
     * @param {number} unitIndex
     */
    moveUnit(teachingPeriodIndex, unitIndex) {
        const { teachingPeriods } = this.state;
        teachingPeriods[this.state.originalPosition[0]].units[this.state.originalPosition[1]] = undefined;
        teachingPeriods[teachingPeriodIndex].units[unitIndex] = this.state.unitToBeMoved;
        this.setState({
            showMoveUnitUI: false,
            originalPosition: undefined,
            teachingPeriods: teachingPeriods
        });
    }

    /**
     * Swaps units over according to their positions. This method is used
     * when the student wants to move their unit to another position where the
     * table cell is occupied by another unit.
     *
     * @param {number} teachingPeriodIndex
     * @param {number} unitIndex
     */
    swapUnit(teachingPeriodIndex, unitIndex) {
        const { teachingPeriods } = this.state;
        const temp = teachingPeriods[teachingPeriodIndex].units[unitIndex];
        teachingPeriods[teachingPeriodIndex].units[unitIndex] = teachingPeriods[this.state.originalPosition[0]].units[this.state.originalPosition[1]];
        teachingPeriods[this.state.originalPosition[0]].units[this.state.originalPosition[1]] = temp;
        this.setState({
            showMoveUnitUI: false,
            originalPosition: undefined,
            teachingPeriods: teachingPeriods
        });
    }

    /**
     * Deletes a teaching period at a specified index.
     *
     * @author Saurabh Joshi
     * @param {number} index - Which teaching period in list to delete.
     */
    deleteTeachingPeriod(index) {
        const teachingPeriods = [
            ...this.state.teachingPeriods.slice(0, index),
            ...this.state.teachingPeriods.slice(index + 1)
        ];

        this.setState({ teachingPeriods });
    }

    /**
     * Deletes a unit at a specified teaching period index and specified unit
     * index. This is done by setting the array element to undefined.
     *
     * @author Saurabh Joshi
     * @param {number} teachingPeriodIndex - Which teaching period are you referring to.
     * @param {number} unitIndex - Which unit in teaching period to remove.
     */
    deleteUnit(teachingPeriodIndex, unitIndex) {
        const { teachingPeriods } = this.state;
        teachingPeriods[teachingPeriodIndex].units[unitIndex] = undefined;
        this.setState({ teachingPeriods });
    }

    /**
     * Returns a rendered teaching period component as a table row to be used in
     * a table.
     *
     * @author Saurabh Joshi
     * @param {number} teachingPeriod - The teaching period object.
     * @param {number} index - For bookkeeping which teaching period is which.
     */
    renderTeachingPeriod(teachingPeriod, index) {
        return <TeachingPeriod
                    key={`${teachingPeriod.year}-${teachingPeriod.code}`}
                    index={index}
                    year={teachingPeriod.year}
                    code={teachingPeriod.code}
                    data={this.state.teachingPeriodsData}
                    numberOfUnits={teachingPeriod.numberOfUnits}
                    deleteTeachingPeriod={this.deleteTeachingPeriod.bind(this)}
                    addUnit={this.addUnit.bind(this)}
                    moveUnit={this.moveUnit.bind(this)}
                    swapUnit={this.swapUnit.bind(this)}
                    willMoveUnit={this.willMoveUnit.bind(this)}
                    deleteUnit={this.deleteUnit.bind(this)}
                    unitToAdd={this.props.unitToAdd}
                    showMoveUnitUI={this.state.showMoveUnitUI}
                    unitToBeMoved={this.state.unitToBeMoved}
                    units={teachingPeriod.units} />;
    }

    /**
     * Returns a table of teaching periods as table rows, and in teaching period
     * holds a list of units represented as table cells. It also renders an add button
     * as well as some status labels.
     *
     * TODO: Modularise into smaller components for course structure.
     *
     * @author Saurabh Joshi
     */
    render() {
        const tableRows = [];
        let year, code, show = false;
        const { teachingPeriodToInsertCode, teachingPeriods, teachingPeriodsData, showInsertTeachingPeriods } = this.state;
        if(showInsertTeachingPeriods) {
            year = new Date().getFullYear();
            code = teachingPeriodToInsertCode;
        }

        for(let i = 0; i <= teachingPeriods.length; i++) {
            show = true;
            if(i !== 0) {
                tableRows.push(this.renderTeachingPeriod(teachingPeriods[i - 1], i - 1));
                year = teachingPeriods[i - 1].year;

                if(!showInsertTeachingPeriods) {
                    continue;
                }

                if(i !== teachingPeriods.length) {
                    const startIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[i - 1].code);
                    const middleIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriodToInsertCode);
                    const endIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[i].code);

                    if(startIndex !== -1 && endIndex !== -1) {
                        if(teachingPeriods[i - 1].year === teachingPeriods[i].year && startIndex < middleIndex && middleIndex < endIndex) {
                            year = teachingPeriods[i - 1].year;
                        }  else if(teachingPeriods[i - 1].year !== teachingPeriods[i].year) {
                            if(startIndex >= middleIndex && middleIndex >= endIndex) {
                                continue;
                            }
                            year = teachingPeriods[i - 1].year;

                            if(startIndex >= middleIndex) {
                                year ++;
                            }
                        } else {
                            continue;
                        }
                    }
                } else {
                    const startIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[i - 1].code);
                    const middleIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriodToInsertCode);

                    year = teachingPeriods[i - 1].year;

                    if(startIndex >= middleIndex) {
                        year ++;
                    }
                }
            } else if(showInsertTeachingPeriods && teachingPeriods.length > 0) {
                const middleIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriodToInsertCode);
                const endIndex = teachingPeriodsData.findIndex(ele => ele.code === teachingPeriods[i].code);

                year = teachingPeriods[i].year;

                if(middleIndex >= endIndex) {
                    year --;
                }
            } else if(showInsertTeachingPeriods && teachingPeriods.length === 0) {
                // don't do anything
            } else {
                continue;
            }

            if(showInsertTeachingPeriods && show) {
                tableRows.push(
                    <InsertTeachingPeriod index={i}
                                          key={`${i}-insertTeachingPeriod`}
                                          numberOfUnits={this.state.numberOfUnits}
                                          insertTeachingPeriod={this.insertTeachingPeriod.bind(this)}
                                          year={year}
                                          teachingPeriodType="Teaching Period"
                                          teachingPeriods={this.state.teachingPeriodsData}
                                          code={code} />
                );
            }
        }

        if(this.state.teachingPeriods.length === 0) {
            tableRows.push(
                <Table.Row key="no-teaching-period">
                    <Table.Cell colSpan={this.state.numberOfUnits + 1}>
                        <Header as="h3" icon textAlign="center">
                            <Icon name="calendar" />
                            No teaching periods
                            <Header.Subheader>
                                Click add semester button below to get started.
                            </Header.Subheader>
                        </Header>
                    </Table.Cell>
                </Table.Row>
            );
        }

        return (
            <Container>
                {this.props.unitToAdd &&
                    <Message>
                        <Button floated="right" onClick={this.props.doneAddingToCourse}>Cancel</Button>
                        <Message.Header>
                            Adding {this.props.unitToAdd.code}
                        </Message.Header>
                        <p>
                            Select a table cell in your course structure to insert {this.props.unitToAdd.code}.
                        </p>
                    </Message>
                }
                {this.state.showMoveUnitUI &&
                    <Message>
                        <Button floated="right" onClick={this.cancelMoving.bind(this)}>Cancel</Button>
                        <Message.Header>
                            Moving {this.state.unitToBeMoved.code}
                        </Message.Header>
                        <p>
                            Select a table cell in your course structure to move {this.state.unitToBeMoved.code}.
                            Selecting a table cell where there is already an occupied unit will swap the units.
                        </p>
                    </Message>
                }
                <Table celled fixed striped compact>
                    <MediaQuery query="(min-device-width: 768px)">
                        <Table.Header>
                            <Table.Row textAlign="center">
                                <Table.HeaderCell>Teaching Period</Table.HeaderCell>
                                <Table.HeaderCell colSpan={this.state.numberOfUnits}>Units</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                    </MediaQuery>
                    <Table.Body>
                        {tableRows}
                    </Table.Body>
                </Table>
                {!this.state.showInsertTeachingPeriods &&
                <Button.Group color="green" className="right floated">
                    <Button onClick={this.appendSemester.bind(this)}><Icon name="add square"/>Add {this.getQuickSemesterString()}</Button>
                    <Dropdown floating button className="icon">
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.showInsertTeachingPeriodsUI.bind(this, "S1-01")}>Insert Semester 1</Dropdown.Item>
                            <Dropdown.Item onClick={this.showInsertTeachingPeriodsUI.bind(this, "S2-01")}>Insert Semester 2</Dropdown.Item>
                            <Dropdown.Item onClick={this.showInsertTeachingPeriodsUI.bind(this, "SSA-02")}>Insert Summer Semester A</Dropdown.Item>
                            <Dropdown.Item onClick={this.showInsertTeachingPeriodsUI.bind(this, "SSB-01")}>Insert Summer Semester B</Dropdown.Item>
                            <Dropdown.Item onClick={this.showInsertTeachingPeriodsUI.bind(this, "WS-01")}>Insert Winter Semester</Dropdown.Item>
                            <Dropdown.Item onClick={this.showInsertTeachingPeriodsUI.bind(this, "FY-01")}>Insert Full Year</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Button.Group>
                }
                {this.state.showInsertTeachingPeriods &&
                <Button floated="right" onClick={this.hideInsertTeachingPeriodsUI.bind(this)}>Cancel</Button>
                }
            </Container>
        );
    }
}

CourseStructure.propTypes = {
    startYear: PropTypes.number,
    endYear: PropTypes.number
};

export default CourseStructure;
