import React, { Component, PropTypes } from "react";
import { Container, Divider, Grid } from "semantic-ui-react";

import CourseStructure from "../Course/CourseStructure.jsx";
import CourseStatisticGroup from "../Course/CourseStatisticGroup.jsx";
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
     * On occasion, such as loading from local storage, a child component may need to update the totals without the parent being aware
     * this function is passed down, and it is the child components responsibity to call this function in these situations.
     */
    handleChildUpdateTotals(totalCreditPoints, totalEstimatedCost) {
        this.setState({
            totalCredits: totalCreditPoints,
            totalCost: totalEstimatedCost
        });
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
                        <CourseStatisticGroup currentCreditPoints={this.state.totalCredits} currentEstCost={this.state.totalCost} />
                    </Grid.Column>
                </Grid>
                <Divider hidden />
                <CourseStructure
                    viewOnly
                    switchToEditCourse={this.state.switchToEditCourse}
                    handleEditCoursePlanClick={this.handleEditCoursePlanClick.bind(this)}
                    handleChildUpdateTotals={this.handleChildUpdateTotals.bind(this)}
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
