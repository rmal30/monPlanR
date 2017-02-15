import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as courseActions from "../../actions/CourseActions";

import CourseOverview from "../../components/Course/CourseOverview.jsx";
import DefaultCourseOverview from "../../components/Course/DefaultCourseOverview.jsx";
import AddingUnitIndicator from "../../components/Status/AddingUnitIndicator.jsx";
import MovingUnitIndicator from "../../components/Status/MovingUnitIndicator.jsx";


/**
 * Container for passing in props from redux to CourseOverview component
 */
const CourseOverviewContainer = props => {
    const { courseName, courseCode, courseFaculty, shouldDisplayAdding, shouldDisplayMoving, unitToAdd, unitToBeMoved, cancelAddingUnit } = props;
    const shouldDisplayCourseOverview = courseName && courseCode && courseFaculty && !shouldDisplayAdding && !shouldDisplayMoving;

    if(shouldDisplayCourseOverview) {
        return (
            <CourseOverview
                courseName={courseName}
                courseCode={courseCode}
                courseFaculty={courseFaculty}
            />
        );

    } else if (shouldDisplayAdding) {
        return <AddingUnitIndicator unitCode={unitToAdd && unitToAdd.unitCode} onCancelAddingUnit={cancelAddingUnit} />;

    //prefers adding over moving although ideally they would never be true at same time
    } else if (shouldDisplayMoving && !shouldDisplayAdding) {
        return <MovingUnitIndicator unitCode={unitToBeMoved && unitToBeMoved.unitCode} />;

    } else {
        return <DefaultCourseOverview />;
    }

};

/**
 * The Course overview just displays some simple info for the students about the course they have
 * currently selected
 */
const mapStateToProps = (state) => {
    return {
        courseName: state.CourseStructure.courseInfo.courseName,
        courseCode: state.CourseStructure.courseInfo.courseCode,
        courseFaculty: state.CourseStructure.courseInfo.faculty,
        shouldDisplayMoving: state.UI.showingMovingUnitUI,
        shouldDisplayAdding: state.UI.showingAddingUnitUI,
        unitToBeMoved: state.CourseStructure.unitToBeMoved,
        unitToAdd: state.CourseStructure.unitToAdd
    };
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(courseActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseOverviewContainer);

CourseOverviewContainer.propTypes = {
    courseName: PropTypes.string,
    courseCode: PropTypes.string,
    courseFaculty: PropTypes.string,
    shouldDisplayAdding: PropTypes.bool,
    shouldDisplayMoving: PropTypes.bool,
    unitToBeMoved: PropTypes.object,
    unitToAdd: PropTypes.object,
    cancelAddingUnit: PropTypes.func
};
