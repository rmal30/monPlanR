import React, { PropTypes } from "react";
import MediaQuery from "react-responsive";

import { Button, Container, Divider, Dropdown, Icon, Modal } from "semantic-ui-react";
import ControlledModal from "../modals/ControlledModal.jsx";

import LocalStorage from "../../utils/LocalStorage.js";
import Export from "../../utils/Export.js";

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
            fluid={mobile}
            color="teal"
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
                    || editCoursePlanButton(mobile)}
                    {mobile && <div><br /><br /></div>}
                    <Button
                        fluid={mobile}
                        color="blue"
                        onClick={() => print()}><Icon name="print" />Print course plan</Button>
                    {mobile && <br />}
                    <Button.Group fluid={mobile} secondary>
                        <Button onClick={() => print()}><Icon name="download" /> Export as PDF</Button>
                        <Dropdown floating button className="icon">
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() =>
                                        Export.File(
                                            props.teachingPeriods,
                                            props.numberOfUnits,
                                            Export.CSV
                                        )}>
                                        Export as CSV
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() =>
                                        Export.File(
                                            props.teachingPeriods,
                                            props.numberOfUnits,
                                            Export.JSON
                                        )}>
                                        Export as JSON
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Button.Group>
                    <Divider />
                </Container>
            }
        </MediaQuery>
    );
}
