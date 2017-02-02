import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as courseActions from "../../actions/CourseActions";
import * as uiActions from "../../actions/UIActions";

import { getSemesterString } from "../../utils/NextSemesterString";

import InsertTeachingPeriod from "../../components/TeachingPeriod/InsertTeachingPeriod.jsx";


const InsertTeachingPeriodContainer = (props) => {
    let { index, year, numberOfUnits, teachingPeriodData, teachingPeriodCodeToInsert} = props;

    const handleInsertTeachingPeriod = () => {
        props.insertTeachingPeriod(index, year, teachingPeriodCodeToInsert);
        props.hideInsertTeachingPeriodUI();  
    };

    const tpString = getSemesterString(year, teachingPeriodData, teachingPeriodCodeToInsert);
    
    return (
        <InsertTeachingPeriod
            tpString={tpString}
            index={index}
            numberOfUnits={numberOfUnits}
            onInsertTeachingPeriod={handleInsertTeachingPeriod}
            teachingPeriodType="Teaching Period"
            teachingPeriods={teachingPeriodData}
            code={teachingPeriodCodeToInsert} />
    );
};


const mapStateToProps = (state) => {
    return {
        numberOfUnits: state.CourseStructure.numberOfUnits,
        teachingPeriodData: state.CourseStructure.teachingPeriodData,
        teachingPeriodCodeToInsert: state.CourseStructure.teachingPeriodCodeToInsert
    };
};

const mapDispatchToProps = (dispatch) => {
    const actionBundle = Object.assign({}, courseActions, uiActions);
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