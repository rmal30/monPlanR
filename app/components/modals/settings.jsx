import React, {Component} from "react";
import {Button, Radio, Icon, Modal} from "semantic-ui-react";
import updatePrefs from "../../usrConfig/preferences.js"

class SettingsModal extends Component {
    constructor() {
        super();
        this.state = {
          modalOpen: false
        };
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
    handleSave(){

    }
    render() {
        return (
            <Modal trigger={this.props.getTrigger(this.handleOpen.bind(this))}
                   open={this.state.modalOpen}
                   onClose={this.handleClose.bind(this)}>
                <Modal.Header>
                    <Icon name="settings" />
                    User Settings
                </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                      <h3>General</h3>
                      Tooltips <Radio name="" toggle
                          checked = {updatePrefs('tooltips')}

                      >
                    </Radio>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button content="Save" color="green" icon="save" labelPosition="right" />
                    <Button content="Close" color="grey" icon="close" labelPosition="right" onClick={this.handleClose.bind(this)} />
                </Modal.Actions>
            </Modal>
        );
    }
};

export default SettingsModal;
