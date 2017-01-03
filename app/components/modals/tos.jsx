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
                        <li>The site's source code and the project are bound by <strong>the MIT License</strong>, unless otherwise stated.
                            <ul>
                                <li>Copying any code within the <i>monPlan</i> Project is a Federal Offence, as all code and work are protected under the Australian Copyright Act 1966. For more information you
                                    may visit <a href="https://monash.edu/policy-bank/management/governance/copyright-compliance-policy" target="_blank">https://monash.edu/policy-bank/management/governance/copyright-compliance-policy</a>
                                </li>
                                <li>All the libraries used within this project are bound by their respective licenses for example but not limited to <i>jQuery, Semantic UI, Fuse.js, WebPack and React.</i></li>
                            </ul>
                        </li>
                        <li>You acknowledge that your data is protected under our Privacy Policy, which may change from time to time.</li>
                        <li>At this stage, our site is not endorsed by Monash University</li>
                        <li>This Terms of Use (ToS) agreement may change from time to time.</li>
                        <li>Please read our <b>Disclaimer</b> on using our tool.</li>
                    </ul>
                </Modal.Description>
            </Modal.Content>
        </ControlledModal>
    );
}
