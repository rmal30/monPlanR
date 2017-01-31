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
const InsertTeachingPeriod = (props) => {

    let { year, code, handleClick, handleYearChange, handleCodeChange, colspanVal, name } = props;

    const triggerButton = (
        <Button inverted color="green" onClick={handleClick} fluid>
            <Icon name="plus" /> Insert {name}, {year}
        </Button>
    );

    return (
        <Table.Row className="no-print">
            <Table.Cell textAlign="center" colSpan={colspanVal}>
                {triggerButton}
                {false &&
                <Popup 
                    hoverable 
                    flowing 
                    trigger={<Button inverted color="green" onClick={handleClick} fluid>
                                <Icon name="plus" /> Insert {name}, {year}
                             </Button>}>
                    <Form onSubmit={e => e.preventDefault()}>
                        <Form.Field>
                            <label>Year: </label>
                            <input onChange={handleYearChange} placeholder={year} />
                        </Form.Field>
                        <Form.Field>
                            <label>Code: </label>
                            <input onChange={handleCodeChange} placeholder={code} />
                        </Form.Field>
                    </Form>
                </Popup>
                }
            </Table.Cell>
        </Table.Row>
    );
};

export default InsertTeachingPeriod;

InsertTeachingPeriod.propTypes = {
    year: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    handleYearChange: PropTypes.func,
    handleCodeChange: PropTypes.func,
    colspanVal: PropTypes.number,
    name: PropTypes.string
};