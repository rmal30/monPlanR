import React, { Component, PropTypes } from "react";
import { Button, Icon, Modal, Radio } from "semantic-ui-react";

/**
 * A modal that users can use to configure preferences when using this web app.
 *
 * @author Eric Jiang
 */
class SettingsModal extends Component {
    /**
     * Holds a boolean value in the state whether or not to show the modal,
     * and also holds preferences which is populated by default preferences.
     */
    constructor() {
        super();

        this.state = {
            modalOpen: false
        };

        this.defaultPrefs = {
            tooltips: true
        };

        // Set up currentPreferences
        this.prefs = {...this.defaultPrefs};
    }

    /**
     * Grabs user preferences for tooltips.
     */
    getTooltipsPrefs() {
        return this.prefs.tooltips;
    }

    /**
     * Changes tooltips preferences to what the user wants.
     */
    handleChangeTooltips(type) {
        this.prefs.tooltips = type;
    }

    /**
     * return boolean value based on localStorage Type and Setting Value
     */
    updatePrefs(prefType) {
        return (prefType === "tooltips" && this.prefs.tooltips);
    }

    /**
     * Opens the modal
     */
    handleOpen() {
        this.setState({
            modalOpen: true
        });
    }

    /**
     * Closes the modal
     */
    handleClose() {
        this.setState({
            modalOpen: false
        });
    }

    /**
     * Saves preferences to local storage.
     */
    handleSave() {
        localStorage.setItem("tooltips", this.prefs.tooltips);
    }

    /**
     * @returns {Modal}
     */
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
                        Tooltips
                        <Radio toggle
                               checked={this.updatePrefs("tooltips")}
                               onChange={this.handleChangeTooltips(this.value)}>
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
}

SettingsModal.propTypes = {
    getTrigger: PropTypes.func.isRequired
};

export default SettingsModal;
