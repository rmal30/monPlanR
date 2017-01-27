import React, { PropTypes } from "react";
import CourseInfo from "../components/Course/CourseInfo.jsx";
import { connect } from "react-redux";


/**
 * Handles data fetching for course information.
 */
const CourseInfoContainer = (props) => {
    
    const { isLoading, error } = props; 
    
    if (isLoading) {
        return <p>Loading...</p>;
    } else if (error) {
        return <p>Error...</p>;
    } else {
        return <CourseInfo {...props} />;
    }
};

/**
 * 
 */
const mapStateToProps = (state) => {
    const { courseInfo, courseInfoLoadError, courseLoading, focusedCourse} = state.CourseStructure;
    
    return {
        isLoading: courseLoading,
        error: courseInfoLoadError,
        courseCode: focusedCourse,
        courseName: courseInfo.courseName,
        faculty: courseInfo.faculty,
        creditPoints: courseInfo.creditPoints,
        courseDescription: courseInfo.courseDescription,
        durationStr: courseInfo.string,
        modeAndLocation: courseInfo.modeAndLocation,
        awards: courseInfo.awards,
        abrTitle: courseInfo.abrTitle
    };
};

export default connect(mapStateToProps)(CourseInfoContainer);

CourseInfoContainer.propTypes = {
    isLoading: PropTypes.bool,
    error: PropTypes.bool
};