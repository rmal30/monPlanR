import React, { Component, PropTypes } from "react";
import { Container, Divider } from "semantic-ui-react";

import CourseStructure from "../Course/CourseStructure.jsx";
import Home from "./Home.jsx";

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
            switchToEditCourse: false
        };
    }

    /**
     *
     */
    handleEditCoursePlanClick(confirm) {
        if(!Home.checkIfCourseStructureIsInLocalStorage() || confirm) {
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
                <h1>Viewing course plan</h1>
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
