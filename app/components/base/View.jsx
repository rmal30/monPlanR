import React, { Component, PropTypes } from "react";
import { Container, Divider, Grid } from "semantic-ui-react";

import CourseStructure from "../Course/CourseStructure.jsx";
import CourseStatisticGroupWrapper from "../../wrappers/CourseStatisticGroupWrapper";
import LocalStorage from "../../utils/LocalStorage.js";

/**
 *
 */
class View extends Component {

    /**
     *
     */
    constructor(props) {
        super(props);
        this.state = {
            switchToEditCourse: false,
            totalCredits: 0,
            totalCost: 0
        };
    }

    /**
     *
     */
    handleEditCoursePlanClick(confirm) {
        if(!LocalStorage.doesCourseStructureExist() || confirm) {
            this.setState({
                switchToEditCourse: true
            });
        }
    }

    /**
     *
     */
    render() {
        return (
            <Container text style={{margin: "5em 0"}}>
                <Grid stackable>
                    <Grid.Column floated="left" width={5}>
                        <h1>Viewing course plan</h1>
                    </Grid.Column>
                    <Grid.Column floated="right" width={5}>
                        <CourseStatisticGroupWrapper />
                    </Grid.Column>
                </Grid>
                <Divider hidden />
                <CourseStructure
                    viewOnly
                    switchToEditCourse={this.state.switchToEditCourse}
                    handleEditCoursePlanClick={this.handleEditCoursePlanClick.bind(this)}
                    fetchURL={`${MONPLAN_REMOTE_URL}/snaps/${this.props.params.id}`}
                    updateStatus={this.props.updateStatus}
                    courseErrors={this.props.courseErrors} />
            </Container>
        );
    }
}

View.propTypes = {
    params: PropTypes.shape({
        id: PropTypes.string.isRequired
    }),

    /* Validation status */
    updateStatus: PropTypes.func.isRequired,
    courseErrors: PropTypes.array.isRequired
};

export default View;
