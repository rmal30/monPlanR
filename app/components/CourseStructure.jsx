import * as React from "react";
import {Button, Container, Dropdown, Grid, Icon, Label, Table} from "semantic-ui-react";
import TeachingPeriod from "./TeachingPeriod.jsx";
import InsertTeachingPeriod from "./InsertTeachingPeriod.jsx";

class CourseStructure extends React.Component {
    constructor() {
        super();
        this.state = {
            "numberOfUnits": 4,
            "showInsertTeachingPeriods": false,
            "teachingPeriods":[{"year":2016,"type":"S1-01","numberOfUnits":4,"units":["FIT1008","FIT1013","FIT1047","FIT1045"]},{"year":2016,"type":"S2-02","numberOfUnits":4,"units":["FIT1008","FIT2004","FIT1049","MTH1035"]},{"year":2017,"type":"S1-01","numberOfUnits":4,"units":[null,null,null,null]},{"year":2017,"type":"S2-02","numberOfUnits":4,"units":["FIT1049",null,null,null]},{"year":2018,"type":"S1-01","numberOfUnits":4,"units":[null,null,null,null]},{"year":2018,"type":"S2-02","numberOfUnits":4,"units":[null,null,null,null]},{"year":2019,"type":"S1-01","numberOfUnits":4,"units":[null,null,null,null]},{"year":2019,"type":"S2-02","numberOfUnits":4,"units":[null,null,null,null]},{"year":2020,"type":"S1-01","numberOfUnits":4,"units":[null,null,null,null]}]
        };
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
     */
    deleteTeachingPeriod(teachingPeriodIndex) {
        const updatedTeachingPeriods = this.state.teachingPeriods;
        updatedTeachingPeriods.splice(teachingPeriodIndex, 1);
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

        let unitHeadersList = [];

        for(let i = 0; i < this.state.numberOfUnits; i++) {
            unitHeadersList.push(<Table.HeaderCell key={i}>Unit</Table.HeaderCell>);
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
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Teaching Period</Table.HeaderCell>
                            {unitHeadersList}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {tableRows}
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

export default CourseStructure;
