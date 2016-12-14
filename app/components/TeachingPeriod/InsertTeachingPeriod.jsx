import React from "react";
import {Button, Icon, Input, Form, Grid, Popup, Table} from "semantic-ui-react";

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

    let name = code;
    let teachingPeriod = undefined;

    if(props.teachingPeriods) {
        teachingPeriod = props.teachingPeriods.find(ele => ele.code === code);
        if(teachingPeriod) {
            name = teachingPeriod.name || code;
        }
    }

    const triggerButton = (
        <Button onClick={handleClick} fluid>
            <Icon name="plus" /> Insert {name}, {props.year}
        </Button>
    );

    return (
        <Table.Row>
            <Table.Cell textAlign="center" colSpan={props.numberOfUnits + 1}>
                <Popup hoverable flowing trigger={triggerButton}>
                    <Form onSubmit={e => e.preventDefault()}>
                        <Form.Field>
                            <label>Year: </label>
                            <input onChange={handleYearChange} placeholder={props.year} />
                        </Form.Field>
                        <Form.Field>
                            <label>Code: </label>
                            <input onChange={handleCodeChange} placeholder={props.code} />
                        </Form.Field>
                    </Form>
                </Popup>
            </Table.Cell>
        </Table.Row>
    );
};

export default InsertTeachingPeriod;
