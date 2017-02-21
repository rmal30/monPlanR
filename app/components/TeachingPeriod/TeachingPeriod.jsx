import React, { PropTypes } from "react";
import { Table } from "semantic-ui-react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/CourseActions";

import ConfirmDeleteTeachingPeriod from "../modals/ConfirmDeleteTeachingPeriod.jsx";
import UnitTableCell from "../Unit/UnitTableCell.jsx";

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
        numberOfUnits: PropTypes.number,
        tpCreditPoints: PropTypes.number,

        viewOnly: PropTypes.bool
    };

    // props.tpCreditPoints, props.numberOfUnits, maxCreditPointsForTP
    const maxPoints = props.numberOfUnits * 6;
    const totalPoints = props.units.reduce((prev, next) => {
        if (next === null) {
            return prev + 6;
        } else if (next.creditPoints === 0) {
            return prev + 6; //the unit may not actual have credit points, but it does take up a slot
        } else {
            return prev + next.creditPoints;
        }
    }, 0);



    let difference = totalPoints - maxPoints;
    let unitRep = props.units;
    if(difference > 0) {
        unitRep = [];
        for(let i=0; i < props.units.length; i++){
            let currentUnit = props.units[i];
            if (currentUnit !== null) {
                unitRep.push(currentUnit);  //we are forced to display a unit if it is not empty
            } else if (difference > 0) {
                difference -= 6;
                unitRep.push("shouldNotDisplay"); //a message that can be intercepted so that we do not display
            } else {
                unitRep.push(currentUnit);
            }
        }
    }

    const unitsEle = props.units.map((unit, index) => {
        const isError = props.tempInvalidCoordinates.filter(xs => xs[1] === index || xs[1] === null).length > 0;

        if(!unit) {
            return (
                <UnitTableCell
                    key={index}
                    index={index}
                    teachingPeriodIndex={props.index}
                    free
                    isError={isError} />
            );
        } else if (unit === "shouldNotDisplay") {
            return (
                null
            );
        }
        return (
            <UnitTableCell
                tpCreditPoints={props.tpCreditPoints}
                viewOnly={props.viewOnly}
                key={index}
                index={index}
                teachingPeriodIndex={props.index}
                swapUnit={props.swapUnit.bind(null, props.index)}
                code={unit.unitCode}
                name={unit.unitName}
                creditPoints={unit.creditPoints}
                cost={unit.cost}
                faculty={unit.faculty}
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
        viewOnly: state.UI.readOnly,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeachingPeriod);
