import React from "react";
import {Button, Dropdown, Table} from "semantic-ui-react";

/**
 * Unit component
 *
 * @function Unit
 * @extends React.Component
 */
function Unit(props) {
    /**
     * Shows unit details in a modal.
     */
    const handleDetail = () => {

    };

    /**
     * Removes unit from the course structure.
     */
    const handleDelete = () => {
        if(props.free) {
            return;
        }

        props.deleteUnit(props.index);
    };

    return (
        <Table.Cell>
            {props.code}
            {!props.free &&
                <Button.Group size="tiny">
                    <Button basic onClick={handleDetail} color="blue" icon="info" />
                    <Button basic onClick={handleDelete} color="red" icon="close" />
                </Button.Group>
            }
        </Table.Cell>
    );
}

export default Unit;
