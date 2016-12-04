import * as React from "react";
import {Table} from "semantic-ui-react";
import TeachingPeriod from "./TeachingPeriod.jsx"

class CourseStructure extends React.Component {
    render() {
        return (
            <Table celled fixed>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Teaching Period</Table.HeaderCell>
                        <Table.HeaderCell>Unit</Table.HeaderCell>
                        <Table.HeaderCell>Unit</Table.HeaderCell>
                        <Table.HeaderCell>Unit</Table.HeaderCell>
                        <Table.HeaderCell>Unit</Table.HeaderCell>
                    </Table.Row>
                    <Table.Body></Table.Body>
                </Table.Header>
            </Table>
        );
    }
}

export default CourseStructure;
