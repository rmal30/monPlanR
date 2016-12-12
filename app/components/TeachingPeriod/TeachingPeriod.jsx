import React from "react";
import {Button, Dropdown, Table} from "semantic-ui-react";

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

    const addUnit = (unitIndex, unitCode) => {
        props.addUnit(props.index, unitIndex, unitCode);
    };

    const deleteUnit = unitIndex => {
        props.deleteUnit(props.index, unitIndex);
    };

    let firstFreeUnit = true;
    const unitsEle = props.units.map((unit, index) => {
        if(!unit) {
            const temp = firstFreeUnit;
            firstFreeUnit = false;
            return <Unit
                key={`${props.year}-${props.code}-${index}`}
                index={index}
                free={true}
                firstFreeUnit={temp}
                addUnit={addUnit}
                unitToAdd={props.unitToAdd}
                showAddToCourseUI={props.showAddToCourseUI} />;
        }
        return <Unit key={`${props.year}-${props.code}-${unit}-${index}`}
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
