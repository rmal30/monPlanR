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

    const addUnit = (unitIndex, unitToAdd) => {
        props.addUnit(props.index, unitIndex, unitToAdd);
    };

    const willMoveUnit = unitIndex => {
        props.willMoveUnit(props.index, unitIndex);
    };

    const moveUnit = unitIndex => {
        props.moveUnit(props.index, unitIndex);
    };

    const swapUnit = unitIndex => {
        props.swapUnit(props.index, unitIndex);
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
                unitToBeMoved={props.unitToBeMoved}
                firstFreeUnit={temp}
                addUnit={addUnit}
                moveUnit={moveUnit}
                unitToAdd={props.unitToAdd}
                showAddToCourseUI={props.showAddToCourseUI}
                showMoveUnitUI={props.showMoveUnitUI} />;
        }
        return <Unit key={`${props.year}-${props.code}-${unit}-${index}`}
                     index={index}
                     willMoveUnit={willMoveUnit}
                     deleteUnit={deleteUnit}
                     showMoveUnitUI={props.showMoveUnitUI}
                     swapUnit={swapUnit}
                     free={false}
                     code={unit.code}
                     name={unit.name} />;
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
                {!props.showMoveUnitUI &&
                <Button basic floated="right" onClick={handleDelete} size="tiny" color="red" icon="close" />
                }
            </Table.Cell>
            {unitsEle}
        </Table.Row>
    );
}

export default TeachingPeriod;
