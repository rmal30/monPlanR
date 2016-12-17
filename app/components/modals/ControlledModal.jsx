import React, {Component} from "react";
import {Button, Icon, Modal} from "semantic-ui-react";

class ControlledModal extends Component {
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
        const trigger = React.cloneElement(this.props.openTrigger, {onClick: this.handleOpen.bind(this)});
        const closeButton = React.cloneElement(this.props.closeTrigger, {onClick: this.handleClose.bind(this)});

        return (
            <Modal trigger={trigger}
                   open={this.state.modalOpen}
                   onClose={this.handleClose.bind(this)}>
                {this.props.children}
                <Modal.Actions>
                    {closeButton}
                </Modal.Actions>
            </Modal>
        );
    }
}

export default ControlledModal;
