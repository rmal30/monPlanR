import * as React from "react";
import {Dropdown, Table} from "semantic-ui-react";
import Unit from "./Unit.jsx";

/**
 * TeachingPeriod component
 *
 * Common teaching periods: semester one, semester two, summer semester A,
 * summer semester B, winter semester
 *
 * @function
 * @arg props
 */
function TeachingPeriod(props) {
    const deleteUnit = unitIndex => {
        props.deleteUnit(props.index, unitIndex);
    };

    const unitsEle = props.units.map((unit, index) => {
        if(!unit) {
            return <Unit
                key={`${props.year}-${props.classification}-${index}`}
                index={index}
                free={true} />;
        }
        return <Unit key={`${props.year}-${props.classification}-${unit}`}
                     index={index}
                     deleteUnit={deleteUnit}
                     free={false}
                     code={unit} />;
    });

    return (
        <Table.Row>
            <Table.Cell className="teachingPeriod cell">
                {props.year}-{props.classification}
                <Dropdown icon="setting">
                    <Dropdown.Menu>
                        <Dropdown.Item text="Remove" />
                    </Dropdown.Menu>
                </Dropdown>
            </Table.Cell>
            {unitsEle}
        </Table.Row>
    );
}

export default TeachingPeriod;
