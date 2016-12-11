import React, {Component} from "react";
import {Button, Container, Dropdown, Grid, Icon, Label, Table} from "semantic-ui-react";
var MediaQuery = require("react-responsive");

import TeachingPeriod from "./TeachingPeriod/TeachingPeriod.jsx";
import InsertTeachingPeriod from "./TeachingPeriod/InsertTeachingPeriod.jsx";

import Home from "./base/Home.jsx";
import genCourse from "./GenerateCourseStructure.jsx";

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
            "teachingPeriods": this.generateCourse(parseInt(startYear), parseInt(endYear))
        };

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
                    type: "S1-01",
                    numberOfUnits: 4,
                    units: [null, null, null, null]
                };
                const semesterTwoTeachingPeriod = {
                    year,
                    type: "S2-02",
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
     * @param type - Teaching period code that indicates what type it is.
     */
    insertTeachingPeriod(index, year, type) {
        const teachingPeriods = this.state.teachingPeriods;
        teachingPeriods.splice(index, 0, {
            type: type,
            year: year,
            numberOfUnits: 4,
            units: [null, null, null, null]
        });

        this.setState({
            showInsertTeachingPeriods: false,
            teachingPeriods: teachingPeriods
        });
    }

    /**
     * Deletes a teaching period at a specified index.
     *
     * @param index - Which teaching period in list to delete.
     */
    deleteTeachingPeriod(index) {
        const updatedTeachingPeriods = [
            ...this.state.teachingPeriods.slice(0, index),
            ...this.state.teachingPeriods.slice(index + 1)
        ];

        this.setState({
            teachingPeriods: updatedTeachingPeriods
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
                    key={`${teachingPeriod.year}-${teachingPeriod.type}`}
                    index={index}
                    year={teachingPeriod.year}
                    classification={teachingPeriod.type}
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
        if(this.state.showInsertTeachingPeriods) {
            tableRows.push(<InsertTeachingPeriod index={0}
                                           key={`${0}-insertTeachingPeriod`}
                                           numberOfUnits={this.state.numberOfUnits}
                                           insertTeachingPeriod={this.insertTeachingPeriod.bind(this)}
                                           year={2016}
                                           teachingPeriodType="Semester"
                                           teachingPeriodCode="S1-01" />);
        }

        for(var i = 0; i < this.state.teachingPeriods.length; i++) {
            tableRows.push(this.renderTeachingPeriod(this.state.teachingPeriods[i], i));
            if(this.state.showInsertTeachingPeriods) {
                tableRows.push(<InsertTeachingPeriod index={i + 1}
                                               key={`${i + 1}-insertTeachingPeriod`}
                                               numberOfUnits={this.state.numberOfUnits}
                                               insertTeachingPeriod={this.insertTeachingPeriod.bind(this)}
                                               year={2016}
                                               teachingPeriodType="Semester"
                                               teachingPeriodCode="S1-01" />);
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
