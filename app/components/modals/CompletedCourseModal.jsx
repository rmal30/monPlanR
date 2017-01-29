import React, { PropTypes } from "react";
import { Button, Dropdown, Header, Icon, Modal } from "semantic-ui-react";

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

    const closeTrigger = <Button content="Close" />;
    return (
        <ControlledModal
               openTrigger={trigger}
               closeTrigger={closeTrigger}>
            <Modal.Header>
                <Icon name="checked calendar" />Well done on planning your course (so far)
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    There are several things you can do next:
                    <br />
                    <Header>1. Take it to your course advisor</Header>
                    <p>
                        Printing your course plan then showing it to your course
                        advisor will help speed up the process on whether or not
                        you can follow it.
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
                    &nbsp;
                    <SaveButton
                        isUploading={isUploading}
                        uploadingError={uploadingError}
                        uploaded={uploaded}
                        uploadCourseToDatabase={uploadCourseToDatabase}
                        uploadedCourseID={uploadedCourseID}
                        />
                    <Header>2. Place it somewhere</Header>
                    <p>
                        You can place your course plan somewhere, whether it is a printed
                        document or an exported digital copy. You can import your
                        course plan into a spreadsheet program if you export it as a CSV file.
                    </p>
                    <Header>3. Visit this site every now and then</Header>
                    <p>
                        Your course plan is saved to your browser, so if you want to
                        see your course plan again, come back to this website and
                        make changes whenever necessary.
                    </p>
                </Modal.Description>
            </Modal.Content>
        </ControlledModal>
    );
}
