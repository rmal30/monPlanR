import React, { PropTypes } from "react";
import { Button, Icon, Form, Popup, Table } from "semantic-ui-react";

/**
 * InsertTeachingPeriod allows students to insert teaching periods into their
 * course structure.
 *
 * @returns {ReactElement} tableRow - A table row to be placed inside
 * the course structure table's body.
 * @author Saurabh Joshi
 */
const InsertTeachingPeriod = props => {
    InsertTeachingPeriod.propTypes = {
        year: PropTypes.number.isRequired,
        code: PropTypes.string.isRequired,
        teachingPeriods: PropTypes.array,
        numberOfUnits: PropTypes.number
    };

    let { year, code } = props;

    /**
     * Used when user changes the teaching period start year in the popup.
     *
     * @param {event} e - onChange event for year input element.
     */
    const handleYearChange = e => {
        year = parseInt(e.target.value || props.year);
    };

    /**
     * Used when user changes the teaching period code in the popup.
     *
     * @param {event} e - onChange event for code input element.
     */
    const handleCodeChange = e => {
        code = e.target.value || props.code;
    };

    /**
     * Used when user clicks on insert teaching period button.
     */
    const handleClick = () => {
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
                {triggerButton}
                {false &&
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
                }
            </Table.Cell>
        </Table.Row>
    );
};

export default InsertTeachingPeriod;
