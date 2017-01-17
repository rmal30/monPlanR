import React, { Component, PropTypes } from "react";
import { Button, Container, Divider, Icon, Modal } from "semantic-ui-react";

import CourseStructure from "../Course/CourseStructure.jsx";
import Home from "./Home.jsx";
import ControlledModal from "../modals/ControlledModal.jsx";

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            switchToEditCourse: false
        };
    }
    handleEditCoursePlanClick(confirm) {
        if(!Home.checkIfCourseStructureIsInLocalStorage() || confirm) {
            this.setState({
                switchToEditCourse: true
            });
        }
    }
    render() {
        const editCoursePlanButton = <Button
                                        color="teal"
                                        loading={this.state.switchToEditCourse}
                                        disabled={this.state.switchToEditCourse}
                                        onClick={this.handleEditCoursePlanClick.bind(this)}>
                                        <Icon name="edit" />Edit course plan
                                    </Button>;
        return (
            <Container style={{margin: "5em 0"}}>
                <h1>Viewing course plan</h1>
                <Divider hidden />
                {Home.checkIfCourseStructureIsInLocalStorage() &&
                <ControlledModal
                    openTrigger={editCoursePlanButton}
                    positiveButton={<Button color="red" disabled={this.state.switchToEditCourse} loading={this.state.switchToEditCourse} onClick={this.handleEditCoursePlanClick.bind(this, true)}>Discard draft and edit course plan</Button>}
                    closeTrigger={<Button>Cancel</Button>}>
                    <Modal.Header>
                        Discard draft?
                    </Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <p>
                                You have a draft course plan currently saved in
                                your browser. Are you sure you want discard your
                                draft to load this course plan?
                            </p>
                        </Modal.Description>
                    </Modal.Content>
                </ControlledModal>
                || editCoursePlanButton}
                <Divider />
                <CourseStructure
                    viewOnly
                    switchToEditCourse={this.state.switchToEditCourse}
                    fetchURL={`${MONPLAN_REMOTE_URL}/snaps/${this.props.params.id}`} />
            </Container>
        );
    }
}

View.propTypes = {
    params: PropTypes.shape({
        id: PropTypes.string.isRequired
    })
};

export default View;
