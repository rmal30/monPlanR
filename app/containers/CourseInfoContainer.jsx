import React, { PropTypes } from "react";
import { connect } from "react-redux";

import CourseInfo from "../components/Course/CourseInfo.jsx";
import CourseInfoPlaceholder from "../components/Course/CourseInfoPlaceholder.jsx";

/**
 * Handles data fetching for course information.
 */
const CourseInfoContainer = (props) => {

    const { isLoading, error } = props;

    if (isLoading) {
        return <CourseInfoPlaceholder />;
    } else if (error) {
        return <CourseInfoPlaceholder error={true} />;
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
        durationStr: courseInfo.durationStr,
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