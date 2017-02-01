import React, { PropTypes } from "react";
import { Button, Dropdown, Header, Icon, Modal,Divider } from "semantic-ui-react";

import ControlledModal from "./ControlledModal.jsx";
import Export from "../../utils/Export.js";
import SaveButton from "../Course/SaveButton.jsx";

/**
 * The completed course modal.
 *
 * @author Saurabh Joshi
 */
export default function CompletedCourseModal({ trigger, teachingPeriods, numberOfUnits, isUploading, uploadingError, uploaded, uploadCourseToDatabase, uploadedCourseID }) {
    CompletedCourseModal.propTypes = {
        trigger: PropTypes.element.isRequired,
        teachingPeriods: PropTypes.arrayOf(PropTypes.object),
        numberOfUnits: PropTypes.number.isRequired,

        isUploading: PropTypes.bool,
        uploaded: PropTypes.bool,
        uploadingError: PropTypes.bool,
        uploadCourseToDatabase: PropTypes.func.isRequired,
        uploadedCourseID: PropTypes.string
    };

    const closeTrigger = <Button content="Close" className="btnmainblue" />;
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
                    <Header>1. Print it and/or Export it</Header>
                    <p>
                        You can print your course plan then showing it to your course
                        advisor will help speed up the process on whether or not
                        you can follow it, otherwise put it with your enrolment papers.
                    </p>
                    <p>
                        Otherwise, you can also export a digital copy, as a PDF file or as a CSV file.
                        Did you can that you can  import your course plan into a spreadsheet program if you export it as a CSV file.
                    </p>
                    <Button primary onClick={() => print()}><Icon name="print" />Print course plan</Button>
                    <Button.Group secondary>
                        <Button onClick={() => print()}><Icon name="download" /> Export as PDF</Button>
                        <Dropdown floating button className="icon">
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => Export.File(teachingPeriods, numberOfUnits, Export.CSV)}>Export as CSV</Dropdown.Item>
                                <Dropdown.Item onClick={() => Export.File(teachingPeriods, numberOfUnits, Export.JSON)}>Export as JSON</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Button.Group>
                    <Divider />
                    <Header>2. Save and/or share it</Header>
                    <p>
                        Your course plan can also be uploaded to our servers,
                        where you will receive a link to your plan. You can
                        either save it for future use, or you can share it with
                        your friends on social media or to your course advisor
                        via email.
                    </p>
                    <SaveButton
                        isUploading={isUploading}
                        uploadingError={uploadingError}
                        uploaded={uploaded}
                        uploadCourseToDatabase={uploadCourseToDatabase}
                        uploadedCourseID={uploadedCourseID}
                        />
                    <Divider />
                    <Header>3. Visit this site every now and then</Header>
                    <p>
                        Your course plan is automatically saved to your
                        browser, so if you want to see your course plan again,
                        come back to this website and make changes whenever
                        necessary.
                    </p>
                </Modal.Description>
            </Modal.Content>
        </ControlledModal>
    );
}
