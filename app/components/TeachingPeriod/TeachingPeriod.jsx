import React, { PropTypes } from "react";
import { Table } from "semantic-ui-react";


import ConfirmDeleteTeachingPeriod from "../modals/ConfirmDeleteTeachingPeriod.jsx";
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

    TeachingPeriod.propTypes = {
        code: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
        data: PropTypes.array,
        units: PropTypes.array.isRequired,
        showMoveUnitUI: PropTypes.bool.isRequired,
        deleteTeachingPeriod: PropTypes.func.isRequired
    };

    let firstFreeUnit = true;
    const unitsEle = props.units.map((unit, index) => {
        if(!unit) {
            const temp = firstFreeUnit;
            firstFreeUnit = false;
            return (
                <Unit
                    key={`${props.year}-${props.code}-${index}`}
                    index={index}
                    teachingPeriodIndex={props.index}
                    free
                    unitToBeMoved={props.unitToBeMoved}
                    firstFreeUnit={temp}
                    addUnit={props.addUnit.bind(this, props.index)}
                    moveUnit={props.moveUnit.bind(this, props.index)}
                    unitToAdd={props.unitToAdd}
                    showMoveUnitUI={props.showMoveUnitUI}
                    onUnitClick={props.handleUnitDetailClick} 
                    isError={props.isError} />
            );
        }
        return (
            <Unit
                key={`${props.year}-${props.code}-${unit}-${index}`}
                index={index}
                teachingPeriodIndex={props.index}
                willMoveUnit={props.willMoveUnit.bind(null, props.index)}
                deleteUnit={props.deleteUnit.bind(null, props.index)}
                showMoveUnitUI={props.showMoveUnitUI}
                swapUnit={props.swapUnit.bind(null, props.index)}
                code={unit.UnitCode}
                name={unit.UnitName}
                faculty={unit.Faculty}
                onUnitClick={props.handleUnitDetailClick}
                cancelMoving={props.cancelMoving} 
                isError={props.isError} />
        );
    });

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
            <Table.Cell>
                {!props.showMoveUnitUI &&
                <ConfirmDeleteTeachingPeriod
                    onDeletePress={props.deleteTeachingPeriod.bind(null, props.index)}
                    units={props.units} />
                }
                {teachingPeriodName}, {props.year}
            </Table.Cell>
            {unitsEle}
        </Table.Row>
    );
}

export default TeachingPeriod;


// <Button basic className="no-print" floated="right" onClick={props.deleteTeachingPeriod.bind(null, props.index)} size="tiny" color="red" icon="close" />
