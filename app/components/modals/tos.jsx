import React, { PropTypes } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";

import ControlledModal from "./ControlledModal.jsx";

/**
 * The terms of service modal.
 *
 * @author Eric Jiang, Saurabh Joshi
 */
export default function tos({ trigger }) {
    tos.propTypes = {
        trigger: PropTypes.element.isRequired
    };

    const closeTrigger = <Button content="OK" positive icon="checkmark" labelPosition="right" />;
    return (
        <ControlledModal
               openTrigger={trigger}
               closeTrigger={closeTrigger}>
            <Modal.Header>
                <Icon name="users" /> Terms of Use Agreement
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    By using this site, you agree to the following:
                    <ul>
                        <li>The site's source code and the project are automatically bound by <strong>the MIT License</strong>, unless otherwise stated.
                            <ul>
                                <li>Copying the site's source code or code from the GitHub repository is a Federal Offence, as all code and work are protected under the Australian Copyright Act 1966.</li>
                                <li>The following libraries used within this project are bound by their respective licenses, including jQuery, Semantic UI, and React.</li>
                            </ul>
                        </li>
                        <li>You acknowledge that your data is protected under our Privacy Policy, which may change from time to time.</li>
                        <li>At this stage, our site is not endorsed by Monash University, and we are not affiliated with Monash University's Administration Staff.</li>
                        <li>This Terms of Use (ToS) agreement may change from time to time.</li>
                    </ul>
                </Modal.Description>
            </Modal.Content>
        </ControlledModal>
    );
}
