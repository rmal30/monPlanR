import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/CourseActions";
import * as uiActions from "../../actions/UIActions";
import InsertTeachingPeriodButton from "../../components/TeachingPeriod/InsertTeachingPeriodButton.jsx";

/**
 * 
 */
const InsertTeachingPeriodButtonContainer = (props) => {
    const { nextSemesterString, showInsertTeachingPeriodUI, addTeachingPeriod, mobile, bottom } = props;
    
    return (
        <InsertTeachingPeriodButton
            semesterString={nextSemesterString}
            insert={showInsertTeachingPeriodUI}
            appendSemester={addTeachingPeriod}
            mobile={mobile}
            bottom={bottom}
        />
    );
};

/**
 * 
 */
const mapStateToProps = (state) => { 
    return {
        nextSemesterString: state.CourseStructure.nextSemesterString
    };
};

/**
 * 
 */
const mapDispatchToProps = (dispatch) => {
    const actionBundle = Object.assign({}, courseActions, uiActions);
    return bindActionCreators(actionBundle, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(InsertTeachingPeriodButtonContainer);

InsertTeachingPeriodButtonContainer.propTypes = {
    showInsertTeachingPeriodUI: PropTypes.func,
    addTeachingPeriod: PropTypes.func,
    nextSemesterString: PropTypes.string,
    mobile: PropTypes.bool,
    bottom: PropTypes.bool
};