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
export const TeachingPeriod = (props) => {

    TeachingPeriod.propTypes = {
        code: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
        data: PropTypes.array,
        units: PropTypes.array.isRequired,
        unitToAdd: PropTypes.object,
        viewUnitDetails: PropTypes.func,
        removeTeachingPeriod: PropTypes.func,
        getAffectedUnitsInRow: PropTypes.func,

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
                    firstFreeUnit={temp}
                    isError={isError} />
            );
        }
        return (
            <Unit
                viewOnly={props.viewOnly}
                key={`${props.year}-${props.code}-${unit}-${index}`}
                index={index}
                teachingPeriodIndex={props.index}
                swapUnit={props.swapUnit.bind(null, props.index)}
                code={unit.UnitCode}
                name={unit.UnitName}
                creditPoints={unit.CreditPoints}
                cost={unit.Cost}
                faculty={unit.Faculty}
                placeholder={unit.placeholder}
                unit={unit}
                errors={(props.showMoveUnitUI || props.unitToAdd) ? [] : props.errors.filter(err => err.coordinates.map(e => e[1]).indexOf(index) >= 0)}
                isError={isError}
                />
        );
    });

    let teachingPeriodName = props.code;
    if(props.data) {
        const teachingPeriod = props.data.find(element =>
            element.code === props.code
        );

        if(teachingPeriod !== undefined) {
            teachingPeriodName = teachingPeriod.name;
        }
    }

    return (
        <Table.Row style={{color: "black"}}>
            <Table.Cell>
                {!props.viewOnly &&
                    <ConfirmDeleteTeachingPeriod index={props.index} units={props.units} />
                }
                {teachingPeriodName}, {props.year}
            </Table.Cell>
            {unitsEle}
        </Table.Row>
    );
};


/**
 * All teaching period currently needs are course actions such as remove teaching period
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(courseActions, dispatch);
};

/**
 * Injects the required state as props from redux
 */
const mapStateToProps = (state) => {
    return {
        data: state.CourseStructure.teachingPeriodData,
        numberOfUnits: state.CourseStructure.numberOfUnits,
        viewOnly: state.UI.readOnly
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeachingPeriod);
