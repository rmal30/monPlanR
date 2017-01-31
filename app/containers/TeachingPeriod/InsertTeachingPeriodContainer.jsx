import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/CourseActions";
import InsertTeachingPeriod from "../../components/TeachingPeriod/InsertTeachingPeriod.jsx";

/**
 * InsertTeachingPeriod allows students to insert teaching periods into their
 * course structure.
 *
 * @returns {ReactElement} tableRow - A table row to be placed inside
 * the course structure table's body.
 * @author Saurabh Joshi
 */
const InsertTeachingPeriodContainer = props => {

    let { year, code, index, teachingPeriods, numberOfUnits } = props;

    /**
     * Used when user changes the teaching period start year in the popup.
     *
     * @param {event} e - onChange event for year input element.
     */
    const handleYearChange = e => {
        year = parseInt(e.target.value || year);
    };

    /**
     * Used when user changes the teaching period code in the popup.
     *
     * @param {event} e - onChange event for code input element.
     */
    const handleCodeChange = e => {
        code = e.target.value || code;
    };

    /**
     * Used when user clicks on insert teaching period button.
     */
    const handleClick = () => {
        props.insertTeachingPeriod(index, year, code);
    };

    let name = code;
    let teachingPeriod = undefined;

    if(teachingPeriods) {
        teachingPeriod = teachingPeriods.find(ele => ele.code === code);
        if(teachingPeriod) {
            name = teachingPeriod.name || code;
        }
    }


    return (
        <InsertTeachingPeriod 
            year={year}
            code={code} 
            colspanVal={numberOfUnits + 1}
            handleClick={handleClick.bind(this)}
            handleYearChange={handleYearChange.bind(this)}
            handleCodeChange={handleCodeChange.bind(this)}
            name={name}
            />

    );
};

/**
 * 
 */
const mapStateToProps = (state) => { 
    return {
        teachingPeriods: state.CourseStructure.teachingPeriods,
        numberOfUnits: state.CourseStructure.numberOfUnits
    };
};

/**
 * 
 */
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(courseActions, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(InsertTeachingPeriodContainer);

InsertTeachingPeriodContainer.propTypes = {
    index: PropTypes.number,
    year: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    teachingPeriods: PropTypes.array,
    numberOfUnits: PropTypes.number
};