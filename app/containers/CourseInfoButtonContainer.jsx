import React, { PropTypes } from "react";
import CourseDetailPopup from "../components/Course/CourseDetailPopup.jsx";
import { Button } from "semantic-ui-react";


/**
 * Testing
 */
const CourseInfoButtonContainer = ({ courseCode }) => {

    const courseDetailButton = (
            <Button
                fluid
                disabled={courseCode === ""}
                primary>
                View {courseCode !== "" ? courseCode : "course"} details
            </Button>
        );

    return (
        <CourseDetailPopup courseCode={courseCode} trigger={courseDetailButton} />
    );
};

export default CourseInfoButtonContainer;

CourseInfoButtonContainer.propTypes = {
    courseCode: PropTypes.string
};