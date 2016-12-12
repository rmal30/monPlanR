import React, {Component} from "react";
import {Button, Container, Dropdown, Grid, Icon, Label, Table} from "semantic-ui-react";
import axios from "axios";
var MediaQuery = require("react-responsive");

import TeachingPeriod from "./TeachingPeriod/TeachingPeriod.jsx";
import InsertTeachingPeriod from "./TeachingPeriod/InsertTeachingPeriod.jsx";

import Home from "./base/Home.jsx";
import genCourse from "./GenerateCourseStructure.jsx";

/**
 * CourseStructure holds a table that allows students to plan their courses by
 * adding, moving and deleting units. It also holds action and status components
 * to give students feedback and ability to change the course structure.
 *
 * @class
 * @extends React.Component
 */
class CourseStructure extends Component {

    /**
     * State: numberOfUnits, showInsertTeachingPeriods, teachingPeriods
     */
    constructor(props) {
        super(props);

        const { startYear, endYear } = this.props;

        this.state = {
            "numberOfUnits": 4,
            "showInsertTeachingPeriods": false,
            "teachingPeriods": this.generateCourse(parseInt(startYear), parseInt(endYear)),
            "teachingPeriodsData": null
        };

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
     */
    generateCourse(startYear, endYear) {
        if(endYear - startYear > 12 || startYear === null || endYear === null) {
            startYear = new Date().getFullYear();
            endYear = startYear + 4;
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
     */
    showInsertTeachingPeriodsUI(teachingPeriodString) {
        this.setState({
            showInsertTeachingPeriods: true
        });
    }

    /**
     * Hides the add teaching period buttons in between the teaching period
     * table rows.
     */
    hideInsertTeachingPeriodsUI() {
        this.setState({
            showInsertTeachingPeriods: false
        });
    }

    /**
     * Inserts teaching period at a specified index.
     *
     * @param index - Which index in array to insert the teaching period
     * @param year - Year of teaching period that was taken place
     * @param ccode - Teaching period code.
     */
    insertTeachingPeriod(index, year, code) {
        const teachingPeriods = this.state.teachingPeriods;
        teachingPeriods.splice(index, 0, {
            code,
            year,
            numberOfUnits: 4,
            units: [null, null, null, null]
        });

        this.setState({
            showInsertTeachingPeriods: false,
            teachingPeriods
        });
    }

    /**
     * Deletes a teaching period at a specified index.
     *
     * @param index - Which teaching period in list to delete.
     */
    deleteTeachingPeriod(index) {
        const teachingPeriods = [
            ...this.state.teachingPeriods.slice(0, index),
            ...this.state.teachingPeriods.slice(index + 1)
        ];

        this.setState({
            teachingPeriods
        });
    }

    /**
     * Deletes a unit at a specified teaching period index and specified unit
     * index. This is done by setting the array element to undefined.
     */
    deleteUnit(teachingPeriodIndex, unitIndex) {
        const updatedTeachingPeriods = this.state.teachingPeriods;
        updatedTeachingPeriods[teachingPeriodIndex].units[unitIndex] = undefined;
        this.setState({
            teachingPeriods: updatedTeachingPeriods
        });
    }

    /**
     * Returns a rendered teaching period component as a table row to be used in
     * a table.
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
                    deleteUnit={this.deleteUnit.bind(this)}
                    units={teachingPeriod.units} />;
    }

    /**
     * TODO: Modularise into smaller components for course structure
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
                <Grid stackable columns={2}>
                    <Grid.Column floated="left" width={5}>
                        {!this.state.showInsertTeachingPeriods &&
                        <Button.Group color="green">
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
                        <Button onClick={this.hideInsertTeachingPeriodsUI.bind(this)}>Cancel</Button>
                        }
                    </Grid.Column>
                    <Grid.Column floated="right" width={5}>
                        <Label color="green" size="large">
                            Total Credits Earnt
                            <Label.Detail id="credits">0</Label.Detail>
                        </Label>
                        <Label color="green" size="large">
                            Total Expenses
                            <Label.Detail id="expenses">$0</Label.Detail>
                        </Label>
                    </Grid.Column>
                </Grid>
                <Table celled fixed>
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
            </Container>
        );
    }
}

export default CourseStructure;
