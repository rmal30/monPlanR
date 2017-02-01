import React, { PropTypes } from "react";
import { Button, Header, Icon, Modal,Divider } from "semantic-ui-react";

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
                    <p>
                        You can also place your course plan somewhere, whether it is a printed
                        document or an exported digital copy. You can import your
                        course plan into a spreadsheet program if you export it as a CSV file.
                    </p>
                    <Button primary onClick={() => print()}><Icon name="print" />Print course plan</Button>
                    <ExportButtonGroupContainer />
                    <Divider />
                    <Header>2. Save and/or Share it</Header>
                    <p>
                        Your course plan can also be uploaded to our servers, you'll recieve
                        a link to your plan. You can either save it for future use, otherwise
                        share it with your friends on Facebook, Twitter, Google+ and much more
                    </p>
                    <SaveButtonContainer />
                    <Divider />
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
