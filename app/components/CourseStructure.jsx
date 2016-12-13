import React, { Component, PropTypes } from "react";
import {Button, Container, Dropdown, Grid, Icon, Label, Table} from "semantic-ui-react";
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
     */
    showInsertTeachingPeriodsUI() {
        this.setState({
            showInsertTeachingPeriods: true
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
     * Inserts unit into course structure.
     *
     * @param {number} teachingPeriodIndex
     * @param {number} unitIndex
     * @param {number} unitCode
     */
    addUnit(teachingPeriodIndex, unitIndex, unitCode) {
        const { teachingPeriods } = this.state;
        teachingPeriods[teachingPeriodIndex].units[unitIndex] = unitCode;
        this.setState({ teachingPeriods });
        this.props.doneAddingToCourse();
    }

    /**
     * Allows user to move unit into another table cell.
     *
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
                    willMoveUnit={this.willMoveUnit.bind(this)}
                    deleteUnit={this.deleteUnit.bind(this)}
                    unitToAdd={this.props.unitToAdd}
                    showAddToCourseUI={this.props.showAddToCourseUI}
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
        let year = new Date().getFullYear(), code = "S1-01", show = true;
        if(this.state.showInsertTeachingPeriods) {
            if(this.state.teachingPeriods.length > 0) {
                if(this.state.teachingPeriods[0].code === "S1-01") {
                    code = "S2-01";
                    year = this.state.teachingPeriods[0].year - 1;
                } else if(this.state.teachingPeriods[0].code === "S2-02") {
                    code = "S1-01";
                    year = this.state.teachingPeriods[0].year;
                } else {
                    year = this.state.teachingPeriods[0].year;
                }
            }

            tableRows.push(<InsertTeachingPeriod index={0}
                                           key={`${0}-insertTeachingPeriod`}
                                           numberOfUnits={this.state.numberOfUnits}
                                           insertTeachingPeriod={this.insertTeachingPeriod.bind(this)}
                                           year={year}
                                           teachingPeriodType="Semester"
                                           code={code} />);
        }

        for(let i = 0; i < this.state.teachingPeriods.length; i++) {
            tableRows.push(this.renderTeachingPeriod(this.state.teachingPeriods[i], i));
            if(this.state.showInsertTeachingPeriods) {
                if(i !== this.state.teachingPeriods.length - 1) {
                    const condition1 = this.state.teachingPeriods[i].code === "S1-01" && this.state.teachingPeriods[i + 1].code === "S2-01" && this.state.teachingPeriods[i].year === this.state.teachingPeriods[i + 1].year;
                    const condition2 = this.state.teachingPeriods[i].code === "S2-01" && this.state.teachingPeriods[i + 1].code === "S1-01" && this.state.teachingPeriods[i].year + 1 === this.state.teachingPeriods[i + 1].year;

                    if(!condition1 && !condition2) {
                        if(this.state.teachingPeriods[i].code === "S2-01") {
                            code = "S1-01";
                            year = this.state.teachingPeriods[i].year + 1;
                        } else if(this.state.teachingPeriods[i].code === "S1-01") {
                            code = "S2-01";
                            year = this.state.teachingPeriods[i].year;
                        }
                        tableRows.push(<InsertTeachingPeriod index={i + 1}
                                                             key={`${i + 1}-insertTeachingPeriod`}
                                                             numberOfUnits={this.state.numberOfUnits}
                                                             insertTeachingPeriod={this.insertTeachingPeriod.bind(this)}
                                                             year={year}
                                                             teachingPeriodType="Semester"
                                                             code={code} />);
                    }
                } else {
                    if(this.state.teachingPeriods[i].code === "S1-01") {
                        code = "S2-01";
                        year = this.state.teachingPeriods[i].year;
                    } else if(this.state.teachingPeriods[i].code === "S2-01") {
                        code = "S1-01";
                        year = this.state.teachingPeriods[i].year + 1;
                    } else {
                        year = this.state.teachingPeriods[i].year;
                    }

                    tableRows.push(<InsertTeachingPeriod index={i + 1}
                                                         key={`${i + 1}-insertTeachingPeriod`}
                                                         numberOfUnits={this.state.numberOfUnits}
                                                         insertTeachingPeriod={this.insertTeachingPeriod.bind(this)}
                                                         year={year}
                                                         teachingPeriodType="Semester"
                                                         code={code} />);
                }
            }
        }

        return (
            <Container>
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
                    <Button onClick={this.showInsertTeachingPeriodsUI.bind(this, "Semester")}><Icon name="add square"/>Add Semester</Button>
                    <Dropdown floating button className="icon">
                        <Dropdown.Menu>
                            <Dropdown.Item>Add Summer Semester A</Dropdown.Item>
                            <Dropdown.Item>Add Summer Semester B</Dropdown.Item>
                            <Dropdown.Item>Add Winter Semester</Dropdown.Item>
                            <Dropdown.Item>Add Full Year</Dropdown.Item>
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
