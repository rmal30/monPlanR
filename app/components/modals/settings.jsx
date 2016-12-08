import React, {Component} from "react";
import {Button, Radio, Icon, Modal} from "semantic-ui-react";

class SettingsModal extends Component {

    constructor() {
        super();
        this.state = {
            modalOpen: false
        };
        this.defaultPrefs = {
            tooltips: true
        };
        //set up currentPrefences
        this.prefs = $.extend(this.defaultPrefs);
    }

    //this function gets user prefences
    getTooltipsPrefs(){
      return this.prefs.tooltips;
    }

    //this function temporartily saves prefences
    handleChangeTooltips(type){
        this.prefs.tooltips = type;
    }

    updatePrefs(prefType){
        return (prefType === "tooltips" && this.prefs.tooltips); //return boolean value based on localStorage Type and Setting Value
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
        localStorage.setItem("tooltips", this.prefs.tooltips);
    }
    componentDidMount(){
        this.getTooltipsPrefs();
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
                      Tooltips <Radio
                          toggle
                          checked = {this.updatePrefs("tooltips")}
                          onChange = {this.handleChangeTooltips(this.value)}
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
