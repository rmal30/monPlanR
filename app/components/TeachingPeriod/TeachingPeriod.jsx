import React, { PropTypes } from "react";
import { Table } from "semantic-ui-react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/CourseActions";

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
        unitToAdd: PropTypes.object,
        showMoveUnitUI: PropTypes.bool.isRequired,
        viewUnitDetails: PropTypes.func,
        removeTeachingPeriod: PropTypes.func,

        viewOnly: PropTypes.bool
    };

    let firstFreeUnit = true;
    const unitsEle = props.units.map((unit, index) => {
        const isError = props.tempInvalidCoordinates.filter(xs => xs[1] === index || xs[1] === null).length > 0;

        if(!unit) {
            const temp = firstFreeUnit;
            firstFreeUnit = false;
            return (
                <Unit
                    key={`${props.year}-${props.code}-${index}`}
                    viewOnly={props.viewOnly}
                    index={index}
                    teachingPeriodIndex={props.index}
                    free
                    unitToBeMoved={props.unitToBeMoved}
                    firstFreeUnit={temp}
                    addUnit={props.addUnit.bind(this, props.index)}
                    moveUnit={props.moveUnit.bind(this, props.index)}
                    unitToAdd={props.unitToAdd}
                    showMoveUnitUI={props.showMoveUnitUI}
                    isError={isError} />
            );
        }
        return (
            <Unit
                key={`${props.year}-${props.code}-${unit}-${index}`}
                viewOnly={props.viewOnly}
                index={index}
                teachingPeriodIndex={props.index}
                addUnit={props.addUnit.bind(this, props.index)}
                unitToAdd={props.unitToAdd}
                willMoveUnit={props.willMoveUnit.bind(null, props.index)}
                deleteUnit={props.deleteUnit.bind(null, props.index)}
                showMoveUnitUI={props.showMoveUnitUI}
                swapUnit={props.swapUnit.bind(null, props.index)}
                code={unit.UnitCode}
                name={unit.UnitName}
                faculty={unit.Faculty}
                placeholder={unit.placeholder}
                onUnitClick={props.handleUnitDetailClick}
                viewUnitDetails={props.viewUnitDetails}
                cancelMoving={props.cancelMoving}
                errors={(props.showMoveUnitUI || props.unitToAdd) ? [] : props.errors.filter(err => err.coordinates.map(e => e[1]).indexOf(index) >= 0)}
                isError={isError} />
        );
    });

    let teachingPeriodName = props.code;
    if(props.data !== null) {
        const teachingPeriod = props.data.find(element =>
            element.code === props.code
        );

        if(teachingPeriod !== undefined) {
            teachingPeriodName = teachingPeriod.name;
        }
    }

    return (
        <Table.Row>
            <Table.Cell>
                {!props.showMoveUnitUI && !props.viewOnly &&
                <ConfirmDeleteTeachingPeriod
                    onDeletePress={() => {props.removeTeachingPeriod(props.index, props.units);}}
                    units={props.units} />
                }
                {teachingPeriodName}, {props.year}
            </Table.Cell>
            {unitsEle}
        </Table.Row>
    );
}


/**
 * All teaching period currently needs are course actions such as remove teaching period
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(courseActions, dispatch);
};

export default connect(null, mapDispatchToProps)(TeachingPeriod);