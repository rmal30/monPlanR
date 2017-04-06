import React, { PropTypes } from "react";
import MediaQuery from "react-responsive";

import { Button, Container, Divider, Icon, Modal } from "semantic-ui-react";
import ControlledModal from "../modals/ControlledModal.jsx";
import ExportButtonGroupContainer from "../../containers/Buttons/ExportButtonGroupContainer.jsx";
import LocalStorage from "../../utils/LocalStorage.js";

/**
 * Actions that allow users to print, export and edit viewed course plans.
 *
 * @author Saurabh Joshi
 */
export default function CourseViewActions(props) {

    CourseViewActions.propTypes = {
        switchToEditCourse: PropTypes.bool,
        handleEditCoursePlanClick: PropTypes.func
    };

    /**
     * Edit course button that
     */
    const editCoursePlanButton = mobile => (
        <Button
            primary
            fluid={mobile}
            floated="right"
            loading={props.switchToEditCourse}
            disabled={props.switchToEditCourse}
            onClick={props.handleEditCoursePlanClick}>
            <Icon name="edit" />Edit course plan
        </Button>
    );

    return (
        <MediaQuery maxDeviceWidth={767}>
            {mobile =>
                <Container>
                    {LocalStorage.doesCourseStructureExist() &&
                        <ControlledModal
                            openTrigger={editCoursePlanButton(mobile)}
                            positiveButton={(
                                <Button
                                    color="red"
                                    disabled={props.switchToEditCourse}
                                    loading={props.switchToEditCourse}
                                    onClick={() => props.handleEditCoursePlanClick(true)}>
                                    Discard draft and edit course plan
                                </Button>
                            )}
                            closeTrigger={<Button className="btnlightcancel">Cancel</Button>}>
                            <Modal.Header className="header-danger">
                                <Icon name="pencil" /> Are you sure you want to edit this course?
                            </Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <p>
                                        You have an existing draft course plan
                                        stored in your browser. Do you want to
                                        discard the draft and edit this one
                                        instead?
                                    </p>
                                </Modal.Description>
                            </Modal.Content>
                        </ControlledModal>
                    || editCoursePlanButton(mobile)}
                    {mobile && <div><br /><br /></div>}
                    <Button
                        color="orange"
                        onClick={() => print()}>
                        <Icon name="print" />Print course plan
                    </Button>
                    <ExportButtonGroupContainer />
                    <Divider />
                </Container>
            }
        </MediaQuery>
    );
}
