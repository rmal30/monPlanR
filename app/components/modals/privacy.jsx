import React, {Component} from "react";
import {Button, Icon, Modal} from "semantic-ui-react";

import ControlledModal from "./ControlledModal.jsx";

export default ({trigger}) => {
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
                  We do not record any data across our services. Your data will be recorded and saved into your browser's cache for future performance, to improve user experience with our site.
                  As our site is currently hosted by GitHub Pages, we (being monPlan) and eSolutions do not track your activity, but the organisation at times, may track your activities.
                  Within our site to display data, we also honor Do Not Track (DNT) Plugins, no features will be disabled if your browser uses a DNT plugin.
                  In future versions, if you are logged into our site, we will load data about your course via an API supplied by the University to help you plan out your degree and make sure you get the most out of your degree.
                </Modal.Description>
            </Modal.Content>
        </ControlledModal>
    );
};
