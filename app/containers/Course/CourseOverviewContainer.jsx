import React, { PropTypes } from "react";
import { connect } from "react-redux";
import CourseOverview from "../../components/Course/CourseOverview.jsx";
import DefaultCourseOverview from "../../components/Course/DefaultCourseOverview.jsx";
import AddingUnitIndicator from "../../components/Status/AddingUnitIndicator.jsx";
import MovingUnitIndicator from "../../components/Status/MovingUnitIndicator.jsx";
/**
 * Container for passing in props from redux to CourseOverview component
 */
const CourseOverviewContainer = (props) => {
    const { courseName, courseCode, courseFaculty, shouldDisplayAdding, shouldDisplayMoving } = props;
    const shouldDisplayCourseOverview = courseName && courseCode && courseFaculty;
    
    if(shouldDisplayCourseOverview) {
        return (
            <CourseOverview 
                courseName={courseName}
                courseCode={courseCode} 
                courseFaculty={courseFaculty} 
            />
        );
    
    } else if (shouldDisplayAdding) {
        return <AddingUnitIndicator unitCode="FIT2001" />;
    
    } else if (shouldDisplayMoving) {
        return <MovingUnitIndicator unitCode="FIT2001" />;
    
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
        courseName: state.CourseStructure.courseDetails.courseName,
        courseCode: state.CourseStructure.courseDetails.courseCode,
        courseFaculty: state.CourseStructure.courseDetails.faculty,
        shouldDisplayMoving: state.UI.showMovingUnitUI,
        shouldDisplayAdding: state.UI.showAddingUnitUI
    };
};

export default connect(mapStateToProps)(CourseOverviewContainer);

CourseOverviewContainer.propTypes = {
    courseName: PropTypes.string,
    courseCode: PropTypes.string,
    courseFaculty: PropTypes.string,
    shouldDisplayAdding: PropTypes.bool,
    shouldDisplayMoving: PropTypes.bool
};