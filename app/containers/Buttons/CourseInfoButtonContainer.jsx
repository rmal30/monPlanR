import React, { PropTypes } from "react";
import CourseDetailPopup from "../../components/Course/CourseDetailPopup.jsx";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";


/**
 * Testing
 */
const CourseInfoButtonContainer = ({ courseCode, mobile }) => {

    const courseDetailButton = (
            <Button
                fluid={mobile}
                disabled={courseCode === "" || courseCode === null}
                className="btndarkblue"
                primary>
                View {courseCode !== "" ? courseCode : "course"} details
            </Button>
        );

    return (
        <CourseDetailPopup courseCode={courseCode} trigger={courseDetailButton} />
    );
};

/**
 * Course Info button needs course code so it can display relevant info
 */
const mapStateToProps = (state) => {
    return {
        courseCode: state.CourseStructure.focusedCourse
    };
};


export default connect(mapStateToProps)(CourseInfoButtonContainer);

CourseInfoButtonContainer.propTypes = {
    courseCode: PropTypes.string,
    mobile: PropTypes.bool
};
