import React, { PropTypes } from "react";
import { Button, Header, Icon, Modal, Grid } from "semantic-ui-react";

import ControlledModal from "./ControlledModal.jsx";
import SaveButtonContainer from "../../containers/Buttons/SaveButtonContainer.jsx";
import ExportButtonGroupContainer from "../../containers/Buttons/ExportButtonGroupContainer.jsx";

/**
 * The completed course modal.
 *
 * @author Saurabh Joshi
 */
export default function CompletedCourseModal({ trigger }) {
    CompletedCourseModal.propTypes = {
        trigger: PropTypes.element.isRequired,
    };

    const closeTrigger = <Button content="Close" className="btnlightcancel" />;
    return (
        <ControlledModal
               openTrigger={trigger}
               closeTrigger={closeTrigger}>
            <Modal.Header className="header-primary">
                <Icon name="checked calendar" />Congratulations on planning your course (so far)
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    There are several things you can do next:
                    <br />
                    <br />
                    <Grid celled="internally">
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Header><Icon name="print" /> Print it</Header>
                                <p>
                                    You can print your course plan then showing it to your course
                                    advisor.
                                </p>
                                <Button primary onClick={() => print()} className="btnorange"><Icon name="print" />Print course plan</Button>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Header><Icon name="download" /> Export it</Header>
                                <p>You can also export it as a CSV and/or JSON for use in other software such as Excel.</p>
                                <ExportButtonGroupContainer />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                            <Header><Icon name="share" /> Save or share it</Header>
                            <p>
                                Save your course online and Grab a link. Save it for future use on any device, otherwse share it.
                            </p>
                            <SaveButtonContainer />
                            </Grid.Column>
                            <Grid.Column width={8}>
                            <Header><Icon name="repeat" />  Visit this site every now and then</Header>
                            <p>
                                Otherwise, come back on your same device (it's saved in your browser!) every few months to modify your plan.
                            </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Description>
            </Modal.Content>
        </ControlledModal>
    );
}
