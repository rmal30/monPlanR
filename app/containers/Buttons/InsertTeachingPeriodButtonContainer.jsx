import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "semantic-ui-react";

import * as courseActions from "../../actionCreators/CourseActions";
import * as uiActions from "../../actionCreators/UIActions";
import InsertTeachingPeriodButton from "../../components/TeachingPeriod/InsertTeachingPeriodButton.jsx";

/**
 *
 */
const InsertTeachingPeriodButtonContainer = (props) => {
    const { nextSemesterString, mobile, bottom, showingInsertTeachingPeriodUI, teachingPeriods, startYear, teachingPeriodData } = props;


    /**
     * Pulls function from redux, inserting a semester
     */
    const handleInsertSemester = (code) => {
        props.showInsertTeachingPeriodUI(code);
    };

    /**
     * Pulls a function from redux for adding a semester to the end of the array
     */
    const handleAppendSemester = () => {
        props.addTeachingPeriod(teachingPeriods, startYear, teachingPeriodData);
    };

    if(showingInsertTeachingPeriodUI) {
        return (
            <Button
                fluid={mobile}
                className="no-print btnlightcancel"
                floated={mobile ? "" : "right"}
                onClick={props.hideInsertTeachingPeriodUI}>Cancel</Button>
        );
    } else {
        return (
            <InsertTeachingPeriodButton
                semesterString={nextSemesterString}
                insert={handleInsertSemester}
                addSemester={handleAppendSemester}
                mobile={mobile}
                bottom={bottom}
            />
        );
    }

};

/**
 *
 */
const mapStateToProps = (state) => {
    return {
        nextSemesterString: state.CourseStructure.nextSemesterString,
        showingInsertTeachingPeriodUI: state.UI.showingInsertTeachingPeriodUI,
        teachingPeriods: state.CourseStructure.teachingPeriods,
        teachingPeriodData: state.CourseStructure.teachingPeriodData,
        startYear: state.CourseStructure.startYear,
    };
};

/**
 *
 */
const mapDispatchToProps = (dispatch) => {
    const actionBundle = {...courseActions, ...uiActions};
    return bindActionCreators(actionBundle, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(InsertTeachingPeriodButtonContainer);

InsertTeachingPeriodButtonContainer.propTypes = {
    showInsertTeachingPeriodUI: PropTypes.func,
    hideInsertTeachingPeriodUI: PropTypes.func,
    addTeachingPeriod: PropTypes.func,
    nextSemesterString: PropTypes.string,
    mobile: PropTypes.bool,
    bottom: PropTypes.bool,
    showingInsertTeachingPeriodUI: PropTypes.bool,
    teachingPeriods: PropTypes.array,
    teachingPeriodData: PropTypes.array,
    startYear: PropTypes.number
};
