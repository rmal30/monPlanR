import React from "react";
import {Button, Icon, Input, Grid, Popup, Table} from "semantic-ui-react";

const InsertTeachingPeriod = (props) => {
    let year = props.year,
        type = props.type;

    const handleYearChange = (e) => {
        year = parseInt(e.target.value || props.year);
    };

    const handleTypeChange = (e) => {
        type = e.target.value || props.teachingPeriodCode;
    };

    const handleClick = (e) => {
        props.insertTeachingPeriod(props.index, year, type);
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
                    <Input label="Type: " onChange={handleTypeChange} placeholder={props.teachingPeriodCode} />
                </Popup>
            </Table.Cell>
        </Table.Row>
    );
};

export default InsertTeachingPeriod;
