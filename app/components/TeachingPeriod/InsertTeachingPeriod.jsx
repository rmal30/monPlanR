import React, { PropTypes } from "react";
import { Button, Icon, Popup, Table } from "semantic-ui-react";

/**
 * InsertTeachingPeriod allows students to insert teaching periods into their
 * course structure.
 *
 * @returns {ReactElement} tableRow - A table row to be placed inside
 * the course structure table's body.
 * @author Saurabh Joshi
 */
const InsertTeachingPeriod = (props) => {

    let { onInsertTeachingPeriod, numberOfUnits, tpString } = props;

    const triggerButton = (
        <Button inverted color="green" onClick={onInsertTeachingPeriod} fluid>
            <Icon name="plus" /> Insert {tpString}
        </Button>
    );

    return (
        <Table.Row className="no-print">
            <Table.Cell textAlign="center" colSpan={numberOfUnits + 1}>
                {triggerButton}
                {false &&
                <Popup 
                    hoverable 
                    flowing 
                    trigger={<Button inverted color="green" onClick={onInsertTeachingPeriod} fluid>
                                <Icon name="plus" /> Insert {tpString}
                             </Button>}>
                </Popup>
                }
            </Table.Cell>
        </Table.Row>
    );
};

export default InsertTeachingPeriod;

InsertTeachingPeriod.propTypes = {
    tpString: PropTypes.string,
    numberOfUnits: PropTypes.number,
    onInsertTeachingPeriod: PropTypes.func
};