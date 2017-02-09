import React, { PropTypes } from "react";
import { Grid, Segment } from "semantic-ui-react";

import CourseStatisticGroupContainer from "../../containers/Course/CourseStatisticGroupContainer";

/**
 * Component that shows a small selection of course info at the top of the page so that users 
 * are aware of what course thet are looking at
 */
const CourseOverview = (props) => {
    const { courseName, courseCode, courseFaculty } = props;
    
    const facultyMap = {
        "Faculty of Art, Design and Architecture": "ada",
        "Faculty of Arts": "arts",
        "Faculty of Business and Economics": "buseco",
        "Faculty of Education": "edu",
        "Faculty of Engineering": "eng",
        "Faculty of Information Technology": "fit",
        "Faculty of Law": "law",
        "Faculty of Medicine, Nursing and Health Sciences": "med",
        "Faculty of Pharmacy and Pharmaceutical Sciences": "pha",
        "Faculty of Science": "sci",
        "Faculty of All": "all"
    };

    return (
        <Segment className={facultyMap[courseFaculty]}>
            <Grid stackable>
                <Grid.Column width={12}>
                    <h3>{`${courseCode} - ${courseName}`}</h3>
                    <h5>{courseFaculty}</h5>
                </Grid.Column>
                <Grid.Column width={4}>
                    <CourseStatisticGroupContainer />
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default CourseOverview;

CourseOverview.propTypes = {
    courseName: PropTypes.string,
    courseCode: PropTypes.string,
    courseFaculty: PropTypes.string
};