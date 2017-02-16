import React from "react";
import { Grid, Segment } from "semantic-ui-react";

import CourseStatisticGroupContainer from "../../containers/Course/CourseStatisticGroupContainer";
import LoadCourse from "../../components/modals/LoadCourseMap.jsx";
/**
 * Component that shows a small selection of course info at the top of the page so that users
 * are aware of what course thet are looking at
 */
const DefaultCourseOverview = () => {
    return (
        <Segment className="default">
            <Grid stackable>
                <Grid.Column width={11}>
                    <h3>No course selected</h3>
                    <h5 className="no-print">Choose a course via the "Load Course button below"</h5>
                    <LoadCourse />
                </Grid.Column>
                <Grid.Column width={5}>
                    <CourseStatisticGroupContainer />
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default DefaultCourseOverview;
