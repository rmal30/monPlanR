import React from "react";
import {Button, Icon, Input, Grid, Popup, Table} from "semantic-ui-react";

const InsertTeachingPeriod = (props) => {
    let year = props.year,
        code = props.code;

    const handleYearChange = (e) => {
        year = parseInt(e.target.value || props.year);
    };

    const handleCodeChange = (e) => {
        code = e.target.value || props.code;
    };

    const handleClick = (e) => {
        props.insertTeachingPeriod(props.index, year, code);
    };

    const triggerButton = (
        <Button onClick={handleClick} fluid>
            <Icon name="plus" /> Insert {props.teachingPeriodType}
        </Button>
    );

    return (
        <Table.Row>
            <Table.Cell textAlign="center" colSpan={props.numberOfUnits + 1}>
                <Popup hoverable flowing trigger={triggerButton}>
                    <Input label="Year: " onChange={handleYearChange} placeholder={props.year} />
                    <Input label="Code: " onChange={handleCodeChange} placeholder={props.code} />
                </Popup>
            </Table.Cell>
        </Table.Row>
    );
};

export default InsertTeachingPeriod;
