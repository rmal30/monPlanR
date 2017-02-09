import React, { PropTypes } from "react";
import { connect } from "react-redux";
import CourseOverview from "../../components/Course/CourseOverview.jsx";

/**
 * Container for passing in props from redux to CourseOverview component
 */
const CourseOverviewContainer = (props) => {
    const { courseName, courseCode, courseFaculty } = props;
    const shouldDisplay = courseName && courseCode && courseFaculty;
    if(shouldDisplay) {
        return (
            <CourseOverview 
                courseName={courseName}
                courseCode={courseCode} 
                courseFaculty={courseFaculty} 
            />
        );
    } else {
        return null;
    }
    
};

/**
 * The Course overview just displays some simple info for the students about the course they have 
 * currently selected
 */
const mapStateToProps = (state) => {
    return {
        courseName: state.CourseStructure.courseInfo.courseName,
        courseCode: state.CourseStructure.focusedCourse,
        courseFaculty: state.CourseStructure.courseInfo.faculty
    };
};

export default connect(mapStateToProps)(CourseOverviewContainer);

CourseOverviewContainer.propTypes = {
    courseName: PropTypes.string,
    courseCode: PropTypes.string,
    courseFaculty: PropTypes.string
};