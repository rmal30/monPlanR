import * as React from "react";
import {Container, Label, Table} from "semantic-ui-react";
import TeachingPeriod from "./TeachingPeriod.jsx";

class CourseStructure extends React.Component {
    constructor() {
        super();
        this.state = {"teachingPeriods":[{"year":2016,"type":"S1-01","numberOfUnits":4,"units":["FIT1008","FIT1013","FIT1047","FIT1045"]},{"year":2016,"type":"S2-02","numberOfUnits":4,"units":["FIT1008","FIT2004","FIT1049","MTH1035"]},{"year":2017,"type":"S1-01","numberOfUnits":4,"units":[null,null,null,null]},{"year":2017,"type":"S2-02","numberOfUnits":4,"units":["FIT1049",null,null,null]},{"year":2018,"type":"S1-01","numberOfUnits":4,"units":[null,null,null,null]},{"year":2018,"type":"S2-02","numberOfUnits":4,"units":[null,null,null,null]},{"year":2019,"type":"S1-01","numberOfUnits":4,"units":[null,null,null,null]},{"year":2019,"type":"S2-02","numberOfUnits":4,"units":[null,null,null,null]},{"year":2020,"type":"S1-01","numberOfUnits":4,"units":[null,null,null,null]}]};
    }
    deleteUnit(teachingPeriodIndex, unitIndex) {
        const updatedTeachingPeriods = this.state.teachingPeriods;
        updatedTeachingPeriods[teachingPeriodIndex].units[unitIndex] = undefined;
        this.setState({
            teachingPeriods: updatedTeachingPeriods
        });
    }
    render() {
        const teachingPeriodsEle = this.state.teachingPeriods.map((teachingPeriod, index) => {
            return <TeachingPeriod
                        key={`${teachingPeriod.year}-${teachingPeriod.type}`}
                        index={index}
                        year={teachingPeriod.year}
                        classification={teachingPeriod.type}
                        numberOfUnits={teachingPeriod.numberOfUnits}
                        deleteUnit={this.deleteUnit.bind(this)}
                        units={teachingPeriod.units} />
        });

        return (
            <Container>
                <Label color="green" size="large">
                    Total Credits Earnt
                    <Label.Detail id="credits">0</Label.Detail>
                </Label>
                <Label color="green" size="large">
                    Total Expenses
                    <Label.Detail id="expenses">$0</Label.Detail>
                </Label>
                <Table celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Teaching Period</Table.HeaderCell>
                            <Table.HeaderCell>Unit</Table.HeaderCell>
                            <Table.HeaderCell>Unit</Table.HeaderCell>
                            <Table.HeaderCell>Unit</Table.HeaderCell>
                            <Table.HeaderCell>Unit</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {teachingPeriodsEle}
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

export default CourseStructure;
