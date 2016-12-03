import React, {Component} from "react";
import {Button, Icon, Modal} from "semantic-ui-react";

class ToSModal extends Component {
    constructor() {
        super();
        this.state = {modalOpen: false};
    }

    handleOpen() {
        this.setState({
            modalOpen: true
        });
    }
    handleClose() {
        this.setState({
            modalOpen: false
        });
    }
    render() {
        return (
            <Modal trigger={this.props.getTrigger(this.handleOpen.bind(this))}
                   open={this.state.modalOpen}
                   onClose={this.handleClose.bind(this)}>
                <Modal.Header>
                    <Icon name="users" />
                    Terms of Use Agreement
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        By using this site, you agree to the following:
                        <ul>
                            <li>The site's source code and the project are automatically bound by <strong>the MIT License</strong>, unless otherwise stated.
                                <ul>
                                    <li>Copying the site's source code or code from the GitHub repository is a Federal Offence, all code and work is protected under the Australian Copyright Act 1966</li>
                                    <li>The following libraries used within this project are bound by other Licenses: Semantic UI</li>
                                </ul>
                            </li>
                            <li>You acknowledge that your data is protected under our Privacy Policy, which may change from time to time.</li>
                            <li>At this stage, this site is not endorsed by Monash University, we are in no way affiliated with Monash University's Administration Staff.</li>
                            <li>This Terms of Use (ToS) agreement may change from time to time.</li>
                        </ul>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button content="OK" positive icon="checkmark" labelPosition="right" onClick={this.handleClose.bind(this)} />
                </Modal.Actions>
            </Modal>
        );
    }
};

export default ToSModal;
