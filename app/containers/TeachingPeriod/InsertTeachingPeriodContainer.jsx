import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as courseActions from "../../actionCreators/CourseActions";
import * as uiActions from "../../actionCreators/UIActions";

import InsertTeachingPeriod from "../../components/TeachingPeriod/InsertTeachingPeriod.jsx";


/**
 * Container for a insert teaching period thing
 */
const InsertTeachingPeriodContainer = props => {
    let { index, year, numberOfUnits, teachingPeriodData, teachingPeriodCodeToInsert } = props;

    /**
     * When teaching period insert is clicked, we insert it via redux function and
     * then hide the insert teaching period UI
     */
    const handleInsertTeachingPeriod = () => {
        props.insertTeachingPeriod(index, year, teachingPeriodCodeToInsert);
        props.hideInsertTeachingPeriodUI();
    };

    let tpString = teachingPeriodCodeToInsert;

    if(teachingPeriodData) {
        const teachingPeriodType = teachingPeriodData.find(ele => ele.code === teachingPeriodCodeToInsert);

        if(teachingPeriodType) {
            tpString = teachingPeriodType.name;
        }
    }

    return (
        <InsertTeachingPeriod
            tpString={tpString}
            year={year}
            numberOfUnits={numberOfUnits}
            onInsertTeachingPeriod={handleInsertTeachingPeriod} />
    );
};

/**
 * inject the necessary props from redux store
 */
const mapStateToProps = (state) => {
    return {
        numberOfUnits: state.CourseStructure.numberOfUnits,
        teachingPeriodData: state.CourseStructure.teachingPeriodData,
        teachingPeriodCodeToInsert: state.CourseStructure.teachingPeriodCodeToInsert
    };
};

/**
 * inject the necessary functions from redux store
 */
const mapDispatchToProps = (dispatch) => {
    const actionBundle = { ...courseActions, ...uiActions};
    return bindActionCreators(actionBundle, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(InsertTeachingPeriodContainer);

InsertTeachingPeriodContainer.propTypes = {
    year: PropTypes.number,
    index: PropTypes.number,
    numberOfUnits: PropTypes.number,
    teachingPeriodData: PropTypes.array,
    teachingPeriodCodeToInsert: PropTypes.string,
    insertTeachingPeriod: PropTypes.func,
    hideInsertTeachingPeriodUI: PropTypes.func
};
