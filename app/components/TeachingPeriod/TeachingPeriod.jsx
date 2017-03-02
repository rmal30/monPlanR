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
const TeachingPeriod = (props) => {

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
        showingMovingUnitUI: PropTypes.bool,
        unitToBeMoved: PropTypes.object,
        viewOnly: PropTypes.bool,
        tpIndexOfUnitToBeMoved: PropTypes.number,
        showingAddingUnitUI: PropTypes.bool,
        increaseStudyLoad: PropTypes.func
    };

    var unitRep = [],
        tmp = props.units.slice(),
        chain = 0;
    
    for (let i = 0; i < tmp.length; i++) {
        let currentUnit = tmp[i];
        if(currentUnit !== null && currentUnit !== undefined) {
            if (!currentUnit.placeholder && ((currentUnit.creditPoints / 6) > 1)) {
                chain += Math.min(6, (currentUnit.creditPoints / 6) - 1);
            }
            unitRep.push(currentUnit);
        } else if (currentUnit === null) {
            if (chain > 0) {
                unitRep.push("shouldNotDisplay");
                chain -= 1;
            } else {
                unitRep.push(currentUnit);
            }
        } else {
            unitRep.push(currentUnit);
        }
    }

    if(chain > 2) {
        console.error("Could not allocate enough space in teaching period");
    } else {
        for (let j=0; j < chain; j++) {
            props.increaseStudyLoad();
        }
    }

    let cellSpan;
    /**
     * we really don't want units rendering over huge amounts of columns so limit to 4
     */
    if(props.unitToAdd) {
        cellSpan = Math.min(4, props.unitToAdd.creditPoints / 6);
    } else if (props.unitToBeMoved) {
        cellSpan = Math.min(4, props.unitToBeMoved.creditPoints / 6);
    } else {
        cellSpan = 1;
    }
    const unitsEle = unitRep.map((unit, index) => {
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
        } else if (unit === "display") {
            return (
                <UnitTableCell
                    key={index}
                    index={index}
                    teachingPeriodIndex={props.index}
                    free
                    cellSpan={cellSpan}
                    isError={isError} />
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
        showingMovingUnitUI: state.UI.showingMovingUnitUI,
        unitToBeMoved: state.CourseStructure.unitToBeMoved,
        tpIndexOfUnitToBeMoved: state.CourseStructure.tpIndexOfUnitToBeMoved,
        showingAddingUnitUI: state.UI.showingAddingUnitUI,
        unitToAdd: state.CourseStructure.unitToAdd
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeachingPeriod);
