import React from "react";
import {Button, Dropdown, Table} from "semantic-ui-react";
var MediaQuery = require("react-responsive");

import Unit from "../Unit/Unit.jsx";

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
    const handleDelete = () => {
        props.deleteTeachingPeriod(props.index);
    };

    const deleteUnit = unitIndex => {
        props.deleteUnit(props.index, unitIndex);
    };

    const unitsEle = props.units.map((unit, index) => {
        if(!unit) {
            return <Unit
                key={`${props.year}-${props.code}-${index}`}
                index={index}
                free={true} />;
        }
        return <Unit key={`${props.year}-${props.code}-${unit}`}
                     index={index}
                     deleteUnit={deleteUnit}
                     free={false}
                     code={unit} />;
    });

    const teachingPeriodData = props.data;
    let teachingPeriodName = props.code;
    if(props.data !== null) {
        const teachingPeriod = props.data.find((element) =>
            element.code === props.code
        );

        if(teachingPeriod !== undefined) {
            teachingPeriodName = teachingPeriod.name;
        }
    }

    return (
        <Table.Row>
            <Table.Cell className="teachingPeriod cell">
                {teachingPeriodName}, {props.year}
                <Button basic floated="right" onClick={handleDelete} size="tiny" color="red" icon="close" />
            </Table.Cell>
            {unitsEle}
        </Table.Row>
    );
}

export default TeachingPeriod;
