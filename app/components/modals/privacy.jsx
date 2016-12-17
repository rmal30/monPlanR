import React, { PropTypes } from "react";
import {Button, Icon, Modal} from "semantic-ui-react";

import ControlledModal from "./ControlledModal.jsx";

/**
 * The privacy policy modal.
 *
 * @author Eric Jiang, Saurabh Joshi
 */
export default function privacy({ trigger }) {
    privacy.propTypes = {
        trigger: PropTypes.element.isRequired
    };

    const closeTrigger = <Button content="OK, I've got it" positive icon="checkmark" labelPosition="right" />;
    return (
        <ControlledModal
               openTrigger={trigger}
               closeTrigger={closeTrigger}>
            <Modal.Header>
                <Icon name="privacy" />
                Privacy Policy
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                  <p>Your data will be recorded and saved into your browser's cache for future performance, and to improve user experience and usability within our site, we use localstorage for storing current user plan as well as
                  user settings. Our site is currently hosted by DigitalOcean, we being eSolutions track performance of the server through server monitoring (bandwidth, memory) as well as user performance through Google Analytics.</p>

                  <p>The data collected within our services is stored on many systems including Google Drive, Google Analytics, etc., with the only people whom have access to the data are the developers of monPlan.
                  Personal identifiable data will not be given to any third party (including the university), unless permission is expressively given from the user.
                  This form is restricted under the Conduct and Compliance Policy - Privacy as stated within the Monash University guidelines, to view the policy visit the guidelines please visit:
                  <a href="http://privacy.monash.edu.au/procedure/?_ga=1.178431200.516376021.1481000088">http://privacy.monash.edu.au/procedure/?_ga=1.178431200.516376021.1481000088</a></p>
                  <br />

                  <p>We also honor Do Not Track (DNT) Plugins, no features and functionalities within the site will be disabled if your browser uses a DNT plugin.</p>
                <br />
                  <p>In future versions, if you are logged into our site, we will load data about your course via an API supplied by the University to help you plan out your degree and make sure you get the most out of your degree.</p>
                </Modal.Description>
            </Modal.Content>
        </ControlledModal>
    );
}
